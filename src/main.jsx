import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownToLine, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, FilePlus2, FileText, Globe2, LogOut, Menu, Search, ShieldCheck, SlidersHorizontal, Stamp, X } from 'lucide-react';
import SignaturePad from './signature-pad.jsx';
import DetailedRequestModal, { RequestDetails } from './request-modal.jsx';
import './styles.css';
import './official-theme.css';

const copy = {
  en: {
    brand: 'GOVERNMENT OF SRI LANKA', title: 'Foreign visits & official leave', subtitle: 'Public service travel authorization portal', overview: 'Overview', requests: 'My requests', approvals: 'Approvals', reports: 'Reports', settings: 'Settings', newRequest: 'New request', search: 'Search requests', allRequests: 'Travel & leave requests', track: 'Track, review and authorize official travel in one place.', total: 'Total requests', pending: 'Awaiting action', approved: 'Approved this year', returned: 'Returned', id: 'REFERENCE', applicant: 'APPLICANT', destination: 'DESTINATION', dates: 'TRAVEL DATES', type: 'REQUEST TYPE', status: 'STATUS', action: 'ACTION', all: 'All requests', official: 'Official duty', private: 'Private leave', submitted: 'Submitted', newTitle: 'New travel / leave request', required: 'Fields marked * are required.', destinationLabel: 'Destination country / city', purposeLabel: 'Purpose of visit', startDate: 'Departure date', endDate: 'Return date', leaveType: 'Request type', signature: 'Applicant signature', signatureHint: 'Sign in the area below using your mouse or finger.', clear: 'Clear signature', submit: 'Submit for approval', cancel: 'Cancel', chooseRole: 'Sign in to the portal', signSubtitle: 'Secure access for Sri Lankan public officers', email: 'Official email', password: 'Password', role: 'Sign in as', signIn: 'Sign in', sample: 'Demo access', demoHint: 'Use the sample accounts listed below. Select the matching role before signing in.', detail: 'Request details', purpose: 'Purpose', timeline: 'Approval trail', approve: 'Approve', return: 'Return for changes', note: 'Decision note (optional)', close: 'Close', welcome: 'Good morning', language: 'සිංහල', destinationPlaceholder: 'e.g. Tokyo, Japan', purposePlaceholder: 'Describe the official purpose', empty: 'No requests match this view.', signOut: 'Sign out', roleNames: { admin: 'Administrator', applicant: 'Applicant', supervisor: 'Supervisor', hr: 'HR Officer', finance: 'Finance Officer', director: 'Director' }, statuses: { 'Pending Supervisor': 'Supervisor review', 'Pending HR': 'HR review', 'Pending Finance': 'Finance review', 'Pending Director': 'Director review', Approved: 'Approved', Returned: 'Returned' }, errors: { 'Email, password, or selected role is incorrect.': 'Email, password, or selected role is incorrect.' }, request: 'Request', adminNotice: 'Administrative access', noteLabel: 'Search by applicant or destination', profile: 'Your workspace', today: 'TUESDAY, 06 OCTOBER 2026', years: 'All years', filter: 'Filters', signed: 'Signature captured', requestCreated: 'Request submitted for review.', decisionSaved: 'Decision recorded.'
  },
  si: {
    brand: 'ශ්‍රී ලංකා රජය', title: 'විදේශ සංචාර සහ නිල නිවාඩු', subtitle: 'රාජ්‍ය සේවා සංචාර අනුමත කිරීමේ ද්වාරය', overview: 'සාරාංශය', requests: 'මගේ ඉල්ලීම්', approvals: 'අනුමත කිරීම්', reports: 'වාර්තා', settings: 'සැකසුම්', newRequest: 'නව ඉල්ලීමක්', search: 'ඉල්ලීම් සොයන්න', allRequests: 'සංචාර සහ නිවාඩු ඉල්ලීම්', track: 'නිල සංචාර එකම ස්ථානයකින් සමාලෝචනය කර අනුමත කරන්න.', total: 'මුළු ඉල්ලීම්', pending: 'ක්‍රියාමාර්ග බලාපොරොත්තුවෙන්', approved: 'මෙම වසරේ අනුමතයි', returned: 'ආපසු යැවූ', id: 'යොමු අංකය', applicant: 'අයදුම්කරු', destination: 'ගමනාන්තය', dates: 'ගමන් දිනයන්', type: 'ඉල්ලීම් වර්ගය', status: 'තත්ත්වය', action: 'ක්‍රියාමාර්ග', all: 'සියලු ඉල්ලීම්', official: 'නිල රාජකාරි', private: 'පෞද්ගලික නිවාඩු', submitted: 'ඉදිරිපත් කළ', newTitle: 'නව සංචාර / නිවාඩු ඉල්ලීම', required: '* ලකුණු කළ සියලු තොරතුරු අවශ්‍යයි.', destinationLabel: 'ගමනාන්ත රට / නගරය', purposeLabel: 'සංචාරයේ අරමුණ', startDate: 'පිටත්වන දිනය', endDate: 'ආපසු පැමිණෙන දිනය', leaveType: 'ඉල්ලීම් වර්ගය', signature: 'අයදුම්කරුගේ අත්සන', signatureHint: 'මූසිකය හෝ ඇඟිල්ල භාවිතයෙන් පහත ප්‍රදේශයේ අත්සන් කරන්න.', clear: 'අත්සන මකන්න', submit: 'අනුමැතියට ඉදිරිපත් කරන්න', cancel: 'අවලංගු කරන්න', chooseRole: 'ද්වාරයට පිවිසෙන්න', signSubtitle: 'ශ්‍රී ලංකා රාජ්‍ය නිලධාරීන් සඳහා ආරක්ෂිත පිවිසුම', email: 'නිල ඊමේල් ලිපිනය', password: 'මුරපදය', role: 'පිවිසෙන භූමිකාව', signIn: 'පිවිසෙන්න', sample: 'ආදර්ශ පිවිසුම', demoHint: 'පහත ආදර්ශ ගිණුම භාවිතා කරන්න. පිවිසීමට පෙර අදාළ භූමිකාව තෝරන්න.', detail: 'ඉල්ලීමේ විස්තර', purpose: 'අරමුණ', timeline: 'අනුමැති ඉතිහාසය', approve: 'අනුමත කරන්න', return: 'සංශෝධනයට ආපසු යවන්න', note: 'තීරණ සටහන (විකල්ප)', close: 'වසන්න', welcome: 'ආයුබෝවන්', language: 'English', destinationPlaceholder: 'උදා: ටෝකියෝ, ජපානය', purposePlaceholder: 'නිල අරමුණ විස්තර කරන්න', empty: 'මෙම දසුනට ගැළපෙන ඉල්ලීම් නැත.', signOut: 'ඉවත් වන්න', roleNames: { admin: 'Administrator', applicant: 'Applicant', supervisor: 'Supervisor', hr: 'HR Officer', finance: 'Finance Officer', director: 'Director' }, statuses: { 'Pending Supervisor': 'Supervisor review', 'Pending HR': 'HR review', 'Pending Finance': 'Finance review', 'Pending Director': 'Director review', Approved: 'Approved', Returned: 'Returned' }, errors: { 'Email, password, or selected role is incorrect.': 'ඊමේල්, මුරපදය හෝ තෝරාගත් භූමිකාව නිවැරදි නැත.' }, request: 'ඉල්ලීම', adminNotice: 'පරිපාලන පිවිසුම', noteLabel: 'අයදුම්කරු හෝ ගමනාන්තය අනුව සොයන්න', profile: 'ඔබගේ වැඩපොළ', today: '2026 ඔක්තෝබර් 06, අඟහරුවාදා', years: 'සියලු වසර', filter: 'පෙරහන්', signed: 'අත්සන ලබාගත්තා', requestCreated: 'ඉල්ලීම සමාලෝචනයට ඉදිරිපත් කළා.', decisionSaved: 'තීරණය සටහන් කළා.'
  }
};

const roleEmails = { admin: 'admin@foring.gov.lk', applicant: 'officer@foring.gov.lk', supervisor: 'supervisor@foring.gov.lk', hr: 'hr@foring.gov.lk', finance: 'finance@foring.gov.lk', director: 'director@foring.gov.lk' };
const roleNames = { admin: 'Administrator', applicant: 'Applicant', supervisor: 'Supervisor', hr: 'HR Officer', finance: 'Finance Officer', director: 'Director' };

function App() {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('portal-user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('portal-token') || '');
  const [requests, setRequests] = useState([]);
  const [activeNav, setActiveNav] = useState('overview');
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [toast, setToast] = useState('');
  const t = copy[language];

  async function loadRequests() {
    if (!token) return;
    const response = await fetch('/api/requests', { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 401) return signOut();
    if (response.ok) setRequests(await response.json());
  }

  useEffect(() => { loadRequests(); }, [token]);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 3200); return () => clearTimeout(timer); } }, [toast]);

  function signOut() {
    localStorage.removeItem('portal-token');
    localStorage.removeItem('portal-user');
    setToken(''); setUser(null); setRequests([]);
  }

  if (!user || !token) return <Login language={language} setLanguage={setLanguage} t={t} onLogin={(session) => { localStorage.setItem('portal-token', session.token); localStorage.setItem('portal-user', JSON.stringify(session.user)); setUser(session.user); setToken(session.token); }} />;

  const isApplicant = user.role === 'applicant';
  const canApprove = ['admin', 'supervisor', 'hr', 'finance', 'director'].includes(user.role);
  const filtered = requests.filter((request) => {
    const matchesQuery = `${request.id} ${request.applicant_name} ${request.destination}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'pending' ? request.status.startsWith('Pending') : request.status === statusFilter);
    const matchesType = typeFilter === 'all' || request.leave_type === (typeFilter === 'official' ? 'Official duty' : 'Private leave');
    const matchesRole = !isApplicant || request.applicant_id === user.id;
    return matchesQuery && matchesStatus && matchesType && matchesRole;
  });
  const pendingCount = requests.filter((request) => request.status.startsWith('Pending')).length;
  const approvedCount = requests.filter((request) => request.status === 'Approved').length;
  const returnedCount = requests.filter((request) => request.status === 'Returned').length;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="crest-lockup"><img className="ministry-emblem" src="https://mode.gov.lk/assets/logo-C1c0CvCU.png" alt="Government of Sri Lanka national emblem"/><div><strong>{t.brand}</strong><span>PUBLIC SERVICE PORTAL</span></div></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav>
        <button className={activeNav === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveNav('overview')}><span className="nav-icon"><FileText size={17}/></span>{t.overview}</button>
        <button className={activeNav === 'requests' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveNav('requests')}><span className="nav-icon"><Stamp size={17}/></span>{isApplicant ? t.requests : t.approvals}{canApprove && <span className="nav-count">{pendingCount}</span>}</button>
        <button className="nav-item muted" onClick={() => setToast(language === 'en' ? 'Reports are not available in this demo.' : 'මෙම ආදර්ශයේ වාර්තා ලබාගත නොහැක.')}><span className="nav-icon"><ArrowDownToLine size={17}/></span>{t.reports}</button>
      </nav>
      <div className="side-bottom"><div className="support-line"><CircleHelp size={16}/><span>Service desk</span><ArrowRight size={14}/></div><div className="profile-block"><div className="avatar">{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div><div className="profile-copy"><strong>{user.name}</strong><span>{t.roleNames[user.role]}</span></div><button title={t.signOut} aria-label={t.signOut} onClick={signOut}><LogOut size={16}/></button></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="crumb"><span>HOME</span><span className="crumb-slash">/</span><strong>{activeNav === 'overview' ? t.overview : (isApplicant ? t.requests : t.approvals).toUpperCase()}</strong></div><div className="top-actions"><span className="today-label">{t.today}</span><button className="lang-button" onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}><Globe2 size={15}/>{t.language}</button><div className="top-avatar">{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div></div></header>
      <section className="page-content">
        <div className="page-heading"><div><div className="eyebrow">{t.welcome}, {user.name.split(' ')[0]}</div><h1>{t.title}</h1><p>{t.track}</p></div><div className="heading-actions"><span className="role-pill"><ShieldCheck size={14}/>{t.roleNames[user.role]}</span>{isApplicant && <button className="primary-button" onClick={() => setShowNew(true)}><FilePlus2 size={16}/>{t.newRequest}</button>}</div></div>
        <div className="summary-grid">
          <article className="metric"><div className="metric-top"><span>{t.total}</span><FileText size={16}/></div><strong>{requests.length.toString().padStart(2, '0')}</strong><small>{t.years}</small></article>
          <article className="metric accent-yellow"><div className="metric-top"><span>{t.pending}</span><Stamp size={16}/></div><strong>{pendingCount.toString().padStart(2, '0')}</strong><small>{canApprove ? 'Across approval stages' : 'In review'}</small></article>
          <article className="metric accent-green"><div className="metric-top"><span>{t.approved}</span><Check size={16}/></div><strong>{approvedCount.toString().padStart(2, '0')}</strong><small>Calendar year 2026</small></article>
          <article className="metric accent-red"><div className="metric-top"><span>{t.returned}</span><ArrowLeft size={16}/></div><strong>{returnedCount.toString().padStart(2, '0')}</strong><small>Requires attention</small></article>
        </div>
        <section className="table-section">
          <div className="table-heading"><div><h2>{activeNav === 'overview' ? t.allRequests : (isApplicant ? t.requests : t.approvals)}</h2><p>{t.track}</p></div><button className="filter-button" onClick={() => setStatusFilter(statusFilter === 'all' ? 'pending' : 'all')}><SlidersHorizontal size={15}/>{t.filter}<ChevronDown size={14}/></button></div>
          <div className="table-toolbar"><div className="tabs"><button className={typeFilter === 'all' ? 'tab selected' : 'tab'} onClick={() => setTypeFilter('all')}>{t.all}<span>{requests.length}</span></button><button className={typeFilter === 'official' ? 'tab selected' : 'tab'} onClick={() => setTypeFilter('official')}>{t.official}</button><button className={typeFilter === 'private' ? 'tab selected' : 'tab'} onClick={() => setTypeFilter('private')}>{t.private}</button></div><label className="search-box"><Search size={15}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.noteLabel}/><kbd>⌘ K</kbd></label></div>
          <div className="table-wrap"><table><thead><tr><th>{t.id}</th><th>{t.applicant}</th><th>{t.destination}</th><th>{t.dates}</th><th>{t.type}</th><th>{t.status}</th><th></th></tr></thead><tbody>{filtered.map((request) => <tr key={request.id} onClick={() => setSelected(request)}><td className="ref-cell">FV-{String(request.id).padStart(4, '0')}</td><td><div className="person-cell"><span className="mini-avatar">{request.applicant_name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span>{request.applicant_name}</span></div></td><td className="destination-cell">{request.destination}</td><td>{formatDate(request.start_date)} <span className="date-separator">→</span> {formatDate(request.end_date)}</td><td><span className="type-tag">{request.leave_type}</span></td><td><span className={`status-badge ${request.status === 'Approved' ? 'approved' : request.status === 'Returned' ? 'returned' : 'pending'}`}><i/>{t.statuses[request.status] || request.status}</span></td><td><button className="row-arrow" aria-label={t.detail}><ArrowRight size={16}/></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">{t.empty}</div>}</div>
          <footer className="table-footer"><span>Showing <strong>{filtered.length ? 1 : 0}-{filtered.length}</strong> of <strong>{filtered.length}</strong> requests</span><div><button aria-label="Previous page"><ArrowLeft size={15}/></button><button aria-label="Next page"><ArrowRight size={15}/></button></div></footer>
        </section>
        <footer className="page-footer"><span>DEPARTMENT OF PUBLIC ADMINISTRATION · SRI LANKA</span><span>SECURE GOVERNMENT SERVICE <i/></span></footer>
      </section>
    </main>
    {showNew && <DetailedRequestModal t={t} language={language} user={user} token={token} onClose={() => setShowNew(false)} onSubmitted={() => { setShowNew(false); loadRequests(); setToast(t.requestCreated); }} />}
    {selected && <DetailModal request={selected} user={user} t={t} language={language} token={token} onClose={() => setSelected(null)} onChanged={() => { setSelected(null); loadRequests(); setToast(t.decisionSaved); }} />}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}

function Login({ language, setLanguage, t, onLogin }) {
  const [role, setRole] = useState('applicant');
  const [email, setEmail] = useState(roleEmails.applicant);
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, role }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      onLogin(data);
    } catch (reason) { setError(t.errors[reason.message] || reason.message); }
    finally { setBusy(false); }
  }
  return <div className="login-layout"><div className="login-art"><div className="art-nav"><div className="mini-crest">ශ්‍රී</div><span>{t.brand}</span><button className="lang-button light" onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}><Globe2 size={15}/>{t.language}</button></div><div className="art-content"><span className="art-overline">DEPARTMENT OF PUBLIC ADMINISTRATION</span><h1>Service beyond<br/><em>borders.</em></h1><p>{t.subtitle}</p><div className="art-rule"/><div className="art-stamp"><ShieldCheck size={15}/> SRI LANKA · PUBLIC SERVICE</div></div><div className="art-bottom"><span>COLOMBO · EST. 1948</span><span>01 / 06</span></div><div className="art-lines"/></div><div className="login-panel"><div className="login-card"><div className="login-emblem"><div className="crest large"><span>ශ්‍රී</span></div><span>OFFICIAL PORTAL</span></div><h2>{t.chooseRole}</h2><p className="login-description">{t.signSubtitle}</p><form onSubmit={submit}><label className="field-label">{t.role}<select value={role} onChange={(event) => { const nextRole = event.target.value; setRole(nextRole); setEmail(roleEmails[nextRole]); setPassword(nextRole === 'admin' ? 'Admin@123' : 'Demo@123'); }}><option value="applicant">{t.roleNames.applicant}</option><option value="supervisor">{t.roleNames.supervisor}</option><option value="hr">{t.roleNames.hr}</option><option value="finance">{t.roleNames.finance}</option><option value="director">{t.roleNames.director}</option><option value="admin">{t.roleNames.admin}</option></select></label><label className="field-label">{t.email}<input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required/></label><label className="field-label">{t.password}<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required/></label>{error && <div className="form-error">{error}</div>}<button className="login-submit" disabled={busy}>{busy ? '…' : t.signIn}<ArrowRight size={16}/></button></form><div className="demo-box"><div className="demo-heading"><ShieldCheck size={15}/>{t.sample}</div><p>{t.demoHint}</p><span>{roleEmails[role]}</span><small>{role === 'admin' ? 'Admin@123' : 'Demo@123'}</small></div><div className="login-foot">SRI LANKA · SECURE PUBLIC SERVICE ACCESS</div></div></div></div>;
}

function DetailModal({ request, user, t, language, token, onClose, onChanged }) {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const stageRoles = { 'Pending Supervisor': ['admin', 'supervisor'], 'Pending HR': ['admin', 'hr'], 'Pending Finance': ['admin', 'finance'], 'Pending Director': ['admin', 'director'] };
  const actionable = stageRoles[request.status]?.includes(user.role);
  async function decide(decision) {
    setError('');
    const response = await fetch(`/api/requests/${request.id}/decision`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ decision, note }) });
    const data = await response.json();
    if (!response.ok) return setError(data.error);
    onChanged();
  }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="detail-modal">
      <header className="modal-header">
        <div>
          <div className="eyebrow">FV-{String(request.id).padStart(4, '0')} · {t.request}</div>
          <h2>{request.destination}</h2>
          <p>{request.applicant_name} · {request.applicant_email}</p>
        </div>
        <button className="icon-button" onClick={onClose} aria-label={t.close}><X size={19}/></button>
      </header>
      <div className="detail-body">
        <div className="detail-facts">
          <div><span>{t.dates}</span><strong>{formatDate(request.start_date)} – {formatDate(request.end_date)}</strong></div>
          <div><span>{t.type}</span><strong>{request.leave_type}</strong></div>
          <div className="fact-wide"><span>{t.purpose}</span><strong>{request.purpose}</strong></div>
        </div>
        <RequestDetails details={request.details} language={language}/>
        <div className="detail-status">
          <span className={`status-badge ${request.status === 'Approved' ? 'approved' : request.status === 'Returned' ? 'returned' : 'pending'}`}><i/>{t.statuses[request.status]}</span>
          <span>{request.created_at.slice(0, 10)}</span>
        </div>
        {request.signature && <div className="saved-signature"><span>{t.signature}</span><img src={request.signature} alt={t.signature}/></div>}
        <div className="timeline">
          <h3>{t.timeline}</h3>
          <div className="timeline-row"><span className="timeline-dot done"><Check size={12}/></span><div><strong>{t.submitted}</strong><small>{request.applicant_name}</small></div></div>
          {request.approvals.map((approval) => <div className="timeline-row" key={approval.id}><span className={`timeline-dot ${approval.decision === 'approve' ? 'done' : 'returned-dot'}`}>{approval.decision === 'approve' ? <Check size={12}/> : <ArrowLeft size={12}/>}</span><div><strong>{approval.approver_name} · {approval.decision}</strong><small>{approval.note || approval.created_at.slice(0, 10)}</small></div></div>)}
        </div>
        {actionable && <div className="decision-box">
          <label className="field-label">{t.note}<textarea rows="2" value={note} onChange={(event) => setNote(event.target.value)}/></label>
          <div className="decision-actions"><button className="secondary-button" onClick={() => decide('return')}>{t.return}</button><button className="primary-button" onClick={() => decide('approve')}><Check size={15}/>{t.approve}</button></div>
        </div>}
        {error && <div className="form-error">{error}</div>}
      </div>
    </section>
  </div>;
}

function formatDate(value) { return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' }).format(new Date(`${value}T12:00:00`)); }

createRoot(document.getElementById('root')).render(<App/>);