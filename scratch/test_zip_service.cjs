const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const JSZip = require('jszip');
const { PDFDocument } = require('pdf-lib');
const { DatabaseSync } = require('node:sqlite');

const sdb = new DatabaseSync('data/portal.sqlite');
const r = sdb.prepare('SELECT * FROM requests WHERE id = 7').get();
r.details = JSON.parse(r.details_json || '{}');
const approvals = sdb.prepare('SELECT a.*, u.name AS approver_name, u.role AS approver_role FROM approvals a JOIN users u ON u.id = a.user_id WHERE a.request_id = ? ORDER BY a.id').all(7);

console.log('Testing ZIP generator for request 7');
console.log('Applicant:', r.details.fullName);
console.log('Department:', r.department_name);
