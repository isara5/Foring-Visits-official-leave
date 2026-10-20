import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';
import util from 'node:util';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';

const execPromise = util.promisify(exec);
const CHROME_PATH = '"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"';

async function htmlToPdf(htmlContent, outPdfPath) {
  const tmpHtml = path.join(os.tmpdir(), `doc_${Date.now()}_${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(tmpHtml, htmlContent, 'utf8');
  try {
    const cmd = `${CHROME_PATH} --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outPdfPath}" "${tmpHtml}"`;
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

// 1. GENERAL 126 APPLICATION HTML (Comprehensive 3-Part Form: Applicant, Office Use, Dept Head)
function getGeneral126Html(r) {
  const d = r.details || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  let rawApplicantName = d.fullName || r.applicant_name || '—';
  let activeSalutation = (d.salutation || r.applicant_salutation || 'Mr.');
  const prefixMatch = rawApplicantName.match(/^(Mr\.|Mrs\.|Miss|Ms\.|Dr\.|Prof\.|Eng\.|Rev\.)\s*/i);
  if (prefixMatch) {
    activeSalutation = prefixMatch[1];
    rawApplicantName = rawApplicantName.slice(prefixMatch[0].length).trim();
  }
  const applicantName = rawApplicantName;
  const applicantDisplayName = (rawApplicantName && rawApplicantName !== '—') ? `${activeSalutation} ${rawApplicantName}` : '—';
  const applicantEmail = d.email || r.applicant_email || d.abroadEmail || '—';
  const nic = d.nic || '—';
  const dob = d.dateOfBirth || '—';
  const designation = d.designation || r.designation || '—';
  const service = d.service || '—';
  const grade = d.grade ? `(${d.grade})` : '';
  const department = r.department_name || d.department || '—';
  const ministry = d.ministry || '—';
  const firstAppt = d.firstAppointmentDate || '—';
  const lastForeignReturn = d.lastForeignReturnDate || d.lastForeignReturn || 'None / පළමුවරට';
  const destination = r.destination || d.destination || '—';
  const startDate = r.start_date || d.startDate || '—';
  const endDate = r.end_date || d.endDate || '—';
  const daysApplied = d.daysApplied || (startDate && endDate && startDate !== '—' && endDate !== '—' ? `${Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)}` : '—');
  const purpose = r.purpose || d.purpose || '—';
  const leaveType = r.leave_type || d.leaveType || 'Private leave';
  const isOfficial = leaveType === 'Official duty' || d.leaveType === 'Official duty';
  const leaveCategory = d.leaveCategory || (isOfficial ? 'Official duty' : 'Annual / vacation leave');
  const leaveBalance = d.leaveBalance || '—';
  const airfareFunding = d.airfareFunding || (isOfficial ? 'Government of Sri Lanka (GOSL)' : 'Self-funded / Personal');
  const prepaidTicket = d.prepaidTicket || 'No';
  const ticketSenderRelationship = d.ticketSenderRelationship || '—';
  const maintenanceFunding = d.maintenanceFunding || (isOfficial ? 'Daily Subsistence Allowance (DSA)' : 'Personal funds');
  const maintenancePayerRelationship = d.maintenancePayerRelationship || '—';
  const abroadAddress = d.abroadAddress || '—';
  const abroadPhone = d.abroadPhone || '—';
  const abroadEmail = d.abroadEmail || applicantEmail;
  const dutyCoverName = d.dutyCoverName || '—';
  const dutyCoverDesignation = d.dutyCoverDesignation || '—';
  const appDate = d.applicationDate || r.created_at?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const signature = r.signature || d.signature;

  // Part II: Subject Officer assessment
  const assessment = d.officerAssessment || {};
  const hasAssessment = Boolean(d.officerCompleted || assessment.total || d.officerSignature);
  const subjectOfficerName = d.officerCompletedBy?.name || 'Subject Officer';
  const subjectOfficerDesig = d.officerCompletedBy?.designation || 'Subject Officer (Leave & Establishments)';
  const subjectOfficerSig = d.officerSignature;
  const subjectOfficerDate = d.officerCompletedAt?.slice(0, 10) || '';
  const subjectOfficerRemarks = d.officerRemarks || '';

  // Part III: Department Head Endorsement
  const deptEndorsement = d.departmentHeadEndorsement || {};
  const hasDeptEndorsement = Boolean(deptEndorsement.signature || deptEndorsement.myNo);
  const deptHeadName = deptEndorsement.signatoryName || d.forwardedDepartment?.headName || 'Head of Department';
  const deptHeadDesig = deptEndorsement.signatoryDesignation || d.forwardedDepartment?.headDesignation || 'Head of Department';
  const deptHeadSig = deptEndorsement.signature;
  const deptHeadDate = deptEndorsement.endorsementDate || '';
  const deptHeadNo = deptEndorsement.myNo || '';
  const deptHeadRecommendation = deptEndorsement.recommendation || (hasDeptEndorsement ? 'Recommended / අනුමැතිය සඳහා නිර්දේශ කරමි' : 'Pending Review');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>General 126 - ${refNo} - ${applicantName}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      line-height: 1.45;
      font-size: 11px;
    }
    .sheet {
      max-width: 820px;
      margin: 0 auto;
      padding: 24px 28px;
      background: #fff;
    }
    .page-break {
      page-break-before: always;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px dashed #cbd5e1;
    }
    .gov-header {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .gov-top {
      font-size: 10.5px;
      font-weight: 700;
      color: #475569;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }
    .gov-code-badge {
      display: inline-block;
      background: #0f172a;
      color: #fff;
      padding: 2px 10px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      border-radius: 3px;
      margin: 4px 0 2px 0;
    }
    .gov-title {
      font-size: 15px;
      font-weight: 800;
      margin: 3px 0 2px 0;
      color: #0f172a;
      text-transform: uppercase;
    }
    .gov-sub {
      font-size: 11px;
      color: #334155;
      font-weight: 700;
    }
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 6px 12px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 6px 12px;
      border-radius: 4px;
      margin-bottom: 14px;
      font-size: 10px;
    }
    .badge-item {
      white-space: nowrap;
    }
    .sec-title {
      background: #f1f5f9;
      border-left: 3.5px solid #1e40af;
      padding: 4px 10px;
      font-weight: 700;
      font-size: 11px;
      color: #1e3a8a;
      margin: 12px 0 6px 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 14px;
    }
    .grid-item {
      border-bottom: 1px dotted #e2e8f0;
      padding-bottom: 3px;
    }
    .grid-item span {
      display: block;
      font-size: 9px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }
    .grid-item strong {
      font-size: 11px;
      color: #0f172a;
    }
    .full-span {
      grid-column: span 2;
    }
    .sig-box {
      margin-top: 16px;
      border-top: 1.5px solid #0f172a;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .sig-declaration {
      max-width: 490px;
      font-size: 9.5px;
      color: #334155;
      line-height: 1.4;
    }
    .sig-img-container {
      text-align: right;
    }
    .sig-img {
      max-height: 48px;
      max-width: 170px;
      border: 1px dashed #cbd5e1;
      padding: 2px 6px;
      background: #fff;
      display: block;
      margin-left: auto;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 10.5px;
    }
    .table th, .table td {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      text-align: left;
    }
    .table th {
      background: #f1f5f9;
      font-weight: 700;
      color: #1e3a8a;
    }
    .cert-footer {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5px;
      color: #64748b;
    }
    @media print {
      @page { size: A4 portrait; margin: 10mm; }
      body { padding: 0; }
      .sheet { padding: 0; }
      .page-break { page-break-before: always; margin-top: 0; padding-top: 0; border-top: none; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <!-- PAGE 1: PART I -->
    <div class="gov-header">
      <div class="gov-top">Democratic Socialist Republic of Sri Lanka · ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
      <div class="gov-code-badge">GENERAL 126 · පොදු 126 (PART I)</div>
      <div class="gov-title">Application for Leave out of Sri Lanka</div>
      <div class="gov-sub">ශ්‍රී ලංකාවෙන් බැහැරව යාම සඳහා නිවාඩු අයදුම්පත්‍රය (Establishments Code Ch. XII)</div>
    </div>

    <div class="badge-row">
      <div class="badge-item"><strong>යොමු අංකය (Ref No):</strong> ${refNo}</div>
      <div class="badge-item"><strong>නිවාඩුවේ ස්වභාවය (Nature):</strong> ${isOfficial ? 'Official Duty / නිල රාජකාරි සංචාරය' : 'Private Leave / පෞද්ගලික නිවාඩු'}</div>
      <div class="badge-item"><strong>තත්ත්වය (Status):</strong> ${r.status || 'Pending'}</div>
      <div class="badge-item"><strong>දිනය (Date):</strong> ${appDate}</div>
    </div>

    <!-- 1. Officer Particulars -->
    <div class="sec-title">1. Officer & Service Particulars / නිලධාරියා සහ සේවා විස්තර (Gen. 126 Cl. 1–6)</div>
    <div class="grid-2">
      <div class="grid-item">
        <span>1. සම්පූර්ණ නම / Officer's Full Name</span>
        <strong>${applicantDisplayName}</strong>
      </div>
      <div class="grid-item">
        <span>2. දෙපාර්තමේන්තුව සහ අමාත්‍යාංශය / Dept. & Ministry</span>
        <strong>${department} ${ministry && ministry !== '—' ? '· ' + ministry : ''}</strong>
      </div>
      <div class="grid-item">
        <span>3. තනතුර / Post or Designation</span>
        <strong>${designation}</strong>
      </div>
      <div class="grid-item">
        <span>4. සේවය සහ ශ්‍රේණිය / Service & Grade</span>
        <strong>${service} ${grade}</strong>
      </div>
      <div class="grid-item">
        <span>5. ජාතික හැඳුනුම්පත් අංකය / National Identity Card (NIC)</span>
        <strong>${nic}</strong>
      </div>
      <div class="grid-item">
        <span>6. උපන් දිනය / Date of Birth</span>
        <strong>${dob}</strong>
      </div>
      <div class="grid-item">
        <span>7. පළමු පත්වීමේ දිනය / Date of First Appointment</span>
        <strong>${firstAppt}</strong>
      </div>
      <div class="grid-item">
        <span>8. අවසන් වරට විදේශගතව පැමිණි දිනය / Return from Last Foreign Visit</span>
        <strong>${lastForeignReturn}</strong>
      </div>
    </div>

    <!-- 2. Travel & Leave Particulars -->
    <div class="sec-title">2. Travel Period & Leave Particulars / නිවාඩු කාලසීමාව සහ ගමනාන්තය (Gen. 126 Cl. 7–10)</div>
    <div class="grid-2">
      <div class="grid-item">
        <span>9. ගමනාන්ත රට සහ නගරය / Destination (Country & City)</span>
        <strong>${destination}</strong>
      </div>
      <div class="grid-item">
        <span>10. නිවාඩු කාලසීමාව / Period of Leave</span>
        <strong>${startDate} to ${endDate} (${daysApplied} Days / දින)</strong>
      </div>
      <div class="grid-item full-span">
        <span>11. නිවාඩුවේ ස්වභාවය සහ අරමුණ / Nature & Purpose of Travel</span>
        <strong>${purpose}</strong>
      </div>
      <div class="grid-item">
        <span>12. අයදුම් කරන නිවාඩු වර්ගය / Leave Category</span>
        <strong>${leaveCategory}</strong>
      </div>
      <div class="grid-item">
        <span>13. පවතින නිවාඩු ශේෂය / Leave Balance Before Application</span>
        <strong>${leaveBalance}</strong>
      </div>
    </div>

    <!-- 3. Funding & Maintenance -->
    <div class="sec-title">3. Travel Funding & Maintenance Abroad / ගමන් වියදම් සහ විදේශ නඩත්තු (Gen. 126 Cl. 8–9)</div>
    <div class="grid-2">
      <div class="grid-item">
        <span>14. ගුවන් ටිකට්පත් වියදම් / Airfare Funding</span>
        <strong>${airfareFunding}</strong>
      </div>
      <div class="grid-item">
        <span>15. කලින් ගෙවන ලද ටිකට්පතක්ද / Pre-paid Ticket</span>
        <strong>${prepaidTicket} ${prepaidTicket === 'Yes' && ticketSenderRelationship && ticketSenderRelationship !== '—' ? `(Sender: ${ticketSenderRelationship})` : ''}</strong>
      </div>
      <div class="grid-item">
        <span>16. විදේශයේදී නඩත්තු වියදම් / Cost of Maintenance Abroad</span>
        <strong>${maintenanceFunding}</strong>
      </div>
      <div class="grid-item">
        <span>17. නඩත්තු වියදම් දරන්නාගේ ඥාතිත්වය / Relationship of Payer</span>
        <strong>${maintenancePayerRelationship || 'Self / තමා විසින්ම'}</strong>
      </div>
      <div class="grid-item full-span">
        <span>18. වැඩබැලීමේ විධිවිධාන (වැඩබලන නිලධාරී) / Acting Arrangement</span>
        <strong>${dutyCoverName} ${dutyCoverDesignation && dutyCoverDesignation !== '—' ? '— ' + dutyCoverDesignation : ''}</strong>
      </div>
    </div>

    <!-- 4. Address Abroad -->
    <div class="sec-title">4. Address & Contact While Abroad / විදේශයේ රැඳී සිටින ලිපිනය (Gen. 126 Cl. 10)</div>
    <div class="grid-2">
      <div class="grid-item full-span">
        <span>19. විදේශයේදී ලිපිනය / Residential or Hotel Address Abroad</span>
        <strong>${abroadAddress}</strong>
      </div>
      <div class="grid-item">
        <span>20. දුරකථන අංකය / Contact Phone Abroad</span>
        <strong>${abroadPhone}</strong>
      </div>
      <div class="grid-item">
        <span>21. විද්‍යුත් තැපෑල / Official or Personal Email</span>
        <strong>${abroadEmail}</strong>
      </div>
    </div>

    ${isOfficial && (d.trainingField || d.visitInstitution || d.fundingSource || d.goslAirfare) ? `
      <!-- Official Duty Specifics -->
      <div class="sec-title">5. Official Duty / Training Specifics / රාජකාරි සංචාර විශේෂ විස්තර</div>
      <div class="grid-2">
        <div class="grid-item">
          <span>22. පුහුණු ක්ෂේත්‍රය / Training Field</span>
          <strong>${d.trainingField || '—'}</strong>
        </div>
        <div class="grid-item">
          <span>23. සත්කාරක ආයතනය / Host Institution</span>
          <strong>${d.visitInstitution || '—'}</strong>
        </div>
        <div class="grid-item">
          <span>24. මූල්‍ය ප්‍රභවය / Funding Source</span>
          <strong>${d.fundingSource || '—'}</strong>
        </div>
        <div class="grid-item">
          <span>25. රජයේ වියදම් (GOSL Expenses)</span>
          <strong>Airfare: ${d.goslAirfare || 'Nil'}, Subsistence: ${d.goslSubsistence || 'Nil'}, Fees: ${d.goslCourseFees || 'Nil'}</strong>
        </div>
      </div>
    ` : ''}

    <!-- 5. Declaration and Signature -->
    <div class="sig-box">
      <div class="sig-declaration">
        <p style="margin: 0 0 4px 0; font-weight: 700; font-size: 10px;">
          19. ඉල්ලුම්කරුගේ ප්‍රකාශය (Applicant Declaration):
        </p>
        <p style="margin: 0 0 6px 0; font-size: 9px; color: #334155;">
          ඉහත සඳහන් සියලු විස්තර සත්‍ය හා නිවැරදි බවටත්, ආයතන සංග්‍රහයේ විධිවිධානවලට යටත්ව කටයුතු කිරීමටත් මෙයින් සහතික කරමි.<br />
          <em>I certify that the particulars furnished above are true and accurate to the best of my knowledge.</em>
        </p>
        <div style="font-size: 9.5px; line-height: 1.45; color: #0f172a;">
          <div><strong>අයදුම්කරු (Applicant):</strong> ${applicantName}</div>
          <div><strong>තනතුර (Designation):</strong> ${designation}</div>
          <div><strong>දිනය (Date):</strong> ${appDate}</div>
        </div>
      </div>

      <div class="sig-img-container">
        <div style="font-size: 9px; color: #64748b; margin-bottom: 3px;">අයදුම්කරුගේ අත්සන (Applicant's Signature):</div>
        ${signature ? `
          <img src="${signature}" class="sig-img" alt="Applicant Signature" />
          <div style="font-size: 8px; color: #16a34a; font-weight: 700; margin-top: 2px;">✓ සත්‍යාපිත ඩිජිටල් අත්සන</div>
        ` : '<div style="height: 38px; width: 160px; border-bottom: 1px dotted #000; margin-left: auto;"></div>'}
      </div>
    </div>

    <!-- PAGE 2: PART II - FOR OFFICE USE ONLY -->
    <div class="page-break"></div>

    <div class="gov-header">
      <div class="gov-top">Democratic Socialist Republic of Sri Lanka · ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
      <div class="gov-code-badge">GENERAL 126 · CLAUSE 13–19 · PART II</div>
      <div class="gov-title">For Office Use Only · Particulars of Available Leave</div>
      <div class="gov-sub">කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි · නිවාඩු පිළිබඳ විස්තර (Establishments Code Ch. XII)</div>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 11px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 4px;">
      <div><strong>නිලධාරියා (Officer):</strong> ${applicantName} (${designation})</div>
      <div><strong>දෙපාර්තමේන්තුව (Dept):</strong> ${department}</div>
      <div><strong>යොමු අංකය (Ref No):</strong> ${refNo}</div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th style="width: 50px;">Clause</th>
          <th>Description (විස්තරය)</th>
          <th style="width: 100px; text-align: center;">Entitled (හිමි)</th>
          <th style="width: 100px; text-align: center;">Taken (ගත්)</th>
          <th style="width: 100px; text-align: center;">Balance (ඉතිරි)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>13</td>
          <td>Vacation Leave for Current Year / වත්මන් වර්ෂය සඳහා විවේක නිවාඩු</td>
          <td style="text-align: center;">${assessment.vacationLeave?.months ? assessment.vacationLeave.months + 'm ' : ''}${assessment.vacationLeave?.days || assessment.vacationEntitled || '28'} d</td>
          <td style="text-align: center;">${assessment.vacationTaken || '0'} d</td>
          <td style="text-align: center;"><strong>${assessment.vacationBalance || assessment.vacationLeave?.days || '28'} d</strong></td>
        </tr>
        <tr>
          <td>14</td>
          <td>Casual Leave for Current Year / වත්මන් වර්ෂය සඳහා අනියම් නිවාඩු</td>
          <td style="text-align: center;">${assessment.casualEntitled || '21'} d</td>
          <td style="text-align: center;">${assessment.casualTaken || '0'} d</td>
          <td style="text-align: center;"><strong>${assessment.casualBalance || '21'} d</strong></td>
        </tr>
        <tr>
          <td>15</td>
          <td>Lapsed Leave from Previous Years / පෙර වසරවල කල්පසු වූ නිවාඩු</td>
          <td style="text-align: center;">${assessment.lapsedEntitled || '0'} d</td>
          <td style="text-align: center;">${assessment.lapsedTaken || '0'} d</td>
          <td style="text-align: center;"><strong>${assessment.lapsedBalance || '0'} d</strong></td>
        </tr>
        <tr>
          <td>16</td>
          <td>Half-Pay / Commuted Half-Pay Leave Available / අර්ධ වැටුප් නිවාඩු</td>
          <td style="text-align: center;">${assessment.commutedHalfPay?.days ? assessment.commutedHalfPay.days + ' d' : (assessment.halfPayEntitled || '—')}</td>
          <td style="text-align: center;">${assessment.halfPayTaken || '—'}</td>
          <td style="text-align: center;"><strong>${assessment.halfPayBalance || '—'}</strong></td>
        </tr>
        <tr>
          <td>17</td>
          <td>Special Leave / No-Pay Leave Credit / විශේෂ හෝ වැටුප් රහිත නිවාඩු</td>
          <td style="text-align: center;">${assessment.noPay?.days ? assessment.noPay.days + ' d' : (assessment.specialEntitled || '—')}</td>
          <td style="text-align: center;">${assessment.specialTaken || '—'}</td>
          <td style="text-align: center;"><strong>${assessment.specialBalance || '—'}</strong></td>
        </tr>
        <tr style="background: #f8fafc; font-weight: 700;">
          <td>18</td>
          <td>Period of Leave Applied For / අයදුම් කර ඇති නිවාඩු කාලසීමාව</td>
          <td colspan="3" style="text-align: center; color: #1e40af;">${startDate} to ${endDate} (${daysApplied} Days / දින)</td>
        </tr>
        <tr style="background: #eff6ff; font-weight: 700;">
          <td>19</td>
          <td>Leave Balance Remaining After Proposed Leave / නිවාඩුවෙන් පසු ඉතිරි ශේෂය</td>
          <td colspan="3" style="text-align: center; color: #15803d; font-size: 11.5px;">
            ${assessment.remainingBalance ? `${assessment.remainingBalance} Days / දින` : 'To be computed upon formal verification'}
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 18px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; background: #fafafa;">
      <div style="font-weight: 700; color: #1e3a8a; font-size: 10.5px; margin-bottom: 6px;">
        විෂයභාර නිලධාරී සටහන සහ නිර්දේශය (Subject Officer Assessment & Minute):
      </div>
      <div style="font-size: 10px; color: #334155; min-height: 38px; line-height: 1.45;">
        ${subjectOfficerRemarks || 'ඉහත නිවාඩු විස්තර පරීක්ෂා කර සත්‍යාපනය කරන ලදී. ආයතන සංග්‍රහයේ XII පරිච්ඡේදය යටතේ නිවාඩු අනුමැතිය සඳහා නිර්දේශ කර යොමු කෙරේ.'}
      </div>
      <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dotted #cbd5e1; padding-top: 8px;">
        <div style="font-size: 9.5px; color: #64748b;">
          දිනය (Date): <strong>${subjectOfficerDate || 'Pending / ඉදිරියේදී සම්පූර්ණ වේ'}</strong>
        </div>
        <div style="text-align: center; width: 220px;">
          ${subjectOfficerSig ? `
            <img src="${subjectOfficerSig}" style="max-height: 40px; max-width: 180px; display: block; margin: 0 auto 3px;" alt="Subject Officer Signature" />
          ` : '<div style="height: 32px; border-bottom: 1px dotted #000; width: 160px; margin: 0 auto 3px;"></div>'}
          <div style="border-top: 1px dotted #000; padding-top: 3px; font-size: 9.5px;">
            <strong>${subjectOfficerName}</strong><br />
            <span>${subjectOfficerDesig}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE 3: PART III - RECOMMENDATION OF HEAD OF DEPARTMENT -->
    <div class="page-break"></div>

    <div class="gov-header">
      <div class="gov-top">Democratic Socialist Republic of Sri Lanka · ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
      <div class="gov-code-badge">GENERAL 126 · PART III · ESTABLISHMENTS CODE XV 10:1</div>
      <div class="gov-title">Recommendation of Head of Department</div>
      <div class="gov-sub">ආයතන ප්‍රධානියාගේ නිර්දේශය සහ නියෝගය (Est. Code Ch. XV 10:1)</div>
    </div>

    <div style="margin-top: 14px; border: 1.5px solid #0f172a; border-radius: 6px; padding: 18px; background: #ffffff;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 10.5px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">
        <div><strong>ලිපි අංකය (My No):</strong> ${deptHeadNo || `${refNo}/HOD-REC`}</div>
        <div><strong>අයදුම්කරු (Applicant):</strong> ${applicantName} (${designation})</div>
        <div><strong>දින (Date):</strong> ${deptHeadDate || appDate}</div>
      </div>

      <div style="font-size: 10.5px; line-height: 1.6; color: #0f172a;">
        <p style="margin: 0 0 10px 0;">
          <strong>අමාත්‍යාංශ ලේකම්තුමා වෙත (To the Secretary to the Ministry):</strong>
        </p>

        <p style="margin: 0 0 10px 0;">
          1. ${applicantName} ${deptEndorsement.officerSalutation === 'Mrs.' || activeSalutation === 'Mrs.' ? 'මහත්මිය' : (deptEndorsement.officerSalutation === 'Miss' || activeSalutation === 'Miss' ? 'මෙනවිය' : 'මහතා')} (${designation}) විසින් ${startDate} සිට ${endDate} දක්වා දින ${daysApplied} ක කාලයක් සඳහා ${destination} වෙත විදේශගතවීම පිණිස ඉදිරිපත් කරන ලද ඉහත නිවාඩු අයදුම්පත්‍රය අනුමැතිය සඳහා නිර්දේශ කර ඉදිරිපත් කරමි.<br />
          <em>I recommend that the foreign leave applied for by ${deptEndorsement.officerSalutation || activeSalutation} ${applicantName} (${designation}) for ${daysApplied} days from ${startDate} to ${endDate} be granted.</em>
        </p>

        <p style="margin: 0 0 10px 0;">
          2. මෙම නිලධාරියා විදේශගතව සිටින කාලය තුළ ආයතනයේ වැඩකටයුතු බාධාවකින් තොරව පවත්වාගෙන යාම සඳහා <strong>${dutyCoverName || 'නියමිත නිලධාරියා'}</strong> (${dutyCoverDesignation || 'වැඩබලන නිලධාරී'}) වෙත රාජකාරි පැවරීමට සතුටුදායක විධිවිධාන සලසා ඇත.<br />
          <em>Satisfactory arrangements have been made for the performance of the duties of the officer's post during absence.</em>
        </p>

        <p style="margin: 0 0 14px 0;">
          3. මෙම නිලධාරියාට එරෙහිව කිසිදු මූල්‍ය හෝ විනය විමර්ශනයක් පවත්වාගෙන යනු නොලබන බවත්, රජයේ මුදල් අයවිය යුතු නොවන බවත් මෙයින් සහතික කරමි.<br />
          <em>I certify that no disciplinary action or audit surcharge inquiry is pending or contemplated against the officer.</em>
        </p>
      </div>

      <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dotted #cbd5e1; padding-top: 14px;">
        <div style="font-size: 10px; color: #475569;">
          <div><strong>තීරණය (Status):</strong> <span style="color: #15803d; font-weight: 700;">${deptHeadRecommendation}</span></div>
          <div style="margin-top: 4px;"><strong>කාර්යාලය (Office):</strong> ${department}</div>
          <div style="margin-top: 2px;"><strong>දිනය (Date):</strong> ${deptHeadDate || 'Pending / ඉදිරියේදී අත්සන් කෙරේ'}</div>
        </div>

        <div style="text-align: center; width: 260px;">
          ${deptHeadSig ? `
            <img src="${deptHeadSig}" style="max-height: 48px; max-width: 200px; display: block; margin: 0 auto 4px;" alt="Head of Department Signature" />
          ` : '<div style="height: 38px; border-bottom: 1px dotted #000; width: 180px; margin: 0 auto 4px;"></div>'}
          <div style="border-top: 1px dotted #000; padding-top: 4px; font-size: 10px;">
            <strong>${deptHeadName}</strong><br />
            <span>${deptHeadDesig}</span><br />
            <small style="color: #64748b;">${department}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="cert-footer">
      <div>
        <strong>Democratic Socialist Republic of Sri Lanka · Department of Management Services & Public Administration</strong><br />
        Official System Generated Master General 126 Dossier (Parts I, II & III) · Establishments Code Ch. XII & XV
      </div>
      <div style="text-align: right;">
        Security Verification Ref: ${refNo}-GEN126-FULL<br />
        Generated: ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC
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
  let activeSalutation = (endorsement.officerSalutation && endorsement.officerSalutation !== 'Mr./Mrs./Miss')
    ? endorsement.officerSalutation
    : (r.applicant_salutation || d.salutation || 'Mr.');
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
  const activeSalutation = r.applicant_salutation || d.salutation || 'Mr.';
  const sinhalaHonorific = activeSalutation === 'Mrs.' ? 'මහත්මිය' : (activeSalutation === 'Miss' ? 'මෙනවිය' : 'මහතා');
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
      ${department} හි සේවය කරන ${designation} ${applicantName} ${sinhalaHonorific} විසින් ${r.start_date || '—'} සිට ${r.end_date || '—'} දක්වා ${r.destination || '—'} බලා නිවාඩු ලබා ගැනීම සඳහා ඉදිරිපත් කරන ලද ඉල්ලීම ආයතන ප්‍රධානියාගේ නිර්දේශය සහිතව අමාත්‍යාංශය වෙත ලැබී ඇත.</p>
      
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
