import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import util from 'util';
import { DatabaseSync } from 'node:sqlite';

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

function getGeneral126Html(r) {
  const d = r.details || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = d.fullName || r.applicant_name || '—';
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
        <strong>${applicantName}</strong>
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
          1. ${applicantName} (${designation}) විසින් ${startDate} සිට ${endDate} දක්වා දින ${daysApplied} ක කාලයක් සඳහා ${destination} වෙත විදේශගතවීම පිණිස ඉදිරිපත් කරන ලද ඉහත නිවාඩු අයදුම්පත්‍රය අනුමැතිය සඳහා නිර්දේශ කර ඉදිරිපත් කරමි.<br />
          <em>I recommend that the foreign leave applied for by ${applicantName} (${designation}) for ${daysApplied} days from ${startDate} to ${endDate} be granted.</em>
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

const db = new DatabaseSync('data/portal.sqlite');
const r = db.prepare(`
  SELECT r.*, u.name AS applicant_name, u.email AS applicant_email
  FROM requests r
  JOIN users u ON u.id = r.applicant_id
  ORDER BY r.id DESC LIMIT 1
`).get();
r.details = JSON.parse(r.details_json || '{}');

const html = getGeneral126Html(r);
const pdfPath = 'scratch/test_gen126_full.pdf';
await htmlToPdf(html, pdfPath);
console.log('PDF generated at', pdfPath, 'size:', fs.statSync(pdfPath).size);
