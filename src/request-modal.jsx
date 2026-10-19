import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  X,
  AlertCircle,
  FileText,
  CheckCircle2,
  UploadCloud,
  Eye,
  Download,
  Building,
  User,
  Paperclip,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Building2,
  Landmark,
  PenTool,
  Send,
  Stamp,
  Scale,
  Edit3,
  Clock,
  UserCheck,
  ChevronRight,
  FileDown,
  Printer,
  FolderArchive,
  Lock
} from 'lucide-react';
import SignaturePad from './signature-pad.jsx';

export function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
    personalTag: 'Personal / Private Leave · General 126 Form',
    officialTag: 'Official Duty · General 126 + Appendix 16',
    step1Notice: 'Step 1: Fill out General 126 (Application for leave out of Sri Lanka). You will proceed to Appendix 16 in the next step.',
    step2Notice: 'Step 2: Complete Appendix 16 prior permission details before submitting for official approval.',
    personalStep1Notice: 'Step 1: Fill out General 126 Form (items 1–12) with your particulars, dates, and signature. Click Next to upload required supporting documents in Step 2.',
    personalStep2Notice: 'Step 2: Upload live supporting documents (PDF / Image) before final submission.',
    nextStepBtn: 'Next: Appendix 16 →',
    prevStepBtn: '← Back: General 126',
    nextToDocsBtn: 'Next: Upload Documents →',
    backToGen126Btn: '← Back: General 126',
    submitPersonalBtn: 'Submit Personal Leave Application',
    submitOfficialBtn: 'Submit Official Travel Application',

    // Section Titles
    officerSection: '1. Officer & Service Particulars',
    leaveSection: '2. Period of Leave & Travel Destination',
    fundingSection: '3. Ticket & Foreign Maintenance Costs',
    contactSection: '4. Address & Contact While on Leave',
    dateAndSignatureSection: '5. Date and Signature of Applicant',
    
    // Appendix 16 Sections
    identificationSection: '1. Officer Identification & Ministry',
    actingArrangementsSection: '2. Duty Covering / Acting Arrangements',
    officialTravelDetailsSection: '3. Official Travel, Training & Awarding Agency',
    officialExpensesSection: '4. Expense Breakdown & Funding Source',
    travelHistorySection: '5. Foreign Travel in Current Year and Preceding 3 Years',
    supportingSection: '6. Supporting Documents Checklist',

    // Fields
    department: '1. Department / Institution',
    fullName: '2. Name in Full',
    designation: '2. Post / Designation',
    service: '3. Service to which officer belongs',
    grade: '3. Class or Grade',
    ministry: 'Ministry / Provincial Council',
    firstAppointment: '4. Date of first appointment',
    lastForeignReturn: '5. If leave was taken earlier, date of last return to Sri Lanka',
    departure: 'Commencement date of leave (Departure)',
    returnDate: 'Completion date of leave (Return)',
    periodApplied: '6. Period of leave now applied for (Departure and Return)',
    daysApplied: 'Period of leave applied (Total calendar days)',
    purpose: '7. Reasons for leave / Purpose of travel',
    destination: 'Country / City to be visited',
    leaveCategory: 'Nature / Category of leave requested',
    leaveBalance: 'Available leave balance before this application',

    // Ticket & Maintenance
    prepaidTicket: '8.1 Is travel on a pre-paid ticket?',
    ticketSenderRelationship: '8.2 Relationship of the person sending pre-paid ticket',
    maintenanceFunding: '9.1 How is the cost of maintenance abroad met?',
    maintenancePayerRelationship: '9.2 Relationship of person meeting such expenditure',
    airfareFunding: 'Air ticket funding source / entity',

    // Address
    abroadAddress: '10. Full residential address during leave abroad',
    abroadPhone: 'Telephone number while abroad',
    abroadEmail: 'Email address while abroad',
    applicationDate: '11. Date of application',

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

    // Step 2 Document Uploads
    docsHeading: 'Live Supporting Documents Upload',
    docsSubheading: 'Upload live sub documents (PDF / Image) supporting your personal foreign leave application.',
    docHeadTitle: '1. Letter from the Head of the Institution',
    docHeadDesc: 'Official recommendation / release letter from the Head of the Institution (PDF / Image)',
    docPassportTitle: '2. Passport image',
    docPassportDesc: 'Bio-data page and photograph of applicant\'s valid passport (PDF / Image)',
    docRequestTitle: "3. The applicant's request letter",
    docRequestDesc: 'Formal signed request letter written by applicant (PDF / Image)',
    docOtherTitle: '4. Other Documents',
    docOtherDesc: 'Any other supporting documents such as visa, flight itinerary, or sponsorship (PDF / Image)',
    uploadPrompt: 'Click to browse or drag file here',
    uploadFormats: 'Supports PDF, PNG, JPG (Max 10MB)',
    uploadedBadge: 'Uploaded',
    previewDoc: 'Preview',
    downloadDoc: 'Download',
    removeDoc: 'Remove',
    requiredBadge: 'Required',
    optionalBadge: 'Optional',
    docsMissingError: 'Please upload the 3 required live documents: Letter from the Head of the Institution, Passport image, and The applicant\'s request letter.',

    // Officer Use Only
    officerUseTitle: 'FOR OFFICER USE ONLY',
    officerUseSiTitle: 'කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි',
    vacationLeave: 'Vacation Leave',
    commutedHalfPay: 'Commuted half-pay leave',
    halfPayLeave: 'Half-Pay leave',
    noPayLeave: 'No-Pay leave',
    totalLeave: 'Total',
    monthsCol: 'Months',
    daysCol: 'Days',
    noteSheetTitle: 'Subject Officer Note Sheet',
    uploadNoteSheetPrompt: 'Upload Scanned Note Sheet (PDF / Image)',
    submitOfficerAssessmentBtn: 'Submit Subject Officer Assessment & Note Sheet',

    // Official Documents checklist
    documentsHint: 'Check all relevant documents attached to this application:',
    invitationDocument: 'Official letter of invitation / training programme',
    itineraryDocument: 'Travel itinerary / confirmed flight reservations',
    fundingDocument: 'Proof of funding, scholarship award or sponsorship letter',
    passportDocument: 'Copy of passport bio-data page',
    leaveRecordDocument: 'Official leave balance statement',

    // Declaration & Signature
    declaration: 'I certify that the particulars furnished in this application are true and correct.',
    signature: '12. Signature of applicant',
    signatureHint: 'Sign in the designated signature box below using your mouse or finger.',
    clear: 'Clear signature',
    yes: 'Yes',
    no: 'No',

    // Errors & Validations
    step1Incomplete: 'Please complete all required fields in General 126 before proceeding.',
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
    personalTag: 'පෞද්ගලික නිවාඩු · සාමාන්‍ය 126 අයදුම්පත',
    officialTag: 'නිල රාජකාරි · සාමාන්‍ය 126 + උපග්‍රන්ථ 16',
    step1Notice: 'පියවර 1: සාමාන්‍ය 126 (Gen-126) නිවාඩු ඉල්ලුම්පත මුලින් සම්පූර්ණ කරන්න. ඉන්පසු උපග්‍රන්ථ 16 වෙත යොමු කෙරේ.',
    step2Notice: 'පියවර 2: උපග්‍රන්ථ 16 (Appendix 16) පූර්ව අවසර විස්තර සම්පූර්ණ කර අවසන් අනුමැතිය සඳහා ඉදිරිපත් කරන්න.',
    personalStep1Notice: 'පියවර 1: සාමාන්‍ය 126 (Gen-126) පෝරමය (අංක 1 සිට 12 දක්වා) සම්පූර්ණ කර අත්සන් තබන්න. ඊළඟ පියවරේදී අදාළ උපකාරක ලේඛන උඩුගත කෙරේ.',
    personalStep2Notice: 'පියවර 2: අයදුම්පත ඉදිරිපත් කිරීමට පෙර අවශ්‍ය සජීවී උපකාරක ලේඛන (PDF / ඡායාරූප) උඩුගත කරන්න.',
    nextStepBtn: 'මීළඟ: උපග්‍රන්ථ 16 වෙත →',
    prevStepBtn: '← ආපසු: සාමාන්‍ය 126',
    nextToDocsBtn: 'ඊළඟ: ලේඛන ඇමිණීම →',
    backToGen126Btn: '← ආපසු: සාමාන්‍ය 126',
    submitPersonalBtn: 'පෞද්ගලික නිවාඩු අයදුම්පත ඉදිරිපත් කරන්න',
    submitOfficialBtn: 'නිල සංචාරක අයදුම්පත ඉදිරිපත් කරන්න',

    // Section Titles
    officerSection: '1. නිලධාරි සහ සේවා විස්තර',
    leaveSection: '2. ඉල්ලා සිටින නිවාඩු කාලය සහ ගමනාන්තය',
    fundingSection: '3. ගුවන් ටිකට්පත් සහ විදේශ නඩත්තු වියදම්',
    contactSection: '4. නිවාඩු කාලයේ ලිපිනය සහ දුරකථන',
    dateAndSignatureSection: '5. අයදුම් කළ දිනය සහ ඉල්ලුම්කරුගේ අත්සන',

    // Appendix 16 Sections
    identificationSection: '1. නිලධාරියා හඳුනාගැනීම සහ අමාත්‍යාංශය',
    actingArrangementsSection: '2. වැඩ බැලීමේ විධිවිධාන (රාජකාරි ආවරණය)',
    officialTravelDetailsSection: '3. නිල සංචාරයේ අරමුණ, පුහුණුව සහ ආයතනය',
    officialExpensesSection: '4. සංචාරක වියදම් සහ මූල්‍ය ප්‍රතිපාදන විස්තර',
    travelHistorySection: '5. වත්මන් වර්ෂය සහ පෙර වසර 3 තුළ විදේශ සංචාර විස්තර',
    supportingSection: '6. අමුණා ඇති උපකාරක ලේඛන පිරික්සුම් ලැයිස්තුව',

    // Fields
    department: '1. දෙපාර්තමේන්තුව / ආයතනය',
    fullName: '2. සම්පූර්ණ නම',
    designation: '2. තනතුර',
    service: '3. අයත් සේවය (උදා: ශ්‍රී.ලං.ප.සේ. / ඉංජිනේරු / කළමනාකරණ සේවා)',
    grade: '3. පන්තිය / ශ්‍රේණිය',
    ministry: 'අමාත්‍යාංශය / පළාත් සභාව',
    firstAppointment: '4. මුලින්ම පත් වූ දිනය',
    lastForeignReturn: '5. මීට පෙර නිවාඩු ගත්තේ නම් පසු ගිය වර ශ්‍රී ලංකාවට ආපසු පැමිණි දිනය',
    departure: 'නිවාඩු පටන් ගන්නා දිනය (පිටත්වීම)',
    returnDate: 'නිවාඩු අවසන් වන දිනය (පැමිණීම)',
    periodApplied: '6. ඉල්ලුම් කරන නිවාඩු කාලසීමාව (ආරම්භක හා අවසන් වන දිනය)',
    daysApplied: 'ඉල්ලා සිටින සම්පූර්ණ නිවාඩු දින ගණන',
    purpose: '7. නිවාඩු ඉල්ලීමට හේතුව / අරමුණ',
    destination: 'සංචාරය කරන රට / නගරය',
    leaveCategory: 'ඉල්ලා සිටින නිවාඩු වර්ගය',
    leaveBalance: 'මෙම අයදුම්පතට පෙර ඇති ඉතිරි නිවාඩු ශේෂය',

    // Ticket & Maintenance
    prepaidTicket: '8.1 ගමන් කරන්නේ කලින් මුදල් ගෙවූ ටිකට්පතකින්ද?',
    ticketSenderRelationship: '8.2 එම එවූ පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය',
    maintenanceFunding: '9.1 පිටරට තමාගේ නඩත්තු වියදම් දරන්නේ කෙසේද?',
    maintenancePayerRelationship: '9.2 එම වියදම් දරන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය',
    airfareFunding: 'ගුවන් ටිකට්පත් වියදම් මූලාශ්‍රය / ආයතනය',

    // Address
    abroadAddress: '10. විදේශ නිවාඩු කාලයේදී ඉල්ලුම්කරුගේ සම්පූර්ණ ලිපිනය',
    abroadPhone: 'විදේශයේදී සම්බන්ධ කරගත හැකි දුරකථන අංකය',
    abroadEmail: 'විදේශයේදී ඊමේල් ලිපිනය',
    applicationDate: '11. අයදුම් කරන දිනය',

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

    // Step 2 Document Uploads
    docsHeading: 'උපකාරක ලේඛන උඩුගත කිරීම (PDF / ඡායාරූප)',
    docsSubheading: 'පෞද්ගලික විදේශ නිවාඩු අයදුම්පත සඳහා අදාළ සජීවී උපකාරක ලේඛන මෙහි උඩුගත කරන්න.',
    docHeadTitle: '1. ආයතන ප්‍රධානියාගේ ලිපිය',
    docHeadDesc: 'ආයතන ප්‍රධානියා විසින් නිකුත් කළ නිර්දේශ හෝ මුදාහැරීමේ ලිපිය (PDF / ඡායාරූප)',
    docPassportTitle: '2. ගමන් බලපත්‍රයේ පිටපත (Passport Image)',
    docPassportDesc: 'වලංගු ගමන් බලපත්‍රයේ විස්තර පිටුව සහ ඡායාරූපය (PDF / ඡායාරූප)',
    docRequestTitle: '3. ඉල්ලුම්කරුගේ ඉල්ලීම් ලිපිය',
    docRequestDesc: 'ඉල්ලුම්කරු විසින් අත්සන් කර යොමු කළ නිල ඉල්ලීම් ලිපිය (PDF / ඡායාරූප)',
    docOtherTitle: '4. වෙනත් අදාළ ලේඛන',
    docOtherDesc: 'වීසා, ගුවන් ගමන් විස්තර හෝ වෙනත් අදාළ ලේඛන (PDF / ඡායාරූප)',
    uploadPrompt: 'ගොනුව තෝරන්න හෝ මෙතැනට ඇදගෙන එන්න',
    uploadFormats: 'PDF, PNG, JPG ගොනු (උපරිම 10MB)',
    uploadedBadge: 'උඩුගත කර ඇත',
    previewDoc: 'බලන්න',
    downloadDoc: 'බාගන්න',
    removeDoc: 'ඉවත් කරන්න',
    requiredBadge: 'අනිවාර්යයි',
    optionalBadge: 'විකල්පයි',
    docsMissingError: 'කරුණාකර අනිවාර්ය උපකාරක ලේඛන 3 ම (ආයතන ප්‍රධානියාගේ ලිපිය, ගමන් බලපත්‍ර පිටපත, සහ ඉල්ලීම් ලිපිය) උඩුගත කරන්න.',

    // Officer Use Only
    officerUseTitle: 'කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි',
    officerUseSiTitle: 'FOR OFFICER USE ONLY',
    vacationLeave: 'විවේක නිවාඩු (Vacation Leave)',
    commutedHalfPay: 'පරිවර්තනය කළ අර්ධ වැටුප් නිවාඩු (Commuted half-pay)',
    halfPayLeave: 'අර්ධ වැටුප් නිවාඩු (Half-Pay leave)',
    noPayLeave: 'වැටුප් රහිත නිවාඩු (No-Pay leave)',
    totalLeave: 'මුළු එකතුව (Total)',
    monthsCol: 'මාස (Months)',
    daysCol: 'දින (Days)',
    noteSheetTitle: 'විෂයභාර නිලධාරී සටහන් පත්‍රිකාව (Note Sheet)',
    uploadNoteSheetPrompt: 'සටහන් පත්‍රිකාව උඩුගත කරන්න (PDF / ඡායාරූප)',
    submitOfficerAssessmentBtn: 'විෂයභාර නිලධාරී තක්සේරුව සහ සටහන් පත්‍රිකාව ඉදිරිපත් කරන්න',

    // Documents
    documentsHint: 'මෙම අයදුම්පත සමඟ ඉදිරිපත් කරන ලේඛන තෝරන්න:',
    invitationDocument: 'නිල ආරාධනා ලිපිය / පුහුණු වැඩසටහන් විස්තරය',
    itineraryDocument: 'ගුවන් ගමන් කාලසටහන / තහවුරු කළ ටිකට්පත් තොරතුරු',
    fundingDocument: 'ශිෂ්‍යත්ව ප්‍රදාන ලිපිය හෝ අනුග්‍රාහක සාක්ෂි',
    passportDocument: 'ගමන් බලපත්‍රයේ විස්තර පිටුවේ ඡායා පිටපත',
    leaveRecordDocument: 'නිල නිවාඩු ශේෂ ප්‍රකාශය',

    // Declaration & Signature
    declaration: 'මෙම අයදුම්පතේ මා විසින් සපයා ඇති සියලුම තොරතුරු සත්‍ය හා නිවැරදි බවට සහතික වෙමි.',
    signature: '12. ඉල්ලුම්කරුගේ අත්සන (Signature of Applicant)',
    signatureHint: 'මූසිකය (mouse) හෝ ස්පර්ශය මඟින් පහත කොටුවේ අත්සන් තබන්න.',
    clear: 'අත්සන මකන්න',
    yes: 'ඔව්',
    no: 'නැත',

    // Errors & Validations
    step1Incomplete: 'කරුණාකර ඉදිරියට යාමට පෙර සාමාන්‍ය 126 හි අනිවාර්ය තොරතුරු සියල්ල පුරවන්න.',
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
  applicationDate: new Date().toISOString().slice(0, 10),
  documents: {
    institutionLetter: null,
    passportImage: null,
    requestLetter: null,
    otherDocuments: null,
  },

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

export function FileUploaderCard({
  title,
  subtitle,
  docKey,
  doc,
  onUpload,
  onRemove,
  onPreview,
  required = false,
  labels,
  icon: Icon = FileText,
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(docKey, {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result,
          uploadedAt: new Date().toISOString(),
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(docKey, {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result,
          uploadedAt: new Date().toISOString(),
        });
      };
      reader.readAsDataURL(file);
    }
  }

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="doc-upload-card">
      <div className="doc-upload-header">
        <div className="doc-upload-icon-wrap">
          <Icon size={18} />
        </div>
        <div className="doc-upload-titles">
          <strong>
            {title}
            {required ? (
              <span className="doc-required-badge">{labels?.requiredBadge || 'Required'}</span>
            ) : (
              <span className="doc-optional-badge">{labels?.optionalBadge || 'Optional'}</span>
            )}
          </strong>
          <small>{subtitle}</small>
        </div>
      </div>

      {doc ? (
        <div className="doc-file-uploaded">
          <div className="doc-file-info">
            <CheckCircle2 size={18} className="doc-file-info-icon" />
            <div className="doc-file-meta">
              <span className="doc-file-meta-name" title={doc.name}>{doc.name}</span>
              <span className="doc-file-meta-size">{formatSize(doc.size)} · {labels?.uploadedBadge || 'Uploaded'}</span>
            </div>
          </div>
          <div className="doc-file-actions">
            <button
              type="button"
              className="btn-doc-action"
              onClick={() => onPreview(doc)}
              title={labels?.previewDoc || 'Preview'}
            >
              <Eye size={13} />
              <span>{labels?.previewDoc || 'Preview'}</span>
            </button>
            <button
              type="button"
              className="btn-doc-action danger"
              onClick={() => onRemove(docKey)}
              title={labels?.removeDoc || 'Remove'}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`doc-upload-dropzone ${dragging ? 'dragging' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <UploadCloud size={24} style={{ color: '#2563eb' }} />
          <span className="doc-upload-prompt">{labels?.uploadPrompt || 'Click to browse or drag file here'}</span>
          <span className="doc-upload-subtext">{labels?.uploadFormats || 'Supports PDF, PNG, JPG (Max 10MB)'}</span>
        </div>
      )}
    </div>
  );
}

export function DocumentPreviewModal({ document: doc, onClose }) {
  if (!doc) return null;
  const isImage = doc.type?.startsWith('image/') || doc.dataUrl?.startsWith('data:image/');
  const isPdf = doc.type === 'application/pdf' || doc.dataUrl?.startsWith('data:application/pdf');

  return (
    <div className="doc-preview-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="doc-preview-modal">
        <header className="doc-preview-header">
          <h3>
            <FileText size={16} />
            <span>{doc.name || 'Document Preview'}</span>
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {doc.dataUrl && (
              <a
                href={doc.dataUrl}
                download={doc.name || 'document'}
                className="btn-doc-action"
                style={{ textDecoration: 'none' }}
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            )}
            <button className="icon-button" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </header>
        <div className="doc-preview-body">
          {isImage ? (
            <img
              src={doc.dataUrl}
              alt={doc.name}
              style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          ) : isPdf ? (
            <iframe
              src={doc.dataUrl}
              title={doc.name}
              style={{ width: '100%', height: '72vh', border: 'none', background: '#fff' }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Preview is not available directly in browser for this file type.</p>
              <a
                href={doc.dataUrl}
                download={doc.name || 'document'}
                className="primary-button"
                style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={15} />
                <span>Download {doc.name}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RequestModal({
  t,
  language,
  user,
  token,
  onClose,
  onSubmitted,
  initialLeaveType = 'official',
  editingRequest = null,
}) {
  const isEditing = Boolean(editingRequest);
  const editDetails = editingRequest?.details || {};
  const isRejected = editingRequest?.status === 'Rejected' || Boolean(editDetails.rejectionRecord);
  const [correctionNotes, setCorrectionNotes] = useState(editDetails.correctionNotes || '');
  const effectiveLeaveType = isEditing
    ? (editingRequest.leave_type === 'Official duty' || editDetails.leaveType === 'Official duty' ? 'official' : 'personal')
    : initialLeaveType;
  const isOfficial = effectiveLeaveType === 'official';
  const defaultCategory = isOfficial ? 'Official duty' : 'Annual / vacation leave';
  const labels = formText[language] || formText.en;

  // For both official & personal: Step 1 (Gen-126) -> Step 2 (Official: App 16, Personal: Live Documents)
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    ...initialDetails,
    ...editDetails,
    fullName: editDetails.fullName || editingRequest?.applicant_name || user?.name || '',
    destination: editDetails.destination || editingRequest?.destination || '',
    purpose: editDetails.purpose || editingRequest?.purpose || '',
    startDate: editDetails.startDate || editingRequest?.start_date || '',
    endDate: editDetails.endDate || editingRequest?.end_date || '',
    leaveCategory: editDetails.leaveCategory || defaultCategory,
    airfareFunding: editDetails.airfareFunding || (isOfficial
      ? (language === 'si' ? 'ශ්‍රී ලංකා රජය / නිල අනුග්‍රහය' : 'Government of Sri Lanka (GOSL)')
      : (language === 'si' ? 'පෞද්ගලික වියදමින්' : 'Self-funded')),
    maintenanceFunding: editDetails.maintenanceFunding || (isOfficial
      ? (language === 'si' ? 'නිල දීමනා / ආයතනික අනුග්‍රහය' : 'Official subsistence / Sponsoring agency')
      : (language === 'si' ? 'පෞද්ගලික ඉතුරුම් වලින්' : 'Personal savings')),
    fundingSource: editDetails.fundingSource || (isOfficial ? 'Government of Sri Lanka (GOSL)' : 'Private funds'),
    applicationDate: editDetails.applicationDate || editingRequest?.created_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  });

  const [signature, setSignature] = useState(editingRequest?.signature || editDetails.signature || '');
  const [declaration, setDeclaration] = useState(isEditing ? true : false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [registeredDepts, setRegisteredDepts] = useState([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch('/api/departments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const list = await res.json();
          setRegisteredDepts(list);
          if (list.length > 0 && !form.department) {
            setForm((prev) => ({ ...prev, department: list[0].name }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch departments in RequestModal', err);
      }
    }
    if (token) fetchDepartments();
  }, [token]);

  const daysApplied = form.startDate && form.endDate
    ? Math.max(0, Math.floor((new Date(`${form.endDate}T12:00:00`) - new Date(`${form.startDate}T12:00:00`)) / 86400000) + 1)
    : '';

  function update(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleDocUpload(docKey, docData) {
    setForm((previous) => ({
      ...previous,
      documents: {
        ...(previous.documents || {}),
        [docKey]: docData,
      },
    }));
  }

  function handleDocRemove(docKey) {
    setForm((previous) => ({
      ...previous,
      documents: {
        ...(previous.documents || {}),
        [docKey]: null,
      },
    }));
  }

  function updateTravelHistory(index, field, value) {
    setForm((prev) => {
      const updated = [...(prev.travelHistory || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, travelHistory: updated };
    });
  }

  function addTravelHistoryRow() {
    setForm((prev) => ({
      ...prev,
      travelHistory: [...(prev.travelHistory || []), { year: '', purpose: '', period: '', country: '' }],
    }));
  }

  function removeTravelHistory(index) {
    setForm((prev) => ({
      ...prev,
      travelHistory: (prev.travelHistory || []).filter((_, i) => i !== index),
    }));
  }

  function toggleDocument(docKey) {
    setForm((prev) => {
      const list = prev.supportingDocuments || [];
      const updated = list.includes(docKey)
        ? list.filter((k) => k !== docKey)
        : [...list, docKey];
      return { ...prev, supportingDocuments: updated };
    });
  }

  function validateGen126Fields() {
    if (!form.department || !form.fullName || !form.designation || !form.service || !form.firstAppointmentDate) {
      setError(language === 'si' ? 'කරුණාකර නිලධාරී සහ සේවා විස්තර සම්පූර්ණ කරන්න (අංක 1-4).' : 'Please complete officer and service particulars (Items 1-4).');
      return false;
    }
    if (!form.destination || !form.purpose || !form.startDate || !form.endDate || !form.leaveBalance) {
      setError(language === 'si' ? 'කරුණාකර ගමනාන්තය, හේතු සහ නිවාඩු කාලසීමාව සම්පූර්ණ කරන්න (අංක 6-7).' : 'Please complete leave destination, purpose, dates and balance (Items 6-7).');
      return false;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError(labels.dateError);
      return false;
    }
    if (!form.airfareFunding || !form.maintenanceFunding) {
      setError(language === 'si' ? 'කරුණාකර ගමන් හා නඩත්තු වියදම් විස්තර සම්පූර්ණ කරන්න (අංක 8-9).' : 'Please complete travel and maintenance funding details (Items 8-9).');
      return false;
    }
    if (!form.abroadAddress || !form.abroadPhone) {
      setError(language === 'si' ? 'කරුණාකර විදේශයේදී ලිපිනය සහ දුරකථන අංකය ඇතුළත් කරන්න (අංක 10).' : 'Please enter abroad contact address and phone (Item 10).');
      return false;
    }
    return true;
  }

  function validateStep1() {
    setError('');
    return validateGen126Fields();
  }

  function goToStep2() {
    if (validateStep1()) {
      setError('');
      setStep(2);
    }
  }

  function validatePersonalStep1() {
    setError('');
    if (!validateGen126Fields()) return false;
    if (!form.applicationDate) {
      setError(language === 'si' ? 'කරුණාකර අයදුම් කළ දිනය ඇතුළත් කරන්න (අංක 11).' : 'Please specify application date (Item 11).');
      return false;
    }
    if (!declaration) {
      setError(language === 'si' ? 'කරුණාකර අයදුම්පතේ තොරතුරු සත්‍ය බව සහතික කරන ප්‍රකාශය තහවුරු කරන්න.' : 'Please confirm the declaration certifying details are true and correct.');
      return false;
    }
    if (!signature) {
      setError(language === 'si' ? 'කරුණාකර ඉල්ලුම්කරුගේ අත්සන තබන්න (අංක 12).' : 'Please provide applicant signature in the box below (Item 12).');
      return false;
    }
    return true;
  }

  function goToPersonalStep2() {
    if (validatePersonalStep1()) {
      setError('');
      setStep(2);
    }
  }

  function validatePersonalDocuments() {
    const docs = form.documents || {};
    if (!docs.institutionLetter || !docs.passportImage || !docs.requestLetter) {
      setError(labels.docsMissingError || 'Please upload all 3 required documents: Letter from Head of Institution, Passport image, and Applicant request letter.');
      return false;
    }
    return true;
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    if (isOfficial) {
      if (step === 1) {
        goToStep2();
        return;
      }
      if (!validateGen126Fields()) return;
      if (!form.nic || !form.dateOfBirth || !form.ministry || !form.dutyCoverName || !form.dutyCoverDesignation) {
        setError(labels.step2Incomplete);
        return;
      }
      if (!declaration || !signature) {
        setError(labels.step2Incomplete);
        return;
      }
    } else {
      if (step === 1) {
        goToPersonalStep2();
        return;
      }
      if (!validatePersonalDocuments()) return;
    }

    setBusy(true);
    try {
      const payload = {
        leaveType: isOfficial ? 'Official duty' : 'Private leave',
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
        purpose: form.purpose,
        signature,
        signatureDataUrl: signature,
        resubmit: isRejected,
        correctionNotes: correctionNotes.trim(),
        details: {
          ...form,
          leaveType: isOfficial ? 'Official duty' : 'Private leave',
          signature,
          declarationConfirmed: declaration,
          daysApplied,
          correctionNotes: correctionNotes.trim(),
        },
      };

      const url = isEditing ? `/api/requests/${editingRequest.id}` : '/api/requests';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit leave request');
      }

      onSubmitted?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Submission error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="request-modal detailed-request-modal">
        {/* MODAL HEADER */}
        <header className="modal-header">
          <div>
            <div className="eyebrow">
              {isOfficial
                ? (step === 1 ? labels.step1Tag : labels.step2Tag)
                : (step === 1 ? labels.step1Tag : labels.step2Tag)}
            </div>
            <h2>
              {isEditing
                ? (isRejected
                    ? (language === 'si'
                        ? `අඩුපාඩු නිවැරදි කර නැවත ඉදිරිපත් කිරීම · FV-${String(editingRequest.id).padStart(4, '0')}`
                        : `Fix Deficiencies & Resubmit · FV-${String(editingRequest.id).padStart(4, '0')}`)
                    : (language === 'si'
                        ? `අයදුම්පත සංස්කරණය · FV-${String(editingRequest.id).padStart(4, '0')}`
                        : `Edit Application · FV-${String(editingRequest.id).padStart(4, '0')}`))
                : (isOfficial
                    ? (step === 1 ? labels.gen126Title : labels.app16Title)
                    : (step === 1 ? labels.gen126Title : labels.docsHeading))}
            </h2>
            <div className={`modal-leave-tag ${isOfficial ? 'official' : 'personal'}`}>
              {isOfficial ? (
                <>🏛️ {language === 'si' ? 'නිල රාජකාරි සංචාරය · General 126 + Appendix 16' : 'Official Duty · General 126 + Appendix 16'}</>
              ) : (
                <>✈️ {language === 'si' ? 'පෞද්ගලික නිවාඩු · General 126 + උපකාරක ලේඛන' : 'Personal Leave · General 126 + Documents'}</>
              )}
            </div>
            <p style={{ marginTop: '8px' }}>
              {isOfficial
                ? (step === 1 ? labels.step1Notice : labels.step2Notice)
                : (step === 1 ? labels.personalStep1Notice : labels.personalStep2Notice)}
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label={t.close}>
            <X size={19} />
          </button>
        </header>

        {/* STEP WIZARD BAR (SHOWN FOR BOTH PERSONAL AND OFFICIAL LEAVE) */}
        {!isOfficial && (
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
                if (validatePersonalStep1()) setStep(2);
              }}
            >
              <span className="wizard-step-num">2</span>
              <span>2. Upload Documents (උපකාරක ලේඛන)</span>
            </button>
          </div>
        )}

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
            {/* Rejection Deficiencies Callout Banner */}
            {isRejected && (
              <div style={{
                background: '#fef2f2',
                border: '1.5px solid #fca5a5',
                borderRadius: '10px',
                padding: '14px 18px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c', fontWeight: 800, fontSize: '13.5px', marginBottom: '6px' }}>
                  <AlertCircle size={17} />
                  <span>{language === 'si' ? 'ප්‍රතික්ෂේප කිරීමට හේතුව සහ පවතින අඩුපාඩු (Rejection Deficiencies):' : 'Rejection Reason & Deficiencies to Address:'}</span>
                </div>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  color: '#7f1d1d',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  fontWeight: 600
                }}>
                  "{editDetails.rejectionRecord?.reason || editingRequest?.rejection_reason || (language === 'si' ? 'අයදුම්පත අනුමත කර නැත. කරුණාකර අඩුපාඩු නිවැරදි කර නැවත ඉදිරිපත් කරන්න.' : 'Application was not approved. Please correct the shortcomings and resubmit.')}"
                </div>
                {editDetails.rejectionRecord?.rejectedBy && (
                  <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '6px' }}>
                    {language === 'si' ? 'ප්‍රතික්ෂේප කළ නිලධාරී:' : 'Rejected by:'} <strong>{editDetails.rejectionRecord.rejectedBy.name}</strong> ({editDetails.rejectionRecord.rejectedBy.designation || editDetails.rejectionRecord.rejectedBy.role}) · {editDetails.rejectionRecord.date}
                  </div>
                )}
                <div style={{ fontSize: '11.5px', color: '#15803d', marginTop: '8px', fontWeight: 600 }}>
                  💡 {language === 'si' ? 'කරුණාකර ඉහත අඩුපාඩු නිවැරදි කර, අවශ්‍ය තොරතුරු සහ ලේඛන යාවත්කාලීන කර පහත "නැවත ඉදිරිපත් කරන්න" බොත්තම ඔබන්න.' : 'Please correct the deficiencies above, update any information and documents, and click "Resubmit Application" below.'}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* FLOW 1: GENERAL 126 (SHOWN WHEN STEP === 1 FOR BOTH LEAVE TYPES)          */}
            {/* ========================================================================= */}
            {step === 1 && (
              <>
                <div className="step-indicator-banner">
                  <FileText size={16} />
                  <span>{isOfficial ? labels.step1Notice : labels.personalStep1Notice}</span>
                </div>

                {/* 1. OFFICER & SERVICE PARTICULARS */}
                <FormSection
                  title={labels.officerSection}
                  number="126"
                  subtitle="දෙපාර්තමේන්තුව, නිලය හා සේවා විස්තර"
                >
                  <div className="form-field-group">
                    <label className="field-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{labels.department} *</span>
                      <span style={{ fontSize: '10px', color: '#166534', fontWeight: 600, background: '#dcfce7', padding: '1px 6px', borderRadius: '4px' }}>
                        {language === 'si' ? 'ලියාපදිංචි ආයතන' : 'Registered Institutions'}
                      </span>
                    </label>
                    <select
                      value={form.department}
                      onChange={(e) => update('department', e.target.value)}
                      required
                      className="field-input"
                      style={{ height: '38px', width: '100%', background: '#fff', fontSize: '12px' }}
                    >
                      <option value="">{language === 'si' ? '-- දෙපාර්තමේන්තුව / ආයතනය තෝරන්න --' : '-- Select Department / Institution --'}</option>
                      {registeredDepts.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} {d.head_name ? `(${d.head_name})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
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

                {/* 5. DATE OF APPLICATION & SIGNATURE (GEN-126 ITEMS 11 & 12) */}
                {!isOfficial && (
                  <FormSection
                    title={labels.dateAndSignatureSection}
                    number="126"
                    subtitle="11. අයදුම් කළ දිනය සහ 12. ඉල්ලුම්කරුගේ අත්සන"
                  >
                    <InputField
                      name="applicationDate"
                      label={`${labels.applicationDate} *`}
                      value={form.applicationDate}
                      update={update}
                      type="date"
                      required
                    />
                    <div className="field-label span-2">
                      <label className="declaration-field" style={{ margin: '6px 0 0 0' }}>
                        <input
                          type="checkbox"
                          checked={declaration}
                          onChange={(event) => setDeclaration(event.target.checked)}
                        />
                        <span>{labels.declaration} *</span>
                      </label>
                    </div>

                    <div className="signature-field detailed-signature span-2">
                      <div className="signature-title">
                        <span>{labels.signature} *</span>
                        <small>{labels.signatureHint}</small>
                        <button type="button" onClick={() => window.clearSignature?.()}>
                          {labels.clear}
                        </button>
                      </div>
                      <SignaturePad onChange={setSignature} />
                    </div>
                  </FormSection>
                )}
              </>
            )}

            {/* ========================================================================= */}
            {/* FLOW 2: LIVE SUB-DOCUMENT UPLOADS (PERSONAL LEAVE STEP 2)                 */}
            {/* ========================================================================= */}
            {!isOfficial && step === 2 && (
              <>
                <div className="step-indicator-banner">
                  <UploadCloud size={16} />
                  <span>{labels.personalStep2Notice}</span>
                </div>

                <FormSection
                  title={labels.docsHeading}
                  number="PDF"
                  subtitle={labels.docsSubheading}
                >
                  <div className="doc-upload-grid span-2">
                    <FileUploaderCard
                      title={labels.docHeadTitle}
                      subtitle={labels.docHeadDesc}
                      docKey="institutionLetter"
                      doc={form.documents?.institutionLetter}
                      onUpload={handleDocUpload}
                      onRemove={handleDocRemove}
                      onPreview={setPreviewDoc}
                      required={true}
                      labels={labels}
                      icon={Building}
                    />
                    <FileUploaderCard
                      title={labels.docPassportTitle}
                      subtitle={labels.docPassportDesc}
                      docKey="passportImage"
                      doc={form.documents?.passportImage}
                      onUpload={handleDocUpload}
                      onRemove={handleDocRemove}
                      onPreview={setPreviewDoc}
                      required={true}
                      labels={labels}
                      icon={User}
                    />
                    <FileUploaderCard
                      title={labels.docRequestTitle}
                      subtitle={labels.docRequestDesc}
                      docKey="requestLetter"
                      doc={form.documents?.requestLetter}
                      onUpload={handleDocUpload}
                      onRemove={handleDocRemove}
                      onPreview={setPreviewDoc}
                      required={true}
                      labels={labels}
                      icon={FileText}
                    />
                    <FileUploaderCard
                      title={labels.docOtherTitle}
                      subtitle={labels.docOtherDesc}
                      docKey="otherDocuments"
                      doc={form.documents?.otherDocuments}
                      onUpload={handleDocUpload}
                      onRemove={handleDocRemove}
                      onPreview={setPreviewDoc}
                      required={false}
                      labels={labels}
                      icon={Paperclip}
                    />
                  </div>
                </FormSection>
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

            {isRejected && step === 2 && (
              <div style={{
                marginTop: '16px',
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '14px 16px'
              }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  {language === 'si' ? '📝 කළ සංශෝධන පිළිබඳ කෙටි සටහනක් (Notes on Corrections Made):' : '📝 Notes on Corrections Made:'}
                </label>
                <textarea
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  placeholder={language === 'si' ? 'උදා: ප්‍රතික්ෂේප කිරීමට හේතු වූ ලේඛන යාවත්කාලීන කරන ලද අතර අදාළ තොරතුරු සකසන ලදී...' : 'e.g., Attached the requested institutional clearance and updated travel details...'}
                  rows={3}
                  style={{ width: '100%', borderRadius: '6px', border: '1px solid #cbd5e1', padding: '10px', fontSize: '12.5px', resize: 'vertical', boxSizing: 'border-box' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  {language === 'si' ? 'මෙම සටහන අනුමත කරන නිලධාරීන්ට ඔබ කළ සංශෝධන ඉක්මනින් හඳුනා ගැනීමට උපකාරී වේ.' : 'This note helps approving officers quickly verify what deficiencies were resolved.'}
                </span>
              </div>
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
                  {busy ? '…' : (isEditing ? (isRejected ? (language === 'si' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න' : 'Resubmit Application with Corrections') : (language === 'si' ? 'වෙනස්කම් සුරකින්න' : 'Save Changes')) : labels.submitOfficialBtn)}
                  <Check size={15} />
                </button>
              </>
            )}

            {/* Personal Leave Step 1: Next button */}
            {!isOfficial && step === 1 && (
              <button
                type="button"
                className="primary-button"
                onClick={goToPersonalStep2}
              >
                <span>{labels.nextToDocsBtn}</span>
                <ArrowRight size={15} />
              </button>
            )}

            {/* Personal Leave Step 2: Back button + Submit button */}
            {!isOfficial && step === 2 && (
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
                  <span>{labels.backToGen126Btn}</span>
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  disabled={busy}
                >
                  {busy ? '…' : (isEditing ? (isRejected ? (language === 'si' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න' : 'Resubmit Application with Corrections') : (language === 'si' ? 'වෙනස්කම් සුරකින්න' : 'Save Changes')) : labels.submitPersonalBtn)}
                  <Check size={15} />
                </button>
              </>
            )}
          </footer>
        </form>

        {previewDoc && (
          <DocumentPreviewModal
            document={previewDoc}
            onClose={() => setPreviewDoc(null)}
          />
        )}
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

// =========================================================================
// OFFICIAL 9-STAGE WORKFLOW HIERARCHY STEPPER
// Applicant ➔ Head Department ➔ Subject Officer ➔ Assistant Secretary ➔ Senior Assistant Secretary ➔ Additional Secretary ➔ Secretary ➔ President ➔ Applicant (Leave is approved/not approved)
// =========================================================================
export function WorkflowHierarchyStepper({ request, language = 'en' }) {
  if (!request) return null;

  const d = request.details || (request.applicant_name ? request : {});
  const status = request.status || 'Pending';
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const endorsement = d.departmentHeadEndorsement;
  const assessment = d.officerAssessment || d.officerCompleted;
  const secApproval = d.secretaryApproval || clearances.find(c => c.role === 'secretary' || c.decision === 'approve');
  const presDecision = d.presidentialDecision;

  // Determine active step index (0-indexed: 0=Applicant, 1=Dept Head, 2=Subject Officer, 3=Asst Sec, 4=Senior Asst Sec, 5=Addl Sec, 6=Secretary, 7=President, 8=Final Outcome)
  let activeIndex = 0;
  if (status === 'Approved' || status === 'Rejected' || presDecision) {
    activeIndex = 8;
  } else if (status === 'Pending Presidential Approval') {
    activeIndex = 7;
  } else if (status === 'Pending Secretary Approval' || status === 'Pending Official Authorization') {
    activeIndex = 6;
  } else if (status === 'Pending Additional Secretary Review') {
    activeIndex = 5;
  } else if (status === 'Pending Senior Assistant Secretary Review') {
    activeIndex = 4;
  } else if (status === 'Pending Assistant Secretary Review') {
    activeIndex = 3;
  } else if (status === 'Pending Review') {
    activeIndex = 2;
  } else if (status === 'Pending Department Head Approval') {
    activeIndex = 1;
  } else {
    activeIndex = 0;
  }

  const asCl = clearances.find(c => c.role === 'assistant_secretary');
  const sasCl = clearances.find(c => c.role === 'senior_assistant_secretary');
  const adsCl = clearances.find(c => c.role === 'additional_secretary');

  const steps = [
    {
      step: 1,
      id: 'applicant',
      titleEn: 'Applicant',
      titleSi: 'අයදුම්කරු',
      descEn: 'Submission (Gen 126)',
      descSi: 'අයදුම්පත යොමු කිරීම',
      actor: request.applicant_name || d.fullName || 'Applicant',
      date: request.created_at?.slice(0, 10),
      isCompleted: true,
      isActive: false
    },
    {
      step: 2,
      id: 'department_head',
      titleEn: 'Head Department',
      titleSi: 'දෙපාර්තමේන්තු ප්‍රධානී',
      descEn: 'Endorsement (XV 10:1)',
      descSi: 'ආයතනික නිර්දේශය',
      actor: endorsement?.completedBy?.name || (endorsement ? 'Head of Dept' : null),
      date: endorsement?.date,
      isCompleted: Boolean(endorsement) || activeIndex > 1,
      isActive: activeIndex === 1
    },
    {
      step: 3,
      id: 'subject_officer',
      titleEn: 'Subject Officer',
      titleSi: 'විෂයභාර නිලධාරී',
      descEn: 'Leave Classification',
      descSi: 'නිවාඩු වර්ගීකරණය',
      actor: d.officerCompletedBy?.name || clearances.find(c => c.role === 'reviewer')?.userName,
      date: d.officerCompletedAt?.slice(0, 10),
      isCompleted: Boolean(assessment) || activeIndex > 2,
      isActive: activeIndex === 2
    },
    {
      step: 4,
      id: 'assistant_secretary',
      titleEn: 'Assistant Secretary',
      titleSi: 'සහකාර ලේකම්',
      descEn: '1st Tier Review',
      descSi: 'පළමු පෙළ සටහන',
      actor: asCl?.userName,
      date: asCl?.date,
      isCompleted: Boolean(asCl) || activeIndex > 3,
      isActive: activeIndex === 3
    },
    {
      step: 5,
      id: 'senior_assistant_secretary',
      titleEn: 'Senior Assistant Secretary',
      titleSi: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්',
      descEn: 'Senior Secretariat Minute',
      descSi: 'ජ්‍යෙෂ්ඨ අමාත්‍යාංශ සටහන',
      actor: sasCl?.userName,
      date: sasCl?.date,
      isCompleted: Boolean(sasCl) || activeIndex > 4,
      isActive: activeIndex === 4
    },
    {
      step: 6,
      id: 'additional_secretary',
      titleEn: 'Additional Secretary',
      titleSi: 'අතිරේක ලේකම්',
      descEn: 'Divisional Clearance',
      descSi: 'අංශ සමාලෝචනය',
      actor: adsCl?.userName,
      date: adsCl?.date,
      isCompleted: Boolean(adsCl) || activeIndex > 5,
      isActive: activeIndex === 5
    },
    {
      step: 7,
      id: 'secretary',
      titleEn: 'Secretary',
      titleSi: 'අමාත්‍යාංශ ලේකම්',
      descEn: 'Leave Approval & Submission',
      descSi: 'අනුමත ලිපිය හා ඉදිරිපත් කිරීම',
      actor: secApproval?.userName || secApproval?.signatoryName || (status === 'Approved' ? 'වරුෂණ ශ්‍රී ධනපාල' : null),
      date: secApproval?.date || secApproval?.timestamp?.slice(0, 10),
      isCompleted: Boolean(secApproval) || activeIndex > 6,
      isActive: activeIndex === 6
    },
    {
      step: 8,
      id: 'president',
      titleEn: 'President',
      titleSi: 'ගරු ජනාධිපතිතුමා',
      descEn: 'Constitutional Executive Order',
      descSi: 'අවසාන විධායක නියෝගය',
      actor: presDecision?.userName || (presDecision ? 'අතිගරු ජනාධිපතිතුමා' : null),
      date: presDecision?.date,
      isCompleted: Boolean(presDecision) || status === 'Approved' || status === 'Rejected',
      isActive: activeIndex === 7
    },
    {
      step: 9,
      id: 'applicant_outcome',
      titleEn: 'Applicant',
      titleSi: 'අයදුම්කරු',
      descEn: status === 'Approved' ? 'Leave is approved' : status === 'Rejected' ? 'Leave is not approved' : 'Decision Pending',
      descSi: status === 'Approved' ? 'නිවාඩුව අනුමතයි' : status === 'Rejected' ? 'නිවාඩු අනුමත නැත' : 'තීරණය අපේක්ෂාවෙන්',
      actor: status === 'Approved' ? '✓ APPROVED' : status === 'Rejected' ? '✕ NOT APPROVED' : null,
      date: presDecision?.date || request.updated_at?.slice(0, 10),
      isCompleted: status === 'Approved' || status === 'Rejected',
      isActive: activeIndex === 8,
      isOutcome: true,
      isApproved: status === 'Approved',
      isRejected: status === 'Rejected'
    }
  ];

  const currentStep = steps[activeIndex] || steps[0];
  const isApproved = status === 'Approved';
  const isRejected = status === 'Rejected';

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #cbd5e1',
      borderRadius: '10px',
      padding: '16px 18px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
    }}>
      {/* Stepper Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scale size={18} style={{ color: '#2563eb' }} />
          <div>
            <strong style={{ fontSize: '13px', color: '#0f172a' }}>
              {language === 'si' ? 'නිල අනුමැති ධුරාවලිය (Official Approval Hierarchy)' : 'Official Approval Hierarchy'}
            </strong>
          </div>
        </div>

        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: isApproved ? '#dcfce7' : isRejected ? '#fee2e2' : '#eff6ff',
          color: isApproved ? '#15803d' : isRejected ? '#b91c1c' : '#1d4ed8',
          border: `1px solid ${isApproved ? '#86efac' : isRejected ? '#fca5a5' : '#93c5fd'}`
        }}>
          {isApproved ? (
            <span>✓ {language === 'si' ? 'පියවර 9/9: නිවාඩුව අනුමතයි (Leave is approved)' : 'Step 9/9: Leave is approved'}</span>
          ) : isRejected ? (
            <span>✕ {language === 'si' ? 'පියවර 9/9: නිවාඩු අනුමත නැත (Leave is not approved)' : 'Step 9/9: Leave is not approved'}</span>
          ) : (
            <span>
              ⚡ {language === 'si'
                ? `පියවර ${currentStep.step} / 9: ${currentStep.titleSi} (දැන් පවතින පියවර)`
                : `Step ${currentStep.step} of 9: ${currentStep.titleEn} (In Progress)`}
            </span>
          )}
        </div>
      </div>

      {/* Exact User Prompt Hierarchy Breadcrumb Chain */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        padding: '8px 12px',
        marginBottom: '16px',
        fontSize: '11px',
        color: '#475569',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <span style={{ fontWeight: 700, color: '#334155', marginRight: '6px' }}>
          {language === 'si' ? 'ධුරාවලි පෙළගැස්ම:' : 'Workflow Chain:'}
        </span>
        {steps.map((s, idx) => {
          const isCurrent = s.isActive;
          const isDone = s.isCompleted && !isCurrent;
          return (
            <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontWeight: isCurrent ? 800 : isDone ? 600 : 500,
                color: isCurrent ? '#1d4ed8' : isDone ? '#15803d' : '#64748b',
                background: isCurrent ? '#dbeafe' : 'transparent',
                padding: isCurrent ? '2px 8px' : '0 2px',
                borderRadius: '4px',
                border: isCurrent ? '1px solid #93c5fd' : 'none'
              }}>
                {s.titleEn}
                {s.isOutcome ? ` (${status === 'Approved' ? 'Leave is approved' : status === 'Rejected' ? 'Leave is not approved' : 'Leave is approved/not approved'})` : ''}
              </span>
              {idx < steps.length - 1 && (
                <span style={{ margin: '0 6px', color: '#94a3b8', fontWeight: 'bold' }}>➔</span>
              )}
            </span>
          );
        })}
      </div>

      {/* Horizontal Interactive Stepper Track */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollbarWidth: 'thin'
      }}>
        {steps.map((s, idx) => {
          const isCurrent = s.isActive;
          const isDone = s.isCompleted && !isCurrent;
          const isLast = idx === steps.length - 1;

          let badgeBg = '#f1f5f9';
          let badgeColor = '#64748b';
          let badgeBorder = '#cbd5e1';

          if (s.isOutcome) {
            if (s.isApproved) {
              badgeBg = '#16a34a';
              badgeColor = '#ffffff';
              badgeBorder = '#15803d';
            } else if (s.isRejected) {
              badgeBg = '#dc2626';
              badgeColor = '#ffffff';
              badgeBorder = '#b91c1c';
            } else if (isCurrent) {
              badgeBg = '#2563eb';
              badgeColor = '#ffffff';
              badgeBorder = '#1d4ed8';
            }
          } else if (isDone) {
            badgeBg = '#16a34a';
            badgeColor = '#ffffff';
            badgeBorder = '#15803d';
          } else if (isCurrent) {
            badgeBg = '#2563eb';
            badgeColor = '#ffffff';
            badgeBorder = '#1d4ed8';
          }

          return (
            <div
              key={s.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '124px',
                position: 'relative',
                flexShrink: 0,
                textAlign: 'center'
              }}
            >
              {/* Top Connector Line */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: '8px'
              }}>
                <div style={{
                  flex: 1,
                  height: '3px',
                  background: idx === 0 ? 'transparent' : (steps[idx - 1]?.isCompleted ? '#16a34a' : '#e2e8f0')
                }} />

                {/* Circular Badge */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: badgeBg,
                  color: badgeColor,
                  border: `2px solid ${badgeBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 800,
                  boxShadow: isCurrent ? '0 0 0 4px rgba(37, 99, 235, 0.2)' : 'none',
                  flexShrink: 0,
                  zIndex: 2,
                  transition: 'all 0.2s ease'
                }}>
                  {s.isOutcome ? (
                    s.isApproved ? '✓✓' : s.isRejected ? '✕' : '9'
                  ) : isDone ? (
                    <Check size={14} />
                  ) : isCurrent ? (
                    <Clock size={13} />
                  ) : (
                    s.step
                  )}
                </div>

                <div style={{
                  flex: 1,
                  height: '3px',
                  background: isLast ? 'transparent' : (s.isCompleted ? '#16a34a' : '#e2e8f0')
                }} />
              </div>

              {/* Step Title & Subtitle */}
              <div style={{ padding: '0 4px' }}>
                <div style={{
                  fontSize: '11.5px',
                  fontWeight: isCurrent ? 800 : isDone ? 700 : 600,
                  color: isCurrent ? '#1d4ed8' : isDone ? '#0f172a' : '#64748b',
                  lineHeight: 1.25,
                  marginBottom: '2px'
                }}>
                  {language === 'si' ? s.titleSi : s.titleEn}
                </div>

                <div style={{
                  fontSize: '10px',
                  color: isCurrent ? '#2563eb' : isDone ? '#059669' : '#94a3b8',
                  lineHeight: 1.2
                }}>
                  {language === 'si' ? s.descSi : s.descEn}
                </div>

                {s.actor && (
                  <div style={{
                    fontSize: '9.5px',
                    color: isDone ? '#166534' : '#64748b',
                    background: isDone ? '#f0fdf4' : '#f8fafc',
                    border: `1px solid ${isDone ? '#bbf7d0' : '#e2e8f0'}`,
                    borderRadius: '4px',
                    padding: '1px 4px',
                    marginTop: '4px',
                    maxWidth: '118px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }} title={s.actor}>
                    {isDone ? `✓ ${s.actor}` : s.actor}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// HIERARCHY STATUS INFO HELPER
// Maps any application state to the exact 9-stage workflow hierarchy step
// =========================================================================
export function getHierarchyStatusInfo(request, language = 'en') {
  if (!request) {
    return {
      step: 1,
      total: 9,
      percent: 11,
      stepId: 'applicant',
      title: language === 'si' ? 'අයදුම්කරු යොමු කිරීම' : 'Applicant Submission',
      titleEn: 'Applicant Submission',
      titleSi: 'අයදුම්කරු යොමු කිරීම',
      desk: language === 'si' ? 'අයදුම්පත ඉදිරිපත් කරන ලදී' : 'Application submitted',
      deskEn: 'Application submitted',
      deskSi: 'අයදුම්පත ඉදිරිපත් කරන ලදී',
      nextDesk: language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානී' : 'Head of Department',
      nextDeskEn: 'Head of Department',
      nextDeskSi: 'දෙපාර්තමේන්තු ප්‍රධානී',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#93c5fd',
      isApproved: false,
      isRejected: false,
      isCompleted: false,
      statusText: language === 'si' ? 'පියවර 1/9: යොමු කරන ලදී' : 'Step 1/9: Submitted',
    };
  }

  const d = request.details || (request.applicant_name ? request : {});
  const status = request.status || 'Pending';
  const isApproved = status === 'Approved';
  const isRejected = status === 'Rejected';

  let step = 1;
  let percent = 11;
  let stepId = 'applicant';
  let titleEn = 'Applicant Submission';
  let titleSi = 'අයදුම්කරු (සාමාන්‍ය 126 අයදුම්පත ඉදිරිපත් කිරීම)';
  let deskEn = 'General 126 leave application submitted by applicant.';
  let deskSi = 'අයදුම්කරු විසින් සාමාන්‍ය 126 අයදුම්පත පද්ධතියට ඉදිරිපත් කර ඇත.';
  let nextDeskEn = 'Head of Department (Est. Code XV 10:1 Endorsement)';
  let nextDeskSi = 'දෙපාර්තමේන්තු ප්‍රධානී (ආයතන සංග්‍රහය XV 10:1 නිර්දේශය)';
  let color = '#2563eb';
  let bg = '#eff6ff';
  let border = '#93c5fd';

  if (isApproved) {
    step = 9;
    percent = 100;
    stepId = 'applicant_outcome';
    titleEn = 'Leave is approved (Approved by President)';
    titleSi = 'නිවාඩුව අනුමතයි (අතිගරු ජනාධිපතිතුමා විසින් අනුමත කරන ලදී)';
    deskEn = 'Final constitutional executive order granted: "නිවාඩුව අනුමත කරමි". Official travel authorized.';
    deskSi = 'අතිගරු ජනාධිපතිතුමා විසින් "නිවාඩුව අනුමත කරමි" යනුවෙන් නිවාඩු අනුමැතිය ලබා දී ඇත. විදේශ සංචාරය නිල වශයෙන් වලංගු වේ.';
    nextDeskEn = 'Application completed · Official travel authorized';
    nextDeskSi = 'ක්‍රියාවලිය සාර්ථකව අවසන් · විදේශ සංචාරය අනුමතයි';
    color = '#15803d';
    bg = '#dcfce7';
    border = '#86efac';
  } else if (isRejected) {
    step = 9;
    percent = 100;
    stepId = 'applicant_outcome';
    titleEn = 'Leave is not approved';
    titleSi = 'නිවාඩු අනුමත නැත (Leave is not approved)';
    deskEn = 'Application not approved by the Presidential Secretariat / Ministry ("නිවාඩු අනුමත නොකරමි").';
    deskSi = 'අතිගරු ජනාධිපතිතුමා / අමාත්‍යාංශය මඟින් "නිවාඩු අනුමත නොකරමි" යනුවෙන් තීරණය කර ඇත.';
    nextDeskEn = 'Application concluded';
    nextDeskSi = 'අයදුම්පතේ ක්‍රියාවලිය අවසන්';
    color = '#b91c1c';
    bg = '#fee2e2';
    border = '#fca5a5';
  } else if (status === 'Pending Presidential Approval') {
    step = 8;
    percent = 88;
    stepId = 'president';
    titleEn = 'Hon. President (Final Executive Order)';
    titleSi = 'ගරු ජනාධිපතිතුමා (අවසාන විධායක නියෝගය)';
    deskEn = 'Currently submitted to Hon. President for constitutional executive order ("නිවාඩුව අනුමත කරමි / නිවාඩු අනුමත නොකරමි").';
    deskSi = 'අතිගරු ජනාධිපතිතුමාගේ අවසාන විධායක නියෝගය ("නිවාඩුව අනුමත කරමි / නිවාඩු අනුමත නොකරමි") සඳහා ජනාධිපති ලේකම් කාර්යාලය වෙත ඉදිරිපත් කර ඇත.';
    nextDeskEn = 'Applicant (Final Leave Outcome)';
    nextDeskSi = 'අයදුම්කරු (අවසාන තීරණය දැනුම් දීම)';
    color = '#7c3aed';
    bg = '#f5f3ff';
    border = '#c4b5fd';
  } else if (status === 'Pending Secretary Approval' || status === 'Pending Official Authorization') {
    step = 7;
    percent = 77;
    stepId = 'secretary';
    titleEn = 'Ministry Secretary (Leave Approval & Submission to President)';
    titleSi = 'අමාත්‍යාංශ ලේකම් (නිවාඩු නිර්දේශය හා ජනාධිපතිතුමා වෙත ඉදිරිපත් කිරීම)';
    deskEn = 'Currently with the Ministry Secretary to sign official leave approval under Est. Code XV 10:1 Part 2 and submit to Hon. President.';
    deskSi = 'ආයතන සංග්‍රහය XV 10:1 (II) කොටස යටතේ නිවාඩු අනුමත කර අතිගරු ජනාධිපතිතුමා වෙත ඉදිරිපත් කිරීමට අමාත්‍යාංශ ලේකම් වෙත යොමු කර ඇත.';
    nextDeskEn = 'Hon. President (Presidential Secretariat)';
    nextDeskSi = 'ගරු ජනාධිපතිතුමා (ජනාධිපති ලේකම් කාර්යාලය)';
    color = '#0284c7';
    bg = '#f0f9ff';
    border = '#7dd3fc';
  } else if (status === 'Pending Additional Secretary Review') {
    step = 6;
    percent = 66;
    stepId = 'additional_secretary';
    titleEn = 'Additional Secretary Review';
    titleSi = 'අතිරේක ලේකම් (අංශ සමාලෝචනය)';
    deskEn = 'Currently with the Additional Secretary for divisional assessment and administrative minute.';
    deskSi = 'අංශ සමාලෝචනය හා අමාත්‍යාංශ සටහන් තැබීම සඳහා අතිරේක ලේකම් වෙත යොමු කර ඇත.';
    nextDeskEn = 'Ministry Secretary';
    nextDeskSi = 'අමාත්‍යාංශ ලේකම්';
    color = '#0d9488';
    bg = '#f0fdfa';
    border = '#99f6e4';
  } else if (status === 'Pending Senior Assistant Secretary Review') {
    step = 5;
    percent = 55;
    stepId = 'senior_assistant_secretary';
    titleEn = 'Senior Assistant Secretary Review';
    titleSi = 'ජ්‍යෙෂ්ඨ සහකාර ලේකම් (ජ්‍යෙෂ්ඨ සටහන් හා නිරීක්ෂණ)';
    deskEn = 'Currently with Senior Assistant Secretary for ministerial assessment and note.';
    deskSi = 'අමාත්‍යාංශ සටහන් හා නිර්දේශ ඇගයීම සඳහා ජ්‍යෙෂ්ඨ සහකාර ලේකම් වෙත යොමු කර ඇත.';
    nextDeskEn = 'Additional Secretary';
    nextDeskSi = 'අතිරේක ලේකම්';
    color = '#0284c7';
    bg = '#f0f9ff';
    border = '#7dd3fc';
  } else if (status === 'Pending Assistant Secretary Review') {
    step = 4;
    percent = 44;
    stepId = 'assistant_secretary';
    titleEn = 'Assistant Secretary Review';
    titleSi = 'සහකාර ලේකම් (පළමු පෙළ සමාලෝචනය)';
    deskEn = 'Currently with Assistant Secretary for 1st tier ministry review and observations.';
    deskSi = 'පළමු පෙළ අමාත්‍යාංශ සමාලෝචනය හා නිරීක්ෂණ සඳහා සහකාර ලේකම් වෙත යොමු කර ඇත.';
    nextDeskEn = 'Senior Assistant Secretary';
    nextDeskSi = 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්';
    color = '#2563eb';
    bg = '#eff6ff';
    border = '#93c5fd';
  } else if (status === 'Pending Review') {
    step = 3;
    percent = 33;
    stepId = 'subject_officer';
    titleEn = 'Subject Officer (Assessment & Note Sheet)';
    titleSi = 'විෂයභාර නිලධාරී (නිවාඩු වර්ගීකරණය හා අවසර පත්‍රිකාව)';
    deskEn = 'Currently with Subject Officer to verify leave balance, prepare For Office Use Only particulars and Note Sheet (අවසර පත්‍රිකාව).';
    deskSi = 'නිවාඩු ශේෂය පරීක්ෂා කර "For Office Use Only" විස්තර හා අවසර පත්‍රිකාව (Note Sheet) සැකසීම සඳහා විෂයභාර නිලධාරී වෙත යොමු කර ඇත.';
    nextDeskEn = 'Assistant Secretary';
    nextDeskSi = 'සහකාර ලේකම්';
    color = '#d97706';
    bg = '#fffbeb';
    border = '#fde68a';
  } else if (status === 'Pending Department Head Approval') {
    step = 2;
    percent = 22;
    stepId = 'department_head';
    titleEn = 'Head of Department Endorsement';
    titleSi = 'දෙපාර්තමේන්තු ප්‍රධානී (ආයතනික නිර්දේශය)';
    deskEn = 'Currently with Head of Department for institutional endorsement under Establishments Code Chapter XV Section 10:1.';
    deskSi = 'ආයතන සංග්‍රහයේ XV පරිච්ඡේදයේ 10:1 වගන්තිය අනුව දෙපාර්තමේන්තු ප්‍රධානියාගේ ආයතනික නිර්දේශය ලබා ගැනීම සඳහා යොමු කර ඇත.';
    nextDeskEn = 'Subject Officer (Leave Entitlement Assessment)';
    nextDeskSi = 'විෂයභාර නිලධාරී (නිවාඩු වර්ගීකරණය)';
    color = '#ea580c';
    bg = '#fff7ed';
    border = '#fed7aa';
  }

  return {
    step,
    total: 9,
    percent,
    stepId,
    title: language === 'si' ? titleSi : titleEn,
    titleEn,
    titleSi,
    desk: language === 'si' ? deskSi : deskEn,
    deskEn,
    deskSi,
    nextDesk: language === 'si' ? nextDeskSi : nextDeskEn,
    nextDeskEn,
    nextDeskSi,
    color,
    bg,
    border,
    isApproved,
    isRejected,
    isCompleted: isApproved || isRejected,
    statusText: language === 'si'
      ? (isApproved ? 'අනුමතයි' : isRejected ? 'අනුමත නැත' : `පියවර ${step}/9: ක්‍රියාත්මකයි`)
      : (isApproved ? 'Approved' : isRejected ? 'Not Approved' : `Step ${step}/9: In Progress`)
  };
}

// =========================================================================
// LIVE APPLICATION PROCESS TRACKER FOR APPLICANTS
// Displays immediately when applicant submits or logs in
// =========================================================================
export function ApplicantLiveProcessTracker({
  request,
  language = 'en',
  onOpenDetail,
  allRequests = [],
  selectedRequestId,
  onSelectRequestId,
  onNewRequest,
  onEditRequest,
  onDeleteRequest,
  onRejectRequest,
  user,
  token
}) {
  if (!request && (!allRequests || allRequests.length === 0)) {
    return (
      <div style={{
        background: '#ffffff',
        border: '1.5px dashed #93c5fd',
        borderRadius: '12px',
        padding: '24px 20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#eff6ff',
          color: '#2563eb',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px'
        }}>
          <Scale size={24} />
        </div>
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
          {language === 'si' ? 'සජීවී අයදුම්පත් ක්‍රියාවලි නිරීක්ෂකය (Live Application Process Tracker)' : 'Live Application Process Tracker'}
        </h3>
        <p style={{ fontSize: '12.5px', color: '#64748b', maxWidth: '560px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
          {language === 'si'
            ? 'ඔබ විදේශ නිවාඩු අයදුම්පතක් ඉදිරිපත් කළ පසු, පියවර 9කින් යුත් නිල අනුමත ධුරාවලිය ඔස්සේ එහි සජීවී ප්‍රගතිය මෙතැනින් නැරඹිය හැක.'
            : 'Once you submit a foreign leave application, its real-time progress across all 9 hierarchy stages will appear here.'}
        </p>
        {onNewRequest && (
          <button
            type="button"
            className="primary-button"
            onClick={onNewRequest}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}
          >
            <Plus size={15} />
            <span>{language === 'si' ? 'නව නිවාඩු අයදුම්පතක් ඉදිරිපත් කරන්න' : 'Submit New Leave Application'}</span>
          </button>
        )}
      </div>
    );
  }

  // Active request to track
  const activeReq = request || (allRequests && allRequests.length > 0 ? allRequests[0] : null);
  if (!activeReq) return null;

  const info = getHierarchyStatusInfo(activeReq, language);
  const d = activeReq.details || (activeReq.applicant_name ? activeReq : {});
  const isOfficial = activeReq.leave_type === 'Official duty' || d.leaveType === 'Official duty' || d.leaveCategory === 'Official duty';
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const hasDeptHeadPart = Boolean(d.departmentHeadEndorsement && (d.departmentHeadEndorsement.signature || d.departmentHeadEndorsement.myNo));
  const hasOfficeUsePart = Boolean(d.officerCompleted || d.officerAssessment?.total || d.officerSignature);
  const hasSecretaryPart = Boolean(
    d.secretaryApproval?.signature ||
    d.secretaryApproval?.signatoryName ||
    d.secretaryApproval?.letterNumber ||
    d.secretaryApproval?.signedAt ||
    clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
    (activeReq.status === 'Approved' || activeReq.status === 'Pending Presidential Approval')
  );

  return (
    <div style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      border: `1.5px solid ${info.isApproved ? '#86efac' : info.isRejected ? '#fca5a5' : '#bfdbfe'}`,
      borderRadius: '12px',
      padding: '20px 22px',
      marginBottom: '24px',
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
      position: 'relative'
    }}>
      {/* Top Banner Row: Brand / Tracker Title + Application Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: info.bg,
              color: info.color,
              border: `1px solid ${info.border}`
            }}>
              <Scale size={16} />
            </span>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span>{language === 'si' ? 'සජීවී අයදුම්පත් ක්‍රියාවලි තත්ත්වය' : 'Live Application Process Tracker'}</span>
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: info.color,
                  background: info.bg,
                  border: `1px solid ${info.border}`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: info.color,
                    display: 'inline-block'
                  }} />
                  {info.statusText}
                </span>
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748b', margin: '2px 0 0 0' }}>
                {language === 'si'
                  ? 'නිල අනුමත ධුරාවලිය ඔස්සේ ඔබේ අයදුම්පතේ වත්මන් පියවර සහ ඉදිරි අදියර සජීවීව නිරීක්ෂණය කරන්න'
                  : 'Track your application status through the official 9-stage approval hierarchy'}
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Application Switcher if multiple applications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {allRequests && allRequests.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
                {language === 'si' ? 'අයදුම්පත තෝරන්න:' : 'Select Application:'}
              </span>
              <select
                value={activeReq.id}
                onChange={(e) => onSelectRequestId && onSelectRequestId(Number(e.target.value))}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                {allRequests.map((r) => {
                  const rInfo = getHierarchyStatusInfo(r, language);
                  return (
                    <option key={r.id} value={r.id}>
                      FV-{String(r.id).padStart(4, '0')} · {r.destination} ({language === 'si' ? `පියවර ${rInfo.step}/9` : `Step ${rInfo.step}/9`})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {onOpenDetail && (
            <button
              type="button"
              className="primary-button"
              onClick={() => onOpenDetail(activeReq)}
              style={{
                height: '32px',
                padding: '0 12px',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '6px'
              }}
            >
              <span>{language === 'si' ? 'සම්පූර්ණ විස්තර බලන්න' : 'View Full Details'}</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Highlights Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px 14px',
        marginBottom: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '12px',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
            {language === 'si' ? 'අයදුම්පත් අංකය' : 'Application Ref'}
          </span>
          <strong style={{ fontSize: '14px', color: '#1e40af' }}>
            FV-{String(activeReq.id).padStart(4, '0')}
          </strong>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
            {language === 'si' ? 'ගමනාන්තය' : 'Destination'}
          </span>
          <strong style={{ fontSize: '13px', color: '#0f172a' }}>
            ✈️ {activeReq.destination}
          </strong>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
            {language === 'si' ? 'දිනයන්' : 'Travel Dates'}
          </span>
          <strong style={{ fontSize: '12px', color: '#334155' }}>
            {activeReq.start_date} → {activeReq.end_date}
          </strong>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
            {language === 'si' ? 'නිවාඩු වර්ගය' : 'Leave Category'}
          </span>
          <span className={`modal-leave-tag ${isOfficial ? 'official' : 'personal'}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
            {isOfficial
              ? (language === 'si' ? '🏛️ නිල සංචාරය' : '🏛️ Official Duty')
              : (language === 'si' ? '✈️ පෞද්ගලික නිවාඩු' : '✈️ Personal Leave')}
          </span>
        </div>

        {/* Progress Percent */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
              {language === 'si' ? 'සමස්ත ප්‍රගතිය' : 'Overall Progress'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: info.color }}>
              {info.percent}%
            </span>
          </div>
          <div style={{
            height: '8px',
            background: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${info.percent}%`,
              height: '100%',
              background: info.isApproved
                ? 'linear-gradient(90deg, #16a34a, #22c55e)'
                : info.isRejected
                ? '#dc2626'
                : 'linear-gradient(90deg, #2563eb, #3b82f6)',
              borderRadius: '4px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Rejection & Deficiencies Alert Card with Resubmit CTA */}
      {info.isRejected && (
        <div style={{
          background: '#fef2f2',
          border: '1.5px solid #f87171',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '16px',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ flex: '1 1 320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c', fontWeight: 800, fontSize: '13.5px' }}>
                <AlertCircle size={18} />
                <span>{language === 'si' ? 'අයදුම්පත ප්‍රතික්ෂේප කර ඇත · අඩුපාඩු විස්තරය (Rejection Deficiencies):' : 'Application Rejected · Deficiencies / Shortcomings:'}</span>
              </div>
              <div style={{
                marginTop: '8px',
                background: '#ffffff',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#7f1d1d',
                fontSize: '13px',
                lineHeight: '1.5',
                fontWeight: 600
              }}>
                "{d.rejectionRecord?.reason || activeReq.rejection_reason || (language === 'si' ? 'විස්තර ලබා දී නොමැත.' : 'No rejection reason specified.')}"
              </div>
              {d.rejectionRecord?.rejectedBy && (
                <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '6px' }}>
                  {language === 'si' ? 'ප්‍රතික්ෂේප කළ නිලධාරී:' : 'Rejected by:'} <strong>{d.rejectionRecord.rejectedBy.name}</strong> ({d.rejectionRecord.rejectedBy.designation || d.rejectionRecord.rejectedBy.role}) · {d.rejectionRecord.date}
                </div>
              )}
              <div style={{ fontSize: '12px', color: '#047857', marginTop: '8px', fontWeight: 600 }}>
                💡 {language === 'si' ? 'ඔබට ඉහත අඩුපාඩු නිවැරදි කර, අවශ්‍ය තොරතුරු සහ ලේඛන යාවත්කාලීන කර මෙම අයදුම්පත නැවත සමාලෝචනය සඳහා ඉදිරිපත් කළ හැක.' : 'You can correct the shortcomings mentioned above and resubmit this application for re-evaluation.'}
              </div>
            </div>

            {(user?.role === 'admin' || user?.id === activeReq.applicant_id || user?.role === 'applicant') && onEditRequest && (
              <button
                type="button"
                onClick={() => onEditRequest(activeReq)}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: '#ffffff',
                  padding: '10px 18px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Edit3 size={15} />
                <span>{language === 'si' ? 'අඩුපාඩු හදලා නැවත ඉදිරිපත් කරන්න (Fix & Resubmit)' : 'Fix Shortcomings & Resubmit'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Current Stage Desk Box */}
      <div style={{
        background: info.bg,
        border: `1.5px solid ${info.border}`,
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: info.color,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 800,
            flexShrink: 0
          }}>
            {info.isApproved ? '✓' : info.isRejected ? '✕' : `${info.step}/9`}
          </div>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 800, color: info.color }}>
              {language === 'si' ? `පියවර ${info.step} / 9 · වත්මන් ක්‍රියාවලි අදියර` : `Step ${info.step} of 9 · Current Workflow Stage`}
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              {info.title}
            </div>
            <div style={{ fontSize: '12px', color: '#334155', marginTop: '3px', lineHeight: 1.4 }}>
              {info.desk}
            </div>
          </div>
        </div>

        {!info.isCompleted && (
          <div style={{
            background: '#ffffff',
            border: `1px solid ${info.border}`,
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '11px',
            color: '#475569'
          }}>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>
              {language === 'si' ? 'ඊළඟ පියවර: ' : 'Next Stage: '}
            </span>
            <span>➔ {info.nextDesk}</span>
          </div>
        )}
      </div>

      {/* The 9-Stage Stepper Track */}
      <WorkflowHierarchyStepper request={activeReq} language={language} />

      {/* Bottom Download Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        paddingTop: '8px',
        borderTop: '1px solid #f1f5f9'
      }}>
        {/* Download ZIP Package Button (All 7 Documents) */}
        <button
          type="button"
          className="secondary-button"
          onClick={() => downloadApplicationZip(activeReq, token)}
          title={language === 'si' ? `සම්පූර්ණ ලේඛන 7ම අඩංගු ZIP ගොනුව බාගන්න (FV-${String(activeReq.id).padStart(4, '0')}.zip)` : `Download Complete 7-Document ZIP Package (FV-${String(activeReq.id).padStart(4, '0')}.zip)`}
          style={{
            height: '30px',
            padding: '0 10px',
            fontSize: '11px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            borderColor: '#3b82f6',
            background: '#eff6ff',
            color: '#1d4ed8',
            fontWeight: 700
          }}
        >
          <FolderArchive size={13} />
          <span>{language === 'si' ? `ZIP බාගන්න (FV-${String(activeReq.id).padStart(4, '0')}.zip)` : `Download ZIP (FV-${String(activeReq.id).padStart(4, '0')}.zip)`}</span>
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => printGeneral126Pdf(activeReq)}
          style={{ height: '30px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
        >
          <FileDown size={13} />
          <span>{language === 'si' ? 'General 126 PDF' : 'General 126 PDF'}</span>
        </button>

        {hasDeptHeadPart && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => printDepartmentHeadLetterPdf(activeReq)}
            style={{ height: '30px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <FileDown size={13} />
            <span>{language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානී ලිපිය PDF' : 'Dept Head Letter PDF'}</span>
          </button>
        )}

        {hasOfficeUsePart && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => printOfficeUseOnlyPdf(activeReq)}
            style={{ height: '30px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <FileDown size={13} />
            <span>{language === 'si' ? 'නිවාඩු විස්තර (Office Use) PDF' : 'Leave Particulars PDF'}</span>
          </button>
        )}

        {hasSecretaryPart && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => printSecretaryApprovalLetterPdf(activeReq)}
            style={{
              height: '30px',
              padding: '0 10px',
              fontSize: '11px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderColor: '#86efac',
              background: '#f0fdf4',
              color: '#15803d',
              fontWeight: 700
            }}
          >
            <FileDown size={13} />
            <span>{language === 'si' ? 'අනුමත ලිපිය PDF (Approval Letter)' : 'Approval Letter PDF'}</span>
          </button>
        )}

        {/* Edit / Resubmit Button */}
        {(user?.role === 'admin' || ((user?.id === activeReq.applicant_id || user?.role === 'applicant') && ['Pending Department Head Approval', 'Pending Review', 'Returned', 'Rejected'].includes(activeReq.status))) && onEditRequest && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => onEditRequest(activeReq)}
            title={language === 'si' ? (activeReq.status === 'Rejected' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න' : 'අයදුම්පත සංස්කරණය කරන්න') : (activeReq.status === 'Rejected' ? 'Fix Deficiencies & Resubmit' : 'Edit Application')}
            style={{
              height: '30px',
              padding: '0 10px',
              fontSize: '11px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderColor: activeReq.status === 'Rejected' ? '#f87171' : '#93c5fd',
              background: activeReq.status === 'Rejected' ? '#fef2f2' : '#eff6ff',
              color: activeReq.status === 'Rejected' ? '#b91c1c' : '#1d4ed8',
              fontWeight: 700
            }}
          >
            <Edit3 size={13} />
            <span>{language === 'si' ? (activeReq.status === 'Rejected' ? 'අඩුපාඩු හදන්න (Fix & Resubmit)' : 'සංස්කරණය (Edit)') : (activeReq.status === 'Rejected' ? 'Fix & Resubmit' : 'Edit')}</span>
          </button>
        )}

        {/* Delete Button */}
        {(user?.role === 'admin' || ((user?.id === activeReq.applicant_id || user?.role === 'applicant') && ['Pending Department Head Approval', 'Pending Review', 'Returned', 'Rejected'].includes(activeReq.status))) && onDeleteRequest && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => onDeleteRequest(activeReq)}
            style={{
              height: '30px',
              padding: '0 10px',
              fontSize: '11px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderColor: '#fca5a5',
              background: '#fef2f2',
              color: '#dc2626',
              fontWeight: 600
            }}
          >
            <Trash2 size={13} />
            <span>{language === 'si' ? 'මකා දමන්න' : 'Delete'}</span>
          </button>
        )}

        {/* Reject Button (for Reviewers / Authorities / Admin) */}
        {!['Approved', 'Rejected'].includes(activeReq.status) && ['department_head', 'reviewer', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'minister', 'president', 'admin'].includes(user?.role) && onRejectRequest && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => onRejectRequest(activeReq)}
            style={{
              height: '30px',
              padding: '0 10px',
              fontSize: '11px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderColor: '#fca5a5',
              background: '#fee2e2',
              color: '#b91c1c',
              fontWeight: 700
            }}
          >
            <AlertCircle size={13} />
            <span>{language === 'si' ? 'ප්‍රතික්ෂේප කරන්න (Reject)' : 'Reject'}</span>
          </button>
        )}

        {onOpenDetail && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => onOpenDetail(activeReq)}
            style={{ height: '30px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <Eye size={13} />
            <span>{language === 'si' ? 'විස්තර බලන්න' : 'View Details'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// DELETE CONFIRMATION MODAL
// =========================================================================
export function DeleteConfirmModal({
  request,
  language = 'en',
  token,
  onClose,
  onDeleted
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!request) return null;

  async function handleDelete() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/requests/${request.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete request.');
      onDeleted?.(request);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete request.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        width: 'min(460px, 94%)',
        padding: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1.5px solid #fee2e2'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Trash2 size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
              {language === 'si' ? 'අයදුම්පත මකා දැමීම (Delete Application)' : 'Delete Application'}
            </h3>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
              FV-{String(request.id).padStart(4, '0')} · {request.destination}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 16px 0' }}>
          {language === 'si'
            ? `FV-${String(request.id).padStart(4, '0')} අංකැති ${request.destination} සංචාරක නිවාඩු අයදුම්පත සැබවින්ම මකා දැමීමට ඔබට අවශ්‍යද? මෙම ක්‍රියාව ආපසු හැරවිය නොහැකි අතර සියලු අනුමැති වාර්තාද මකා දැමෙනු ඇත.`
            : `Are you sure you want to permanently delete application FV-${String(request.id).padStart(4, '0')} for ${request.destination}? This action cannot be undone.`}
        </p>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#b91c1c',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '11.5px',
            marginBottom: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={busy}
            style={{ height: '34px', padding: '0 14px', fontSize: '11px' }}
          >
            {language === 'si' ? 'අවලංගු කරන්න' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            style={{
              height: '34px',
              padding: '0 16px',
              fontSize: '11px',
              fontWeight: 700,
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: busy ? 'not-allowed' : 'pointer'
            }}
          >
            <Trash2 size={14} />
            <span>{busy ? (language === 'si' ? 'මකා දමමින්...' : 'Deleting...') : (language === 'si' ? 'ඔව්, මකා දමන්න' : 'Yes, Delete')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// REJECT APPLICATION MODAL
// =========================================================================
export function RejectRequestModal({
  request,
  language = 'en',
  user,
  token,
  onClose,
  onRejected
}) {
  const [reason, setReason] = useState('');
  const [signature, setSignature] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!request) return null;

  async function handleReject(e) {
    e.preventDefault();
    if (!reason.trim()) {
      setError(language === 'si' ? 'කරුණාකර ප්‍රතික්ෂේප කිරීමට හේතුව හෝ නිරීක්ෂණ සටහන් කරන්න.' : 'Please provide the rejection reason or remarks.');
      return;
    }
    if (!signature) {
      setError(language === 'si' ? 'කරුණාකර ඔබගේ ඩිජිටල් අත්සන තබන්න.' : 'Please add your digital signature to authorize rejection.');
      return;
    }

    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/requests/${request.id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: reason.trim(), signature })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reject application.');
      onRejected?.(request);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to reject application.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        width: 'min(540px, 94%)',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1.5px solid #fca5a5'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#b91c1c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertCircle size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                {language === 'si' ? 'අයදුම්පත ප්‍රතික්ෂේප කිරීම (Reject Leave)' : 'Reject Leave Application'}
              </h3>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                FV-{String(request.id).padStart(4, '0')} · {request.applicant_name} ({request.destination})
              </span>
            </div>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '8px',
          padding: '10px 12px',
          marginBottom: '16px',
          fontSize: '11.5px',
          color: '#9f1239',
          lineHeight: 1.4
        }}>
          <strong>{language === 'si' ? 'අවධානයට:' : 'Notice:'}</strong>{' '}
          {language === 'si'
            ? 'මෙම අයදුම්පත ප්‍රතික්ෂේප කළ පසු එහි නිල තත්ත්වය "Rejected" (පියවර 9/9: නිවාඩු අනුමත නැත) ලෙස සටහන් වන අතර අයදුම්කරු වෙත සටහන සමඟ දැනුම්දීමක් නිකුත් කෙරේ.'
            : 'Rejecting this request will conclude the process as "Rejected" (Step 9/9: Leave is not approved) and notify the applicant.'}
        </div>

        <form onSubmit={handleReject}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              {language === 'si' ? 'ප්‍රතික්ෂේප කිරීමට හේතුව / නිරීක්ෂණ සටහන (Rejection Remarks) *' : 'Rejection Reason / Observations *'}
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={language === 'si' ? 'නිවාඩු අනුමත නොකිරීමට හේතු පැහැදිලිව සටහන් කරන්න...' : 'State clear reasons for rejection...'}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1.5px solid #cbd5e1',
                fontSize: '12px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              {language === 'si' ? `බලධාරියාගේ අත්සන (${user?.name || 'Reviewing Officer'}) *` : `Digital Signature of Authority (${user?.name || 'Reviewing Officer'}) *`}
            </label>
            <SignaturePad
              signature={signature}
              onSave={setSignature}
              onClear={() => setSignature('')}
              labels={{
                title: language === 'si' ? 'ඩිජිටල් අත්සන' : 'Digital Signature',
                description: language === 'si' ? 'ප්‍රතික්ෂේප කිරීම තහවුරු කිරීමට මෙහි අත්සන් කරන්න' : 'Sign here to authenticate decision',
                clear: language === 'si' ? 'මකන්න' : 'Clear',
                save: language === 'si' ? 'තහවුරු කරන්න' : 'Save',
                statusSaved: language === 'si' ? 'අත්සන් තබා ඇත' : 'Signed',
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#b91c1c',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '11.5px',
              marginBottom: '14px'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={busy}
              style={{ height: '34px', padding: '0 14px', fontSize: '11px' }}
            >
              {language === 'si' ? 'අවලංගු කරන්න' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={busy}
              style={{
                height: '34px',
                padding: '0 16px',
                fontSize: '11px',
                fontWeight: 700,
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: busy ? 'not-allowed' : 'pointer'
              }}
            >
              <AlertCircle size={14} />
              <span>{busy ? (language === 'si' ? 'ප්‍රතික්ෂේප කරමින්...' : 'Rejecting...') : (language === 'si' ? 'ප්‍රතික්ෂේප කිරීම තහවුරු කරන්න' : 'Confirm Rejection')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RequestDetails({ details = {}, language, request, onPrintOfficerAssessment }) {
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
    {
      title: `${labels.dateAndSignatureSection} · General 126`,
      fields: [
        [labels.applicationDate, details.applicationDate],
        [labels.signature, details.signature ? (language === 'si' ? 'අත්සන් තබා ඇත (ඩිජිටල් අත්සන)' : 'Signed by applicant (Digital signature)') : '—'],
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
  const [previewDoc, setPreviewDoc] = useState(null);

  const hasDetails = Object.keys(details).length > 0;
  if (!hasDetails) return null;

  const docs = details.documents || {};
  const hasUploadedDocs = docs.institutionLetter || docs.passportImage || docs.requestLetter || docs.otherDocuments;

  const docList = [
    { key: 'institutionLetter', title: labels.docHeadTitle, doc: docs.institutionLetter, req: true },
    { key: 'passportImage', title: labels.docPassportTitle, doc: docs.passportImage, req: true },
    { key: 'requestLetter', title: labels.docRequestTitle, doc: docs.requestLetter, req: true },
    { key: 'otherDocuments', title: labels.docOtherTitle, doc: docs.otherDocuments, req: false },
  ];

  const existingAssessment = details.officerAssessment || {};

  return (
    <div className="request-review-details">
      <WorkflowHierarchyStepper request={request || { details }} language={language} />

      {/* Resubmission & Corrections History Banner */}
      {(details.isResubmitted || details.resubmissionRecord || (details.rejectionHistory && details.rejectionHistory.length > 0)) && (
        <div style={{
          background: '#f0fdf4',
          border: '1.5px solid #86efac',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
            <span>🔁</span>
            <span>{language === 'si' ? 'අඩුපාඩු නිවැරදි කර නැවත ඉදිරිපත් කරන ලද අයදුම්පතකි (Resubmitted Application)' : 'Resubmitted Application (Amended after Deficiencies)'}</span>
          </div>
          {(details.correctionNotes || details.resubmissionRecord?.correctionNotes) && (
            <div style={{ fontSize: '12.5px', color: '#14532d', marginTop: '4px', lineHeight: 1.4 }}>
              <strong>{language === 'si' ? 'කළ සංශෝධන සටහන:' : 'Correction Notes:'}</strong> {details.correctionNotes || details.resubmissionRecord?.correctionNotes}
            </div>
          )}
          {details.rejectionHistory && details.rejectionHistory.length > 0 && (
            <div style={{ fontSize: '11px', color: '#65a30d', marginTop: '6px' }}>
              <strong>{language === 'si' ? 'පෙර ප්‍රතික්ෂේප කළ හේතුව:' : 'Previous Deficiencies:'}</strong> "{details.rejectionHistory[details.rejectionHistory.length - 1].reason}"
            </div>
          )}
        </div>
      )}

      <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span className={`modal-leave-tag ${isOfficial ? 'official' : 'personal'}`}>
          {isOfficial
            ? (language === 'si' ? '🏛️ නිල සංචාරය · සාමාන්‍ය 126 + උපග්‍රන්ථ 16' : '🏛️ Official Duty · General 126 + Appendix 16')
            : (language === 'si' ? '✈️ පෞද්ගලික නිවාඩු · සාමාන්‍ය 126 + උපකාරක ලේඛන' : '✈️ Personal Leave · General 126 + Documents')}
        </span>
        <button
          type="button"
          className="btn-doc-action"
          onClick={() => printGeneral126Pdf(request || { details })}
          title={language === 'si' ? 'සාමාන්‍ය 126 (General 126) පිටුව පමණක් වෙනම PDF ලෙස බාගන්න' : 'Download General 126 Page as Separate PDF'}
          style={{
            fontSize: '11px',
            padding: '3px 10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            borderRadius: '6px',
            border: '1px solid #93c5fd',
            background: '#eff6ff',
            color: '#1d4ed8',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <FileDown size={12} />
          <span>{language === 'si' ? 'General 126 PDF බාගන්න' : 'Download General 126 PDF'}</span>
        </button>
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

      {/* Supporting Documents Checklist for Official */}
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

      {/* Live Attached Documents Section for Personal Leave */}
      {hasUploadedDocs && (
        <section className="review-detail-group">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={15} style={{ color: '#2563eb' }} />
            <span>{labels.docsHeading}</span>
          </h3>
          <div className="doc-upload-grid" style={{ marginTop: '8px' }}>
            {docList.map((item) => (
              <div key={item.key} className="doc-upload-card" style={{ padding: '12px' }}>
                <div className="doc-upload-header">
                  <div className="doc-upload-titles">
                    <strong>
                      {item.title}
                      {item.req ? (
                        <span className="doc-required-badge">{labels.requiredBadge}</span>
                      ) : (
                        <span className="doc-optional-badge">{labels.optionalBadge}</span>
                      )}
                    </strong>
                  </div>
                </div>

                {item.doc ? (
                  <div className="doc-file-uploaded">
                    <div className="doc-file-info">
                      <CheckCircle2 size={16} className="doc-file-info-icon" />
                      <div className="doc-file-meta">
                        <span className="doc-file-meta-name" title={item.doc.name}>{item.doc.name}</span>
                        <span className="doc-file-meta-size">{formatFileSize(item.doc.size)} · {labels.uploadedBadge}</span>
                      </div>
                    </div>
                    <div className="doc-file-actions">
                      <button
                        type="button"
                        className="btn-doc-action"
                        onClick={() => setPreviewDoc(item.doc)}
                      >
                        <Eye size={13} />
                        <span>{labels.previewDoc}</span>
                      </button>
                      {item.doc.dataUrl && (
                        <a
                          href={item.doc.dataUrl}
                          download={item.doc.name || 'document'}
                          className="btn-doc-action"
                          style={{ textDecoration: 'none' }}
                        >
                          <Download size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <p style={{ margin: '4px 0', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
                    {language === 'si' ? 'ලේඛනයක් අමුණා නැත' : 'No document attached'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Completed Subject Officer Assessment Table */}
      {details.officerCompleted && (
        <section className="review-detail-group">
          <div className="officer-verified-banner" style={{ margin: '0 0 12px 0' }}>
            <div className="officer-verified-content">
              <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
              <div>
                <strong>
                  {language === 'si'
                    ? 'විෂයභාර නිලධාරී තක්සේරුව සහ සටහන් පත්‍රිකාව සම්පූර්ණයි'
                    : 'Subject Officer Review & Note Sheet Completed'}
                </strong>
                <span>
                  {details.officerCompletedBy?.name
                    ? `${details.officerCompletedBy.name} (${details.officerCompletedBy.role}) · ${details.officerCompletedAt?.slice(0, 10)}`
                    : details.officerCompletedAt?.slice(0, 10)}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="doc-required-badge" style={{ background: '#dcfce7', color: '#15803d', borderColor: '#86efac' }}>
                {labels.officerUseTitle}
              </span>
              <button
                type="button"
                className="btn-doc-action"
                onClick={() => onPrintOfficerAssessment ? onPrintOfficerAssessment(request || { details }) : printSubjectOfficerPdf(request || { details })}
                title={language === 'si' ? 'මෙම කොටස වෙනම PDF එකක් ලෙස බාගන්න' : 'Download this section as a separate PDF'}
                style={{
                  fontSize: '11px',
                  padding: '3px 9px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  borderRadius: '6px',
                  border: '1px solid #86efac',
                  background: '#ffffff',
                  color: '#15803d',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <FileDown size={13} />
                <span>{language === 'si' ? 'PDF බාගන්න' : 'Download PDF'}</span>
              </button>
            </div>
          </div>

          <table className="officer-use-table">
            <thead>
              <tr>
                <th className="label-col">Leave Classification / නිවාඩු වර්ගය</th>
                <th className="center" style={{ width: '120px' }}>{labels.monthsCol}</th>
                <th className="center" style={{ width: '120px' }}>{labels.daysCol}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label-col">{labels.vacationLeave}</td>
                <td className="center">{existingAssessment.vacationLeave?.months || '0'}</td>
                <td className="center">{existingAssessment.vacationLeave?.days || '0'}</td>
              </tr>
              <tr>
                <td className="label-col">{labels.commutedHalfPay}</td>
                <td className="center">{existingAssessment.commutedHalfPay?.months || '0'}</td>
                <td className="center">{existingAssessment.commutedHalfPay?.days || '0'}</td>
              </tr>
              <tr>
                <td className="label-col">{labels.halfPayLeave}</td>
                <td className="center">{existingAssessment.halfPay?.months || '0'}</td>
                <td className="center">{existingAssessment.halfPay?.days || '0'}</td>
              </tr>
              <tr>
                <td className="label-col">{labels.noPayLeave}</td>
                <td className="center">{existingAssessment.noPay?.months || '0'}</td>
                <td className="center">{existingAssessment.noPay?.days || '0'}</td>
              </tr>
              <tr className="total-row">
                <td className="label-col">{labels.totalLeave}</td>
                <td className="center officer-total-val">{existingAssessment.total?.months || '0'}</td>
                <td className="center officer-total-val">{existingAssessment.total?.days || '0'}</td>
              </tr>
            </tbody>
          </table>

          {details.noteSheet && (
            <div className="note-sheet-upload-section" style={{ marginTop: '10px' }}>
              <strong style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: '#1e293b', marginBottom: '8px' }}>
                <FileCheck size={14} style={{ color: '#2563eb' }} />
                <span>{labels.noteSheetTitle}</span>
              </strong>
              <div className="doc-file-uploaded">
                <div className="doc-file-info">
                  <CheckCircle2 size={18} className="doc-file-info-icon" />
                  <div className="doc-file-meta">
                    <span className="doc-file-meta-name">{details.noteSheet.name}</span>
                    <span className="doc-file-meta-size">
                      {formatFileSize(details.noteSheet.size)} · {labels.uploadedBadge}
                    </span>
                  </div>
                </div>
                <div className="doc-file-actions">
                  <button
                    type="button"
                    className="btn-doc-action"
                    onClick={() => setPreviewDoc(details.noteSheet)}
                  >
                    <Eye size={13} />
                    <span>{labels.previewDoc}</span>
                  </button>
                  {details.noteSheet.dataUrl && (
                    <a
                      href={details.noteSheet.dataUrl}
                      download={details.noteSheet.name || 'Note_Sheet'}
                      className="btn-doc-action"
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={13} />
                      <span>{labels.downloadDoc}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {details.officerRemarks && (
            <div style={{ marginTop: '10px', padding: '10px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 600 }}>
                {language === 'si' ? 'විෂයභාර නිලධාරී සටහන් / නිර්දේශ:' : 'Subject Officer Remarks / Findings:'}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#1e293b' }}>
                {details.officerRemarks}
              </p>
            </div>
          )}

          {/* Forwarded Department & Head of Department Card */}
          {details.forwardedDepartment && (
            <div style={{ marginTop: '12px', padding: '12px 14px', background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '10.5px', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🏛️ {language === 'si' ? 'යොමු කරන ලද ආයතනය හා ප්‍රධානියා' : 'Forwarded Department & Head of Institution'}
                </span>
                <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1d4ed8', border: '1px solid #93c5fd', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  {language === 'si' ? 'යොමු කරන ලදී' : 'Forwarded'}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a' }}>
                {details.forwardedDepartment.name}
              </div>
              <div style={{ fontSize: '11.5px', color: '#2563eb', marginTop: '2px' }}>
                <strong>{language === 'si' ? 'ආයතන ප්‍රධානියා:' : 'Head of Department:'}</strong> {details.forwardedDepartment.headName}
                {details.forwardedDepartment.headDesignation && ` (${details.forwardedDepartment.headDesignation})`}
                {details.forwardedDepartment.headEmail && ` · ${details.forwardedDepartment.headEmail}`}
              </div>
            </div>
          )}
        </section>
      )}

      {details.declarationConfirmed && (
        <div className="review-declaration">
          <Check size={14} />
          {labels.declaration}
        </div>
      )}

      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}

// =========================================================================
// GENERAL 126 (PART II) - FOR OFFICE USE ONLY (PARTICULARS OF AVAILABLE LEAVE)
// =========================================================================
export function printOfficeUseOnlyPdf(r) {
  if (!r) return;
  const d = r.details || (r.officerCompleted ? r : {});
  const isCompleted = Boolean(d.officerCompleted || d.officerAssessment?.total || d.officerSignature);
  if (!isCompleted) {
    alert('විෂයභාර නිලධාරී (Subject Officer) විසින් කාර්යාලීය නිවාඩු විස්තර තවමත් සම්පූර්ණ කර නොමැති බැවින් මෙම කොටස බැලීමට හෝ බාගත කිරීමට නොහැක.\n\nThis section has not been completed by the Subject Officer yet and cannot be viewed or downloaded.');
    return;
  }
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const subjectOfficerClearance = clearances.find(c => c.role === 'reviewer') || (d.officerCompleted ? {
    userName: d.officerCompletedBy?.name || 'Senior Reviewing Officer',
    userDesignation: d.officerCompletedBy?.designation || 'Subject Officer (Leave & Establishments)',
    signature: d.officerSignature,
    remarks: d.officerRemarks || '',
    date: d.officerCompletedAt?.slice(0, 10) || '',
    forwardedToTitle: clearances[0]?.forwardedToTitle || 'Assistant Secretary'
  } : {
    userName: d.officerCompletedBy?.name || 'Senior Reviewing Officer',
    userDesignation: d.officerCompletedBy?.designation || 'Subject Officer (Leave & Establishments)',
    signature: d.officerSignature || null,
    remarks: d.officerRemarks || '',
    date: '',
    forwardedToTitle: 'Assistant Secretary'
  });

  const officerAssessment = d.officerAssessment || {};
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const deptName = d.department || r.department_name || 'Ministry of Civil Security';
  const applicantName = r.applicant_name || d.applicantName || '—';
  const designation = d.designation || '—';
  const purpose = r.purpose || d.purpose || '—';
  const destination = r.destination || d.destination || '—';
  const dates = (r.start_date && r.end_date) ? `${r.start_date} to ${r.end_date}` : (d.dates || '—');
  const daysApplied = d.daysApplied || '—';

  const vacationMonths = officerAssessment?.vacationLeave?.months || 0;
  const vacationDays = officerAssessment?.vacationLeave?.days || 0;
  const commutedMonths = officerAssessment?.commutedHalfPay?.months || 0;
  const commutedDays = officerAssessment?.commutedHalfPay?.days || 0;
  const halfPayMonths = officerAssessment?.halfPay?.months || 0;
  const halfPayDays = officerAssessment?.halfPay?.days || 0;
  const noPayMonths = officerAssessment?.noPay?.months || 0;
  const noPayDays = officerAssessment?.noPay?.days || 0;
  const totalMonths = officerAssessment?.total?.months || 0;
  const totalDays = officerAssessment?.total?.days || 0;

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>For Office Use Only - Particulars of Available Leave - ${refNo} - ${applicantName}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0f172a;
            background: #f8fafc;
            margin: 0;
            padding: 24px;
            line-height: 1.5;
            font-size: 11px;
          }
          .no-print-toolbar {
            max-width: 800px;
            margin: 0 auto 20px auto;
            background: #0f172a;
            color: #f8fafc;
            padding: 10px 18px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }
          .page-container {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            border: 1.5px solid #0f172a;
            padding: 32px 36px;
            border-radius: 4px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            position: relative;
          }
          .gov-header {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }
          .gov-top {
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }
          .gov-title {
            font-size: 16px;
            font-weight: 800;
            margin: 4px 0 2px 0;
            color: #0f172a;
            letter-spacing: 0.3px;
          }
          .gov-sub {
            font-size: 11px;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
          }
          .gov-statute {
            font-size: 9.5px;
            color: #64748b;
            margin-top: 3px;
            font-style: italic;
          }
          .meta-box {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px 12px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 10px 14px;
            border-radius: 4px;
            margin-bottom: 18px;
            font-size: 10.5px;
          }
          .meta-item span {
            display: block;
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
          }
          .meta-item strong {
            color: #0f172a;
            font-size: 11px;
          }

          /* Exact section styling matching official record */
          .section-card {
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 16px;
            background: #ffffff;
            margin-bottom: 18px;
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          .section-title {
            font-size: 12px;
            font-weight: 700;
            color: #1e3a8a;
          }
          .forward-badge {
            font-size: 10px;
            background: #e0f2fe;
            color: #0369a1;
            border: 1px solid #bae6fd;
            padding: 3px 10px;
            border-radius: 12px;
            font-weight: 600;
          }
          .leave-table {
            width: 100%;
            border-collapse: collapse;
            margin: 8px 0 14px 0;
            font-size: 10.5px;
          }
          .leave-table th {
            border: 1px solid #cbd5e1;
            background: #f1f5f9;
            padding: 6px 10px;
            color: #1e293b;
            font-weight: 700;
          }
          .leave-table td {
            border: 1px solid #e2e8f0;
            padding: 5px 10px;
          }
          .leave-table tr.total-row {
            background: #eff6ff;
            font-weight: bold;
          }
          .leave-table tr.total-row td {
            border: 1px solid #cbd5e1;
            color: #1e3a8a;
          }
          .text-center { text-align: center; }
          .text-left { text-align: left; }

          .minute-box {
            margin: 10px 0;
            font-size: 11px;
            background: #f8fafc;
            padding: 10px 14px;
            border: 1px solid #f1f5f9;
            border-radius: 4px;
            line-height: 1.5;
          }
          .minute-box strong {
            color: #334155;
            font-size: 10px;
            text-transform: uppercase;
            display: block;
            margin-bottom: 3px;
          }

          .signatory-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px dotted #cbd5e1;
          }
          .officer-info {
            font-size: 11px;
            line-height: 1.6;
            color: #1e293b;
          }
          .officer-sig-box {
            text-align: right;
          }
          .sig-label {
            font-size: 9.5px;
            color: #64748b;
            margin-bottom: 4px;
          }
          .sig-img-container {
            display: inline-block;
            border: 1px dashed #cbd5e1;
            padding: 3px 6px;
            background: #fff;
            border-radius: 4px;
          }
          .sig-img {
            max-height: 48px;
            max-width: 170px;
            display: block;
            object-fit: contain;
          }
          .sig-placeholder {
            height: 38px;
            width: 160px;
            border-bottom: 1px dotted #000;
          }

          .cert-footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9.5px;
            color: #64748b;
          }

          @media print {
            body {
              background: #ffffff;
              padding: 0;
            }
            .no-print, .no-print-toolbar {
              display: none !important;
            }
            .page-container {
              box-shadow: none;
              border: 1.5px solid #0f172a;
              max-width: 100%;
              padding: 12mm 15mm;
              margin: 0;
            }
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print-toolbar">
          <div style="font-weight: 600; font-size: 12px; display: flex; align-items: center; gap: 8px;">
            <span>📄 General 126 (Part II) · FOR OFFICE USE ONLY (Particulars of Available Leave)</span>
          </div>
          <div style="display: flex; gap: 10px;">
            <button onclick="window.print()" style="background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px;">
              🖨️ PDF බාගන්න / Print
            </button>
            <button onclick="window.close()" style="background: #475569; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px;">
              ✕ වසන්න / Close
            </button>
          </div>
        </div>

        <div class="page-container">
          <div class="gov-header">
            <div class="gov-top">Democratic Socialist Republic of Sri Lanka · Establishments Code</div>
            <div class="gov-code-badge" style="background:#0f172a;color:#fff;padding:2px 10px;font-size:10px;font-weight:800;border-radius:3px;margin:4px 0 2px;display:inline-block;">GENERAL 126 · CLAUSE 13 · PART II</div>
            <div class="gov-title">FOR OFFICE USE ONLY</div>
            <div class="gov-sub" style="font-size:12.5px;font-weight:700;color:#1e3a8a;margin-top:2px;">කාර්යාලයීය ප්‍රයෝජනය සඳහා පමණි · ලබාගත හැකි නිවාඩු පිළිබඳ විස්තර</div>
            <div class="gov-statute" style="font-size:10px;color:#64748b;margin-top:2px;">(PARTICULARS OF AVAILABLE LEAVE · ESTABLISHMENTS CODE CHAPTER XII)</div>
          </div>

          <div class="meta-box">
            <div class="meta-item">
              <span>යොමු අංකය (Application Ref)</span>
              <strong>${refNo}</strong>
            </div>
            <div class="meta-item">
              <span>අයදුම්කරු (Applicant Name)</span>
              <strong>${applicantName}</strong>
            </div>
            <div class="meta-item">
              <span>තනතුර (Designation)</span>
              <strong>${designation}</strong>
            </div>
            <div class="meta-item">
              <span>දෙපාර්තමේන්තුව / අමාත්‍යාංශය</span>
              <strong>${deptName}</strong>
            </div>
            <div class="meta-item">
              <span>ගමනාන්තය (Destination)</span>
              <strong>${destination}</strong>
            </div>
            <div class="meta-item">
              <span>නිවාඩු කාලසීමාව (Period)</span>
              <strong>${dates} (${daysApplied} Days)</strong>
            </div>
          </div>

          <!-- Part 1: Subject Officer Section (Exact match with screenshot) -->
          <div class="section-card">
            <div class="section-header">
              <div class="section-title">
                13. ලබාගත හැකි නිවාඩු පිළිබඳ විස්තර (PARTICULARS OF AVAILABLE LEAVE)
              </div>
              ${subjectOfficerClearance.forwardedToTitle ? `
                <span class="forward-badge">➔ ${subjectOfficerClearance.forwardedToTitle}</span>
              ` : ''}
            </div>

            <table class="leave-table">
              <thead>
                <tr>
                  <th class="text-left">Leave Classification / නිවාඩු වර්ගය</th>
                  <th class="text-center" style="width: 80px;">Months</th>
                  <th class="text-center" style="width: 80px;">Days</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vacation Leave / නිවාඩු ශේෂය</td>
                  <td class="text-center">${vacationMonths}</td>
                  <td class="text-center">${vacationDays}</td>
                </tr>
                <tr>
                  <td>Commuted half-pay leave</td>
                  <td class="text-center">${commutedMonths}</td>
                  <td class="text-center">${commutedDays}</td>
                </tr>
                <tr>
                  <td>Half-Pay leave / අර්ධ වැටුප් නිවාඩු</td>
                  <td class="text-center">${halfPayMonths}</td>
                  <td class="text-center">${halfPayDays}</td>
                </tr>
                <tr>
                  <td>No-Pay leave / වැටුප් රහිත නිවාඩු</td>
                  <td class="text-center">${noPayMonths}</td>
                  <td class="text-center">${noPayDays}</td>
                </tr>
                <tr class="total-row">
                  <td>Total / එකතුව</td>
                  <td class="text-center">${totalMonths}</td>
                  <td class="text-center">${totalDays}</td>
                </tr>
              </tbody>
            </table>

            ${subjectOfficerClearance.remarks ? `
              <div class="minute-box">
                <strong>නිල සටහන / නිර්දේශය (Official Minute / Finding):</strong>
                ${subjectOfficerClearance.remarks}
              </div>
            ` : ''}

            ${d.noteSheet?.name ? `
              <div style="font-size: 10px; color: #475569; margin: 8px 0; background: #f1f5f9; padding: 6px 10px; border-radius: 4px; display: flex; align-items: center; gap: 6px;">
                <span>📎 අමුණා ඇති ලිපිගොනුව (Attached Note Sheet):</span>
                <strong style="color: #0f172a;">${d.noteSheet.name}</strong>
              </div>
            ` : ''}

            <!-- Subject Officer Name, Designation, Date Signed & Signature -->
            <div class="signatory-row">
              <div class="officer-info">
                <div><strong>නම (Name):</strong> ${subjectOfficerClearance.userName || 'Senior Reviewing Officer'}</div>
                <div><strong>තනතුර (Designation):</strong> ${subjectOfficerClearance.userDesignation || 'Subject Officer (Leave & Establishments)'}</div>
                <div><strong>අත්සන් කළ දිනය (Date Signed):</strong> ${subjectOfficerClearance.date || '—'}</div>
              </div>
              <div class="officer-sig-box">
                <div class="sig-label">විෂයභාර නිලධාරී අත්සන (Signature):</div>
                ${subjectOfficerClearance.signature ? `
                  <div class="sig-img-container">
                    <img src="${subjectOfficerClearance.signature}" class="sig-img" alt="Subject Officer Signature" />
                  </div>
                ` : '<div class="sig-placeholder"></div>'}
              </div>
            </div>
          </div>

          <!-- Institutional Department Head Endorsement Note if available -->
          ${d.departmentHeadEndorsement ? `
            <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; background: #fafafa; font-size: 10px; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <strong style="color: #1e3a8a;">🏛️ ආයතන ප්‍රධානී නිර්දේශය (Head of Department Institutional Endorsement):</strong>
                <span style="color: #15803d; font-weight: 700;">✓ නිර්දේශ කර ඇත (Recommended)</span>
              </div>
              <div style="color: #475569;">
                ලිපි අංකය (Ref): ${d.departmentHeadEndorsement.myNo || '—'} · දිනය: ${d.departmentHeadEndorsement.date || '—'} · නිලධාරී: ${d.departmentHeadEndorsement.completedBy?.name || 'Head of Department'}
              </div>
            </div>
          ` : ''}

          <div class="cert-footer">
            <div>
              <strong>Certified Government Record:</strong> Foreign Visits & Official Leave Portal<br>
              Subject Officer Verification · Establishments Code Ch. XII
            </div>
            <div style="text-align: right;">
              Generated: ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}<br>
              Document Security Ref: ${refNo}-SO-EXTRACT
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

export const printSubjectOfficerPdf = printOfficeUseOnlyPdf;

if (typeof window !== 'undefined') {
  window.printOfficeUseOnlyPdf = printOfficeUseOnlyPdf;
  window.printSubjectOfficerPdf = printOfficeUseOnlyPdf;
}

// =========================================================================
// GENERAL 126 (PERSONAL LEAVE FORM) PDF GENERATOR & PRINT FUNCTION
// =========================================================================
export function printGeneral126Pdf(r) {
  if (!r) return;
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const d = r.details || (r.applicant_name ? r : {});
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = r.applicant_name || d.fullName || '—';
  const applicantEmail = r.applicant_email || d.email || '—';
  const deptName = d.department || r.department_name || '—';
  const designation = d.designation || '—';
  const service = d.service || '—';
  const grade = d.grade ? `(${d.grade})` : '';
  const firstAppt = d.firstAppointmentDate || '—';
  const lastForeignReturn = d.lastForeignReturnDate || '—';

  const destination = r.destination || d.destination || '—';
  const startDate = r.start_date || d.startDate || '—';
  const endDate = r.end_date || d.endDate || '—';
  const daysApplied = d.daysApplied || (startDate && endDate && startDate !== '—' && endDate !== '—' ? `${Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)}` : '—');
  const purpose = r.purpose || d.purpose || '—';
  const leaveType = r.leave_type || d.leaveType || 'Personal leave';
  const leaveCategory = d.leaveCategory || (leaveType === 'Official duty' ? 'Official duty' : 'Annual / vacation leave');
  const leaveBalance = d.leaveBalance || '—';

  const airfareFunding = d.airfareFunding || (leaveType === 'Official duty' ? 'Government of Sri Lanka (GOSL)' : 'Self-funded / Personal');
  const prepaidTicket = d.prepaidTicket || 'No';
  const ticketSenderRelationship = d.ticketSenderRelationship || '—';
  const maintenanceFunding = d.maintenanceFunding || (leaveType === 'Official duty' ? 'Daily Subsistence Allowance (DSA)' : 'Personal funds');
  const maintenancePayerRelationship = d.maintenancePayerRelationship || '—';

  const abroadAddress = d.abroadAddress || '—';
  const abroadPhone = d.abroadPhone || '—';
  const abroadEmail = d.abroadEmail || applicantEmail || '—';

  const appDate = d.applicationDate || r.created_at?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const signature = r.signature || d.signature;

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>General 126 Personal Leave - ${refNo} - ${applicantName}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0f172a;
            background: #f8fafc;
            margin: 0;
            padding: 24px;
            line-height: 1.45;
            font-size: 11px;
          }
          .no-print-toolbar {
            max-width: 840px;
            margin: 0 auto 18px auto;
            background: #0f172a;
            color: #f8fafc;
            padding: 10px 18px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }
          .page-container {
            max-width: 840px;
            margin: 0 auto;
            background: #ffffff;
            border: 1.5px solid #0f172a;
            padding: 28px 36px;
            border-radius: 4px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            position: relative;
          }
          .gov-header {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .gov-top {
            font-size: 11px;
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
            font-size: 10.5px;
            font-weight: 800;
            letter-spacing: 0.5px;
            border-radius: 3px;
            margin: 4px 0 2px 0;
          }
          .gov-title {
            font-size: 15px;
            font-weight: 800;
            margin: 4px 0 2px 0;
            color: #0f172a;
            text-transform: uppercase;
          }
          .gov-sub {
            font-size: 11px;
            color: #334155;
            font-weight: 700;
          }
          .gov-tri {
            font-size: 9.5px;
            color: #64748b;
            margin-top: 1px;
          }
          .badge-row {
            display: flex;
            justify-content: space-between;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 6px 12px;
            border-radius: 4px;
            margin-bottom: 14px;
            font-size: 10.5px;
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
            margin-top: 18px;
            border-top: 1.5px solid #0f172a;
            padding-top: 12px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .sig-declaration {
            max-width: 480px;
            font-size: 10px;
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
          .cert-footer {
            margin-top: 16px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9px;
            color: #64748b;
          }
          @media print {
            body { background: #fff; padding: 0; }
            .no-print, .no-print-toolbar { display: none !important; }
            .page-container {
              box-shadow: none;
              border: 1.5px solid #0f172a;
              max-width: 100%;
              padding: 8mm 12mm;
              margin: 0;
            }
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print-toolbar">
          <div style="font-weight: 600; font-size: 12px; display: flex; align-items: center; gap: 8px;">
            <span>📄 General 126 (පොදු 126) - Personal Leave Application Form</span>
          </div>
          <div style="display: flex; gap: 10px;">
            <button onclick="window.print()" style="background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px;">
              🖨️ PDF බාගන්න / Print
            </button>
            <button onclick="window.close()" style="background: #475569; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px;">
              ✕ වසන්න / Close
            </button>
          </div>
        </div>

        <div class="page-container">
          <div class="gov-header">
            <div class="gov-top">Democratic Socialist Republic of Sri Lanka · ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
            <div class="gov-code-badge">GENERAL 126 · පොදු 126</div>
            <div class="gov-title">Application for Leave out of Sri Lanka</div>
            <div class="gov-sub">ශ්‍රී ලංකාවෙන් බැහැරව යාම සඳහා නිවාඩු අයදුම්පත්‍රය</div>
            <div class="gov-tri">இலங்கையிலிருந்து வெளியேறுவதற்கான விடுமுறை விண்ணப்பம் (Est. Code Ch. XII)</div>
          </div>

          <div class="badge-row">
            <div><strong>යොමු අංකය (Ref No):</strong> ${refNo}</div>
            <div><strong>නිවාඩුවේ ස්වභාවය (Nature):</strong> ${leaveType}</div>
            <div><strong>තත්ත්වය (Status):</strong> ${r.status || 'Pending'}</div>
            <div><strong>දිනය (Date):</strong> ${appDate}</div>
          </div>

          <!-- 1. Officer Particulars -->
          <div class="sec-title">1. Officer & Service Particulars / නිලධාරියා සහ සේවා විස්තර (Gen. 126 Cl. 1–6)</div>
          <div class="grid-2">
            <div class="grid-item">
              <span>1. සම්පූර්ණ නම / Officer's Full Name</span>
              <strong>${applicantName}</strong>
            </div>
            <div class="grid-item">
              <span>2. දෙපාර්තමේන්තුව / අමාත්‍යාංශය / Dept. / Ministry</span>
              <strong>${deptName}</strong>
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
              <span>5. පළමු පත්වීමේ දිනය / Date of First Appointment</span>
              <strong>${firstAppt}</strong>
            </div>
            <div class="grid-item">
              <span>6. අවසන් වරට විදේශගතව පැමිණි දිනය / Date of Return from Last Foreign Visit</span>
              <strong>${lastForeignReturn}</strong>
            </div>
          </div>

          <!-- 2. Travel & Leave Particulars -->
          <div class="sec-title">2. Travel Period & Leave Particulars / නිවාඩු කාලසීමාව සහ ගමනාන්තය (Gen. 126 Cl. 7–10)</div>
          <div class="grid-2">
            <div class="grid-item">
              <span>7. ගමනාන්ත රට / Destination (Country & City)</span>
              <strong>${destination}</strong>
            </div>
            <div class="grid-item">
              <span>8. නිවාඩු කාලසීමාව / Period of Leave</span>
              <strong>${startDate} to ${endDate} (${daysApplied} Days / දින)</strong>
            </div>
            <div class="grid-item full-span">
              <span>9. නිවාඩුවේ ස්වභාවය සහ අරමුණ / Nature & Purpose of Travel</span>
              <strong>${purpose}</strong>
            </div>
            <div class="grid-item">
              <span>10. අයදුම් කරන නිවාඩු වර්ගය / Leave Category</span>
              <strong>${leaveCategory}</strong>
            </div>
            <div class="grid-item">
              <span>11. පවතින නිවාඩු ශේෂය / Leave Balance Before Application</span>
              <strong>${leaveBalance}</strong>
            </div>
          </div>

          <!-- 3. Funding & Maintenance -->
          <div class="sec-title">3. Travel Funding & Maintenance Abroad / ගමන් වියදම් සහ විදේශ නඩත්තු (Gen. 126 Cl. 8–9)</div>
          <div class="grid-2">
            <div class="grid-item">
              <span>12. ගුවන් ටිකට්පත් වියදම් / Airfare Funding</span>
              <strong>${airfareFunding}</strong>
            </div>
            <div class="grid-item">
              <span>13. කලින් ගෙවන ලද ටිකට්පතක්ද / Pre-paid Ticket</span>
              <strong>${prepaidTicket} ${prepaidTicket === 'Yes' ? `(ඥාතිත්වය / Sender: ${ticketSenderRelationship})` : ''}</strong>
            </div>
            <div class="grid-item">
              <span>14. විදේශයේදී නඩත්තු වියදම් / Cost of Maintenance Abroad</span>
              <strong>${maintenanceFunding}</strong>
            </div>
            <div class="grid-item">
              <span>15. නඩත්තු වියදම් දරන්නාගේ ඥාතිත්වය / Relationship of Payer</span>
              <strong>${maintenancePayerRelationship}</strong>
            </div>
          </div>

          <!-- 4. Address Abroad -->
          <div class="sec-title">4. Address & Contact While Abroad / විදේශයේ රැඳී සිටින ලිපිනය (Gen. 126 Cl. 10)</div>
          <div class="grid-2">
            <div class="grid-item full-span">
              <span>16. විදේශයේදී ලිපිනය / Residential or Hotel Address Abroad</span>
              <strong>${abroadAddress}</strong>
            </div>
            <div class="grid-item">
              <span>17. දුරකථන අංකය / Contact Phone Abroad</span>
              <strong>${abroadPhone}</strong>
            </div>
            <div class="grid-item">
              <span>18. විද්‍යුත් තැපෑල / Official or Personal Email</span>
              <strong>${abroadEmail}</strong>
            </div>
          </div>

          <!-- 5. Declaration and Signature -->
          <div class="sig-box">
            <div class="sig-declaration">
              <p style="margin: 0 0 4px 0; font-weight: 700; font-size: 10.5px;">
                19. ඉල්ලුම්කරුගේ ප්‍රකාශය (Applicant Declaration):
              </p>
              <p style="margin: 0 0 6px 0; font-size: 9.5px; color: #334155;">
                ඉහත සඳහන් සියලු විස්තර සත්‍ය හා නිවැරදි බවටත්, ආයතන සංග්‍රහයේ විධිවිධානවලට යටත්ව කටයුතු කිරීමටත් මෙයින් සහතික කරමි.<br>
                <em>I certify that the particulars furnished above are true and accurate to the best of my knowledge.</em>
              </p>
              <div style="font-size: 10px; line-height: 1.5; color: #0f172a;">
                <div><strong>අයදුම්කරු (Applicant):</strong> ${applicantName}</div>
                <div><strong>තනතුර (Designation):</strong> ${designation}</div>
                <div><strong>අයදුම් කළ දිනය (Date):</strong> ${appDate}</div>
              </div>
            </div>

            <div class="sig-img-container">
              <div style="font-size: 9.5px; color: #64748b; margin-bottom: 4px;">අයදුම්කරුගේ අත්සන (Applicant's Signature):</div>
              ${signature ? `
                <img src="${signature}" class="sig-img" alt="Applicant Signature" />
              ` : '<div style="height: 38px; width: 160px; border-bottom: 1px dotted #000; margin-left: auto;"></div>'}
              <div style="font-size: 8.5px; color: #16a34a; font-weight: 600; margin-top: 3px;">✓ සත්‍යාපිත ඩිජිටල් අත්සන (Verified Digital Signature)</div>
            </div>
          </div>

          <div class="cert-footer">
            <div>
              <strong>Department of Management Services & Public Administration</strong><br>
              Official System Generated General 126 Personal Leave Form · Establishments Code Ch. XII
            </div>
            <div style="text-align: right;">
              Generated: ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}<br>
              Verification Security Ref: ${refNo}-GEN126-PERSONAL
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

if (typeof window !== 'undefined') {
  window.printGeneral126Pdf = printGeneral126Pdf;
}

// =========================================================================
// 3. NOTE SHEET & MINISTERIAL SUBMISSION PDF (සටහන් පත්‍රිකාව හා අමාත්‍ය ඉදිරිපත් කිරීම)
// =========================================================================
export function printNoteSheetMinisterialPdf(r) {
  if (!r) return;
  const d = r.details || (r.applicant_name ? r : {});
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const isCompleted = clearances.length > 0 && clearances.some(c => c.signature || c.decision);
  if (!isCompleted) {
    alert('අමාත්‍යාංශ ලේකම් කාර්යාලය (Ministry Secretariat) විසින් අවසර පත්‍රිකාව (Clearance Sheet) තවමත් සටහන් කර නොමැති බැවින් බැලීමට හෝ බාගත කිරීමට නොහැක.\n\nThis Clearance Sheet has not been completed yet and cannot be viewed or downloaded.');
    return;
  }
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = r.applicant_name || d.applicantName || d.fullName || '—';
  const designation = d.designation || r.designation || '—';
  const department = d.department || r.department_name || 'Ministry of Civil Security';
  const leaveType = r.leave_type || d.leave_type || 'Foreign Leave (විදේශ නිවාඩු)';
  const leaveCategory = d.leaveCategory || '';
  const startDate = r.start_date || d.start_date || '—';
  const endDate = r.end_date || d.end_date || '—';
  const daysApplied = d.daysApplied || '—';

  // Format nature of leave
  let natureOfLeave = leaveType;
  if (leaveCategory && !natureOfLeave.toLowerCase().includes(leaveCategory.toLowerCase())) {
    natureOfLeave = `${leaveType} (${leaveCategory})`;
  }

  // Format requested period
  const periodText = (startDate !== '—' && endDate !== '—')
    ? `${startDate} - ${endDate}${daysApplied !== '—' ? ` (${daysApplied} Days / දින)` : ''}`
    : (d.dates || '—');

  // 1. Assistant Secretary
  const asClearance = clearances.find(c => c.role === 'assistant_secretary');
  // 2. Senior Assistant Secretary
  const sasClearance = clearances.find(c => c.role === 'senior_assistant_secretary');
  // 3. Additional Secretary
  const adsClearance = clearances.find(c => c.role === 'additional_secretary');
  // 4. Secretary
  const secClearance = clearances.find(c => c.role === 'secretary') || (d.secretaryApproval ? {
    userName: d.secretaryApproval.name || 'වරුෂණ ශ්‍රී ධනපාල',
    userDesignation: 'ලේකම් (Secretary)',
    signature: d.secretaryApproval.signature,
    remarks: d.secretaryApproval.remarks || '',
    date: d.secretaryApproval.date || r.updated_at?.slice(0, 10)
  } : (r.status === 'Approved' ? {
    userName: 'වරුෂණ ශ්‍රී ධනපාල',
    userDesignation: 'ලේකම් (Secretary)',
    signature: null,
    remarks: 'නිර්දේශ කර අනුමැතිය සඳහා ඉදිරිපත් කෙරේ.',
    date: r.updated_at?.slice(0, 10) || ''
  } : null));

  // 5. Final Presidential Order
  const presidentialDecision = d.presidentialDecision || (r.status === 'Approved' ? {
    decision: 'approve',
    decisionText: 'නිවාඩුව අනුමත කරමි',
    userName: 'අතිගරු ජනාධිපතිතුමා',
    userDesignation: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
    ministry: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
    signature: null,
    date: r.updated_at?.slice(0, 10) || '',
    remarks: ''
  } : (r.status === 'Rejected' ? {
    decision: 'reject',
    decisionText: 'නිවාඩු අනුමත නොකරමි',
    userName: 'අතිගරු ජනාධිපතිතුමා',
    userDesignation: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
    ministry: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය',
    signature: null,
    date: r.updated_at?.slice(0, 10) || '',
    remarks: ''
  } : null));

  const currentDateStr = new Date().toLocaleDateString('en-GB');

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Note Sheet - Ministerial Submission - ${refNo} - ${applicantName}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0f172a;
            background: #f8fafc;
            margin: 0;
            padding: 24px;
            line-height: 1.45;
            font-size: 11px;
          }
          .no-print-toolbar {
            max-width: 800px;
            margin: 0 auto 20px auto;
            background: #0f172a;
            color: #f8fafc;
            padding: 10px 18px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }
          .page-container {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            border: 1.5px solid #0f172a;
            padding: 28px 32px;
            border-radius: 4px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            position: relative;
          }
          .gov-header {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 10px;
            margin-bottom: 14px;
          }
          .gov-top {
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }
          .gov-top-si {
            font-size: 11px;
            font-weight: 700;
            color: #334155;
            margin-top: 1px;
          }
          .gov-title {
            font-size: 16px;
            font-weight: 800;
            margin: 4px 0 2px 0;
            color: #0f172a;
            letter-spacing: 0.3px;
          }
          .gov-sub {
            font-size: 10.5px;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
          }
          .ref-bar {
            display: flex;
            justify-content: space-between;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            border-radius: 4px;
            margin-bottom: 14px;
            font-size: 10px;
          }
          .ref-bar strong { color: #0f172a; }

          /* Applicater Section */
          .section-box {
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 12px 14px;
            background: #ffffff;
            margin-bottom: 14px;
          }
          .section-header-title {
            font-size: 12px;
            font-weight: 800;
            color: #1e3a8a;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .applicant-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
          }
          .applicant-table td {
            padding: 6px 8px;
            vertical-align: top;
            border-bottom: 1px solid #f1f5f9;
          }
          .applicant-table tr:last-child td {
            border-bottom: none;
          }
          .col-num {
            width: 24px;
            font-weight: 700;
            color: #1e3a8a;
          }
          .col-label {
            width: 260px;
            font-weight: 600;
            color: #334155;
          }
          .col-label .si-label {
            font-size: 10px;
            color: #64748b;
            display: block;
          }
          .col-value {
            color: #0f172a;
            font-size: 11.5px;
          }
          .col-value strong {
            color: #0f172a;
          }
          .sub-text {
            font-size: 10px;
            color: #475569;
            margin-top: 1px;
          }

          /* Official Examination Statement Box */
          .examination-box {
            border: 1.5px solid #2563eb;
            background: #eff6ff;
            border-radius: 4px;
            padding: 12px 14px;
            margin-bottom: 14px;
          }
          .examination-quote {
            font-size: 11px;
            line-height: 1.6;
            color: #1e3a8a;
            font-style: italic;
            font-weight: 600;
            margin-bottom: 6px;
          }
          .examination-si {
            font-size: 10px;
            color: #3b82f6;
            line-height: 1.5;
          }

          /* 4 Secretariat Signatures Grid */
          .signatures-title {
            font-size: 11.5px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
          }
          .sig-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 14px;
          }
          .sig-card {
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 10px 12px;
            background: #fcfcfd;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 120px;
          }
          .sig-card-header {
            font-size: 11px;
            font-weight: 700;
            color: #1e3a8a;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 4px;
            margin-bottom: 6px;
          }
          .sig-card-header .si-role {
            font-size: 9.5px;
            color: #64748b;
            font-weight: 600;
            margin-left: 4px;
          }
          .sig-details {
            font-size: 10px;
            line-height: 1.5;
            color: #334155;
          }
          .sig-details strong {
            color: #0f172a;
          }
          .sig-card-remarks {
            margin: 4px 0 6px 0;
            padding: 4px 6px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 3px;
            font-size: 9.5px;
            color: #334155;
            font-style: italic;
          }
          .sig-bottom-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px dotted #cbd5e1;
          }
          .sig-box {
            text-align: right;
          }
          .sig-img {
            max-height: 38px;
            max-width: 130px;
            display: block;
            margin-left: auto;
          }
          .sig-dotted-line {
            height: 30px;
            border-bottom: 1px dotted #000;
            width: 120px;
            margin-left: auto;
          }
          .sig-label-small {
            font-size: 8.5px;
            color: #64748b;
            margin-top: 2px;
          }

          /* Ministerial Submission Section (Next part) */
          .ministerial-box {
            border: 1.5px solid #0f172a;
            border-radius: 4px;
            padding: 12px 14px;
            background: #f8fafc;
            margin-top: 10px;
          }
          .minister-header {
            margin-bottom: 8px;
          }
          .minister-header u {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: 0.3px;
          }
          .minister-submission-text {
            font-size: 11.5px;
            line-height: 1.6;
            color: #0f172a;
            margin-bottom: 12px;
            font-weight: 500;
          }
          .minister-sign-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 8px;
            border-top: 1px dashed #94a3b8;
          }
          .minister-meta {
            font-size: 10px;
            line-height: 1.6;
            color: #1e293b;
          }
          .minister-sign-block {
            text-align: center;
            font-size: 10px;
            line-height: 1.35;
          }

          /* Presidential Order Section */
          .presidential-box {
            border: 2px solid #0f172a;
            border-radius: 4px;
            padding: 12px 14px;
            background: #ffffff;
            margin-top: 12px;
          }
          .presidential-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 5px;
            margin-bottom: 8px;
          }
          .presidential-title {
            font-size: 11.5px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          .decision-options {
            margin: 8px 0 10px;
            font-size: 12px;
            display: flex;
            gap: 20px;
            align-items: center;
          }
          .decision-badge-opt {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 4px;
            border: 1.5px solid transparent;
          }
          .decision-badge-opt.active-approve {
            color: #15803d;
            background: #f0fdf4;
            border-color: #86efac;
          }
          .decision-badge-opt.active-reject {
            color: #b91c1c;
            background: #fef2f2;
            border-color: #fca5a5;
          }
          .decision-badge-opt.inactive {
            color: #64748b;
            border-color: #e2e8f0;
          }
          .presidential-sign-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 8px;
            border-top: 1px dashed #cbd5e1;
          }

          .cert-footer {
            margin-top: 16px;
            padding-top: 8px;
            border-top: 1px solid #cbd5e1;
            display: flex;
            justify-content: space-between;
            font-size: 9px;
            color: #64748b;
          }

          @media print {
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
            body {
              background: #ffffff;
              padding: 0;
            }
            .no-print, .no-print-toolbar {
              display: none !important;
            }
            .page-container {
              border: none;
              padding: 0;
              box-shadow: none;
              max-width: 100%;
            }
            .section-box, .sig-card, .ministerial-box, .examination-box, .presidential-box {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print-toolbar">
          <div>
            <strong>📄 Official Clearance Sheet & Ministerial Submission (අවසර පත්‍රිකාව)</strong>
            <span style="font-size: 10px; opacity: 0.8; margin-left: 8px;">Ref: ${refNo} · ${applicantName}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button onclick="window.print()" style="background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 11px;">
              🖨️ PDF බාගන්න / Print
            </button>
            <button onclick="window.close()" style="background: #475569; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 11px;">
              ✕ වසන්න / Close
            </button>
          </div>
        </div>

        <div class="page-container">
          <!-- Government Header -->
          <div class="gov-header">
            <div class="gov-top">Democratic Socialist Republic of Sri Lanka · Ministry of Civil Security</div>
            <div class="gov-top-si">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය · සිවිල් ආරක්ෂක අමාත්‍යාංශය</div>
            <h1 class="gov-title">අවසර පත්‍රිකාව (CLEARANCE NOTE SHEET)</h1>
            <div class="gov-sub">අමාත්‍යාංශ ලේකම් කාර්යාල නිල නිර්දේශය හා අමාත්‍ය ඉදිරිපත් කිරීම · MINISTERIAL SUBMISSION</div>
            <div style="font-size: 9.5px; color: #64748b; margin-top: 3px; font-style: italic;">
              Foreign Visits & Official Leave Verification System · Est. Code Chapter XII
            </div>
          </div>

          <!-- Reference & Metadata Bar -->
          <div class="ref-bar">
            <div><strong>යොමු අංකය (Ref No):</strong> ${refNo}</div>
            <div><strong>දෙපාර්තමේන්තුව (Dept):</strong> ${department}</div>
            <div><strong>දිනය (Date):</strong> ${currentDateStr}</div>
          </div>

          <!-- Applicater Section -->
          <div class="section-box">
            <div class="section-header-title">
              <span>Applicater (අයදුම්කරුගේ තොරතුරු)</span>
              <span style="font-size: 9.5px; font-weight: normal; color: #64748b; text-transform: none;">General 126 Leave Requisition Details</span>
            </div>
            <table class="applicant-table">
              <tr>
                <td class="col-num">1.</td>
                <td class="col-label">
                  Name / Position
                  <span class="si-label">නම සහ තනතුර</span>
                </td>
                <td class="col-value">
                  <strong>${applicantName}</strong>
                  <div class="sub-text">${designation} ${department ? `· ${department}` : ''}</div>
                </td>
              </tr>
              <tr>
                <td class="col-num">2.</td>
                <td class="col-label">
                  Nature of the leave
                  <span class="si-label">(නිවාඩුවේ ස්වභාවය)</span>
                </td>
                <td class="col-value">
                  <strong>${natureOfLeave}</strong>
                </td>
              </tr>
              <tr>
                <td class="col-num">3.</td>
                <td class="col-label">
                  The period for which leave is requested
                  <span class="si-label">(නිවාඩුව ඉල්ලා සිටින කාලය)</span>
                </td>
                <td class="col-value">
                  <strong>${periodText}</strong>
                  <div class="sub-text">Start date - end date: ${startDate} to ${endDate}</div>
                </td>
              </tr>
            </table>
          </div>

          <!-- Examination Statement Quote -->
          <div class="examination-box">
            <div class="examination-quote">
              "All relevant documents have been carefully examined and thoroughly reviewed to verify the accuracy and completeness of the information provided. The contents of the documents have been duly considered in accordance with the applicable rules, regulations, and established administrative procedures."
            </div>
            <div class="examination-si">
              (සපයා ඇති තොරතුරුවල නිරවද්‍යතාවය සහ සම්පූර්ණත්වය තහවුරු කිරීම සඳහා අදාළ සියලුම ලේඛන හොඳින් පරීක්ෂා කර සමාලෝචනය කර ඇති අතර, ස්ථාපිත පරිපාලන ක්‍රියා පටිපාටි හා රෙගුලාසිවලට අනුකූලව නිසි ලෙස සලකා බලන ලදී.)
            </div>
          </div>

          <!-- 4 Secretariat Hierarchy Signatures (Name / Date / Signature) -->
          <div class="signatures-title">
            Secretariat Verification & Recommendation Hierarchy
          </div>
          <div class="sig-grid">
            <!-- 1. Assistant Secretary -->
            <div class="sig-card">
              <div>
                <div class="sig-card-header">
                  Assistant Secretary <span class="si-role">(සහකාර ලේකම්)</span>
                </div>
                <div class="sig-details">
                  <div><strong>Name:</strong> ${asClearance?.userName || '........................................'}</div>
                  <div><strong>Date:</strong> ${asClearance?.date || asClearance?.timestamp?.slice(0, 10) || '........................'}</div>
                </div>
                ${asClearance?.remarks ? `<div class="sig-card-remarks"><strong>Minute:</strong> ${asClearance.remarks}</div>` : ''}
              </div>
              <div class="sig-bottom-row">
                <span class="sig-label-small">Signature:</span>
                <div class="sig-box">
                  ${asClearance?.signature ? `<img src="${asClearance.signature}" class="sig-img" alt="Assistant Secretary Signature" />` : '<div class="sig-dotted-line"></div>'}
                </div>
              </div>
            </div>

            <!-- 2. Senior Assistant Secretary -->
            <div class="sig-card">
              <div>
                <div class="sig-card-header">
                  Senior Assistant Secretary <span class="si-role">(ජ්‍යෙෂ්ඨ සහකාර ලේකම්)</span>
                </div>
                <div class="sig-details">
                  <div><strong>Name:</strong> ${sasClearance?.userName || '........................................'}</div>
                  <div><strong>Date:</strong> ${sasClearance?.date || sasClearance?.timestamp?.slice(0, 10) || '........................'}</div>
                </div>
                ${sasClearance?.remarks ? `<div class="sig-card-remarks"><strong>Minute:</strong> ${sasClearance.remarks}</div>` : ''}
              </div>
              <div class="sig-bottom-row">
                <span class="sig-label-small">Signature:</span>
                <div class="sig-box">
                  ${sasClearance?.signature ? `<img src="${sasClearance.signature}" class="sig-img" alt="Senior Assistant Secretary Signature" />` : '<div class="sig-dotted-line"></div>'}
                </div>
              </div>
            </div>

            <!-- 3. Additional Secretary -->
            <div class="sig-card">
              <div>
                <div class="sig-card-header">
                  Additional Secretary <span class="si-role">(අතිරේක ලේකම්)</span>
                </div>
                <div class="sig-details">
                  <div><strong>Name:</strong> ${adsClearance?.userName || '........................................'}</div>
                  <div><strong>Date:</strong> ${adsClearance?.date || adsClearance?.timestamp?.slice(0, 10) || '........................'}</div>
                </div>
                ${adsClearance?.remarks ? `<div class="sig-card-remarks"><strong>Minute:</strong> ${adsClearance.remarks}</div>` : ''}
              </div>
              <div class="sig-bottom-row">
                <span class="sig-label-small">Signature:</span>
                <div class="sig-box">
                  ${adsClearance?.signature ? `<img src="${adsClearance.signature}" class="sig-img" alt="Additional Secretary Signature" />` : '<div class="sig-dotted-line"></div>'}
                </div>
              </div>
            </div>

            <!-- 4. Secretary -->
            <div class="sig-card">
              <div>
                <div class="sig-card-header">
                  Secretary <span class="si-role">(අමාත්‍යාංශ ලේකම්)</span>
                </div>
                <div class="sig-details">
                  <div><strong>Name:</strong> ${secClearance?.userName || 'වරුෂණ ශ්‍රී ධනපාල'}</div>
                  <div><strong>Date:</strong> ${secClearance?.date || secClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '........................')}</div>
                </div>
                ${secClearance?.remarks ? `<div class="sig-card-remarks"><strong>Minute:</strong> ${secClearance.remarks}</div>` : ''}
              </div>
              <div class="sig-bottom-row">
                <span class="sig-label-small">Signature:</span>
                <div class="sig-box">
                  ${secClearance?.signature ? `<img src="${secClearance.signature}" class="sig-img" alt="Secretary Signature" />` : '<div class="sig-dotted-line"></div>'}
                </div>
              </div>
            </div>
          </div>

          <!-- Next part: Ministerial Submission -->
          <div class="ministerial-box">
            <div class="minister-header">
              <u>ගරු අමාත්‍යාංශය</u>
            </div>
            <div class="minister-submission-text">
              ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.
            </div>

            <div class="minister-sign-footer">
              <div class="minister-meta">
                <div><strong>නම (Name):</strong> ${secClearance?.userName || 'වරුෂණ ශ්‍රී ධනපාල'}</div>
                <div><strong>දිනය (Date):</strong> ${secClearance?.date || secClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '........................')}</div>
              </div>
              <div class="minister-sign-block">
                ${secClearance?.signature ? `<img src="${secClearance.signature}" style="max-height: 48px; max-width: 170px; display: block; margin: 0 auto 4px;" alt="Secretary Signature" />` : '<div style="height: 38px; border-bottom: 1px dotted #000; width: 170px; margin: 0 auto 4px;"></div>'}
                <div style="border-top: 1px dotted #000; padding-top: 4px; font-weight: bold;">
                  (Name / Date / signature)<br>
                  <span style="font-size: 11px;">ලේකම්</span><br>
                  <span style="font-size: 10px; font-weight: normal;">සිවිල් ආරක්ෂක අමාත්‍යාංශය</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Final Presidential Order Section -->
          <div class="presidential-box">
            <div class="presidential-header">
              <span class="presidential-title">අතිගරු ජනාධිපතිතුමාගේ තීරණය (PRESIDENTIAL ORDER)</span>
              <span style="font-size: 9.5px; color: #64748b; font-weight: 600;">Final Constitutional Authority</span>
            </div>

            <div class="decision-options">
              <div class="decision-badge-opt ${(presidentialDecision?.decision === 'approve' || (!presidentialDecision && r.status === 'Approved')) ? 'active-approve' : 'inactive'}">
                <span style="font-size: 14px;">${(presidentialDecision?.decision === 'approve' || (!presidentialDecision && r.status === 'Approved')) ? '☑' : '☐'}</span>
                <span>"නිවාඩුව අනුමත කරමි"</span>
              </div>
              <div class="decision-badge-opt ${(presidentialDecision?.decision === 'reject' || (!presidentialDecision && r.status === 'Rejected')) ? 'active-reject' : 'inactive'}">
                <span style="font-size: 14px;">${(presidentialDecision?.decision === 'reject' || (!presidentialDecision && r.status === 'Rejected')) ? '☑' : '☐'}</span>
                <span>"නිවාඩු අනුමත නොකරමි"</span>
              </div>
            </div>

            ${presidentialDecision?.remarks ? `
              <div style="margin-bottom: 8px; font-size: 10px; background: #f8fafc; padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 4px;">
                <strong>විශේෂ සටහන් / Directives:</strong> ${presidentialDecision.remarks}
              </div>
            ` : ''}

            <div class="presidential-sign-footer">
              <div style="font-size: 10px; line-height: 1.6; color: #1e293b;">
                <div><strong>නම (Name):</strong> ${presidentialDecision?.userName || ((presidentialDecision || r.status === 'Approved') ? 'අතිගරු ජනාධිපතිතුමා' : '........................................')}</div>
                <div><strong>දිනය (Date):</strong> ${presidentialDecision?.date || presidentialDecision?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '........................')}</div>
              </div>
              <div style="text-align: center; font-size: 10px; line-height: 1.35;">
                ${presidentialDecision?.signature ? `<img src="${presidentialDecision.signature}" style="max-height: 48px; max-width: 170px; display: block; margin: 0 auto 4px;" alt="President Signature" />` : '<div style="height: 36px; border-bottom: 1px dotted #000; width: 170px; margin: 0 auto 4px;"></div>'}
                <div style="border-top: 1px dotted #000; padding-top: 4px; font-weight: bold;">
                  (Name / Date / signature)<br>
                  <span style="font-size: 11px; color: #0f172a;">ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Certified Government Record Footer -->
          <div class="cert-footer">
            <div>
              <strong>Certified Government Record:</strong> Foreign Visits & Official Leave Portal · Ministry of Civil Security<br>
              Official Note Sheet & Ministerial Submission · Est. Code Chapter XII
            </div>
            <div style="text-align: right;">
              Generated: ${currentDateStr} ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}<br>
              Document Security Ref: ${refNo}-MIN-SUBMISSION
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

export const printMinisterialNoteSheetPdf = printNoteSheetMinisterialPdf;
export const printSecretariatMinuteTrailPdf = printNoteSheetMinisterialPdf;

if (typeof window !== 'undefined') {
  window.printNoteSheetMinisterialPdf = printNoteSheetMinisterialPdf;
  window.printMinisterialNoteSheetPdf = printNoteSheetMinisterialPdf;
  window.printSecretariatMinuteTrailPdf = printNoteSheetMinisterialPdf;
}

// =========================================================================
// 4. HEAD OF DEPARTMENT OFFICIAL FORWARDING LETTER PDF (Est. Code XV 10:1)
// =========================================================================
export function printDepartmentHeadLetterPdf(r) {
  if (!r) return;
  const d = r.details || (r.applicant_name ? r : {});
  const endorsement = d.departmentHeadEndorsement || {};
  const isCompleted = Boolean(endorsement && (endorsement.signature || endorsement.myNo));
  if (!isCompleted) {
    alert('දෙපාර්තමේන්තු / ආයතන ප්‍රධානියා (Head of Department) විසින් මෙම ලිපිය තවමත් සම්පූර්ණ කර නොමැති බැවින් බැලීමට හෝ බාගත කිරීමට නොහැක.\n\nThis letter has not been completed and signed by the Head of Department yet and cannot be viewed or downloaded.');
    return;
  }
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const departmentName = r.department_name || d.department || endorsement.completedBy?.department || 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions';

  const rawMinistry = endorsement.ministryName || d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\s+of\s+|අමාත්‍යාංශය\s*)/i, '').trim() || rawMinistry;

  let rawApplicantName = r.applicant_name || d.applicantName || d.fullName || '........................................................................';
  let activeSalutation = endorsement.officerSalutation || 'Mr.';
  const prefixMatch = rawApplicantName.match(/^(Mr\.|Mrs\.|Miss|Ms\.|Dr\.|Prof\.|Eng\.|Rev\.)\s*/i);
  if (prefixMatch) {
    activeSalutation = prefixMatch[1];
    rawApplicantName = rawApplicantName.slice(prefixMatch[0].length).trim();
  }

  const refNo = endorsement.myNo || d.deptRefNo || (r.id ? `${(r.department_name || d.department || 'SLT').slice(0, 4).toUpperCase()}/LV/${new Date().getFullYear()}/FV-${String(r.id).padStart(4, '0')}` : '...........................');
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

  const secRefNo = secretaryClearance?.myNo || (r.id ? `${cleanMinistryName.slice(0, 3).toUpperCase()}/SEC/${new Date().getFullYear()}/FV-${String(r.id).padStart(4, '0')}` : '...........................');
  const secName = secretaryClearance?.userName || secretaryClearance?.signatoryName || (r.status === 'Approved' ? 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)' : '');
  const secSignature = secretaryClearance?.signature;
  const secDate = secretaryClearance?.date || secretaryClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '...........................');
  const isSecretaryApproved = r.status === 'Approved' || r.status === 'Pending Presidential Approval' || secretaryClearance?.decision === 'approve';
  const isSecretaryRejected = r.status === 'Rejected' || secretaryClearance?.decision === 'reject';
  const hasSecretaryCompleted = Boolean(
    d.secretaryApproval?.signature ||
    d.secretaryApproval?.signatoryName ||
    d.secretaryApproval?.letterNumber ||
    d.secretaryApproval?.signedAt ||
    clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
    (r.status === 'Approved' || r.status === 'Pending Presidential Approval')
  );

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Head of Department & Secretary Letter - ${refNo} - ${rawApplicantName}</title>
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
            <span style="opacity: 0.8; margin-left: 10px;">Ref: ${refNo} · ${rawApplicantName}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            ${hasSecretaryCompleted ? `
              <button class="toolbar-btn btn-primary" onclick="printAll()">
                🖨️ සියල්ල මුද්‍රණය (Print Both)
              </button>
              <button class="toolbar-btn btn-secondary" onclick="printPart1Only()">
                📄 1. ආයතන ප්‍රධානී ලිපිය (Part 1 Only)
              </button>
              <button class="toolbar-btn btn-secondary" onclick="printPart2Only()">
                📄 2. ලේකම් ලිපිය (Part 2 Only)
              </button>
            ` : `
              <button class="toolbar-btn btn-primary" onclick="window.print()">
                🖨️ මුද්‍රණය කරන්න (Print Letter)
              </button>
              <span style="font-size: 11px; opacity: 0.8; align-self: center;">(🔒 ලේකම් අනුමැතිය සම්පූර්ණ වන තෙක් Part II අගුළුලා ඇත)</span>
            `}
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
              <div class="department-name">${departmentName}</div>
              <div class="circular-badge">Establishments Code Chapter XV Section 10:1 · Recommendation of Head of Department</div>
            </div>

            <div class="top-ref-row">
              my no.} <span class="dotted-fill">${refNo}</span>
            </div>

            <div class="addressee">
              The Secretary,<br />
              Ministry of <u>${cleanMinistryName}</u>
            </div>

            <!-- Clause 1 -->
            <div class="clause-row">
              <div class="clause-num">1</div>
              <div class="clause-body">
                forward herewith two copies of the leave application of<br />
                ${activeSalutation} <span class="applicant-line"><u>${rawApplicantName}</u></span>. I certify that
                acting arrangement have been made and that there is no disciplinary
                action pending or contemplated against this officer.
              </div>
            </div>

            <!-- Clause 2 -->
            <div class="clause-row">
              <div class="clause-num">2</div>
              <div class="clause-body">
                Prime Minister’s permission has been obtained in terms of Chapter XV -10:1 of the Establishments code. ${pmPermission === 'obtained' ? '<strong style="color: #166534; font-size: 13.5px; margin-left: 6px;">(Obtained / ලබාගෙන ඇත)</strong>' : ''}
              </div>
            </div>

            <!-- Clause 3 -->
            <div class="clause-row">
              <div class="clause-num">3</div>
              <div class="clause-body">
                Leave is ${
                  recommendation === 'recommended'
                    ? '<span class="rec-highlight">recommended</span> / <span class="rec-muted">not recommended</span>.'
                    : recommendation === 'not_recommended'
                    ? '<span class="rec-muted">recommended</span> / <span class="rec-highlight" style="color: #b91c1c;">not recommended</span>.'
                    : 'recommended / not recommended.'
                }
              </div>
            </div>

            ${remarks ? `
              <div class="observations-box">
                <strong>Observations / Remarks:</strong> ${remarks}
              </div>
            ` : ''}

            <!-- Footer Date & Signature -->
            <div class="footer-row">
              <div class="date-col">
                Date} <span class="dotted-fill" style="min-width: 140px;">${date}</span>
              </div>

              <div class="sig-col">
                ${signature ? `<img src="${signature}" class="sig-img" alt="Signature" />` : '<div class="sig-line"></div>'}
                <div class="sig-caption">
                  ${headName ? `<strong>${headName}</strong><br />` : ''}
                  Signature and<br />
                  Designation of Head of<br />
                  Department<br />
                  ${headDesignation ? `<span style="font-size: 12.5px; color: #334155;">${headDesignation}</span><br />` : ''}
                  ${departmentName ? `<span style="font-size: 11.5px; color: #64748b;">${departmentName}</span>` : ''}
                </div>
              </div>
            </div>
          </div>

          <div class="doc-footer-meta">
            <span>Establishments Code Chapter XV · Section 10:1 (Part I: Head of Department)</span>
            <span>Ref: ${refNo} · Page 1 of ${hasSecretaryCompleted ? '2' : '1'}</span>
          </div>
        </div>

        <!-- PAGE 2: MINISTRY SECRETARY APPROVAL & DIRECTIVE -->
        ${hasSecretaryCompleted ? `
        <div class="sheet-page" id="page-part2">
          <div class="sheet-content">
            <div class="official-letterhead">
              <div class="republic-title-si">ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය</div>
              <div class="republic-title-en">Democratic Socialist Republic of Sri Lanka</div>
              <div class="department-name">Ministry of ${cleanMinistryName}</div>
              <div class="circular-badge">Establishments Code Chapter XV Section 10:1 · Ministerial Decision & Directive to Head of Department</div>
            </div>

            <div class="top-ref-row">
              my no.} <span class="dotted-fill">${secRefNo}</span>
            </div>

            <div class="addressee" style="margin-bottom: 40px;">
              <span class="dotted-fill" style="min-width: 320px; font-weight: normal;">${headName ? `${headName}, ${headDesignation}` : '......................................................................'}</span><br />
              Head of Department,<br />
              <span style="font-size: 13.5px; color: #475569;">${departmentName}</span>
            </div>

            <div style="text-align: center; margin: 50px 0 60px;">
              <div style="border-bottom: 1.2px dotted #0f172a; width: 340px; margin: 0 auto 10px;"></div>
              <div style="font-size: 18px; letter-spacing: 0.5px;">
                Leave is ${
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
                <div>Date} <span class="dotted-fill" style="min-width: 140px;">${secDate}</span></div>
                <div style="margin-top: 24px; font-size: 13px; color: #334155; font-style: italic;">
                  copy to: Secretary to the Prime Minister.
                </div>
              </div>

              <div class="sig-col">
                ${secSignature ? `<img src="${secSignature}" class="sig-img" alt="Secretary Signature" />` : '<div class="sig-line"></div>'}
                <div class="sig-caption">
                  ${secName ? `<strong>${secName}</strong><br />` : ''}
                  Secretary.<br />
                  ministry of <span style="border-bottom: 1.2px dotted #0f172a; padding: 0 6px; font-weight: 700;">${cleanMinistryName}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="doc-footer-meta">
            <span>Establishments Code Chapter XV · Section 10:1 (Part II: Ministry Secretary)</span>
            <span>Ref: ${secRefNo} · Page 2 of 2</span>
          </div>
        </div>
        ` : ''}

        <script>
          function printAll() {
            document.querySelectorAll('.sheet-page').forEach(function(el) { el.classList.remove('hide-on-print'); });
            window.print();
          }
          function printPart1Only() {
            var p1 = document.getElementById('page-part1');
            var p2 = document.getElementById('page-part2');
            if (p1) p1.classList.remove('hide-on-print');
            if (p2) p2.classList.add('hide-on-print');
            window.print();
          }
          function printPart2Only() {
            var p1 = document.getElementById('page-part1');
            var p2 = document.getElementById('page-part2');
            if (p1) p1.classList.add('hide-on-print');
            if (p2) p2.classList.remove('hide-on-print');
            window.print();
          }
          window.onload = function() {
            // Can be left ready for user print button
          };
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

export const printHeadOfDepartmentLetterPdf = printDepartmentHeadLetterPdf;

// =========================================================================
// 5. STANDALONE MINISTRY SECRETARY APPROVAL LETTER PDF (Est. Code XV 10:1)
// =========================================================================
export function printSecretaryApprovalLetterPdf(r) {
  if (!r) return;
  const d = r.details || (r.applicant_name ? r : {});
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const isCompleted = Boolean(
    d.secretaryApproval?.signature ||
    d.secretaryApproval?.signatoryName ||
    d.secretaryApproval?.letterNumber ||
    d.secretaryApproval?.signedAt ||
    clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
    (r.status === 'Approved' || r.status === 'Pending Presidential Approval')
  );
  if (!isCompleted) {
    alert('අමාත්‍යාංශ ලේකම්වරයා (Ministry Secretary) විසින් මෙම නිවාඩු අනුමත ලිපිය තවමත් සම්පූර්ණ කර අත්සන් කර නොමැති බැවින් බැලීමට හෝ බාගත කිරීමට නොහැක.\n\nThis letter has not been completed and signed by the Ministry Secretary yet and cannot be viewed or downloaded.');
    return;
  }
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to download/print the PDF.');
    return;
  }

  const endorsement = d.departmentHeadEndorsement || {};
  const departmentName = r.department_name || d.department || endorsement.completedBy?.department || 'Sri Lanka Telecom and its Subsidiaries and Allied Institutions';
  const rawMinistry = endorsement.ministryName || d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\s+of\s+|අමාත්‍යාංශය\s*)/i, '').trim() || rawMinistry;

  const secretaryClearance = clearances.find(c => c.role === 'secretary' || c.decision === 'approve') || d.secretaryApproval || (r.status === 'Approved' ? {
    userName: 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)',
    userDesignation: 'ලේකම් (Secretary)',
    ministryName: cleanMinistryName,
    date: r.updated_at?.slice(0, 10) || ''
  } : null);

  const secRefNo = secretaryClearance?.myNo || (r.id ? `${cleanMinistryName.slice(0, 3).toUpperCase()}/SEC/${new Date().getFullYear()}/FV-${String(r.id).padStart(4, '0')}` : '...........................');
  const headName = endorsement.completedBy?.name || d.forwardedDepartment?.headName || (r.status !== 'Pending Department Head Approval' ? 'Head of Department' : '');
  const headDesignation = endorsement.completedBy?.designation || d.forwardedDepartment?.headDesignation || 'Head of Department / Institution';
  const applicantName = r.applicant_name || d.applicantName || d.fullName || '—';

  const isSecretaryApproved = r.status === 'Approved' || r.status === 'Pending Presidential Approval' || secretaryClearance?.decision === 'approve';
  const isSecretaryRejected = r.status === 'Rejected' || secretaryClearance?.decision === 'reject';
  const secDate = secretaryClearance?.date || secretaryClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '...........................');
  const secSignature = secretaryClearance?.signature;
  const secName = secretaryClearance?.userName || secretaryClearance?.signatoryName || (r.status === 'Approved' ? 'වරුෂණ ශ්‍රී ධනපාල (Varushana Sri Dhanapala)' : '');

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Secretary Approval Letter - ${secRefNo} - ${applicantName}</title>
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
            <span style="opacity: 0.8; margin-left: 10px;">Ref: ${secRefNo} · ${applicantName}</span>
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
              <div class="department-name">Ministry of ${cleanMinistryName}</div>
              <div class="circular-badge">Establishments Code Chapter XV Section 10:1 · Ministerial Decision & Directive to Head of Department</div>
            </div>

            <div class="top-ref-row">
              my no.} <span class="dotted-fill">${secRefNo}</span>
            </div>

            <div class="addressee">
              <span class="dotted-fill" style="min-width: 320px; font-weight: normal;">${headName ? `${headName}, ${headDesignation}` : '......................................................................'}</span><br />
              Head of Department,<br />
              <span style="font-size: 13.5px; color: #475569;">${departmentName}</span>
            </div>

            <div style="text-align: center; margin: 55px 0 65px;">
              <div style="border-bottom: 1.2px dotted #0f172a; width: 340px; margin: 0 auto 10px;"></div>
              <div style="font-size: 18px; letter-spacing: 0.5px;">
                Leave is ${
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
                <div>Date} <span class="dotted-fill" style="min-width: 140px;">${secDate}</span></div>
                <div style="margin-top: 24px; font-size: 13px; color: #334155; font-style: italic;">
                  copy to: Secretary to the Prime Minister.
                </div>
              </div>

              <div class="sig-col">
                ${secSignature ? `<img src="${secSignature}" class="sig-img" alt="Secretary Signature" />` : '<div class="sig-line"></div>'}
                <div class="sig-caption">
                  ${secName ? `<strong>${secName}</strong><br />` : ''}
                  Secretary.<br />
                  ministry of <span style="border-bottom: 1.2px dotted #0f172a; padding: 0 6px; font-weight: 700;">${cleanMinistryName}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="doc-footer-meta">
            <span>Establishments Code Chapter XV · Section 10:1 (Part II: Ministry Secretary)</span>
            <span>Ref: ${secRefNo}</span>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

export const printMinistrySecretaryLetterPdf = printSecretaryApprovalLetterPdf;

if (typeof window !== 'undefined') {
  window.printDepartmentHeadLetterPdf = printDepartmentHeadLetterPdf;
  window.printHeadOfDepartmentLetterPdf = printDepartmentHeadLetterPdf;
  window.printSecretaryApprovalLetterPdf = printSecretaryApprovalLetterPdf;
  window.printMinistrySecretaryLetterPdf = printSecretaryApprovalLetterPdf;
}

// =========================================================================
// SUBJECT OFFICER ASSESSMENT & NOTE SHEET SECTION (FOR REVIEWERS / ADMINS)
// =========================================================================
export function OfficerAssessmentSection({ request, user, language = 'en', token, onSaved, onPrintOfficerAssessment }) {
  const labels = formText[language] || formText.en;
  const isReviewerOrAdmin = user?.role === 'reviewer' || user?.role === 'admin';
  const existingAssessment = request?.details?.officerAssessment || {};
  const isAlreadyCompleted = Boolean(request?.details?.officerCompleted);

  const [isEditing, setIsEditing] = useState(!isAlreadyCompleted);
  const [vacationMonths, setVacationMonths] = useState(existingAssessment.vacationLeave?.months || '');
  const [vacationDays, setVacationDays] = useState(existingAssessment.vacationLeave?.days || '');
  const [commutedMonths, setCommutedMonths] = useState(existingAssessment.commutedHalfPay?.months || '');
  const [commutedDays, setCommutedDays] = useState(existingAssessment.commutedHalfPay?.days || '');
  const [halfPayMonths, setHalfPayMonths] = useState(existingAssessment.halfPay?.months || '');
  const [halfPayDays, setHalfPayDays] = useState(existingAssessment.halfPay?.days || '');
  const [noPayMonths, setNoPayMonths] = useState(existingAssessment.noPay?.months || '');
  const [noPayDays, setNoPayDays] = useState(existingAssessment.noPay?.days || '');
  const [totalMonths, setTotalMonths] = useState(existingAssessment.total?.months || '');
  const [totalDays, setTotalDays] = useState(existingAssessment.total?.days || '');

  const initialTargetRole = request?.details?.secretariatClearances?.[0]?.forwardedTo || 'assistant_secretary';
  const [targetRole, setTargetRole] = useState(initialTargetRole);
  const [officerSignature, setOfficerSignature] = useState(request?.details?.officerSignature || '');
  const [noteSheet, setNoteSheet] = useState(request?.details?.noteSheet || null);
  const [officerRemarks, setOfficerRemarks] = useState(request?.details?.officerRemarks || '');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-calculate totals reactively when inputs change
  useEffect(() => {
    const totalD = (Number(vacationDays) || 0) + (Number(commutedDays) || 0) + (Number(halfPayDays) || 0) + (Number(noPayDays) || 0);
    const extraMonths = Math.floor(totalD / 30);
    const remDays = totalD % 30;
    const totalM = (Number(vacationMonths) || 0) + (Number(commutedMonths) || 0) + (Number(halfPayMonths) || 0) + (Number(noPayMonths) || 0) + extraMonths;
    setTotalMonths(totalM ? String(totalM) : '');
    setTotalDays(remDays ? String(remDays) : (totalD === 0 ? '' : '0'));
  }, [vacationMonths, vacationDays, commutedMonths, commutedDays, halfPayMonths, halfPayDays, noPayMonths, noPayDays]);

  function handleNoteSheetUpload(docKey, docData) {
    setNoteSheet(docData);
  }

  function handleNoteSheetRemove() {
    setNoteSheet(null);
  }

  async function handleSubmitAssessment(e) {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    const hasAnyLeave = vacationMonths || vacationDays || commutedMonths || commutedDays || halfPayMonths || halfPayDays || noPayMonths || noPayDays;
    if (!hasAnyLeave && !noteSheet) {
      setError(language === 'si' ? 'කරුණාකර නිවාඩු වර්ගීකරණ දින හෝ සටහන් පත්‍රිකාව (Note Sheet) ඇතුළත් කරන්න.' : 'Please enter leave entitlement particulars or upload the Note Sheet.');
      return;
    }

    if (!officerSignature || !officerSignature.trim()) {
      setError(language === 'si' ? 'කරුණාකර විෂයභාර නිලධාරී ලෙස ඔබගේ ඩිජිටල් අත්සන ඇතුළත් කරන්න.' : 'Please draw and add your digital signature as Subject Officer.');
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`/api/requests/${request.id}/officer-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          officerAssessment: {
            vacationLeave: { months: vacationMonths, days: vacationDays },
            commutedHalfPay: { months: commutedMonths, days: commutedDays },
            halfPay: { months: halfPayMonths, days: halfPayDays },
            noPay: { months: noPayMonths, days: noPayDays },
            total: { months: totalMonths, days: totalDays },
          },
          noteSheet,
          officerRemarks,
          signature: officerSignature,
          targetRole,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit officer assessment');
      }

      setSuccess(
        language === 'si'
          ? 'විෂයභාර නිලධාරී තක්සේරුව සහ සටහන් පත්‍රිකාව සාර්ථකව අත්සන් කර ඉදිරිපත් කරන ලදී.'
          : 'Subject Officer Assessment & Note Sheet signed and forwarded successfully.'
      );
      setIsEditing(false);
      onSaved?.();
    } catch (err) {
      setError(err.message || 'Error submitting assessment');
    } finally {
      setBusy(false);
    }
  }

  if (!isReviewerOrAdmin && !isAlreadyCompleted) {
    return null;
  }

  const isAwaitingDeptHead = !isAlreadyCompleted && request.status === 'Pending Department Head Approval';

  return (
    <div className={`officer-use-panel ${isReviewerOrAdmin ? 'highlight' : ''}`}>
      <div className="officer-panel-header">
        <div>
          <h3>
            <ShieldCheck size={16} style={{ color: '#2563eb' }} />
            <span>{labels.officerUseTitle}</span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
              ({labels.officerUseSiTitle})
            </span>
          </h3>
          <p>
            {language === 'si'
              ? 'ආයතන සංග්‍රහය XII පරිච්ඡේදය · විෂයභාර නිලධාරී නිවාඩු වර්ගීකරණය හා සටහන් පත්‍රිකාව'
              : 'Establishments Code Chapter XII · Subject Officer leave verification, classification & Note Sheet'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAlreadyCompleted && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => onPrintOfficerAssessment ? onPrintOfficerAssessment(request) : printSubjectOfficerPdf(request)}
              title={language === 'si' ? 'මෙම කොටස වෙනම PDF එකක් ලෙස බාගන්න' : 'Download this section as a separate PDF'}
              style={{
                height: '30px',
                fontSize: '10.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderColor: '#93c5fd',
                background: '#eff6ff',
                color: '#1d4ed8',
                fontWeight: 600
              }}
            >
              <FileDown size={13} />
              <span>{language === 'si' ? 'මෙම කොටස PDF ලෙස බාගන්න' : 'Download Section PDF'}</span>
            </button>
          )}
          {isReviewerOrAdmin && isAlreadyCompleted && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => setIsEditing(!isEditing)}
              style={{ height: '30px', fontSize: '10.5px' }}
            >
              {isEditing
                ? (language === 'si' ? 'අවලංගු කරන්න' : 'Cancel Edit')
                : (language === 'si' ? 'සංශෝධනය කරන්න' : 'Edit Assessment')}
            </button>
          )}
        </div>
      </div>

      {isAwaitingDeptHead && (
        <div style={{ margin: '14px 0 6px', padding: '14px 16px', background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Clock size={22} style={{ color: '#ca8a04', flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '12px', color: '#854d0e', display: 'block' }}>
              {language === 'si' ? 'පියවර 1: ආයතන ප්‍රධානියාගේ නිර්දේශය සහ සහතිකය අපේක්ෂාවෙන්' : 'Stage 1: Awaiting Department Head Endorsement'}
            </strong>
            <span style={{ fontSize: '11px', color: '#a16207', display: 'block', marginTop: '3px' }}>
              {request.department_name && <span>{language === 'si' ? 'දෙපාර්තමේන්තුව:' : 'Department:'} <strong>{request.department_name}</strong> · </span>}
              {language === 'si'
                ? 'ආයතන සංග්‍රහයේ XV පරිච්ඡේදයේ 10:1 වගන්තිය යටතේ ආයතන ප්‍රධානියා විසින් වැඩබැලීමේ විධිවිධාන හා විනය ක්‍රියාමාර්ග නොමැති බව සහතික කර විෂයභාර නිලධාරී වෙත යොමු කරන තෙක් රැඳී සිටින්න.'
                : 'This application is currently with the Head of Department for institutional endorsement & certification (Est. Code XV 10:1). Once endorsed, Subject Officer can complete leave classification and Note Sheet.'}
            </span>
          </div>
        </div>
      )}

      {isAlreadyCompleted && !isEditing ? (
        <div className="officer-completed-view">
          <div className="officer-verified-banner">
            <div className="officer-verified-content">
              <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
              <div>
                <strong>
                  {language === 'si'
                    ? 'විෂයභාර නිලධාරී සමාලෝචනය සහ සටහන් පත්‍රිකාව සම්පූර්ණ කර ඇත'
                    : 'Subject Officer Assessment & Note Sheet Completed'}
                </strong>
                <span>
                  {request.details?.officerCompletedBy?.name
                    ? `${request.details.officerCompletedBy.name} · ${request.details.officerCompletedAt?.slice(0, 10)}`
                    : request.details?.officerCompletedAt?.slice(0, 10)}
                </span>
              </div>
            </div>
            <span className="doc-required-badge" style={{ background: '#dcfce7', color: '#15803d', borderColor: '#86efac' }}>
              {labels.uploadedBadge || 'Verified'}
            </span>
          </div>

          {/* Originating Department & Institutional Endorsement Info Card */}
          {(request.department_name || request.details?.department || request.details?.forwardedDepartment) && (
            <div style={{ marginTop: '12px', padding: '12px 14px', background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '10.5px', color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🏛️ {language === 'si' ? 'අදාළ දෙපාර්තමේන්තුව / ආයතනය' : 'Originating Department / Institution'}
                </span>
                <span style={{
                  fontSize: '10px',
                  background: request.details?.departmentHeadEndorsement ? '#dcfce7' : '#dbeafe',
                  color: request.details?.departmentHeadEndorsement ? '#15803d' : '#1e40af',
                  border: `1px solid ${request.details?.departmentHeadEndorsement ? '#86efac' : '#bfdbfe'}`,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontWeight: 600
                }}>
                  {request.details?.departmentHeadEndorsement
                    ? (language === 'si' ? '✓ ආයතන ප්‍රධානී නිර්දේශිතයි' : '✓ Endorsed by Head of Dept')
                    : (language === 'si' ? 'ආයතන ප්‍රධානී අනුමැතිය' : 'Dept Head Clearance')}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a' }}>
                {request.department_name || request.details?.forwardedDepartment?.name || request.details?.department}
              </div>
              {request.details?.departmentHeadEndorsement && (
                <div style={{ fontSize: '11px', color: '#1e40af', marginTop: '3px' }}>
                  <strong>{language === 'si' ? 'නිර්දේශ ලිපි අංකය:' : 'Endorsement Ref:'}</strong> {request.details.departmentHeadEndorsement.myNo} · {request.details.departmentHeadEndorsement.date}
                  {request.details.departmentHeadEndorsement.completedBy?.name && ` (${request.details.departmentHeadEndorsement.completedBy.name})`}
                </div>
              )}
            </div>
          )}

          <table className="officer-use-table" style={{ marginTop: '14px' }}>
            <thead>
              <tr>
                <th className="label-col">Leave Classification / නිවාඩු වර්ගය</th>
                <th className="center" style={{ width: '120px' }}>{labels.monthsCol}</th>
                <th className="center" style={{ width: '120px' }}>{labels.daysCol}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label-col">{labels.vacationLeave}</td>
                <td className="center">{existingAssessment.vacationLeave?.months || '0'}</td>
                <td className="center">{existingAssessment.vacationLeave?.days || '0'}</td>
              </tr>
              <tr>
                <td className="label-col">{labels.commutedHalfPay}</td>
                <td className="center">{existingAssessment.commutedHalfPay?.months || '0'}</td>
                <td className="center">{existingAssessment.commutedHalfPay?.days || '0'}</td>
              </tr>
              <tr>
                <td className="label-col">{labels.halfPayLeave}</td>
                <td className="center">{existingAssessment.halfPay?.months || '0'}</td>
                <td className="center">{existingAssessment.halfPay?.days || '0'}</td>
              </tr>
              <tr>
                <td className="label-col">{labels.noPayLeave}</td>
                <td className="center">{existingAssessment.noPay?.months || '0'}</td>
                <td className="center">{existingAssessment.noPay?.days || '0'}</td>
              </tr>
              <tr className="total-row">
                <td className="label-col">{labels.totalLeave}</td>
                <td className="center officer-total-val">{existingAssessment.total?.months || '0'}</td>
                <td className="center officer-total-val">{existingAssessment.total?.days || '0'}</td>
              </tr>
            </tbody>
          </table>

          {request.details?.noteSheet && (
            <div className="note-sheet-upload-section">
              <strong style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: '#1e293b', marginBottom: '8px' }}>
                <FileCheck size={14} style={{ color: '#2563eb' }} />
                <span>{labels.noteSheetTitle}</span>
              </strong>
              <div className="doc-file-uploaded">
                <div className="doc-file-info">
                  <CheckCircle2 size={18} className="doc-file-info-icon" />
                  <div className="doc-file-meta">
                    <span className="doc-file-meta-name">{request.details.noteSheet.name}</span>
                    <span className="doc-file-meta-size">
                      {formatFileSize(request.details.noteSheet.size)} · {labels.uploadedBadge || 'Uploaded'}
                    </span>
                  </div>
                </div>
                <div className="doc-file-actions">
                  <button
                    type="button"
                    className="btn-doc-action"
                    onClick={() => setPreviewDoc(request.details.noteSheet)}
                  >
                    <Eye size={13} />
                    <span>{labels.previewDoc || 'Preview'}</span>
                  </button>
                  {request.details.noteSheet.dataUrl && (
                    <a
                      href={request.details.noteSheet.dataUrl}
                      download={request.details.noteSheet.name || 'Note_Sheet'}
                      className="btn-doc-action"
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={13} />
                      <span>{labels.downloadDoc || 'Download'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {request.details?.officerRemarks && (
            <div style={{ marginTop: '12px', padding: '10px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '10px', color: '#64748b', display: 'block', fontWeight: 600 }}>
                {language === 'si' ? 'විෂයභාර නිලධාරී සටහන් / නිර්දේශ:' : 'Subject Officer Remarks / Findings:'}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#1e293b' }}>
                {request.details.officerRemarks}
              </p>
            </div>
          )}

          {request.details?.officerSignature && (
            <div style={{ marginTop: '14px', padding: '14px', background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#166534', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ✓ {language === 'si' ? 'විෂයභාර නිලධාරී සටහන් හා ඩිජිටල් අත්සන' : 'Subject Officer Note & Digital Signature'}
                </span>
                <span style={{ fontSize: '10.5px', color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '10px', border: '1px solid #86efac', fontWeight: 600 }}>
                  {language === 'si' ? 'යොමු කරන ලද්දේ:' : 'Forwarded to:'}{' '}
                  <strong>
                    {request.details.secretariatClearances?.[0]?.forwardedToTitle || request.details.secretariatClearances?.[0]?.forwardedTo || 'Assistant Secretary'}
                  </strong>
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px', paddingTop: '6px' }}>
                <div style={{ fontSize: '11px', color: '#14532d', lineHeight: 1.6 }}>
                  <div><strong>{language === 'si' ? 'නම (Name):' : 'Name:'}</strong> {request.details.officerCompletedBy?.name || 'Subject Officer'}</div>
                  <div><strong>{language === 'si' ? 'තනතුර (Designation):' : 'Designation:'}</strong> {request.details.officerCompletedBy?.designation || 'විෂයභාර නිලධාරී (Subject Officer)'}</div>
                  <div><strong>{language === 'si' ? 'අත්සන් කළ දිනය (Date Signed):' : 'Date Signed:'}</strong> {request.details.officerCompletedAt?.slice(0, 10) || '—'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '9.5px', color: '#166534', display: 'block', marginBottom: '3px' }}>
                    {language === 'si' ? 'සත්‍යාපිත ඩිජිටල් අත්සන:' : 'Certified Digital Signature:'}
                  </span>
                  <div style={{ background: '#fff', padding: '3px 8px', borderRadius: '6px', border: '1px solid #86efac', display: 'inline-block' }}>
                    <img
                      src={request.details.officerSignature}
                      alt="Subject Officer Signature"
                      style={{ maxHeight: '46px', maxWidth: '170px', display: 'block', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px dashed #86efac', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-doc-action"
                  onClick={() => onPrintOfficerAssessment ? onPrintOfficerAssessment(request) : printSubjectOfficerPdf(request)}
                  title={language === 'si' ? 'විෂයභාර නිලධාරී තක්සේරුව සහ සටහන වෙනම PDF එකක් ලෙස බාගන්න' : 'Download Subject Officer Assessment as Separate PDF'}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    border: '1.5px solid #86efac',
                    background: '#ffffff',
                    color: '#166534',
                    fontWeight: 600
                  }}
                >
                  <FileDown size={13} />
                  <span>{language === 'si' ? '📄 මෙම කොටස වෙනම PDF එකක් ලෙස බාගන්න' : '📄 Download this section as Separate PDF'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmitAssessment}>
          <table className="officer-use-table">
            <thead>
              <tr>
                <th className="label-col">Leave Classification / නිවාඩු වර්ගය</th>
                <th className="center" style={{ width: '120px' }}>{labels.monthsCol}</th>
                <th className="center" style={{ width: '120px' }}>{labels.daysCol}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label-col">{labels.vacationLeave}</td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={vacationMonths}
                    onChange={(e) => setVacationMonths(e.target.value)}
                  />
                </td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={vacationDays}
                    onChange={(e) => setVacationDays(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label-col">{labels.commutedHalfPay}</td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={commutedMonths}
                    onChange={(e) => setCommutedMonths(e.target.value)}
                  />
                </td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={commutedDays}
                    onChange={(e) => setCommutedDays(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label-col">{labels.halfPayLeave}</td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={halfPayMonths}
                    onChange={(e) => setHalfPayMonths(e.target.value)}
                  />
                </td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={halfPayDays}
                    onChange={(e) => setHalfPayDays(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label-col">{labels.noPayLeave}</td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={noPayMonths}
                    onChange={(e) => setNoPayMonths(e.target.value)}
                  />
                </td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={noPayDays}
                    onChange={(e) => setNoPayDays(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="total-row">
                <td className="label-col">{labels.totalLeave}</td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={totalMonths}
                    onChange={(e) => setTotalMonths(e.target.value)}
                  />
                </td>
                <td className="center">
                  <input
                    type="number"
                    min="0"
                    className="officer-input-num"
                    placeholder="0"
                    value={totalDays}
                    onChange={(e) => setTotalDays(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Note Sheet Upload */}
          <div className="note-sheet-upload-section">
            <FileUploaderCard
              title={labels.noteSheetTitle}
              subtitle={labels.uploadNoteSheetPrompt}
              docKey="noteSheet"
              doc={noteSheet}
              onUpload={handleNoteSheetUpload}
              onRemove={handleNoteSheetRemove}
              onPreview={setPreviewDoc}
              required={false}
              labels={labels}
              icon={FileCheck}
            />
          </div>

          {/* Originating Department & Institutional Endorsement Status */}
          <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={16} style={{ color: '#2563eb' }} />
                <strong style={{ fontSize: '12px', color: '#0f172a' }}>
                  {language === 'si' ? 'අදාළ දෙපාර්තමේන්තුව සහ ආයතන ප්‍රධානී නිර්දේශය' : 'Originating Department & Institutional Endorsement'}
                </strong>
              </div>
              <span style={{
                fontSize: '10px',
                background: request.details?.departmentHeadEndorsement ? '#dcfce7' : '#fef3c7',
                color: request.details?.departmentHeadEndorsement ? '#15803d' : '#92400e',
                border: `1px solid ${request.details?.departmentHeadEndorsement ? '#86efac' : '#fcd34d'}`,
                padding: '2px 8px',
                borderRadius: '10px',
                fontWeight: 600
              }}>
                {request.details?.departmentHeadEndorsement
                  ? (language === 'si' ? '✓ පියවර 1 සම්පූර්ණයි' : '✓ Stage 1 Endorsed')
                  : (language === 'si' ? 'පියවර 1 අපේක්ෂාවෙන්' : 'Stage 1 Pending')}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a' }}>
              {request.department_name || request.details?.forwardedDepartment?.name || request.details?.department || (language === 'si' ? 'දෙපාර්තමේන්තුව දක්වා නැත' : 'General Department')}
            </div>
            {request.details?.departmentHeadEndorsement ? (
              <div style={{ marginTop: '6px', padding: '8px 10px', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0', fontSize: '11px', color: '#065f46' }}>
                <strong>{language === 'si' ? 'ආයතන ප්‍රධානී නිර්දේශ ලිපිය (Est. Code XV 10:1):' : 'Head of Department Clearance (Est. Code XV 10:1):'}</strong>{' '}
                {request.details.departmentHeadEndorsement.recommendation === 'recommended' ? (language === 'si' ? 'නිවාඩු නිර්දේශ කර ඇත' : 'Leave Recommended') : (language === 'si' ? 'නිර්දේශ කර නැත' : 'Not Recommended')}{' '}
                · <span>{request.details.departmentHeadEndorsement.myNo}</span>
                {request.details.departmentHeadEndorsement.completedBy?.name && (
                  <span style={{ display: 'block', fontSize: '10.5px', color: '#047857', marginTop: '2px' }}>
                    {request.details.departmentHeadEndorsement.completedBy.name} ({request.details.departmentHeadEndorsement.completedBy.designation || 'Head of Institution'})
                  </span>
                )}
              </div>
            ) : (
              <div style={{ marginTop: '6px', fontSize: '11px', color: '#64748b' }}>
                {language === 'si'
                  ? 'අයදුම්කරු විසින් අයදුම්පත යොමු කිරීමේදී මෙම ආයතනය තෝරාගෙන ඇත.'
                  : 'Selected by applicant during initial submission.'}
              </div>
            )}
          </div>

          {/* Forwarding Ministerial Official Selection Bar */}
          <div className="officer-authority-select-section" style={{ marginTop: '16px', padding: '14px', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <UserCheck size={16} style={{ color: '#2563eb' }} />
              <strong style={{ fontSize: '12px', color: '#0f172a' }}>
                {language === 'si' ? 'අත්සන් හා අනුමැතිය සඳහා යොමු කරන අමාත්‍යාංශ නිලධාරී තනතුර තෝරන්න (Forward to Officer) *' : 'Select Ministerial Officer to Forward for Signature & Clearance *'}
              </strong>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '11px', color: '#475569', lineHeight: 1.4 }}>
              {language === 'si'
                ? 'සියලු ලියකියවිලි පරීක්ෂා කර අත්සන් ලබාගැනීම සඳහා පහත තනතුරුවලින් සුදුසු නිලධාරියා තෝරා ඉදිරිපත් කරන්න (පියවරෙන් පියවර අත්සන් ලබාගැනීමේ ක්‍රියාවලිය):'
                : 'Select the ministerial designation to forward the dossier for checking and signature (Sequential review workflow):'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '8px' }}>
              {[
                { id: 'assistant_secretary', en: 'Assistant Secretary', si: 'සහකාර ලේකම්', sub: language === 'si' ? 'පළමු පෙළ සමාලෝචනය' : 'First tier clearance' },
                { id: 'senior_assistant_secretary', en: 'Senior Assistant Secretary', si: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්', sub: language === 'si' ? 'දෙවන පෙළ සමාලෝචනය' : 'Senior tier clearance' },
                { id: 'additional_secretary', en: 'Additional Secretary', si: 'අතිරේක ලේකම්', sub: language === 'si' ? 'අතිරේක ලේකම් පරීක්ෂාව' : 'Division clearance' },
                { id: 'secretary', en: 'Secretary', si: 'අමාත්‍යාංශ ලේකම්', sub: language === 'si' ? 'අවසාන විධායක බලධාරී' : 'Chief accounting officer' },
              ].map((roleOpt) => {
                const isSelected = targetRole === roleOpt.id;
                return (
                  <label
                    key={roleOpt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: `1.5px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`,
                      background: isSelected ? '#eff6ff' : '#fff',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#1e293b'
                    }}
                  >
                    <input
                      type="radio"
                      name="targetRole"
                      value={roleOpt.id}
                      checked={isSelected}
                      onChange={() => setTargetRole(roleOpt.id)}
                    />
                    <div>
                      <div style={{ color: isSelected ? '#1d4ed8' : '#0f172a', fontWeight: 700 }}>
                        {roleOpt.en}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
                        {roleOpt.si}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Subject Officer Remarks */}
          <div style={{ marginTop: '14px' }}>
            <label className="field-label">
              <span>{language === 'si' ? 'විෂයභාර නිලධාරී සටහන් / නිර්දේශ' : 'Subject Officer Remarks / Verification Notes'}</span>
              <textarea
                rows="2"
                value={officerRemarks}
                onChange={(e) => setOfficerRemarks(e.target.value)}
                placeholder={language === 'si' ? 'නිවාඩු ශේෂ සත්‍යාපනය, සටහන් හෝ නිර්දේශ ඇතුළත් කරන්න...' : 'Enter leave entitlement verifications, remarks, or notes...'}
              />
            </label>
          </div>

          {/* Subject Officer Digital Signature Pad */}
          <div style={{ marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="field-label" style={{ margin: 0, fontWeight: 700, fontSize: '12px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PenTool size={15} style={{ color: '#2563eb' }} />
                <span>{language === 'si' ? 'විෂයභාර නිලධාරී ඩිජිටල් අත්සන (Digital Signature) *' : 'Subject Officer Digital Signature *'}</span>
              </label>
              <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 600 }}>
                {language === 'si' ? '* අනිවාර්යයි' : '* Mandatory'}
              </span>
            </div>
            <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#475569' }}>
              {language === 'si'
                ? 'නිවාඩු ගණනය කිරීම් සහ සියලු ලිපිගොනු පරීක්ෂා කර ඔබගේ ඩිජිටල් අත්සන පහත සටහන් කරන්න:'
                : 'Draw your official digital signature below to certify leave entitlement assessment & Note Sheet:'}
            </p>
            <SignaturePad
              onChange={setOfficerSignature}
              onSave={setOfficerSignature}
              initialSignature={officerSignature}
              language={language}
            />
          </div>

          {error && (
            <div className="form-error" style={{ marginTop: '10px' }}>
              <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {error}
            </div>
          )}

          {success && (
            <div style={{ marginTop: '10px', padding: '8px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
              <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {success}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', gap: '8px' }}>
            {isAlreadyCompleted && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => setIsEditing(false)}
              >
                {language === 'si' ? 'අවලංගු කරන්න' : 'Cancel'}
              </button>
            )}
            <button
              type="submit"
              className="primary-button"
              disabled={busy}
              style={{ background: '#1d4ed8' }}
            >
              {busy ? '…' : (
                language === 'si'
                  ? 'අත්සන් කර තෝරාගත් නිලධාරියා වෙත ඉදිරිපත් කරන්න'
                  : 'Sign & Forward to Selected Officer'
              )}
              <Send size={14} />
            </button>
          </div>
        </form>
      )}

      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}

// =========================================================================
// HEAD OF DEPARTMENT ENDORSEMENT & RECOMMENDATION SECTION (Est. Code XV 10:1)
// Official Forwarding Letter & Institutional Clearance to Ministry Secretary
// =========================================================================
export function DepartmentHeadEndorsementSection({ request, user, language = 'en', token, onSaved }) {
  const existingEndorsement = request?.details?.departmentHeadEndorsement || null;
  const isAlreadyCompleted = Boolean(existingEndorsement);
  const isDeptHead = user?.role === 'department_head';
  const isAdmin = user?.role === 'admin';
  const isDeptHeadOrAdmin = isDeptHead || isAdmin;
  const isDeptHeadStage = request.status === 'Pending Department Head Approval';

  // If not completed and not in Dept Head stage yet (e.g. still in Pending Review), return null
  if (!isAlreadyCompleted && !isDeptHeadStage) {
    return null;
  }

  const [isEditing, setIsEditing] = useState(!isAlreadyCompleted);
  const defaultRefNo = existingEndorsement?.myNo ||
    `${(request.department_name || request.details?.forwardedDepartment?.name || 'DEPT').slice(0, 4).toUpperCase()}/LV/${new Date().getFullYear()}/FV-${String(request.id).padStart(4, '0')}`;

  const [myNo, setMyNo] = useState(defaultRefNo);
  const [ministryName, setMinistryName] = useState(existingEndorsement?.ministryName || 'Technology');
  const [officerSalutation, setOfficerSalutation] = useState(existingEndorsement?.officerSalutation || 'Mr.');
  const [actingArrangementsCertified, setActingArrangementsCertified] = useState(
    existingEndorsement ? Boolean(existingEndorsement.actingArrangementsCertified) : true
  );
  const [noDisciplinaryActionCertified, setNoDisciplinaryActionCertified] = useState(
    existingEndorsement ? Boolean(existingEndorsement.noDisciplinaryActionCertified) : true
  );
  const [primeMinisterPermission, setPrimeMinisterPermission] = useState(
    existingEndorsement?.primeMinisterPermission || 'obtained'
  );
  const [recommendation, setRecommendation] = useState(
    existingEndorsement?.recommendation || 'recommended'
  );
  const [remarks, setRemarks] = useState(existingEndorsement?.remarks || '');
  const [date, setDate] = useState(existingEndorsement?.date || new Date().toISOString().slice(0, 10));
  const [signature, setSignature] = useState(existingEndorsement?.signature || '');
  const [targetAuthority, setTargetAuthority] = useState('authorized_official');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const applicantName = request.applicant_name || request.details?.fullName || 'Applicant Officer';
  const headOfficialName = user?.name || request.details?.forwardedDepartment?.headName || 'Head of Department';
  const headOfficialDesignation = user?.designation || request.details?.forwardedDepartment?.headDesignation || 'Head of Department / Institution';
  const headInstitution = request.department_name || request.details?.forwardedDepartment?.name || user?.department_name || 'Institution';

  const clearances = Array.isArray(request?.details?.secretariatClearances) ? request.details.secretariatClearances : [];
  const secretaryClearance = clearances.find(c => c.role === 'secretary' || c.decision === 'approve') || request?.details?.secretaryApproval || (request.status === 'Approved' ? {
    userName: 'වරුෂණ ශ්‍රී ධනපාල',
    userDesignation: 'ලේකම් (Secretary), සිවිල් ආරක්ෂක අමාත්‍යාංශය',
    ministryName: 'සිවිල් ආරක්ෂක අමාත්‍යාංශය',
    date: request.updated_at?.slice(0, 10) || ''
  } : null);
  const isSecretaryDecided = Boolean(secretaryClearance || request.status === 'Approved' || request.status === 'Pending Presidential Approval');
  const isSecretaryApproved = request.status === 'Approved' || request.status === 'Pending Presidential Approval' || secretaryClearance?.decision === 'approve';
  const isSecretaryRejected = request.status === 'Rejected' || secretaryClearance?.decision === 'reject';
  const secRefNo = secretaryClearance?.myNo || (request.id ? `MCS/SEC/${new Date().getFullYear()}/FV-${String(request.id).padStart(4, '0')}` : '...........................');
  const secName = secretaryClearance?.userName || secretaryClearance?.signatoryName || (request.status === 'Approved' ? 'වරුෂණ ශ්‍රී ධනපාල' : '');
  const secSignature = secretaryClearance?.signature;
  const secDate = secretaryClearance?.date || secretaryClearance?.timestamp?.slice(0, 10) || (request.status === 'Approved' ? request.updated_at?.slice(0, 10) : '...........................');
  const secMinistry = secretaryClearance?.ministryName || existingEndorsement?.ministryName || 'Civil Security';

  async function handleSubmit(actionType = 'forward_reviewer') {
    setError('');
    setSuccess('');

    if (!signature || !signature.trim()) {
      setError(language === 'si' ? 'කරුණාකර ආයතන ප්‍රධානියාගේ ඩිජිටල් අත්සන ඇතුළත් කරන්න.' : 'Please add your digital signature as Head of Department.');
      return;
    }

    if (recommendation === 'recommended' && (!actingArrangementsCertified || !noDisciplinaryActionCertified)) {
      setError(language === 'si' ? 'වැඩ බැලීමේ විධිවිධාන සහ විනය ක්‍රියාමාර්ග නොමැති බව සහතික කිරීම අනිවාර්ය වේ.' : 'You must formally certify acting arrangements and clearance of disciplinary proceedings.');
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`/api/requests/${request.id}/department-head-endorsement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
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
          action: actionType,
          targetAuthority
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit department head endorsement.');

      setSuccess(language === 'si' ? 'ආයතන ප්‍රධානියාගේ නිර්දේශය සහ සහතිකය සාර්ථකව ඉදිරිපත් කරන ලදී!' : 'Head of Department endorsement and recommendation submitted successfully!');
      setIsEditing(false);
      if (onSaved) onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="dept-endorsement-wrapper" style={{ marginTop: '20px' }}>
      {/* SECTION HEADER */}
      <div className="officer-section-header" style={{ borderColor: '#7c3aed', background: '#f5f3ff', padding: '12px 14px', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} style={{ color: '#7c3aed' }} />
            <h3 style={{ margin: 0, fontSize: '13px', color: '#5b21b6', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {language === 'si' ? 'දෙපාර්තමේන්තු / ආයතන ප්‍රධානියාගේ නිර්දේශය සහ සහතිකය' : 'HEAD OF DEPARTMENT ENDORSEMENT & RECOMMENDATION'}
            </h3>
          </div>
          <span style={{ fontSize: '10.5px', color: '#6d28d9', marginTop: '3px', display: 'block' }}>
            {language === 'si'
              ? 'ආයතන සංග්‍රහය XV වැනි පරිච්ඡේදයේ 10:1 වගන්තිය යටතේ අමාත්‍යාංශ ලේකම් වෙත යොමු කිරීම'
              : 'Forwarding Letter to the Ministry Secretary · Chapter XV Section 10:1 of the Establishments Code'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAlreadyCompleted && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printDepartmentHeadLetterPdf(request)}
              title={language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානියා පුරවනු ලබන ලිපිය PDF ලෙස බාගන්න' : 'Download Head of Department Forwarding Letter as PDF'}
              style={{
                fontSize: '11px',
                height: '30px',
                padding: '0 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderColor: '#8b5cf6',
                background: '#f5f3ff',
                color: '#6d28d9',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <FileDown size={13} />
              <span>{language === 'si' ? '📄 ආයතන ප්‍රධානී ලිපිය' : '📄 Dept Head Letter'}</span>
            </button>
          )}
          {isSecretaryDecided && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printSecretaryApprovalLetterPdf(request)}
              title={language === 'si' ? 'අමාත්‍යාංශ ලේකම්ගේ නිවාඩු අනුමත ලිපිය PDF ලෙස බාගන්න' : 'Download Ministry Secretary Approval Letter as PDF'}
              style={{
                fontSize: '11px',
                height: '30px',
                padding: '0 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderColor: '#86efac',
                background: '#f0fdf4',
                color: '#15803d',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <FileDown size={13} />
              <span>{language === 'si' ? '📄 ලේකම් ලිපිය' : '📄 Secretary Letter'}</span>
            </button>
          )}
          {isAlreadyCompleted && !isEditing && isDeptHeadOrAdmin && isDeptHeadStage && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => setIsEditing(true)}
              style={{ fontSize: '11px', height: '30px', padding: '0 10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <Edit3 size={13} />
              <span>{language === 'si' ? 'සංස්කරණය' : 'Edit'}</span>
            </button>
          )}
        </div>
      </div>

      {/* COMPLETED DOCUMENT VIEW */}
      {isAlreadyCompleted && !isEditing ? (
        <div className="dept-doc-paper" style={{ background: '#fff', border: '1.5px solid #ddd6fe', borderTop: 'none', padding: '24px 28px', borderRadius: '0 0 8px 8px', boxShadow: '0 2px 6px rgba(124, 58, 237, 0.05)' }}>
          {/* Top Letterhead Grid */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: '#1e293b', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>
                {language === 'si' ? 'ලේකම්,' : 'The Secretary,'}
              </div>
              <div style={{ fontWeight: 600 }}>
                {existingEndorsement.ministryName} {language === 'si' ? 'අමාත්‍යාංශය' : 'Ministry'}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>
                செயலாளர், {existingEndorsement.ministryName} அமைச்சு
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '11px', background: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '10px', color: '#64748b' }}>
                මගේ අංකය / எனது இல. / My No.
              </div>
              <strong style={{ fontSize: '12px', color: '#1e293b', letterSpacing: '0.3px' }}>
                {existingEndorsement.myNo}
              </strong>
            </div>
          </div>

          {/* Paragraph 1 */}
          <div className="dept-clause-block" style={{ marginBottom: '16px', background: '#faf5ff', padding: '12px 14px', borderRadius: '6px', borderLeft: '3px solid #7c3aed' }}>
            <div style={{ fontSize: '11px', lineHeight: 1.6, color: '#1e293b' }}>
              <strong>1. {applicantName}</strong> {language === 'si' ? 'මහතාගේ/මහත්මියගේ නිවාඩු ඉල්ලුම් පත්‍රයේ පිටපත් දෙකක් මේ සමග ඉදිරිපත් කරමි. මේ නිලධාරියාගේ/නිලධාරිනියගේ වැඩ බැලීම සඳහා වැඩ පිළිවෙලක් යොදා ඇති බවත්, ඔහුට/ඇයට විරුද්ධව විනයානුකූල ක්‍රියා මාර්ගයක් දැනට පවත්වන්නේවත්, එසේ විනයානුකූල ක්‍රියා මාර්ගයක් ගැනීමට අදහස් කර ඇත්තේවත් නැති බව සහතික කරමි.' : 'මහතාගේ/මහත්මියගේ නිවාඩු ඉල්ලුම් පත්‍රයේ පිටපත් දෙකක් මේ සමග ඉදිරිපත් කරමි. මේ නිලධාරියාගේ/නිලධාරිනියගේ වැඩ බැලීම සඳහා වැඩ පිළිවෙලක් යොදා ඇති බවත්, ඔහුට/ඇයට විරුද්ධව විනයානුකූල ක්‍රියා මාර්ගයක් දැනට පවත්වන්නේවත්, එසේ විනයානුකූල ක්‍රියා මාර්ගයක් ගැනීමට අදහස් කර ඇත්තේවත් නැති බව සහතික කරමි.'}
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>
              "I forward herewith two copies of the leave application of {applicantName}. I certify that acting arrangements have been made and that there is no disciplinary action pending or contemplated against this officer."
            </div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontSize: '10.5px', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>{language === 'si' ? 'වැඩ බැලීම සහ විනය නිෂ්කාශනය ආයතන ප්‍රධානියා විසින් තහවුරු කරන ලදී' : 'Acting arrangements & disciplinary clearance certified'}</span>
            </div>
          </div>

          {/* Paragraph 2 */}
          <div className="dept-clause-block" style={{ marginBottom: '16px', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#1e293b' }}>
              <strong>2.</strong> ආයතන සංග්‍රහයේ XV වැනි පරිච්ඡේදයේ 10: 1 වැනි වගන්තිය යටතේ අග්‍රාමාත්‍යවරයාගේ අවසරය ලබා ගෙන තිබේ.
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '3px' }}>
              தாபනக் கோவையின் XV ஆம் அத்தியாயத்தின் 10.1 ஆம் பிரிவின் பிரகாரம் பிரதம அமைச்சரின் அனுமதி பெறப்பட்டுள்ளது.
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>
              Prime Minister's permission has been obtained in terms of Chapter XV - 10: 1 of the Establishments Code.
            </div>
            <div style={{ marginTop: '6px', fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>
              Status: {existingEndorsement.primeMinisterPermission === 'obtained' ? 'Obtained / ලබා ගෙන තිබේ' : 'Not Applicable / අදාළ නොවේ (Below Head of Dept / Standard leave)'}
            </div>
          </div>

          {/* Paragraph 3 */}
          <div className="dept-clause-block" style={{ marginBottom: '16px', padding: '12px 14px', background: existingEndorsement.recommendation === 'recommended' ? '#f0fdf4' : '#fef2f2', borderRadius: '6px', border: `1px solid ${existingEndorsement.recommendation === 'recommended' ? '#86efac' : '#fca5a5'}` }}>
            <div style={{ fontSize: '11px', color: '#1e293b' }}>
              <strong>3.</strong> නිවාඩු නිර්දේශ කරමි / නො කරමි * · விடுதலையை விதந்துரைக்கிறேன் / விதந்துரைக்கவில்லை * · Leave is recommended / not recommended. *
            </div>
            <div style={{ marginTop: '8px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.4px',
                background: existingEndorsement.recommendation === 'recommended' ? '#dcfce7' : '#fee2e2',
                color: existingEndorsement.recommendation === 'recommended' ? '#15803d' : '#b91c1c'
              }}>
                {existingEndorsement.recommendation === 'recommended' ? <CheckCircle2 size={14} /> : <X size={14} />}
                {existingEndorsement.recommendation === 'recommended'
                  ? (language === 'si' ? 'නිවාඩු නිර්දේශ කරමි (LEAVE IS RECOMMENDED)' : 'LEAVE IS RECOMMENDED')
                  : (language === 'si' ? 'නිවාඩු නිර්දේශ නොකරමි (LEAVE IS NOT RECOMMENDED)' : 'LEAVE IS NOT RECOMMENDED')}
              </span>
            </div>
            {existingEndorsement.remarks && (
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#334155', fontStyle: 'italic' }}>
                <strong>{language === 'si' ? 'විශේෂ සටහන් / නිර්දේශ:' : 'Remarks / Observations:'}</strong> {existingEndorsement.remarks}
              </div>
            )}
          </div>

          {/* Signoff Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1.5px solid #0f172a', paddingTop: '14px', marginTop: '18px' }}>
            <div style={{ fontSize: '11px', color: '#334155' }}>
              <div><strong>දිනය / திகதி / Date:</strong> {existingEndorsement.date}</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                Certified on: {existingEndorsement.completedAt?.slice(0, 10)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              {existingEndorsement.signature && (
                <div style={{ marginBottom: '6px' }}>
                  <img
                    src={existingEndorsement.signature}
                    alt="Head of Department Signature"
                    style={{ maxHeight: '52px', border: '1px dashed #cbd5e1', padding: '2px', background: '#fff' }}
                  />
                </div>
              )}
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                {existingEndorsement.completedBy?.name || headOfficialName}
              </div>
              <div style={{ fontSize: '10px', color: '#475569', fontWeight: 600 }}>
                {existingEndorsement.completedBy?.designation || headOfficialDesignation}
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748b' }}>
                {existingEndorsement.completedBy?.department || headInstitution}
              </div>
              <div style={{ fontSize: '9px', color: '#7c3aed', fontWeight: 700, marginTop: '2px' }}>
                දෙපාර්තමේන්තු ප්‍රධානියාගේ අත්සන සහ නිල නාමය · Head of Department
              </div>
            </div>
          </div>

          {/* Official Part 2: Ministry Secretary Leave Approval / Directive (Est. Code XV 10:1) */}
          {isSecretaryDecided ? (
            <div style={{
              marginTop: '22px',
              background: isSecretaryApproved ? '#f0fdf4' : '#fef2f2',
              border: `1.5px dashed ${isSecretaryApproved ? '#86efac' : '#fca5a5'}`,
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#334155' }}>
                  {language === 'si' ? 'අමාත්‍යාංශ ලේකම්ගේ තීරණය හා නියෝගය (Ministry Secretary Decision & Directive)' : 'Ministry Secretary Decision & Directive (Est. Code XV 10:1)'}
                </div>
                <div style={{ fontSize: '11px', color: '#475569' }}>
                  {'my no.}'} <span style={{ borderBottom: '1px dotted #000', padding: '0 6px', fontWeight: 'bold' }}>{secRefNo}</span>
                </div>
              </div>

              <div style={{ fontSize: '11px', marginBottom: '18px', lineHeight: 1.5 }}>
                <span style={{ borderBottom: '1px dotted #000', padding: '0 6px', minWidth: '220px', display: 'inline-block' }}>
                  {existingEndorsement.completedBy?.name || headOfficialName || '......................................................................'}
                </span><br />
                <strong>Head of Department.</strong>
              </div>

              <div style={{ textAlign: 'center', margin: '18px 0 24px', fontSize: '13.5px' }}>
                <div style={{ borderBottom: '1px dotted #000', width: '240px', margin: '0 auto 6px' }}></div>
                <div>
                  {isSecretaryApproved ? (
                    <span>Leave is <strong style={{ textDecoration: 'underline', color: '#16a34a' }}>approved</strong> / <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>not approved</span></span>
                  ) : (
                    <span>Leave is <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>approved</span> / <strong style={{ textDecoration: 'underline', color: '#dc2626' }}>not approved</strong></span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontSize: '11px' }}>
                  <div>{'Date}'} <span style={{ borderBottom: '1px dotted #000', padding: '0 6px' }}>{secDate}</span></div>
                  <div style={{ marginTop: '10px', fontSize: '10px', color: '#475569', fontStyle: 'italic' }}>
                    copy to: Secretary to the Prime Minister.
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontSize: '11px' }}>
                  {secSignature ? (
                    <img src={secSignature} alt="Secretary Signature" style={{ maxHeight: '44px', maxWidth: '150px', display: 'block', margin: '0 auto 4px' }} />
                  ) : (
                    <div style={{ height: '32px', borderBottom: '1px dotted #000', width: '170px', margin: '0 auto 4px' }}></div>
                  )}
                  <div style={{ borderTop: '1px dotted #000', paddingTop: '4px' }}>
                    {secName && <strong style={{ display: 'block', fontSize: '10.5px' }}>{secName}</strong>}
                    <strong>Secretary.</strong><br />
                    ministry of <span style={{ borderBottom: '1px dotted #000', padding: '0 4px', fontWeight: 'bold' }}>{secMinistry || ministryName || '...............................'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              marginTop: '22px',
              background: '#f8fafc',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '8px',
              padding: '18px 20px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', marginBottom: '8px' }}>
                <Lock size={18} />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                {language === 'si' ? 'අමාත්‍යාංශ ලේකම්ගේ කොටස (Part II: Secretary Approval) තවමත් සම්පූර්ණ කර නොමැත' : 'Part II: Ministry Secretary Approval & Directive is Pending'}
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>
                {language === 'si'
                  ? 'අමාත්‍යාංශ ලේකම් විසින් මෙම කොටස අත්සන් කර සම්පූර්ණ කරන තෙක් කිසිදු පරිශීලකයෙකුට මෙය බැලීමට හෝ බාගත කිරීමට නොහැක.'
                  : 'This section is strictly locked and cannot be viewed or downloaded until formally signed by the Ministry Secretary.'}
              </p>
            </div>
          )}

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #ddd6fe', display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="secondary-button"
              onClick={() => printDepartmentHeadLetterPdf(request)}
              title={language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානියා පුරවනු ලබන ලිපිය වෙනම PDF ලෙස බාගන්න' : 'Download Head of Department Forwarding Letter as PDF'}
              style={{
                fontSize: '11px',
                height: '32px',
                padding: '0 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: '#8b5cf6',
                background: '#f5f3ff',
                color: '#6d28d9',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <FileDown size={14} />
              <span>{language === 'si' ? '📄 දෙපාර්තමේන්තු ප්‍රධානී ලිපිය PDF බාගන්න' : '📄 Download Head of Dept Letter PDF'}</span>
            </button>
            {isSecretaryDecided ? (
              <button
                type="button"
                className="secondary-button"
                onClick={() => printSecretaryApprovalLetterPdf(request)}
                title={language === 'si' ? 'අමාත්‍යාංශ ලේකම්ගේ නිවාඩු අනුමත ලිපිය (Leave is approved/not approved) PDF ලෙස බාගන්න' : 'Download Ministry Secretary Approval Letter as PDF'}
                style={{
                  fontSize: '11px',
                  height: '32px',
                  padding: '0 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#86efac',
                  background: '#f0fdf4',
                  color: '#15803d',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <FileDown size={14} />
                <span>{language === 'si' ? '📄 ලේකම්ගේ ලිපිය PDF බාගන්න' : '📄 Download Secretary Letter PDF'}</span>
              </button>
            ) : (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                color: '#b91c1c',
                fontSize: '11px',
                fontWeight: 600
              }}>
                <Lock size={13} />
                <span>{language === 'si' ? 'අමාත්‍යාංශ ලේකම් සම්පූර්ණ කරන තෙක් ලේකම් ලිපිය අගුළුලා ඇත' : 'Secretary Letter locked until signed by Secretary'}</span>
              </span>
            )}
          </div>
        </div>
      ) : !isDeptHeadOrAdmin ? (
        <div style={{ background: '#fff', border: '1.5px solid #ddd6fe', borderTop: 'none', padding: '18px 22px', borderRadius: '0 0 8px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6d28d9', background: '#faf5ff', padding: '12px 14px', borderRadius: '6px', border: '1px solid #e9d5ff' }}>
            <Clock size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '12px', display: 'block', color: '#5b21b6' }}>
                {language === 'si' ? 'ආයතන ප්‍රධානියාගේ සහතිකය සහ නිර්දේශය අපේක්ෂාවෙන්' : 'Awaiting Head of Department Endorsement'}
              </strong>
              <span style={{ fontSize: '11px', color: '#7c3aed', display: 'block', marginTop: '2px' }}>
                {request.department_name && <span>{language === 'si' ? 'දෙපාර්තමේන්තුව:' : 'Department:'} <strong>{request.department_name}</strong> · </span>}
                {language === 'si'
                  ? 'අදාළ ආයතන ප්‍රධානියා විසින් සාමාන්‍ය 126 අයදුම්පත සමාලෝචනය කර ආයතන සංග්‍රහයේ XV පරිච්ඡේදයේ 10:1 වගන්තිය යටතේ නිර්දේශ ලිපිය විෂයභාර නිලධාරී වෙත යොමු කරනු ඇත.'
                  : 'The designated Head of Department will review this application, sign the endorsement under Est. Code Chapter XV - 10:1, and forward it to the Subject Officer.'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE FORM FOR DEPARTMENT HEAD */
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit('forward_reviewer'); }}
          className="dept-doc-paper"
          style={{ background: '#fff', border: '1.5px solid #7c3aed', borderTop: 'none', padding: '22px 24px', borderRadius: '0 0 8px 8px' }}
        >
          {/* Top Form Row: Reference No & Ministry */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px', background: '#f8fafc', padding: '12px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                {language === 'si' ? 'ලේකම් (අමාත්‍යාංශය)' : 'The Secretary, Ministry of...'} *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  required
                  value={ministryName}
                  onChange={(e) => setMinistryName(e.target.value)}
                  placeholder="e.g. Technology"
                  style={{ flex: 1, height: '32px', fontSize: '11.5px', padding: '0 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {language === 'si' ? 'අමාත්‍යාංශය' : 'Ministry'}
                </span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                මගේ අංකය / எனது இல. / My No. *
              </label>
              <input
                type="text"
                required
                value={myNo}
                onChange={(e) => setMyNo(e.target.value)}
                placeholder="e.g. SLT/LV/2026/042"
                style={{ width: '100%', height: '32px', fontSize: '11.5px', padding: '0 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          {/* PARAGRAPH 1: Verification & Certification */}
          <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#faf5ff', borderRadius: '6px', border: '1px solid #e9d5ff' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#5b21b6', marginBottom: '4px' }}>
              1. {language === 'si' ? 'වැඩ බැලීම සහ විනය ක්‍රියාමාර්ග පිළිබඳ සහතිකය' : 'Acting Arrangements & Disciplinary Clearance Certification'}
            </div>
            <div style={{ fontSize: '11px', lineHeight: 1.6, color: '#1e293b', marginBottom: '8px' }}>
              <strong>1. {applicantName}</strong> {language === 'si' ? 'මහතාගේ/මහත්මියගේ නිවාඩු ඉල්ලුම් පත්‍රයේ පිටපත් දෙකක් මේ සමග ඉදිරිපත් කරමි. මේ නිලධාරියාගේ/නිලධාරිනියගේ වැඩ බැලීම සඳහා වැඩ පිළිවෙලක් යොදා ඇති බවත්, ඔහුට/ඇයට විරුද්ධව විනයානුකූල ක්‍රියා මාර්ගයක් දැනට පවත්වන්නේවත්, එසේ විනයානුකූල ක්‍රියා මාර්ගයක් ගැනීමට අදහස් කර ඇත්තේවත් නැති බව සහතික කරමි.' : 'මහතාගේ/මහත්මියගේ නිවාඩු ඉල්ලුම් පත්‍රයේ පිටපත් දෙකක් මේ සමග ඉදිරිපත් කරමි. මේ නිලධාරියාගේ/නිලධාරිනියගේ වැඩ බැලීම සඳහා වැඩ පිළිවෙලක් යොදා ඇති බවත්, ඔහුට/ඇයට විරුද්ධව විනයානුකූල ක්‍රියා මාර්ගයක් දැනට පවත්වන්නේවත්, එසේ විනයානුකූල ක්‍රියා මාර්ගයක් ගැනීමට අදහස් කර ඇත්තේවත් නැති බව සහතික කරමි.'}
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic', marginBottom: '10px' }}>
              "I forward herewith two copies of the leave application of {applicantName}. I certify that acting arrangements have been made and that there is no disciplinary action pending or contemplated against this officer."
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#fff', padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#1e293b', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={actingArrangementsCertified}
                  onChange={(e) => setActingArrangementsCertified(e.target.checked)}
                />
                <span>{language === 'si' ? 'වැඩ බැලීම සඳහා විධිමත් වැඩපිළිවෙලක් යොදා ඇති බව සහතික කරමි.' : 'I certify that acting arrangements have been formally made for this officer.'}</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#1e293b', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={noDisciplinaryActionCertified}
                  onChange={(e) => setNoDisciplinaryActionCertified(e.target.checked)}
                />
                <span>{language === 'si' ? 'මෙම නිලධාරියාට විරුද්ධව කිසිදු විනයානුකූල පරීක්ෂණයක් දැනට නොමැති බව සහතික කරමි.' : 'I certify that there is no disciplinary action pending or contemplated against this officer.'}</span>
              </label>
            </div>
          </div>

          {/* PARAGRAPH 2: Est. Code XV 10:1 Prime Minister Permission */}
          <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              2. {language === 'si' ? 'ආයතන සංග්‍රහයේ XV පරිච්ඡේදයේ 10:1 වගන්තිය (අග්‍රාමාත්‍යවරයාගේ අවසරය)' : 'Establishments Code Chapter XV - 10:1 (Prime Minister’s Permission)'}
            </div>
            <div style={{ fontSize: '11px', color: '#1e293b', marginBottom: '3px' }}>
              ආයතන සංග්‍රහයේ XV වැනි පරිච්ඡේදයේ 10: 1 වැනි වගන්තිය යටතේ අග්‍රාමාත්‍යවරයාගේ අවසරය ලබා ගෙන තිබේ.
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic', marginBottom: '8px' }}>
              "Prime Minister's permission has been obtained in terms of Chapter XV - 10: 1 of the Establishments Code."
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#1e293b', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="pmPermission"
                  value="obtained"
                  checked={primeMinisterPermission === 'obtained'}
                  onChange={() => setPrimeMinisterPermission('obtained')}
                />
                <span>{language === 'si' ? 'අවසරය ලබාගෙන තිබේ (Obtained)' : 'Permission Obtained'}</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#1e293b', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="pmPermission"
                  value="not_applicable"
                  checked={primeMinisterPermission === 'not_applicable'}
                  onChange={() => setPrimeMinisterPermission('not_applicable')}
                />
                <span>{language === 'si' ? 'අදාළ නොවේ (Not Applicable / Standard Officer)' : 'Not Applicable (Standard grade)'}</span>
              </label>
            </div>
          </div>

          {/* PARAGRAPH 3: Recommendation Selection */}
          <div style={{ marginBottom: '16px', padding: '14px', background: recommendation === 'recommended' ? '#f0fdf4' : '#fef2f2', borderRadius: '6px', border: `1.5px solid ${recommendation === 'recommended' ? '#86efac' : '#fca5a5'}` }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              3. {language === 'si' ? 'නිවාඩු නිර්දේශය (Leave Recommendation) *' : '3. Leave Recommendation *'}
            </div>
            <div style={{ fontSize: '11px', color: '#334155', marginBottom: '10px' }}>
              නිවාඩු නිර්දේශ කරමි / නො කරමි * · விடுதலையை விதந்துரைக்கிறேன் / விதந்துரைக்கவில்லை * · Leave is recommended / not recommended. *
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setRecommendation('recommended')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `2px solid ${recommendation === 'recommended' ? '#16a34a' : '#cbd5e1'}`,
                  background: recommendation === 'recommended' ? '#dcfce7' : '#fff',
                  color: recommendation === 'recommended' ? '#15803d' : '#475569',
                  fontWeight: 700,
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{language === 'si' ? 'නිවාඩු නිර්දේශ කරමි (Recommended)' : 'Leave is Recommended'}</span>
              </button>

              <button
                type="button"
                onClick={() => setRecommendation('not_recommended')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `2px solid ${recommendation === 'not_recommended' ? '#dc2626' : '#cbd5e1'}`,
                  background: recommendation === 'not_recommended' ? '#fee2e2' : '#fff',
                  color: recommendation === 'not_recommended' ? '#b91c1c' : '#475569',
                  fontWeight: 700,
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <X size={16} />
                <span>{language === 'si' ? 'නිවාඩු නිර්දේශ නොකරමි (Not Recommended)' : 'Leave is Not Recommended'}</span>
              </button>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                {language === 'si' ? 'අමතර සටහන් / උපදෙස් (Optional Remarks to Ministry):' : 'Additional Observations / Remarks to Ministry Secretary:'}
              </label>
              <textarea
                rows="2"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={language === 'si' ? 'අමාත්‍යාංශ ලේකම් වෙත ඉදිරිපත් කරන විශේෂ සටහන්...' : 'Add remarks regarding institutional endorsement, conditions or instructions...'}
                style={{ width: '100%', fontSize: '11px', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          {/* SIGNATURE & DATE SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '16px', background: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                දිනය / திகதி / Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', height: '32px', fontSize: '11.5px', padding: '0 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />

              <div style={{ marginTop: '12px', padding: '8px 10px', background: '#fff', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '10px', color: '#64748b' }}>
                  {language === 'si' ? 'ආයතන ප්‍රධානියාගේ තොරතුරු:' : 'Signer Credentials:'}
                </div>
                <strong style={{ fontSize: '11px', color: '#0f172a', display: 'block', marginTop: '2px' }}>
                  {headOfficialName}
                </strong>
                <span style={{ fontSize: '10px', color: '#475569', display: 'block' }}>
                  {headOfficialDesignation}
                </span>
                <span style={{ fontSize: '9.5px', color: '#7c3aed', display: 'block' }}>
                  {headInstitution}
                </span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                {language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානියාගේ අත්සන' : 'Signature of Head of Department'} *
                <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: 400, marginLeft: '6px' }}>
                  (Digital Signature Pad)
                </span>
              </label>

              <SignaturePad
                onSave={setSignature}
                initialSignature={signature}
                language={language}
              />
            </div>
          </div>

          {/* ERROR & SUCCESS MESSAGES */}
          {error && (
            <div className="form-error" style={{ marginBottom: '12px' }}>
              <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {error}
            </div>
          )}

          {success && (
            <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
              <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {success}
            </div>
          )}

          {/* ACTION SUBMIT BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
            <div>
              {recommendation === 'recommended' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#5b21b6', fontWeight: 600 }}>
                  <UserCheck size={15} style={{ color: '#7c3aed' }} />
                  <span>
                    {language === 'si' ? 'ඊළඟ පියවර: විෂය භාර නිලධාරී තක්සේරුව (Subject Officer Assessment)' : 'Next Step: Subject Officer Review & Note Sheet'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {isAlreadyCompleted && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setIsEditing(false)}
                >
                  {language === 'si' ? 'අවලංගු කරන්න' : 'Cancel'}
                </button>
              )}

              {recommendation === 'not_recommended' ? (
                <>
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={busy}
                    onClick={() => handleSubmit('return')}
                    style={{ borderColor: '#f59e0b', color: '#b45309' }}
                  >
                    <ArrowLeft size={14} />
                    {language === 'si' ? 'අයදුම්පත ආපසු යවන්න (Return)' : 'Return Application'}
                  </button>

                  <button
                    type="button"
                    className="danger-button"
                    disabled={busy}
                    onClick={() => handleSubmit('reject')}
                  >
                    <X size={14} />
                    {language === 'si' ? 'ප්‍රතික්ෂේප කරන්න (Reject)' : 'Reject Application'}
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="primary-button"
                  disabled={busy}
                  style={{ background: '#7c3aed', borderColor: '#6d28d9' }}
                >
                  {busy ? '…' : (
                    language === 'si'
                      ? 'නිර්දේශ කර විෂය භාර නිලධාරී වෙත යොමු කරන්න'
                      : 'Endorse & Forward to Subject Officer'
                  )}
                  <Send size={14} />
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

// =========================================================================
// MINISTERIAL SECRETARIAT MINUTE & SEQUENTIAL CLEARANCE SECTION
// Workflow: Assistant Sec -> Senior Asst Sec -> Addl Sec -> Secretary
// Rule: An officer can ONLY select higher-ranking officers in the hierarchy
// =========================================================================

const MINISTERIAL_SECRETARIAT_RANKS = {
  reviewer: 0,
  assistant_secretary: 1,
  senior_assistant_secretary: 2,
  additional_secretary: 3,
  secretary: 4,
  authorized_official: 4,
  admin: 99
};

const SECRETARIAT_ROLES = [
  { id: 'assistant_secretary', rank: 1, en: 'Assistant Secretary', si: 'සහකාර ලේකම්', badgeColor: '#0284c7', badgeBg: '#f0f9ff', border: '#bae6fd' },
  { id: 'senior_assistant_secretary', rank: 2, en: 'Senior Assistant Secretary', si: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්', badgeColor: '#4f46e5', badgeBg: '#eef2ff', border: '#c7d2fe' },
  { id: 'additional_secretary', rank: 3, en: 'Additional Secretary', si: 'අතිරේක ලේකම්', badgeColor: '#7c3aed', badgeBg: '#f5f3ff', border: '#ddd6fe' },
  { id: 'secretary', rank: 4, en: 'Ministry Secretary', si: 'අමාත්‍යාංශ ලේකම්', badgeColor: '#059669', badgeBg: '#ecfdf5', border: '#a7f3d0' },
];

export function SecretariatMinuteTrailSection({ request, user, language = 'en', token, onSaved, onPrintOfficerAssessment }) {
  const [signature, setSignature] = useState('');
  const [remarks, setRemarks] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearances = Array.isArray(request?.details?.secretariatClearances) ? request.details.secretariatClearances : [];

  // Determine current pending stage and whether active user is eligible
  let currentStageRole = null;
  let currentStageTitleEn = '';
  let currentStageTitleSi = '';

  if (request.status === 'Pending Assistant Secretary Review') {
    currentStageRole = 'assistant_secretary';
    currentStageTitleEn = 'Assistant Secretary Review';
    currentStageTitleSi = 'සහකාර ලේකම් සමාලෝචනය';
  } else if (request.status === 'Pending Senior Assistant Secretary Review') {
    currentStageRole = 'senior_assistant_secretary';
    currentStageTitleEn = 'Senior Assistant Secretary Review';
    currentStageTitleSi = 'ජ්‍යෙෂ්ඨ සහකාර ලේකම් සමාලෝචනය';
  } else if (request.status === 'Pending Additional Secretary Review') {
    currentStageRole = 'additional_secretary';
    currentStageTitleEn = 'Additional Secretary Review';
    currentStageTitleSi = 'අතිරේක ලේකම් සමාලෝචනය';
  } else if (request.status === 'Pending Secretary Approval' || request.status === 'Pending Official Authorization') {
    currentStageRole = 'secretary';
    currentStageTitleEn = 'Ministry Secretary Approval';
    currentStageTitleSi = 'අමාත්‍යාංශ ලේකම් අනුමැතිය';
  }

  const userRole = user?.role;
  const isSecretaryRole = userRole === 'secretary' || userRole === 'authorized_official';
  const isCurrentStageOfficer = currentStageRole && (
    userRole === currentStageRole ||
    userRole === 'admin' ||
    (currentStageRole === 'secretary' && isSecretaryRole)
  );

  // Calculate user's effective rank for hierarchy restriction
  const effectiveRank = userRole === 'admin'
    ? (MINISTERIAL_SECRETARIAT_RANKS[currentStageRole] || 1)
    : (MINISTERIAL_SECRETARIAT_RANKS[userRole] || 1);

  // Targets strictly higher in rank than effectiveRank
  const allowedForwardTargets = SECRETARIAT_ROLES.filter(r => r.rank > effectiveRank);
  const isFinalAuthority = effectiveRank >= 4 || currentStageRole === 'secretary';

  const defaultNextTarget = allowedForwardTargets.length > 0 ? allowedForwardTargets[0].id : '';
  const [targetRole, setTargetRole] = useState(defaultNextTarget);

  // Keep targetRole updated if allowedForwardTargets change
  useEffect(() => {
    if (allowedForwardTargets.length > 0 && !allowedForwardTargets.some(r => r.id === targetRole)) {
      setTargetRole(allowedForwardTargets[0].id);
    }
  }, [currentStageRole, effectiveRank]);

  async function handleAction(decision) {
    setError('');
    setSuccess('');

    if (decision === 'forward' || decision === 'approve') {
      if (!signature || !signature.trim()) {
        setError(language === 'si' ? 'කරුණාකර ඔබගේ ඩිජිටල් අත්සන සටහන් කරන්න.' : 'Please draw and add your official digital signature.');
        return;
      }
      if (decision === 'forward' && !targetRole) {
        setError(language === 'si' ? 'කරුණාකර ඉදිරිපත් කරන ඊළඟ උසස් නිලධාරියා තෝරන්න.' : 'Please select the next officer in the hierarchy to forward to.');
        return;
      }
    }

    setBusy(true);
    try {
      const response = await fetch(`/api/requests/${request.id}/secretariat-clearance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          signature,
          note: remarks,
          decision,
          targetRole: decision === 'forward' ? targetRole : undefined
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit clearance action');
      }

      setSuccess(
        decision === 'approve'
          ? (language === 'si' ? 'අයදුම්පත සඳහා අවසාන අනුමැතිය සාර්ථකව ලබාදෙන ලදී!' : 'Final approval granted successfully!')
          : (decision === 'forward'
              ? (language === 'si' ? 'අත්සන් කර ඊළඟ නිලධාරියා වෙත සාර්ථකව යොමු කරන ලදී.' : 'Signed and forwarded to next officer successfully.')
              : (language === 'si' ? 'ක්‍රියාමාර්ගය සාර්ථකව සටහන් කරන ලදී.' : 'Action recorded successfully.'))
      );
      setSignature('');
      setRemarks('');
      onSaved?.();
    } catch (err) {
      setError(err.message || 'Error processing request');
    } finally {
      setBusy(false);
    }
  }

  // Synthesize complete audit trail including Subject Officer if available
  const allClearances = [...clearances];
  if (!allClearances.some(c => c.role === 'reviewer') && request?.details?.officerCompleted) {
    allClearances.unshift({
      role: 'reviewer',
      title: 'Subject Officer',
      titleSi: 'විෂයභාර නිලධාරී',
      userName: request.details?.officerCompletedBy?.name || 'විෂයභාර නිලධාරී',
      userDesignation: 'විෂයභාර නිලධාරී (Subject Officer)',
      signature: request.details?.officerSignature || null,
      remarks: request.details?.officerRemarks || '',
      date: request.details?.officerCompletedAt?.slice(0, 10) || '',
      forwardedToTitle: request.details?.secretariatClearances?.[0]?.forwardedToTitle || 'Assistant Secretary',
      decision: 'forward'
    });
  }

  // If approved and secretaryApproval exists in details but not yet in clearances array:
  if (request?.status === 'Approved' && !allClearances.some(c => c.role === 'secretary' || c.decision === 'approve') && request?.details?.secretaryApproval) {
    allClearances.push({
      role: 'secretary',
      title: 'Ministry Secretary',
      titleSi: 'අමාත්‍යාංශ ලේකම්',
      userName: request.details.secretaryApproval.signatoryName || 'වරුෂණ ශ්‍රී ධනපාල',
      userDesignation: 'ලේකම් (Secretary), සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      ministryName: 'සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      signature: request.details.secretaryApproval.signature,
      remarks: request.details.secretaryApproval.remarks || '',
      date: request.details.secretaryApproval.date || request.details.secretaryApproval.timestamp?.slice(0, 10),
      decision: 'approve'
    });
  }

  // If there are no clearances and not in any secretariat stage, don't show
  if (allClearances.length === 0 && !isCurrentStageOfficer && !currentStageRole) {
    return null;
  }

  return (
    <div className="officer-use-panel highlight" style={{ marginTop: '18px', borderColor: '#93c5fd' }}>
      <div className="officer-panel-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Landmark size={18} style={{ color: '#0284c7' }} />
            <span>
              {language === 'si'
                ? 'සටහන් පත්‍රිකාව (Official Note Sheet) · සිවිල් ආරක්ෂක අමාත්‍යාංශය'
                : 'Official Note Sheet · Ministry of Civil Security'}
            </span>
          </h3>
          <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#64748b' }}>
            {language === 'si'
              ? 'විෂයභාර නිලධාරී ➔ සහකාර ලේකම් ➔ ජ්‍යෙෂ්ඨ සහකාර ලේකම් ➔ අතිරේක ලේකම් ➔ අමාත්‍යාංශ ලේකම්'
              : 'Subject Officer ➔ Assistant Secretary ➔ Senior Assistant Secretary ➔ Additional Secretary ➔ Secretary'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {currentStageRole && (
            <span style={{
              fontSize: '11px',
              background: '#e0f2fe',
              color: '#0369a1',
              border: '1px solid #7dd3fc',
              padding: '3px 10px',
              borderRadius: '12px',
              fontWeight: 700
            }}>
              {language === 'si' ? currentStageTitleSi : currentStageTitleEn}
            </span>
          )}
          {allClearances.some(c => c.signature || c.decision) ? (
            <button
              type="button"
              className="btn-doc-action"
              onClick={() => printNoteSheetMinisterialPdf(request)}
              title={language === 'si' ? 'අවසර පත්‍රිකාව සහ අමාත්‍ය ඉදිරිපත් කිරීම වෙනම PDF ලෙස බාගන්න' : 'Download Official Clearance Note Sheet & Ministerial Submission as PDF'}
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '6px',
                border: '1px solid #38bdf8',
                background: '#f0f9ff',
                color: '#0369a1',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <FileDown size={13} />
              <span>{language === 'si' ? '📄 අවසර පත්‍රිකාව PDF' : '📄 Clearance Sheet PDF'}</span>
            </button>
          ) : (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              color: '#b91c1c',
              fontSize: '11px',
              fontWeight: 600
            }}>
              <Lock size={12} />
              <span>{language === 'si' ? 'අවසර පත්‍රිකාව අගුළුලා ඇත' : 'Clearance Sheet Locked'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Chronological Note Sheet Entries & Signatures Audit Trail */}
      {allClearances.length > 0 && (
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allClearances.map((c, idx) => {
            const isSubjectOfficer = c.role === 'reviewer';
            const isSecretaryApproval = c.role === 'secretary' || c.decision === 'approve';
            const isIntermediateOfficer = !isSubjectOfficer && !isSecretaryApproval;
            const isReturnOrReject = c.decision === 'return' || c.decision === 'reject';

            if (isSubjectOfficer) {
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #93c5fd',
                    borderRadius: '8px',
                    padding: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#0284c7',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        1
                      </span>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                          {language === 'si' ? '1. විෂයභාර නිලධාරී තක්සේරුව සහ සටහන (Subject Officer Assessment & Minute)' : '1. Subject Officer Assessment & Minute'}
                        </strong>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {c.forwardedToTitle && (
                        <span style={{
                          fontSize: '10.5px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          border: '1px solid #bae6fd',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 600
                        }}>
                          ➔ {c.forwardedToTitle}
                        </span>
                      )}
                      <button
                        type="button"
                        className="btn-doc-action"
                        onClick={() => onPrintOfficerAssessment ? onPrintOfficerAssessment(request) : printSubjectOfficerPdf(request)}
                        title={language === 'si' ? 'මෙම කොටස වෙනම PDF එකක් ලෙස බාගන්න' : 'Download this section as a separate PDF'}
                        style={{
                          fontSize: '10.5px',
                          padding: '2px 8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          borderRadius: '6px',
                          border: '1px solid #93c5fd',
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <FileDown size={12} />
                        <span>{language === 'si' ? 'PDF බාගන්න' : 'Download PDF'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Leave Classification Table matching screenshot */}
                  {request.details?.officerAssessment && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0 10px', fontSize: '10.5px' }}>
                      <thead>
                        <tr style={{ background: '#f1f5f9' }}>
                          <th style={{ border: '1px solid #cbd5e1', padding: '4px 8px', textAlign: 'left' }}>Leave Classification / නිවාඩු වර්ගය</th>
                          <th style={{ border: '1px solid #cbd5e1', padding: '4px 8px', textAlign: 'center', width: '80px' }}>Months</th>
                          <th style={{ border: '1px solid #cbd5e1', padding: '4px 8px', textAlign: 'center', width: '80px' }}>Days</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px' }}>Vacation Leave / නිවාඩු ශේෂය</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.vacationLeave?.months || 0}</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.vacationLeave?.days || 0}</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px' }}>Commuted half-pay leave</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.commutedHalfPay?.months || 0}</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.commutedHalfPay?.days || 0}</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px' }}>Half-Pay leave / අර්ධ වැටුප් නිවාඩු</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.halfPay?.months || 0}</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.halfPay?.days || 0}</td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px' }}>No-Pay leave / වැටුප් රහිත නිවාඩු</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.noPay?.months || 0}</td>
                          <td style={{ border: '1px solid #e2e8f0', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.noPay?.days || 0}</td>
                        </tr>
                        <tr style={{ fontWeight: 'bold', background: '#eff6ff' }}>
                          <td style={{ border: '1px solid #cbd5e1', padding: '4px 8px' }}>Total / එකතුව</td>
                          <td style={{ border: '1px solid #cbd5e1', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.total?.months || 0}</td>
                          <td style={{ border: '1px solid #cbd5e1', padding: '4px 8px', textAlign: 'center' }}>{request.details.officerAssessment?.total?.days || 0}</td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  {c.remarks && (
                    <div style={{
                      marginTop: '8px',
                      padding: '8px 10px',
                      background: '#f8fafc',
                      borderRadius: '6px',
                      border: '1px solid #f1f5f9',
                      fontSize: '11.5px',
                      color: '#1e293b',
                      lineHeight: 1.45
                    }}>
                      <strong style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                        {language === 'si' ? 'නිල සටහන / නිර්දේශය:' : 'Official Minute / Remark:'}
                      </strong>
                      {c.remarks}
                    </div>
                  )}

                  <div style={{
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px dotted #cbd5e1',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.6 }}>
                      <div><strong>{language === 'si' ? 'නම (Name):' : 'Name:'}</strong> {c.userName}</div>
                      <div><strong>{language === 'si' ? 'තනතුර (Designation):' : 'Designation:'}</strong> {c.userDesignation || 'විෂයභාර නිලධාරී (Subject Officer)'}</div>
                      <div><strong>{language === 'si' ? 'අත්සන් කළ දිනය (Date Signed):' : 'Date Signed:'}</strong> {c.date || c.timestamp?.slice(0, 10)}</div>
                    </div>
                    {c.signature && (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                          {language === 'si' ? 'අත්සන (Signature):' : 'Signature:'}
                        </span>
                        <div style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'inline-block' }}>
                          <img
                            src={c.signature}
                            alt="Subject Officer Signature"
                            style={{ maxHeight: '38px', maxWidth: '140px', display: 'block', objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (isIntermediateOfficer) {
              return (
                <div
                  key={idx}
                  style={{
                    background: isReturnOrReject ? '#fffbeb' : '#ffffff',
                    border: `1.5px solid ${isReturnOrReject ? '#fcd34d' : '#cbd5e1'}`,
                    borderRadius: '8px',
                    padding: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#4f46e5',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {idx + 1}
                      </span>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a' }}>
                          {c.title} {c.titleSi ? `(${c.titleSi})` : ''}
                        </strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {c.decision === 'forward' && c.forwardedToTitle && (
                        <span style={{
                          fontSize: '10px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          border: '1px solid #bae6fd',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 600
                        }}>
                          ➔ {c.forwardedToTitle}
                        </span>
                      )}
                      {c.decision === 'return' && (
                        <span style={{
                          fontSize: '10px',
                          background: '#fef3c7',
                          color: '#92400e',
                          border: '1px solid #fde68a',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 700
                        }}>
                          ↩ {language === 'si' ? 'ආපසු යවන ලදී' : 'Returned'}
                        </span>
                      )}
                      {c.decision === 'reject' && (
                        <span style={{
                          fontSize: '10px',
                          background: '#fee2e2',
                          color: '#991b1b',
                          border: '1px solid #fca5a5',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 700
                        }}>
                          ✕ {language === 'si' ? 'ප්‍රතික්ෂේපිතයි' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  </div>

                  {c.remarks && (
                    <div style={{
                      marginTop: '8px',
                      padding: '8px 10px',
                      background: '#f8fafc',
                      borderRadius: '6px',
                      border: '1px solid #f1f5f9',
                      fontSize: '11px',
                      color: '#1e293b',
                      lineHeight: 1.45
                    }}>
                      <strong style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                        {language === 'si' ? 'නිල සටහන / නිර්දේශය:' : 'Official Minute / Recommendation:'}
                      </strong>
                      {c.remarks}
                    </div>
                  )}

                  <div style={{
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px dotted #cbd5e1',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.6 }}>
                      <div><strong>{language === 'si' ? 'නම (Name):' : 'Name:'}</strong> {c.userName}</div>
                      <div><strong>{language === 'si' ? 'තනතුර (Designation):' : 'Designation:'}</strong> {c.userDesignation || c.titleSi || c.title}</div>
                      <div><strong>{language === 'si' ? 'අත්සන් කළ දිනය (Date Signed):' : 'Date Signed:'}</strong> {c.date || c.timestamp?.slice(0, 10)}</div>
                    </div>
                    {c.signature && (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                          {language === 'si' ? 'අත්සන (Signature):' : 'Signature:'}
                        </span>
                        <div style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'inline-block' }}>
                          <img
                            src={c.signature}
                            alt={`${c.title} Signature`}
                            style={{ maxHeight: '38px', maxWidth: '140px', display: 'block', objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            // Secretary Approval Card (Exact ministerial text & signature)
            return (
              <div
                key={idx}
                style={{
                  background: '#f0fdf4',
                  border: '2px solid #86efac',
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 2px 4px rgba(22, 163, 74, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#16a34a',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      ✓
                    </span>
                    <strong style={{ fontSize: '13px', color: '#14532d' }}>
                      {language === 'si' ? 'අමාත්‍යාංශ ලේකම් නිර්දේශය හා අනුමැතිය' : 'Ministry Secretary Recommendation & Approval'}
                    </strong>
                  </div>
                  <span style={{
                    fontSize: '10.5px',
                    background: '#dcfce7',
                    color: '#15803d',
                    border: '1px solid #86efac',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontWeight: 700
                  }}>
                    ✓ {language === 'si' ? 'අනුමතයි' : 'Approved'}
                  </span>
                </div>

                {/* Exact user requested ministerial submission text */}
                <div style={{
                  margin: '12px 0',
                  padding: '14px',
                  background: '#ffffff',
                  border: '1.5px solid #a7f3d0',
                  borderRadius: '6px'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#065f46', marginBottom: '6px' }}>
                    ගරු අමාත්‍යාංශය
                  </div>
                  <p style={{ margin: '0', fontSize: '12.5px', color: '#047857', lineHeight: 1.6, fontWeight: 600 }}>
                    ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.
                  </p>
                </div>

                {c.remarks && c.remarks !== 'ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.' && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '8px 10px',
                    background: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#1e293b'
                  }}>
                    <strong style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                      {language === 'si' ? 'අමතර සටහන්:' : 'Additional Remarks:'}
                    </strong>
                    {c.remarks}
                  </div>
                )}

                <div style={{
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px dashed #86efac',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ fontSize: '11px', color: '#166534', lineHeight: 1.6 }}>
                    <div><strong>{language === 'si' ? 'අත්සන් කළ දිනය (Date Signed):' : 'Date Signed:'}</strong> {c.date || c.timestamp?.slice(0, 10)}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                      <button
                        type="button"
                        className="btn-doc-action"
                        onClick={() => printNoteSheetMinisterialPdf(request)}
                        title={language === 'si' ? 'අවසර පත්‍රිකාව සහ අමාත්‍ය ඉදිරිපත් කිරීම වෙනම PDF ලෙස බාගන්න' : 'Download Clearance Sheet PDF'}
                        style={{
                          fontSize: '10.5px',
                          padding: '3px 9px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          borderRadius: '6px',
                          border: '1px solid #86efac',
                          background: '#f0fdf4',
                          color: '#166534',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <FileDown size={12} />
                        <span>{language === 'si' ? '📄 අවසර පත්‍රිකාව PDF' : '📄 Clearance Sheet PDF'}</span>
                      </button>
                      <button
                        type="button"
                        className="btn-doc-action"
                        onClick={() => printSecretaryApprovalLetterPdf(request)}
                        title={language === 'si' ? 'අමාත්‍යාංශ ලේකම්ගේ නිවාඩු අනුමත ලිපිය (Leave is approved/not approved) PDF ලෙස බාගන්න' : 'Download Secretary Approval Letter as PDF'}
                        style={{
                          fontSize: '10.5px',
                          padding: '3px 9px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          borderRadius: '6px',
                          border: '1px solid #16a34a',
                          background: '#dcfce7',
                          color: '#15803d',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <FileDown size={12} />
                        <span>{language === 'si' ? '📄 ලේකම් ලිපිය PDF (Approved Letter)' : '📄 Secretary Letter PDF'}</span>
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {c.signature && (
                      <div style={{ background: '#fff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #86efac', display: 'inline-block', marginBottom: '4px' }}>
                        <img
                          src={c.signature}
                          alt="Secretary Signature"
                          style={{ maxHeight: '42px', maxWidth: '160px', display: 'block', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#14532d' }}>
                      {c.userName}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#15803d' }}>
                      ලේකම්
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#166534' }}>
                      සිවිල් ආරක්ෂක අමාත්‍යාංශය
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Notice if awaiting another officer */}
      {!isCurrentStageOfficer && currentStageRole && request.status !== 'Approved' && request.status !== 'Rejected' && (
        <div style={{
          marginTop: '14px',
          padding: '12px 14px',
          background: '#f0f9ff',
          border: '1.5px solid #bae6fd',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Clock size={20} style={{ color: '#0284c7', flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '12px', color: '#0369a1', display: 'block' }}>
              {language === 'si' ? 'අමාත්‍යාංශ ලේකම් කාර්යාල සමාලෝචනය සිදුවෙමින් පවතී' : 'Ministry Secretariat Review In Progress'}
            </strong>
            <span style={{ fontSize: '11px', color: '#0284c7' }}>
              {language === 'si'
                ? `මෙම අයදුම්පත මේ වන විට ${currentStageTitleSi} (${currentStageTitleEn}) සඳහා අදාළ නිලධාරී වෙත යොමු කර ඇත.`
                : `This application is currently pending formal checking & minute by ${currentStageTitleEn}.`}
            </span>
          </div>
        </div>
      )}

      {/* ACTIVE SIGNING FORM FOR THE CURRENT STAGE OFFICER */}
      {isCurrentStageOfficer && request.status !== 'Approved' && request.status !== 'Rejected' && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          background: '#ffffff',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <PenTool size={18} style={{ color: '#2563eb' }} />
            <div>
              <strong style={{ fontSize: '13px', color: '#1e3a8a', display: 'block' }}>
                {user?.name || 'Officer'} ({user?.designation || currentStageTitleEn})
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                {isFinalAuthority
                  ? (language === 'si'
                      ? 'අමාත්‍යාංශ ලේකම් වශයෙන් අයදුම්පත පරීක්ෂා කර ඔබගේ නිර්දේශය හා ඩිජිටල් අත්සන සටහන් කරන්න'
                      : 'As Ministry Secretary, check the application, record your recommendation, and add your digital signature')
                  : (language === 'si'
                      ? 'සියලු ලිපිගොනු පරීක්ෂා කර ඔබගේ නිල සටහන හා ඩිජිටල් අත්සන තබා ඉදිරිපත් කරන්න'
                      : 'Check dossier, draw your digital signature, and record your official minute')}
              </span>
            </div>
          </div>

          {/* Special ministerial recommendation text displayed directly before the Secretary signs */}
          {isFinalAuthority && (
            <div style={{
              marginBottom: '14px',
              padding: '14px 16px',
              background: '#f0fdf4',
              border: '2px solid #86efac',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Landmark size={18} style={{ color: '#16a34a' }} />
                  <strong style={{ fontSize: '13.5px', color: '#14532d' }}>
                    ගරු අමාත්‍යාංශය
                  </strong>
                </div>
                <span style={{
                  fontSize: '11px',
                  padding: '3px 9px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  borderRadius: '6px',
                  border: '1px solid #bbf7d0',
                  background: '#ffffff',
                  color: '#15803d',
                  fontWeight: 600
                }}>
                  <Lock size={12} />
                  <span>{language === 'si' ? 'අත්සන් කර අනුමත කළ පසු ලේකම් ලිපිය නිකුත් වේ' : 'Letter available upon signing'}</span>
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#166534', lineHeight: 1.6, fontWeight: 600 }}>
                ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.
              </p>
            </div>
          )}

          {/* Minute remarks textarea */}
          <div style={{ marginBottom: '12px' }}>
            <label className="field-label" style={{ fontWeight: 600, fontSize: '11.5px', color: '#334155' }}>
              {language === 'si' ? 'නිල සටහන / නිර්දේශය (Official Minute / Remarks) *' : 'Official Minute / Recommendation *'}
              <textarea
                rows="2"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={
                  isFinalAuthority
                    ? (language === 'si' ? 'අවසාන අනුමැතිය හෝ උපදෙස් ඇතුළත් කරන්න...' : 'Enter final approval minute, directives, or remarks...')
                    : (language === 'si' ? 'ලියකියවිලි පරීක්ෂා කිරීමේ සටහන් හා නිර්දේශ ඇතුළත් කරන්න...' : 'Enter verification findings, recommendations, or minutes for next authority...')
                }
                style={{ marginTop: '4px' }}
              />
            </label>
          </div>

          {/* Digital Signature Pad & Date */}
          <div style={{ marginBottom: '14px', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <PenTool size={13} style={{ color: '#2563eb' }} />
                {isFinalAuthority
                  ? (language === 'si' ? 'ලේකම්ගේ ඩිජිටල් අත්සන (Signature & Date) *' : 'Secretary Digital Signature & Date *')
                  : (language === 'si' ? 'ඔබගේ ඩිජිටල් අත්සන (Draw Signature) *' : 'Draw Digital Signature *')}
              </span>
              <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 600 }}>
                {language === 'si' ? '* අනිවාර්යයි' : '* Mandatory'}
              </span>
            </div>
            <SignaturePad
              onChange={setSignature}
              onSave={setSignature}
              initialSignature={signature}
              language={language}
            />
            {isFinalAuthority ? (
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px', color: '#334155' }}>
                <div>
                  <strong>{language === 'si' ? 'අත්සන් කරන දිනය:' : 'Date:'}</strong> {new Date().toISOString().slice(0, 10)}
                </div>
                <div style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                  <div>{user?.name || 'Varushana Sri Dhanapala'}</div>
                  <div style={{ color: '#15803d' }}>ලේකම්</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>සිවිල් ආරක්ෂක අමාත්‍යාංශය</div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#64748b' }}>
                <span><strong>{language === 'si' ? 'දිනය:' : 'Date:'}</strong> {new Date().toISOString().slice(0, 10)}</span>
                <span><strong>{language === 'si' ? 'තනතුර:' : 'Designation:'}</strong> {user?.designation || currentStageTitleEn}</span>
              </div>
            )}
          </div>

          {/* STRICT HIERARCHY FORWARDING SELECTOR (Only higher rank officers!) */}
          {!isFinalAuthority && allowedForwardTargets.length > 0 && (
            <div style={{ marginBottom: '14px', padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <UserCheck size={15} style={{ color: '#2563eb' }} />
                <strong style={{ fontSize: '11.5px', color: '#0f172a' }}>
                  {language === 'si' ? 'අත්සන සඳහා ඊළඟට යොමු කරන නිලධාරියා තෝරන්න (Select Next Higher Officer) *' : 'Select Next Higher Officer in Hierarchy to Forward *'}
                </strong>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: '10.5px', color: '#64748b' }}>
                {language === 'si'
                  ? 'නීති රීති අනුව ඔබට තෝරාගත හැක්කේ ඔබගේ තනතුරට වඩා උසස් නිලධාරීන් පමණි (Strict Hierarchy Upward Routing).'
                  : 'Hierarchy rule: You can only forward upward to higher-ranking officers.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                {allowedForwardTargets.map((opt) => {
                  const isSelected = targetRole === opt.id;
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: `1.5px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`,
                        background: isSelected ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#1e293b'
                      }}
                    >
                      <input
                        type="radio"
                        name="secTargetRole"
                        value={opt.id}
                        checked={isSelected}
                        onChange={() => setTargetRole(opt.id)}
                      />
                      <div>
                        <div style={{ color: isSelected ? '#1d4ed8' : '#0f172a', fontWeight: 700 }}>
                          {opt.en}
                        </div>
                        <div style={{ fontSize: '9.5px', color: '#64748b' }}>
                          {opt.si}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}


          {error && (
            <div className="form-error" style={{ marginBottom: '10px' }}>
              <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {error}
            </div>
          )}

          {success && (
            <div style={{ marginBottom: '10px', padding: '8px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
              <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {success}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="secondary-button"
                disabled={busy}
                onClick={() => handleAction('return')}
                style={{ borderColor: '#f59e0b', color: '#b45309' }}
              >
                <ArrowLeft size={14} />
                {language === 'si' ? 'ආපසු හරවන්න (Return)' : 'Return Application'}
              </button>

              <button
                type="button"
                className="danger-button"
                disabled={busy}
                onClick={() => handleAction('reject')}
              >
                <X size={14} />
                {language === 'si' ? 'ප්‍රතික්ෂේප කරන්න (Reject)' : 'Reject Application'}
              </button>
            </div>

            {isFinalAuthority ? (
              <button
                type="button"
                className="primary-button"
                disabled={busy}
                onClick={() => handleAction('approve')}
                style={{ background: '#0f172a', borderColor: '#020617' }}
              >
                <Send size={15} />
                {busy ? '…' : (
                  language === 'si'
                    ? 'අත්සන් කර ගරු ජනාධිපතිතුමා වෙත ඉදිරිපත් කරන්න'
                    : 'Sign & Submit to Hon. President'
                )}
              </button>
            ) : (
              <button
                type="button"
                className="primary-button"
                disabled={busy}
                onClick={() => handleAction('forward')}
                style={{ background: '#2563eb' }}
              >
                <Send size={14} />
                {busy ? '…' : (
                  language === 'si'
                    ? 'අත්සන් කර ඊළඟ නිලධාරියා වෙත යොමු කරන්න'
                    : 'Sign & Forward to Next Officer'
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// PRESIDENTIAL ORDER & FINAL EXECUTIVE DECISION SECTION (CONSTITUTIONAL HEAD)
// =========================================================================
export function PresidentialOrderSection({ request, user, language = 'en', token, onSaved }) {
  const isPresident = user?.role === 'president';
  const isAdmin = user?.role === 'admin';
  const existingDecision = request?.details?.presidentialDecision;
  const isAlreadyDecided = Boolean(existingDecision);

  // Can the current user act?
  // President or Admin can act if not yet decided and application has been submitted by Secretary (or pending presidential approval)
  const isPendingPresidential = request?.status === 'Pending Presidential Approval';
  const hasSecretaryEndorsement = Boolean(request?.details?.secretaryApproval || request?.details?.secretariatClearances?.some(c => c.role === 'secretary'));
  const canAct = (isPresident || isAdmin) && !isAlreadyDecided && (isPendingPresidential || hasSecretaryEndorsement);

  const [decision, setDecision] = useState('approve'); // 'approve' ("නිවාඩුව අනුමත කරමි") or 'reject' ("නිවාඩු අනුමත නොකරමි")
  const [remarks, setRemarks] = useState('');
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // If not decided and not in presidential stage and cannot act, don't show
  if (!isAlreadyDecided && !canAct && !isPendingPresidential) {
    return null;
  }

  async function handleSubmit() {
    setError('');
    setSuccess('');

    if (!signature || !signature.trim()) {
      setError(language === 'si' ? 'කරුණාකර අතිගරු ජනාධිපතිතුමාගේ ඩිජිටල් අත්සන ඇතුළත් කරන්න.' : 'Please draw and add the digital signature.');
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`/api/requests/${request.id}/presidential-decision`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          decision,
          note: remarks,
          signature,
          date
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit presidential decision.');
      }

      setSuccess(
        decision === 'approve'
          ? (language === 'si' ? 'අතිගරු ජනාධිපතිතුමා විසින් විදේශ නිවාඩු ඉල්ලීම සාර්ථකව අනුමත කරන ලදී! ("නිවාඩුව අනුමත කරමි")' : 'Foreign leave approved by the President successfully! ("නිවාඩුව අනුමත කරමි")')
          : (language === 'si' ? 'අතිගරු ජනාධිපතිතුමාගේ තීරණය සටහන් කරන ලදී. ("නිවාඩු අනුමත නොකරමි")' : 'Presidential order recorded: "නිවාඩු අනුමත නොකරමි"')
      );
      if (onSaved) onSaved();
    } catch (err) {
      setError(err.message || 'Error recording presidential decision');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="presidential-order-wrapper" style={{ marginTop: '20px' }}>
      {/* Header */}
      <div style={{
        background: '#0f172a',
        color: '#ffffff',
        padding: '14px 18px',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Landmark size={20} style={{ color: '#fbbf24' }} />
          <div>
            <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              {language === 'si'
                ? 'අතිගරු ජනාධිපතිතුමාගේ නියෝගය සහ අවසාන තීරණය'
                : 'PRESIDENTIAL ORDER & EXECUTIVE DIRECTIVE'}
            </h3>
            <span style={{ fontSize: '10.5px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
              {language === 'si'
                ? 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය · ආණ්ඩුක්‍රම ව්‍යවස්ථාපිත අවසාන අනුමැතිය'
                : 'President & Ministry of Digital Economy · Final Constitutional Authority'}
            </span>
          </div>
        </div>

        {isAlreadyDecided && (
          <span style={{
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '12px',
            fontWeight: 800,
            background: existingDecision.decision === 'approve' ? '#dcfce7' : '#fee2e2',
            color: existingDecision.decision === 'approve' ? '#15803d' : '#b91c1c',
            border: `1px solid ${existingDecision.decision === 'approve' ? '#86efac' : '#fca5a5'}`
          }}>
            {existingDecision.decision === 'approve' ? '✓ නිවාඩුව අනුමතයි' : '✕ අනුමත නොකරන ලදී'}
          </span>
        )}
      </div>

      {/* COMPLETED VIEW */}
      {isAlreadyDecided ? (
        <div style={{
          background: '#ffffff',
          border: '2px solid #0f172a',
          borderTop: 'none',
          padding: '20px 24px',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          {/* Decision Highlight Box */}
          <div style={{
            padding: '14px 18px',
            borderRadius: '6px',
            marginBottom: '16px',
            background: existingDecision.decision === 'approve' ? '#f0fdf4' : '#fef2f2',
            border: `2px solid ${existingDecision.decision === 'approve' ? '#86efac' : '#fca5a5'}`
          }}>
            <div style={{ fontSize: '11px', color: existingDecision.decision === 'approve' ? '#166534' : '#991b1b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
              {language === 'si' ? 'අතිගරු ජනාධිපතිතුමාගේ නියෝගය:' : 'Presidential Decision:'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: existingDecision.decision === 'approve' ? '#14532d' : '#7f1d1d' }}>
              "{existingDecision.decisionText || (existingDecision.decision === 'approve' ? 'නිවාඩුව අනුමත කරමි' : 'නිවාඩු අනුමත නොකරමි')}"
            </div>
          </div>

          {existingDecision.remarks && (
            <div style={{
              marginBottom: '16px',
              padding: '10px 14px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '11.5px',
              color: '#1e293b'
            }}>
              <strong style={{ fontSize: '10.5px', color: '#64748b', display: 'block', marginBottom: '3px' }}>
                {language === 'si' ? 'විශේෂ නියෝග / සටහන් (Directives):' : 'Directives & Remarks:'}
              </strong>
              {existingDecision.remarks}
            </div>
          )}

          {/* Signature & Signatory block */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: '12px',
            borderTop: '1px dashed #cbd5e1',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.6 }}>
              <div><strong>{language === 'si' ? 'නම (Name):' : 'Name:'}</strong> {existingDecision.userName}</div>
              <div><strong>{language === 'si' ? 'අත්සන් කළ දිනය (Date Signed):' : 'Date Signed:'}</strong> {existingDecision.date || existingDecision.timestamp?.slice(0, 10)}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              {existingDecision.signature && (
                <div style={{ background: '#fff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'inline-block', marginBottom: '4px' }}>
                  <img
                    src={existingDecision.signature}
                    alt="President Signature"
                    style={{ maxHeight: '48px', maxWidth: '170px', display: 'block', objectFit: 'contain' }}
                  />
                </div>
              )}
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                (අත්සන / Signature)
              </div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a' }}>
                {existingDecision.userName}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>
                ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ACTIVE SIGNING FORM FOR PRESIDENT OR ADMIN */}
      {canAct && !isAlreadyDecided && (
        <div style={{
          background: '#ffffff',
          border: '2px solid #0f172a',
          borderTop: 'none',
          padding: '20px 24px',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          <div style={{ marginBottom: '14px', fontSize: '11px', color: '#475569' }}>
            {language === 'si'
              ? 'අමාත්‍යාංශ ලේකම්වරයාගේ නිර්දේශය සහ ලිපිගොනු පරීක්ෂා කර ඔබතුමාගේ නියෝගය සහ ඩිජිටල් අත්සන සටහන් කරන්න.'
              : 'Review the dossier and Ministry Secretary recommendation, select your order, and stamp your digital signature.'}
          </div>

          {/* Radio Choices matching user request: "නිවාඩුව අනුමත කරමි" / "නිවාඩු අනුමත නොකරමි" */}
          <div style={{ marginBottom: '16px' }}>
            <label className="field-label" style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a', marginBottom: '8px', display: 'block' }}>
              {language === 'si' ? 'ජනාධිපති නියෝගය (Presidential Decision) *' : 'Presidential Order *'}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: `2px solid ${decision === 'approve' ? '#16a34a' : '#cbd5e1'}`,
                  background: decision === 'approve' ? '#f0fdf4' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="presidentialDecisionRadio"
                  value="approve"
                  checked={decision === 'approve'}
                  onChange={() => setDecision('approve')}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: decision === 'approve' ? '#15803d' : '#0f172a' }}>
                    "නිවාඩුව අනුමත කරමි"
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>
                    Approve Foreign Leave Requisition
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: `2px solid ${decision === 'reject' ? '#dc2626' : '#cbd5e1'}`,
                  background: decision === 'reject' ? '#fef2f2' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="presidentialDecisionRadio"
                  value="reject"
                  checked={decision === 'reject'}
                  onChange={() => setDecision('reject')}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: decision === 'reject' ? '#b91c1c' : '#0f172a' }}>
                    "නිවාඩු අනුමත නොකරමි"
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>
                    Do Not Approve / Reject Application
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Optional Directives / Remarks */}
          <div style={{ marginBottom: '14px' }}>
            <label className="field-label" style={{ fontWeight: 600, fontSize: '11.5px', color: '#334155' }}>
              {language === 'si' ? 'විශේෂ නියෝග හෝ සටහන් (Directives / Remarks)' : 'Directives / Remarks'}
              <textarea
                rows="2"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={language === 'si' ? 'අවශ්‍ය නම් විශේෂ උපදෙස් ඇතුළත් කරන්න...' : 'Enter directives, guidelines or remarks if any...'}
                style={{ marginTop: '4px' }}
              />
            </label>
          </div>

          {/* Signature Pad */}
          <div style={{ marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <PenTool size={13} style={{ color: '#2563eb' }} />
                {language === 'si' ? 'අතිගරු ජනාධිපතිතුමාගේ ඩිජිටල් අත්සන (Draw Signature) *' : 'President Digital Signature *'}
              </span>
              <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 600 }}>* අනිවාර්යයි</span>
            </div>
            <SignaturePad
              onChange={setSignature}
              onSave={setSignature}
              initialSignature={signature}
              language={language}
            />
            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px', color: '#334155' }}>
              <div>
                <strong>{language === 'si' ? 'දිනය (Date):' : 'Date:'}</strong> {date}
              </div>
              <div style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                <div>{user?.name || 'අතිගරු ජනාධිපතිතුමා'}</div>
                <div style={{ color: '#1e3a8a', fontSize: '11px' }}>ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය</div>
              </div>
            </div>
          </div>

          {error && (
            <div className="form-error" style={{ marginBottom: '12px' }}>
              <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {error}
            </div>
          )}

          {success && (
            <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
              <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {success}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="primary-button"
              disabled={busy}
              onClick={handleSubmit}
              style={{
                background: decision === 'approve' ? '#0f172a' : '#b91c1c',
                borderColor: decision === 'approve' ? '#020617' : '#991b1b',
                padding: '8px 18px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              <Check size={16} />
              {busy ? '…' : (
                language === 'si'
                  ? 'අතිගරු ජනාධිපතිතුමාගේ නියෝගය සටහන් කරන්න'
                  : 'Record Presidential Order'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Awaiting President banner if user is not President or Admin */}
      {!isAlreadyDecided && !canAct && isPendingPresidential && (
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #cbd5e1',
          borderTop: 'none',
          padding: '14px 18px',
          borderRadius: '0 0 8px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Clock size={20} style={{ color: '#d97706', flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '12px', color: '#92400e', display: 'block' }}>
              {language === 'si' ? 'අතිගරු ජනාධිපතිතුමාගේ අනුමැතිය සඳහා යොමු කර ඇත' : 'Pending Presidential Approval'}
            </strong>
            <span style={{ fontSize: '11px', color: '#b45309' }}>
              {language === 'si'
                ? 'අමාත්‍යාංශ ලේකම්වරයා විසින් නිර්දේශ කරන ලද මෙම අයදුම්පත මේ වන විට අවසාන අනුමැතිය සඳහා අතිගරු ජනාධිපතිතුමා වෙත ඉදිරිපත් කර ඇත.'
                : 'This application has been recommended by the Ministry Secretary and is awaiting final order from the President.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// SUBJECT OFFICER NOTE SHEET STANDALONE PDF VIEWER / PRINTER
// =========================================================================
export function printSubjectOfficerNoteSheetPdf(r) {
  if (!r) return;
  const d = r.details || (r.applicant_name ? r : {});
  const isCompleted = Boolean(d.officerCompleted && (d.noteSheet || d.officerRemarks || d.officerAssessment));
  if (!isCompleted) {
    alert('විෂයභාර නිලධාරී (Subject Officer) විසින් සටහන් පත්‍රිකාව (Note Sheet) තවමත් සම්පූර්ණ කර නොමැති බැවින් බැලීමට හෝ බාගත කිරීමට නොහැක.\n\nThis Note Sheet has not been completed by the Subject Officer yet and cannot be viewed or downloaded.');
    return;
  }
  const printWin = window.open('', '_blank');
  if (!printWin) {
    alert('Please allow popups in your browser to view/print the Note Sheet.');
    return;
  }
  const refNo = r.id ? `FV-${String(r.id).padStart(4, '0')}` : 'FV-REF';
  const applicantName = d.fullName || r.applicant_name || '—';
  const designation = d.designation || r.designation || '—';
  const department = r.department_name || d.department || '—';
  const rawMinistry = d.ministry || 'Technology';
  const cleanMinistryName = rawMinistry.replace(/^(ministry\s+of\s+|අමාත්‍යාංශය\s*)/i, '').trim() || rawMinistry;
  const note = d.noteSheet || {};
  const completedBy = d.officerCompletedBy || {};
  const officerSignature = d.officerSignature;
  const officerRemarks = d.officerRemarks || note.remarks || 'ඉහත කරුණු සලකා බලා නිලධාරියාගේ ඉල්ලීම අමාත්‍යාංශ ලේකම්ගේ අනුමැතිය සහ අතිගරු ජනාධිපතිතුමාගේ අවසන් නියෝගය සඳහා නිර්දේශ කර ඉදිරිපත් කරමි.';

  printWin.document.write(`<!DOCTYPE html>
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
    .no-print-toolbar {
      position: sticky; top: 0; background: #0f172a; color: #fff;
      padding: 10px 18px; display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 16px; border-radius: 6px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .toolbar-btn {
      padding: 6px 14px; font-size: 11px; font-weight: 700; border-radius: 4px;
      cursor: pointer; border: 1px solid transparent;
    }
    .btn-primary { background: #2563eb; color: #fff; }
    .btn-secondary { background: #334155; color: #fff; }
    @media print {
      @page { size: A4 portrait; margin: 12mm; }
      body { padding: 0; }
      .no-print-toolbar { display: none !important; }
      .sheet { padding: 0; box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="no-print-toolbar">
    <div>
      <strong>📄 Subject Officer Note Sheet (විෂය භාර නිලධාරී සටහන් පත්‍රිකාව)</strong>
      <span style="opacity: 0.8; margin-left: 10px;">Ref: ${refNo} · ${applicantName}</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="toolbar-btn btn-primary" onclick="window.print()">🖨️ PDF බාගන්න / Print</button>
      <button class="toolbar-btn btn-secondary" onclick="window.close()">✕ වසන්න</button>
    </div>
  </div>
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
      ${officerRemarks}</p>
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
  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`);
  printWin.document.close();
}

// =========================================================================
// APPLICATION ZIP DOSSIER DOWNLOAD HELPER
// =========================================================================
export async function downloadApplicationZip(request, token) {
  if (!request?.id) return;
  const refNo = `FV-${String(request.id).padStart(4, '0')}`;
  const zipFileName = `${refNo}.zip`;
  const url = `/api/requests/${request.id}/download-zip${token ? `?token=${encodeURIComponent(token)}` : ''}`;

  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Download failed with HTTP ${res.status}`);
    }
    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = zipFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.warn('Fetch download failed, fallback to direct browser URL navigation:', err);
    window.open(url, '_blank');
  }
}

if (typeof window !== 'undefined') {
  window.downloadApplicationZip = downloadApplicationZip;
  window.printSubjectOfficerNoteSheetPdf = printSubjectOfficerNoteSheetPdf;
}

// =========================================================================
// APPLICATION ZIP PACKAGE CARD (Displays All 7 Items with Action Buttons)
// =========================================================================
export function ApplicationZipPackageCard({ request, token, language = 'en' }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [downloadDone, setDownloadDone] = useState(false);

  if (!request?.id) return null;

  const d = request.details || (request.applicant_name ? request : {});
  const refNo = `FV-${String(request.id).padStart(4, '0')}`;
  const docs = d.documents || {};
  const applicantDocsList = [
    { key: 'institutionLetter', name: docs.institutionLetter?.name || 'Head of Institution Letter', doc: docs.institutionLetter, titleEn: '1. Head of Institution Recommendation Letter', titleSi: '1. ආයතන ප්‍රධානී නිර්දේශ ලිපිය' },
    { key: 'passportImage', name: docs.passportImage?.name || 'Passport Bio Page', doc: docs.passportImage, titleEn: '2. Passport Bio-Data Page', titleSi: '2. විදේශ ගමන් බලපත්‍රයේ පිටපත' },
    { key: 'requestLetter', name: docs.requestLetter?.name || 'Applicant Request Letter', doc: docs.requestLetter, titleEn: '3. Applicant Formal Request Letter', titleSi: '3. අයදුම්කරුගේ ලිඛිත ඉල්ලීම් ලිපිය' },
    { key: 'otherDocuments', name: docs.otherDocuments?.name || 'Other Supporting Document', doc: docs.otherDocuments, titleEn: '4. Other Supporting Documents', titleSi: '4. වෙනත් අදාළ උපකාරක ලේඛන' },
  ].filter(item => item.doc);

  const clearances = Array.isArray(d.clearances) ? d.clearances : [];
  const hasOfficeUseCompleted = Boolean(d.officerCompleted || d.officerAssessment?.total || d.officerSignature);
  const hasDeptHeadCompleted = Boolean(d.departmentHeadEndorsement && (d.departmentHeadEndorsement.signature || d.departmentHeadEndorsement.myNo));
  const hasSecretaryCompleted = Boolean(
    d.secretaryApproval?.signature ||
    d.secretaryApproval?.signatoryName ||
    d.secretaryApproval?.letterNumber ||
    d.secretaryApproval?.signedAt ||
    clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
    (request.status === 'Approved' || request.status === 'Pending Presidential Approval')
  );
  const hasClearanceCompleted = Boolean(clearances.length > 0 && clearances.some(c => c.signature || c.decision));
  const hasNoteSheetCompleted = Boolean(d.officerCompleted && (d.noteSheet || d.officerRemarks || d.officerAssessment));

  const completedDocsCount = 1 +
    (hasOfficeUseCompleted ? 1 : 0) +
    (hasDeptHeadCompleted ? 1 : 0) +
    (hasSecretaryCompleted ? 1 : 0) +
    (hasClearanceCompleted ? 1 : 0) +
    (hasNoteSheetCompleted ? 1 : 0) +
    (applicantDocsList.length > 0 ? 1 : 0);

  const handleZipDownload = async () => {
    setDownloading(true);
    setDownloadError(null);
    setDownloadDone(false);
    try {
      await downloadApplicationZip(request, token);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 4500);
    } catch (err) {
      setDownloadError(err.message || 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      border: '1.5px solid #93c5fd',
      borderRadius: '10px',
      padding: '16px 18px',
      marginBottom: '18px',
      boxShadow: '0 2px 10px rgba(37, 99, 235, 0.06)'
    }}>
      {/* Top Banner: Package Title & Big ZIP Download Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            color: '#1d4ed8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <FolderArchive size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>
                {language === 'si'
                  ? `අයදුම්පත් ලේඛන පැකේජය (ZIP Package) · ${refNo}.zip`
                  : `Application Document Package · ${refNo}.zip`}
              </h4>
              <span style={{
                background: completedDocsCount >= 6 ? '#15803d' : '#1e3a8a',
                color: '#fff',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {completedDocsCount} / 7 Documents Ready (PDF)
              </span>
            </div>
            <p style={{ margin: '3px 0 0 0', fontSize: '11.5px', color: '#64748b' }}>
              {language === 'si'
                ? 'අදාළ නිලධාරීන් විසින් සම්පූර්ණ කරන ලද නිල ලේඛන පමණක් ZIP පැකේජයට ඇතුළත් වේ. නිලධාරීන් සම්පූර්ණ නොකළ ලේඛන ආරක්ෂිතව අගුළුලා ඇත.'
                : 'Only documents formally completed and signed by responsible officers are packaged in the ZIP. Incomplete documents remain strictly locked.'}
            </p>
          </div>
        </div>

        {/* The Main Download ZIP Button */}
        <div>
          <button
            type="button"
            className="primary-button"
            disabled={downloading}
            onClick={handleZipDownload}
            style={{
              height: '38px',
              padding: '0 18px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: downloadDone ? '#15803d' : '#1e3a8a',
              borderColor: downloadDone ? '#166534' : '#172554',
              boxShadow: '0 2px 6px rgba(30, 58, 138, 0.25)',
              cursor: downloading ? 'wait' : 'pointer'
            }}
          >
            {downloading ? (
              <>
                <Clock size={16} />
                <span>{language === 'si' ? 'ZIP ගොනුව සකසමින්...' : 'Generating ZIP Package...'}</span>
              </>
            ) : downloadDone ? (
              <>
                <CheckCircle2 size={16} />
                <span>{language === 'si' ? 'බාගත විය! (Downloaded)' : `Downloaded ${refNo}.zip!`}</span>
              </>
            ) : (
              <>
                <FolderArchive size={16} />
                <span>{language === 'si' ? `ZIP ගොනුව බාගන්න (${refNo}.zip)` : `Download Complete ZIP (${refNo}.zip)`}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {downloadError && (
        <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#b91c1c', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} />
          <span>{downloadError}</span>
        </div>
      )}

      {/* The 7 Numbered Items Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '8px' }}>
        {/* Item 1 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#eff6ff', border: '1px solid #93c5fd', color: '#1d4ed8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>1</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>
                {language === 'si' ? 'සාමාන්‍ය 126 PDF (General 126 PDF)' : 'General 126 PDF'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Est. Code Ch. XII Sec. 1:4 & App. 16
              </span>
            </div>
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={() => printGeneral126Pdf(request)}
            style={{ height: '26px', padding: '0 8px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e40af', borderColor: '#bfdbfe', background: '#eff6ff', flexShrink: 0 }}
          >
            <FileDown size={12} />
            <span>{language === 'si' ? 'PDF බලන්න' : 'View PDF'}</span>
          </button>
        </div>

        {/* Item 2 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: hasOfficeUseCompleted ? '#f0fdf4' : '#f8fafc', border: `1px solid ${hasOfficeUseCompleted ? '#86efac' : '#cbd5e1'}`, color: hasOfficeUseCompleted ? '#166534' : '#64748b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>2</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>
                {language === 'si' ? 'කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි PDF' : 'For Office Use Only PDF'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Est. Code Ch. XII Items 13–19 (Particulars of Available Leave)
              </span>
            </div>
          </div>
          {hasOfficeUseCompleted ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printOfficeUseOnlyPdf(request)}
              style={{ height: '26px', padding: '0 8px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e40af', borderColor: '#bfdbfe', background: '#eff6ff', flexShrink: 0 }}
            >
              <FileDown size={12} />
              <span>{language === 'si' ? 'PDF බලන්න' : 'View PDF'}</span>
            </button>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#b91c1c', fontSize: '10.5px', fontWeight: 600 }}>
              <Lock size={11} />
              <span>{language === 'si' ? 'විෂයභාර නිලධාරී සම්පූර්ණ කරන තෙක් අගුළුලා ඇත' : 'Locked until verified by Subject Officer'}</span>
            </span>
          )}
        </div>

        {/* Item 3 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: hasDeptHeadCompleted ? '#f0fdf4' : '#f8fafc', border: `1px solid ${hasDeptHeadCompleted ? '#86efac' : '#cbd5e1'}`, color: hasDeptHeadCompleted ? '#166534' : '#64748b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>3</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>
                {language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානී ලිපිය PDF' : 'Department Head Letter PDF'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Est. Code Ch. XV Sec. 10:1 (Part I: Head of Department Endorsement)
              </span>
            </div>
          </div>
          {hasDeptHeadCompleted ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printDepartmentHeadLetterPdf(request)}
              style={{ height: '26px', padding: '0 8px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e40af', borderColor: '#bfdbfe', background: '#eff6ff', flexShrink: 0 }}
            >
              <FileDown size={12} />
              <span>{language === 'si' ? 'PDF බලන්න' : 'View PDF'}</span>
            </button>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#b91c1c', fontSize: '10.5px', fontWeight: 600 }}>
              <Lock size={11} />
              <span>{language === 'si' ? 'ආයතන ප්‍රධානී අත්සන් කරන තෙක් අගුළුලා ඇත' : 'Locked until endorsed by Dept Head'}</span>
            </span>
          )}
        </div>

        {/* Item 4 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: hasSecretaryCompleted ? '#f0fdf4' : '#f8fafc', border: `1px solid ${hasSecretaryCompleted ? '#86efac' : '#cbd5e1'}`, color: hasSecretaryCompleted ? '#166534' : '#64748b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>4</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>
                {language === 'si' ? 'අමාත්‍යාංශ ලේකම් ලිපිය PDF' : 'Secretary Letter PDF'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Est. Code Ch. XV Sec. 10:1 (Part II: Ministerial Order - Leave is approved/not approved)
              </span>
            </div>
          </div>
          {hasSecretaryCompleted ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printSecretaryApprovalLetterPdf(request)}
              style={{ height: '26px', padding: '0 8px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e40af', borderColor: '#bfdbfe', background: '#eff6ff', flexShrink: 0 }}
            >
              <FileDown size={12} />
              <span>{language === 'si' ? 'PDF බලන්න' : 'View PDF'}</span>
            </button>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#b91c1c', fontSize: '10.5px', fontWeight: 600 }}>
              <Lock size={11} />
              <span>{language === 'si' ? 'අමාත්‍යාංශ ලේකම් අනුමත කරන තෙක් අගුළුලා ඇත' : 'Locked until signed by Ministry Secretary'}</span>
            </span>
          )}
        </div>

        {/* Item 5 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: hasClearanceCompleted ? '#f0fdf4' : '#f8fafc', border: `1px solid ${hasClearanceCompleted ? '#86efac' : '#cbd5e1'}`, color: hasClearanceCompleted ? '#166534' : '#64748b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>5</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>
                {language === 'si' ? 'අවසර පත්‍රිකාව PDF (Clearance Sheet)' : 'Clearance Sheet PDF'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Secretariat Minute Trail · Multi-Stage Hierarchy Clearances
              </span>
            </div>
          </div>
          {hasClearanceCompleted ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printNoteSheetMinisterialPdf(request)}
              style={{ height: '26px', padding: '0 8px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e40af', borderColor: '#bfdbfe', background: '#eff6ff', flexShrink: 0 }}
            >
              <FileDown size={12} />
              <span>{language === 'si' ? 'PDF බලන්න' : 'View PDF'}</span>
            </button>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#b91c1c', fontSize: '10.5px', fontWeight: 600 }}>
              <Lock size={11} />
              <span>{language === 'si' ? 'අවසර පත්‍රිකාව අත්සන් කරන තෙක් අගුළුලා ඇත' : 'Locked until initialed on Clearance Sheet'}</span>
            </span>
          )}
        </div>

        {/* Item 6 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: hasNoteSheetCompleted ? '#f0fdf4' : '#f8fafc', border: `1px solid ${hasNoteSheetCompleted ? '#86efac' : '#cbd5e1'}`, color: hasNoteSheetCompleted ? '#166534' : '#64748b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>6</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>
                {language === 'si' ? 'සටහන් පත්‍රිකාව PDF (Note Sheet PDF)' : 'Note Sheet PDF'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Subject Officer Assessment & Submission from Outside Department
              </span>
            </div>
          </div>
          {hasNoteSheetCompleted ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => printSubjectOfficerNoteSheetPdf(request)}
              style={{ height: '26px', padding: '0 8px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e40af', borderColor: '#bfdbfe', background: '#eff6ff', flexShrink: 0 }}
            >
              <FileDown size={12} />
              <span>{language === 'si' ? 'PDF බලන්න' : 'View PDF'}</span>
            </button>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', color: '#b91c1c', fontSize: '10.5px', fontWeight: 600 }}>
              <Lock size={11} />
              <span>{language === 'si' ? 'සටහන් පත්‍රිකාව සකසන තෙක් අගුළුලා ඇත' : 'Locked until Note Sheet prepared'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Item 7: Applicant Uploaded Documents (only one by one pdf) */}
      <div style={{
        marginTop: '10px',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        padding: '10px 14px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: applicantDocsList.length > 0 ? '8px' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#eff6ff', border: '1px solid #93c5fd', color: '#1d4ed8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>7</span>
            <div>
              <strong style={{ fontSize: '12px', color: '#0f172a' }}>
                {language === 'si'
                  ? 'අයදුම්කරු විසින් අමුණන ලද ලේඛන (Applicant Upload Documents - Only One by One PDF)'
                  : 'Applicant Upload Documents (Only One by One PDF)'}
              </strong>
              <span style={{ fontSize: '10.5px', color: '#64748b', marginLeft: '6px' }}>
                {applicantDocsList.length > 0 ? `(${applicantDocsList.length} files attached)` : '(No attached files)'}
              </span>
            </div>
          </div>
          <span style={{ fontSize: '10.5px', color: '#2563eb', fontWeight: 600 }}>
            {language === 'si' ? 'ZIP තුළ එක් එක් ලේඛනය වෙන වෙනම PDF ලෙස අඩංගු වේ' : 'Packed individually as clean A4 PDFs in ZIP'}
          </span>
        </div>

        {applicantDocsList.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '6px' }}>
            {applicantDocsList.map((item) => (
              <div key={item.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '5px',
                fontSize: '11px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                  <Paperclip size={13} style={{ color: '#64748b', flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>
                      {language === 'si' ? item.titleSi : item.titleEn}
                    </div>
                    <div style={{ fontSize: '9.5px', color: '#64748b' }}>
                      {item.doc.name || item.name} {item.doc.size ? `· ${formatFileSize(item.doc.size)}` : ''}
                    </div>
                  </div>
                </div>
                {item.doc.dataUrl && (
                  <a
                    href={item.doc.dataUrl}
                    download={item.doc.name || `${item.key}.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1px solid #bfdbfe',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '10px',
                      fontWeight: 600,
                      flexShrink: 0
                    }}
                  >
                    <Download size={11} />
                    <span>Download</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
            {language === 'si' ? 'අයදුම්කරු විසින් අමතර ලේඛන උඩුගත කර නොමැත.' : 'No additional live documents were uploaded by applicant for this request.'}
          </p>
        )}
      </div>
    </div>
  );
}