const fs = require('fs');

const modalPath = 'src/request-modal.jsx';
let content = fs.readFileSync(modalPath, 'utf8');

const startMarker = 'export function printDepartmentHeadLetterPdf(r) {';
const endMarker = 'export const printMinistrySecretaryLetterPdf = printSecretaryApprovalLetterPdf;';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newImplementation = `export function printDepartmentHeadLetterPdf(r) {
  if (!r) return;
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const d = r.details || (r.applicant_name ? r : {});
  const endorsement = d.departmentHeadEndorsement || {};
  const departmentName = r.department_name || d.department || endorsement.completedBy?.department || 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions';

  const rawMinistry = endorsement.ministryName || d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\\s+of\\s+|අමාත්‍යාංශය\\s*)/i, '').trim() || rawMinistry;

  let rawApplicantName = r.applicant_name || d.applicantName || d.fullName || '........................................................................';
  let activeSalutation = endorsement.officerSalutation || 'Mr.';
  const prefixMatch = rawApplicantName.match(/^(Mr\\.|Mrs\\.|Miss|Ms\\.|Dr\\.|Prof\\.|Eng\\.|Rev\\.)\\s*/i);
  if (prefixMatch) {
    activeSalutation = prefixMatch[1];
    rawApplicantName = rawApplicantName.slice(prefixMatch[0].length).trim();
  }

  const refNo = endorsement.myNo || d.deptRefNo || (r.id ? \`\${(r.department_name || d.department || 'SLT').slice(0, 4).toUpperCase()}/LV/\${new Date().getFullYear()}/FV-\${String(r.id).padStart(4, '0')}\` : '...........................');
  const recommendation = endorsement.recommendation || (r.status !== 'Pending Department Head Approval' ? 'recommended' : '');
  const pmPermission = endorsement.primeMinisterPermission || 'obtained';
  const date = endorsement.date || (r.status !== 'Pending Department Head Approval' ? r.created_at?.slice(0, 10) : '...........................');
  const signature = endorsement.signature;
  const headName = endorsement.completedBy?.name || d.forwardedDepartment?.headName || (r.status !== 'Pending Department Head Approval' ? 'Head of Department' : '');
  const headDesignation = endorsement.completedBy?.designation || d.forwardedDepartment?.headDesignation || 'Head of Department / Institution';
  const remarks = endorsement.remarks || '';

  // Secretary data
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const secretaryClearance = clearances.find(c => c.role === 'secretary' || c.decision === 'approve') || d.secretaryApproval || (r.status === 'Approved' ? {
    userName: 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)',
    userDesignation: 'ලේකම් (Secretary)',
    ministryName: cleanMinistryName,
    date: r.updated_at?.slice(0, 10) || ''
  } : null);

  const secRefNo = secretaryClearance?.myNo || (r.id ? \`\${cleanMinistryName.slice(0, 3).toUpperCase()}/SEC/\${new Date().getFullYear()}/FV-\${String(r.id).padStart(4, '0')}\` : '...........................');
  const secName = secretaryClearance?.userName || secretaryClearance?.signatoryName || (r.status === 'Approved' ? 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)' : '');
  const secSignature = secretaryClearance?.signature;
  const secDate = secretaryClearance?.date || secretaryClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '...........................');
  const isSecretaryApproved = r.status === 'Approved' || r.status === 'Pending Presidential Approval' || secretaryClearance?.decision === 'approve';
  const isSecretaryRejected = r.status === 'Rejected' || secretaryClearance?.decision === 'reject';

  printWin.document.write(\`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Head of Department & Secretary Letter - \${refNo} - \${rawApplicantName}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: "Times New Roman", Times, Georgia, serif;
            color: #0f172a;
            background: #f1f5f9;
            margin: 0;
            padding: 24px;
            font-size: 15px;
            line-height: 1.6;
          }
          .no-print-toolbar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: #1e1b4b;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto 24px;
            max-width: 210mm;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 12px;
          }
          .toolbar-btn {
            border: none;
            padding: 7px 14px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            font-size: 11.5px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s ease;
          }
          .btn-primary { background: #2563eb; color: #ffffff; }
          .btn-primary:hover { background: #1d4ed8; }
          .btn-secondary { background: #334155; color: #ffffff; }
          .btn-secondary:hover { background: #475569; }

          .sheet-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto 30px;
            background: #ffffff;
            padding: 24mm 22mm;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .sheet-content {
            flex: 1;
          }

          /* Official Government Letterhead */
          .official-letterhead {
            text-align: center;
            margin-bottom: 26px;
            padding-bottom: 14px;
            border-bottom: 1.5px solid #0f172a;
          }
          .republic-title-si {
            font-size: 13.5px;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: 0.5px;
          }
          .republic-title-en {
            font-size: 11px;
            font-weight: 700;
            color: #334155;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            margin-top: 2px;
          }
          .department-name {
            font-size: 17px;
            font-weight: 800;
            color: #091e42;
            margin-top: 6px;
            letter-spacing: 0.3px;
          }
          .circular-badge {
            font-size: 11px;
            color: #475569;
            font-style: italic;
            margin-top: 4px;
          }

          /* Ref & Addressee */
          .top-ref-row {
            text-align: right;
            font-size: 15px;
            margin-bottom: 24px;
          }
          .dotted-fill {
            display: inline-block;
            border-bottom: 1.2px dotted #0f172a;
            padding: 0 8px;
            font-weight: 700;
            min-width: 180px;
            text-align: left;
          }
          .addressee {
            font-size: 15.5px;
            line-height: 1.5;
            margin-bottom: 30px;
          }

          /* Clauses */
          .clause-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 22px;
            font-size: 15px;
            line-height: 1.75;
            text-align: justify;
            text-justify: inter-word;
          }
          .clause-num {
            width: 26px;
            font-weight: 700;
            font-size: 15.5px;
            flex-shrink: 0;
          }
          .clause-body {
            flex: 1;
          }
          .applicant-line {
            border-bottom: 1.2px dotted #0f172a;
            padding: 0 6px;
            font-weight: 700;
          }
          .rec-highlight {
            font-weight: 700;
            text-decoration: underline;
            color: #15803d;
            font-size: 15.5px;
          }
          .rec-muted {
            text-decoration: line-through;
            color: #94a3b8;
          }

          .observations-box {
            margin: 12px 0 24px 26px;
            padding: 8px 14px;
            background: #f8fafc;
            border-left: 3px solid #2563eb;
            font-size: 13.5px;
            font-style: italic;
            color: #334155;
          }

          /* Footer */
          .footer-row {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .date-col {
            width: 45%;
            font-size: 15px;
          }
          .sig-col {
            width: 50%;
            text-align: center;
          }
          .sig-img {
            max-height: 52px;
            max-width: 220px;
            display: block;
            margin: 0 auto 6px;
          }
          .sig-line {
            border-bottom: 1.2px dotted #0f172a;
            width: 240px;
            margin: 0 auto 6px;
            height: 40px;
          }
          .sig-caption {
            border-top: 1.2px dotted #0f172a;
            padding-top: 6px;
            font-size: 14px;
            line-height: 1.4;
          }

          .doc-footer-meta {
            margin-top: 25px;
            padding-top: 8px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #94a3b8;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }

          @media print {
            @page {
              size: A4 portrait;
              margin: 0;
            }
            body {
              background: #ffffff;
              padding: 0;
            }
            .no-print-toolbar {
              display: none !important;
            }
            .hide-on-print {
              display: none !important;
            }
            .sheet-page {
              margin: 0;
              box-shadow: none;
              page-break-after: always;
              height: 297mm;
              max-height: 297mm;
              padding: 22mm 20mm;
            }
          }
        </style>
      </head>
      <body>
        <!-- Top Interactive Toolbar -->
        <div class="no-print-toolbar">
          <div>
            <strong>📄 Est. Code XV 10:1 Official Letters (ආයතන ප්‍රධානී හා ලේකම් ලිපි)</strong>
            <span style="opacity: 0.8; margin-left: 10px;">Ref: \${refNo} · \${rawApplicantName}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="toolbar-btn btn-primary" onclick="printAll()">
              🖨️ සියල්ල මුද්‍රණය (Print Both)
            </button>
            <button class="toolbar-btn btn-secondary" onclick="printPart1Only()">
              📄 1. ආයතන ප්‍රධානී ලිපිය (Part 1 Only)
            </button>
            <button class="toolbar-btn btn-secondary" onclick="printPart2Only()">
              📄 2. ලේකම් ලිපිය (Part 2 Only)
            </button>
            <button class="toolbar-btn btn-secondary" onclick="window.close()">
              ✕ වසන්න
            </button>
          </div>
        </div>

        <!-- PAGE 1: HEAD OF DEPARTMENT FORWARDING LETTER -->
        <div class="sheet-page" id="page-part1">
          <div class="sheet-content">
            <div class="official-letterhead">
              <div class="republic-title-si">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
              <div class="republic-title-en">Democratic Socialist Republic of Sri Lanka</div>
              <div class="department-name">\${departmentName}</div>
              <div class="circular-badge">Establishments Code Chapter XV Section 10:1 · Recommendation of Head of Department</div>
            </div>

            <div class="top-ref-row">
              my no.} <span class="dotted-fill">\${refNo}</span>
            </div>

            <div class="addressee">
              The Secretary,<br />
              Ministry of <u>\${cleanMinistryName}</u>
            </div>

            <!-- Clause 1 -->
            <div class="clause-row">
              <div class="clause-num">1</div>
              <div class="clause-body">
                forward herewith two copies of the leave application of<br />
                \${activeSalutation} <span class="applicant-line"><u>\${rawApplicantName}</u></span>. I certify that
                acting arrangement have been made and that there is no disciplinary
                action pending or contemplated against this officer.
              </div>
            </div>

            <!-- Clause 2 -->
            <div class="clause-row">
              <div class="clause-num">2</div>
              <div class="clause-body">
                Prime Minister’s permission has been obtained in terms of Chapter XV -10:1 of the Establishments code. \${pmPermission === 'obtained' ? '<strong style="color: #166534; font-size: 13.5px; margin-left: 6px;">(Obtained / ලබාගෙන ඇත)</strong>' : ''}
              </div>
            </div>

            <!-- Clause 3 -->
            <div class="clause-row">
              <div class="clause-num">3</div>
              <div class="clause-body">
                Leave is \${
                  recommendation === 'recommended'
                    ? '<span class="rec-highlight">recommended</span> / <span class="rec-muted">not recommended</span>.'
                    : recommendation === 'not_recommended'
                    ? '<span class="rec-muted">recommended</span> / <span class="rec-highlight" style="color: #b91c1c;">not recommended</span>.'
                    : 'recommended / not recommended.'
                }
              </div>
            </div>

            \${remarks ? \`
              <div class="observations-box">
                <strong>Observations / Remarks:</strong> \${remarks}
              </div>
            \` : ''}

            <!-- Footer Date & Signature -->
            <div class="footer-row">
              <div class="date-col">
                Date} <span class="dotted-fill" style="min-width: 140px;">\${date}</span>
              </div>

              <div class="sig-col">
                \${signature ? \`<img src="\${signature}" class="sig-img" alt="Signature" />\` : '<div class="sig-line"></div>'}
                <div class="sig-caption">
                  \${headName ? \`<strong>\${headName}</strong><br />\` : ''}
                  Signature and<br />
                  Designation of Head of<br />
                  Department<br />
                  \${headDesignation ? \`<span style="font-size: 12.5px; color: #334155;">\${headDesignation}</span><br />\` : ''}
                  \${departmentName ? \`<span style="font-size: 11.5px; color: #64748b;">\${departmentName}</span>\` : ''}
                </div>
              </div>
            </div>
          </div>

          <div class="doc-footer-meta">
            <span>Establishments Code Chapter XV · Section 10:1 (Part I: Head of Department)</span>
            <span>Ref: \${refNo} · Page 1 of 2</span>
          </div>
        </div>

        <!-- PAGE 2: MINISTRY SECRETARY APPROVAL & DIRECTIVE -->
        <div class="sheet-page" id="page-part2">
          <div class="sheet-content">
            <div class="official-letterhead">
              <div class="republic-title-si">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
              <div class="republic-title-en">Democratic Socialist Republic of Sri Lanka</div>
              <div class="department-name">Ministry of \${cleanMinistryName}</div>
              <div class="circular-badge">Establishments Code Chapter XV Section 10:1 · Ministerial Decision & Directive to Head of Department</div>
            </div>

            <div class="top-ref-row">
              my no.} <span class="dotted-fill">\${secRefNo}</span>
            </div>

            <div class="addressee" style="margin-bottom: 40px;">
              <span class="dotted-fill" style="min-width: 320px; font-weight: normal;">\${headName ? \`\${headName}, \${headDesignation}\` : '......................................................................'}</span><br />
              Head of Department,<br />
              <span style="font-size: 13.5px; color: #475569;">\${departmentName}</span>
            </div>

            <div style="text-align: center; margin: 50px 0 60px;">
              <div style="border-bottom: 1.2px dotted #0f172a; width: 340px; margin: 0 auto 10px;"></div>
              <div style="font-size: 18px; letter-spacing: 0.5px;">
                Leave is \${
                  isSecretaryApproved
                    ? '<span class="rec-highlight" style="font-size: 19px;">approved</span> / <span class="rec-muted">not approved</span>'
                    : isSecretaryRejected
                    ? '<span class="rec-muted">approved</span> / <span class="rec-highlight" style="color: #b91c1c; font-size: 19px;">not approved</span>'
                    : 'approved / not approved'
                }
              </div>
            </div>

            <div class="footer-row" style="margin-top: 50px;">
              <div class="date-col">
                <div>Date} <span class="dotted-fill" style="min-width: 140px;">\${secDate}</span></div>
                <div style="margin-top: 24px; font-size: 13px; color: #334155; font-style: italic;">
                  copy to: Secretary to the Prime Minister.
                </div>
              </div>

              <div class="sig-col">
                \${secSignature ? \`<img src="\${secSignature}" class="sig-img" alt="Secretary Signature" />\` : '<div class="sig-line"></div>'}
                <div class="sig-caption">
                  \${secName ? \`<strong>\${secName}</strong><br />\` : ''}
                  Secretary.<br />
                  ministry of <span style="border-bottom: 1.2px dotted #0f172a; padding: 0 6px; font-weight: 700;">\${cleanMinistryName}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="doc-footer-meta">
            <span>Establishments Code Chapter XV · Section 10:1 (Part II: Ministry Secretary)</span>
            <span>Ref: \${secRefNo} · Page 2 of 2</span>
          </div>
        </div>

        <script>
          function printAll() {
            document.querySelectorAll('.sheet-page').forEach(function(el) { el.classList.remove('hide-on-print'); });
            window.print();
          }
          function printPart1Only() {
            document.getElementById('page-part1').classList.remove('hide-on-print');
            document.getElementById('page-part2').classList.add('hide-on-print');
            window.print();
          }
          function printPart2Only() {
            document.getElementById('page-part1').classList.add('hide-on-print');
            document.getElementById('page-part2').classList.remove('hide-on-print');
            window.print();
          }
          window.onload = function() {
            // Can be left ready for user print button
          };
        </script>
      </body>
    </html>
  \`);
  printWin.document.close();
}

export const printHeadOfDepartmentLetterPdf = printDepartmentHeadLetterPdf;

// =========================================================================
// 5. STANDALONE MINISTRY SECRETARY APPROVAL LETTER PDF (Est. Code XV 10:1)
// =========================================================================
export function printSecretaryApprovalLetterPdf(r) {
  if (!r) return;
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const d = r.details || (r.applicant_name ? r : {});
  const endorsement = d.departmentHeadEndorsement || {};
  const departmentName = r.department_name || d.department || endorsement.completedBy?.department || 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions';
  const rawMinistry = endorsement.ministryName || d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\\s+of\\s+|අමාත්‍යාංශය\\s*)/i, '').trim() || rawMinistry;

  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const secretaryClearance = clearances.find(c => c.role === 'secretary' || c.decision === 'approve') || d.secretaryApproval || (r.status === 'Approved' ? {
    userName: 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)',
    userDesignation: 'ලේකම් (Secretary)',
    ministryName: cleanMinistryName,
    date: r.updated_at?.slice(0, 10) || ''
  } : null);

  const secRefNo = secretaryClearance?.myNo || (r.id ? \`\${cleanMinistryName.slice(0, 3).toUpperCase()}/SEC/\${new Date().getFullYear()}/FV-\${String(r.id).padStart(4, '0')}\` : '...........................');
  const headName = endorsement.completedBy?.name || d.forwardedDepartment?.headName || (r.status !== 'Pending Department Head Approval' ? 'Head of Department' : '');
  const headDesignation = endorsement.completedBy?.designation || d.forwardedDepartment?.headDesignation || 'Head of Department / Institution';
  const applicantName = r.applicant_name || d.applicantName || d.fullName || '—';

  const isSecretaryApproved = r.status === 'Approved' || r.status === 'Pending Presidential Approval' || secretaryClearance?.decision === 'approve';
  const isSecretaryRejected = r.status === 'Rejected' || secretaryClearance?.decision === 'reject';
  const secDate = secretaryClearance?.date || secretaryClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '...........................');
  const secSignature = secretaryClearance?.signature;
  const secName = secretaryClearance?.userName || secretaryClearance?.signatoryName || (r.status === 'Approved' ? 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)' : '');

  printWin.document.write(\`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Secretary Approval Letter - \${secRefNo} - \${applicantName}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: "Times New Roman", Times, Georgia, serif;
            color: #0f172a;
            background: #f1f5f9;
            margin: 0;
            padding: 24px;
            font-size: 15px;
            line-height: 1.6;
          }
          .no-print-toolbar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: #14532d;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto 24px;
            max-width: 210mm;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 12px;
          }
          .toolbar-btn {
            border: none;
            padding: 7px 14px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            font-size: 11.5px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .btn-primary { background: #16a34a; color: #ffffff; }
          .btn-secondary { background: #334155; color: #ffffff; }

          .sheet-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: #ffffff;
            padding: 26mm 22mm;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .sheet-content { flex: 1; }

          .official-letterhead {
            text-align: center;
            margin-bottom: 28px;
            padding-bottom: 14px;
            border-bottom: 1.5px solid #0f172a;
          }
          .republic-title-si { font-size: 13.5px; font-weight: 700; color: #0f172a; letter-spacing: 0.5px; }
          .republic-title-en { font-size: 11px; font-weight: 700; color: #334155; letter-spacing: 1.2px; text-transform: uppercase; margin-top: 2px; }
          .department-name { font-size: 17px; font-weight: 800; color: #091e42; margin-top: 6px; }
          .circular-badge { font-size: 11px; color: #475569; font-style: italic; margin-top: 4px; }

          .top-ref-row { text-align: right; font-size: 15px; margin-bottom: 24px; }
          .dotted-fill { display: inline-block; border-bottom: 1.2px dotted #0f172a; padding: 0 8px; font-weight: 700; min-width: 180px; text-align: left; }
          .addressee { font-size: 15.5px; line-height: 1.5; margin-bottom: 40px; }

          .rec-highlight { font-weight: 700; text-decoration: underline; color: #15803d; }
          .rec-muted { text-decoration: line-through; color: #94a3b8; }

          .footer-row { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-start; }
          .date-col { width: 45%; font-size: 15px; }
          .sig-col { width: 50%; text-align: center; }
          .sig-img { max-height: 52px; max-width: 220px; display: block; margin: 0 auto 6px; }
          .sig-line { border-bottom: 1.2px dotted #0f172a; width: 240px; margin: 0 auto 6px; height: 40px; }
          .sig-caption { border-top: 1.2px dotted #0f172a; padding-top: 6px; font-size: 14px; line-height: 1.4; }

          .doc-footer-meta {
            margin-top: 25px;
            padding-top: 8px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #94a3b8;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }

          @media print {
            @page { size: A4 portrait; margin: 0; }
            body { background: #ffffff; padding: 0; }
            .no-print-toolbar { display: none !important; }
            .sheet-page { margin: 0; box-shadow: none; height: 297mm; max-height: 297mm; padding: 22mm 20mm; }
          }
        </style>
      </head>
      <body>
        <div class="no-print-toolbar">
          <div>
            <strong>📄 Ministry Secretary Decision Letter (අමාත්‍යාංශ ලේකම් තීරණ ලිපිය)</strong>
            <span style="opacity: 0.8; margin-left: 10px;">Ref: \${secRefNo} · \${applicantName}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="toolbar-btn btn-primary" onclick="window.print()">🖨️ PDF බාගන්න / Print</button>
            <button class="toolbar-btn btn-secondary" onclick="window.close()">✕ වසන්න</button>
          </div>
        </div>

        <div class="sheet-page">
          <div class="sheet-content">
            <div class="official-letterhead">
              <div class="republic-title-si">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
              <div class="republic-title-en">Democratic Socialist Republic of Sri Lanka</div>
              <div class="department-name">Ministry of \${cleanMinistryName}</div>
              <div class="circular-badge">Establishments Code Chapter XV Section 10:1 · Ministerial Decision & Directive to Head of Department</div>
            </div>

            <div class="top-ref-row">
              my no.} <span class="dotted-fill">\${secRefNo}</span>
            </div>

            <div class="addressee">
              <span class="dotted-fill" style="min-width: 320px; font-weight: normal;">\${headName ? \`\${headName}, \${headDesignation}\` : '......................................................................'}</span><br />
              Head of Department,<br />
              <span style="font-size: 13.5px; color: #475569;">\${departmentName}</span>
            </div>

            <div style="text-align: center; margin: 55px 0 65px;">
              <div style="border-bottom: 1.2px dotted #0f172a; width: 340px; margin: 0 auto 10px;"></div>
              <div style="font-size: 18px; letter-spacing: 0.5px;">
                Leave is \${
                  isSecretaryApproved
                    ? '<span class="rec-highlight" style="font-size: 19px;">approved</span> / <span class="rec-muted">not approved</span>'
                    : isSecretaryRejected
                    ? '<span class="rec-muted">approved</span> / <span class="rec-highlight" style="color: #b91c1c; font-size: 19px;">not approved</span>'
                    : 'approved / not approved'
                }
              </div>
            </div>

            <div class="footer-row">
              <div class="date-col">
                <div>Date} <span class="dotted-fill" style="min-width: 140px;">\${secDate}</span></div>
                <div style="margin-top: 24px; font-size: 13px; color: #334155; font-style: italic;">
                  copy to: Secretary to the Prime Minister.
                </div>
              </div>

              <div class="sig-col">
                \${secSignature ? \`<img src="\${secSignature}" class="sig-img" alt="Secretary Signature" />\` : '<div class="sig-line"></div>'}
                <div class="sig-caption">
                  \${secName ? \`<strong>\${secName}</strong><br />\` : ''}
                  Secretary.<br />
                  ministry of <span style="border-bottom: 1.2px dotted #0f172a; padding: 0 6px; font-weight: 700;">\${cleanMinistryName}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="doc-footer-meta">
            <span>Establishments Code Chapter XV · Section 10:1 (Part II: Ministry Secretary)</span>
            <span>Ref: \${secRefNo}</span>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  \`);
  printWin.document.close();
}
\n`;

content = content.slice(0, startIdx) + newImplementation + content.slice(endIdx);
fs.writeFileSync(modalPath, content, 'utf8');
console.log('Successfully updated src/request-modal.jsx!');
