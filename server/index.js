import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

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
`);
const requestColumns = db.prepare('PRAGMA table_info(requests)').all().map((column) => column.name);
if (!requestColumns.includes('details_json')) {
  db.exec("ALTER TABLE requests ADD COLUMN details_json TEXT NOT NULL DEFAULT '{}'");
}

const seededUsers = [
  ['Portal Administrator', 'admin@foring.gov.lk', 'admin', 'Admin@123'],
  ['Nimal Perera', 'officer@foring.gov.lk', 'applicant', 'Demo@123'],
  ['Senior Reviewing Officer', 'reviewer@foring.gov.lk', 'reviewer', 'Demo@123'],
  ['Director General (Authorized Official)', 'authorized@foring.gov.lk', 'authorized_official', 'Demo@123'],
  ['Hon. Minister of Public Administration', 'minister@foring.gov.lk', 'minister', 'Demo@123'],
  ['Secretary to the President', 'president@foring.gov.lk', 'president', 'Demo@123'],
];
const addUser = db.prepare('INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET role=excluded.role, name=excluded.name, password_hash=excluded.password_hash');
for (const [name, email, role, password] of seededUsers) addUser.run(name, email, role, bcrypt.hashSync(password, 10));

if (db.prepare('SELECT COUNT(*) AS total FROM requests').get().total === 0) {
  const applicant = db.prepare("SELECT id FROM users WHERE role = 'applicant'").get();
  const insertRequest = db.prepare('INSERT INTO requests (applicant_id, destination, purpose, start_date, end_date, leave_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertRequest.run(applicant.id, 'Tokyo, Japan', 'Asia-Pacific Public Service Innovation Forum', '2026-11-12', '2026-11-18', 'Official duty', 'Pending Review');
  insertRequest.run(applicant.id, 'New Delhi, India', 'Regional workshop on digital government', '2026-12-03', '2026-12-07', 'Official duty', 'Pending Minister Approval');
  insertRequest.run(applicant.id, 'Singapore', 'Annual leave', '2026-10-22', '2026-10-26', 'Private leave', 'Approved');
}

if (db.prepare('SELECT COUNT(*) AS total FROM notifications').get().total === 0) {
  const insertNotif = db.prepare('INSERT INTO notifications (user_id, role_target, request_id, title, message, type, is_read) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertNotif.run(null, 'reviewer', 1, 'New Leave Application Received', 'Nimal Perera submitted an official leave request to Tokyo, Japan (FV-0001).', 'application_received', 0);
  insertNotif.run(null, 'reviewer', 2, 'Pending Review Required', 'Nimal Perera applied for foreign visit to New Delhi, India (FV-0002).', 'action_required', 0);
  insertNotif.run(null, 'admin', 1, 'Application Submitted: FV-0001', 'Official duty leave application to Tokyo, Japan received.', 'application_received', 0);
  insertNotif.run(null, 'minister', 2, 'Action Required: Ministerial Approval', 'Request FV-0002 for Regional Workshop in New Delhi awaits approval.', 'action_required', 0);
}

app.use(express.json({ limit: '2mb' }));

function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
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
  const user = db.prepare('SELECT id, name, email, role, password_hash FROM users WHERE lower(email) = lower(?)').get(email.trim());
  if (!user || !bcrypt.compareSync(password || '', user.password_hash)) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }
  const profile = { id: user.id, name: user.name, email: user.email, role: user.role };
  res.json({ token: jwt.sign(profile, secret, { expiresIn: '8h' }), user: profile });
});

app.get('/api/requests', authenticate, (req, res) => {
  const rows = db.prepare(`
    SELECT r.*, u.name AS applicant_name, u.email AS applicant_email,
      CASE WHEN rv.viewed_at IS NOT NULL THEN 1 ELSE 0 END AS is_viewed
    FROM requests r
    JOIN users u ON u.id = r.applicant_id
    LEFT JOIN request_views rv ON rv.request_id = r.id AND rv.user_id = ?
    WHERE (? <> 'applicant' OR r.applicant_id = ?)
    ORDER BY r.created_at DESC, r.id DESC
  `).all(req.user.id, req.user.role, req.user.id);
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
  const { destination, purpose, startDate, endDate, leaveType, signature, details } = req.body || {};
  if (![destination, purpose, startDate, endDate, leaveType, signature].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Complete all fields and add your signature.' });
  }
  const isOfficial = leaveType === 'Official duty';
  const requiredDetails = isOfficial
    ? ['fullName', 'nic', 'dateOfBirth', 'designation', 'service', 'department', 'ministry', 'firstAppointmentDate', 'leaveCategory', 'leaveBalance', 'abroadAddress', 'abroadPhone', 'airfareFunding', 'maintenanceFunding', 'dutyCoverName', 'dutyCoverDesignation']
    : ['fullName', 'designation', 'service', 'department', 'firstAppointmentDate', 'leaveCategory', 'leaveBalance', 'abroadAddress', 'abroadPhone', 'airfareFunding', 'maintenanceFunding'];
  if (!details || typeof details !== 'object' || Array.isArray(details) || requiredDetails.some((field) => typeof details[field] !== 'string' || !details[field].trim())) {
    return res.status(400).json({
      error: isOfficial
        ? 'Complete all required fields in General 126 and Appendix 16.'
        : 'Complete all required fields in General 126.'
    });
  }
  if (endDate < startDate) return res.status(400).json({ error: 'End date must be on or after the start date.' });
  const result = db.prepare(`INSERT INTO requests (applicant_id, destination, purpose, start_date, end_date, leave_type, signature, details_json, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending Review')`).run(req.user.id, destination.trim(), purpose.trim(), startDate, endDate, leaveType, signature, JSON.stringify(details));
  const newRequestId = Number(result.lastInsertRowid);

  // Automatically mark as viewed by applicant who created it
  db.prepare(`INSERT INTO request_views (user_id, request_id, viewed_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(user_id, request_id) DO NOTHING`).run(req.user.id, newRequestId);

  // Send notifications
  const applicantName = details.fullName?.trim() || req.user.name;
  const insertNotification = db.prepare(`
    INSERT INTO notifications (user_id, role_target, request_id, title, message, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertNotification.run(null, 'reviewer', newRequestId, 'New Application Received', `${applicantName} submitted a ${leaveType} application to ${destination.trim()} (FV-${String(newRequestId).padStart(4, '0')}).`, 'application_received');
  insertNotification.run(null, 'admin', newRequestId, 'New Application Registered', `Leave application FV-${String(newRequestId).padStart(4, '0')} submitted by ${applicantName}.`, 'application_received');
  insertNotification.run(req.user.id, null, newRequestId, 'Application Submitted Successfully', `Your application FV-${String(newRequestId).padStart(4, '0')} for ${leaveType} to ${destination.trim()} was received and is pending review.`, 'application_submitted');

  res.status(201).json({ id: newRequestId });
});

app.get('/api/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can view users.' });
  const users = db.prepare('SELECT id, name, email, role FROM users ORDER BY id ASC').all();
  res.json(users);
});

app.post('/api/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only administrators can add users.' });
  const { name, email, role, password } = req.body || {};
  if (!name || !email || !role || !password) {
    return res.status(400).json({ error: 'Name, email, role, and password are required.' });
  }
  const validRoles = ['admin', 'applicant', 'reviewer', 'authorized_official', 'minister', 'president'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role selected.' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE lower(email) = lower(?)').get(email.trim());
  if (existing) {
    return res.status(400).json({ error: 'A user with this email already exists.' });
  }
  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?)').run(
    name.trim(),
    email.trim().toLowerCase(),
    role,
    hash
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

  // Reviewer actions (reviews application and forwards to Minister, President, or Authorized Official)
  if (role === 'reviewer' || role === 'admin') {
    if (decision === 'forward_official' || targetAuthority === 'authorized_official') {
      nextStatus = 'Pending Official Authorization';
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