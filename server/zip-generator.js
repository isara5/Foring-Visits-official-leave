import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';
import util from 'node:util';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';

const execPromise = util.promisify(exec);
const CHROME_PATH = '"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"';

// Convert an HTML file to PDF using Chrome Headless
async function htmlToPdf(htmlContent, outPdfPath) {
  const tmpHtml = path.join(os.tmpdir(), `doc_${Date.now()}_${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(tmpHtml, htmlContent, 'utf8');
  try {
    const cmd = `${CHROME_PATH} --headless --disable-gpu --print-to-pdf="${outPdfPath}" --print-to-pdf-no-header "${tmpHtml}"`;
    await execPromise(cmd, { timeout: 15000 });
  } finally {
    try { fs.unlinkSync(tmpHtml); } catch {}
  }
}

// Convert base64 dataUrl (image or pdf) to a standalone PDF buffer
async function dataUrlToPdfBuffer(dataUrl, fallbackTitle = 'Document') {
  if (!dataUrl || typeof dataUrl !== 'string') return null;

  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;

  const mimeType = match[1].toLowerCase();
  const rawBase64 = match[2];
  const fileBuffer = Buffer.from(rawBase64, 'base64');

  if (mimeType === 'application/pdf') {
    return fileBuffer;
  }

  // If PNG or JPG, embed into a single-page A4 PDF using pdf-lib
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait in pt
    const pageWidth = 595.28;
    const pageHeight = 841.89;

    let embeddedImg;
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      embeddedImg = await pdfDoc.embedJpg(fileBuffer);
    } else {
      embeddedImg = await pdfDoc.embedPng(fileBuffer);
    }

    const imgDims = embeddedImg.scale(1);
    const maxW = pageWidth - 60;
    const maxH = pageHeight - 80;

    const scale = Math.min(maxW / imgDims.width, maxH / imgDims.height, 1);
    const renderW = imgDims.width * scale;
    const renderH = imgDims.height * scale;

    const x = (pageWidth - renderW) / 2;
    const y = (pageHeight - renderH) / 2;

    page.drawImage(embeddedImg, {
      x,
      y,
      width: renderW,
      height: renderH,
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (err) {
    console.warn('Failed to embed image to PDF, returning raw image buffer:', err.message);
    return fileBuffer;
  }
}

// 1. GENERAL 126 APPLICATION HTML
function getGeneral126Html(r) {
  const d = r.details || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = d.fullName || r.applicant_name || '—';
  const nic = d.nic || '—';
  const dob = d.dateOfBirth || '—';
  const designation = d.designation || r.designation || '—';
  const service = d.service || '—';
  const grade = d.grade || '—';
  const department = r.department_name || d.department || '—';
  const ministry = d.ministry || '—';
  const firstAppt = d.firstAppointmentDate || '—';
  const lastForeignReturn = d.lastForeignReturn || 'None / පළමුවරට';
  const destination = r.destination || d.destination || '—';
  const startDate = r.start_date || d.startDate || '—';
  const endDate = r.end_date || d.endDate || '—';
  const daysApplied = d.daysApplied || '—';
  const purpose = r.purpose || d.purpose || '—';
  const leaveCategory = d.leaveCategory || 'Annual / Vacation';
  const leaveBalance = d.leaveBalance || '—';
  const airfareFunding = d.airfareFunding || '—';
  const maintenanceFunding = d.maintenanceFunding || '—';
  const abroadAddress = d.abroadAddress || '—';
  const abroadPhone = d.abroadPhone || '—';
  const dutyCoverName = d.dutyCoverName || '—';
  const dutyCoverDesignation = d.dutyCoverDesignation || '—';
  const signature = r.signature || d.signature;
  const isOfficial = r.leave_type === 'Official duty' || d.leaveType === 'Official duty';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>General 126 - ${refNo} - ${applicantName}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Times New Roman", Times, Georgia, serif; color: #0f172a; margin: 0; padding: 20px; font-size: 13.5px; line-height: 1.5; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 18mm 20mm; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 16px; }
    .badge { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; }
    .title { font-size: 18px; font-weight: 800; margin: 4px 0; }
    .sub { font-size: 13px; color: #334155; }
    .ref-box { display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px 12px; font-size: 11.5px; margin-bottom: 14px; }
    .sec-head { font-size: 13px; font-weight: 800; background: #f1f5f9; border-left: 3.5px solid #1e40af; padding: 4px 8px; margin: 12px 0 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12.5px; }
    .grid-full { grid-column: span 2; }
    .field { border-bottom: 1px dotted #94a3b8; padding-bottom: 3px; }
    .field span { display: block; font-size: 10.5px; color: #64748b; font-weight: 600; text-transform: uppercase; }
    .field strong { font-size: 13px; color: #0f172a; }
    .sig-box { margin-top: 24px; display: flex; justify-content: flex-end; }
    .sig-col { width: 260px; text-align: center; }
    .sig-img { max-height: 48px; max-width: 200px; display: block; margin: 0 auto 4px; }
    .sig-line { border-bottom: 1px dotted #000; height: 36px; margin-bottom: 4px; }
    @media print { @page { size: A4 portrait; margin: 12mm; } body { padding: 0; } .sheet { padding: 0; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div class="badge">Democratic Socialist Republic of Sri Lanka · General 126</div>
      <div class="title">Application for Leave out of Sri Lanka</div>
      <div class="sub">ශ්‍රී ලංකාවෙන් බැහැරව යාම සඳහා නිවාඩු අයදුම්පත්‍රය (Est. Code Ch. XII)</div>
    </div>
    <div class="ref-box">
      <div><strong>Application Ref:</strong> ${refNo}</div>
      <div><strong>Nature of Leave:</strong> ${isOfficial ? 'Official Duty' : 'Personal Leave'}</div>
      <div><strong>Status:</strong> ${r.status || 'Pending'}</div>
      <div><strong>Date:</strong> ${r.created_at?.slice(0, 10) || '—'}</div>
    </div>
    <div class="sec-head">1. Officer Particulars (Gen. 126 Cl. 1–6)</div>
    <div class="grid">
      <div class="field"><span>1. Full Name</span><strong>${applicantName}</strong></div>
      <div class="field"><span>2. Department / Ministry</span><strong>${department} / ${ministry}</strong></div>
      <div class="field"><span>3. Designation / Post</span><strong>${designation}</strong></div>
      <div class="field"><span>4. Service & Grade</span><strong>${service} ${grade}</strong></div>
      <div class="field"><span>5. Date of First Appointment</span><strong>${firstAppt}</strong></div>
      <div class="field"><span>6. Return Date from Last Foreign Leave</span><strong>${lastForeignReturn}</strong></div>
    </div>
    <div class="sec-head">2. Travel Period & Leave Particulars (Gen. 126 Cl. 7–10)</div>
    <div class="grid">
      <div class="field"><span>7. Destination Country & City</span><strong>${destination}</strong></div>
      <div class="field"><span>8. Period of Leave</span><strong>${startDate} to ${endDate} (${daysApplied} Days)</strong></div>
      <div class="field grid-full"><span>9. Purpose of Visit</span><strong>${purpose}</strong></div>
      <div class="field"><span>10. Category of Leave</span><strong>${leaveCategory}</strong></div>
      <div class="field"><span>11. Leave Balance Before Application</span><strong>${leaveBalance}</strong></div>
    </div>
    <div class="sec-head">3. Travel Funding & Abroad Particulars</div>
    <div class="grid">
      <div class="field"><span>12. Airfare Funding</span><strong>${airfareFunding}</strong></div>
      <div class="field"><span>13. Maintenance Funding</span><strong>${maintenanceFunding}</strong></div>
      <div class="field grid-full"><span>14. Address Abroad</span><strong>${abroadAddress} (Tel: ${abroadPhone})</strong></div>
      <div class="field"><span>15. Acting Arrangement (Officer)</span><strong>${dutyCoverName}</strong></div>
      <div class="field"><span>16. Acting Officer Designation</span><strong>${dutyCoverDesignation}</strong></div>
    </div>
    <div class="sig-box">
      <div class="sig-col">
        ${signature ? `<img src="${signature}" class="sig-img" alt="Applicant Signature" />` : '<div class="sig-line"></div>'}
        <div style="border-top: 1px dotted #000; padding-top: 4px; font-size: 12px;">
          <strong>${applicantName}</strong><br />
          Applicant Signature & Date: ${r.created_at?.slice(0, 10) || '—'}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 2. FOR OFFICE USE ONLY HTML (Est. Code XII 13–19)
function getOfficeUseOnlyHtml(r) {
  const d = r.details || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = d.fullName || r.applicant_name || '—';
  const designation = d.designation || r.designation || '—';
  const department = r.department_name || d.department || '—';
  const assessment = d.officerAssessment || {};
  const completedBy = d.officerCompletedBy || {};
  const officerSignature = d.officerSignature;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Particulars of Available Leave - ${refNo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Times New Roman", Times, Georgia, serif; color: #0f172a; margin: 0; padding: 20px; font-size: 13.5px; line-height: 1.5; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 18mm 20mm; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 20px; }
    .badge { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; }
    .title { font-size: 18px; font-weight: 800; margin: 4px 0; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
    .table th, .table td { border: 1px solid #64748b; padding: 6px 10px; text-align: left; }
    .table th { background: #f1f5f9; font-weight: 700; }
    .sig-box { margin-top: 35px; display: flex; justify-content: flex-end; }
    .sig-col { width: 280px; text-align: center; }
    .sig-img { max-height: 50px; max-width: 220px; display: block; margin: 0 auto 4px; }
    .sig-line { border-bottom: 1px dotted #000; height: 38px; margin-bottom: 4px; }
    @media print { @page { size: A4 portrait; margin: 12mm; } body { padding: 0; } .sheet { padding: 0; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div class="badge">General 126 (Cl. 13–19) · Establishments Code Chapter XII</div>
      <div class="title">For Office Use Only · Particulars of Available Leave</div>
      <div style="font-size: 13px; color: #334155;">කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි · නිවාඩු පිළිබඳ විස්තර</div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 12.5px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">
      <div><strong>Officer:</strong> ${applicantName} (${designation})</div>
      <div><strong>Department:</strong> ${department}</div>
      <div><strong>Ref No:</strong> ${refNo}</div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Clause</th>
          <th>Description (විස්තරය)</th>
          <th>Entitled (හිමි)</th>
          <th>Taken (ගත්)</th>
          <th>Balance (ඉතිරි)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>13</td><td>Vacation Leave for Current Year</td><td>${assessment.vacationEntitled || '28'}</td><td>${assessment.vacationTaken || '0'}</td><td>${assessment.vacationBalance || '28'}</td></tr>
        <tr><td>14</td><td>Casual Leave for Current Year</td><td>${assessment.casualEntitled || '21'}</td><td>${assessment.casualTaken || '0'}</td><td>${assessment.casualBalance || '21'}</td></tr>
        <tr><td>15</td><td>Lapsed Leave from Previous Years</td><td>${assessment.lapsedEntitled || '0'}</td><td>${assessment.lapsedTaken || '0'}</td><td>${assessment.lapsedBalance || '0'}</td></tr>
        <tr><td>16</td><td>Half-Pay / No-Pay Leave Available</td><td>${assessment.halfPayEntitled || '—'}</td><td>${assessment.halfPayTaken || '—'}</td><td>${assessment.halfPayBalance || '—'}</td></tr>
        <tr><td>17</td><td>Special Leave / Official Duty Credit</td><td>${assessment.specialEntitled || '—'}</td><td>${assessment.specialTaken || '—'}</td><td>${assessment.specialBalance || '—'}</td></tr>
        <tr><td>18</td><td>Period of Leave Applied For</td><td colspan="3">${r.start_date || '—'} to ${r.end_date || '—'} (${d.daysApplied || '—'} Days)</td></tr>
        <tr><td>19</td><td>Leave Balance Remaining After Leave</td><td colspan="3"><strong>${assessment.remainingBalance || '—'}</strong> Days</td></tr>
      </tbody>
    </table>
    <div style="margin-top: 25px; font-size: 12.5px; line-height: 1.6;">
      <strong>Subject Officer Certification:</strong> I certify that the particulars of available leave have been verified against the official leave register (Est. Code XII 13–19) and that the applicant is entitled to the period of leave requested.
    </div>
    <div class="sig-box">
      <div class="sig-col">
        ${officerSignature ? `<img src="${officerSignature}" class="sig-img" alt="Officer Signature" />` : '<div class="sig-line"></div>'}
        <div style="border-top: 1px dotted #000; padding-top: 4px; font-size: 12px;">
          <strong>${completedBy.name || 'Subject Officer'}</strong><br />
          Subject Officer (Leave & Establishments)<br />
          Date: ${d.officerCompletedAt?.slice(0, 10) || '—'}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 3. DEPARTMENT HEAD LETTER HTML (Est. Code XV 10:1 Part I)
function getDeptHeadLetterHtml(r) {
  const d = r.details || {};
  const endorsement = d.departmentHeadEndorsement || {};
  const departmentName = r.department_name || d.department || endorsement.completedBy?.department || 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions';
  const rawMinistry = endorsement.ministryName || d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\s+of\s+|අමාත්‍යාංශය\s*)/i, '').trim() || rawMinistry;

  let rawApplicantName = d.fullName || r.applicant_name || '—';
  let activeSalutation = endorsement.officerSalutation || 'Mr.';
  const prefixMatch = rawApplicantName.match(/^(Mr\.|Mrs\.|Miss|Ms\.|Dr\.|Prof\.|Eng\.|Rev\.)\s*/i);
  if (prefixMatch) {
    activeSalutation = prefixMatch[1];
    rawApplicantName = rawApplicantName.slice(prefixMatch[0].length).trim();
  }

  const refNo = endorsement.myNo || (r.id ? `SLT/HR/${new Date().getFullYear()}/FV-${String(r.id).padStart(4, '0')}` : '...........................');
  const date = endorsement.date || '2026-10-16';
  const recommendation = endorsement.recommendation || 'recommended';
  const pmPermission = endorsement.primeMinisterPermission || 'obtained';
  const remarks = endorsement.remarks || '';
  const signature = endorsement.signature;
  const headName = endorsement.completedBy?.name || 'Head of Department';
  const headDesignation = endorsement.completedBy?.designation || 'Head of Department / Institution';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Department Head Letter - ${refNo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Times New Roman", Times, Georgia, serif; color: #0f172a; margin: 0; padding: 20px; font-size: 15px; line-height: 1.65; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 25mm 22mm; }
    .letterhead { text-align: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 12px; margin-bottom: 25px; }
    .top-ref { text-align: right; margin-bottom: 25px; }
    .dotted { border-bottom: 1.2px dotted #000; padding: 0 6px; font-weight: 700; display: inline-block; }
    .clause { display: flex; align-items: flex-start; margin-bottom: 22px; text-align: justify; }
    .clause-num { width: 26px; font-weight: 700; }
    .clause-body { flex: 1; }
    .rec-high { font-weight: 700; text-decoration: underline; color: #15803d; }
    .rec-mut { text-decoration: line-through; color: #94a3b8; }
    .footer { margin-top: 45px; display: flex; justify-content: space-between; }
    .sig-col { width: 50%; text-align: center; }
    .sig-img { max-height: 52px; max-width: 220px; display: block; margin: 0 auto 6px; }
    .sig-caption { border-top: 1.2px dotted #000; padding-top: 6px; font-size: 14px; }
    @media print { @page { size: A4 portrait; margin: 0; } body { padding: 0; } .sheet { padding: 22mm 20mm; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="letterhead">
      <div style="font-size: 13.5px; font-weight: 700;">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #334155;">Democratic Socialist Republic of Sri Lanka</div>
      <div style="font-size: 17px; font-weight: 800; color: #091e42; margin-top: 5px;">${departmentName}</div>
      <div style="font-size: 11px; color: #475569; font-style: italic; margin-top: 3px;">Establishments Code Chapter XV Section 10:1 · Recommendation of Head of Department</div>
    </div>
    <div class="top-ref">my no.} <span class="dotted">${refNo}</span></div>
    <div style="margin-bottom: 30px;">The Secretary,<br />Ministry of <u>${cleanMinistryName}</u></div>
    <div class="clause">
      <div class="clause-num">1</div>
      <div class="clause-body">
        forward herewith two copies of the leave application of<br />
        ${activeSalutation} <span class="dotted"><u>${rawApplicantName}</u></span>. I certify that acting arrangement have been made and that there is no disciplinary action pending or contemplated against this officer.
      </div>
    </div>
    <div class="clause">
      <div class="clause-num">2</div>
      <div class="clause-body">
        Prime Minister’s permission has been obtained in terms of Chapter XV -10:1 of the Establishments code. ${pmPermission === 'obtained' ? '<strong style="color: #166534; font-size: 13.5px;">(Obtained / ලබාගෙන ඇත)</strong>' : ''}
      </div>
    </div>
    <div class="clause">
      <div class="clause-num">3</div>
      <div class="clause-body">
        Leave is ${recommendation === 'recommended' ? '<span class="rec-high">recommended</span> / <span class="rec-mut">not recommended</span>.' : '<span class="rec-mut">recommended</span> / <span class="rec-high" style="color: #b91c1c;">not recommended</span>.'}
      </div>
    </div>
    ${remarks ? `<div style="margin: 12px 0 24px 26px; padding: 8px 14px; background: #f8fafc; border-left: 3px solid #2563eb; font-size: 13.5px; font-style: italic;"><strong>Observations / Remarks:</strong> ${remarks}</div>` : ''}
    <div class="footer">
      <div style="width: 45%;">Date} <span class="dotted">${date}</span></div>
      <div class="sig-col">
        ${signature ? `<img src="${signature}" class="sig-img" alt="Signature" />` : '<div style="border-bottom: 1px dotted #000; height: 40px; width: 220px; margin: 0 auto 6px;"></div>'}
        <div class="sig-caption">
          <strong>${headName}</strong><br />
          Signature and Designation of Head of Department<br />
          <span style="font-size: 12.5px; color: #334155;">${headDesignation}</span><br />
          <span style="font-size: 11.5px; color: #64748b;">${departmentName}</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 4. SECRETARY APPROVAL LETTER HTML (Est. Code XV 10:1 Part II)
function getSecretaryLetterHtml(r) {
  const d = r.details || {};
  const endorsement = d.departmentHeadEndorsement || {};
  const departmentName = r.department_name || d.department || endorsement.completedBy?.department || 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions';
  const rawMinistry = endorsement.ministryName || d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\s+of\s+|අමාත්‍යාංශය\s*)/i, '').trim() || rawMinistry;

  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const secClearance = clearances.find(c => c.role === 'secretary' || c.decision === 'approve') || d.secretaryApproval || {
    userName: 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)',
    userDesignation: 'Secretary',
    ministryName: cleanMinistryName,
    date: '2026-10-16'
  };

  const secRefNo = secClearance?.myNo || (r.id ? `${cleanMinistryName.slice(0, 3).toUpperCase()}/SEC/${new Date().getFullYear()}/FV-${String(r.id).padStart(4, '0')}` : '...........................');
  const headName = endorsement.completedBy?.name || 'Head of Department';
  const headDesignation = endorsement.completedBy?.designation || 'Head of Department / Institution';
  const isApproved = r.status === 'Approved' || secClearance?.decision === 'approve';
  const secDate = secClearance?.date || '2026-10-16';
  const secSignature = secClearance?.signature;
  const secName = secClearance?.userName || 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Secretary Approval Letter - ${secRefNo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Times New Roman", Times, Georgia, serif; color: #0f172a; margin: 0; padding: 20px; font-size: 15px; line-height: 1.65; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 25mm 22mm; }
    .letterhead { text-align: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 12px; margin-bottom: 28px; }
    .top-ref { text-align: right; margin-bottom: 24px; }
    .dotted { border-bottom: 1.2px dotted #000; padding: 0 6px; font-weight: 700; display: inline-block; }
    .rec-high { font-weight: 700; text-decoration: underline; color: #15803d; }
    .rec-mut { text-decoration: line-through; color: #94a3b8; }
    .footer { margin-top: 50px; display: flex; justify-content: space-between; }
    .sig-col { width: 50%; text-align: center; }
    .sig-img { max-height: 52px; max-width: 220px; display: block; margin: 0 auto 6px; }
    .sig-caption { border-top: 1.2px dotted #000; padding-top: 6px; font-size: 14px; }
    @media print { @page { size: A4 portrait; margin: 0; } body { padding: 0; } .sheet { padding: 22mm 20mm; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="letterhead">
      <div style="font-size: 13.5px; font-weight: 700;">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #334155;">Democratic Socialist Republic of Sri Lanka</div>
      <div style="font-size: 17px; font-weight: 800; color: #091e42; margin-top: 5px;">Ministry of ${cleanMinistryName}</div>
      <div style="font-size: 11px; color: #475569; font-style: italic; margin-top: 3px;">Establishments Code Chapter XV Section 10:1 · Ministerial Decision & Directive to Head of Department</div>
    </div>
    <div class="top-ref">my no.} <span class="dotted">${secRefNo}</span></div>
    <div style="margin-bottom: 40px;">
      <span class="dotted" style="min-width: 300px; font-weight: normal;">${headName}, ${headDesignation}</span><br />
      Head of Department,<br />
      <span style="font-size: 13.5px; color: #475569;">${departmentName}</span>
    </div>
    <div style="text-align: center; margin: 55px 0 65px;">
      <div style="border-bottom: 1.2px dotted #000; width: 340px; margin: 0 auto 10px;"></div>
      <div style="font-size: 18px; letter-spacing: 0.5px;">
        Leave is ${isApproved ? '<span class="rec-high" style="font-size: 19px;">approved</span> / <span class="rec-mut">not approved</span>' : '<span class="rec-mut">approved</span> / <span class="rec-high" style="color: #b91c1c; font-size: 19px;">not approved</span>'}
      </div>
    </div>
    <div class="footer">
      <div style="width: 45%;">
        <div>Date} <span class="dotted">${secDate}</span></div>
        <div style="margin-top: 24px; font-size: 13px; color: #334155; font-style: italic;">copy to: Secretary to the Prime Minister.</div>
      </div>
      <div class="sig-col">
        ${secSignature ? `<img src="${secSignature}" class="sig-img" alt="Signature" />` : '<div style="border-bottom: 1px dotted #000; height: 40px; width: 220px; margin: 0 auto 6px;"></div>'}
        <div class="sig-caption">
          <strong>${secName}</strong><br />
          Secretary.<br />
          ministry of <span style="border-bottom: 1.2px dotted #000; padding: 0 6px; font-weight: 700;">${cleanMinistryName}</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 5. HIERARCHY CLEARANCE SHEET HTML (Ministerial minute trail)
function getClearanceSheetHtml(r) {
  const d = r.details || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = d.fullName || r.applicant_name || '—';
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Hierarchy Clearance Sheet - ${refNo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 20px; font-size: 12px; line-height: 1.5; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 20mm; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 20px; }
    .step-card { border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 12px 16px; margin-bottom: 14px; background: #f8fafc; }
    .step-title { display: flex; justify-content: space-between; font-weight: 700; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px; }
    @media print { @page { size: A4 portrait; margin: 12mm; } body { padding: 0; } .sheet { padding: 0; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569;">Democratic Socialist Republic of Sri Lanka</div>
      <div style="font-size: 17px; font-weight: 800; margin: 4px 0;">Official Ministerial Clearance Sheet & Minute Trail</div>
      <div style="font-size: 12px; color: #64748b;">අනුමැති හා නිලධාරී සටහන් පත්‍රිකාව · Ref: ${refNo} · ${applicantName}</div>
    </div>
    ${clearances.length > 0 ? clearances.map((c, i) => `
      <div class="step-card">
        <div class="step-title">
          <span>Stage ${i + 1}: ${c.title || c.role} (${c.titleSi || ''})</span>
          <span>${c.date || c.timestamp?.slice(0, 10) || '—'}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11.5px;">
          <div>
            <strong>Officer:</strong> ${c.userName} (${c.userDesignation})<br />
            <strong>Decision:</strong> <span style="color: #15803d; font-weight: 700;">Forwarded to ${c.forwardedToTitle || c.forwardedTo || 'Next Level'}</span><br />
            <strong>Remarks / Minutes:</strong> ${c.remarks || 'Endorsed and recommended.'}
          </div>
          <div style="text-align: center; width: 150px;">
            ${c.signature ? `<img src="${c.signature}" style="max-height: 42px; max-width: 140px; display: block; margin: 0 auto;" />` : '<div style="border-bottom: 1px dotted #000; height: 35px;"></div>'}
            <span style="font-size: 10px; color: #64748b;">Digital Signature</span>
          </div>
        </div>
      </div>
    `).join('') : '<div style="padding: 30px; text-align: center; color: #94a3b8;">No clearance records logged yet.</div>'}
  </div>
</body>
</html>`;
}

// 6. SUBJECT OFFICER NOTE SHEET HTML (introduced from the outside)
function getNoteSheetHtml(r) {
  const d = r.details || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = d.fullName || r.applicant_name || '—';
  const designation = d.designation || r.designation || '—';
  const department = r.department_name || d.department || '—';
  const rawMinistry = d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\s+of\s+|අමාත්‍යාංශය\s*)/i, '').trim() || rawMinistry;
  const note = d.noteSheet || {};
  const completedBy = d.officerCompletedBy || {};
  const officerSignature = d.officerSignature;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Subject Officer Note Sheet - ${refNo}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Times New Roman", Times, Georgia, serif; color: #0f172a; margin: 0; padding: 20px; font-size: 13.5px; line-height: 1.6; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; padding: 22mm 20mm; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
    .note-content { font-size: 13px; line-height: 1.7; text-align: justify; }
    @media print { @page { size: A4 portrait; margin: 12mm; } body { padding: 0; } .sheet { padding: 0; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; color: #1e3a8a;">Democratic Socialist Republic of Sri Lanka · Ministry of ${cleanMinistryName}</div>
      <div style="font-size: 18px; font-weight: 800; margin: 4px 0;">Official Ministerial Note Sheet (සටහන් පත්‍රිකාව)</div>
      <div style="font-size: 12.5px; color: #475569;">Est. Code Chapter XII · Subject Officer Submission from Outside Department</div>
    </div>
    <div style="margin-bottom: 18px; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 12px; display: flex; justify-content: space-between;">
      <div><strong>Applicant:</strong> ${applicantName} (${designation})</div>
      <div><strong>Originating Institution:</strong> ${department}</div>
      <div><strong>Ref:</strong> ${refNo}</div>
    </div>
    <div class="note-content">
      <p><strong>ගරු ලේකම්තුමා / අතිරේක ලේකම්තුමා වෙත (To Ministry Secretary / Additional Secretary):</strong></p>
      <p>1. <strong>හඳුන්වාදීම සහ පසුබිම (Introduction & Context):</strong><br />
      ${department} හි සේවය කරන ${designation} ${applicantName} මහතා/මිය විසින් ${r.start_date || '—'} සිට ${r.end_date || '—'} දක්වා ${r.destination || '—'} බලා නිවාඩු ලබා ගැනීම සඳහා ඉදිරිපත් කරන ලද ඉල්ලීම ආයතන ප්‍රධානියාගේ නිර්දේශය සහිතව අමාත්‍යාංශය වෙත ලැබී ඇත.</p>
      
      <p>2. <strong>නිවාඩු හිමිකම සහ ආයතන සංග්‍රහයට අනුකූලතාව (Entitlement & Est. Code Verification):</strong><br />
      අදාළ නිලධාරියාගේ නිවාඩු ලේඛන පරීක්ෂා කර බැලූ අතර, ඉල්ලා ඇති කාලසීමාව සඳහා ප්‍රමාණවත් නිවාඩු ශේෂයක් පවතින බවට තහවුරු කර ඇත. වැඩබැලීමේ විධිවිධාන ආයතන ප්‍රධානියා විසින් සහතික කර ඇති අතර විනය ක්‍රියාමාර්ග කිසිවක් නොමැත.</p>

      <p>3. <strong>විෂයභාර නිලධාරියාගේ නිරීක්ෂණය සහ ඉදිරිපත් කිරීම (Officer Observation & Recommendation):</strong><br />
      ${d.officerRemarks || note.remarks || 'ඉහත කරුණු සලකා බලා නිලධාරියාගේ ඉල්ලීම අමාත්‍යාංශ ලේකම්ගේ අනුමැතිය සහ අතිගරු ජනාධිපතිතුමාගේ අවසන් නියෝගය සඳහා නිර්දේශ කර ඉදිරිපත් කරමි.'}</p>
    </div>
    <div style="margin-top: 40px; display: flex; justify-content: flex-end;">
      <div style="width: 260px; text-align: center;">
        ${officerSignature ? `<img src="${officerSignature}" style="max-height: 48px; max-width: 200px; display: block; margin: 0 auto 4px;" />` : '<div style="border-bottom: 1px dotted #000; height: 38px; margin-bottom: 4px;"></div>'}
        <div style="border-top: 1px dotted #000; padding-top: 4px; font-size: 12px;">
          <strong>${completedBy.name || 'Subject Officer'}</strong><br />
          Subject Officer (Leave & Establishments)<br />
          Ministry of ${cleanMinistryName}<br />
          Date: ${d.officerCompletedAt?.slice(0, 10) || '—'}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// MAIN EXPORTED FUNCTION: Generate ZIP buffer containing all 7 items
export async function generateRequestZip(request) {
  const zip = new JSZip();
  const refNo = request.id ? `FV-${String(request.id).padStart(4, '0')}` : 'FV-REF';
  const zipFileName = `${refNo}.zip`;

  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), `zip_${refNo}_`));

  try {
    const d = request.details || {};
    const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];

    // 1. General 126 PDF (Applicant's part - always included once application exists)
    const html1 = getGeneral126Html(request);
    const pdf1Path = path.join(workDir, '1_General_126_Application.pdf');
    await htmlToPdf(html1, pdf1Path);
    zip.file('1_General_126_Application.pdf', fs.readFileSync(pdf1Path));

    // 2. For Office Use Only PDF (Only if Subject Officer has completed leave entitlement verification)
    const hasOfficeUseCompleted = Boolean(d.officerCompleted || d.officerAssessment?.total || d.officerSignature);
    if (hasOfficeUseCompleted) {
      const html2 = getOfficeUseOnlyHtml(request);
      const pdf2Path = path.join(workDir, '2_For_Office_Use_Only_Leave_Particulars.pdf');
      await htmlToPdf(html2, pdf2Path);
      zip.file('2_For_Office_Use_Only_Leave_Particulars.pdf', fs.readFileSync(pdf2Path));
    }

    // 3. Department Head Letter PDF (Only if Head of Department has completed institutional endorsement)
    const hasDeptHeadCompleted = Boolean(d.departmentHeadEndorsement && (d.departmentHeadEndorsement.signature || d.departmentHeadEndorsement.myNo));
    if (hasDeptHeadCompleted) {
      const html3 = getDeptHeadLetterHtml(request);
      const pdf3Path = path.join(workDir, '3_Department_Head_Letter.pdf');
      await htmlToPdf(html3, pdf3Path);
      zip.file('3_Department_Head_Letter.pdf', fs.readFileSync(pdf3Path));
    }

    // 4. Secretary Approval Letter PDF (Only if Ministry Secretary has completed leave approval)
    const hasSecretaryCompleted = Boolean(
      d.secretaryApproval?.signature ||
      d.secretaryApproval?.signatoryName ||
      d.secretaryApproval?.letterNumber ||
      clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
      (request.status === 'Approved' || request.status === 'Pending Presidential Approval')
    );
    if (hasSecretaryCompleted) {
      const html4 = getSecretaryLetterHtml(request);
      const pdf4Path = path.join(workDir, '4_Secretary_Approval_Letter.pdf');
      await htmlToPdf(html4, pdf4Path);
      zip.file('4_Secretary_Approval_Letter.pdf', fs.readFileSync(pdf4Path));
    }

    // 5. Hierarchy Clearance Sheet PDF (Only if Secretariat officers have completed clearance minutes)
    const hasClearanceCompleted = clearances.length > 0 && clearances.some(c => c.signature || c.decision);
    if (hasClearanceCompleted) {
      const html5 = getClearanceSheetHtml(request);
      const pdf5Path = path.join(workDir, '5_Hierarchy_Clearance_Sheet.pdf');
      await htmlToPdf(html5, pdf5Path);
      zip.file('5_Hierarchy_Clearance_Sheet.pdf', fs.readFileSync(pdf5Path));
    }

    // 6. Subject Officer Note Sheet PDF (Only if Subject Officer has prepared Note Sheet)
    const hasNoteSheetCompleted = Boolean(d.officerCompleted && (d.noteSheet || d.officerRemarks || d.officerAssessment));
    if (hasNoteSheetCompleted) {
      const html6 = getNoteSheetHtml(request);
      const pdf6Path = path.join(workDir, '6_Subject_Officer_Note_Sheet.pdf');
      await htmlToPdf(html6, pdf6Path);
      zip.file('6_Subject_Officer_Note_Sheet.pdf', fs.readFileSync(pdf6Path));
    }

    // 7. Applicant Uploaded Documents (only one by one pdf)
    const docs = request.details?.documents || {};
    const uploadFolder = zip.folder('7_Applicant_Uploaded_Documents');

    const uploadItems = [
      { key: 'institutionLetter', filename: '7_1_Institution_Head_Letter.pdf', dataUrl: docs.institutionLetter?.dataUrl },
      { key: 'passportImage', filename: '7_2_Passport_Bio_Page.pdf', dataUrl: docs.passportImage?.dataUrl },
      { key: 'requestLetter', filename: '7_3_Applicant_Request_Letter.pdf', dataUrl: docs.requestLetter?.dataUrl },
      { key: 'otherDocuments', filename: '7_4_Other_Supporting_Document.pdf', dataUrl: docs.otherDocuments?.dataUrl },
    ];

    let hasAnyUploads = false;
    for (const item of uploadItems) {
      if (item.dataUrl) {
        const pdfBuf = await dataUrlToPdfBuffer(item.dataUrl, item.key);
        if (pdfBuf) {
          uploadFolder.file(item.filename, pdfBuf);
          hasAnyUploads = true;
        }
      }
    }

    if (!hasAnyUploads) {
      uploadFolder.file('README_No_Uploaded_Attachments.txt', 'The applicant has not attached additional live document uploads for this application.');
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    return {
      filename: zipFileName,
      buffer: zipBuffer,
    };
  } finally {
    try {
      fs.rmSync(workDir, { recursive: true, force: true });
    } catch {}
  }
}
