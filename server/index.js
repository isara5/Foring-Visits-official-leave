import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { generateRequestZip } from './zip-generator.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const secret = process.env.JWT_SECRET || 'local-demo-secret-change-before-deploy';
const databasePath = resolve('data/portal.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });
const db = new DatabaseSync(databasePath);
db.exec('PRAGMA journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicant_id INTEGER NOT NULL REFERENCES users(id),
    destination TEXT NOT NULL,
    purpose TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    leave_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending Supervisor',
    signature TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS approvals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL REFERENCES requests(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    decision TEXT NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS request_views (
    user_id INTEGER NOT NULL REFERENCES users(id),
    request_id INTEGER NOT NULL REFERENCES requests(id),
    viewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, request_id)
  );
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    role_target TEXT,
    request_id INTEGER REFERENCES requests(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'application_received',
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    head_user_id INTEGER REFERENCES users(id),
    head_name TEXT NOT NULL,
    head_email TEXT NOT NULL,
    head_designation TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);
const requestColumns = db.prepare('PRAGMA table_info(requests)').all().map((column) => column.name);
if (!requestColumns.includes('details_json')) {
  db.exec("ALTER TABLE requests ADD COLUMN details_json TEXT NOT NULL DEFAULT '{}'");
}
if (!requestColumns.includes('department_id')) {
  db.exec('ALTER TABLE requests ADD COLUMN department_id INTEGER');
}
if (!requestColumns.includes('department_name')) {
  db.exec('ALTER TABLE requests ADD COLUMN department_name TEXT');
}
if (!requestColumns.includes('department_head_id')) {
  db.exec('ALTER TABLE requests ADD COLUMN department_head_id INTEGER');
}

const userColumns = db.prepare('PRAGMA table_info(users)').all().map((column) => column.name);
if (!userColumns.includes('department_id')) {
  db.exec('ALTER TABLE users ADD COLUMN department_id INTEGER');
}
if (!userColumns.includes('department_name')) {
  db.exec('ALTER TABLE users ADD COLUMN department_name TEXT');
}
if (!userColumns.includes('designation')) {
  db.exec('ALTER TABLE users ADD COLUMN designation TEXT');
}

const MINISTERIAL_RANKS = {
  reviewer: 0,
  assistant_secretary: 1,
  senior_assistant_secretary: 2,
  additional_secretary: 3,
  secretary: 4,
  authorized_official: 4,
};

const ROLE_TITLES = {
  reviewer: { en: 'Subject Officer', si: 'විෂයභාර නිලධාරී' },
  assistant_secretary: { en: 'Assistant Secretary', si: 'සහකාර ලේකම්' },
  senior_assistant_secretary: { en: 'Senior Assistant Secretary', si: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්' },
  additional_secretary: { en: 'Additional Secretary', si: 'අතිරේක ලේකම්' },
  secretary: { en: 'Ministry Secretary', si: 'අමාත්‍යාංශ ලේකම්' },
  authorized_official: { en: 'Ministry Secretary / Authorized Officer', si: 'අමාත්‍යාංශ ලේකම් / බලයලත් නිලධාරී' },
  minister: { en: 'Hon. Minister', si: 'ගරු අමාත්‍යතුමා' },
  president: { en: 'President & Ministry of Digital Economy', si: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය' },
};

const ROLE_TO_STATUS = {
  assistant_secretary: 'Pending Assistant Secretary Review',
  senior_assistant_secretary: 'Pending Senior Assistant Secretary Review',
  additional_secretary: 'Pending Additional Secretary Review',
  secretary: 'Pending Secretary Approval',
  authorized_official: 'Pending Secretary Approval',
  minister: 'Pending Minister Approval',
  president: 'Pending Presidential Approval',
};

const seededUsers = [
  ['Portal Administrator', 'admin@foring.gov.lk', 'admin', 'Admin@123', 'System Administrator'],
  ['Nimal Perera', 'officer@foring.gov.lk', 'applicant', 'Demo@123', 'Staff Officer'],
  ['Senior Reviewing Officer', 'reviewer@foring.gov.lk', 'reviewer', 'Demo@123', 'Subject Officer (Leave & Establishments)'],
  ['Mrs. D. M. K. Dissanayake', 'asst.sec@foring.gov.lk', 'assistant_secretary', 'Demo@123', 'Assistant Secretary (Administration)'],
  ['Mr. W. A. Wickramasinghe', 'senior.asst.sec@foring.gov.lk', 'senior_assistant_secretary', 'Demo@123', 'Senior Assistant Secretary (Public Administration)'],
  ['Dr. K. T. Rajakaruna', 'addl.sec@foring.gov.lk', 'additional_secretary', 'Demo@123', 'Additional Secretary (HR & Establishments)'],
  ['වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)', 'secretary@foring.gov.lk', 'secretary', 'Demo@123', 'ලේකම් (Secretary), සිවිල් ආරක්ෂක අමාත්‍යාංශය'],
  ['Director General (Authorized Official)', 'authorized@foring.gov.lk', 'authorized_official', 'Demo@123', 'Director General (Authorized Official)'],
  ['Hon. Minister of Public Administration', 'minister@foring.gov.lk', 'minister', 'Demo@123', 'Cabinet Minister'],
  ['අතිගරු ජනාධිපතිතුමා (President)', 'president@foring.gov.lk', 'president', 'Demo@123', 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය'],
];
const addUser = db.prepare('INSERT INTO users (name, email, role, password_hash, designation) VALUES (?, ?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET role=excluded.role, name=excluded.name, password_hash=excluded.password_hash, designation=excluded.designation');
for (const [name, email, role, password, designation] of seededUsers) addUser.run(name, email, role, bcrypt.hashSync(password, 10), designation);

// 9 Official Departments registered by Admin with dedicated Department Head accounts
const initialDepartments = [
  {
    name: 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions',
    headName: 'Eng. Rohan Fernando',
    headEmail: 'head.slt@foring.gov.lk',
    headDesignation: 'Group Chief Executive Officer',
    password: 'Demo@123',
  },
  {
    name: 'Information and Communication Technology Agency and Allied Institutions',
    headName: 'Dr. Mahinda Herath',
    headEmail: 'head.icta@foring.gov.lk',
    headDesignation: 'Chief Executive Officer',
    password: 'Demo@123',
  },
  {
    name: 'Sri Lanka Computer Emergency Readiness Team',
    headName: 'Mr. Sunimal Jayasuriya',
    headEmail: 'head.cert@foring.gov.lk',
    headDesignation: 'Director / CEO - SLCERT',
    password: 'Demo@123',
  },
  {
    name: 'Data Protection Authority of Sri Lanka',
    headName: 'Mr. Aruna De Silva',
    headEmail: 'head.dpa@foring.gov.lk',
    headDesignation: 'Director General - DPA',
    password: 'Demo@123',
  },
  {
    name: 'Information Technology Parks',
    headName: 'Ms. Dilani Perera',
    headEmail: 'head.itparks@foring.gov.lk',
    headDesignation: 'Managing Director - IT Parks',
    password: 'Demo@123',
  },
  {
    name: 'Department of Registration of Person',
    headName: 'Mr. Pradeep Saputhanthri',
    headEmail: 'head.drp@foring.gov.lk',
    headDesignation: 'Commissioner General of Registration of Persons',
    password: 'Demo@123',
  },
  {
    name: 'Telecommunication Regulatory Commission of Sri Lanka and Allied Institutions',
    headName: 'Air Vice Marshal J. P. Wanigasooriya',
    headEmail: 'head.trcsl@foring.gov.lk',
    headDesignation: 'Director General - TRCSL',
    password: 'Demo@123',
  },
  {
    name: 'Colombo Lotus Tower Management Company (Pvt) Ltd',
    headName: 'Major General (Retd) Prasad Samarasinghe',
    headEmail: 'head.lotustower@foring.gov.lk',
    headDesignation: 'Chief Executive Officer',
    password: 'Demo@123',
  },
  {
    name: 'Online Safety Commission (Pvt)',
    headName: 'Mr. Priyantha Kariyawasam',
    headEmail: 'head.osc@foring.gov.lk',
    headDesignation: 'Chairman / Director General',
    password: 'Demo@123',
  },
];

for (const dept of initialDepartments) {
  const cleanEmail = dept.headEmail.trim().toLowerCase();
  const hash = bcrypt.hashSync(dept.password, 10);
  let user = db.prepare('SELECT id FROM users WHERE lower(email) = ?').get(cleanEmail);
  if (!user) {
    const res = db.prepare('INSERT INTO users (name, email, role, password_hash, designation, department_name) VALUES (?, ?, ?, ?, ?, ?)').run(
      dept.headName,
      cleanEmail,
      'department_head',
      hash,
      dept.headDesignation,
      dept.name
    );
    user = { id: Number(res.lastInsertRowid) };
  } else {
    db.prepare('UPDATE users SET name = ?, role = ?, designation = ?, department_name = ?, password_hash = ? WHERE id = ?').run(
      dept.headName,
      'department_head',
      dept.headDesignation,
      dept.name,
      hash,
      user.id
    );
  }

  let existingDept = db.prepare('SELECT id FROM departments WHERE name = ?').get(dept.name);
  if (!existingDept) {
    const dRes = db.prepare('INSERT INTO departments (name, head_user_id, head_name, head_email, head_designation) VALUES (?, ?, ?, ?, ?)').run(
      dept.name,
      user.id,
      dept.headName,
      cleanEmail,
      dept.headDesignation
    );
    const deptId = Number(dRes.lastInsertRowid);
    db.prepare('UPDATE users SET department_id = ? WHERE id = ?').run(deptId, user.id);
  } else {
    db.prepare('UPDATE departments SET head_user_id = ?, head_name = ?, head_email = ?, head_designation = ? WHERE id = ?').run(
      user.id,
      dept.headName,
      cleanEmail,
      dept.headDesignation,
      existingDept.id
    );
    db.prepare('UPDATE users SET department_id = ? WHERE id = ?').run(existingDept.id, user.id);
  }
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '') || req.query.token;
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).json({ error: 'Please sign in to continue.' });
  }
}

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: 'Full name, email, and password are required.' });
  }
  const cleanEmail = email.trim().toLowerCase();
  const existing = db.prepare('SELECT id FROM users WHERE lower(email) = ?').get(cleanEmail);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists. Please sign in.' });
  }
  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?)').run(
    name.trim(),
    cleanEmail,
    'applicant',
    hash
  );
  const profile = { id: Number(result.lastInsertRowid), name: name.trim(), email: cleanEmail, role: 'applicant' };
  res.status(201).json({ token: jwt.sign(profile, secret, { expiresIn: '8h' }), user: profile });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both your official email and password.' });
  }
  const user = db.prepare('SELECT id, name, email, role, password_hash, department_id, department_name, designation FROM users WHERE lower(email) = lower(?)').get(email.trim());
  if (!user || !bcrypt.compareSync(password || '', user.password_hash)) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }
  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department_id: user.department_id || null,
    department_name: user.department_name || null,
    designation: user.designation || null,
  };
  res.json({ token: jwt.sign(profile, secret, { expiresIn: '8h' }), user: profile });
});

app.get('/api/requests', authenticate, (req, res) => {
  let rows;
  if (req.user.role === 'department_head') {
    rows = db.prepare(`
      SELECT r.*, u.name AS applicant_name, u.email AS applicant_email,
        CASE WHEN rv.viewed_at IS NOT NULL THEN 1 ELSE 0 END AS is_viewed
      FROM requests r
      JOIN users u ON u.id = r.applicant_id
      LEFT JOIN request_views rv ON rv.request_id = r.id AND rv.user_id = ?
      WHERE (r.department_id = ? OR r.department_head_id = ? OR r.applicant_id = ? OR r.department_name = ?)
      ORDER BY r.created_at DESC, r.id DESC
    `).all(req.user.id, req.user.department_id || 0, req.user.id, req.user.id, req.user.department_name || '');
  } else {
    rows = db.prepare(`
      SELECT r.*, u.name AS applicant_name, u.email AS applicant_email,
        CASE WHEN rv.viewed_at IS NOT NULL THEN 1 ELSE 0 END AS is_viewed
      FROM requests r
      JOIN users u ON u.id = r.applicant_id
      LEFT JOIN request_views rv ON rv.request_id = r.id AND rv.user_id = ?
      WHERE (? <> 'applicant' OR r.applicant_id = ?)
      ORDER BY r.created_at DESC, r.id DESC
    `).all(req.user.id, req.user.role, req.user.id);
  }
  const approvalQuery = db.prepare(`SELECT a.*, u.name AS approver_name, u.role AS approver_role FROM approvals a JOIN users u ON u.id = a.user_id WHERE a.request_id = ? ORDER BY a.id`);
  res.json(rows.map((row) => {
    const details = JSON.parse(row.details_json || '{}');
    return {
      ...row,
      applicant_name: details.fullName?.trim() || row.applicant_name,
      is_viewed: Boolean(row.is_viewed),
      details,
      approvals: approvalQuery.all(row.id),
    };
  }));
});

app.get('/api/requests/:id', authenticate, (req, res) => {
  const requestId = Number(req.params.id);
  let row;
  if (req.user.role === 'department_head') {
    row = db.prepare(`
      SELECT r.*, u.name AS applicant_name, u.email AS applicant_email,
        CASE WHEN rv.viewed_at IS NOT NULL THEN 1 ELSE 0 END AS is_viewed
      FROM requests r
      JOIN users u ON u.id = r.applicant_id
      LEFT JOIN request_views rv ON rv.request_id = r.id AND rv.user_id = ?
      WHERE r.id = ? AND (r.department_id = ? OR r.department_head_id = ? OR r.applicant_id = ? OR r.department_name = ?)
    `).get(req.user.id, requestId, req.user.department_id || 0, req.user.id, req.user.id, req.user.department_name || '');
  } else {
    row = db.prepare(`
      SELECT r.*, u.name AS applicant_name, u.email AS applicant_email,
        CASE WHEN rv.viewed_at IS NOT NULL THEN 1 ELSE 0 END AS is_viewed
      FROM requests r
      JOIN users u ON u.id = r.applicant_id
      LEFT JOIN request_views rv ON rv.request_id = r.id AND rv.user_id = ?
      WHERE r.id = ? AND (? <> 'applicant' OR r.applicant_id = ?)
    `).get(req.user.id, requestId, req.user.role, req.user.id);
  }
  if (!row) return res.status(404).json({ error: 'Request not found.' });

  const approvalQuery = db.prepare(`SELECT a.*, u.name AS approver_name, u.role AS approver_role FROM approvals a JOIN users u ON u.id = a.user_id WHERE a.request_id = ? ORDER BY a.id`);
  const details = JSON.parse(row.details_json || '{}');
  res.json({
    ...row,
    applicant_name: details.fullName?.trim() || row.applicant_name,
    is_viewed: Boolean(row.is_viewed),
    details,
    approvals: approvalQuery.all(row.id),
  });
});

app.post('/api/requests/:id/view', authenticate, (req, res) => {
  const requestId = Number(req.params.id);
  db.prepare(`
    INSERT INTO request_views (user_id, request_id, viewed_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, request_id) DO UPDATE SET viewed_at = CURRENT_TIMESTAMP
  `).run(req.user.id, requestId);

  db.prepare(`
    UPDATE notifications SET is_read = 1
    WHERE request_id = ? AND (user_id = ? OR role_target = ? OR role_target = 'all')
  `).run(requestId, req.user.id, req.user.role);

  res.json({ success: true, is_viewed: true });
});

app.post('/api/requests', authenticate, (req, res) => {
  if (req.user.role !== 'applicant') return res.status(403).json({ error: 'Only applicants can submit a request.' });
  const { destination, purpose, startDate, endDate, leaveType, details } = req.body || {};
  const signature = req.body.signature || req.body.signatureDataUrl;
  if (![destination, purpose, startDate, endDate, leaveType, signature].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Complete all fields and add your signature.' });
  }
  const isOfficial = leaveType === 'Official duty';
  const requiredDetails = isOfficial
    ? ['fullName', 'nic', 'dateOfBirth', 'designation', 'service', 'department', 'ministry', 'firstAppointmentDate', 'leaveCategory', 'leaveBalance', 'abroadAddress', 'abroadPhone', 'airfareFunding', 'maintenanceFunding', 'dutyCoverName', 'dutyCoverDesignation']
    : ['fullName', 'designation', 'service', 'department', 'firstAppointmentDate', 'abroadAddress'];
  if (!details || typeof details !== 'object' || Array.isArray(details) || requiredDetails.some((field) => typeof details[field] !== 'string' || !details[field].trim())) {
    return res.status(400).json({
      error: isOfficial
        ? 'Complete all required fields in General 126 and Appendix 16.'
        : 'Complete all required fields in General 126.'
    });
  }
  if (endDate < startDate) return res.status(400).json({ error: 'End date must be on or after the start date.' });
  const deptName = details.department?.trim() || '';
  let dept = null;
  if (req.body.departmentId) {
    dept = db.prepare('SELECT * FROM departments WHERE id = ?').get(req.body.departmentId);
  }
  if (!dept && deptName) {
    dept = db.prepare('SELECT * FROM departments WHERE name = ? OR name LIKE ? LIMIT 1').get(deptName, `%${deptName}%`);
  }

  const departmentId = dept?.id || null;
  const departmentName = dept?.name || deptName;
  const departmentHeadId = dept?.head_user_id || null;

  // Correct Flow Step 1: Submits directly to Department Head!
  const initialStatus = 'Pending Department Head Approval';

  const updatedDetails = {
    ...details,
    forwardedDepartment: dept ? {
      id: dept.id,
      name: dept.name,
      headName: dept.head_name,
      headEmail: dept.head_email,
      headDesignation: dept.head_designation
    } : null
  };

  const result = db.prepare(`INSERT INTO requests (applicant_id, destination, purpose, start_date, end_date, leave_type, signature, details_json, status, department_id, department_name, department_head_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
      req.user.id,
      destination.trim(),
      purpose.trim(),
      startDate,
      endDate,
      leaveType,
      signature,
      JSON.stringify(updatedDetails),
      initialStatus,
      departmentId,
      departmentName,
      departmentHeadId
    );
  const newRequestId = Number(result.lastInsertRowid);

  // Automatically mark as viewed by applicant who created it
  db.prepare(`INSERT INTO request_views (user_id, request_id, viewed_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(user_id, request_id) DO NOTHING`).run(req.user.id, newRequestId);

  // Send notifications to Department Head first
  const applicantName = details.fullName?.trim() || req.user.name;
  const insertNotification = db.prepare(`
    INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  if (departmentHeadId) {
    insertNotification.run(
      departmentHeadId,
      'department_head',
      newRequestId,
      'New Leave Application For Institutional Endorsement',
      `${applicantName} from your department submitted a ${leaveType} application (FV-${String(newRequestId).padStart(4, '0')}) for your institutional review & endorsement (Est. Code XV 10:1).`,
      'action_required'
    );
  } else {
    insertNotification.run(null, 'department_head', newRequestId, 'New Application Received', `${applicantName} submitted a ${leaveType} application (FV-${String(newRequestId).padStart(4, '0')}).`, 'action_required');
  }

  insertNotification.run(null, 'admin', newRequestId, 'New Application Registered', `Leave application FV-${String(newRequestId).padStart(4, '0')} submitted by ${applicantName} to ${departmentName}.`, 'application_received');
  insertNotification.run(req.user.id, null, newRequestId, 'Application Submitted Successfully', `Your application FV-${String(newRequestId).padStart(4, '0')} was submitted to your Head of Department (${departmentName}) for endorsement.`, 'application_submitted');

  res.status(201).json({ id: newRequestId, status: initialStatus });
});

// Subject Officer assessment and Note Sheet submission endpoint (Step 3: assesses, signs, and forwards to Secretariat Official)
app.post('/api/requests/:id/officer-assessment', authenticate, (req, res) => {
  const isReviewer = req.user.role === 'reviewer' || req.user.role === 'admin';
  if (!isReviewer) return res.status(403).json({ error: 'Only subject officers / reviewers can submit officer assessments.' });

  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const { officerAssessment, noteSheet, officerRemarks, signature, targetRole, targetAuthority } = req.body || {};
  if (!officerAssessment) {
    return res.status(400).json({ error: 'Officer assessment details are required.' });
  }

  if (!signature || typeof signature !== 'string' || !signature.trim()) {
    return res.status(400).json({ error: 'Please draw and add your digital signature as Subject Officer.' });
  }

  const target = targetRole || targetAuthority || 'assistant_secretary';
  let nextStatus = 'Pending Assistant Secretary Review';
  let finalDecision = 'forward_assistant_secretary';

  if (target === 'assistant_secretary') {
    nextStatus = 'Pending Assistant Secretary Review';
    finalDecision = 'forward_assistant_secretary';
  } else if (target === 'senior_assistant_secretary') {
    nextStatus = 'Pending Senior Assistant Secretary Review';
    finalDecision = 'forward_senior_assistant_secretary';
  } else if (target === 'additional_secretary') {
    nextStatus = 'Pending Additional Secretary Review';
    finalDecision = 'forward_additional_secretary';
  } else if (target === 'secretary' || target === 'authorized_official') {
    nextStatus = 'Pending Secretary Approval';
    finalDecision = 'forward_secretary';
  } else if (target === 'minister') {
    nextStatus = 'Pending Minister Approval';
    finalDecision = 'forward_minister';
  } else if (target === 'president') {
    nextStatus = 'Pending Presidential Approval';
    finalDecision = 'forward_president';
  }

  const initialClearance = {
    role: 'reviewer',
    title: 'Subject Officer',
    titleSi: 'විෂයභාර නිලධාරී',
    userName: req.user.name,
    userEmail: req.user.email,
    userDesignation: req.user.designation || 'Subject Officer (Leave & Establishments)',
    signature,
    remarks: officerRemarks || '',
    forwardedTo: target,
    forwardedToTitle: ROLE_TITLES[target]?.en || target,
    decision: 'forward',
    timestamp: new Date().toISOString(),
    date: new Date().toISOString().slice(0, 10),
  };

  const existingDetails = JSON.parse(request.details_json || '{}');
  const updatedDetails = {
    ...existingDetails,
    officerAssessment,
    noteSheet: noteSheet || existingDetails.noteSheet || null,
    officerRemarks: officerRemarks || existingDetails.officerRemarks || '',
    officerSignature: signature,
    officerCompleted: true,
    officerCompletedAt: new Date().toISOString(),
    officerCompletedBy: {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
    },
    secretariatClearances: [initialClearance]
  };

  try {
    db.exec('BEGIN');
    db.prepare(`
      UPDATE requests
      SET details_json = ?, status = ?
      WHERE id = ?
    `).run(
      JSON.stringify(updatedDetails),
      nextStatus,
      requestId
    );

    const noteText = officerRemarks || `Subject Officer signed and completed leave entitlement assessment & Note Sheet. Forwarded to ${ROLE_TITLES[target]?.en || target}.`;

    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
      requestId,
      req.user.id,
      finalDecision,
      String(noteText).slice(0, 500)
    );

    const insertNotification = db.prepare(`
      INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Notify target official (Assistant Secretary / Senior Asst / Addl Sec / Secretary)
    insertNotification.run(
      null,
      target,
      requestId,
      'Action Required: Foreign Leave Clearance',
      `Leave application FV-${String(requestId).padStart(4, '0')} has been assessed & signed by Subject Officer ${req.user.name} and submitted for your review.`,
      'action_required'
    );

    // Notify Applicant
    insertNotification.run(
      request.applicant_id,
      null,
      requestId,
      'Officer Assessment Completed & Forwarded',
      `Subject Officer has processed & signed your leave application FV-${String(requestId).padStart(4, '0')} and forwarded it to ${ROLE_TITLES[target]?.en || target} (${nextStatus}).`,
      'info'
    );

    // Notify Admin
    insertNotification.run(
      null,
      'admin',
      requestId,
      'Officer Assessment Submitted & Forwarded',
      `Subject Officer ${req.user.name} submitted assessment for FV-${String(requestId).padStart(4, '0')} (Status: ${nextStatus}).`,
      'info'
    );

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  res.json({ success: true, status: nextStatus, details: updatedDetails });
});

// Ministry Secretariat multi-level hierarchical clearance (Assistant Sec -> Senior Asst Sec -> Addl Sec -> Secretary)
app.post('/api/requests/:id/secretariat-clearance', authenticate, (req, res) => {
  const allowedRoles = ['assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'admin'];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Only Ministry Secretariat officers or Administrators can perform this clearance.' });
  }

  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const { signature, note = '', decision = 'forward', targetRole } = req.body || {};
  const role = req.user.role;
  let nextStatus;
  let finalDecision;
  let clearanceRecord;

  if (decision === 'return') {
    nextStatus = 'Returned';
    finalDecision = 'return';
    clearanceRecord = {
      role,
      title: ROLE_TITLES[role]?.en || role,
      titleSi: ROLE_TITLES[role]?.si || '',
      userName: req.user.name,
      userEmail: req.user.email,
      userDesignation: req.user.designation || ROLE_TITLES[role]?.en || role,
      signature: signature || null,
      remarks: note || 'Returned for revisions or inquiries.',
      decision: 'return',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
    };
  } else if (decision === 'reject') {
    nextStatus = 'Rejected';
    finalDecision = 'reject';
    clearanceRecord = {
      role,
      title: ROLE_TITLES[role]?.en || role,
      titleSi: ROLE_TITLES[role]?.si || '',
      userName: req.user.name,
      userEmail: req.user.email,
      userDesignation: req.user.designation || ROLE_TITLES[role]?.en || role,
      signature: signature || null,
      remarks: note || 'Rejected by secretariat authority.',
      decision: 'reject',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
    };
  } else if (decision === 'approve' || decision === 'recommend_president') {
    const isSecretaryOrAdmin = ['secretary', 'authorized_official', 'admin'].includes(role);
    if (!isSecretaryOrAdmin) {
      return res.status(403).json({ error: 'Only the Ministry Secretary or Administrator can submit this recommendation.' });
    }
    if (!signature || typeof signature !== 'string' || !signature.trim()) {
      return res.status(400).json({ error: 'Please draw and add your digital signature.' });
    }
    // As per constitutional procedure: Secretary recommends and submits to President for final order
    nextStatus = 'Pending Presidential Approval';
    finalDecision = 'forward_president';
    clearanceRecord = {
      role,
      title: ROLE_TITLES[role]?.en || role,
      titleSi: ROLE_TITLES[role]?.si || '',
      userName: req.user.name,
      userEmail: req.user.email,
      userDesignation: req.user.designation || 'ලේකම් (Secretary), සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      ministryName: 'සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      signature,
      submissionText: 'ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.',
      recipient: 'ගරු අමාත්‍යාංශය',
      remarks: note || 'ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.',
      forwardedTo: 'president',
      forwardedToTitle: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
      decision: 'forward_president',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
    };
  } else if (decision === 'forward') {
    if (!signature || typeof signature !== 'string' || !signature.trim()) {
      return res.status(400).json({ error: 'Please draw and add your digital signature.' });
    }
    if (!targetRole) {
      return res.status(400).json({ error: 'Please select the next officer in the hierarchy to forward to.' });
    }

    // Strict hierarchy check: target must be higher rank than current user
    const currentRank = MINISTERIAL_RANKS[role] ?? 0;
    const targetRank = MINISTERIAL_RANKS[targetRole] ?? 0;

    if (role !== 'admin' && targetRank <= currentRank) {
      return res.status(400).json({
        error: `Invalid hierarchy routing: You can only forward upward to higher rank officers. An officer of rank "${ROLE_TITLES[role]?.en || role}" cannot select "${ROLE_TITLES[targetRole]?.en || targetRole}".`
      });
    }

    nextStatus = ROLE_TO_STATUS[targetRole] || 'Pending Secretary Approval';
    finalDecision = `forward_${targetRole}`;
    clearanceRecord = {
      role,
      title: ROLE_TITLES[role]?.en || role,
      titleSi: ROLE_TITLES[role]?.si || '',
      userName: req.user.name,
      userEmail: req.user.email,
      userDesignation: req.user.designation || ROLE_TITLES[role]?.en || role,
      signature,
      remarks: note || '',
      forwardedTo: targetRole,
      forwardedToTitle: ROLE_TITLES[targetRole]?.en || targetRole,
      decision: 'forward',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
    };
  } else {
    return res.status(400).json({ error: 'Invalid decision specified.' });
  }

  const existingDetails = JSON.parse(request.details_json || '{}');
  const clearances = Array.isArray(existingDetails.secretariatClearances) ? [...existingDetails.secretariatClearances] : [];
  clearances.push(clearanceRecord);

  const updatedDetails = {
    ...existingDetails,
    secretariatClearances: clearances,
    secretaryApproval: (decision === 'approve' || decision === 'recommend_president') ? {
      recipient: 'ගරු අමාත්‍යාංශය',
      submissionText: 'ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.',
      signature,
      signatoryName: req.user.name,
      designation: 'ලේකම්',
      ministry: 'සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      date: new Date().toISOString().slice(0, 10),
      timestamp: new Date().toISOString(),
      remarks: note || ''
    } : existingDetails.secretaryApproval
  };

  try {
    db.exec('BEGIN');
    db.prepare('UPDATE requests SET status = ?, details_json = ? WHERE id = ?').run(
      nextStatus,
      JSON.stringify(updatedDetails),
      requestId
    );

    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
      requestId,
      req.user.id,
      finalDecision,
      String(note).slice(0, 500)
    );

    const insertNotification = db.prepare(`
      INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    if (decision === 'forward') {
      insertNotification.run(
        null,
        targetRole,
        requestId,
        'Action Required: Ministerial Leave Clearance',
        `Application FV-${String(requestId).padStart(4, '0')} has been endorsed & forwarded by ${ROLE_TITLES[role]?.en || role} ${req.user.name} for your review.`,
        'action_required'
      );
    } else if (decision === 'approve' || decision === 'recommend_president') {
      insertNotification.run(
        null,
        'president',
        requestId,
        'Action Required: Presidential Approval for Foreign Leave',
        `Application FV-${String(requestId).padStart(4, '0')} has been recommended by Ministry Secretary ${req.user.name} and submitted for your final Presidential Order.`,
        'action_required'
      );
    }

    insertNotification.run(
      request.applicant_id,
      null,
      requestId,
      `Application Status Update: ${nextStatus}`,
      `Your foreign leave request FV-${String(requestId).padStart(4, '0')} status updated to "${nextStatus}". Remark: ${note || 'No note'}`,
      nextStatus === 'Approved' ? 'success' : (nextStatus === 'Rejected' ? 'error' : 'info')
    );

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  res.json({ success: true, status: nextStatus, details: updatedDetails });
});

// Final Presidential Order / Decision Endpoint (Constitutional Head of State)
app.post('/api/requests/:id/presidential-decision', authenticate, (req, res) => {
  const isPresident = req.user.role === 'president' || req.user.role === 'admin';
  if (!isPresident) {
    return res.status(403).json({ error: 'Only the President or Administrator can record this final decision.' });
  }

  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const { decision, note = '', signature, date } = req.body || {};
  if (!['approve', 'reject'].includes(decision)) {
    return res.status(400).json({ error: 'Please specify a valid decision ("නිවාඩුව අනුමත කරමි" or "නිවාඩු අනුමත නොකරමි").' });
  }

  if (!signature || typeof signature !== 'string' || !signature.trim()) {
    return res.status(400).json({ error: 'Please draw and add the President digital signature.' });
  }

  const nextStatus = decision === 'approve' ? 'Approved' : 'Rejected';
  const decisionText = decision === 'approve' ? 'නිවාඩුව අනුමත කරමි' : 'නිවාඩු අනුමත නොකරමි';
  const decisionDate = date || new Date().toISOString().slice(0, 10);

  const existingDetails = JSON.parse(request.details_json || '{}');
  const presidentialRecord = {
    decision,
    decisionText,
    userName: req.user.name,
    userEmail: req.user.email,
    userDesignation: req.user.designation || 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
    ministry: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
    signature,
    date: decisionDate,
    timestamp: new Date().toISOString(),
    remarks: note || ''
  };

  const updatedDetails = {
    ...existingDetails,
    presidentialDecision: presidentialRecord
  };

  try {
    db.exec('BEGIN');
    db.prepare('UPDATE requests SET status = ?, details_json = ? WHERE id = ?').run(
      nextStatus,
      JSON.stringify(updatedDetails),
      requestId
    );

    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
      requestId,
      req.user.id,
      decision === 'approve' ? 'presidential_approve' : 'presidential_reject',
      `${decisionText}. ${note}`.trim().slice(0, 500)
    );

    const insertNotification = db.prepare(`
      INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertNotification.run(
      request.applicant_id,
      null,
      requestId,
      `Presidential Order: Leave ${decision === 'approve' ? 'Approved' : 'Not Approved'}`,
      `Your foreign travel application FV-${String(requestId).padStart(4, '0')} has been officially decided by the President ("${decisionText}"). Remark: ${note || 'None'}`,
      decision === 'approve' ? 'success' : 'error'
    );

    insertNotification.run(
      null,
      'secretary',
      requestId,
      `Presidential Order Recorded: FV-${String(requestId).padStart(4, '0')}`,
      `The President has officially recorded the final order for application FV-${String(requestId).padStart(4, '0')}: "${decisionText}".`,
      'info'
    );

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  res.json({ success: true, status: nextStatus, details: updatedDetails });
});

// Head of Department Official Endorsement & Recommendation (Est. Code & Gen 126 forward)
app.post('/api/requests/:id/department-head-endorsement', authenticate, (req, res) => {
  const isDeptHead = req.user.role === 'department_head' || req.user.role === 'admin';
  if (!isDeptHead) {
    return res.status(403).json({ error: 'Only Department / Institutional Heads or Administrators can submit this endorsement.' });
  }

  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const {
    myNo,
    ministryName,
    officerSalutation,
    actingArrangementsCertified,
    noDisciplinaryActionCertified,
    primeMinisterPermission,
    recommendation,
    remarks,
    date,
    signature,
    action, // 'forward_official', 'forward_minister', 'forward_president', 'return', 'reject'
    targetAuthority
  } = req.body || {};

  if (!signature || typeof signature !== 'string' || !signature.trim()) {
    return res.status(400).json({ error: 'Please draw and add your digital signature as Head of Department.' });
  }

  if (!recommendation) {
    return res.status(400).json({ error: 'Please select whether leave is recommended or not recommended.' });
  }

  if (recommendation === 'recommended' && (!actingArrangementsCertified || !noDisciplinaryActionCertified)) {
    return res.status(400).json({ error: 'You must formally certify the acting arrangements and clearance of disciplinary proceedings.' });
  }

  let nextStatus;
  let finalDecision;
  const authority = targetAuthority || (action?.startsWith('forward_') ? action.replace('forward_', '') : 'authorized_official');

  if (recommendation === 'recommended') {
    // Correct Flow Step 2: Department Head forwards to Subject Officer (Reviewer) for leave assessment & note sheet
    nextStatus = 'Pending Review';
    finalDecision = 'endorse_forward_reviewer';
  } else {
    if (action === 'reject') {
      nextStatus = 'Rejected';
      finalDecision = 'reject';
    } else {
      nextStatus = 'Returned';
      finalDecision = 'return';
    }
  }

  const existingDetails = JSON.parse(request.details_json || '{}');
  const endorsementRecord = {
    myNo: myNo || `FV-${String(requestId).padStart(4, '0')}/HR/${new Date().getFullYear()}`,
    ministryName: ministryName || 'Ministry of Technology',
    officerSalutation: officerSalutation || 'Mr./Mrs./Miss',
    actingArrangementsCertified: Boolean(actingArrangementsCertified),
    noDisciplinaryActionCertified: Boolean(noDisciplinaryActionCertified),
    primeMinisterPermission: primeMinisterPermission || 'obtained',
    recommendation,
    remarks: remarks || '',
    date: date || new Date().toISOString().slice(0, 10),
    signature,
    completedAt: new Date().toISOString(),
    completedBy: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      designation: req.user.designation || 'Head of Department / Institution',
      department: request.department_name || req.user.department_name || ''
    }
  };

  const updatedDetails = {
    ...existingDetails,
    departmentHeadEndorsement: endorsementRecord
  };

  try {
    db.exec('BEGIN');
    db.prepare('UPDATE requests SET details_json = ?, status = ? WHERE id = ?').run(
      JSON.stringify(updatedDetails),
      nextStatus,
      requestId
    );

    const noteText = remarks || (recommendation === 'recommended' ? 'Endorsed and recommended by Head of Department. Forwarded to Subject Officer.' : 'Not recommended by Head of Department');
    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
      requestId,
      req.user.id,
      finalDecision,
      String(noteText).slice(0, 500)
    );

    const insertNotification = db.prepare(`
      INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Notify Subject Officer (Reviewer) if forwarded
    if (nextStatus === 'Pending Review') {
      insertNotification.run(
        null,
        'reviewer',
        requestId,
        'Action Required: Subject Officer Assessment & Note Sheet',
        `Leave application FV-${String(requestId).padStart(4, '0')} has been endorsed & recommended by ${endorsementRecord.completedBy.department || 'Head of Department'}. Please prepare leave entitlement assessment and note sheet.`,
        'action_required'
      );
    }

    // Notify Applicant
    insertNotification.run(
      request.applicant_id,
      null,
      requestId,
      `Department Head Action: ${recommendation === 'recommended' ? 'Endorsed & Forwarded' : nextStatus}`,
      `Head of Department (${req.user.name}) has completed institutional endorsement: ${recommendation === 'recommended' ? 'Recommended and forwarded to Ministry Secretary' : 'Not recommended / Returned'}.`,
      recommendation === 'recommended' ? 'success' : 'info'
    );

    // Notify Admin
    insertNotification.run(
      null,
      'admin',
      requestId,
      'Department Head Endorsement Submitted',
      `${req.user.name} submitted official institutional endorsement for FV-${String(requestId).padStart(4, '0')}.`,
      'info'
    );

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  res.json({
    success: true,
    status: nextStatus,
    endorsement: endorsementRecord,
    details: updatedDetails
  });
});

app.put('/api/requests/:id', authenticate, (req, res) => {
  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const isAdmin = req.user.role === 'admin';
  const isOwner = req.user.id === request.applicant_id;
  if (!isAdmin && !isOwner) {
    return res.status(403).json({ error: 'You are not authorized to edit this request.' });
  }

  // Editable statuses (including Rejected)
  const editableStatuses = ['Pending Department Head Approval', 'Pending Review', 'Returned', 'Rejected'];
  if (!isAdmin && !editableStatuses.includes(request.status)) {
    return res.status(400).json({ error: `Cannot edit request in status "${request.status}". Only pending, returned, or rejected requests can be edited.` });
  }

  const { destination, purpose, startDate, endDate, leaveType, details, signature, resubmit, correctionNotes } = req.body || {};
  const isResubmitting = resubmit || ['Rejected', 'Returned'].includes(request.status);
  const currentDetails = JSON.parse(request.details_json || '{}');

  let mergedDetails = {
    ...currentDetails,
    ...(details || {}),
  };

  let newStatus = request.status;

  if (isResubmitting) {
    newStatus = 'Pending Department Head Approval';
    const rejectionHistory = [...(currentDetails.rejectionHistory || [])];
    if (currentDetails.rejectionRecord) {
      rejectionHistory.push({
        ...currentDetails.rejectionRecord,
        archivedAt: new Date().toISOString(),
        resolvedByResubmission: true
      });
    }

    const appliedCorrectionNotes = (correctionNotes || details?.correctionNotes || '').trim();
    const resubmissionRecord = {
      resubmittedAt: new Date().toISOString(),
      resubmittedDate: new Date().toISOString().slice(0, 10),
      resubmittedBy: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email
      },
      correctionNotes: appliedCorrectionNotes,
      previousStatus: request.status
    };

    const resubmissionHistory = [...(currentDetails.resubmissionHistory || []), resubmissionRecord];

    mergedDetails = {
      ...mergedDetails,
      rejectionRecord: null,
      rejectionHistory,
      resubmissionRecord,
      resubmissionHistory,
      correctionNotes: appliedCorrectionNotes,
      isResubmitted: true,
      // Reset stages so hierarchy approval cycle restarts afresh
      departmentHeadEndorsement: null,
      officerCompleted: false,
      officerAssessment: null,
      secretariatClearance: null,
      secretaryApproval: null,
      presidentialDecision: null
    };
  }

  const newDestination = destination?.trim() || request.destination;
  const newPurpose = purpose?.trim() || request.purpose;
  const newStartDate = startDate || request.start_date;
  const newEndDate = endDate || request.end_date;
  const newLeaveType = leaveType || request.leave_type;
  const newSignature = signature || request.signature;

  if (newEndDate < newStartDate) {
    return res.status(400).json({ error: 'End date must be on or after start date.' });
  }

  try {
    db.prepare(`
      UPDATE requests
      SET status = ?, destination = ?, purpose = ?, start_date = ?, end_date = ?, leave_type = ?, signature = ?, details_json = ?
      WHERE id = ?
    `).run(
      newStatus,
      newDestination,
      newPurpose,
      newStartDate,
      newEndDate,
      newLeaveType,
      newSignature,
      JSON.stringify(mergedDetails),
      requestId
    );

    if (isResubmitting) {
      const notesSnippet = mergedDetails.correctionNotes ? ` Notes: "${mergedDetails.correctionNotes}"` : '';
      db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
        requestId,
        req.user.id,
        'resubmit',
        `Application resubmitted by ${req.user.name} after fixing shortcomings.${notesSnippet}`
      );

      // Notify Department Head
      db.prepare(`
        INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        request.department_head_id || null,
        'department_head',
        requestId,
        'Application Resubmitted (අඩුපාඩු සකසා නැවත යොමු කරන ලදී)',
        `Application FV-${String(requestId).padStart(4, '0')} has been amended and resubmitted by ${req.user.name}.${notesSnippet}`,
        'application_received'
      );

      // Notify Applicant
      db.prepare(`
        INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        request.applicant_id,
        null,
        requestId,
        'Application Resubmitted Successfully',
        `Your application FV-${String(requestId).padStart(4, '0')} has been resubmitted and forwarded to Head of Department for review.`,
        'success'
      );
    } else {
      db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
        requestId,
        req.user.id,
        'edit',
        `Application updated by ${req.user.name} (${req.user.role}).`
      );
    }

    const updated = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
    res.json({
      success: true,
      message: isResubmitting
        ? `Request FV-${String(requestId).padStart(4, '0')} resubmitted successfully for review.`
        : `Request FV-${String(requestId).padStart(4, '0')} updated successfully.`,
      request: {
        ...updated,
        details: mergedDetails
      }
    });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: 'Failed to update request.' });
  }
});

app.post('/api/requests/:id/reject', authenticate, (req, res) => {
  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const allowedRoles = ['department_head', 'reviewer', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'minister', 'president', 'admin'];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'You are not authorized to reject applications.' });
  }

  const { reason, note, signature } = req.body || {};
  const rejectionNote = (reason || note || '').trim();
  if (!rejectionNote) {
    return res.status(400).json({ error: 'Rejection reason / remarks are required.' });
  }

  const existingDetails = JSON.parse(request.details_json || '{}');
  const rejectionRecord = {
    rejectedBy: {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
      designation: req.user.designation || req.user.role,
    },
    reason: rejectionNote,
    signature: signature || null,
    date: new Date().toISOString().slice(0, 10),
    timestamp: new Date().toISOString(),
  };

  const updatedDetails = {
    ...existingDetails,
    rejectionRecord,
  };

  try {
    db.exec('BEGIN');
    db.prepare('UPDATE requests SET status = ?, details_json = ? WHERE id = ?').run(
      'Rejected',
      JSON.stringify(updatedDetails),
      requestId
    );

    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
      requestId,
      req.user.id,
      'reject',
      `Application rejected by ${req.user.name} (${req.user.role}): ${rejectionNote.slice(0, 400)}`
    );

    db.prepare(`
      INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      request.applicant_id,
      null,
      requestId,
      'Application Rejected (නිවාඩු අනුමත නොකරමි)',
      `Your foreign leave application FV-${String(requestId).padStart(4, '0')} has been rejected by ${req.user.name} (${req.user.role}). Reason: ${rejectionNote}`,
      'error'
    );

    db.exec('COMMIT');
    res.json({ success: true, status: 'Rejected', message: 'Application rejected successfully.' });
  } catch (err) {
    db.exec('ROLLBACK');
    res.status(500).json({ error: 'Failed to reject request.' });
  }
});

app.delete('/api/requests/:id', authenticate, (req, res) => {
  const requestId = Number(req.params.id);
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const isAdmin = req.user.role === 'admin';
  const isOwner = req.user.id === request.applicant_id;
  if (!isAdmin && !isOwner) {
    return res.status(403).json({ error: 'You are not authorized to delete this request.' });
  }

  try {
    db.exec('BEGIN');
    db.prepare('DELETE FROM approvals WHERE request_id = ?').run(requestId);
    db.prepare('DELETE FROM request_views WHERE request_id = ?').run(requestId);
    db.prepare('DELETE FROM notifications WHERE request_id = ?').run(requestId);
    db.prepare('DELETE FROM requests WHERE id = ?').run(requestId);
    db.exec('COMMIT');
    res.json({ success: true, message: `Request FV-${String(requestId).padStart(4, '0')} deleted successfully.` });
  } catch (err) {
    db.exec('ROLLBACK');
    res.status(500).json({ error: 'Failed to delete request.' });
  }
});

// Download Complete Application Dossier as ZIP (7 Items)
app.get('/api/requests/:id/download-zip', authenticate, async (req, res) => {
  const requestId = Number(req.params.id);
  const request = db.prepare(`
    SELECT r.*, u.name AS applicant_name, u.email AS applicant_email
    FROM requests r
    JOIN users u ON u.id = r.applicant_id
    WHERE r.id = ?
  `).get(requestId);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const isOwner = req.user.id === request.applicant_id;
  const isApprover = ['department_head', 'reviewer', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'minister', 'president', 'admin'].includes(req.user.role);
  if (!isOwner && !isApprover) {
    return res.status(403).json({ error: 'You are not authorized to download this application dossier.' });
  }

  try {
    request.details = JSON.parse(request.details_json || '{}');
    const { filename, buffer } = await generateRequestZip(request);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (err) {
    console.error('Error generating application ZIP archive:', err);
    res.status(500).json({ error: 'Failed to generate application ZIP package.' });
  }
});

// Departments API (Admin registers departments and their heads)
app.get('/api/departments', authenticate, (req, res) => {
  const departments = db.prepare('SELECT * FROM departments ORDER BY id ASC').all();
  res.json(departments);
});

app.post('/api/departments', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can register departments.' });
  const { name, headName, headDesignation, headEmail, headPassword } = req.body || {};
  if (!name?.trim() || !headName?.trim() || !headDesignation?.trim() || !headEmail?.trim() || !headPassword?.trim()) {
    return res.status(400).json({ error: 'Department name, head name, designation, dedicated email, and password are all required.' });
  }

  const cleanName = name.trim();
  const cleanEmail = headEmail.trim().toLowerCase();

  const existingDept = db.prepare('SELECT id FROM departments WHERE lower(name) = lower(?)').get(cleanName);
  if (existingDept) {
    return res.status(400).json({ error: 'A department with this name is already registered.' });
  }

  const existingUser = db.prepare('SELECT id FROM users WHERE lower(email) = ?').get(cleanEmail);
  if (existingUser) {
    return res.status(400).json({ error: 'A user with this official email is already registered.' });
  }

  try {
    db.exec('BEGIN');
    const hash = bcrypt.hashSync(headPassword.trim(), 10);
    const uResult = db.prepare('INSERT INTO users (name, email, role, password_hash, designation, department_name) VALUES (?, ?, ?, ?, ?, ?)').run(
      headName.trim(),
      cleanEmail,
      'department_head',
      hash,
      headDesignation.trim(),
      cleanName
    );
    const headUserId = Number(uResult.lastInsertRowid);

    const dResult = db.prepare('INSERT INTO departments (name, head_user_id, head_name, head_email, head_designation) VALUES (?, ?, ?, ?, ?)').run(
      cleanName,
      headUserId,
      headName.trim(),
      cleanEmail,
      headDesignation.trim()
    );
    const deptId = Number(dResult.lastInsertRowid);

    db.prepare('UPDATE users SET department_id = ? WHERE id = ?').run(deptId, headUserId);
    db.exec('COMMIT');

    const created = db.prepare('SELECT * FROM departments WHERE id = ?').get(deptId);
    res.status(201).json(created);
  } catch (err) {
    db.exec('ROLLBACK');
    res.status(500).json({ error: err.message || 'Failed to register department' });
  }
});

app.delete('/api/departments/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can remove departments.' });
  const deptId = Number(req.params.id);
  const dept = db.prepare('SELECT * FROM departments WHERE id = ?').get(deptId);
  if (!dept) return res.status(404).json({ error: 'Department not found.' });

  const hasRequests = db.prepare('SELECT id FROM requests WHERE department_id = ? LIMIT 1').get(deptId);
  if (hasRequests) {
    return res.status(400).json({ error: 'Cannot delete department because applications have been routed to it.' });
  }

  try {
    db.exec('BEGIN');
    db.prepare('DELETE FROM departments WHERE id = ?').run(deptId);
    if (dept.head_user_id) {
      db.prepare('UPDATE users SET department_id = NULL WHERE id = ?').run(dept.head_user_id);
    }
    db.exec('COMMIT');
    res.json({ success: true, message: `Department "${dept.name}" removed.` });
  } catch (err) {
    db.exec('ROLLBACK');
    res.status(500).json({ error: 'Failed to delete department.' });
  }
});

app.get('/api/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can view users.' });
  const users = db.prepare('SELECT id, name, email, role, department_id, department_name, designation FROM users ORDER BY id ASC').all();
  res.json(users);
});

app.post('/api/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can add users.' });
  const { name, email, role, password, designation, departmentName } = req.body || {};
  if (!name || !email || !role || !password) {
    return res.status(400).json({ error: 'Name, email, role, and password are required.' });
  }
  const validRoles = ['admin', 'applicant', 'reviewer', 'department_head', 'authorized_official', 'minister', 'president', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role selected.' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE lower(email) = lower(?)').get(email.trim());
  if (existing) {
    return res.status(400).json({ error: 'A user with this email already exists.' });
  }
  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, role, password_hash, designation, department_name) VALUES (?, ?, ?, ?, ?, ?)').run(
    name.trim(),
    email.trim().toLowerCase(),
    role,
    hash,
    designation?.trim() || null,
    departmentName?.trim() || null
  );
  res.status(201).json({ id: Number(result.lastInsertRowid), name: name.trim(), email: email.trim().toLowerCase(), role });
});

app.delete('/api/users/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can delete users.' });
  const targetId = Number(req.params.id);
  if (targetId === req.user.id) return res.status(400).json({ error: 'You cannot delete your own administrator account.' });
  const hasRequests = db.prepare('SELECT id FROM requests WHERE applicant_id = ? LIMIT 1').get(targetId);
  if (hasRequests) return res.status(400).json({ error: 'Cannot delete user because they have submitted requests.' });
  db.prepare('DELETE FROM users WHERE id = ?').run(targetId);
  res.json({ success: true });
});

app.post('/api/requests/:id/decision', authenticate, (req, res) => {
  const { decision, note = '', targetAuthority } = req.body || {};
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);
  if (!request) return res.status(404).json({ error: 'Request not found.' });

  const role = req.user.role;
  let nextStatus;

  // Department Head actions
  if (role === 'department_head' || (role === 'admin' && request.status === 'Pending Department Head Approval')) {
    if (decision === 'forward_reviewer' || decision === 'recommend') {
      nextStatus = 'Pending Review';
    } else if (decision === 'forward_official' || targetAuthority === 'authorized_official') {
      nextStatus = 'Pending Official Authorization';
    } else if (decision === 'forward_minister' || targetAuthority === 'minister') {
      nextStatus = 'Pending Minister Approval';
    } else if (decision === 'forward_president' || targetAuthority === 'president') {
      nextStatus = 'Pending Presidential Approval';
    } else if (decision === 'approve') {
      nextStatus = 'Approved';
    } else if (decision === 'return') {
      nextStatus = 'Returned';
    } else if (decision === 'reject') {
      nextStatus = 'Rejected';
    }
  }

  // Reviewer actions (reviews application and forwards to Authority)
  if ((role === 'reviewer' || role === 'admin') && !nextStatus) {
    if (decision === 'forward_assistant_secretary') {
      nextStatus = 'Pending Assistant Secretary Review';
    } else if (decision === 'forward_senior_assistant_secretary') {
      nextStatus = 'Pending Senior Assistant Secretary Review';
    } else if (decision === 'forward_additional_secretary') {
      nextStatus = 'Pending Additional Secretary Review';
    } else if (decision === 'forward_secretary' || decision === 'forward_official' || targetAuthority === 'authorized_official') {
      nextStatus = 'Pending Secretary Approval';
    } else if (decision === 'forward_minister' || targetAuthority === 'minister') {
      nextStatus = 'Pending Minister Approval';
    } else if (decision === 'forward_president' || targetAuthority === 'president') {
      nextStatus = 'Pending Presidential Approval';
    } else if (decision === 'return') {
      nextStatus = 'Returned';
    } else if (decision === 'reject') {
      nextStatus = 'Rejected';
    }
  }

  // Ministry Secretariat roles (Assistant Sec, Senior Asst Sec, Addl Sec, Secretary)
  const isSecretariat = ['assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary'].includes(role);
  if (isSecretariat && !nextStatus) {
    if (decision === 'approve' && role === 'secretary') {
      nextStatus = 'Approved';
    } else if (decision === 'return') {
      nextStatus = 'Returned';
    } else if (decision === 'reject') {
      nextStatus = 'Rejected';
    } else if (decision?.startsWith('forward_') || targetAuthority) {
      const target = targetAuthority || decision.replace('forward_', '');
      nextStatus = ROLE_TO_STATUS[target] || 'Pending Secretary Approval';
    }
  }

  // Authority actions (Official Authorized, Minister, President)
  const isAuthority = ['authorized_official', 'minister', 'president', 'admin'].includes(role);
  if (isAuthority && !nextStatus) {
    if (decision === 'approve') {
      nextStatus = 'Approved';
    } else if (decision === 'return') {
      nextStatus = 'Returned';
    } else if (decision === 'reject') {
      nextStatus = 'Rejected';
    }
  }

  // Admin fallback for any direct action
  if (role === 'admin' && !nextStatus) {
    if (decision === 'approve') nextStatus = 'Approved';
    else if (decision === 'return') nextStatus = 'Returned';
    else if (decision === 'reject') nextStatus = 'Rejected';
  }

  if (!nextStatus) {
    return res.status(403).json({ error: 'Your role cannot perform this action at the current stage.' });
  }

  try {
    db.exec('BEGIN');
    db.prepare('UPDATE requests SET status = ? WHERE id = ?').run(nextStatus, request.id);
    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(
      request.id,
      req.user.id,
      decision,
      String(note).slice(0, 500)
    );

    // Create notifications for applicant and forwarded authority
    const insertNotification = db.prepare(`
      INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    if (targetAuthority) {
      insertNotification.run(
        null,
        targetAuthority,
        request.id,
        'Action Required: Foreign Leave Clearance',
        `Request FV-${String(request.id).padStart(4, '0')} has been submitted for your formal clearance / approval.`,
        'action_required'
      );
    }

    insertNotification.run(
      request.applicant_id,
      null,
      request.id,
      `Application Status Update: ${nextStatus}`,
      `Your foreign travel application FV-${String(request.id).padStart(4, '0')} has been updated to "${nextStatus}". Remark: ${note || 'No additional note'}`,
      nextStatus === 'Approved' ? 'success' : (nextStatus === 'Rejected' ? 'error' : 'info')
    );

    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  res.json({ status: nextStatus });
});

app.get('/api/notifications', authenticate, (req, res) => {
  const notifications = db.prepare(`
    SELECT n.*, r.destination, r.status AS request_status
    FROM notifications n
    LEFT JOIN requests r ON r.id = n.request_id
    WHERE n.user_id = ? OR n.role_target = ? OR n.role_target = 'all'
    ORDER BY n.created_at DESC, n.id DESC
    LIMIT 40
  `).all(req.user.id, req.user.role);

  const unreadCount = db.prepare(`
    SELECT COUNT(*) AS count
    FROM notifications
    WHERE is_read = 0 AND (user_id = ? OR role_target = ? OR role_target = 'all')
  `).get(req.user.id, req.user.role).count;

  res.json({ notifications, unreadCount });
});

app.post('/api/notifications/:id/read', authenticate, (req, res) => {
  db.prepare(`UPDATE notifications SET is_read = 1 WHERE id = ?`).run(req.params.id);
  res.json({ success: true });
});

app.post('/api/notifications/read-all', authenticate, (req, res) => {
  db.prepare(`
    UPDATE notifications SET is_read = 1
    WHERE user_id = ? OR role_target = ? OR role_target = 'all'
  `).run(req.user.id, req.user.role);
  res.json({ success: true });
});

app.listen(port, () => console.log(`Portal API listening at http://localhost:${port}`));