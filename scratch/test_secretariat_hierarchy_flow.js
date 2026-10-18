// Integration test for sequential ministerial secretariat workflow and hierarchy enforcement
const BASE_URL = 'http://localhost:3001';

async function post(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function get(path, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { headers });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function login(email, password = 'Demo@123') {
  const res = await post('/api/auth/login', { email, password });
  if (!res.ok) throw new Error(`Login failed for ${email}: ${JSON.stringify(res.data)}`);
  return res.data.token;
}

async function runTest() {
  console.log('🚀 Starting Ministerial Secretariat Sequential Workflow Test...\n');

  // 1. Log in users
  const applicantToken = await login('officer@foring.gov.lk');
  const deptHeadToken = await login('head.slt@foring.gov.lk');
  const reviewerToken = await login('reviewer@foring.gov.lk');
  const asstSecToken = await login('asst.sec@foring.gov.lk');
  const seniorAsstSecToken = await login('senior.asst.sec@foring.gov.lk');
  const addlSecToken = await login('addl.sec@foring.gov.lk');
  const secretaryToken = await login('secretary@foring.gov.lk');
  console.log('✅ All test users authenticated successfully.');

  // 2. Applicant submits personal leave (Gen-126)
  const dummySignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const subRes = await post('/api/requests', {
    destination: 'United Kingdom (London)',
    purpose: 'Personal Holiday & Visiting Relatives',
    startDate: '2026-11-01',
    endDate: '2026-11-20',
    leaveType: 'Private leave',
    signature: dummySignature,
    details: {
      applicationFormType: 'gen126',
      fullName: 'Mr. P. K. Samarasinghe',
      designation: 'Lead Telecom Engineer',
      service: 'Class I Grade II',
      department: 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions',
      firstAppointmentDate: '2015-03-01',
      lastReturnDate: '2023-08-10',
      appliedPeriod: '20 days (2026-11-01 to 2026-11-20)',
      leaveReason: 'Personal vacation and family visit',
      prepaidTicket: { isPrepaid: 'yes', senderRelationship: 'Brother' },
      maintenanceAbroad: { costMetBy: 'Personal savings & brother', expenditureRelationship: 'Self and Brother' },
      abroadAddress: '42 Baker Street, London NW1 6XE, UK',
      applicationDate: '2026-10-16',
      applicantSignature: dummySignature,
      supportingDocuments: {
        letterFromHead: { name: 'Institutional_Letter.pdf', size: 1024, type: 'application/pdf' },
        passportCopy: { name: 'Passport_Copy.pdf', size: 2048, type: 'application/pdf' },
        requestLetter: { name: 'Leave_Request_Letter.pdf', size: 1536, type: 'application/pdf' }
      }
    }
  }, applicantToken);

  if (!subRes.ok) throw new Error(`Submission failed: ${JSON.stringify(subRes.data)}`);
  const reqId = subRes.data.id;
  console.log(`✅ Step 1: Applicant submitted application FV-${String(reqId).padStart(4, '0')} (Status: ${subRes.data.status})`);

  // 3. Dept Head Endorsement (Est. Code XV 10:1)
  const deptRes = await post(`/api/requests/${reqId}/department-head-endorsement`, {
    myNo: 'SLT/HR/2026/894',
    ministryName: 'Ministry of Technology',
    officerSalutation: 'Mr.',
    actingArrangementsCertified: true,
    noDisciplinaryActionCertified: true,
    primeMinisterPermission: 'obtained',
    recommendation: 'recommended',
    remarks: 'Acting arrangements made and disciplinary clearance verified.',
    signature: dummySignature
  }, deptHeadToken);

  if (!deptRes.ok) throw new Error(`Dept Head endorsement failed: ${JSON.stringify(deptRes.data)}`);
  console.log(`✅ Step 2: Head of Department endorsed & forwarded to Subject Officer (Status: ${deptRes.data.status})`);

  // 4. Subject Officer Assessment with Signature & Forwarding to Assistant Secretary
  // 4a. Verify signature is mandatory
  const missingSigRes = await post(`/api/requests/${reqId}/officer-assessment`, {
    officerAssessment: { vacationLeave: { months: '0', days: '20' }, total: { months: '0', days: '20' } },
    targetRole: 'assistant_secretary'
  }, reviewerToken);
  if (missingSigRes.status !== 400) {
    throw new Error(`Expected HTTP 400 for missing signature, got ${missingSigRes.status}`);
  }
  console.log(`✅ Verified: Subject Officer without signature is rejected (HTTP 400: ${missingSigRes.data.error})`);

  // 4b. Submit with signature
  const soRes = await post(`/api/requests/${reqId}/officer-assessment`, {
    officerAssessment: {
      vacationLeave: { months: '0', days: '20' },
      commutedHalfPay: { months: '0', days: '0' },
      halfPay: { months: '0', days: '0' },
      noPay: { months: '0', days: '0' },
      total: { months: '0', days: '20' }
    },
    noteSheet: { name: 'Official_Note_Sheet_Signed.pdf', size: 3450 },
    officerRemarks: 'Leave entitlement verified under Est. Code XII. Sufficient vacation balance available.',
    signature: dummySignature,
    targetRole: 'assistant_secretary'
  }, reviewerToken);

  if (!soRes.ok) throw new Error(`Subject Officer submission failed: ${JSON.stringify(soRes.data)}`);
  console.log(`✅ Step 3: Subject Officer signed & forwarded to Assistant Secretary (Status: ${soRes.data.status})`);

  // 5. Assistant Secretary checks, signs, and forwards to Senior Assistant Secretary
  // 5a. Hierarchy violation check: Assistant Secretary cannot select Assistant Secretary (equal rank)
  const asstSecViolation = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'forward',
    signature: dummySignature,
    targetRole: 'assistant_secretary',
    note: 'Attempting invalid forward'
  }, asstSecToken);
  if (asstSecViolation.status !== 400) {
    throw new Error(`Expected HTTP 400 for hierarchy violation, got ${asstSecViolation.status}`);
  }
  console.log(`✅ Verified Hierarchy Rule: Assistant Secretary cannot select equal or lower rank (HTTP 400: ${asstSecViolation.data.error})`);

  // 5b. Valid forward to Senior Assistant Secretary
  const asstSecRes = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'forward',
    signature: dummySignature,
    targetRole: 'senior_assistant_secretary',
    note: 'Dossier and Gen-126 verified. Recommended for senior review.'
  }, asstSecToken);
  if (!asstSecRes.ok) throw new Error(`Assistant Secretary forward failed: ${JSON.stringify(asstSecRes.data)}`);
  console.log(`✅ Step 4: Assistant Secretary signed & forwarded to Senior Assistant Secretary (Status: Pending Senior Assistant Secretary Review)`);

  // 6. Senior Assistant Secretary checks, signs, and forwards to Additional Secretary
  // 6a. Hierarchy violation check: Senior Asst Sec cannot select Assistant Secretary (lower rank)
  const seniorAsstViolation = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'forward',
    signature: dummySignature,
    targetRole: 'assistant_secretary',
    note: 'Attempting downward forward'
  }, seniorAsstSecToken);
  if (seniorAsstViolation.status !== 400) {
    throw new Error(`Expected HTTP 400 for downward forward, got ${seniorAsstViolation.status}`);
  }
  console.log(`✅ Verified Hierarchy Rule: Senior Assistant Sec cannot select lower rank (HTTP 400: ${seniorAsstViolation.data.error})`);

  // 6b. Valid forward to Additional Secretary
  const seniorAsstRes = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'forward',
    signature: dummySignature,
    targetRole: 'additional_secretary',
    note: 'Certified in order. Submitted for Additional Secretary concurrence.'
  }, seniorAsstSecToken);
  if (!seniorAsstRes.ok) throw new Error(`Senior Assistant Sec forward failed: ${JSON.stringify(seniorAsstRes.data)}`);
  console.log(`✅ Step 5: Senior Assistant Secretary signed & forwarded to Additional Secretary (Status: Pending Additional Secretary Review)`);

  // 7. Additional Secretary checks, signs, and forwards to Secretary
  // 7a. Hierarchy violation check: Additional Secretary CANNOT select Assistant Secretary or Senior Asst Sec!
  const addlViolation = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'forward',
    signature: dummySignature,
    targetRole: 'assistant_secretary',
    note: 'Attempting invalid selection'
  }, addlSecToken);
  if (addlViolation.status !== 400) {
    throw new Error(`Expected HTTP 400 for Additional Sec selecting Assistant Sec, got ${addlViolation.status}`);
  }
  console.log(`✅ Verified Critical Requirement: Additional Secretary CANNOT select Assistant Secretary! (HTTP 400: ${addlViolation.data.error})`);

  // 7b. Valid forward to Secretary (the only higher ministerial officer)
  const addlRes = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'forward',
    signature: dummySignature,
    targetRole: 'secretary',
    note: 'Division review completed. Recommended for Ministry Secretary approval.'
  }, addlSecToken);
  if (!addlRes.ok) throw new Error(`Additional Secretary forward failed: ${JSON.stringify(addlRes.data)}`);
  console.log(`✅ Step 6: Additional Secretary signed & forwarded to Secretary (Status: Pending Secretary Approval)`);

  // 8. Secretary grants final approval
  const secRes = await post(`/api/requests/${reqId}/secretariat-clearance`, {
    decision: 'approve',
    signature: dummySignature,
    note: 'Official permission granted for overseas travel under Est. Code XII. All statutory clearances confirmed.'
  }, secretaryToken);
  if (!secRes.ok) throw new Error(`Secretary approval failed: ${JSON.stringify(secRes.data)}`);
  console.log(`✅ Step 7: Ministry Secretary granted Final Executive Approval (Status: Approved)`);

  // 9. Verify the final request object and complete clearance audit trail
  const finalReqRes = await get(`/api/requests/${reqId}`, applicantToken);
  const finalReq = finalReqRes.data;
  console.log(`\n📋 Final Application Status: ${finalReq.status}`);
  console.log(`🏛️ Department Head Endorsement: My No ${finalReq.details?.departmentHeadEndorsement?.myNo} (${finalReq.details?.departmentHeadEndorsement?.recommendation})`);
  console.log(`📝 Subject Officer Leave Classification: ${finalReq.details?.officerAssessment?.total?.days} days`);
  console.log(`✍️ Total Signed Minutes in Secretariat Audit Trail: ${finalReq.details?.secretariatClearances?.length}`);

  finalReq.details?.secretariatClearances?.forEach((c, idx) => {
    console.log(`   [Minute #${idx + 1}] ${c.title} (${c.userName}) -> Decision: ${c.decision} | ${c.forwardedTo ? `Forwarded to: ${c.forwardedToTitle}` : 'Final Approval'} | Signature: ${c.signature ? '✓ Certified' : 'None'}`);
  });

  if (finalReq.status !== 'Approved' || finalReq.details?.secretariatClearances?.length !== 5) {
    throw new Error('Verification failed: Status is not Approved or clearances count != 5');
  }

  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! The hierarchical review flow works flawlessly!');
}

runTest().catch((err) => {
  console.error('\n❌ Test Failed:', err);
  process.exit(1);
});
