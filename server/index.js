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
`);
const requestColumns = db.prepare('PRAGMA table_info(requests)').all().map((column) => column.name);
if (!requestColumns.includes('details_json')) {
  db.exec("ALTER TABLE requests ADD COLUMN details_json TEXT NOT NULL DEFAULT '{}'");
}

const seededUsers = [
  ['Portal Administrator', 'admin@foring.gov.lk', 'admin', 'Admin@123'],
  ['Nimal Perera', 'officer@foring.gov.lk', 'applicant', 'Demo@123'],
  ['Saman Jayawardena', 'supervisor@foring.gov.lk', 'supervisor', 'Demo@123'],
  ['Kumari Fernando', 'hr@foring.gov.lk', 'hr', 'Demo@123'],
  ['Ruwan Silva', 'finance@foring.gov.lk', 'finance', 'Demo@123'],
  ['Chathuri Wijesinghe', 'director@foring.gov.lk', 'director', 'Demo@123'],
];
const addUser = db.prepare('INSERT OR IGNORE INTO users (name, email, role, password_hash) VALUES (?, ?, ?, ?)');
for (const [name, email, role, password] of seededUsers) addUser.run(name, email, role, bcrypt.hashSync(password, 10));

if (db.prepare('SELECT COUNT(*) AS total FROM requests').get().total === 0) {
  const applicant = db.prepare("SELECT id FROM users WHERE role = 'applicant'").get();
  const insertRequest = db.prepare('INSERT INTO requests (applicant_id, destination, purpose, start_date, end_date, leave_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertRequest.run(applicant.id, 'Tokyo, Japan', 'Asia-Pacific Public Service Innovation Forum', '2026-11-12', '2026-11-18', 'Official duty', 'Pending Supervisor');
  insertRequest.run(applicant.id, 'New Delhi, India', 'Regional workshop on digital government', '2026-12-03', '2026-12-07', 'Official duty', 'Pending HR');
  insertRequest.run(applicant.id, 'Singapore', 'Annual leave', '2026-10-22', '2026-10-26', 'Private leave', 'Approved');
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

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body || {};
  const user = db.prepare('SELECT id, name, email, role, password_hash FROM users WHERE lower(email) = lower(?)').get(email || '');
  if (!user || user.role !== role || !bcrypt.compareSync(password || '', user.password_hash)) {
    return res.status(401).json({ error: 'Email, password, or selected role is incorrect.' });
  }
  const profile = { id: user.id, name: user.name, email: user.email, role: user.role };
  res.json({ token: jwt.sign(profile, secret, { expiresIn: '8h' }), user: profile });
});

app.get('/api/requests', authenticate, (req, res) => {
  const rows = db.prepare(`
    SELECT r.*, u.name AS applicant_name, u.email AS applicant_email
    FROM requests r JOIN users u ON u.id = r.applicant_id
    WHERE (? <> 'applicant' OR r.applicant_id = ?)
    ORDER BY r.created_at DESC, r.id DESC
  `).all(req.user.role, req.user.id);
  const approvalQuery = db.prepare(`SELECT a.*, u.name AS approver_name FROM approvals a JOIN users u ON u.id = a.user_id WHERE a.request_id = ? ORDER BY a.id`);
  res.json(rows.map((row) => ({
    ...row,
    details: JSON.parse(row.details_json || '{}'),
    approvals: approvalQuery.all(row.id),
  })));
});

app.post('/api/requests', authenticate, (req, res) => {
  if (req.user.role !== 'applicant') return res.status(403).json({ error: 'Only applicants can submit a request.' });
  const { destination, purpose, startDate, endDate, leaveType, signature, details } = req.body || {};
  if (![destination, purpose, startDate, endDate, leaveType, signature].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Complete all fields and add your signature.' });
  }
  const requiredDetails = ['nic', 'dateOfBirth', 'designation', 'service', 'ministry', 'firstAppointmentDate', 'leaveCategory', 'leaveBalance', 'abroadAddress', 'abroadPhone', 'airfareFunding', 'maintenanceFunding', 'dutyCoverName', 'dutyCoverDesignation'];
  if (!details || typeof details !== 'object' || Array.isArray(details) || requiredDetails.some((field) => typeof details[field] !== 'string' || !details[field].trim())) {
    return res.status(400).json({ error: 'Complete the required Appendix 16 and General 126 details.' });
  }
  if (endDate < startDate) return res.status(400).json({ error: 'End date must be on or after the start date.' });
  const result = db.prepare(`INSERT INTO requests (applicant_id, destination, purpose, start_date, end_date, leave_type, signature, details_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(req.user.id, destination.trim(), purpose.trim(), startDate, endDate, leaveType, signature, JSON.stringify(details));
  res.status(201).json({ id: Number(result.lastInsertRowid) });
});

const approvalStages = {
  supervisor: ['Pending Supervisor', 'Pending HR'],
  hr: ['Pending HR', 'Pending Finance'],
  finance: ['Pending Finance', 'Pending Director'],
  director: ['Pending Director', 'Approved'],
};
const nextApprovalStages = {
  'Pending Supervisor': 'Pending HR',
  'Pending HR': 'Pending Finance',
  'Pending Finance': 'Pending Director',
  'Pending Director': 'Approved',
};

app.post('/api/requests/:id/decision', authenticate, (req, res) => {
  const { decision, note = '' } = req.body || {};
  const stages = approvalStages[req.user.role];
  const request = db.prepare('SELECT * FROM requests WHERE id = ?').get(req.params.id);
  if (!request) return res.status(404).json({ error: 'Request not found.' });
  const canAct = req.user.role === 'admin'
    ? Object.hasOwn(nextApprovalStages, request.status)
    : stages?.[0] === request.status;
  if (!canAct || !['approve', 'return'].includes(decision)) {
    return res.status(403).json({ error: 'This role cannot act on the request at its current stage.' });
  }
  const nextStatus = decision === 'return' ? 'Returned' : (req.user.role === 'admin' ? nextApprovalStages[request.status] : stages[1]);
  try {
    db.exec('BEGIN');
    db.prepare('UPDATE requests SET status = ? WHERE id = ?').run(nextStatus, request.id);
    db.prepare('INSERT INTO approvals (request_id, user_id, decision, note) VALUES (?, ?, ?, ?)').run(request.id, req.user.id, decision, String(note).slice(0, 500));
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  res.json({ status: nextStatus });
});

app.listen(port, () => console.log(`Portal API listening at http://localhost:${port}`));