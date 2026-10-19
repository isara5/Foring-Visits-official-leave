import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertCircle,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BellOff,
  Building2,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  CircleHelp,
  Clock,
  Download,
  Edit3,
  FileDown,
  FilePlus2,
  FileSpreadsheet,
  FileText,
  Globe2,
  Landmark,
  LayoutDashboard,
  LogOut,
  Plane,
  Briefcase,
  Printer,
  Scale,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Stamp,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  FolderArchive,
  Lock,
  X
} from 'lucide-react';
import SignaturePad from './signature-pad.jsx';
import DetailedRequestModal, {
  RequestDetails,
  DepartmentHeadEndorsementSection,
  OfficerAssessmentSection,
  SecretariatMinuteTrailSection,
  printSubjectOfficerPdf,
  printSubjectOfficerNoteSheetPdf,
  printGeneral126Pdf,
  printOfficeUseOnlyPdf,
  printDepartmentHeadLetterPdf,
  printSecretaryApprovalLetterPdf,
  printNoteSheetMinisterialPdf,
  PresidentialOrderSection,
  WorkflowHierarchyStepper,
  ApplicantLiveProcessTracker,
  getHierarchyStatusInfo,
  DeleteConfirmModal,
  RejectRequestModal,
  downloadApplicationZip,
  ApplicationZipPackageCard
} from './request-modal.jsx';
import './styles.css';
import './official-theme.css';

const copy = {
  en: {
    brand: 'GOVERNMENT OF SRI LANKA',
    title: 'Foreign visits & official leave',
    subtitle: 'Public service travel authorization portal',
    overview: 'Overview',
    requests: 'My requests',
    approvals: 'Approvals',
    addUser: 'Add User',
    users: 'Users',
    reports: 'All Reports',
    settings: 'Settings',
    newRequest: 'New request',
    search: 'Search requests',
    allRequests: 'Travel & leave requests',
    track: 'Track, review and authorize official travel in one place.',
    total: 'Total requests',
    pending: 'Awaiting action',
    approved: 'Approved',
    returned: 'Returned',
    rejected: 'Rejected',
    inProcess: 'In Process',
    id: 'REFERENCE',
    applicant: 'APPLICANT',
    destination: 'DESTINATION',
    dates: 'TRAVEL DATES',
    type: 'REQUEST TYPE',
    status: 'STATUS',
    action: 'ACTION',
    all: 'All requests',
    official: 'Official duty',
    private: 'Private leave',
    submitted: 'Submitted',
    newTitle: 'New travel / leave request',
    required: 'Fields marked * are required.',
    destinationLabel: 'Destination country / city',
    purposeLabel: 'Purpose of visit',
    startDate: 'Departure date',
    endDate: 'Return date',
    leaveType: 'Request type',
    signature: 'Applicant signature',
    signatureHint: 'Sign in the area below using your mouse or finger.',
    clear: 'Clear signature',
    submit: 'Submit for approval',
    cancel: 'Cancel',
    chooseRole: 'Sign in to the portal',
    signSubtitle: 'Secure access for Sri Lankan public officers',
    email: 'Official email',
    password: 'Password',
    signIn: 'Sign in',
    sample: 'Quick Demo Access',
    demoHint: 'Select any sample account below to test different roles:',
    detail: 'Request details',
    purpose: 'Purpose',
    timeline: 'Approval trail',
    approve: 'Approve',
    return: 'Return for changes',
    reject: 'Reject',
    note: 'Decision / Review note',
    close: 'Close',
    welcome: 'Good morning',
    language: 'සිංහල',
    destinationPlaceholder: 'e.g. Tokyo, Japan',
    purposePlaceholder: 'Describe the official purpose',
    empty: 'No requests match this view.',
    signOut: 'Sign out',
    roleNames: {
      admin: 'Administrator',
      applicant: 'Applicant',
      department_head: 'Head of Department',
      reviewer: 'Subject Officer',
      assistant_secretary: 'Assistant Secretary',
      senior_assistant_secretary: 'Senior Assistant Secretary',
      additional_secretary: 'Additional Secretary',
      secretary: 'Ministry Secretary',
      authorized_official: 'Authorized Official',
      minister: 'Minister',
      president: 'President & Ministry of Digital Economy'
    },
    statuses: {
      'Pending Department Head Approval': 'Pending Dept Head Approval',
      'Pending Review': 'Pending Subject Officer Review',
      'Pending Assistant Secretary Review': 'Pending Assistant Secretary',
      'Pending Senior Assistant Secretary Review': 'Pending Senior Assistant Secretary',
      'Pending Additional Secretary Review': 'Pending Additional Secretary',
      'Pending Secretary Approval': 'Pending Secretary Approval',
      'Pending Official Authorization': 'Official authorization',
      'Pending Minister Approval': 'Minister approval',
      'Pending Presidential Approval': 'Presidential approval',
      Approved: 'Approved',
      Returned: 'Returned',
      Rejected: 'Rejected'
    },
    errors: { 'Email or password is incorrect.': 'Email or password is incorrect.' },
    request: 'Request',
    adminNotice: 'Administrative access',
    noteLabel: 'Search by applicant, destination or ref',
    profile: 'Your workspace',
    today: 'THURSDAY, 15 OCTOBER 2026',
    years: 'All years',
    filter: 'Filters',
    signed: 'Signature captured',
    requestCreated: 'Request submitted for review.',
    decisionSaved: 'Decision recorded.',
    pipelineTitle: 'Approval Workflow Pipeline',
    pipelineSubtitle: 'Applicant → Department Head → Subject Officer → Secretariat (Asst Sec ➔ Sr Asst Sec ➔ Addl Sec ➔ Secretary)',
    exportCsv: 'Export CSV',
    printReport: 'Print Report',
    addNewUserTitle: 'Add New Officer / User',
    addNewUserDesc: 'Register a verified public officer and assign system permissions.',
    registeredOfficers: 'Registered Portal Officers',
    totalUsers: 'Total Users',
    fullName: 'Full Name',
    officialEmail: 'Official Email (@foring.gov.lk)',
    designatedRole: 'Designated Role',
    temporaryPassword: 'Password',
    addUserBtn: 'Add User',
    deleteUser: 'Delete',
    active: 'Active',
    confirmDeleteUser: 'Are you sure you want to remove this user?',
    userCreated: 'User account created successfully.',
    userDeleted: 'User removed successfully.',
    allReportsDesc: 'Audit reports categorized by status: Approved, In Process, and Rejected.',
    allPending: 'All Pending',
    approvalRate: 'Approval Rate',
    reviewAndDecide: 'Review & Decide',
    reviewQueue: 'Review & Approval Queue',
    reviewQueueDesc: 'Inspect, verify, forward to authorities, and authorize foreign visit applications.',
    signInTab: 'Sign In',
    registerTab: 'Applicant Registration',
    regNotice: 'Self-registration is exclusively for Public Officers submitting travel requests. Reviewer, Minister, Presidential, and Admin accounts are assigned by the Administrator.',
    confirmPassword: 'Confirm Password',
    passMismatch: 'Passwords do not match.',
    alreadyHaveAccount: 'Already have an account? Sign in',
    needAccount: "New applicant? Create an account",
    registerSuccess: 'Applicant account created successfully. Welcome!',
    forwardToOfficial: 'Forward to Authorized Official',
    forwardToMinister: 'Forward to Minister',
    forwardToPresident: 'Forward to President',
    reviewerActions: 'Reviewer Verification & Authority Routing',
    reviewerHint: 'Verify all particulars, funding sources, and General 126 details, then route to the appropriate approving authority:',
    officialDesc: 'Department Head / Secretary',
    ministerDesc: 'Cabinet Minister',
    presidentDesc: 'Presidential Secretariat',
    authorityClearance: 'Executive Authority Action',
    authorityHint: 'As the authorized executive authority, review the applicant dossier and reviewer recommendation to authorize or reject this request:'
  },
  si: {
    brand: 'ශ්‍රී ලංකා රජය',
    title: 'විදේශ සංචාර සහ නිල නිවාඩු',
    subtitle: 'රාජ්‍ය සේවා සංචාර අනුමත කිරීමේ ද්වාරය',
    overview: 'සාරාංශය',
    requests: 'මගේ ඉල්ලීම්',
    approvals: 'අනුමත කිරීම්',
    addUser: 'පරිශීලක එක් කරන්න',
    users: 'පරිශීලකයින්',
    reports: 'සියලු වාර්තා',
    settings: 'සැකසුම්',
    newRequest: 'නව ඉල්ලීමක්',
    search: 'ඉල්ලීම් සොයන්න',
    allRequests: 'සංචාර සහ නිවාඩු ඉල්ලීම්',
    track: 'නිල සංචාර එකම ස්ථානයකින් සමාලෝචනය කර අනුමත කරන්න.',
    total: 'මුළු ඉල්ලීම්',
    pending: 'ක්‍රියාමාර්ග බලාපොරොත්තුවෙන්',
    approved: 'අනුමත වූ',
    returned: 'ආපසු යැවූ',
    rejected: 'ප්‍රතික්ෂේපිත',
    inProcess: 'ක්‍රියාත්මක වෙමින් පවතින',
    id: 'යොමු අංකය',
    applicant: 'අයදුම්කරු',
    destination: 'ගමනාන්තය',
    dates: 'ගමන් දිනයන්',
    type: 'ඉල්ලීම් වර්ගය',
    status: 'තත්ත්වය',
    action: 'ක්‍රියාමාර්ග',
    all: 'සියල්ල',
    official: 'නිල රාජකාරි',
    private: 'පෞද්ගලික නිවාඩු',
    submitted: 'ඉදිරිපත් කළ',
    newTitle: 'නව සංචාර / නිවාඩු ඉල්ලීම',
    required: '* ලකුණු කළ සියලු තොරතුරු අවශ්‍යයි.',
    destinationLabel: 'ගමනාන්ත රට / නගරය',
    purposeLabel: 'සංචාරයේ අරමුණ',
    startDate: 'පිටත්වන දිනය',
    endDate: 'ආපසු පැමිණෙන දිනය',
    leaveType: 'ඉල්ලීම් වර්ගය',
    signature: 'අයදුම්කරුගේ අත්සන',
    signatureHint: 'මූසිකය හෝ ඇඟිල්ල භාවිතයෙන් පහත ප්‍රදේශයේ අත්සන් කරන්න.',
    clear: 'අත්සන මකන්න',
    submit: 'අනුමැතියට ඉදිරිපත් කරන්න',
    cancel: 'අවලංගු කරන්න',
    chooseRole: 'ද්වාරයට පිවිසෙන්න',
    signSubtitle: 'ශ්‍රී ලංකා රාජ්‍ය නිලධාරීන් සඳහා ආරක්ෂිත පිවිසුම',
    email: 'නිල ඊමේල් ලිපිනය',
    password: 'මුරපදය',
    signIn: 'පිවිසෙන්න',
    sample: 'ආදර්ශ පිවිසුම්',
    demoHint: 'පහත ගිණුමක් තෝරා පහසුවෙන් පරීක්ෂා කරන්න:',
    detail: 'ඉල්ලීමේ විස්තර',
    purpose: 'අරමුණ',
    timeline: 'අනුමැති ඉතිහාසය',
    approve: 'අනුමත කරන්න',
    return: 'සංශෝධනයට ආපසු යවන්න',
    reject: 'ප්‍රතික්ෂේප කරන්න',
    note: 'තීරණ / සමාලෝචන සටහන',
    close: 'වසන්න',
    welcome: 'ආයුබෝවන්',
    language: 'English',
    destinationPlaceholder: 'උදා: ටෝකියෝ, ජපානය',
    purposePlaceholder: 'නිල අරමුණ විස්තර කරන්න',
    empty: 'මෙම දසුනට ගැළපෙන ඉල්ලීම් නැත.',
    signOut: 'ඉවත් වන්න',
    roleNames: {
      admin: 'පරිපාලක (Admin)',
      applicant: 'අයදුම්කරු (Applicant)',
      department_head: 'ආයතන ප්‍රධානියා (Head of Department)',
      reviewer: 'විෂයභාර නිලධාරී (Subject Officer)',
      assistant_secretary: 'සහකාර ලේකම් (Assistant Secretary)',
      senior_assistant_secretary: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම් (Senior Asst. Secretary)',
      additional_secretary: 'අතිරේක ලේකම් (Additional Secretary)',
      secretary: 'අමාත්‍යාංශ ලේකම් (Ministry Secretary)',
      authorized_official: 'බලයලත් නිලධාරී (Official)',
      minister: 'අමාත්‍යවරයා (Minister)',
      president: 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය (President)'
    },
    statuses: {
      'Pending Department Head Approval': 'ආයතන ප්‍රධානී අනුමැතිය',
      'Pending Review': 'විෂයභාර නිලධාරී සමාලෝචනය',
      'Pending Assistant Secretary Review': 'සහකාර ලේකම් සමාලෝචනය',
      'Pending Senior Assistant Secretary Review': 'ජ්‍යෙෂ්ඨ සහකාර ලේකම් සමාලෝචනය',
      'Pending Additional Secretary Review': 'අතිරේක ලේකම් සමාලෝචනය',
      'Pending Secretary Approval': 'අමාත්‍යාංශ ලේකම් අනුමැතිය',
      'Pending Official Authorization': 'බලයලත් නිලධාරී අනුමැතිය',
      'Pending Minister Approval': 'අමාත්‍ය අනුමැතිය',
      'Pending Presidential Approval': 'ජනාධිපති අනුමැතිය',
      Approved: 'අනුමතයි',
      Returned: 'ආපසු යැවූ',
      Rejected: 'ප්‍රතික්ෂේපිත'
    },
    errors: { 'Email or password is incorrect.': 'ඊමේල් ලිපිනය හෝ මුරපදය නිවැරදි නැත.' },
    request: 'ඉල්ලීම',
    adminNotice: 'පරිපාලන පිවිසුම',
    noteLabel: 'අයදුම්කරු, ගමනාන්තය හෝ අංකය අනුව සොයන්න',
    profile: 'ඔබගේ වැඩපොළ',
    today: '2026 ඔක්තෝබර් 15, බ්‍රහස්පතින්දා',
    years: 'සියලු වසර',
    filter: 'පෙරහන්',
    signed: 'අත්සන ලබාගත්තා',
    requestCreated: 'ඉල්ලීම සමාලෝචනයට ඉදිරිපත් කළා.',
    decisionSaved: 'තීරණය සටහන් කළා.',
    pipelineTitle: 'අනුමත කිරීමේ අදියර ප්‍රවාහය',
    pipelineSubtitle: 'අයදුම්කරු → ආයතන ප්‍රධානියා → විෂයභාර නිලධාරී → ලේකම් කාර්යාලය (සහකාර ලේකම් ➔ ජ්‍යෙෂ්ඨ සහකාර ➔ අතිරේක ලේකම් ➔ ලේකම්)',
    exportCsv: 'CSV බාගන්න',
    printReport: 'වාර්තාව මුද්‍රණය',
    addNewUserTitle: 'නව පරිශීලකයෙකු එකතු කරන්න',
    addNewUserDesc: 'නව රාජ්‍ය නිලධාරියෙකු පද්ධතියට ලියාපදිංචි කර භූමිකාව ලබාදෙන්න.',
    registeredOfficers: 'ලියාපදිංචි නිලධාරීන්',
    totalUsers: 'මුළු පරිශීලකයින්',
    fullName: 'සම්පූර්ණ නම',
    officialEmail: 'නිල ඊමේල් ලිපිනය (@foring.gov.lk)',
    designatedRole: 'පත් කළ භූමිකාව',
    temporaryPassword: 'මුරපදය',
    addUserBtn: 'පරිශීලකයා එක් කරන්න',
    deleteUser: 'ඉවත් කරන්න',
    active: 'සක්‍රියයි',
    confirmDeleteUser: 'මෙම පරිශීලකයා ඉවත් කිරීමට ඔබට විශ්වාසද?',
    userCreated: 'පරිශීලක ගිණුම සාර්ථකව සාදන ලදී.',
    userDeleted: 'පරිශීලකයා සාර්ථකව ඉවත් කරන ලදී.',
    allReportsDesc: 'තත්ත්වය අනුව පෙරහන් කළ වාර්තා: අනුමත වූ, ක්‍රියාත්මක වෙමින් පවතින, සහ ප්‍රතික්ෂේපිත.',
    allPending: 'සියලු පොරොත්තු',
    approvalRate: 'අනුමත කිරීමේ ප්‍රතිශතය',
    reviewAndDecide: 'සමාලෝචනය කර තීරණය කරන්න',
    reviewQueue: 'සමාලෝචන සහ අනුමත කිරීම් පෝලිම',
    reviewQueueDesc: 'රාජ්‍ය විදේශ සංචාර ඉල්ලීම් පරීක්ෂා කර, ඉහළ බලධාරීන් වෙත යොමු කර අනුමත කරන්න.',
    signInTab: 'පිවිසෙන්න',
    registerTab: 'අයදුම්කරු ලියාපදිංචිය',
    regNotice: 'ස්වයං ලියාපදිංචිය හිමිවන්නේ නිවාඩු ඉල්ලුම් කරන රාජ්‍ය නිලධාරීන්ට පමණි. සමාලෝචක, අමාත්‍ය, ජනාධිපති ලේකම් කාර්යාලය සහ පරිපාලන ගිණුම් පරිපාලක විසින් ලබාදෙනු ඇත.',
    confirmPassword: 'මුරපදය තහවුරු කරන්න',
    passMismatch: 'මුරපද එකිනෙකට නොගැලපේ.',
    alreadyHaveAccount: 'දැනටමත් ගිණුමක් තිබේද? පිවිසෙන්න',
    needAccount: "නව අයදුම්කරුවෙක්ද? ගිණුමක් සාදන්න",
    registerSuccess: 'අයදුම්කරු ගිණුම සාර්ථකව සාදන ලදී. සාදරයෙන් පිළිගනිමු!',
    forwardToOfficial: 'බලයලත් නිලධාරී වෙත යොමු කරන්න',
    forwardToMinister: 'අමාත්‍යවරයා වෙත යොමු කරන්න',
    forwardToPresident: 'ජනාධිපති ලේකම් කාර්යාලය වෙත යොමු කරන්න',
    reviewerActions: 'සමාලෝචක නිර්දේශය සහ බලධාරීන් වෙත යොමු කිරීම',
    reviewerHint: 'සියලු විස්තර සහ ලිපිගොනු පරීක්ෂා කර අදාළ අනුමත කිරීමේ බලධාරියා වෙත යොමු කරන්න:',
    officialDesc: 'දෙපාර්තමේන්තු ප්‍රධානී / අමාත්‍යාංශ ලේකම්',
    ministerDesc: 'විෂයභාර අමාත්‍යවරයා',
    presidentDesc: 'ජනාධිපති ලේකම් කාර්යාලය',
    authorityClearance: 'විධායක බලධාරී අනුමැතිය',
    authorityHint: 'අයදුම්පතේ තොරතුරු සහ සමාලෝචක නිර්දේශය පරීක්ෂා කර අවසාන අනුමැතිය ලබාදෙන්න:'
  }
};

const sampleUsers = [
  { role: 'admin', email: 'admin@foring.gov.lk', pass: 'Admin@123', label: 'Administrator', labelSi: 'පරිපාලක' },
  { role: 'applicant', email: 'officer@foring.gov.lk', pass: 'Demo@123', label: 'Applicant Officer (Nimal Perera)', labelSi: 'අයදුම්කරු (නිමල් පෙරේරා)' },
  { role: 'department_head', email: 'head.cert@foring.gov.lk', pass: 'Demo@123', label: 'Department Head (SLCERT)', labelSi: 'ආයතන ප්‍රධානියා (SLCERT)' },
  { role: 'reviewer', email: 'reviewer@foring.gov.lk', pass: 'Demo@123', label: 'Subject Officer', labelSi: 'විෂයභාර නිලධාරී' },
  { role: 'assistant_secretary', email: 'asst.sec@foring.gov.lk', pass: 'Demo@123', label: 'Assistant Secretary', labelSi: 'සහකාර ලේකම්' },
  { role: 'senior_assistant_secretary', email: 'senior.asst.sec@foring.gov.lk', pass: 'Demo@123', label: 'Senior Asst. Secretary', labelSi: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්' },
  { role: 'additional_secretary', email: 'addl.sec@foring.gov.lk', pass: 'Demo@123', label: 'Additional Secretary', labelSi: 'අතිරේක ලේකම්' },
  { role: 'secretary', email: 'secretary@foring.gov.lk', pass: 'Demo@123', label: 'Ministry Secretary', labelSi: 'අමාත්‍යාංශ ලේකම් (වරුෂණ ශ්‍රී ධනපාල)' },
];

function App() {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('portal-user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('portal-token') || '');
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeNav, setActiveNav] = useState('overview');
  const [showLeaveTypeModal, setShowLeaveTypeModal] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('official');
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [applicantTrackId, setApplicantTrackId] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const [deletingRequest, setDeletingRequest] = useState(null);
  const [rejectingRequest, setRejectingRequest] = useState(null);

  // Approvals view filters
  const [approvalStageFilter, setApprovalStageFilter] = useState('all');

  // Reports view filter ('all', 'approved', 'process', 'reject')
  const [reportFilter, setReportFilter] = useState('all');

  // Request type filter ('all', 'official', 'private')
  const [typeFilter, setTypeFilter] = useState('all');

  // Add User form state (Admin only)
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('applicant');
  const [newUserPassword, setNewUserPassword] = useState('Demo@123');
  const [userFormBusy, setUserFormBusy] = useState(false);
  const [userFormError, setUserFormError] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  const [notifications, setNotifications] = useState([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [incomingNotice, setIncomingNotice] = useState(null);
  const notifDropdownRef = useRef(null);
  const prevNotifCountRef = useRef(0);

  const t = copy[language];

  async function loadRequests() {
    if (!token) return;
    try {
      const response = await fetch('/api/requests', { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 401) return signOut();
      if (response.ok) setRequests(await response.json());
    } catch (e) {
      console.error(e);
    }
  }

  async function loadNotifications() {
    if (!token) return;
    try {
      const res = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const list = data.notifications || [];
        const count = data.unreadCount || 0;
        setNotifications(list);
        setUnreadNotifCount(count);

        if (count > prevNotifCountRef.current && prevNotifCountRef.current !== 0) {
          const newest = list.find((n) => !n.is_read);
          if (newest) {
            setIncomingNotice({
              id: newest.id,
              title: newest.title,
              message: newest.message,
              requestId: newest.request_id
            });
          }
        }
        prevNotifCountRef.current = count;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function loadUsers() {
    if (!token || user?.role !== 'admin') return;
    try {
      const response = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) setUsers(await response.json());
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setShowNotifMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    loadRequests();
    loadNotifications();
    if (user?.role === 'admin') loadUsers();

    const interval = setInterval(() => {
      loadRequests();
      loadNotifications();
    }, 12000);
    return () => clearInterval(interval);
  }, [token, user]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3400);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (incomingNotice) {
      const timer = setTimeout(() => setIncomingNotice(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [incomingNotice]);

  function signOut() {
    localStorage.removeItem('portal-token');
    localStorage.removeItem('portal-user');
    setToken('');
    setUser(null);
    setRequests([]);
    setUsers([]);
    setNotifications([]);
    setUnreadNotifCount(0);
  }

  async function handleOpenRequest(request) {
    setSelected(request);
    if (!request.is_viewed) {
      setRequests((prev) =>
        prev.map((r) => (r.id === request.id ? { ...r, is_viewed: true } : r))
      );
      try {
        await fetch(`/api/requests/${request.id}/view`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
        loadNotifications();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function handleNotificationClick(notif) {
    setShowNotifMenu(false);
    if (!notif.is_read) {
      try {
        await fetch(`/api/notifications/${notif.id}/read`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
        loadNotifications();
      } catch (e) {
        console.error(e);
      }
    }
    if (notif.request_id) {
      const targetReq = requests.find((r) => r.id === notif.request_id);
      if (targetReq) {
        handleOpenRequest(targetReq);
      } else {
        loadRequests();
      }
    }
  }

  async function handleMarkAllNotificationsRead() {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadNotifications();
      setToast(language === 'en' ? 'All notifications marked as read.' : 'සියලු දැනුම්දීම් කියවූ බව සටහන් කළා.');
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAddUser(e) {
    e.preventDefault();
    setUserFormBusy(true);
    setUserFormError('');
    try {
      const defaultDesignation = newUserRole === 'president' ? 'ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය'
        : newUserRole === 'secretary' ? 'ලේකම්, සිවිල් ආරක්ෂක අමාත්‍යාංශය'
        : newUserRole === 'additional_secretary' ? 'අතිරේක ලේකම් (Additional Secretary)'
        : newUserRole === 'senior_assistant_secretary' ? 'ජ්‍යෙෂ්ඨ සහකාර ලේකම් (Senior Assistant Secretary)'
        : newUserRole === 'assistant_secretary' ? 'සහකාර ලේකම් (Assistant Secretary)'
        : newUserRole === 'reviewer' ? 'විෂයභාර නිලධාරී (Subject Officer)'
        : undefined;

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
          password: newUserPassword,
          designation: defaultDesignation
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('Demo@123');
      setNewUserRole('applicant');
      setToast(t.userCreated);
      loadUsers();
    } catch (err) {
      setUserFormError(err.message);
    } finally {
      setUserFormBusy(false);
    }
  }

  async function handleDeleteUser(userId) {
    if (!confirm(t.confirmDeleteUser)) return;
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');
      setToast(t.userDeleted);
      loadUsers();
    } catch (err) {
      setToast(err.message);
    }
  }

  function handleExportCsv(reportData, filterName = 'all') {
    const headers = [
      'Reference ID',
      'Applicant Full Name',
      'Applicant Email',
      'Department',
      'Designation',
      'Service',
      'Ministry',
      'Destination',
      'Purpose',
      'Commencement Date',
      'Completion Date',
      'Leave Days Applied',
      'Leave Category',
      'Airfare Funding',
      'Maintenance Funding',
      'Status',
      'View Status',
      'Submitted Date'
    ];
    const rows = reportData.map((r) => {
      const d = r.details || {};
      return [
        `"FV-${String(r.id).padStart(4, '0')}"`,
        `"${(r.applicant_name || '').replace(/"/g, '""')}"`,
        `"${(r.applicant_email || '').replace(/"/g, '""')}"`,
        `"${(d.department || '').replace(/"/g, '""')}"`,
        `"${(d.designation || '').replace(/"/g, '""')}"`,
        `"${(d.service || '').replace(/"/g, '""')}"`,
        `"${(d.ministry || '').replace(/"/g, '""')}"`,
        `"${(r.destination || '').replace(/"/g, '""')}"`,
        `"${(r.purpose || '').replace(/"/g, '""')}"`,
        `"${r.start_date || ''}"`,
        `"${r.end_date || ''}"`,
        `"${d.daysApplied || ''}"`,
        `"${(r.leave_type || '').replace(/"/g, '""')}"`,
        `"${(d.airfareFunding || '').replace(/"/g, '""')}"`,
        `"${(d.maintenanceFunding || '').replace(/"/g, '""')}"`,
        `"${(r.status || '').replace(/"/g, '""')}"`,
        `"${r.is_viewed ? 'Viewed' : 'Unopened'}"`,
        `"${(r.created_at || '').slice(0, 10)}"`
      ];
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `foreign-visits-audit-report-${filterName}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast(language === 'en' ? 'Audit report downloaded as CSV successfully.' : 'විගණන වාර්තාව CSV ලෙස සාර්ථකව බාගත විය.');
  }

  function handlePrintOfficialReport(data, filterName = 'all') {
    const printWin = window.open('', '_blank');
    if (!printWin) {
      window.print();
      return;
    }
    const rowsHtml = data.map((r, i) => {
      const d = r.details || {};
      const statusColor = r.status === 'Approved' ? '#059669' : (r.status === 'Rejected' ? '#dc2626' : '#2563eb');
      return `
        <tr style="${!r.is_viewed ? 'background-color: #fff1f2;' : ''}">
          <td style="text-align:center;">${i + 1}</td>
          <td><strong>FV-${String(r.id).padStart(4, '0')}</strong>${!r.is_viewed ? ' <span style="color:#b91c1c;font-size:9px;font-weight:bold;">[UNOPENED]</span>' : ''}</td>
          <td>
            <strong>${r.applicant_name}</strong><br>
            <span style="font-size:10px;color:#64748b">${d.designation || 'Officer'} · ${d.department || ''}</span>
          </td>
          <td>${r.destination}</td>
          <td style="max-width:200px;font-size:10px;">${r.purpose}</td>
          <td style="white-space:nowrap;font-size:10px;">${r.start_date} <br>→ ${r.end_date}</td>
          <td style="font-size:10px;">${r.leave_type}</td>
          <td><span style="display:inline-block;padding:2px 6px;border-radius:4px;font-weight:bold;font-size:10px;background:#f1f5f9;color:${statusColor}">${r.status}</span></td>
          <td style="font-size:10px;">${r.created_at ? r.created_at.slice(0, 10) : ''}</td>
        </tr>
      `;
    }).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Foreign Visits Official Audit Report - ${filterName.toUpperCase()}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 25px; color: #0f172a; margin: 0; }
            .report-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
            .report-header h2 { margin: 0 0 4px; font-size: 13px; letter-spacing: 1px; color: #475569; text-transform: uppercase; }
            .report-header h1 { margin: 0 0 4px; font-size: 17px; text-transform: uppercase; color: #0f172a; }
            .meta-bar { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 15px; background: #f8fafc; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 4px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 7px 6px; text-align: left; font-size: 10px; text-transform: uppercase; color: #334155; }
            td { border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; }
            .footer-sig { margin-top: 30px; display: flex; justify-content: space-between; font-size: 11px; border-top: 1px dashed #cbd5e1; padding-top: 14px; }
            @media print {
              body { padding: 10px; }
              @page { size: landscape; margin: 12mm; }
            }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h2>Democratic Socialist Republic of Sri Lanka · Ministry of Public Administration</h2>
            <h1>Foreign Visits & Official Leave Master Audit Report</h1>
            <div style="font-size:11px;color:#64748b;">Statutory Records under Establishments Code Chp. XII and Foreign Travel Regulations</div>
          </div>
          <div class="meta-bar">
            <div><strong>Report Filter:</strong> ${filterName.toUpperCase()}</div>
            <div><strong>Total Matching Records:</strong> ${data.length}</div>
            <div><strong>Generated At:</strong> ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width:25px;text-align:center;">#</th>
                <th style="width:75px;">Ref ID</th>
                <th>Applicant Particulars</th>
                <th>Destination</th>
                <th>Purpose of Travel</th>
                <th>Period</th>
                <th>Type</th>
                <th>Clearance Status</th>
                <th style="width:65px;">Submitted</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <div class="footer-sig">
            <div>
              <strong>Certified Correct:</strong><br>
              Department of Management Services & Public Administration
            </div>
            <div style="text-align:right;">
              Official System Generated Document<br>
              Sri Lanka Foreign Visits Portal
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
  }

  function handlePrintApplicationPdf(r) {
    const printWin = window.open('', '_blank');
    if (!printWin) return;
    const isOfficial = r.leave_type === 'Official duty';
    const d = r.details || {};
    const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
    const hasDeptHeadCompleted = Boolean(d.departmentHeadEndorsement && (d.departmentHeadEndorsement.signature || d.departmentHeadEndorsement.myNo));
    const hasSecretaryCompleted = Boolean(
      d.secretaryApproval?.signature ||
      d.secretaryApproval?.signatoryName ||
      d.secretaryApproval?.letterNumber ||
      d.secretaryApproval?.signedAt ||
      clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
      (r.status === 'Approved' || r.status === 'Pending Presidential Approval')
    );
    const hasClearanceCompleted = Boolean(clearances.length > 0 && clearances.some(c => c.signature || c.decision));
    const subjectOfficerClearance = clearances.find(c => c.role === 'reviewer') || (d.officerCompleted ? {
      userName: d.officerCompletedBy?.name || 'Subject Officer',
      userDesignation: 'විෂයභාර නිලධාරී (Subject Officer)',
      signature: d.officerSignature,
      remarks: d.officerRemarks || '',
      date: d.officerCompletedAt?.slice(0, 10) || '',
      forwardedToTitle: clearances[0]?.forwardedToTitle || 'Assistant Secretary'
    } : null);
    const intermediateClearances = clearances.filter(c => ['assistant_secretary', 'senior_assistant_secretary', 'additional_secretary'].includes(c.role));
    const secretaryClearance = clearances.find(c => c.role === 'secretary' || c.decision === 'approve') || d.secretaryApproval || (r.status === 'Approved' ? {
      userName: 'වරුෂණ ශ්‍රී ධනපාල',
      userDesignation: 'ලේකම් (Secretary), සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      ministryName: 'සිවිල් ආරක්ෂක අමාත්‍යාංශය',
      submissionText: 'ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.',
      date: r.updated_at?.slice(0, 10) || ''
    } : null);
    const presidentialDecision = d.presidentialDecision || (d.secretariatClearances && d.secretariatClearances.find(c => c.role === 'president'));

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Leave Application FV-${String(r.id).padStart(4, '0')} - ${r.applicant_name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 25px; color: #0f172a; line-height: 1.5; font-size: 11px; }
            .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 14px; }
            .header h2 { margin: 0; font-size: 12px; color: #475569; letter-spacing: 0.5px; }
            .header h1 { margin: 4px 0 0; font-size: 15px; text-transform: uppercase; }
            .badge-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 11px; background: #f8fafc; padding: 6px 10px; border: 1px solid #e2e8f0; }
            .sec-title { background: #f1f5f9; padding: 5px 8px; font-weight: bold; border-left: 3px solid #155eef; margin: 12px 0 6px; font-size: 11px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; }
            .item { border-bottom: 1px dotted #e2e8f0; padding-bottom: 3px; }
            .item span { display: block; font-size: 9px; color: #64748b; }
            .item strong { font-size: 11px; }
            .sig-section { margin-top: 24px; border-top: 1px solid #0f172a; padding-top: 12px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-section img { max-height: 48px; border: 1px dashed #cbd5e1; padding: 2px; }
            @media print {
              body { padding: 12mm; }
              @page { size: A4 portrait; margin: 10mm; }
            }
          </style>
        </head>
        <body>
          <!-- PAGE 1: Application Particulars -->
          <div class="header">
            <h2>DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA · ESTABLISHMENTS CODE</h2>
            <h1>${isOfficial ? 'FOREIGN TRAVEL PERMISSION · GENERAL 126 & APPENDIX 16' : 'APPLICATION FOR LEAVE OUT OF SRI LANKA · GENERAL 126'}</h1>
          </div>
          <div class="badge-row">
            <div><strong>Application Ref:</strong> FV-${String(r.id).padStart(4, '0')}</div>
            <div><strong>Leave Nature:</strong> ${r.leave_type}</div>
            <div><strong>Status:</strong> ${r.status}</div>
            <button class="no-print" onclick="window.opener && window.opener.printGeneral126Pdf ? window.opener.printGeneral126Pdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : window.print()" style="font-size: 9.5px; background: #eff6ff; color: #1d4ed8; border: 1px solid #93c5fd; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">
              📄 General 126 පමණක් වෙනම PDF බාගන්න
            </button>
          </div>
          <div class="sec-title">1. Officer and Service Particulars (General 126)</div>
          <div class="grid">
            <div class="item"><span>Full Name</span><strong>${r.applicant_name}</strong></div>
            <div class="item"><span>Department / Institution</span><strong>${d.department || r.department_name || '—'}</strong></div>
            <div class="item"><span>Post / Designation</span><strong>${d.designation || '—'}</strong></div>
            <div class="item"><span>Service & Grade</span><strong>${d.service || '—'} ${d.grade ? '(' + d.grade + ')' : ''}</strong></div>
            <div class="item"><span>Date of First Appointment</span><strong>${d.firstAppointmentDate || '—'}</strong></div>
            <div class="item"><span>Date of Last Foreign Return</span><strong>${d.lastForeignReturnDate || '—'}</strong></div>
          </div>
          <div class="sec-title">2. Travel Period and Leave Particulars</div>
          <div class="grid">
            <div class="item"><span>Destination Country / City</span><strong>${r.destination}</strong></div>
            <div class="item"><span>Leave Dates</span><strong>${r.start_date} to ${r.end_date} (${d.daysApplied || '—'} Days)</strong></div>
            <div class="item" style="grid-column: span 2"><span>Purpose of Travel</span><strong>${r.purpose}</strong></div>
            <div class="item"><span>Leave Category</span><strong>${d.leaveCategory || r.leave_type}</strong></div>
            <div class="item"><span>Leave Balance Before Application</span><strong>${d.leaveBalance || '—'}</strong></div>
            <div class="item"><span>Airfare Funding</span><strong>${d.airfareFunding || '—'}</strong></div>
            <div class="item"><span>Cost of Maintenance Abroad</span><strong>${d.maintenanceFunding || '—'}</strong></div>
            <div class="item" style="grid-column: span 2"><span>Address While on Leave</span><strong>${d.abroadAddress || '—'} | Tel: ${d.abroadPhone || '—'} | ${d.abroadEmail || ''}</strong></div>
          </div>
          ${isOfficial ? `
            <div class="sec-title">3. Official Travel & Prior Permission Particulars (Appendix 16 Part 1)</div>
            <div class="grid">
              <div class="item"><span>National Identity Card (NIC)</span><strong>${d.nic || '—'}</strong></div>
              <div class="item"><span>Date of Birth</span><strong>${d.dateOfBirth || '—'}</strong></div>
              <div class="item"><span>Ministry / Provincial Council</span><strong>${d.ministry || '—'}</strong></div>
              <div class="item"><span>Duty Covering Arrangements</span><strong>${d.dutyCoverName || '—'} (${d.dutyCoverDesignation || '—'})</strong></div>
              <div class="item"><span>Training / Official Assignment</span><strong>${d.trainingField || r.purpose}</strong></div>
              <div class="item"><span>Awarding Agency / Host</span><strong>${d.visitInstitution || '—'}</strong></div>
              <div class="item"><span>Funding Method</span><strong>${d.fundingSource || '—'}</strong></div>
              <div class="item"><span>Previous Official Report Submitted</span><strong>${d.prevTripReportSubmitted || '—'}</strong></div>
            </div>
          ` : ''}
          <div class="sig-section">
            <div>
              <p style="margin:0 0 4px;font-size:10px;color:#64748b;">Applicant Declaration: I certify that the particulars furnished are true.</p>
              <strong>${r.applicant_name}</strong><br>
              <span style="font-size:10px;color:#64748b;">Date: ${r.created_at ? r.created_at.slice(0, 10) : ''}</span>
            </div>
            <div style="text-align:right;">
              ${r.signature ? `<img src="${r.signature}" alt="Applicant Signature" />` : ''}
              <div style="font-size:9px;color:#64748b;margin-top:2px;">Digital Signature Verified</div>
            </div>
          </div>

          <!-- PAGE 2: Department Head Endorsement (Est. Code XV 10:1) -->
          ${hasDeptHeadCompleted ? `
            <div style="page-break-before: always; margin-top: 25px; border: 1.5px solid #0f172a; padding: 25px; position: relative;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px;">
                <div style="font-size: 11px; line-height: 1.4;">
                  <p style="margin: 0;">ලේකම්,</p>
                  <p style="margin: 2px 0 0; text-decoration: underline;">${d.departmentHeadEndorsement.ministryName} අමාත්‍යාංශය</p>
                  <p style="margin: 8px 0 0;">செயலாளர்,</p>
                  <p style="margin: 2px 0 0; text-decoration: underline;">${d.departmentHeadEndorsement.ministryName} அமைச்சு</p>
                  <p style="margin: 8px 0 0;">The Secretary,</p>
                  <p style="margin: 2px 0 0; text-decoration: underline;">Ministry of ${d.departmentHeadEndorsement.ministryName}</p>
                  <div style="margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
                    <button class="no-print" onclick="window.opener && window.opener.printDepartmentHeadLetterPdf ? window.opener.printDepartmentHeadLetterPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : (window.printDepartmentHeadLetterPdf ? window.printDepartmentHeadLetterPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : window.print())" style="font-size: 9.5px; background: #faf5ff; color: #7e22ce; border: 1px solid #d8b4fe; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">
                      📄 ආයතන ප්‍රධානී ලිපිය වෙනම PDF
                    </button>
                    ${hasSecretaryCompleted ? `
                      <button class="no-print" onclick="window.opener && window.opener.printSecretaryApprovalLetterPdf ? window.opener.printSecretaryApprovalLetterPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : (window.printSecretaryApprovalLetterPdf ? window.printSecretaryApprovalLetterPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : window.print())" style="font-size: 9.5px; background: #f0fdf4; color: #15803d; border: 1px solid #86efac; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">
                        📄 ලේකම් ලිපිය වෙනම PDF
                      </button>
                    ` : ''}
                  </div>
                </div>

                <div style="text-align: right; font-size: 11px; line-height: 1.3;">
                  <div>මගේ අංකය &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\</div>
                  <div>எனது இல. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} &nbsp; <strong style="border-bottom: 1px dotted #000; padding: 0 10px;">${d.departmentHeadEndorsement.myNo}</strong></div>
                  <div>My No. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</div>
                </div>
              </div>

              <!-- Clause 1 -->
              <div style="margin-bottom: 16px; font-size: 11px; line-height: 1.5;">
                <p style="margin: 0 0 6px;">
                  1. <span style="border-bottom: 1px dotted #000; font-weight: bold; padding: 0 8px;">${r.applicant_name}</span> මහතාගේ/මහත්මියගේ/මෙනෙවියගේ නිවාඩු ඉල්ලුම් පත්‍රයේ පිටපත් දෙකක් මේ සමග ඉදිරිපත් කරමි. මේ නිලධාරියාගේ/නිලධාරිනියගේ වැඩ බැලීම සඳහා වැඩ පිළිවෙලක් යොදා ඇති බවත්, ඔහුට/ඇයට විරුද්ධව විනයානුකූල ක්‍රියා මාර්ගයක් දැනට පවත්වන්නේවත්, එසේ විනයානුකූල ක්‍රියා මාර්ගයක් ගැනීමට අදහස් කර ඇත්තේවත් නැති බව සහතික කරමි.
                </p>
                <p style="margin: 0 0 6px; color: #475569; font-size: 10px;">
                  திரு./திருமதி/செல்வி <span style="border-bottom: 1px dotted #000; padding: 0 6px;">${r.applicant_name}</span> அவர்களின் விடுதலை விண்ணப்பத்தில் இரண்டு பிரதிகளை இத்துடன் அனுப்புகிறேன். இவ் உத்தியோகத்தரின் கடமைகளையாற்றுவதற்குப் பதில் ஒழுங்குகள் செய்யப்பட்டுள்ளனவெனவும் இவருக்கெதிராக ஒழுக்காற்று நடவடிக்கை எதுவும் முடிவுசெய்யப்படாமலிருக்கவில்லை அல்லது ஒழுக்காற்று நடவடிக்கையெதுவும் எடுக்க உத்தேசிக்கப்பட்டிருக்கவில்லை எனவும் இத்தால் உறுதிப்படுத்துகிறேன்.
                </p>
                <p style="margin: 0; font-size: 10px;">
                  I forward herewith two copies of the leave application of Mr./Mrs./Miss <span style="border-bottom: 1px dotted #000; font-weight: bold; padding: 0 6px;">${r.applicant_name}</span>.<br>
                  I certify that acting arrangements have been made and that there is no disciplinary action pending or contemplated against this officer.
                </p>
              </div>

              <!-- Clause 2 -->
              <div style="margin-bottom: 16px; font-size: 11px; line-height: 1.4;">
                <p style="margin: 0 0 4px;">
                  2. ආයතන සංග්‍රහයේ XV වැනි පරිච්ඡේදයේ 10: 1 වැනි වගන්තිය යටතේ අග්‍රාමාත්‍යවරයාගේ අවසරය ලබා ගෙන තිබේ.
                </p>
                <p style="margin: 0 0 4px; color: #475569; font-size: 10px;">
                  தாபனக் கோவையின் XV ஆம் அத்தியாயத்தின் 10.1 ஆம் பிரிவின் பிரகாரம் பிரதம அமைச்சரின் அனுமதி பெறப்பட்டுள்ளது.
                </p>
                <p style="margin: 0; font-size: 10px;">
                  Prime Minister's permission has been obtained in terms of Chapter XV - 10: 1 of the Establishments Code.
                  <strong>(${d.departmentHeadEndorsement.primeMinisterPermission === 'obtained' ? 'Obtained' : 'Not Applicable'})</strong>
                </p>
              </div>

              <!-- Clause 3 -->
              <div style="margin-bottom: 24px; font-size: 11px; line-height: 1.5;">
                <p style="margin: 0 0 4px;">
                  3. නිවාඩු නිර්දේශ කරමි / නො කරමි * &nbsp;&nbsp;&nbsp; <strong>[ ${d.departmentHeadEndorsement.recommendation === 'recommended' ? 'නිවාඩු නිර්දේශ කරමි (RECOMMENDED)' : 'නිවාඩු නිර්දේශ නො කරමි (NOT RECOMMENDED)'} ]</strong>
                </p>
                <p style="margin: 0 0 4px; color: #475569; font-size: 10px;">
                  விடுதலையை விதந்துரைக்கிறேன் / விதந்துரைக்கவில்லை *
                </p>
                <p style="margin: 0; font-size: 10px;">
                  Leave is recommended/ not recommended. *
                </p>
                ${d.departmentHeadEndorsement.remarks ? `<p style="margin: 6px 0 0; font-size: 10px; font-style: italic;"><strong>Remarks:</strong> ${d.departmentHeadEndorsement.remarks}</p>` : ''}
              </div>

              <!-- Date and Signature -->
              <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px;">
                <div style="font-size: 11px; line-height: 1.3;">
                  <div>දිනය &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\</div>
                  <div>திகதி &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} &nbsp; <strong style="border-bottom: 1px dotted #000; padding: 0 10px;">${d.departmentHeadEndorsement.date}</strong></div>
                  <div>Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</div>
                </div>

                <div style="text-align: center; font-size: 10px; line-height: 1.4;">
                  ${d.departmentHeadEndorsement.signature ? `<img src="${d.departmentHeadEndorsement.signature}" style="max-height: 48px; display: block; margin: 0 auto 4px;" alt="Head Signature" />` : '<div style="height: 36px; border-bottom: 1px dotted #000; width: 180px; margin-bottom: 4px;"></div>'}
                  <div style="border-top: 1px dotted #000; padding-top: 4px; font-weight: bold;">
                    ${d.departmentHeadEndorsement.completedBy?.name || 'Head of Department'}<br>
                    <span style="font-weight: normal; font-size: 9px;">${d.departmentHeadEndorsement.completedBy?.designation || ''} · ${d.departmentHeadEndorsement.completedBy?.department || ''}</span>
                  </div>
                  <div style="margin-top: 4px; font-size: 9.5px;">දෙපාර්තමේන්තු ප්‍රධානියාගේ අත්සන සහ නිල නාමය</div>
                  <div style="color: #475569; font-size: 8.5px;">திணைக்களத் தலைவரின் கையொப்பமும் பதவிய்ப்பෙயரும்</div>
                  <div style="font-size: 9px; font-style: italic;">Signature and Designation of Head of Department</div>
                </div>
              </div>

              <!-- PART 2: MINISTRY SECRETARY APPROVAL & DIRECTIVE TO HEAD OF DEPARTMENT (Est. Code XV 10:1) -->
              ${hasSecretaryCompleted ? `
                <div style="margin-top: 36px; border-top: 2px dashed #0f172a; padding-top: 24px;">
                  <div style="display: flex; justify-content: flex-end; margin-bottom: 20px; font-size: 11px;">
                    <div>
                      my no.} <span style="display: inline-block; border-bottom: 1px dotted #000; min-width: 150px; padding: 0 4px; font-weight: bold;">
                        ${secretaryClearance?.myNo || (r.status === 'Approved' ? `MCS/SEC/${new Date().getFullYear()}/FV-${String(r.id).padStart(4, '0')}` : '...........................')}
                      </span>
                    </div>
                  </div>

                  <div style="text-align: left; margin-bottom: 24px; font-size: 11px; line-height: 1.5;">
                    <span style="display: inline-block; border-bottom: 1px dotted #000; min-width: 240px;">
                      ${d.departmentHeadEndorsement?.completedBy?.name || '......................................................................'}
                    </span><br />
                    Head of Department.
                  </div>

                  <div style="text-align: center; margin: 26px 0 32px; font-size: 13px;">
                    <div style="border-bottom: 1px dotted #000; width: 250px; margin: 0 auto 6px;"></div>
                    <div>
                      ${
                        r.status === 'Approved' || secretaryClearance?.decision === 'approve'
                          ? 'Leave is <strong style="text-decoration: underline; color: #16a34a;">approved</strong> / <span style="text-decoration: line-through; color: #94a3b8;">not approved</span>'
                          : r.status === 'Rejected' || secretaryClearance?.decision === 'reject'
                          ? 'Leave is <span style="text-decoration: line-through; color: #94a3b8;">approved</span> / <strong style="text-decoration: underline; color: #dc2626;">not approved</strong>'
                          : 'Leave is approved/not approved'
                      }
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 28px;">
                    <div style="font-size: 11px;">
                      <div>
                        Date} <span style="display: inline-block; border-bottom: 1px dotted #000; min-width: 120px; padding: 0 4px;">
                          ${secretaryClearance?.date || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '...........................')}
                        </span>
                      </div>
                      <div style="margin-top: 14px; font-size: 10px; color: #475569; font-style: italic;">
                        copy to: Secretary to the Prime Minister.
                      </div>
                    </div>

                    <div style="text-align: center; font-size: 10.5px; line-height: 1.35;">
                      ${secretaryClearance?.signature ? `<img src="${secretaryClearance.signature}" style="max-height: 44px; display: block; margin: 0 auto 4px;" alt="Secretary Signature" />` : '<div style="height: 32px; border-bottom: 1px dotted #000; width: 170px; margin: 0 auto 4px;"></div>'}
                      <div style="border-top: 1px dotted #000; padding-top: 4px;">
                        ${secretaryClearance?.userName ? `<strong style="display: block; font-size: 10px;">${secretaryClearance.userName}</strong>` : (r.status === 'Approved' ? '<strong style="display: block; font-size: 10px;">වරුෂණ ශ්‍රී ධනපාල</strong>' : '')}
                        <strong>Secretary.</strong><br />
                        ministry of <span style="border-bottom: 1px dotted #000; padding: 0 4px; font-weight: bold;">${secretaryClearance?.ministryName || d.departmentHeadEndorsement?.ministryName || '...............................'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ` : `
                <div style="margin-top: 36px; border-top: 2px dashed #94a3b8; padding: 22px; text-align: center; background: #f8fafc; border-radius: 6px;">
                  <div style="font-weight: bold; color: #475569; font-size: 11px;">🔒 අමාත්‍යාංශ ලේකම් අනුමැතිය (Part II: Ministry Secretary Approval) තවමත් සම්පූර්ණ කර නොමැත</div>
                  <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">Pending Ministry Secretary Action · ලේකම්වරයා විසින් අනුමැතිය සම්පූර්ණ කරන තෙක් මෙම කොටස බැලීමට නොහැක</div>
                </div>
              `}
            </div>
          ` : ''}

          <!-- PAGE 3: Official Clearance Sheet (අවසර පත්‍රිකාව) -->
          ${hasClearanceCompleted ? `
            <div style="page-break-before: always; margin-top: 25px; border: 1.5px solid #0f172a; padding: 25px; position: relative;">
              <!-- Header -->
              <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 16px;">
                <div style="font-size: 11px; font-weight: bold; color: #475569; letter-spacing: 0.5px;">DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA · MINISTRY OF CIVIL SECURITY</div>
                <div style="font-size: 15px; font-weight: bold; margin-top: 4px; text-transform: uppercase;">අවසර පත්‍රිකාව (CLEARANCE NOTE SHEET)</div>
                <div style="font-size: 10px; color: #64748b; margin-top: 2px;">අමාත්‍යාංශ ලේකම් කාර්යාල නිල අත්සන් හා නිර්දේශ සටහන් (MINISTERIAL SECRETARIAT MINUTE TRAIL)</div>
              </div>

              <!-- Metadata bar -->
              <div style="display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; margin-bottom: 16px; font-size: 10.5px;">
                <div><strong>යොමු අංකය (Ref No):</strong> FV-${String(r.id).padStart(4, '0')}</div>
                <div><strong>අයදුම්කරු (Applicant):</strong> ${r.applicant_name}</div>
                <div><strong>දෙපාර්තමේන්තුව (Dept):</strong> ${d.department || r.department_name || '—'}</div>
              </div>

              <!-- Part 1: Subject Officer Section -->
              ${subjectOfficerClearance ? `
                <div style="margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; background: #ffffff;">
                  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
                    <div style="font-size: 11px; font-weight: bold; color: #1e3a8a;">
                      1. විෂයභාර නිලධාරී තක්සේරුව සහ සටහන (Subject Officer Assessment & Minute)
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      ${subjectOfficerClearance.forwardedToTitle ? `<span style="font-size: 9.5px; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 10px; font-weight: 600;">➔ ${subjectOfficerClearance.forwardedToTitle}</span>` : ''}
                      <button class="no-print" onclick="window.opener && window.opener.printSubjectOfficerPdf ? window.opener.printSubjectOfficerPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : window.print()" style="font-size: 9.5px; background: #eff6ff; color: #1d4ed8; border: 1px solid #93c5fd; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">
                        📄 වෙනම PDF බාගන්න
                      </button>
                    </div>
                  </div>

                  ${d.officerAssessment ? `
                    <table style="width:100%; border-collapse:collapse; margin:6px 0 10px; font-size:10px;">
                      <thead>
                        <tr style="background:#f1f5f9;">
                          <th style="border:1px solid #cbd5e1; padding:3px 6px; text-align:left;">Leave Classification / නිවාඩු වර්ගය</th>
                          <th style="border:1px solid #cbd5e1; padding:3px 6px; text-align:center; width:80px;">Months</th>
                          <th style="border:1px solid #cbd5e1; padding:3px 6px; text-align:center; width:80px;">Days</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px;">Vacation Leave / නිවාඩු ශේෂය</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.vacationLeave?.months || 0}</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.vacationLeave?.days || 0}</td>
                        </tr>
                        <tr>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px;">Commuted half-pay leave</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.commutedHalfPay?.months || 0}</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.commutedHalfPay?.days || 0}</td>
                        </tr>
                        <tr>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px;">Half-Pay leave / අර්ධ වැටුප් නිවාඩු</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.halfPay?.months || 0}</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.halfPay?.days || 0}</td>
                        </tr>
                        <tr>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px;">No-Pay leave / වැටුප් රහිත නිවාඩු</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.noPay?.months || 0}</td>
                          <td style="border:1px solid #e2e8f0; padding:3px 6px; text-align:center;">${d.officerAssessment?.noPay?.days || 0}</td>
                        </tr>
                        <tr style="font-weight:bold; background:#eff6ff;">
                          <td style="border:1px solid #cbd5e1; padding:3px 6px;">Total / එකතුව</td>
                          <td style="border:1px solid #cbd5e1; padding:3px 6px; text-align:center;">${d.officerAssessment?.total?.months || 0}</td>
                          <td style="border:1px solid #cbd5e1; padding:3px 6px; text-align:center;">${d.officerAssessment?.total?.days || 0}</td>
                        </tr>
                      </tbody>
                    </table>
                  ` : ''}

                  ${subjectOfficerClearance.remarks ? `
                    <div style="margin: 6px 0; font-size: 10.5px; background: #f8fafc; padding: 6px 10px; border: 1px solid #f1f5f9; border-radius: 4px;">
                      <strong>නිල සටහන / නිර්දේශය:</strong> ${subjectOfficerClearance.remarks}
                    </div>
                  ` : ''}

                  <!-- Subject Officer Name, Designation, Date Signed & Signature -->
                  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px; padding-top: 8px; border-top: 1px dotted #cbd5e1;">
                    <div style="font-size: 10.5px; line-height: 1.5;">
                      <div><strong>නම (Name):</strong> ${subjectOfficerClearance.userName || 'Subject Officer'}</div>
                      <div><strong>තනතුර (Designation):</strong> ${subjectOfficerClearance.userDesignation || 'විෂයභාර නිලධාරී (Subject Officer)'}</div>
                      <div><strong>අත්සන් කළ දිනය (Date Signed):</strong> ${subjectOfficerClearance.date || '—'}</div>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-size: 9px; color: #64748b; margin-bottom: 2px;">විෂයභාර නිලධාරී අත්සන (Signature):</div>
                      ${subjectOfficerClearance.signature ? `<img src="${subjectOfficerClearance.signature}" style="max-height: 42px; max-width: 150px; border: 1px dashed #cbd5e1; padding: 2px;" alt="Subject Officer Signature" />` : '<div style="height: 34px; border-bottom: 1px dotted #000; width: 140px;"></div>'}
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- Official Document Review Statement -->
              <div style="border: 1.5px solid #2563eb; background: #eff6ff; border-radius: 4px; padding: 10px 14px; margin-bottom: 14px;">
                <div style="font-size: 10.5px; line-height: 1.5; color: #1e3a8a; font-style: italic; font-weight: 600;">
                  "All relevant documents have been carefully examined and thoroughly reviewed to verify the accuracy and completeness of the information provided. The contents of the documents have been duly considered in accordance with the applicable rules, regulations, and established administrative procedures."
                </div>
              </div>

              <!-- Part 2: Intermediate Secretariat Officers (Assistant Secretary, Senior Assistant Secretary, Additional Secretary) -->
              ${intermediateClearances.length > 0 ? `
                <div style="margin-bottom: 16px;">
                  <div style="font-size: 11px; font-weight: bold; color: #1e3a8a; margin-bottom: 8px;">
                    2. අමාත්‍යාංශ ලේකම් කාර්යාල නිලධාරීන්ගේ නිර්දේශ හා සටහන් (Ministry Secretariat Recommendations)
                  </div>
                  ${intermediateClearances.map((c) => `
                    <div style="margin-bottom: 10px; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px; background: #ffffff;">
                      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; margin-bottom: 6px;">
                        <strong style="font-size: 11px; color: #0f172a;">${c.title} ${c.titleSi ? '(' + c.titleSi + ')' : ''}</strong>
                        ${c.forwardedToTitle ? `<span style="font-size: 9.5px; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 10px; font-weight: 600;">➔ ${c.forwardedToTitle}</span>` : ''}
                      </div>
                      ${c.remarks ? `
                        <div style="margin: 4px 0 8px; font-size: 10.5px; background: #f8fafc; padding: 6px 10px; border: 1px solid #f1f5f9; border-radius: 4px;">
                          <strong>නිල සටහන / නිර්දේශය:</strong> ${c.remarks}
                        </div>
                      ` : ''}
                      <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 6px; border-top: 1px dotted #cbd5e1;">
                        <div style="font-size: 10px; line-height: 1.5;">
                          <div><strong>නම (Name):</strong> ${c.userName}</div>
                          <div><strong>තනතුර (Designation):</strong> ${c.userDesignation || c.titleSi || c.title}</div>
                          <div><strong>අත්සන් කළ දිනය (Date Signed):</strong> ${c.date || c.timestamp?.slice(0, 10) || '—'}</div>
                        </div>
                        <div style="text-align: right;">
                          <div style="font-size: 9px; color: #64748b; margin-bottom: 2px;">අත්සන (Signature):</div>
                          ${c.signature ? `<img src="${c.signature}" style="max-height: 40px; max-width: 140px; border: 1px dashed #cbd5e1; padding: 2px;" alt="Signature" />` : '<div style="height: 32px; border-bottom: 1px dotted #000; width: 130px;"></div>'}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Part 3: Ministry Secretary Submission & Signature Section -->
              <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 14px 16px; background: #f8fafc; margin-top: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <div style="font-size: 12px; font-weight: bold; color: #0f172a;">
                    <u>ගරු අමාත්‍යාංශය</u>
                  </div>
                  <button class="no-print" onclick="window.opener && window.opener.printNoteSheetMinisterialPdf ? window.opener.printNoteSheetMinisterialPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : (window.printNoteSheetMinisterialPdf ? window.printNoteSheetMinisterialPdf(${JSON.stringify(r).replace(/"/g, '&quot;')}) : window.print())" style="font-size: 9.5px; background: #f0fdf4; color: #166534; border: 1px solid #86efac; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">
                    📄 අවසර පත්‍රිකාව වෙනම PDF
                  </button>
                </div>
                <div style="font-size: 11px; line-height: 1.6; color: #0f172a; margin-bottom: 16px;">
                  ඉහත නම් සඳහන් නිලධාරියාගේ විදේශ නිවාඩු ඉල්ලීම නිර්දේශ කරනු ලබන අතර ඔබගේ අනුමැතිය සඳහා කාරුණිකව ඉදිරිපත් කරමි.
                </div>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 12px; border-top: 1px dashed #94a3b8;">
                  <div style="font-size: 10.5px; line-height: 1.5;">
                    <div><strong>දිනය (Date):</strong> ${secretaryClearance?.date || secretaryClearance?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '........................')}</div>
                  </div>
                  <div style="text-align: center; font-size: 10.5px; line-height: 1.4;">
                    ${secretaryClearance?.signature ? `<img src="${secretaryClearance.signature}" style="max-height: 48px; max-width: 170px; display: block; margin: 0 auto 4px;" alt="Secretary Signature" />` : '<div style="height: 36px; border-bottom: 1px dotted #000; width: 170px; margin-bottom: 4px;"></div>'}
                    <div style="border-top: 1px dotted #000; padding-top: 4px; font-weight: bold;">
                      ${secretaryClearance?.userName || secretaryClearance?.signatoryName || 'වරුෂණ ශ්‍රී ධනපාල'}<br>
                      <span style="font-weight: normal; font-size: 9.5px;">ලේකම්</span><br>
                      <span style="font-weight: normal; font-size: 9.5px;">සිවිල් ආරක්ෂක අමාත්‍යාංශය</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Part 4: Presidential Order Section (අතිගරු ජනාධිපතිතුමා) -->
              <div style="border: 2px solid #0f172a; border-radius: 4px; padding: 12px 14px; background: #ffffff; margin-top: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">
                  <span style="font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase;">අතිගරු ජනාධිපතිතුමාගේ තීරණය (PRESIDENTIAL ORDER)</span>
                  <span style="font-size: 9.5px; color: #64748b; font-weight: 600;">Final Constitutional Authority</span>
                </div>
                <div style="margin: 6px 0 10px; font-size: 12px; display: flex; gap: 20px; align-items: center;">
                  <div style="font-weight: 700; color: ${(presidentialDecision?.decision === 'approve' || (!presidentialDecision && r.status === 'Approved')) ? '#15803d' : '#64748b'};">
                    <span style="font-size: 14px;">${(presidentialDecision?.decision === 'approve' || (!presidentialDecision && r.status === 'Approved')) ? '☑' : '☐'}</span>
                    <span style="margin-left: 4px;">"නිවාඩුව අනුමත කරමි"</span>
                  </div>
                  <div style="font-weight: 700; color: ${(presidentialDecision?.decision === 'reject' || (!presidentialDecision && r.status === 'Rejected')) ? '#b91c1c' : '#64748b'};">
                    <span style="font-size: 14px;">${(presidentialDecision?.decision === 'reject' || (!presidentialDecision && r.status === 'Rejected')) ? '☑' : '☐'}</span>
                    <span style="margin-left: 4px;">"නිවාඩු අනුමත නොකරමි"</span>
                  </div>
                </div>
                ${presidentialDecision?.remarks ? `
                  <div style="margin-bottom: 8px; font-size: 10px; background: #f8fafc; padding: 5px 8px; border: 1px solid #e2e8f0; border-radius: 4px;">
                    <strong>විශේෂ සටහන් / Directives:</strong> ${presidentialDecision.remarks}
                  </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 8px; border-top: 1px dashed #cbd5e1;">
                  <div style="font-size: 10px; line-height: 1.6; color: #1e293b;">
                    <div><strong>නම (Name):</strong> ${presidentialDecision?.userName || ((presidentialDecision || r.status === 'Approved') ? 'අතිගරු ජනාධිපතිතුමා' : '........................................')}</div>
                    <div><strong>දිනය (Date):</strong> ${presidentialDecision?.date || presidentialDecision?.timestamp?.slice(0, 10) || (r.status === 'Approved' ? r.updated_at?.slice(0, 10) : '........................')}</div>
                  </div>
                  <div style="text-align: center; font-size: 10px; line-height: 1.35;">
                    ${presidentialDecision?.signature ? `<img src="${presidentialDecision.signature}" style="max-height: 46px; max-width: 170px; display: block; margin: 0 auto 4px;" alt="President Signature" />` : '<div style="height: 36px; border-bottom: 1px dotted #000; width: 170px; margin: 0 auto 4px;"></div>'}
                    <div style="border-top: 1px dotted #000; padding-top: 4px; font-weight: bold;">
                      (Name / Date / signature)<br>
                      <span style="font-size: 11px; color: #0f172a;">ජනාධිපති සහ ඩිජිටල් ආර්ථික අමාත්‍යාංශය</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
  }


  if (!user || !token) {
    return (
      <AuthPage
        language={language}
        setLanguage={setLanguage}
        t={t}
        onLogin={(session) => {
          localStorage.setItem('portal-token', session.token);
          localStorage.setItem('portal-user', JSON.stringify(session.user));
          setUser(session.user);
          setToken(session.token);
        }}
      />
    );
  }

  const isApplicant = user.role === 'applicant';
  const isAdmin = user.role === 'admin';
  const isDeptHead = user.role === 'department_head';
  const isReviewer = user.role === 'reviewer';
  const isSecretariat = ['assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary'].includes(user.role);
  const isAuthority = ['authorized_official', 'minister', 'president'].includes(user.role);
  const canReviewOrApprove = isAdmin || isDeptHead || isReviewer || isSecretariat || isAuthority;

  const activeApplicantRequest = isApplicant
    ? (requests.find((r) => r.id === applicantTrackId) || requests[0] || null)
    : null;

  // Counts
  const pendingRequests = requests.filter((r) => r.status.startsWith('Pending'));
  const approvedRequests = requests.filter((r) => r.status === 'Approved');
  const rejectedRequests = requests.filter((r) => r.status === 'Rejected');
  const returnedRequests = requests.filter((r) => r.status === 'Returned');

  const pendingCount = pendingRequests.length;
  const approvedCount = approvedRequests.length;
  const rejectedCount = rejectedRequests.length;
  const returnedCount = returnedRequests.length;

  // Stage breakdown
  const deptHeadPending = requests.filter((r) => r.status === 'Pending Department Head Approval').length;
  const reviewPending = requests.filter((r) => r.status === 'Pending Review').length;
  const secretariatPending = requests.filter((r) => ['Pending Assistant Secretary Review', 'Pending Senior Assistant Secretary Review', 'Pending Additional Secretary Review'].includes(r.status)).length;
  const secretaryPending = requests.filter((r) => r.status === 'Pending Secretary Approval').length;
  const presidentialPending = requests.filter((r) => r.status === 'Pending Presidential Approval').length;

  // Approvals tab filtered requests
  const approvalsList = requests.filter((r) => {
    const matchesQuery = `${r.id} ${r.applicant_name} ${r.destination}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === 'all' || r.leave_type === (typeFilter === 'official' ? 'Official duty' : 'Private leave');
    let matchesStage = true;
    if (approvalStageFilter === 'pending') {
      matchesStage = r.status.startsWith('Pending');
    } else if (approvalStageFilter === 'secretariat') {
      matchesStage = ['Pending Assistant Secretary Review', 'Pending Senior Assistant Secretary Review', 'Pending Additional Secretary Review'].includes(r.status);
    } else if (approvalStageFilter !== 'all') {
      matchesStage = r.status === approvalStageFilter;
    }
    return matchesQuery && matchesType && matchesStage;
  });

  // Reports tab filtered requests
  const reportsList = requests.filter((r) => {
    const matchesQuery = `${r.id} ${r.applicant_name} ${r.destination}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === 'all' || r.leave_type === (typeFilter === 'official' ? 'Official duty' : 'Private leave');
    let matchesStatus = true;
    if (reportFilter === 'approved') {
      matchesStatus = r.status === 'Approved';
    } else if (reportFilter === 'process') {
      matchesStatus = r.status.startsWith('Pending');
    } else if (reportFilter === 'reject') {
      matchesStatus = r.status === 'Rejected' || r.status === 'Returned';
    }
    return matchesQuery && matchesType && matchesStatus;
  });

  // Overview filtered requests
  const overviewList = requests.filter((r) => {
    const matchesQuery = `${r.id} ${r.applicant_name} ${r.destination}`.toLowerCase().includes(query.toLowerCase());
    const matchesRole = !isApplicant || r.applicant_id === user.id;
    return matchesQuery && matchesRole;
  });

  // Users tab filtered list (admin)
  const filteredUsers = users.filter((u) => {
    const matchesSearch = `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(userSearch.toLowerCase());
    let matchesRole = true;
    if (userRoleFilter === 'admin') matchesRole = u.role === 'admin';
    else if (userRoleFilter === 'reviewer') matchesRole = u.role === 'reviewer';
    else if (userRoleFilter === 'authority') matchesRole = ['authorized_official', 'minister', 'president'].includes(u.role);
    else if (userRoleFilter === 'applicant') matchesRole = u.role === 'applicant';
    return matchesSearch && matchesRole;
  });

  return (
    <div className="app-shell">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="crest-lockup">
          <img className="ministry-emblem" src="https://mode.gov.lk/assets/logo-C1c0CvCU.png" alt="Government of Sri Lanka national emblem" />
          <div>
            <strong>{t.brand}</strong>
            <span>PUBLIC SERVICE PORTAL</span>
          </div>
        </div>

        <div className="nav-caption">
          {isAdmin ? 'ADMINISTRATIVE WORKSPACE' : isApplicant ? 'APPLICANT WORKSPACE' : 'GOVERNANCE WORKSPACE'}
        </div>

        <nav>
          {/* 1. OVERVIEW */}
          <button
            className={activeNav === 'overview' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveNav('overview')}
          >
            <span className="nav-icon"><LayoutDashboard size={17} /></span>
            {t.overview}
          </button>

          {/* 2. APPROVALS / MY REQUESTS */}
          {canReviewOrApprove ? (
            <button
              className={activeNav === 'approvals' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('approvals')}
            >
              <span className="nav-icon"><Stamp size={17} /></span>
              {t.approvals}
              {pendingCount > 0 && <span className="nav-count">{pendingCount}</span>}
            </button>
          ) : (
            <button
              className={activeNav === 'requests' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('requests')}
            >
              <span className="nav-icon"><FileText size={17} /></span>
              {t.requests}
            </button>
          )}

          {/* 3. ADD USER (Admin Only) */}
          {isAdmin && (
            <button
              className={activeNav === 'users' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav('users')}
            >
              <span className="nav-icon"><UserPlus size={17} /></span>
              {t.addUser}
              {users.length > 0 && <span className="nav-count">{users.length}</span>}
            </button>
          )}

          {/* 4. ALL REPORTS */}
          <button
            className={activeNav === 'reports' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveNav('reports')}
          >
            <span className="nav-icon"><BarChart3 size={17} /></span>
            {t.reports}
          </button>
        </nav>

        <div className="side-bottom">
          <div className="support-line">
            <CircleHelp size={16} />
            <span>Sri Lanka Gov · v2.5</span>
            <ArrowRight size={14} />
          </div>
          <div className="profile-block">
            <div className="avatar">
              {user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
            </div>
            <div className="profile-copy">
              <strong>{user.name}</strong>
              <span>{t.roleNames[user.role] || user.role}</span>
            </div>
            <button title={t.signOut} aria-label={t.signOut} onClick={signOut}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="main-area">
        <header className="topbar">
          <div className="crumb">
            <span>PORTAL</span>
            <span className="crumb-slash">/</span>
            <strong>
              {activeNav === 'overview' && t.overview.toUpperCase()}
              {activeNav === 'approvals' && t.approvals.toUpperCase()}
              {activeNav === 'users' && (language === 'en' ? 'USER MANAGEMENT & ADD USER' : 'පරිශීලක කළමනාකරණය')}
              {activeNav === 'reports' && (language === 'en' ? 'ALL REPORTS' : 'සියලු වාර්තා')}
              {activeNav === 'requests' && t.requests.toUpperCase()}
            </strong>
          </div>
          <div className="top-actions">
            <span className="today-label">{t.today}</span>
            <button className="lang-button" onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}>
              <Globe2 size={15} />
              {t.language}
            </button>

            {/* NOTIFICATION BELL & DROPDOWN */}
            <div className="notification-wrapper" ref={notifDropdownRef}>
              <button
                className={`notification-bell-btn ${unreadNotifCount > 0 ? 'has-unread' : ''}`}
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                aria-label="Notifications"
                title={language === 'en' ? 'Notifications & Notices' : 'දැනුම්දීම්'}
              >
                <Bell size={17} />
                {unreadNotifCount > 0 && (
                  <span className="bell-badge-pulse">{unreadNotifCount}</span>
                )}
              </button>

              {showNotifMenu && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <div>
                      <strong>{language === 'en' ? 'Notifications & Notices' : 'දැනුම්දීම්'}</strong>
                      {unreadNotifCount > 0 && (
                        <span className="badge-count-red">
                          {unreadNotifCount} {language === 'en' ? 'new' : 'අලුත්'}
                        </span>
                      )}
                    </div>
                    {unreadNotifCount > 0 && (
                      <button className="text-btn" onClick={handleMarkAllNotificationsRead}>
                        {language === 'en' ? 'Mark all read' : 'සියල්ල කියවූ බව සටහන් කරන්න'}
                      </button>
                    )}
                  </div>

                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="notification-empty">
                        <BellOff size={22} />
                        <span>{language === 'en' ? 'No notifications right now' : 'දැනට නව දැනුම්දීම් නැත'}</span>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`notification-item ${n.is_read ? 'read' : 'unread'}`}
                          onClick={() => handleNotificationClick(n)}
                        >
                          <div className="notif-icon-wrap">
                            {n.type === 'application_received' && <FilePlus2 size={15} style={{ color: '#ef4444' }} />}
                            {n.type === 'action_required' && <Clock size={15} style={{ color: '#f59e0b' }} />}
                            {n.type === 'success' && <Check size={15} style={{ color: '#10b981' }} />}
                            {n.type === 'error' && <AlertCircle size={15} style={{ color: '#ef4444' }} />}
                            {!['application_received', 'action_required', 'success', 'error'].includes(n.type) && (
                              <Bell size={15} style={{ color: '#3b82f6' }} />
                            )}
                          </div>
                          <div className="notif-body">
                            <div className="notif-title-row">
                              <strong>{n.title}</strong>
                              {!n.is_read && <span className="notif-unread-dot" />}
                            </div>
                            <p>{n.message}</p>
                            <small>{n.created_at ? n.created_at.slice(0, 16).replace('T', ' ') : ''}</small>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="top-avatar">
              {user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
            </div>
          </div>
        </header>

        <section className="page-content">
          {/* ========================================================= */}
          {/* VIEW 1: OVERVIEW */}
          {/* ========================================================= */}
          {activeNav === 'overview' && (
            <div>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    {isAdmin
                      ? (language === 'en' ? 'ADMINISTRATIVE CONTROL CENTER' : 'පරිපාලන පාලන මැදිරිය')
                      : `${t.welcome}, ${user.name.split(' ')[0]}`}
                  </div>
                  <h1>
                    {isAdmin
                      ? (language === 'en' ? 'Admin Overview' : 'පරිපාලන සාරාංශය')
                      : t.title}
                  </h1>
                  <p>{t.track}</p>
                </div>
                <div className="heading-actions">
                  <span className="role-pill">
                    <ShieldCheck size={14} />
                    {t.roleNames[user.role] || user.role}
                  </span>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="secondary-button" onClick={() => setActiveNav('approvals')}>
                        <Stamp size={15} />
                        {t.approvals}
                      </button>
                      <button className="secondary-button" onClick={() => setActiveNav('users')}>
                        <UserPlus size={15} />
                        {t.addUser}
                      </button>
                      <button className="primary-button" onClick={() => setActiveNav('reports')}>
                        <BarChart3 size={15} />
                        {t.reports}
                      </button>
                    </div>
                  )}
                  {isApplicant && (
                    <button className="primary-button" onClick={() => setShowLeaveTypeModal(true)}>
                      <FilePlus2 size={16} />
                      {t.newRequest}
                    </button>
                  )}
                </div>
              </div>

              {/* KPI Summary Grid */}
              <div className="summary-grid">
                <article className="metric" style={{ cursor: 'pointer' }} onClick={() => setActiveNav('reports')}>
                  <div className="metric-top">
                    <span>{t.total}</span>
                    <FileText size={16} />
                  </div>
                  <strong>{requests.length.toString().padStart(2, '0')}</strong>
                  <small>{t.years}</small>
                </article>

                <article className="metric accent-yellow" style={{ cursor: 'pointer' }} onClick={() => setActiveNav('approvals')}>
                  <div className="metric-top">
                    <span>{t.inProcess}</span>
                    <Clock size={16} />
                  </div>
                  <strong>{pendingCount.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Awaiting reviews / authority' : 'සමාලෝචන / බලධාරී අනුමැතිය'}</small>
                </article>

                <article className="metric accent-green" style={{ cursor: 'pointer' }} onClick={() => { setReportFilter('approved'); setActiveNav('reports'); }}>
                  <div className="metric-top">
                    <span>{t.approved}</span>
                    <Check size={16} />
                  </div>
                  <strong>{approvedCount.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Authorized visits' : 'අනුමත කළ සංචාර'}</small>
                </article>

                <article className="metric accent-red" style={{ cursor: 'pointer' }} onClick={() => { setReportFilter('reject'); setActiveNav('reports'); }}>
                  <div className="metric-top">
                    <span>{language === 'en' ? 'Rejected / Returned' : 'ප්‍රතික්ෂේපිත / ආපසු යැවූ'}</span>
                    <AlertCircle size={16} />
                  </div>
                  <strong>{(rejectedCount + returnedCount).toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Actioned / Amendments' : 'ක්‍රියාමාර්ග ගත් ඉල්ලීම්'}</small>
                </article>
              </div>

              {/* Applicant Live Process Status Tracker */}
              {isApplicant && (
                <ApplicantLiveProcessTracker
                  request={activeApplicantRequest}
                  language={language}
                  onOpenDetail={handleOpenRequest}
                  allRequests={requests}
                  selectedRequestId={applicantTrackId}
                  onSelectRequestId={setApplicantTrackId}
                  onNewRequest={() => setShowLeaveTypeModal(true)}
                  onEditRequest={(req) => setEditingRequest(req)}
                  onDeleteRequest={(req) => setDeletingRequest(req)}
                  onRejectRequest={(req) => setRejectingRequest(req)}
                  user={user}
                  token={token}
                />
              )}

              {/* Multi-Stage Approval Pipeline Flow Visualizer */}
              <div className="pipeline-card">
                <div className="pipeline-header">
                  <div>
                    <h3>{t.pipelineTitle}</h3>
                    <span>{t.pipelineSubtitle}</span>
                  </div>
                  {canReviewOrApprove && (
                    <button className="secondary-button" style={{ height: '30px', padding: '0 10px', fontSize: '10px' }} onClick={() => setActiveNav('approvals')}>
                      {language === 'en' ? 'Open Queue' : 'පෝලිම බලන්න'}
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
                <div className="pipeline-flow" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                  <div
                    className={`pipeline-stage ${deptHeadPending > 0 ? 'has-pending' : ''}`}
                    onClick={() => { setApprovalStageFilter('Pending Department Head Approval'); setActiveNav('approvals'); }}
                  >
                    <div className="pipeline-stage-top">
                      <span className="stage-num">1</span>
                      <span className="stage-count">{deptHeadPending}</span>
                    </div>
                    <span className="stage-title">{t.roleNames.department_head || 'Dept Head'}</span>
                    <span className="stage-desc">{language === 'en' ? 'Est. Code XV 10:1' : 'ආයතන ප්‍රධානියා'}</span>
                  </div>

                  <div
                    className={`pipeline-stage ${reviewPending > 0 ? 'has-pending' : ''}`}
                    onClick={() => { setApprovalStageFilter('Pending Review'); setActiveNav('approvals'); }}
                  >
                    <div className="pipeline-stage-top">
                      <span className="stage-num">2</span>
                      <span className="stage-count">{reviewPending}</span>
                    </div>
                    <span className="stage-title">{t.roleNames.reviewer}</span>
                    <span className="stage-desc">{language === 'en' ? 'Assessment & Note Sheet' : 'විෂයභාර නිලධාරී'}</span>
                  </div>

                  <div
                    className={`pipeline-stage ${secretariatPending > 0 ? 'has-pending' : ''}`}
                    onClick={() => { setApprovalStageFilter('secretariat'); setActiveNav('approvals'); }}
                  >
                    <div className="pipeline-stage-top">
                      <span className="stage-num">3</span>
                      <span className="stage-count">{secretariatPending}</span>
                    </div>
                    <span className="stage-title">{language === 'en' ? 'Secretariat' : 'ලේකම් කාර්යාලය'}</span>
                    <span className="stage-desc">{language === 'en' ? 'Asst Sec ➔ Addl Sec' : 'සහකාර ➔ අතිරේක ලේකම්'}</span>
                  </div>

                  <div
                    className={`pipeline-stage ${secretaryPending > 0 ? 'has-pending' : ''}`}
                    onClick={() => { setApprovalStageFilter('Pending Secretary Approval'); setActiveNav('approvals'); }}
                  >
                    <div className="pipeline-stage-top">
                      <span className="stage-num">4</span>
                      <span className="stage-count">{secretaryPending}</span>
                    </div>
                    <span className="stage-title">{t.roleNames.secretary || 'Secretary'}</span>
                    <span className="stage-desc">{language === 'en' ? 'Submits to President' : 'ජනාධිපතිතුමා වෙත ඉදිරිපත්'}</span>
                  </div>

                  <div
                    className={`pipeline-stage ${presidentialPending > 0 ? 'has-pending' : ''}`}
                    onClick={() => { setApprovalStageFilter('Pending Presidential Approval'); setActiveNav('approvals'); }}
                  >
                    <div className="pipeline-stage-top">
                      <span className="stage-num">5</span>
                      <span className="stage-count">{presidentialPending}</span>
                    </div>
                    <span className="stage-title">{language === 'en' ? 'President' : 'ජනාධිපති'}</span>
                    <span className="stage-desc">{language === 'en' ? 'Final Executive Decision' : 'අවසාන අනුමැතිය'}</span>
                  </div>

                  <div
                    className="pipeline-stage"
                    onClick={() => { setReportFilter('approved'); setActiveNav('reports'); }}
                  >
                    <div className="pipeline-stage-top">
                      <span className="stage-num" style={{ background: '#ecfdf5', color: '#047857' }}>✓</span>
                      <span className="stage-count" style={{ color: '#047857' }}>{approvedCount}</span>
                    </div>
                    <span className="stage-title">{t.approved}</span>
                    <span className="stage-desc">{language === 'en' ? 'Travel authorized' : 'සංචාරය අනුමතයි'}</span>
                  </div>
                </div>
              </div>

              {/* Recent Applications Table */}
              <section className="table-section">
                <div className="table-heading">
                  <div>
                    <h2>{language === 'en' ? 'Recent Applications Overview' : 'මෑත ඉල්ලීම් සාරාංශය'}</h2>
                    <p>{t.track}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <label className="search-box">
                      <Search size={15} />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.noteLabel}
                      />
                    </label>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>{t.id}</th>
                        <th>{t.applicant}</th>
                        <th>{t.destination}</th>
                        <th>{t.dates}</th>
                        <th>{t.type}</th>
                        <th>{t.status}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {overviewList.slice(0, 8).map((request) => (
                        <tr
                          key={request.id}
                          className={!request.is_viewed ? 'row-unviewed' : ''}
                          onClick={() => handleOpenRequest(request)}
                        >
                          <td className="ref-cell">
                            FV-{String(request.id).padStart(4, '0')}
                            {!request.is_viewed && (
                              <span className="unread-tag-red" title={language === 'en' ? 'Unopened / Not viewed yet' : 'නොබලන ලද'}>
                                <span className="pulse-dot-red" />
                                {language === 'en' ? 'NEW' : 'නොබලන ලද'}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="person-cell">
                              <span className="mini-avatar">
                                {(request.applicant_name || 'Applicant').split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('')}
                              </span>
                              <span>{request.applicant_name || '—'}</span>
                            </div>
                          </td>
                          <td className="destination-cell">{request.destination}</td>
                          <td>
                            {formatDate(request.start_date)} <span className="date-separator">→</span> {formatDate(request.end_date)}
                          </td>
                          <td>
                            <span className="type-tag">{request.leave_type}</span>
                          </td>
                          <td>
                            {(() => {
                              const sInfo = getHierarchyStatusInfo(request, language);
                              return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <span className={`status-badge ${getStatusBadgeClass(request.status)}`} style={{ alignSelf: 'flex-start' }}>
                                    <i />
                                    {t.statuses[request.status] || request.status}
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{
                                      fontSize: '9.5px',
                                      fontWeight: 700,
                                      color: sInfo.color,
                                      background: sInfo.bg,
                                      border: `1px solid ${sInfo.border}`,
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      {language === 'si' ? `පියවර ${sInfo.step}/9` : `Step ${sInfo.step}/9`}
                                    </span>
                                    <div style={{
                                      flex: 1,
                                      height: '4px',
                                      background: '#e2e8f0',
                                      borderRadius: '2px',
                                      overflow: 'hidden',
                                      minWidth: '38px',
                                      maxWidth: '60px'
                                    }}>
                                      <div style={{
                                        width: `${sInfo.percent}%`,
                                        height: '100%',
                                        background: sInfo.color,
                                        borderRadius: '2px'
                                      }} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </td>
                          <td>
                            {(() => {
                              const userRole = user.role;
                              const isAdmin = userRole === 'admin';
                              const isOwner = user.id === request.applicant_id || userRole === 'applicant';
                              const isEditableStatus = ['Pending Department Head Approval', 'Pending Review', 'Returned', 'Rejected'].includes(request.status);
                              const canEditRow = isAdmin || (isOwner && isEditableStatus);
                              const canDeleteRow = isAdmin || (isOwner && isEditableStatus);
                              const canRejectRow = !['Approved', 'Rejected'].includes(request.status) &&
                                ['department_head', 'reviewer', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'minister', 'president', 'admin'].includes(userRole);

                              return (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                                  {canEditRow && (
                                    <button
                                      type="button"
                                      className="icon-button"
                                      onClick={(e) => { e.stopPropagation(); setEditingRequest(request); }}
                                      title={language === 'si' ? (request.status === 'Rejected' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න' : 'අයදුම්පත සංස්කරණය කරන්න') : (request.status === 'Rejected' ? 'Fix Deficiencies & Resubmit' : 'Edit Application')}
                                      style={{ color: request.status === 'Rejected' ? '#dc2626' : '#2563eb', padding: '4px' }}
                                    >
                                      <Edit3 size={14} />
                                    </button>
                                  )}
                                  {canDeleteRow && (
                                    <button
                                      type="button"
                                      className="icon-button"
                                      onClick={(e) => { e.stopPropagation(); setDeletingRequest(request); }}
                                      title={language === 'si' ? 'අයදුම්පත මකා දමන්න' : 'Delete Application'}
                                      style={{ color: '#dc2626', padding: '4px' }}
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                  {canRejectRow && (
                                    <button
                                      type="button"
                                      className="secondary-button"
                                      onClick={(e) => { e.stopPropagation(); setRejectingRequest(request); }}
                                      title={language === 'si' ? 'අයදුම්පත ප්‍රතික්ෂේප කරන්න' : 'Reject Application'}
                                      style={{ height: '24px', padding: '0 8px', fontSize: '9.5px', color: '#b91c1c', borderColor: '#fca5a5', background: '#fee2e2', fontWeight: 700 }}
                                    >
                                      {language === 'si' ? 'ප්‍රතික්ෂේප' : 'Reject'}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="icon-button"
                                    onClick={(e) => { e.stopPropagation(); downloadApplicationZip(request, token); }}
                                    title={language === 'si' ? `සම්පූර්ණ ZIP ගොනුව බාගන්න (FV-${String(request.id).padStart(4, '0')}.zip)` : `Download Complete ZIP Package (FV-${String(request.id).padStart(4, '0')}.zip)`}
                                    style={{ color: '#1d4ed8', padding: '4px' }}
                                  >
                                    <FolderArchive size={14} />
                                  </button>
                                  <button className="row-arrow" aria-label={t.detail} onClick={() => handleOpenRequest(request)}>
                                    <ArrowRight size={16} />
                                  </button>
                                </div>
                              );
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {overviewList.length === 0 && <div className="empty-state">{t.empty}</div>}
                </div>

                <footer className="table-footer">
                  <span>
                    Showing <strong>{overviewList.length ? 1 : 0}-{Math.min(8, overviewList.length)}</strong> of <strong>{overviewList.length}</strong> applications
                  </span>
                  <button className="secondary-button" style={{ height: '28px', padding: '0 10px', fontSize: '10px' }} onClick={() => setActiveNav('reports')}>
                    {language === 'en' ? 'View Complete Audit Report' : 'සම්පූර්ණ වාර්තාව බලන්න'}
                    <ArrowRight size={12} />
                  </button>
                </footer>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: APPROVALS / REVIEW QUEUE */}
          {/* ========================================================= */}
          {(activeNav === 'approvals' || (activeNav === 'requests' && isApplicant)) && (
            <div>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">{language === 'en' ? 'GOVERNANCE & REVIEW QUEUE' : 'අනුමත කිරීම් පෝලිම'}</div>
                  <h1>{isApplicant ? t.requests : t.reviewQueue}</h1>
                  <p>{isApplicant ? t.track : t.reviewQueueDesc}</p>
                </div>
                <div className="heading-actions">
                  <span className="role-pill">
                    <ShieldCheck size={14} />
                    {t.roleNames[user.role] || user.role}
                  </span>
                  {isApplicant && (
                    <button className="primary-button" onClick={() => setShowLeaveTypeModal(true)}>
                      <FilePlus2 size={16} />
                      {t.newRequest}
                    </button>
                  )}
                </div>
              </div>

              {/* Applicant Live Process Status Tracker */}
              {isApplicant && (
                <ApplicantLiveProcessTracker
                  request={activeApplicantRequest}
                  language={language}
                  onOpenDetail={handleOpenRequest}
                  allRequests={requests}
                  selectedRequestId={applicantTrackId}
                  onSelectRequestId={setApplicantTrackId}
                  onNewRequest={() => setShowLeaveTypeModal(true)}
                  onEditRequest={(req) => setEditingRequest(req)}
                  onDeleteRequest={(req) => setDeletingRequest(req)}
                  onRejectRequest={(req) => setRejectingRequest(req)}
                  user={user}
                  token={token}
                />
              )}

              <section className="table-section">
                <div className="table-heading">
                  <div>
                    <h2>{language === 'en' ? 'Applications Queue' : 'ඉල්ලීම් පෝලිම'}</h2>
                    <p>{language === 'en' ? 'Filter by review stage or authority' : 'අදියර හෝ බලධාරියා අනුව පෙරහන් කරන්න'}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <label className="search-box">
                      <Search size={15} />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.noteLabel}
                      />
                    </label>
                  </div>
                </div>

                {/* Stage Filter Tabs */}
                {!isApplicant && (
                  <div className="table-toolbar">
                    <div className="tabs">
                      <button
                        className={approvalStageFilter === 'all' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('all')}
                      >
                        {t.all}
                        <span>{requests.length}</span>
                      </button>
                      <button
                        className={approvalStageFilter === 'pending' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('pending')}
                      >
                        {t.allPending}
                        <span style={{ background: '#edf3ff', color: '#1552d1' }}>{pendingCount}</span>
                      </button>
                      <button
                        className={approvalStageFilter === 'Pending Department Head Approval' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('Pending Department Head Approval')}
                      >
                        {t.roleNames.department_head || 'Dept Head'}
                        <span>{deptHeadPending}</span>
                      </button>
                      <button
                        className={approvalStageFilter === 'Pending Review' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('Pending Review')}
                      >
                        {t.roleNames.reviewer}
                        <span>{reviewPending}</span>
                      </button>
                      <button
                        className={approvalStageFilter === 'secretariat' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('secretariat')}
                      >
                        {language === 'en' ? 'Secretariat' : 'ලේකම් කාර්යාලය'}
                        <span>{secretariatPending}</span>
                      </button>
                      <button
                        className={approvalStageFilter === 'Pending Secretary Approval' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('Pending Secretary Approval')}
                      >
                        {t.roleNames.secretary || 'Secretary'}
                        <span>{secretaryPending}</span>
                      </button>
                      <button
                        className={approvalStageFilter === 'Pending Presidential Approval' ? 'tab selected' : 'tab'}
                        onClick={() => setApprovalStageFilter('Pending Presidential Approval')}
                      >
                        {language === 'en' ? 'President' : 'ජනාධිපති'}
                        <span>{presidentialPending}</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className={typeFilter === 'all' ? 'tab selected' : 'tab'}
                        onClick={() => setTypeFilter('all')}
                      >
                        {language === 'en' ? 'All Types' : 'සියලු වර්ග'}
                      </button>
                      <button
                        className={typeFilter === 'official' ? 'tab selected' : 'tab'}
                        onClick={() => setTypeFilter('official')}
                      >
                        {t.official}
                      </button>
                      <button
                        className={typeFilter === 'private' ? 'tab selected' : 'tab'}
                        onClick={() => setTypeFilter('private')}
                      >
                        {t.private}
                      </button>
                    </div>
                  </div>
                )}

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>{t.id}</th>
                        <th>{t.applicant}</th>
                        <th>{t.destination}</th>
                        <th>{t.dates}</th>
                        <th>{t.type}</th>
                        <th>{t.status}</th>
                        <th style={{ textAlign: 'right' }}>{t.action}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvalsList.map((request) => (
                        <tr
                          key={request.id}
                          className={!request.is_viewed ? 'row-unviewed' : ''}
                        >
                          <td className="ref-cell" onClick={() => handleOpenRequest(request)}>
                            FV-{String(request.id).padStart(4, '0')}
                            {!request.is_viewed && (
                              <span className="unread-tag-red" title={language === 'en' ? 'Unopened / Not viewed yet' : 'නොබලන ලද'}>
                                <span className="pulse-dot-red" />
                                {language === 'en' ? 'NEW' : 'නොබලන ලද'}
                              </span>
                            )}
                          </td>
                          <td onClick={() => handleOpenRequest(request)}>
                            <div className="person-cell">
                              <span className="mini-avatar">
                                {(request.applicant_name || 'Applicant').split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('')}
                              </span>
                              <div>
                                <strong>{request.applicant_name || '—'}</strong>
                                <span style={{ display: 'block', fontSize: '9px', color: '#8898aa' }}>{request.applicant_email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="destination-cell" onClick={() => handleOpenRequest(request)}>{request.destination}</td>
                          <td onClick={() => handleOpenRequest(request)}>
                            {formatDate(request.start_date)} <span className="date-separator">→</span> {formatDate(request.end_date)}
                          </td>
                          <td onClick={() => handleOpenRequest(request)}>
                            <span className="type-tag">{request.leave_type}</span>
                          </td>
                          <td onClick={() => handleOpenRequest(request)}>
                            {(() => {
                              const sInfo = getHierarchyStatusInfo(request, language);
                              return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <span className={`status-badge ${getStatusBadgeClass(request.status)}`} style={{ alignSelf: 'flex-start' }}>
                                    <i />
                                    {t.statuses[request.status] || request.status}
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{
                                      fontSize: '9.5px',
                                      fontWeight: 700,
                                      color: sInfo.color,
                                      background: sInfo.bg,
                                      border: `1px solid ${sInfo.border}`,
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      {language === 'si' ? `පියවර ${sInfo.step}/9` : `Step ${sInfo.step}/9`}
                                    </span>
                                    <div style={{
                                      flex: 1,
                                      height: '4px',
                                      background: '#e2e8f0',
                                      borderRadius: '2px',
                                      overflow: 'hidden',
                                      minWidth: '38px',
                                      maxWidth: '60px'
                                    }}>
                                      <div style={{
                                        width: `${sInfo.percent}%`,
                                        height: '100%',
                                        background: sInfo.color,
                                        borderRadius: '2px'
                                      }} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            {(() => {
                              const userRole = user.role;
                              const isAdmin = userRole === 'admin';
                              const isOwner = user.id === request.applicant_id || userRole === 'applicant';
                              const isEditableStatus = ['Pending Department Head Approval', 'Pending Review', 'Returned', 'Rejected'].includes(request.status);
                              const canEditRow = isAdmin || (isOwner && isEditableStatus);
                              const canDeleteRow = isAdmin || (isOwner && isEditableStatus);
                              const canRejectRow = !['Approved', 'Rejected'].includes(request.status) &&
                                ['department_head', 'reviewer', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'minister', 'president', 'admin'].includes(userRole);

                              return (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                                  {canEditRow && (
                                    <button
                                      type="button"
                                      className="secondary-button"
                                      onClick={(e) => { e.stopPropagation(); setEditingRequest(request); }}
                                      title={language === 'si' ? (request.status === 'Rejected' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න' : 'අයදුම්පත සංස්කරණය කරන්න') : (request.status === 'Rejected' ? 'Fix Deficiencies & Resubmit' : 'Edit Application')}
                                      style={{
                                        height: '30px',
                                        padding: '0 8px',
                                        fontSize: '10px',
                                        color: request.status === 'Rejected' ? '#b91c1c' : '#1d4ed8',
                                        borderColor: request.status === 'Rejected' ? '#fca5a5' : '#bfdbfe',
                                        background: request.status === 'Rejected' ? '#fef2f2' : '#eff6ff',
                                        fontWeight: request.status === 'Rejected' ? 700 : 500
                                      }}
                                    >
                                      <Edit3 size={13} />
                                      <span>{language === 'si' ? (request.status === 'Rejected' ? 'අඩුපාඩු හදන්න' : 'සංස්කරණය') : (request.status === 'Rejected' ? 'Fix & Resubmit' : 'Edit')}</span>
                                    </button>
                                  )}
                                  {canDeleteRow && (
                                    <button
                                      type="button"
                                      className="secondary-button"
                                      onClick={(e) => { e.stopPropagation(); setDeletingRequest(request); }}
                                      title={language === 'si' ? 'අයදුම්පත මකා දමන්න' : 'Delete Application'}
                                      style={{ height: '30px', padding: '0 8px', fontSize: '10px', color: '#dc2626', borderColor: '#fca5a5', background: '#fef2f2' }}
                                    >
                                      <Trash2 size={13} />
                                      <span>{language === 'si' ? 'මකා දමන්න' : 'Delete'}</span>
                                    </button>
                                  )}
                                  {canRejectRow && (
                                    <button
                                      type="button"
                                      className="secondary-button"
                                      onClick={(e) => { e.stopPropagation(); setRejectingRequest(request); }}
                                      title={language === 'si' ? 'අයදුම්පත ප්‍රතික්ෂේප කරන්න' : 'Reject Application'}
                                      style={{ height: '30px', padding: '0 8px', fontSize: '10px', color: '#b91c1c', borderColor: '#fca5a5', background: '#fee2e2', fontWeight: 700 }}
                                    >
                                      <AlertCircle size={13} />
                                      <span>{language === 'si' ? 'ප්‍රතික්ෂේප' : 'Reject'}</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={(e) => { e.stopPropagation(); downloadApplicationZip(request, token); }}
                                    title={language === 'si' ? `සම්පූර්ණ ZIP ගොනුව බාගන්න (FV-${String(request.id).padStart(4, '0')}.zip)` : `Download Complete ZIP Package (FV-${String(request.id).padStart(4, '0')}.zip)`}
                                    style={{ height: '30px', padding: '0 8px', fontSize: '10px', color: '#1e40af', borderColor: '#93c5fd', background: '#eff6ff', fontWeight: 700 }}
                                  >
                                    <FolderArchive size={13} />
                                    <span>ZIP</span>
                                  </button>
                                  <button
                                    className="primary-button"
                                    style={{ height: '30px', padding: '0 12px', fontSize: '10px' }}
                                    onClick={() => handleOpenRequest(request)}
                                  >
                                    <CheckSquare size={13} />
                                    {t.reviewAndDecide}
                                  </button>
                                </div>
                              );
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {approvalsList.length === 0 && <div className="empty-state">{t.empty}</div>}
                </div>

                <footer className="table-footer">
                  <span>
                    Showing <strong>{approvalsList.length ? 1 : 0}-{approvalsList.length}</strong> of <strong>{approvalsList.length}</strong> requests
                  </span>
                </footer>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: ADD USER & USER MANAGEMENT (Admin Only) */}
          {/* ========================================================= */}
          {activeNav === 'users' && isAdmin && (
            <div>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">{language === 'en' ? 'SYSTEM GOVERNANCE' : 'පද්ධති පාලනය'}</div>
                  <h1>{language === 'en' ? 'User Management & Add User' : 'පරිශීලක කළමනාකරණය සහ එකතු කිරීම'}</h1>
                  <p>{t.addNewUserDesc}</p>
                </div>
                <div className="heading-actions">
                  <span className="role-pill">
                    <Users size={14} />
                    {users.length} {language === 'en' ? 'Total Officers' : 'නිලධාරීන්'}
                  </span>
                </div>
              </div>

              {/* Metric summary */}
              <div className="summary-grid" style={{ marginBottom: '22px' }}>
                <article className="metric">
                  <div className="metric-top">
                    <span>{t.totalUsers}</span>
                    <Users size={16} />
                  </div>
                  <strong>{users.length.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'System accounts' : 'පද්ධති ගිණුම්'}</small>
                </article>

                <article className="metric accent-yellow">
                  <div className="metric-top">
                    <span>{language === 'en' ? 'Reviewers & Authorities' : 'සමාලෝචක සහ බලධාරීන්'}</span>
                    <ShieldCheck size={16} />
                  </div>
                  <strong>{users.filter((u) => ['reviewer', 'authorized_official', 'minister', 'president'].includes(u.role)).length.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Reviewer, Official, Minister, President' : 'සමාලෝචක, නිලධාරී, අමාත්‍ය, ජනාධිපති'}</small>
                </article>

                <article className="metric accent-green">
                  <div className="metric-top">
                    <span>{language === 'en' ? 'Applicants' : 'අයදුම්කරුවන්'}</span>
                    <FileText size={16} />
                  </div>
                  <strong>{users.filter((u) => u.role === 'applicant').length.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Self-registered & added' : 'ලියාපදිංචි නිලධාරීන්'}</small>
                </article>

                <article className="metric accent-red">
                  <div className="metric-top">
                    <span>{language === 'en' ? 'Administrators' : 'පරිපාලකයින්'}</span>
                    <Stamp size={16} />
                  </div>
                  <strong>{users.filter((u) => u.role === 'admin').length.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Full portal governance' : 'පූර්ණ ප්‍රවේශය'}</small>
                </article>
              </div>

              {/* Two Column Layout: Add User Form on Left, Directory on Right */}
              <div className="users-layout">
                {/* Form Card */}
                <div className="panel-card">
                  <h3 className="panel-title">{t.addNewUserTitle}</h3>
                  <p className="panel-desc">{t.addNewUserDesc}</p>

                  <form className="user-form" onSubmit={handleAddUser}>
                    <label className="field-label">
                      {t.fullName} *
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="e.g. Priyantha Jayawardena"
                      />
                    </label>

                    <label className="field-label">
                      {t.officialEmail} *
                      <input
                        type="email"
                        required
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="e.g. officer@foring.gov.lk"
                      />
                    </label>

                    <label className="field-label">
                      {t.designatedRole} *
                      <select
                        value={newUserRole}
                        onChange={(e) => {
                          const r = e.target.value;
                          setNewUserRole(r);
                          if (r === 'president' && !newUserName) {
                            setNewUserName('අතිගරු ජනාධිපතිතුමා');
                          } else if (r === 'secretary' && !newUserName) {
                            setNewUserName('වරුෂණ ශ්‍රී ධනපාල');
                          }
                        }}
                      >
                        <option value="applicant">{t.roleNames.applicant} (Officer submitting requests)</option>
                        <option value="department_head">{t.roleNames.department_head} (Head of Dept - Est. Code XV 10:1)</option>
                        <option value="reviewer">{t.roleNames.reviewer} (Subject Officer - Note Sheet / Verification)</option>
                        <option value="assistant_secretary">{t.roleNames.assistant_secretary}</option>
                        <option value="senior_assistant_secretary">{t.roleNames.senior_assistant_secretary}</option>
                        <option value="additional_secretary">{t.roleNames.additional_secretary}</option>
                        <option value="secretary">{t.roleNames.secretary} (Submits to Hon. President)</option>
                        <option value="president">{t.roleNames.president} (Final Approval & Executive Order)</option>
                        <option value="minister">{t.roleNames.minister} (Cabinet Minister)</option>
                        <option value="authorized_official">{t.roleNames.authorized_official} (Director General / Official)</option>
                        <option value="admin">{t.roleNames.admin} (Full Administrator)</option>
                      </select>
                    </label>

                    <label className="field-label">
                      {t.temporaryPassword} *
                      <input
                        type="password"
                        required
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </label>

                    {userFormError && <div className="form-error">{userFormError}</div>}

                    <button
                      type="submit"
                      className="primary-button"
                      disabled={userFormBusy}
                      style={{ marginTop: '8px', width: '100%' }}
                    >
                      <UserPlus size={16} />
                      {userFormBusy ? '...' : t.addUserBtn}
                    </button>
                  </form>

                  <div style={{ marginTop: '20px', padding: '12px', background: '#f8fafc', borderRadius: '6px', fontSize: '10px', color: '#64748b', lineHeight: 1.5 }}>
                    <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                      {language === 'en' ? 'Governance Role Structure:' : 'පද්ධති භූමිකා ව්‍යුහය:'}
                    </strong>
                    Applicant → Reviewer → (Authorized Official / Minister / President) → Approval.
                  </div>
                </div>

                {/* Directory Card */}
                <div className="panel-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <h3 className="panel-title">{t.registeredOfficers}</h3>
                      <p className="panel-desc" style={{ margin: 0 }}>
                        {language === 'en' ? 'Active accounts and security role assignments' : 'ක්‍රියාකාරී ගිණුම් සහ භූමිකාවන්'}
                      </p>
                    </div>
                    <label className="search-box" style={{ width: '220px' }}>
                      <Search size={14} />
                      <input
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder={language === 'en' ? 'Search officer...' : 'සොයන්න...'}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                    <button
                      className={`filter-button ${userRoleFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setUserRoleFilter('all')}
                      style={{ background: userRoleFilter === 'all' ? '#edf3ff' : '#fff', color: userRoleFilter === 'all' ? '#1552d1' : '#55645c' }}
                    >
                      {t.all} ({users.length})
                    </button>
                    <button
                      className={`filter-button ${userRoleFilter === 'reviewer' ? 'active' : ''}`}
                      onClick={() => setUserRoleFilter('reviewer')}
                      style={{ background: userRoleFilter === 'reviewer' ? '#edf3ff' : '#fff', color: userRoleFilter === 'reviewer' ? '#1552d1' : '#55645c' }}
                    >
                      {t.roleNames.reviewer}
                    </button>
                    <button
                      className={`filter-button ${userRoleFilter === 'authority' ? 'active' : ''}`}
                      onClick={() => setUserRoleFilter('authority')}
                      style={{ background: userRoleFilter === 'authority' ? '#edf3ff' : '#fff', color: userRoleFilter === 'authority' ? '#1552d1' : '#55645c' }}
                    >
                      {language === 'en' ? 'Authorities' : 'බලධාරීන්'}
                    </button>
                    <button
                      className={`filter-button ${userRoleFilter === 'applicant' ? 'active' : ''}`}
                      onClick={() => setUserRoleFilter('applicant')}
                      style={{ background: userRoleFilter === 'applicant' ? '#edf3ff' : '#fff', color: userRoleFilter === 'applicant' ? '#1552d1' : '#55645c' }}
                    >
                      {language === 'en' ? 'Applicants' : 'අයදුම්කරුවන්'}
                    </button>
                  </div>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>{language === 'en' ? 'OFFICER' : 'නිලධාරියා'}</th>
                          <th>{language === 'en' ? 'EMAIL' : 'ඊමේල්'}</th>
                          <th>{language === 'en' ? 'ROLE' : 'භූමිකාව'}</th>
                          <th style={{ textAlign: 'right' }}>{t.action}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u) => (
                          <tr key={u.id}>
                            <td>
                              <div className="person-cell">
                                <span className="mini-avatar">
                                  {u.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                                </span>
                                <strong>{u.name}</strong>
                              </div>
                            </td>
                            <td>{u.email}</td>
                            <td>
                              <span className={`role-badge-pill ${u.role}`}>
                                {t.roleNames[u.role] || u.role}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {u.id !== user.id ? (
                                <button
                                  className="icon-button"
                                  title={t.deleteUser}
                                  onClick={() => handleDeleteUser(u.id)}
                                  style={{ color: '#dc2626' }}
                                >
                                  <Trash2 size={15} />
                                </button>
                              ) : (
                                <span style={{ fontSize: '9px', color: '#94a3b8' }}>
                                  ({language === 'en' ? 'Current' : 'ඔබ'})
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredUsers.length === 0 && <div className="empty-state">{t.empty}</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: ALL REPORTS (Approved, Process, Reject) */}
          {/* ========================================================= */}
          {activeNav === 'reports' && (
            <div>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">{language === 'en' ? 'AUDIT & ANALYTICS' : 'විගණන සහ විශ්ලේෂණ'}</div>
                  <h1>{t.reports}</h1>
                  <p>{t.allReportsDesc}</p>
                </div>
                <div className="heading-actions report-header-actions">
                  <button
                    className="secondary-button"
                    onClick={() => handleExportCsv(reportsList, reportFilter)}
                  >
                    <Download size={15} />
                    {language === 'en' ? 'Download CSV Report' : 'CSV වාර්තාව බාගන්න'}
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => handlePrintOfficialReport(reportsList, reportFilter)}
                  >
                    <Printer size={15} />
                    {language === 'en' ? 'Download / Print PDF Report' : 'PDF වාර්තාව / මුද්‍රණය'}
                  </button>
                </div>
              </div>

              {/* Report Summary Cards */}
              <div className="report-metrics">
                <article className="report-metric-card" style={{ borderLeft: '4px solid #155eef' }}>
                  <span>{language === 'en' ? 'Records in Report' : 'වාර්තාවේ ඇති මුළු ගණන'}</span>
                  <strong>{reportsList.length.toString().padStart(2, '0')}</strong>
                  <small>{reportFilter.toUpperCase()} {language === 'en' ? 'filter active' : 'තෝරා ඇත'}</small>
                </article>

                <article className="report-metric-card" style={{ borderLeft: '4px solid #10b981' }}>
                  <span>{t.approved}</span>
                  <strong>{approvedCount.toString().padStart(2, '0')}</strong>
                  <small>{requests.length ? Math.round((approvedCount / requests.length) * 100) : 0}% {language === 'en' ? 'of total requests' : 'මුළු ඉල්ලීම් වලින්'}</small>
                </article>

                <article className="report-metric-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                  <span>{t.inProcess}</span>
                  <strong>{pendingCount.toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Review & authority queues' : 'අදියර සමාලෝචනයේ'}</small>
                </article>

                <article className="report-metric-card" style={{ borderLeft: '4px solid #ef4444' }}>
                  <span>{language === 'en' ? 'Rejected / Returned' : 'ප්‍රතික්ෂේපිත / ආපසු යැවූ'}</span>
                  <strong>{(rejectedCount + returnedCount).toString().padStart(2, '0')}</strong>
                  <small>{language === 'en' ? 'Rejected or amendments' : 'ප්‍රතික්ෂේපිත හෝ ආපසු යැවූ'}</small>
                </article>
              </div>

              <section className="table-section">
                <div className="table-heading">
                  <div>
                    <h2>{language === 'en' ? 'Foreign Visits & Official Leave Master Report' : 'විදේශ සංචාර සහ නිල නිවාඩු ප්‍රධාන වාර්තාව'}</h2>
                    <p>{language === 'en' ? 'Includes Appendix 16 clearance and General 126 leave records' : 'උපග්‍රන්ථ 16 සහ සාමාන්‍ය 126 නිවාඩු වාර්තා ඇතුළත් වේ'}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <label className="search-box">
                      <Search size={15} />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.noteLabel}
                      />
                    </label>
                  </div>
                </div>

                {/* Primary Report Tabs: All, Approved, Process, Reject */}
                <div className="table-toolbar">
                  <div className="tabs">
                    <button
                      className={reportFilter === 'all' ? 'tab selected' : 'tab'}
                      onClick={() => setReportFilter('all')}
                    >
                      {t.all}
                      <span>{requests.length}</span>
                    </button>

                    <button
                      className={reportFilter === 'approved' ? 'tab selected' : 'tab'}
                      onClick={() => setReportFilter('approved')}
                    >
                      <Check size={13} style={{ color: '#10b981' }} />
                      {t.approved}
                      <span style={{ background: '#ecfdf5', color: '#047857' }}>{approvedCount}</span>
                    </button>

                    <button
                      className={reportFilter === 'process' ? 'tab selected' : 'tab'}
                      onClick={() => setReportFilter('process')}
                    >
                      <Clock size={13} style={{ color: '#3b82f6' }} />
                      {t.inProcess}
                      <span style={{ background: '#eff6ff', color: '#1d4ed8' }}>{pendingCount}</span>
                    </button>

                    <button
                      className={reportFilter === 'reject' ? 'tab selected' : 'tab'}
                      onClick={() => setReportFilter('reject')}
                    >
                      <X size={13} style={{ color: '#ef4444' }} />
                      {language === 'en' ? 'Rejected & Returned' : 'ප්‍රතික්ෂේපිත සහ ආපසු'}
                      <span style={{ background: '#fef2f2', color: '#b91c1c' }}>{rejectedCount + returnedCount}</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className={typeFilter === 'all' ? 'tab selected' : 'tab'}
                      onClick={() => setTypeFilter('all')}
                    >
                      {language === 'en' ? 'All Types' : 'සියලු වර්ග'}
                    </button>
                    <button
                      className={typeFilter === 'official' ? 'tab selected' : 'tab'}
                      onClick={() => setTypeFilter('official')}
                    >
                      {t.official}
                    </button>
                    <button
                      className={typeFilter === 'private' ? 'tab selected' : 'tab'}
                      onClick={() => setTypeFilter('private')}
                    >
                      {t.private}
                    </button>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>{t.id}</th>
                        <th>{t.applicant}</th>
                        <th>{t.destination}</th>
                        <th>{language === 'en' ? 'PURPOSE' : 'අරමුණ'}</th>
                        <th>{t.dates}</th>
                        <th>{t.type}</th>
                        <th>{t.status}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportsList.map((request) => (
                        <tr
                          key={request.id}
                          className={!request.is_viewed ? 'row-unviewed' : ''}
                          onClick={() => handleOpenRequest(request)}
                        >
                          <td className="ref-cell">
                            FV-{String(request.id).padStart(4, '0')}
                            {!request.is_viewed && (
                              <span className="unread-tag-red" title={language === 'en' ? 'Unopened / Not viewed yet' : 'නොබලන ලද'}>
                                <span className="pulse-dot-red" />
                                {language === 'en' ? 'NEW' : 'නොබලන ලද'}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="person-cell">
                              <span className="mini-avatar">
                                {(request.applicant_name || 'Applicant').split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('')}
                              </span>
                              <div>
                                <strong>{request.applicant_name || '—'}</strong>
                                <span style={{ display: 'block', fontSize: '9px', color: '#8898aa' }}>{request.applicant_email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="destination-cell">{request.destination}</td>
                          <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {request.purpose}
                          </td>
                          <td>
                            {formatDate(request.start_date)} <span className="date-separator">→</span> {formatDate(request.end_date)}
                          </td>
                          <td>
                            <span className="type-tag">{request.leave_type}</span>
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusBadgeClass(request.status)}`}>
                              <i />
                              {t.statuses[request.status] || request.status}
                            </span>
                          </td>
                          <td>
                            <button className="row-arrow" aria-label={t.detail}>
                              <ArrowRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {reportsList.length === 0 && <div className="empty-state">{t.empty}</div>}
                </div>

                <footer className="table-footer">
                  <span>
                    Showing <strong>{reportsList.length ? 1 : 0}-{reportsList.length}</strong> of <strong>{reportsList.length}</strong> records in this report
                  </span>
                  <div>
                    <button onClick={() => handleExportCsv(reportsList, reportFilter)} title={t.exportCsv}>
                      <Download size={13} />
                    </button>
                  </div>
                </footer>
              </section>
            </div>
          )}

          <footer className="page-footer">
            <span>DEPARTMENT OF PUBLIC ADMINISTRATION · DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA</span>
            <span>SECURE GOVERNMENT DIGITAL SERVICE <i /></span>
          </footer>
        </section>
      </main>

      {/* MODALS */}
      {/* 1. BILINGUAL LEAVE TYPE QUESTION MODAL */}
      {showLeaveTypeModal && (
        <LeaveTypeQuestionModal
          language={language}
          t={t}
          onClose={() => setShowLeaveTypeModal(false)}
          onSelect={(type) => {
            setSelectedLeaveType(type);
            setShowLeaveTypeModal(false);
            setShowNew(true);
          }}
        />
      )}

      {/* 2. LEAVE APPLICATION MODAL */}
      {showNew && (
        <DetailedRequestModal
          t={t}
          language={language}
          user={user}
          token={token}
          initialLeaveType={selectedLeaveType}
          onClose={() => setShowNew(false)}
          onSubmitted={() => {
            setShowNew(false);
            loadRequests();
            setApplicantTrackId(null);
            setToast(language === 'si'
              ? 'අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී! වත්මන් තත්ත්වය: පියවර 2/9 (ආයතන ප්‍රධානී අනුමැතිය අපේක්ෂාවෙන්)'
              : 'Application submitted successfully! Current Status: Step 2 of 9 (Pending Department Head Approval)');
          }}
        />
      )}

      {selected && (
        <DetailModal
          request={selected}
          user={user}
          t={t}
          language={language}
          token={token}
          onClose={() => setSelected(null)}
          onPrintApplication={handlePrintApplicationPdf}
          onPrintOfficerAssessment={printSubjectOfficerPdf}
          onChanged={() => {
            setSelected(null);
            loadRequests();
            setToast(t.decisionSaved);
          }}
          onEdit={(req) => {
            setSelected(null);
            setEditingRequest(req);
          }}
          onDelete={(req) => {
            setDeletingRequest(req);
          }}
          onReject={(req) => {
            setRejectingRequest(req);
          }}
        />
      )}

      {/* 3. EDIT APPLICATION MODAL */}
      {editingRequest && (
        <DetailedRequestModal
          t={t}
          language={language}
          user={user}
          token={token}
          editingRequest={editingRequest}
          onClose={() => setEditingRequest(null)}
          onSubmitted={() => {
            setEditingRequest(null);
            loadRequests();
            setToast(language === 'si'
              ? 'අයදුම්පත සාර්ථකව සංස්කරණය කරන ලදී (Application updated successfully)!'
              : 'Application updated successfully!');
          }}
        />
      )}

      {/* 4. DELETE CONFIRMATION MODAL */}
      {deletingRequest && (
        <DeleteConfirmModal
          request={deletingRequest}
          language={language}
          token={token}
          onClose={() => setDeletingRequest(null)}
          onDeleted={(req) => {
            setDeletingRequest(null);
            if (selected?.id === req.id) setSelected(null);
            if (applicantTrackId === req.id) setApplicantTrackId(null);
            loadRequests();
            setToast(language === 'si'
              ? 'අයදුම්පත සාර්ථකව මකා දමන ලදී (Application deleted)!'
              : 'Application deleted successfully!');
          }}
        />
      )}

      {/* 5. REJECT APPLICATION MODAL */}
      {rejectingRequest && (
        <RejectRequestModal
          request={rejectingRequest}
          language={language}
          user={user}
          token={token}
          onClose={() => setRejectingRequest(null)}
          onRejected={(req) => {
            setRejectingRequest(null);
            if (selected?.id === req.id) setSelected(null);
            loadRequests();
            setToast(language === 'si'
              ? 'අයදුම්පත ප්‍රතික්ෂේප කරන ලදී (Application rejected)!'
              : 'Application rejected successfully!');
          }}
        />
      )}

      {/* Floating Incoming Notice Alert */}
      {incomingNotice && (
        <div className="incoming-notice-toast" role="alert">
          <span className="pulse-dot-red" style={{ flexShrink: 0 }} />
          <div className="incoming-notice-content">
            <strong>{incomingNotice.title}</strong>
            <p>{incomingNotice.message}</p>
          </div>
          <button
            type="button"
            className="incoming-notice-btn"
            onClick={() => {
              const reqId = incomingNotice.requestId || incomingNotice.request_id;
              const req = requests.find((r) => r.id === reqId);
              if (req) {
                handleOpenRequest(req);
              }
              setIncomingNotice(null);
            }}
          >
            {language === 'si' ? 'විවෘත කරන්න' : 'Open'}
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={() => setIncomingNotice(null)}
            style={{ color: '#94a3b8', padding: '4px' }}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}

// =========================================================================
// AUTH PAGE: Sign In (no role selection) & Applicant Registration
// =========================================================================
function AuthPage({ language, setLanguage, t, onLogin }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'register'

  // Sign In state
  const [email, setEmail] = useState('officer@foring.gov.lk');
  const [password, setPassword] = useState('Demo@123');

  // Registration state (Applicant only)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      onLogin(data);
    } catch (reason) {
      setError(t.errors[reason.message] || reason.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setError(t.passMismatch);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to register account.');
      onLogin(data);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-layout">
      {/* Left Artwork */}
      <div className="login-art">
        <div className="art-nav">
          <div className="mini-crest">ශ්‍රී</div>
          <span>{t.brand}</span>
          <button className="lang-button light" onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}>
            <Globe2 size={15} />
            {t.language}
          </button>
        </div>
        <div className="art-content">
          <span className="art-overline">DEPARTMENT OF PUBLIC ADMINISTRATION</span>
          <h1>Service beyond<br /><em>borders.</em></h1>
          <p>{t.subtitle}</p>
          <div className="art-rule" />
          <div className="art-stamp">
            <ShieldCheck size={15} /> SRI LANKA · PUBLIC SERVICE
          </div>
        </div>
        <div className="art-bottom">
          <span>COLOMBO · EST. 1948</span>
          <span>01 / 06</span>
        </div>
        <div className="art-lines" />
      </div>

      {/* Right Login / Register Panel */}
      <div className="login-panel">
        <div className="login-card" style={{ width: 'min(400px, 100%)' }}>
          <div className="login-emblem">
            <div className="crest large"><span>ශ්‍රී</span></div>
            <span>OFFICIAL PORTAL</span>
          </div>

          {/* Toggle between Sign In and Applicant Registration */}
          <div className="auth-toggle">
            <button
              type="button"
              className={authMode === 'signin' ? 'active' : ''}
              onClick={() => { setAuthMode('signin'); setError(''); }}
            >
              {t.signInTab}
            </button>
            <button
              type="button"
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => { setAuthMode('register'); setError(''); }}
            >
              <UserPlus size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              {t.registerTab}
            </button>
          </div>

          {/* 1. SIGN IN FORM (No role dropdown!) */}
          {authMode === 'signin' && (
            <div>
              <h2>{t.chooseRole}</h2>
              <p className="login-description">{t.signSubtitle}</p>

              <form onSubmit={handleLogin}>
                <label className="field-label">
                  {t.email}
                  <input
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="e.g. officer@foring.gov.lk"
                    required
                  />
                </label>
                <label className="field-label">
                  {t.password}
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </label>

                {error && <div className="form-error">{error}</div>}

                <button className="login-submit" disabled={busy}>
                  {busy ? '…' : t.signIn}
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Sample accounts quick-fill buttons */}
              <div className="demo-box" style={{ display: 'block', marginTop: '16px' }}>
                <div className="demo-heading" style={{ marginBottom: '6px' }}>
                  <ShieldCheck size={14} />
                  {t.sample}
                </div>
                <p style={{ margin: '0 0 8px', fontSize: '9px', color: '#64748b' }}>
                  {t.demoHint}
                </p>
                <div className="auth-sample-grid">
                  {sampleUsers.map((su) => (
                    <div
                      key={su.role}
                      className="sample-user-chip"
                      onClick={() => {
                        setEmail(su.email);
                        setPassword(su.pass);
                        setError('');
                      }}
                    >
                      <strong>{language === 'en' ? su.label : su.labelSi}</strong>
                      <span>{su.email}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#155eef', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => { setAuthMode('register'); setError(''); }}
                >
                  {t.needAccount} →
                </button>
              </div>
            </div>
          )}

          {/* 2. APPLICANT REGISTRATION FORM */}
          {authMode === 'register' && (
            <div>
              <h2>{t.registerTab}</h2>
              <p className="login-description">{language === 'en' ? 'Create your official account to submit foreign leave applications.' : 'විදේශ සංචාර සහ නිල නිවාඩු ඉල්ලීම් ඉදිරිපත් කිරීමට නව ගිණුමක් සාදන්න.'}</p>

              <div style={{ padding: '9px 11px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', fontSize: '10px', color: '#1e40af', lineHeight: 1.5, marginBottom: '14px' }}>
                <ShieldCheck size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }} />
                {t.regNotice}
              </div>

              <form onSubmit={handleRegister}>
                <label className="field-label">
                  {t.fullName} *
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Priyantha Jayawardena"
                  />
                </label>

                <label className="field-label">
                  {t.email} *
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. officer@foring.gov.lk"
                  />
                </label>

                <label className="field-label">
                  {t.password} *
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a strong password"
                  />
                </label>

                <label className="field-label">
                  {t.confirmPassword} *
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                  />
                </label>

                {error && <div className="form-error">{error}</div>}

                <button className="login-submit" disabled={busy}>
                  {busy ? '…' : (language === 'en' ? 'Register as Applicant' : 'අයදුම්කරු ලෙස ලියාපදිංචි වන්න')}
                  <Check size={16} />
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#155eef', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => { setAuthMode('signin'); setError(''); }}
                >
                  ← {t.alreadyHaveAccount}
                </button>
              </div>
            </div>
          )}

          <div className="login-foot">SRI LANKA · SECURE PUBLIC SERVICE ACCESS</div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// DETAIL MODAL: Reviewer Verification & Executive Authority Clearance
function DetailModal({
  request,
  user,
  t,
  language,
  token,
  onClose,
  onChanged,
  onPrintApplication,
  onPrintOfficerAssessment,
  onEdit,
  onDelete,
  onReject
}) {
  const d = request.details || (request.applicant_name ? request : {});
  const clearances = Array.isArray(d.secretariatClearances) ? d.secretariatClearances : [];
  const hasOfficeUsePart = Boolean(d.officerCompleted || d.officerAssessment?.total || d.officerSignature);
  const hasDeptHeadPart = Boolean(d.departmentHeadEndorsement && (d.departmentHeadEndorsement.signature || d.departmentHeadEndorsement.myNo));
  const hasSecretaryPart = Boolean(
    d.secretaryApproval?.signature ||
    d.secretaryApproval?.signatoryName ||
    d.secretaryApproval?.letterNumber ||
    d.secretaryApproval?.signedAt ||
    clearances.some(c => (c.role === 'secretary' || c.role === 'authorized_official') && (c.signature || c.decision)) ||
    (request.status === 'Approved' || request.status === 'Pending Presidential Approval')
  );
  const hasClearanceSheetPart = Boolean(clearances.length > 0 && clearances.some(c => c.signature || c.decision));

  const userRole = user?.role || 'applicant';
  const isAdmin = userRole === 'admin';
  const isOwner = user?.id === request.applicant_id || userRole === 'applicant';
  const isEditableStatus = ['Pending Department Head Approval', 'Pending Review', 'Returned', 'Rejected'].includes(request.status);
  const canEdit = isAdmin || (isOwner && isEditableStatus);
  const canDelete = isAdmin || (isOwner && isEditableStatus);
  const canReject = !['Approved', 'Rejected'].includes(request.status) &&
    ['department_head', 'reviewer', 'assistant_secretary', 'senior_assistant_secretary', 'additional_secretary', 'secretary', 'authorized_official', 'minister', 'president', 'admin'].includes(userRole);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="detail-modal" style={{ width: 'min(880px, 100%)', maxHeight: '92vh', overflowY: 'auto' }}>
        <header className="modal-header">
          <div>
            <div className="eyebrow">FV-{String(request.id).padStart(4, '0')} · {t.request}</div>
            <h2>{request.destination}</h2>
            <p>{request.applicant_name} · {request.applicant_email}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Direct Download ZIP Archive (FV-XXXX.zip) */}
            <button
              type="button"
              className="primary-button"
              onClick={() => downloadApplicationZip(request, token)}
              title={language === 'si' ? `සම්පූර්ණ ලේඛන 7ම අඩංගු ZIP ගොනුව බාගන්න (FV-${String(request.id).padStart(4, '0')}.zip)` : `Download Complete 7-Document ZIP Package (FV-${String(request.id).padStart(4, '0')}.zip)`}
              style={{
                height: '32px',
                padding: '0 12px',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#1e3a8a',
                borderColor: '#172554',
                color: '#ffffff',
                fontWeight: 700,
                boxShadow: '0 2px 5px rgba(30, 58, 138, 0.25)'
              }}
            >
              <FolderArchive size={14} />
              <span>{language === 'si' ? `ZIP බාගන්න (FV-${String(request.id).padStart(4, '0')}.zip)` : `Download ZIP (FV-${String(request.id).padStart(4, '0')}.zip)`}</span>
            </button>

            {onPrintApplication && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => onPrintApplication(request)}
                title={language === 'si' ? 'සම්පූර්ණ අයදුම්පත PDF ලෙස බාගන්න / මුද්‍රණය කරන්න' : 'Download / Print Full Application PDF'}
                style={{ height: '32px', padding: '0 12px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <FileDown size={14} />
                <span>{language === 'si' ? 'සම්පූර්ණ PDF' : 'Full PDF'}</span>
              </button>
            )}
            <button
              type="button"
              className="secondary-button"
              onClick={() => printGeneral126Pdf(request)}
              title={language === 'si' ? 'General 126 (පුද්ගලික පිටුව) වෙනම PDF ලෙස බාගන්න' : 'Download General 126 Personal Page as Separate PDF'}
              style={{
                height: '32px',
                padding: '0 12px',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: '#60a5fa',
                background: '#eff6ff',
                color: '#1e40af',
                fontWeight: 600
              }}
            >
              <FileDown size={14} />
              <span>{language === 'si' ? 'General 126 PDF' : 'General 126 PDF'}</span>
            </button>
            {hasOfficeUsePart && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => onPrintOfficerAssessment ? onPrintOfficerAssessment(request) : printOfficeUseOnlyPdf(request)}
                title={language === 'si' ? 'For Office Use Only (Particulars of Available Leave) පිටුව වෙනම PDF ලෙස බාගන්න' : 'Download For Office Use Only (Particulars of Available Leave) as Separate PDF'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#93c5fd',
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  fontWeight: 600
                }}
              >
                <FileDown size={14} />
                <span>{language === 'si' ? 'Office Use (නිවාඩු විස්තර) PDF' : 'For Office Use Only PDF'}</span>
              </button>
            )}
            {hasDeptHeadPart && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => printDepartmentHeadLetterPdf(request)}
                title={language === 'si' ? 'දෙපාර්තමේන්තු ප්‍රධානියා පුරවනු ලබන ලිපිය වෙනම PDF ලෙස බාගන්න' : 'Download Head of Department Forwarding Letter as Separate PDF'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#c084fc',
                  background: '#faf5ff',
                  color: '#7e22ce',
                  fontWeight: 600
                }}
              >
                <FileDown size={14} />
                <span>{language === 'si' ? 'ආයතන ප්‍රධානී ලිපිය PDF' : 'Dept Head Letter PDF'}</span>
              </button>
            )}
            {hasSecretaryPart && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => printSecretaryApprovalLetterPdf(request)}
                title={language === 'si' ? 'අමාත්‍යාංශ ලේකම්ගේ නිවාඩු අනුමත ලිපිය (Leave is approved/not approved) PDF ලෙස බාගන්න' : 'Download Ministry Secretary Approval Letter (Leave is approved/not approved) as Separate PDF'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#86efac',
                  background: '#f0fdf4',
                  color: '#15803d',
                  fontWeight: 600
                }}
              >
                <FileDown size={14} />
                <span>{language === 'si' ? 'ලේකම්ගේ ලිපිය PDF' : 'Secretary Letter PDF'}</span>
              </button>
            )}
            {hasClearanceSheetPart && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => printNoteSheetMinisterialPdf(request)}
                title={language === 'si' ? 'අවසර පත්‍රිකාව සහ අමාත්‍ය ඉදිරිපත් කිරීම වෙනම PDF ලෙස බාගන්න' : 'Download Clearance Sheet & Ministerial Submission PDF'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#38bdf8',
                  background: '#f0f9ff',
                  color: '#0369a1',
                  fontWeight: 600
                }}
              >
                <FileDown size={14} />
                <span>{language === 'si' ? 'අවසර පත්‍රිකාව PDF' : 'Clearance Sheet PDF'}</span>
              </button>
            )}
            {/* Edit / Resubmit Button */}
            {canEdit && onEdit && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => onEdit(request)}
                title={language === 'si' ? (request.status === 'Rejected' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න' : 'අයදුම්පත සංස්කරණය කරන්න') : (request.status === 'Rejected' ? 'Fix Deficiencies & Resubmit' : 'Edit Application')}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: request.status === 'Rejected' ? '#f87171' : '#93c5fd',
                  background: request.status === 'Rejected' ? '#fef2f2' : '#eff6ff',
                  color: request.status === 'Rejected' ? '#b91c1c' : '#1d4ed8',
                  fontWeight: 700
                }}
              >
                <Edit3 size={13} />
                <span>{language === 'si' ? (request.status === 'Rejected' ? 'අඩුපාඩු සකසා නැවත ඉදිරිපත් කරන්න (Resubmit)' : 'සංස්කරණය (Edit)') : (request.status === 'Rejected' ? 'Fix & Resubmit' : 'Edit')}</span>
              </button>
            )}

            {/* Delete Button */}
            {canDelete && onDelete && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => onDelete(request)}
                title={language === 'si' ? 'අයදුම්පත මකා දමන්න' : 'Delete Application'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#fca5a5',
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontWeight: 600
                }}
              >
                <Trash2 size={13} />
                <span>{language === 'si' ? 'මකා දමන්න (Delete)' : 'Delete'}</span>
              </button>
            )}

            {/* Reject Button */}
            {canReject && onReject && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => onReject(request)}
                title={language === 'si' ? 'අයදුම්පත ප්‍රතික්ෂේප කරන්න' : 'Reject Application'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
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

            <button className="icon-button" onClick={onClose} aria-label={t.close}>
              <X size={19} />
            </button>
          </div>
        </header>

        <div className="detail-body">
          {/* Top Live Process Status Banner */}
          {(() => {
            const sInfo = getHierarchyStatusInfo(request, language);
            return (
              <div style={{
                background: sInfo.bg,
                border: `1.5px solid ${sInfo.border}`,
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: sInfo.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {sInfo.isApproved ? '✓' : sInfo.isRejected ? '✕' : `${sInfo.step}/9`}
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.5px', color: sInfo.color, fontWeight: 800 }}>
                      {language === 'si' ? 'අයදුම්පත් ක්‍රියාවලි තත්ත්වය (Application Process Status)' : 'Application Process Status'}
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginTop: '1px' }}>
                      {sInfo.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
                      {sInfo.desk}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: sInfo.color,
                    background: '#ffffff',
                    border: `1px solid ${sInfo.border}`,
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}>
                    {sInfo.percent}% {language === 'si' ? 'සම්පූර්ණයි' : 'Completed'}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* 7-Document Application Package ZIP Card */}
          <ApplicationZipPackageCard
            request={request}
            token={token}
            language={language}
          />

          <div className="detail-facts">
            <div>
              <span>{t.dates}</span>
              <strong>{formatDate(request.start_date)} – {formatDate(request.end_date)}</strong>
            </div>
            <div>
              <span>{t.type}</span>
              <strong>{request.leave_type}</strong>
            </div>
            <div className="fact-wide">
              <span>{t.purpose}</span>
              <strong>{request.purpose}</strong>
            </div>
          </div>

          {/* Form 126 & Form 16 Applicant Particulars */}
          <RequestDetails
            details={request.details}
            language={language}
            request={request}
            onPrintOfficerAssessment={onPrintOfficerAssessment || printSubjectOfficerPdf}
          />

          <div className="detail-status">
            <span className={`status-badge ${getStatusBadgeClass(request.status)}`}>
              <i />
              {t.statuses[request.status] || request.status}
            </span>
            <span>{request.created_at?.slice(0, 10)}</span>
          </div>

          {request.signature && (
            <div className="saved-signature" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span>{t.signature}</span>
                <img src={request.signature} alt={t.signature} />
              </div>
              <button
                type="button"
                className="secondary-button"
                onClick={() => printGeneral126Pdf(request)}
                title={language === 'si' ? 'General 126 පුද්ගලික අයදුම්පත PDF ලෙස බාගන්න' : 'Download General 126 Personal Leave PDF'}
                style={{
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: '#93c5fd',
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  fontWeight: 600
                }}
              >
                <FileDown size={13} />
                <span>{language === 'si' ? '📄 General 126 පිටුව PDF බාගන්න' : '📄 Download General 126 PDF'}</span>
              </button>
            </div>
          )}

          {/* 1. Department Head Institutional Endorsement (General 126 Step 3 / Est. Code XV 10:1) */}
          <DepartmentHeadEndorsementSection
            request={request}
            user={user}
            language={language}
            token={token}
            onSaved={onChanged}
          />

          {/* 2. Subject Officer Leave Classification & Note Sheet */}
          <OfficerAssessmentSection
            request={request}
            user={user}
            language={language}
            token={token}
            onSaved={onChanged}
            onPrintOfficerAssessment={onPrintOfficerAssessment || printSubjectOfficerPdf}
          />

          {/* 3. Ministry Secretariat Sequential Hierarchy Clearance & Secretary Final Approval */}
          <SecretariatMinuteTrailSection
            request={request}
            user={user}
            language={language}
            token={token}
            onSaved={onChanged}
            onPrintOfficerAssessment={onPrintOfficerAssessment || printSubjectOfficerPdf}
          />

          {/* 4. Presidential Final Decision & Order */}
          <PresidentialOrderSection
            request={request}
            user={user}
            language={language}
            token={token}
            onSaved={onChanged}
          />

          {/* Timeline */}
          <div className="timeline" style={{ marginTop: '20px' }}>
            <h3>{t.timeline}</h3>
            <div className="timeline-row">
              <span className="timeline-dot done"><Check size={12} /></span>
              <div>
                <strong>{t.submitted}</strong>
                <small>{request.applicant_name} · {formatDate(request.created_at?.slice(0, 10))}</small>
              </div>
            </div>
            {request.approvals?.map((approval) => (
              <div className="timeline-row" key={approval.id}>
                <span className={`timeline-dot ${approval.decision.includes('forward') || approval.decision === 'approve' ? 'done' : 'returned-dot'}`}>
                  {approval.decision === 'approve' ? <Check size={12} /> : approval.decision.includes('forward') ? <Send size={11} /> : <X size={12} />}
                </span>
                <div>
                  <strong>
                    {approval.approver_name} ({t.roleNames[approval.approver_role] || approval.approver_role}) · {approval.decision.toUpperCase().replace('_', ' ')}
                  </strong>
                  <small>{approval.note || approval.created_at?.slice(0, 10)}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LeaveTypeQuestionModal({ language, t, onClose, onSelect }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="question-modal">
        <header className="question-modal-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="question-badge">
              <CircleHelp size={13} />
              LEAVE CATEGORY SELECTION · නිවාඩු වර්ගය තෝරාගැනීම
            </span>
            <button className="icon-button" onClick={onClose} aria-label={t.close}>
              <X size={19} />
            </button>
          </div>

          <h2>ඔබ මෙම නිවාඩුව ලබා ගන්නේ කුමන වර්ගයේ නිවාඩුවක් සඳහාද?</h2>
          <div className="question-sub">What type of leave are you applying for?</div>
          <p>
            කරුණාකර අදාළ විදේශ නිවාඩු කාණ්ඩය තෝරන්න. ඒ අනුව අවශ්‍ය අනුමැති පෝරම සහ විස්තර සකස් කෙරේ. /
            Please select whether your travel is for official state duty or private personal leave.
          </p>
        </header>

        <div className="question-modal-body">
          <div className="leave-type-cards">
            {/* OPTION 1: OFFICIAL */}
            <div
              className="leave-type-card official"
              onClick={() => onSelect('official')}
            >
              <div>
                <div className="card-icon-wrap">
                  <Landmark size={26} />
                </div>
                <div className="card-number-tag">OPTION 1 · විකල්පය 1</div>
                <div className="card-main-title">1. Official Duty</div>
                <div className="card-si-title">නිල රාජකාරි සංචාරය</div>
                <div className="card-desc-en">
                  Official state business, international conferences, bilateral meetings, workshops, or government-sponsored foreign training.
                </div>
                <div className="card-desc-si">
                  රාජ්‍ය නිල රාජකාරි, අන්තර්ජාතික සමුළු, ද්විපාර්ශ්වික සාකච්ඡා, වැඩමුළු හෝ නිල පුහුණු වැඩසටහන්.
                </div>
              </div>

              <div className="card-action-arrow">
                <span>Select Official Duty (නිල රාජකාරි)</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* OPTION 2: PERSONAL */}
            <div
              className="leave-type-card personal"
              onClick={() => onSelect('personal')}
            >
              <div>
                <div className="card-icon-wrap">
                  <Plane size={26} />
                </div>
                <div className="card-number-tag">OPTION 2 · විකල්පය 2</div>
                <div className="card-main-title">2. Personal Leave</div>
                <div className="card-si-title">පෞද්ගලික විදේශ නිවාඩු</div>
                <div className="card-desc-en">
                  Annual vacation, private travel abroad, family visits, pilgrimage, or private study / personal affairs.
                </div>
                <div className="card-desc-si">
                  වාර්ෂික විවේක නිවාඩු, පෞද්ගලික විදේශ සංචාර, පවුලේ අවශ්‍යතා හෝ පෞද්ගලික අධ්‍යයන කටයුතු.
                </div>
              </div>

              <div className="card-action-arrow">
                <span>Select Personal Leave (පෞද්ගලික)</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              style={{ height: '32px', fontSize: '11px', padding: '0 16px' }}
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status) {
  if (status === 'Approved') return 'approved';
  if (status === 'Rejected') return 'rejected';
  if (status === 'Returned') return 'returned';
  return 'pending';
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Portal uncaught runtime error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
          padding: '24px',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fee2e2',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <AlertCircle size={28} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
              යෙදුමේ දෝෂයක් සිදු විය (Application Error)
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              {this.state.error?.message || 'An unexpected error occurred while rendering the page.'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: '#1d4ed8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              නැවත පූරණය කරන්න (Reload Page)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);