import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, X, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import SignaturePad from './signature-pad.jsx';

export const formText = {
  en: {
    // Stepper & Headers
    gen126Code: 'GENERAL 126 (පොදු 126)',
    gen126Title: 'Application for Leave out of Sri Lanka',
    gen126Law: 'Establishments Code - Chapter XII Section 1:4 and 22',
    app16Code: 'APPENDIX 16 (උපග්‍රන්ථ 16)',
    app16Title: 'Application for Prior Permission to Travel Abroad',
    app16Law: 'Public Officers Foreign Travel Regulations · Part 1',
    step1Tag: 'Step 1 of 2: General 126 Leave Application',
    step2Tag: 'Step 2 of 2: Appendix 16 Prior Permission',
    personalTag: 'Personal / Private Leave · General 126 Only',
    officialTag: 'Official Duty · General 126 + Appendix 16',
    step1Notice: 'Step 1: Fill out General 126 (Application for leave out of Sri Lanka). You will proceed to Appendix 16 in the next step.',
    step2Notice: 'Step 2: Complete Appendix 16 prior permission details before submitting for official approval.',
    nextStepBtn: 'Next: Appendix 16 →',
    prevStepBtn: '← Back: General 126',
    submitPersonalBtn: 'Submit General 126 Application',
    submitOfficialBtn: 'Submit Official Travel Application',

    // Section Titles
    officerSection: '1. Officer & Service Particulars',
    leaveSection: '2. Period of Leave & Travel Destination',
    fundingSection: '3. Ticket & Foreign Maintenance Costs',
    contactSection: '4. Address & Contact While on Leave',
    
    // Appendix 16 Sections
    identificationSection: '1. Officer Identification & Ministry',
    actingArrangementsSection: '2. Duty Covering / Acting Arrangements',
    officialTravelDetailsSection: '3. Official Travel, Training & Awarding Agency',
    officialExpensesSection: '4. Expense Breakdown & Funding Source',
    travelHistorySection: '5. Foreign Travel in Current Year and Preceding 3 Years',
    supportingSection: '6. Supporting Documents Checklist',

    // Fields
    department: 'Department / Institution',
    fullName: 'Name in Full',
    designation: 'Post / Designation',
    service: 'Service to which officer belongs (e.g., SLAS, SLEAS, Engineering)',
    grade: 'Class / Grade',
    ministry: 'Ministry / Provincial Council',
    firstAppointment: 'Date of first appointment',
    lastForeignReturn: 'Date of last return to Sri Lanka if foreign leave was taken earlier',
    departure: 'Commencement date of leave (Departure)',
    returnDate: 'Completion date of leave (Return)',
    daysApplied: 'Period of leave applied (Total calendar days)',
    purpose: 'Reasons for leave / Purpose of travel',
    destination: 'Country / City to be visited',
    leaveCategory: 'Nature / Category of leave requested',
    leaveBalance: 'Available leave balance before this application',

    // Ticket & Maintenance
    prepaidTicket: 'Is travel on a pre-paid ticket? (8.a)',
    ticketSenderRelationship: 'Relationship of the person sending pre-paid ticket (8.b)',
    maintenanceFunding: 'How is the cost of maintenance abroad met? (9.a)',
    maintenancePayerRelationship: 'Relationship of person meeting such expenditure (9.b)',
    airfareFunding: 'Air ticket funding source / entity',

    // Address
    abroadAddress: 'Full residential address during leave abroad (10)',
    abroadPhone: 'Telephone number while abroad',
    abroadEmail: 'Email address while abroad',

    // Appendix 16 Fields
    nic: 'National Identity Card (NIC) number (2.1)',
    dateOfBirth: 'Date of birth (2)',
    dutyCoverName: 'Name of officer covering duties during absence (4)',
    dutyCoverDesignation: 'Post / Designation of covering officer (4)',
    trainingField: 'Purpose of travel / Field of training (5.1)',
    visitInstitution: 'Awarding Agency / Host Institution (5.3)',
    fundingSourceType: 'How expenses are mainly to be met (5.4)',
    fundingOptions: [
      'Through Dept. of External Resources',
      'Through a Project',
      'Direct award',
      'Private funds',
      'Government of Sri Lanka (GOSL)',
    ],
    goslAirfare: 'GOSL Air Travel',
    goslSubsistence: 'GOSL Subsistence',
    goslCourseFees: 'GOSL Course / Registration fees',
    goslAdditional: 'GOSL Additional / other expenses',
    foreignLoanProjectDetails: 'In case of Foreign loan/project, particulars thereof (5.6)',
    courseStartDate: 'Date of commencement of course / training (5.7)',
    courseEndDate: 'Date of completion of course / training (5.8)',
    prevTripReportSubmitted: 'Has the report on the previous Official trip been submitted? (5.12)',
    prevReportOptions: ['Yes', 'No', 'First official trip / Not applicable'],

    // Travel History Table
    thYear: 'Year',
    thPurpose: 'Purpose of travel',
    thPeriod: 'Period / Duration',
    thCountry: 'Country',
    addHistoryRow: '+ Add Foreign Travel Record',
    removeRow: 'Remove',
    noTravelHistory: 'No previous foreign travel recorded for current and preceding 3 years.',

    // Documents
    documentsHint: 'Check all relevant documents attached to this application:',
    invitationDocument: 'Official letter of invitation / training programme',
    itineraryDocument: 'Travel itinerary / confirmed flight reservations',
    fundingDocument: 'Proof of funding, scholarship award or sponsorship letter',
    passportDocument: 'Copy of passport bio-data page',
    leaveRecordDocument: 'Official leave balance statement',

    // Declaration & Signature
    declaration: 'I certify that the particulars furnished in this application are true and correct.',
    signature: 'Applicant Signature',
    signatureHint: 'Sign in the designated signature box below using your mouse or finger.',
    clear: 'Clear signature',
    yes: 'Yes',
    no: 'No',

    // Errors & Validations
    step1Incomplete: 'Please complete all required fields in General 126 before proceeding to Appendix 16.',
    step2Incomplete: 'Please complete all required fields in Appendix 16, check the declaration, and add your signature.',
    personalIncomplete: 'Please complete all required fields in General 126, check the declaration, and add your signature.',
    dateError: 'Completion / return date must be on or after the commencement / departure date.',
    leaveOptions: [
      'Annual / vacation leave',
      'Half-pay leave',
      'Commuted half-pay leave',
      'No-pay leave',
      'Official duty',
    ],
  },
  si: {
    // Stepper & Headers
    gen126Code: 'සාමාන්‍ය 126 (GENERAL 126)',
    gen126Title: 'ශ්‍රී ලංකාවෙන් බැහැර ගත කිරීම සඳහා නිවාඩු ඉල්ලීම',
    gen126Law: 'ආයතන සංග්‍රහය - පරිච්ඡේදය XII 1:4 හා 22 වගන්ති',
    app16Code: 'උපග්‍රන්ථ 16 (APPENDIX 16)',
    app16Title: 'රාජ්‍ය නිලධාරීන් විදේශගතවීම සඳහා පූර්ව අවසර ලබාගැනීමේ අයදුම්පත්‍රය',
    app16Law: 'රාජ්‍ය නිලධාරීන්ගේ විදේශ සංචාර පිළිබඳ රෙගුලාසි · 1 වන කොටස',
    step1Tag: 'පියවර 1 / 2: සාමාන්‍ය 126 නිවාඩු අයදුම්පත',
    step2Tag: 'පියවර 2 / 2: උපග්‍රන්ථ 16 පූර්ව අවසර අයදුම්පත',
    personalTag: 'පෞද්ගලික නිවාඩු · සාමාන්‍ය 126 පමණි',
    officialTag: 'නිල රාජකාරි · සාමාන්‍ය 126 + උපග්‍රන්ථ 16',
    step1Notice: 'පියවර 1: සාමාන්‍ය 126 (Gen-126) නිවාඩු ඉල්ලුම්පත මුලින් සම්පූර්ණ කරන්න. ඉන්පසු උපග්‍රන්ථ 16 වෙත යොමු කෙරේ.',
    step2Notice: 'පියවර 2: උපග්‍රන්ථ 16 (Appendix 16) පූර්ව අවසර විස්තර සම්පූර්ණ කර අවසන් අනුමැතිය සඳහා ඉදිරිපත් කරන්න.',
    nextStepBtn: 'මීළඟ: උපග්‍රන්ථ 16 වෙත →',
    prevStepBtn: '← ආපසු: සාමාන්‍ය 126',
    submitPersonalBtn: 'සාමාන්‍ය 126 අයදුම්පත ඉදිරිපත් කරන්න',
    submitOfficialBtn: 'නිල සංචාරක අයදුම්පත ඉදිරිපත් කරන්න',

    // Section Titles
    officerSection: '1. නිලධාරි සහ සේවා විස්තර',
    leaveSection: '2. ඉල්ලා සිටින නිවාඩු කාලය සහ ගමනාන්තය',
    fundingSection: '3. ගුවන් ටිකට්පත් සහ විදේශ නඩත්තු වියදම්',
    contactSection: '4. නිවාඩු කාලයේ ලිපිනය සහ දුරකථන',

    // Appendix 16 Sections
    identificationSection: '1. නිලධාරියා හඳුනාගැනීම සහ අමාත්‍යාංශය',
    actingArrangementsSection: '2. වැඩ බැලීමේ විධිවිධාන (රාජකාරි ආවරණය)',
    officialTravelDetailsSection: '3. නිල සංචාරයේ අරමුණ, පුහුණුව සහ ආයතනය',
    officialExpensesSection: '4. සංචාරක වියදම් සහ මූල්‍ය ප්‍රතිපාදන විස්තර',
    travelHistorySection: '5. වත්මන් වර්ෂය සහ පෙර වසර 3 තුළ විදේශ සංචාර විස්තර',
    supportingSection: '6. අමුණා ඇති උපකාරක ලේඛන පිරික්සුම් ලැයිස්තුව',

    // Fields
    department: 'දෙපාර්තමේන්තුව / ආයතනය',
    fullName: 'සම්පූර්ණ නම',
    designation: 'තනතුර',
    service: 'අයත් සේවය (උදා: ශ්‍රී.ලං.ප.සේ. / ඉංජිනේරු සේවය / විද්‍යාත්මක සේවය)',
    grade: 'පන්තිය / ශ්‍රේණිය',
    ministry: 'අමාත්‍යාංශය / පළාත් සභාව',
    firstAppointment: 'මුලින්ම පත් වූ දිනය',
    lastForeignReturn: 'මීට පෙර නිවාඩු ගත්තේ නම් පසු ගිය වර ශ්‍රී ලංකාවට ආපසු පැමිණි දිනය',
    departure: 'නිවාඩු පටන් ගන්නා දිනය (පිටත්වීම)',
    returnDate: 'නිවාඩු අවසන් වන දිනය (පැමිණීම)',
    daysApplied: 'ඉල්ලා සිටින සම්පූර්ණ නිවාඩු දින ගණන',
    purpose: 'නිවාඩු ඉල්ලීමට හේතුව / අරමුණ',
    destination: 'සංචාරය කරන රට / නගරය',
    leaveCategory: 'ඉල්ලා සිටින නිවාඩු වර්ගය',
    leaveBalance: 'මෙම අයදුම්පතට පෙර ඇති ඉතිරි නිවාඩු ශේෂය',

    // Ticket & Maintenance
    prepaidTicket: 'ගමන් කරන්නේ කලින් මුදල් ගෙවූ ටිකට්පතකින්ද? (8.අ)',
    ticketSenderRelationship: 'එම එවූ පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය (8.ආ)',
    maintenanceFunding: 'පිටරට තමාගේ නඩත්තු වියදම් දරන්නේ කෙසේද? (9.අ)',
    maintenancePayerRelationship: 'එම වියදම් දරන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය (9.ආ)',
    airfareFunding: 'ගුවන් ටිකට්පත් වියදම් මූලාශ්‍රය / ආයතනය',

    // Address
    abroadAddress: 'විදේශ නිවාඩු කාලයේදී ඉල්ලුම්කරුගේ සම්පූර්ණ ලිපිනය (10)',
    abroadPhone: 'විදේශයේදී සම්බන්ධ කරගත හැකි දුරකථන අංකය',
    abroadEmail: 'විදේශයේදී ඊමේල් ලිපිනය',

    // Appendix 16 Fields
    nic: 'ජාතික හැඳුනුම්පත් (NIC) අංකය (2.1)',
    dateOfBirth: 'උපන් දිනය (2)',
    dutyCoverName: 'රාජකාරි ආවරණය කරන නිලධාරියාගේ නම (4)',
    dutyCoverDesignation: 'වැඩ බලන නිලධාරියාගේ තනතුර (4)',
    trainingField: 'පුහුණු ක්ෂේත්‍රය / නිල පැවරුම (5.1)',
    visitInstitution: 'ආරාධනා කළ ආයතනය / ප්‍රදානය කළ ආයතනය (5.3)',
    fundingSourceType: 'ප්‍රධාන වශයෙන් වියදම් පියවාගන්නේ කෙසේද? (5.4)',
    fundingOptions: [
      'විදේශ සම්පත් දෙපාර්තමේන්තුව හරහා',
      'ව්‍යාපෘතියක් හරහා',
      'සෘජු ප්‍රදානයක් මඟින්',
      'පෞද්ගලික අරමුදල්',
      'ශ්‍රී ලංකා රජය (GOSL)',
    ],
    goslAirfare: 'ශ්‍රී ලංකා රජයේ ගුවන් ගමන් ගාස්තු',
    goslSubsistence: 'නවාතැන් හා නඩත්තු දීමනා (Subsistence)',
    goslCourseFees: 'පාඨමාලා / ලියාපදිංචි ගාස්තු',
    goslAdditional: 'අතිරේක වියදම්',
    foreignLoanProjectDetails: 'විදේශ ණය / ව්‍යාපෘතියක් නම් ඒ පිළිබඳ විස්තර (5.6)',
    courseStartDate: 'පුහුණුව / වැඩසටහන ආරම්භ වන දිනය (5.7)',
    courseEndDate: 'පුහුණුව / වැඩසටහන අවසන් වන දිනය (5.8)',
    prevTripReportSubmitted: 'පෙර නිල සංචාරයේ වාර්තාව ඉදිරිපත් කර තිබේද? (5.12)',
    prevReportOptions: ['ඔව්', 'නැත', 'පළමු නිල සංචාරය / අදාළ නොවේ'],

    // Travel History Table
    thYear: 'වර්ෂය',
    thPurpose: 'සංචාරයේ අරමුණ',
    thPeriod: 'කාලසීමාව',
    thCountry: 'රට',
    addHistoryRow: '+ සංචාරක වාර්තාවක් එක් කරන්න',
    removeRow: 'ඉවත් කරන්න',
    noTravelHistory: 'වත්මන් වර්ෂය සහ පසුගිය වසර 3 තුළ විදේශ සංචාර නොමැත.',

    // Documents
    documentsHint: 'මෙම අයදුම්පත සමඟ ඉදිරිපත් කරන ලේඛන තෝරන්න:',
    invitationDocument: 'නිල ආරාධනා ලිපිය / පුහුණු වැඩසටහන් විස්තරය',
    itineraryDocument: 'ගුවන් ගමන් කාලසටහන / තහවුරු කළ ටිකට්පත් තොරතුරු',
    fundingDocument: 'ශිෂ්‍යත්ව ප්‍රදාන ලිපිය හෝ අනුග්‍රාහක සාක්ෂි',
    passportDocument: 'ගමන් බලපත්‍රයේ විස්තර පිටුවේ ඡායා පිටපත',
    leaveRecordDocument: 'නිල නිවාඩු ශේෂ ප්‍රකාශය',

    // Declaration & Signature
    declaration: 'මෙම අයදුම්පතේ මා විසින් සපයා ඇති සියලුම තොරතුරු සත්‍ය හා නිවැරදි බවට සහතික වෙමි.',
    signature: 'ඉල්ලුම්කරුගේ අත්සන (Signature of Applicant)',
    signatureHint: 'මූසිකය (mouse) හෝ ස්පර්ශය මඟින් පහත කොටුවේ අත්සන් තබන්න.',
    clear: 'අත්සන මකන්න',
    yes: 'ඔව්',
    no: 'නැත',

    // Errors & Validations
    step1Incomplete: 'කරුණාකර උපග්‍රන්ථ 16 වෙත යාමට පෙර සාමාන්‍ය 126 හි අනිවාර්ය තොරතුරු සියල්ල පුරවන්න.',
    step2Incomplete: 'කරුණාකර උපග්‍රන්ථ 16 හි අනිවාර්ය තොරතුරු සම්පූර්ණ කර, ප්‍රකාශය තහවුරු කර අත්සන් කරන්න.',
    personalIncomplete: 'කරුණාකර සාමාන්‍ය 126 හි අනිවාර්ය තොරතුරු සියල්ල පුරවා, ප්‍රකාශය තහවුරු කර අත්සන් කරන්න.',
    dateError: 'නිවාඩු අවසන් වන දිනය ආරම්භක දිනයට පසුව හෝ එදිනම විය යුතුය.',
    leaveOptions: [
      'වාර්ෂික / විවේක නිවාඩු',
      'අර්ධ වැටුප් නිවාඩු',
      'පරිවර්තනය කළ අර්ධ වැටුප් නිවාඩු',
      'වැටුප් රහිත නිවාඩු',
      'නිල රාජකාරි',
    ],
  },
};

const initialDetails = {
  fullName: '',
  department: '',
  designation: '',
  service: '',
  grade: '',
  firstAppointmentDate: '',
  lastForeignReturnDate: '',
  destination: '',
  purpose: '',
  startDate: '',
  endDate: '',
  leaveCategory: '',
  leaveBalance: '',
  prepaidTicket: 'No',
  ticketSenderRelationship: '',
  airfareFunding: '',
  maintenanceFunding: '',
  maintenancePayerRelationship: '',
  abroadAddress: '',
  abroadPhone: '',
  abroadEmail: '',

  // Appendix 16 fields
  nic: '',
  dateOfBirth: '',
  ministry: '',
  dutyCoverName: '',
  dutyCoverDesignation: '',
  trainingField: '',
  visitInstitution: '',
  fundingSource: '',
  goslAirfare: '',
  goslSubsistence: '',
  goslCourseFees: '',
  goslAdditional: '',
  foreignLoanProjectDetails: '',
  courseStartDate: '',
  courseEndDate: '',
  prevTripReportSubmitted: 'Yes',
  travelHistory: [],
  supportingDocuments: [],
};

export default function RequestModal({
  t,
  language,
  user,
  token,
  onClose,
  onSubmitted,
  initialLeaveType = 'official',
}) {
  const isOfficial = initialLeaveType === 'official';
  const defaultCategory = isOfficial ? 'Official duty' : 'Annual / vacation leave';
  const labels = formText[language];

  // For official: Step 1 (Gen-126) -> Step 2 (Appendix 16). For personal: Step 1 (Gen-126 only).
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    ...initialDetails,
    fullName: user?.name || '',
    leaveCategory: defaultCategory,
    airfareFunding: isOfficial
      ? (language === 'si' ? 'ශ්‍රී ලංකා රජය / නිල අනුග්‍රහය' : 'Government of Sri Lanka (GOSL)')
      : (language === 'si' ? 'පෞද්ගලික වියදමින්' : 'Self-funded'),
    maintenanceFunding: isOfficial
      ? (language === 'si' ? 'නිල දීමනා / ආයතනික අනුග්‍රහය' : 'Official subsistence / Sponsoring agency')
      : (language === 'si' ? 'පෞද්ගලික ඉතුරුම් වලින්' : 'Personal savings'),
    fundingSource: isOfficial ? 'Government of Sri Lanka (GOSL)' : 'Private funds',
  });

  const [signature, setSignature] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const daysApplied = form.startDate && form.endDate
    ? Math.max(0, Math.floor((new Date(`${form.endDate}T12:00:00`) - new Date(`${form.startDate}T12:00:00`)) / 86400000) + 1)
    : '';

  function update(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function toggleDocument(document) {
    const documents = form.supportingDocuments.includes(document)
      ? form.supportingDocuments.filter((item) => item !== document)
      : [...form.supportingDocuments, document];
    update('supportingDocuments', documents);
  }

  function addTravelHistoryRow() {
    update('travelHistory', [
      ...form.travelHistory,
      { year: '', purpose: '', period: '', country: '' },
    ]);
  }

  function updateTravelHistory(index, field, value) {
    const updated = [...form.travelHistory];
    updated[index] = { ...updated[index], [field]: value };
    update('travelHistory', updated);
  }

  function removeTravelHistory(index) {
    update('travelHistory', form.travelHistory.filter((_, i) => i !== index));
  }

  // Validation for Step 1 (General 126)
  function validateStep1() {
    setError('');
    if (!form.fullName?.trim() ||
        !form.department?.trim() ||
        !form.designation?.trim() ||
        !form.service?.trim() ||
        !form.firstAppointmentDate ||
        !form.destination?.trim() ||
        !form.purpose?.trim() ||
        !form.startDate ||
        !form.endDate ||
        !form.leaveCategory?.trim() ||
        !form.leaveBalance?.trim() ||
        !form.abroadAddress?.trim() ||
        !form.abroadPhone?.trim() ||
        !form.airfareFunding?.trim() ||
        !form.maintenanceFunding?.trim()) {
      setError(labels.step1Incomplete);
      return false;
    }
    if (form.endDate < form.startDate) {
      setError(labels.dateError);
      return false;
    }
    return true;
  }

  function goToStep2() {
    if (validateStep1()) {
      setError('');
      setStep(2);
      const modalBody = document.querySelector('.detailed-form-body');
      if (modalBody) modalBody.scrollTop = 0;
    }
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    // If personal leave: validate General 126 + Declaration + Signature
    if (!isOfficial) {
      if (!validateStep1()) {
        setBusy(false);
        return;
      }
      if (!declaration || !signature) {
        setError(labels.personalIncomplete);
        setBusy(false);
        return;
      }
    } else {
      // If official leave: must be on Step 2, validate Appendix 16 + Declaration + Signature
      if (!form.nic?.trim() ||
          !form.dateOfBirth ||
          !form.ministry?.trim() ||
          !form.dutyCoverName?.trim() ||
          !form.dutyCoverDesignation?.trim()) {
        setError(labels.step2Incomplete);
        setBusy(false);
        return;
      }
      if (!declaration || !signature) {
        setError(labels.step2Incomplete);
        setBusy(false);
        return;
      }
    }

    const leaveType = isOfficial ? 'Official duty' : 'Private leave';
    const details = {
      ...form,
      fullName: form.fullName?.trim() || user.name,
      daysApplied,
      declarationConfirmed: declaration,
      leaveType,
    };

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination: form.destination,
          purpose: form.purpose,
          startDate: form.startDate,
          endDate: form.endDate,
          leaveType,
          signature,
          details,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit this application.');
      onSubmitted();
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="request-modal detailed-request-modal">
        {/* MODAL HEADER */}
        <header className="modal-header">
          <div>
            <div className="eyebrow">
              {isOfficial
                ? (step === 1 ? labels.step1Tag : labels.step2Tag)
                : labels.personalTag}
            </div>
            <h2>
              {isOfficial
                ? (step === 1 ? labels.gen126Title : labels.app16Title)
                : labels.gen126Title}
            </h2>
            <div className={`modal-leave-tag ${isOfficial ? 'official' : 'personal'}`}>
              {isOfficial ? (
                <>🏛️ {language === 'si' ? 'නිල රාජකාරි සංචාරය · General 126 + Appendix 16' : 'Official Duty · General 126 + Appendix 16'}</>
              ) : (
                <>✈️ {language === 'si' ? 'පෞද්ගලික නිවාඩු · General 126 පමණි' : 'Personal Leave · General 126 Only'}</>
              )}
            </div>
            <p style={{ marginTop: '8px' }}>
              {isOfficial
                ? (step === 1 ? labels.step1Notice : labels.step2Notice)
                : labels.gen126Law}
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label={t.close}>
            <X size={19} />
          </button>
        </header>

        {/* STEP WIZARD BAR (ONLY SHOWN FOR OFFICIAL LEAVE) */}
        {isOfficial && (
          <div className="form-step-wizard">
            <button
              type="button"
              className={`wizard-step ${step === 1 ? 'active' : 'completed'}`}
              onClick={() => setStep(1)}
            >
              <span className="wizard-step-num">{step > 1 ? '✓' : '1'}</span>
              <span>1. General 126 (සාමාන්‍ය 126)</span>
            </button>
            <button
              type="button"
              className={`wizard-step ${step === 2 ? 'active' : ''}`}
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
            >
              <span className="wizard-step-num">2</span>
              <span>2. Appendix 16 (උපග්‍රන්ථ 16)</span>
            </button>
          </div>
        )}

        <form onSubmit={submit}>
          <div className="detailed-form-body">
            {/* ========================================================================= */}
            {/* FLOW 1: GENERAL 126 (SHOWN FOR PERSONAL, OR FOR OFFICIAL STEP 1)          */}
            {/* ========================================================================= */}
            {(!isOfficial || (isOfficial && step === 1)) && (
              <>
                {isOfficial && (
                  <div className="step-indicator-banner">
                    <FileText size={16} />
                    <span>{labels.step1Notice}</span>
                  </div>
                )}

                {/* 1. OFFICER & SERVICE PARTICULARS */}
                <FormSection
                  title={labels.officerSection}
                  number="126"
                  subtitle="දෙපාර්තමේන්තුව, නිලය හා සේවා විස්තර"
                >
                  <InputField
                    name="department"
                    label={`${labels.department} *`}
                    value={form.department}
                    update={update}
                    placeholder="e.g., Department of Management Services"
                    required
                  />
                  <InputField
                    name="fullName"
                    label={`${labels.fullName} *`}
                    value={form.fullName}
                    update={update}
                    placeholder="e.g., Kankanamge Nimal Perera"
                    required
                  />
                  <InputField
                    name="designation"
                    label={`${labels.designation} *`}
                    value={form.designation}
                    update={update}
                    placeholder="e.g., Assistant Director"
                    required
                  />
                  <InputField
                    name="service"
                    label={`${labels.service} *`}
                    value={form.service}
                    update={update}
                    placeholder="e.g., Sri Lanka Administrative Service (SLAS)"
                    required
                  />
                  <InputField
                    name="grade"
                    label={labels.grade}
                    value={form.grade}
                    update={update}
                    placeholder="e.g., Class I / Grade II"
                  />
                  <InputField
                    name="firstAppointmentDate"
                    label={`${labels.firstAppointment} *`}
                    value={form.firstAppointmentDate}
                    update={update}
                    type="date"
                    required
                  />
                  <InputField
                    name="lastForeignReturnDate"
                    label={labels.lastForeignReturn}
                    value={form.lastForeignReturnDate}
                    update={update}
                    type="date"
                  />
                </FormSection>

                {/* 2. LEAVE PERIOD & DESTINATION */}
                <FormSection
                  title={labels.leaveSection}
                  number="126"
                  subtitle="නිවාඩු කාලය, හේතු සහ ගමනාන්තය"
                >
                  <InputField
                    name="destination"
                    label={`${labels.destination} *`}
                    value={form.destination}
                    update={update}
                    placeholder="e.g., Melbourne, Australia"
                    required
                  />
                  <TextAreaField
                    name="purpose"
                    label={`${labels.purpose} *`}
                    value={form.purpose}
                    update={update}
                    placeholder={isOfficial ? "Official meetings, bilateral workshop..." : "Annual family vacation, private travel..."}
                    required
                  />
                  <InputField
                    name="startDate"
                    label={`${labels.departure} *`}
                    value={form.startDate}
                    update={update}
                    type="date"
                    required
                  />
                  <InputField
                    name="endDate"
                    label={`${labels.returnDate} *`}
                    value={form.endDate}
                    update={update}
                    type="date"
                    min={form.startDate}
                    required
                  />
                  <ReadOnlyField
                    label={labels.daysApplied}
                    value={daysApplied ? `${daysApplied} Days / දින` : '—'}
                  />
                  <SelectField
                    name="leaveCategory"
                    label={`${labels.leaveCategory} *`}
                    value={form.leaveCategory}
                    update={update}
                    placeholder={labels.leaveCategory}
                    options={labels.leaveOptions}
                  />
                  <InputField
                    name="leaveBalance"
                    label={`${labels.leaveBalance} *`}
                    value={form.leaveBalance}
                    update={update}
                    placeholder="e.g., 28 Days available"
                    required
                  />
                </FormSection>

                {/* 3. TICKET & MAINTENANCE ABROAD */}
                <FormSection
                  title={labels.fundingSection}
                  number="126"
                  subtitle="ගමන් වියදම් සහ විදේශ නඩත්තු ප්‍රතිපාදන"
                >
                  <InputField
                    name="airfareFunding"
                    label={`${labels.airfareFunding} *`}
                    value={form.airfareFunding}
                    update={update}
                    placeholder={isOfficial ? "GOSL vote / Sponsoring Agency" : "Self-paid / Private funds"}
                    required
                  />

                  {/* 8.a & 8.b Pre-paid ticket */}
                  <div className="field-label span-2">
                    <span>{labels.prepaidTicket}</span>
                    <div className="form-options-row">
                      <label className={`option-pill-label ${form.prepaidTicket === 'No' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="prepaidTicket"
                          value="No"
                          checked={form.prepaidTicket === 'No'}
                          onChange={() => update('prepaidTicket', 'No')}
                        />
                        <span>{labels.no} (නැත)</span>
                      </label>
                      <label className={`option-pill-label ${form.prepaidTicket === 'Yes' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="prepaidTicket"
                          value="Yes"
                          checked={form.prepaidTicket === 'Yes'}
                          onChange={() => update('prepaidTicket', 'Yes')}
                        />
                        <span>{labels.yes} (ඔව්)</span>
                      </label>
                    </div>
                  </div>

                  {form.prepaidTicket === 'Yes' && (
                    <InputField
                      name="ticketSenderRelationship"
                      label={labels.ticketSenderRelationship}
                      value={form.ticketSenderRelationship}
                      update={update}
                      placeholder="e.g., Brother / Sponsoring organization"
                    />
                  )}

                  {/* 9.a & 9.b Cost of maintenance abroad */}
                  <InputField
                    name="maintenanceFunding"
                    label={`${labels.maintenanceFunding} *`}
                    value={form.maintenanceFunding}
                    update={update}
                    placeholder={isOfficial ? "Daily subsistence allowance (DSA)" : "Personal savings / Family support"}
                    required
                  />
                  <InputField
                    name="maintenancePayerRelationship"
                    label={labels.maintenancePayerRelationship}
                    value={form.maintenancePayerRelationship}
                    update={update}
                    placeholder="e.g., Self / Host organization"
                  />
                </FormSection>

                {/* 4. ADDRESS WHILE ON LEAVE */}
                <FormSection
                  title={labels.contactSection}
                  number="126"
                  subtitle="විදේශයේ රැඳී සිටින ලිපිනය සහ දුරකථන"
                >
                  <InputField
                    name="abroadAddress"
                    label={`${labels.abroadAddress} *`}
                    value={form.abroadAddress}
                    update={update}
                    placeholder="Full residential / hotel address abroad"
                    required
                  />
                  <InputField
                    name="abroadPhone"
                    label={`${labels.abroadPhone} *`}
                    value={form.abroadPhone}
                    update={update}
                    type="tel"
                    placeholder="+94... or +1..."
                    required
                  />
                  <InputField
                    name="abroadEmail"
                    label={labels.abroadEmail}
                    value={form.abroadEmail}
                    update={update}
                    type="email"
                    placeholder="personal@email.com"
                  />
                </FormSection>

                {/* IF PERSONAL: DECLARATION & SIGNATURE SHOWN RIGHT HERE */}
                {!isOfficial && (
                  <>
                    <label className="declaration-field">
                      <input
                        type="checkbox"
                        checked={declaration}
                        onChange={(event) => setDeclaration(event.target.checked)}
                      />
                      <span>{labels.declaration} *</span>
                    </label>

                    <div className="signature-field detailed-signature">
                      <div className="signature-title">
                        <span>{labels.signature} *</span>
                        <small>{labels.signatureHint}</small>
                        <button type="button" onClick={() => window.clearSignature?.()}>
                          {labels.clear}
                        </button>
                      </div>
                      <SignaturePad onChange={setSignature} />
                    </div>
                  </>
                )}
              </>
            )}

            {/* ========================================================================= */}
            {/* FLOW 2: APPENDIX 16 (SHOWN ONLY FOR OFFICIAL DUTY WHEN STEP === 2)        */}
            {/* ========================================================================= */}
            {isOfficial && step === 2 && (
              <>
                <div className="step-indicator-banner">
                  <CheckCircle2 size={16} />
                  <span>{labels.step2Notice}</span>
                </div>

                {/* 1. OFFICER IDENTIFICATION & MINISTRY */}
                <FormSection
                  title={labels.identificationSection}
                  number="16"
                  subtitle="අයදුම්කරු හඳුනාගැනීම සහ අමාත්‍යාංශය (Part 1.1 - 3.2)"
                >
                  <InputField
                    name="fullName"
                    label={`${labels.fullName} *`}
                    value={form.fullName}
                    update={update}
                    placeholder="e.g., Kankanamge Nimal Perera"
                    required
                  />
                  <ReadOnlyField label={labels.designation} value={form.designation || '—'} />
                  <ReadOnlyField label={labels.service} value={form.service || '—'} />
                  <ReadOnlyField label={labels.department} value={form.department || '—'} />
                  <InputField
                    name="nic"
                    label={`${labels.nic} *`}
                    value={form.nic}
                    update={update}
                    placeholder="e.g., 198512345678 or 851234567V"
                    required
                  />
                  <InputField
                    name="dateOfBirth"
                    label={`${labels.dateOfBirth} *`}
                    value={form.dateOfBirth}
                    update={update}
                    type="date"
                    required
                  />
                  <InputField
                    name="ministry"
                    label={`${labels.ministry} *`}
                    value={form.ministry}
                    update={update}
                    placeholder="e.g., Ministry of Public Administration"
                    required
                  />
                </FormSection>

                {/* 2. DUTY COVERING ARRANGEMENTS */}
                <FormSection
                  title={labels.actingArrangementsSection}
                  number="16"
                  subtitle="වැඩ බැලීමේ විධිවිධාන (Appendix 16 Section 4)"
                >
                  <InputField
                    name="dutyCoverName"
                    label={`${labels.dutyCoverName} *`}
                    value={form.dutyCoverName}
                    update={update}
                    placeholder="e.g., Mr. K. A. Jayasinghe"
                    required
                  />
                  <InputField
                    name="dutyCoverDesignation"
                    label={`${labels.dutyCoverDesignation} *`}
                    value={form.dutyCoverDesignation}
                    update={update}
                    placeholder="e.g., Senior Assistant Secretary"
                    required
                  />
                </FormSection>

                {/* 3. OFFICIAL TRAVEL, TRAINING & AWARDING AGENCY */}
                <FormSection
                  title={labels.officialTravelDetailsSection}
                  number="16"
                  subtitle="නිල අරමුණ, පුහුණුව සහ ආරාධිත ආයතනය (5.1 - 5.3)"
                >
                  <InputField
                    name="trainingField"
                    label={labels.trainingField}
                    value={form.trainingField || form.purpose}
                    update={update}
                    placeholder="e.g., Public Sector Digital Transformation Programme"
                  />
                  <InputField
                    name="visitInstitution"
                    label={labels.visitInstitution}
                    value={form.visitInstitution}
                    update={update}
                    placeholder="e.g., JICA / Asian Development Bank / UN-ESCAP"
                  />
                  <InputField
                    name="courseStartDate"
                    label={labels.courseStartDate}
                    value={form.courseStartDate}
                    update={update}
                    type="date"
                  />
                  <InputField
                    name="courseEndDate"
                    label={labels.courseEndDate}
                    value={form.courseEndDate}
                    update={update}
                    type="date"
                    min={form.courseStartDate}
                  />

                  {/* 5.12 Has previous trip report been submitted? */}
                  <div className="field-label span-2">
                    <span>{labels.prevTripReportSubmitted}</span>
                    <div className="form-options-row">
                      {labels.prevReportOptions.map((opt, idx) => {
                        const val = ['Yes', 'No', 'N/A'][idx];
                        return (
                          <label
                            key={opt}
                            className={`option-pill-label ${form.prevTripReportSubmitted === val ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="prevTripReportSubmitted"
                              value={val}
                              checked={form.prevTripReportSubmitted === val}
                              onChange={() => update('prevTripReportSubmitted', val)}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </FormSection>

                {/* 4. EXPENSE BREAKDOWN & FUNDING */}
                <FormSection
                  title={labels.officialExpensesSection}
                  number="16"
                  subtitle="වියදම් පියවාගැනීම සහ ශ්‍රී ලංකා රජයේ ප්‍රතිපාදන (5.4 - 5.6)"
                >
                  <div className="field-label span-2">
                    <span>{labels.fundingSourceType}</span>
                    <div className="form-options-row">
                      {labels.fundingOptions.map((opt, idx) => {
                        const val = [
                          'Dept. of External Resources',
                          'Through a Project',
                          'Direct award',
                          'Private funds',
                          'Government of Sri Lanka (GOSL)',
                        ][idx];
                        return (
                          <label
                            key={opt}
                            className={`option-pill-label ${form.fundingSource === val ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="fundingSource"
                              value={val}
                              checked={form.fundingSource === val}
                              onChange={() => update('fundingSource', val)}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {form.fundingSource === 'Government of Sri Lanka (GOSL)' && (
                    <>
                      <InputField
                        name="goslAirfare"
                        label={labels.goslAirfare}
                        value={form.goslAirfare}
                        update={update}
                        placeholder="LKR Amount or Vote"
                      />
                      <InputField
                        name="goslSubsistence"
                        label={labels.goslSubsistence}
                        value={form.goslSubsistence}
                        update={update}
                        placeholder="Daily Allowance Amount"
                      />
                      <InputField
                        name="goslCourseFees"
                        label={labels.goslCourseFees}
                        value={form.goslCourseFees}
                        update={update}
                        placeholder="Registration / tuition"
                      />
                      <InputField
                        name="goslAdditional"
                        label={labels.goslAdditional}
                        value={form.goslAdditional}
                        update={update}
                        placeholder="Incidental expenses"
                      />
                    </>
                  )}

                  <InputField
                    name="foreignLoanProjectDetails"
                    label={labels.foreignLoanProjectDetails}
                    value={form.foreignLoanProjectDetails}
                    update={update}
                    placeholder="Loan / Project agreement reference if applicable"
                  />
                </FormSection>

                {/* 5. FOREIGN TRAVEL IN PRECEDING 3 YEARS */}
                <FormSection
                  title={labels.travelHistorySection}
                  number="16"
                  subtitle="වත්මන් වර්ෂය සහ පෙර වසර 3 තුළ විදේශ සංචාර (Appendix 16 Section 6)"
                >
                  <div className="history-table-container span-2">
                    {form.travelHistory.length === 0 ? (
                      <p style={{ margin: '6px 0', fontSize: '11px', color: '#64748b' }}>
                        {labels.noTravelHistory}
                      </p>
                    ) : (
                      <table className="history-table">
                        <thead>
                          <tr>
                            <th style={{ width: '80px' }}>{labels.thYear}</th>
                            <th>{labels.thPurpose}</th>
                            <th style={{ width: '130px' }}>{labels.thPeriod}</th>
                            <th style={{ width: '130px' }}>{labels.thCountry}</th>
                            <th style={{ width: '40px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {form.travelHistory.map((row, idx) => (
                            <tr key={idx}>
                              <td>
                                <input
                                  type="text"
                                  placeholder="2025"
                                  value={row.year}
                                  onChange={(e) => updateTravelHistory(idx, 'year', e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="Conference / Official meeting"
                                  value={row.purpose}
                                  onChange={(e) => updateTravelHistory(idx, 'purpose', e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="5 Days"
                                  value={row.period}
                                  onChange={(e) => updateTravelHistory(idx, 'period', e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="India / UK"
                                  value={row.country}
                                  onChange={(e) => updateTravelHistory(idx, 'country', e.target.value)}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn-mini-remove"
                                  onClick={() => removeTravelHistory(idx)}
                                  title={labels.removeRow}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <button
                      type="button"
                      className="btn-mini-add"
                      onClick={addTravelHistoryRow}
                    >
                      <Plus size={13} />
                      <span>{labels.addHistoryRow}</span>
                    </button>
                  </div>
                </FormSection>

                {/* 6. SUPPORTING DOCUMENTS */}
                <FormSection
                  title={labels.supportingSection}
                  number="16"
                  subtitle={labels.documentsHint}
                >
                  <DocumentCheck
                    checked={form.supportingDocuments.includes('invitation')}
                    onChange={() => toggleDocument('invitation')}
                    label={labels.invitationDocument}
                  />
                  <DocumentCheck
                    checked={form.supportingDocuments.includes('itinerary')}
                    onChange={() => toggleDocument('itinerary')}
                    label={labels.itineraryDocument}
                  />
                  <DocumentCheck
                    checked={form.supportingDocuments.includes('funding')}
                    onChange={() => toggleDocument('funding')}
                    label={labels.fundingDocument}
                  />
                  <DocumentCheck
                    checked={form.supportingDocuments.includes('passport')}
                    onChange={() => toggleDocument('passport')}
                    label={labels.passportDocument}
                  />
                  <DocumentCheck
                    checked={form.supportingDocuments.includes('leaveRecord')}
                    onChange={() => toggleDocument('leaveRecord')}
                    label={labels.leaveRecordDocument}
                  />
                </FormSection>

                {/* 7. DECLARATION & SIGNATURE */}
                <label className="declaration-field">
                  <input
                    type="checkbox"
                    checked={declaration}
                    onChange={(event) => setDeclaration(event.target.checked)}
                  />
                  <span>{labels.declaration} *</span>
                </label>

                <div className="signature-field detailed-signature">
                  <div className="signature-title">
                    <span>{labels.signature} *</span>
                    <small>{labels.signatureHint}</small>
                    <button type="button" onClick={() => window.clearSignature?.()}>
                      {labels.clear}
                    </button>
                  </div>
                  <SignaturePad onChange={setSignature} />
                </div>
              </>
            )}

            {error && (
              <div className="form-error">
                <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                {error}
              </div>
            )}
          </div>

          {/* MODAL FOOTER */}
          <footer className="modal-footer">
            <button type="button" className="secondary-button" onClick={onClose}>
              {t.cancel}
            </button>

            {/* Official Step 1: Next button */}
            {isOfficial && step === 1 && (
              <button
                type="button"
                className="primary-button"
                onClick={goToStep2}
              >
                <span>{labels.nextStepBtn}</span>
                <ArrowRight size={15} />
              </button>
            )}

            {/* Official Step 2: Back button + Submit button */}
            {isOfficial && step === 2 && (
              <>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setError('');
                    setStep(1);
                  }}
                >
                  <ArrowLeft size={15} />
                  <span>{labels.prevStepBtn}</span>
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  disabled={busy || !signature || !declaration}
                >
                  {busy ? '…' : labels.submitOfficialBtn}
                  <Check size={15} />
                </button>
              </>
            )}

            {/* Personal Leave: Direct Submit button */}
            {!isOfficial && (
              <button
                type="submit"
                className="primary-button"
                disabled={busy || !signature || !declaration}
              >
                {busy ? '…' : labels.submitPersonalBtn}
                <Check size={15} />
              </button>
            )}
          </footer>
        </form>
      </section>
    </div>
  );
}

function FormSection({ title, number, subtitle, children }) {
  return (
    <section className="form-section">
      <header className="form-section-heading">
        <span className="form-number">{number}</span>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </header>
      <div className="form-grid">{children}</div>
    </section>
  );
}

function InputField({ name, label, value, update, type = 'text', required = false, min, placeholder }) {
  return (
    <label className="field-label">
      {label}
      <input
        name={name}
        type={type}
        value={value || ''}
        onChange={(event) => update(name, event.target.value)}
        required={required}
        min={min}
        placeholder={placeholder}
      />
    </label>
  );
}

function TextAreaField({ name, label, value, update, required = false, placeholder }) {
  return (
    <label className="field-label span-2">
      {label}
      <textarea
        name={name}
        rows="3"
        value={value || ''}
        onChange={(event) => update(name, event.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({ name, label, value, update, placeholder, options }) {
  const canonicalOptions = [
    'Annual / vacation leave',
    'Half-pay leave',
    'Commuted half-pay leave',
    'No-pay leave',
    'Official duty',
  ];
  return (
    <label className="field-label">
      {label}
      <select
        name={name}
        value={value || ''}
        onChange={(event) => update(name, event.target.value)}
        required
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={option} value={canonicalOptions[index] || option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <label className="field-label">
      {label}
      <span className="read-only-field">{value || '—'}</span>
    </label>
  );
}

function DocumentCheck({ checked, onChange, label }) {
  return (
    <label className="check-field">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export function RequestDetails({ details = {}, language }) {
  const labels = formText[language] || formText.en;
  const isOfficial = details.leaveType === 'Official duty' || details.leaveCategory === 'Official duty';

  const leaveCategoryLabels = {
    'Annual / vacation leave': labels.leaveOptions[0],
    'Half-pay leave': labels.leaveOptions[1],
    'Commuted half-pay leave': labels.leaveOptions[2],
    'No-pay leave': labels.leaveOptions[3],
    'Official duty': labels.leaveOptions[4],
  };

  const documentLabels = {
    invitation: labels.invitationDocument,
    itinerary: labels.itineraryDocument,
    funding: labels.fundingDocument,
    passport: labels.passportDocument,
    leaveRecord: labels.leaveRecordDocument,
  };

  // Groups for General 126
  const gen126Groups = [
    {
      title: `${labels.officerSection} · General 126`,
      fields: [
        [labels.department, details.department],
        [labels.fullName, details.fullName],
        [labels.designation, details.designation],
        [labels.service, details.service],
        [labels.grade, details.grade],
        [labels.firstAppointment, details.firstAppointmentDate],
        [labels.lastForeignReturn, details.lastForeignReturnDate],
      ],
    },
    {
      title: `${labels.leaveSection} · General 126`,
      fields: [
        [labels.destination, details.destination],
        [labels.purpose, details.purpose],
        [labels.departure, details.startDate],
        [labels.returnDate, details.endDate],
        [labels.daysApplied, details.daysApplied ? `${details.daysApplied} Days / දින` : ''],
        [labels.leaveCategory, leaveCategoryLabels[details.leaveCategory] || details.leaveCategory],
        [labels.leaveBalance, details.leaveBalance],
      ],
    },
    {
      title: `${labels.fundingSection} · General 126`,
      fields: [
        [labels.airfareFunding, details.airfareFunding],
        [labels.prepaidTicket, details.prepaidTicket],
        [labels.ticketSenderRelationship, details.ticketSenderRelationship],
        [labels.maintenanceFunding, details.maintenanceFunding],
        [labels.maintenancePayerRelationship, details.maintenancePayerRelationship],
      ],
    },
    {
      title: `${labels.contactSection} · General 126`,
      fields: [
        [labels.abroadAddress, details.abroadAddress],
        [labels.abroadPhone, details.abroadPhone],
        [labels.abroadEmail, details.abroadEmail],
      ],
    },
  ];

  // Groups for Appendix 16 (Only shown for Official duty!)
  const app16Groups = isOfficial
    ? [
        {
          title: `${labels.identificationSection} · Appendix 16`,
          fields: [
            [labels.nic, details.nic],
            [labels.dateOfBirth, details.dateOfBirth],
            [labels.ministry, details.ministry],
            [labels.department, details.department],
          ],
        },
        {
          title: `${labels.actingArrangementsSection} · Appendix 16`,
          fields: [
            [labels.dutyCoverName, details.dutyCoverName],
            [labels.dutyCoverDesignation, details.dutyCoverDesignation],
          ],
        },
        {
          title: `${labels.officialTravelDetailsSection} · Appendix 16`,
          fields: [
            [labels.trainingField, details.trainingField || details.purpose],
            [labels.visitInstitution, details.visitInstitution],
            [labels.courseStartDate, details.courseStartDate],
            [labels.courseEndDate, details.courseEndDate],
            [labels.prevTripReportSubmitted, details.prevTripReportSubmitted],
          ],
        },
        {
          title: `${labels.officialExpensesSection} · Appendix 16`,
          fields: [
            [labels.fundingSourceType, details.fundingSource],
            [labels.goslAirfare, details.goslAirfare],
            [labels.goslSubsistence, details.goslSubsistence],
            [labels.goslCourseFees, details.goslCourseFees],
            [labels.goslAdditional, details.goslAdditional],
            [labels.foreignLoanProjectDetails, details.foreignLoanProjectDetails],
          ],
        },
      ]
    : [];

  const groups = [...gen126Groups, ...app16Groups];
  const hasDetails = Object.keys(details).length > 0;
  if (!hasDetails) return null;

  return (
    <div className="request-review-details">
      <div style={{ marginBottom: '14px' }}>
        <span className={`modal-leave-tag ${isOfficial ? 'official' : 'personal'}`}>
          {isOfficial
            ? (language === 'si' ? '🏛️ නිල සංචාරය · සාමාන්‍ය 126 + උපග්‍රන්ථ 16' : '🏛️ Official Duty · General 126 + Appendix 16')
            : (language === 'si' ? '✈️ පෞද්ගලික නිවාඩු · සාමාන්‍ය 126 පමණි' : '✈️ Personal Leave · General 126 Only')}
        </span>
      </div>

      {groups.map((group) => {
        const fields = group.fields.filter(
          ([, value]) => value !== undefined && value !== null && value !== ''
        );
        if (!fields.length) return null;
        return (
          <section className="review-detail-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="review-detail-grid">
              {fields.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Travel History in Details view */}
      {isOfficial && details.travelHistory && details.travelHistory.length > 0 && (
        <section className="review-detail-group">
          <h3>{labels.travelHistorySection} · Appendix 16</h3>
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>{labels.thYear}</th>
                  <th>{labels.thPurpose}</th>
                  <th>{labels.thPeriod}</th>
                  <th>{labels.thCountry}</th>
                </tr>
              </thead>
              <tbody>
                {details.travelHistory.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.year}</td>
                    <td>{row.purpose}</td>
                    <td>{row.period}</td>
                    <td>{row.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Supporting Documents Checklist */}
      {!!details.supportingDocuments?.length && (
        <section className="review-detail-group">
          <h3>{labels.supportingSection}</h3>
          <div className="review-detail-grid">
            <div className="review-wide">
              <span>{labels.documentsHint}</span>
              <strong>
                {details.supportingDocuments
                  .map((document) => documentLabels[document] || document)
                  .join(', ')}
              </strong>
            </div>
          </div>
        </section>
      )}

      {details.declarationConfirmed && (
        <div className="review-declaration">
          <Check size={14} />
          {labels.declaration}
        </div>
      )}
    </div>
  );
}