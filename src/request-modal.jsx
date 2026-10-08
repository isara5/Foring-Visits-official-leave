import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import SignaturePad from './signature-pad.jsx';

export const formText = {
  en: {
    formCode: 'FOREIGN LEAVE APPLICATION · GENERAL 126 + APPENDIX 16',
    heading: 'Application for leave out of Sri Lanka',
    required: 'Complete the required service, travel and leave particulars before signing.',
    appendixTitle: 'Appendix 16',
    appendixSubtitle: 'Prior permission for a public officer to travel abroad',
    generalTitle: 'General 126',
    generalSubtitle: 'Application for leave out of Sri Lanka',
    officerSection: '1. Officer and service particulars',
    travelSection: '2. Proposed foreign travel',
    leaveSection: '3. Leave particulars',
    logisticsSection: '4. Address, funding and cover arrangements',
    supportingSection: '5. Supporting documents',
    fullName: 'Name as in service records',
    nic: 'National Identity Card number',
    dateOfBirth: 'Date of birth',
    designation: 'Post / designation',
    service: 'Public service / service minute',
    grade: 'Class / grade',
    ministry: 'Ministry / department / provincial council',
    firstAppointment: 'Date of first appointment',
    lastForeignReturn: 'Date last returned to Sri Lanka after foreign leave',
    passport: 'Passport number (if available)',
    destination: 'Country / city to be visited',
    purpose: 'Purpose and reasons for travel',
    institution: 'Host institution / invitation from',
    departure: 'Proposed departure date',
    returnDate: 'Proposed return date',
    leaveCategory: 'Nature of leave requested',
    leaveBalance: 'Available leave balance before this application',
    daysApplied: 'Leave days applied for',
    abroadAddress: 'Full address during leave abroad',
    abroadPhone: 'Telephone number while abroad',
    abroadEmail: 'Email address while abroad',
    airfareFunding: 'Return air ticket funding / source',
    maintenanceFunding: 'Foreign maintenance costs and funding source',
    fundingSource: 'Who will fund the trip?',
    fundingSelf: 'Self-funded',
    fundingGovernment: 'Government / official sponsorship',
    fundingSponsor: 'External sponsor',
    sponsorName: 'Sponsor name / institution',
    sponsorRelationship: 'Relationship to applicant',
    dutyCoverName: 'Officer covering duties during absence',
    dutyCoverDesignation: 'Covering officer post / designation',
    spouseAccompanying: 'Will your spouse accompany you?',
    spouseName: 'Spouse name',
    yes: 'Yes',
    no: 'No',
    documentsHint: 'Mark the documents included with this application, where applicable.',
    invitationDocument: 'Invitation / official programme',
    itineraryDocument: 'Travel itinerary / return ticket details',
    fundingDocument: 'Funding or sponsorship evidence',
    passportDocument: 'Passport bio-page copy',
    leaveRecordDocument: 'Leave balance statement',
    declaration: 'I certify that the particulars in this application are true and complete.',
    signature: 'Applicant signature',
    signatureHint: 'Sign in the area below using your mouse or finger.',
    clear: 'Clear signature',
    choose: 'Select leave category',
    chooseFunding: 'Select funding source',
    leaveOptions: ['Annual / vacation leave', 'Half-pay leave', 'Commuted half-pay leave', 'No-pay leave', 'Official duty'],
    nameRequired: 'Complete all required fields, confirm the declaration and add your signature.',
    dateError: 'Return date must be on or after departure date.',
  },
  si: {
    formCode: 'විදේශ නිවාඩු අයදුම්පත · සාමාන්‍ය 126 + උපලේඛන 16',
    heading: 'ශ්‍රී ලංකාවෙන් පිටත නිවාඩු අයදුම්පත',
    required: 'අත්සන් කිරීමට පෙර සේවා, සංචාර සහ නිවාඩු විස්තර පුරවන්න.',
    appendixTitle: 'උපලේඛන 16',
    appendixSubtitle: 'රාජ්‍ය නිලධාරියෙකුගේ විදේශ සංචාරයට පූර්ව අනුමැතිය',
    generalTitle: 'සාමාන්‍ය 126',
    generalSubtitle: 'ශ්‍රී ලංකාවෙන් පිටත නිවාඩු අයදුම්පත',
    officerSection: '1. නිලධාරි සහ සේවා විස්තර',
    travelSection: '2. යෝජිත විදේශ සංචාරය',
    leaveSection: '3. නිවාඩු විස්තර',
    logisticsSection: '4. ලිපිනය, වියදම් සහ රාජකාරි ආවරණය',
    supportingSection: '5. උපකාරක ලේඛන',
    fullName: 'සේවා වාර්තාවේ සඳහන් නම',
    nic: 'ජාතික හැඳුනුම්පත් අංකය',
    dateOfBirth: 'උපන් දිනය',
    designation: 'තනතුර',
    service: 'රාජ්‍ය සේවය / සේවා ව්‍යවස්ථාව',
    grade: 'පන්තිය / ශ්‍රේණිය',
    ministry: 'අමාත්‍යාංශය / දෙපාර්තමේන්තුව / පළාත් සභාව',
    firstAppointment: 'පළමු පත්වීම් දිනය',
    lastForeignReturn: 'අවසන් විදේශ නිවාඩුවෙන් ශ්‍රී ලංකාවට පැමිණි දිනය',
    passport: 'ගමන් බලපත්‍ර අංකය (තිබේ නම්)',
    destination: 'ගමන් කරන රට / නගරය',
    purpose: 'සංචාරයේ අරමුණ සහ හේතු',
    institution: 'ආරාධනා කරන ආයතනය',
    departure: 'යෝජිත පිටත්වන දිනය',
    returnDate: 'යෝජිත ආපසු පැමිණෙන දිනය',
    leaveCategory: 'ඉල්ලා සිටින නිවාඩු වර්ගය',
    leaveBalance: 'මෙම අයදුම්පතට පෙර ඇති නිවාඩු ශේෂය',
    daysApplied: 'ඉල්ලා සිටින නිවාඩු දින ගණන',
    abroadAddress: 'විදේශ නිවාඩු කාලයේ සම්පූර්ණ ලිපිනය',
    abroadPhone: 'විදේශයේ දුරකථන අංකය',
    abroadEmail: 'විදේශයේ ඊමේල් ලිපිනය',
    airfareFunding: 'ආපසු ගුවන් ටිකට්පතේ වියදම් මූලාශ්‍රය',
    maintenanceFunding: 'විදේශ නඩත්තු වියදම් සහ ඒවායේ මූලාශ්‍රය',
    fundingSource: 'සංචාරයේ වියදම් දරන්නේ කවුද?',
    fundingSelf: 'පෞද්ගලිකව',
    fundingGovernment: 'රජය / නිල අනුග්‍රහය',
    fundingSponsor: 'බාහිර අනුග්‍රාහකයෙක්',
    sponsorName: 'අනුග්‍රාහකයාගේ නම / ආයතනය',
    sponsorRelationship: 'අයදුම්කරු සමඟ සම්බන්ධතාවය',
    dutyCoverName: 'නොපැමිණෙන කාලයේ රාජකාරි ආවරණය කරන නිලධාරියා',
    dutyCoverDesignation: 'රාජකාරි ආවරණ නිලධාරියාගේ තනතුර',
    spouseAccompanying: 'සහකරු / සහකාරිය සංචාරයට එක්වන්නේද?',
    spouseName: 'සහකරුගේ / සහකාරියගේ නම',
    yes: 'ඔව්',
    no: 'නැත',
    documentsHint: 'අදාළ වන විට මෙම අයදුම්පත සමඟ ඉදිරිපත් කරන ලේඛන තෝරන්න.',
    invitationDocument: 'ආරාධනා ලිපිය / නිල වැඩසටහන',
    itineraryDocument: 'ගමන් විස්තර / ආපසු ටිකට් තොරතුරු',
    fundingDocument: 'මුදල් හෝ අනුග්‍රාහක සාක්ෂි',
    passportDocument: 'ගමන් බලපත්‍රයේ ඡායාරූප පිටුවේ පිටපත',
    leaveRecordDocument: 'නිවාඩු ශේෂ ප්‍රකාශය',
    declaration: 'මෙම අයදුම්පතේ සියලු තොරතුරු සත්‍ය සහ සම්පූර්ණ බව සහතික කරමි.',
    signature: 'අයදුම්කරුගේ අත්සන',
    signatureHint: 'මූසිකය හෝ ඇඟිල්ල භාවිතයෙන් පහත ප්‍රදේශයේ අත්සන් කරන්න.',
    clear: 'අත්සන මකන්න',
    choose: 'නිවාඩු වර්ගය තෝරන්න',
    chooseFunding: 'වියදම් මූලාශ්‍රය තෝරන්න',
    leaveOptions: ['වාර්ෂික / විවේක නිවාඩු', 'අර්ධ වැටුප් නිවාඩු', 'පරිවර්තනය කළ අර්ධ වැටුප් නිවාඩු', 'වැටුප් රහිත නිවාඩු', 'නිල රාජකාරි'],
    nameRequired: 'අවශ්‍ය තොරතුරු පුරවා ප්‍රකාශය තහවුරු කර අත්සන් කරන්න.',
    dateError: 'ආපසු පැමිණෙන දිනය පිටත්වන දිනයට පෙර විය නොහැක.',
  },
};

const emptyDetails = {
  nic: '', dateOfBirth: '', designation: '', service: '', grade: '', ministry: '',
  firstAppointmentDate: '', lastForeignReturnDate: '', passportNumber: '', visitInstitution: '',
  leaveCategory: '', leaveBalance: '', abroadAddress: '', abroadPhone: '', abroadEmail: '',
  airfareFunding: '', maintenanceFunding: '', fundingSource: '', sponsorName: '',
  sponsorRelationship: '', dutyCoverName: '', dutyCoverDesignation: '', spouseAccompanying: false,
  spouseName: '', supportingDocuments: [],
};

export default function RequestModal({ t, language, user, token, onClose, onSubmitted }) {
  const [form, setForm] = useState({ destination: '', purpose: '', startDate: '', endDate: '', ...emptyDetails });
  const [signature, setSignature] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const labels = formText[language];
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

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    if (!declaration || !signature) {
      setError(labels.nameRequired);
      setBusy(false);
      return;
    }
    if (form.endDate < form.startDate) {
      setError(labels.dateError);
      setBusy(false);
      return;
    }
    const details = { ...form, fullName: user.name, daysApplied, declarationConfirmed: declaration };
    const leaveType = form.leaveCategory === 'Official duty' ? 'Official duty' : 'Private leave';
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, leaveType, signature, details }),
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

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="request-modal detailed-request-modal">
      <header className="modal-header">
        <div>
          <div className="eyebrow">{labels.formCode}</div>
          <h2>{labels.heading}</h2>
          <p>{labels.required}</p>
        </div>
        <button className="icon-button" onClick={onClose} aria-label={t.close}><X size={19}/></button>
      </header>
      <form onSubmit={submit}>
        <div className="detailed-form-body">
          <FormSection title={labels.officerSection} number="16" subtitle={labels.appendixSubtitle}>
            <ReadOnlyField label={labels.fullName} value={user.name}/>
            <InputField name="nic" label={`${labels.nic} *`} value={form.nic} update={update} required/>
            <InputField name="dateOfBirth" label={`${labels.dateOfBirth} *`} value={form.dateOfBirth} update={update} type="date" required/>
            <InputField name="designation" label={`${labels.designation} *`} value={form.designation} update={update} required/>
            <InputField name="service" label={`${labels.service} *`} value={form.service} update={update} required/>
            <InputField name="grade" label={labels.grade} value={form.grade} update={update}/>
            <InputField name="ministry" label={`${labels.ministry} *`} value={form.ministry} update={update} required/>
            <InputField name="firstAppointmentDate" label={`${labels.firstAppointment} *`} value={form.firstAppointmentDate} update={update} type="date" required/>
            <InputField name="lastForeignReturnDate" label={labels.lastForeignReturn} value={form.lastForeignReturnDate} update={update} type="date"/>
            <InputField name="passportNumber" label={labels.passport} value={form.passportNumber} update={update}/>
          </FormSection>

          <FormSection title={labels.travelSection} number="16" subtitle={labels.appendixSubtitle}>
            <InputField name="destination" label={`${t.destinationLabel} *`} value={form.destination} update={update} required/>
            <InputField name="visitInstitution" label={labels.institution} value={form.visitInstitution} update={update}/>
            <TextAreaField name="purpose" label={`${t.purposeLabel} *`} value={form.purpose} update={update} required/>
            <InputField name="startDate" label={`${labels.departure} *`} value={form.startDate} update={update} type="date" required/>
            <InputField name="endDate" label={`${labels.returnDate} *`} value={form.endDate} update={update} type="date" required min={form.startDate}/>
          </FormSection>

          <FormSection title={labels.leaveSection} number="126" subtitle={labels.generalSubtitle}>
            <SelectField name="leaveCategory" label={`${labels.leaveCategory} *`} value={form.leaveCategory} update={update} placeholder={labels.choose} options={labels.leaveOptions}/>
            <InputField name="leaveBalance" label={`${labels.leaveBalance} *`} value={form.leaveBalance} update={update} required/>
            <ReadOnlyField label={labels.daysApplied} value={daysApplied ? `${daysApplied}` : '—'}/>
            <InputField name="abroadAddress" label={`${labels.abroadAddress} *`} value={form.abroadAddress} update={update} required/>
            <InputField name="abroadPhone" label={`${labels.abroadPhone} *`} value={form.abroadPhone} update={update} type="tel" required/>
            <InputField name="abroadEmail" label={labels.abroadEmail} value={form.abroadEmail} update={update} type="email"/>
          </FormSection>

          <FormSection title={labels.logisticsSection} number="126" subtitle={labels.generalSubtitle}>
            <InputField name="airfareFunding" label={`${labels.airfareFunding} *`} value={form.airfareFunding} update={update} required/>
            <InputField name="maintenanceFunding" label={`${labels.maintenanceFunding} *`} value={form.maintenanceFunding} update={update} required/>
            <SelectField name="fundingSource" label={labels.fundingSource} value={form.fundingSource} update={update} placeholder={labels.chooseFunding} options={[labels.fundingSelf, labels.fundingGovernment, labels.fundingSponsor]}/>
            {form.fundingSource === 'External sponsor' && <>
              <InputField name="sponsorName" label={labels.sponsorName} value={form.sponsorName} update={update}/>
              <InputField name="sponsorRelationship" label={labels.sponsorRelationship} value={form.sponsorRelationship} update={update}/>
            </>}
            <InputField name="dutyCoverName" label={`${labels.dutyCoverName} *`} value={form.dutyCoverName} update={update} required/>
            <InputField name="dutyCoverDesignation" label={`${labels.dutyCoverDesignation} *`} value={form.dutyCoverDesignation} update={update} required/>
            <label className="check-field span-2"><input type="checkbox" checked={form.spouseAccompanying} onChange={(event) => update('spouseAccompanying', event.target.checked)}/><span>{labels.spouseAccompanying}</span></label>
            {form.spouseAccompanying && <InputField name="spouseName" label={labels.spouseName} value={form.spouseName} update={update}/>} 
          </FormSection>

          <FormSection title={labels.supportingSection} number="126" subtitle={labels.documentsHint}>
            <DocumentCheck checked={form.supportingDocuments.includes('invitation')} onChange={() => toggleDocument('invitation')} label={labels.invitationDocument}/>
            <DocumentCheck checked={form.supportingDocuments.includes('itinerary')} onChange={() => toggleDocument('itinerary')} label={labels.itineraryDocument}/>
            <DocumentCheck checked={form.supportingDocuments.includes('funding')} onChange={() => toggleDocument('funding')} label={labels.fundingDocument}/>
            <DocumentCheck checked={form.supportingDocuments.includes('passport')} onChange={() => toggleDocument('passport')} label={labels.passportDocument}/>
            <DocumentCheck checked={form.supportingDocuments.includes('leaveRecord')} onChange={() => toggleDocument('leaveRecord')} label={labels.leaveRecordDocument}/>
          </FormSection>

          <label className="declaration-field"><input type="checkbox" checked={declaration} onChange={(event) => setDeclaration(event.target.checked)}/><span>{labels.declaration} *</span></label>
          <div className="signature-field detailed-signature">
            <div className="signature-title"><span>{labels.signature} *</span><small>{labels.signatureHint}</small><button type="button" onClick={() => window.clearSignature?.()}>{labels.clear}</button></div>
            <SignaturePad onChange={setSignature}/>
          </div>
          {error && <div className="form-error">{error}</div>}
        </div>
        <footer className="modal-footer"><button type="button" className="secondary-button" onClick={onClose}>{t.cancel}</button><button className="primary-button" disabled={busy || !signature || !declaration}>{busy ? '…' : t.submit}<ArrowRight size={15}/></button></footer>
      </form>
    </section>
  </div>;
}

function FormSection({ title, number, subtitle, children }) {
  return <section className="form-section">
    <header className="form-section-heading"><span className="form-number">{number}</span><div><h3>{title}</h3><p>{subtitle}</p></div></header>
    <div className="form-grid">{children}</div>
  </section>;
}

function InputField({ name, label, value, update, type = 'text', required = false, min }) {
  return <label className="field-label">{label}<input name={name} type={type} value={value} onChange={(event) => update(name, event.target.value)} required={required} min={min}/></label>;
}

function TextAreaField({ name, label, value, update, required = false }) {
  return <label className="field-label span-2">{label}<textarea name={name} rows="3" value={value} onChange={(event) => update(name, event.target.value)} required={required}/></label>;
}

function SelectField({ name, label, value, update, placeholder, options }) {
  return <label className="field-label">{label}<select name={name} value={value} onChange={(event) => update(name, event.target.value)} required>
    <option value="">{placeholder}</option>
    {options.map((option, index) => <option key={option} value={name === 'leaveCategory' ? ['Annual / vacation leave', 'Half-pay leave', 'Commuted half-pay leave', 'No-pay leave', 'Official duty'][index] : ['Self-funded', 'Government / official sponsorship', 'External sponsor'][index]}>{option}</option>)}
  </select></label>;
}

function ReadOnlyField({ label, value }) {
  return <label className="field-label">{label}<span className="read-only-field">{value}</span></label>;
}

function DocumentCheck({ checked, onChange, label }) {
  return <label className="check-field"><input type="checkbox" checked={checked} onChange={onChange}/><span>{label}</span></label>;
}

export function RequestDetails({ details = {}, language }) {
  const labels = formText[language];
  const leaveCategoryLabels = {
    'Annual / vacation leave': labels.leaveOptions[0],
    'Half-pay leave': labels.leaveOptions[1],
    'Commuted half-pay leave': labels.leaveOptions[2],
    'No-pay leave': labels.leaveOptions[3],
    'Official duty': labels.leaveOptions[4],
  };
  const fundingLabels = {
    'Self-funded': labels.fundingSelf,
    'Government / official sponsorship': labels.fundingGovernment,
    'External sponsor': labels.fundingSponsor,
  };
  const documentLabels = {
    invitation: labels.invitationDocument,
    itinerary: labels.itineraryDocument,
    funding: labels.fundingDocument,
    passport: labels.passportDocument,
    leaveRecord: labels.leaveRecordDocument,
  };
  const groups = [
    { title: labels.officerSection, fields: [[labels.fullName, details.fullName], [labels.nic, details.nic], [labels.dateOfBirth, details.dateOfBirth], [labels.designation, details.designation], [labels.service, details.service], [labels.grade, details.grade], [labels.ministry, details.ministry], [labels.firstAppointment, details.firstAppointmentDate], [labels.lastForeignReturn, details.lastForeignReturnDate], [labels.passport, details.passportNumber]] },
    { title: labels.travelSection, fields: [[labels.destination, details.destination], [labels.institution, details.visitInstitution], [labels.purpose, details.purpose], [labels.departure, details.startDate], [labels.returnDate, details.endDate], [labels.daysApplied, details.daysApplied]] },
    { title: labels.leaveSection, fields: [[labels.leaveCategory, leaveCategoryLabels[details.leaveCategory] || details.leaveCategory], [labels.leaveBalance, details.leaveBalance], [labels.abroadAddress, details.abroadAddress], [labels.abroadPhone, details.abroadPhone], [labels.abroadEmail, details.abroadEmail]] },
    { title: labels.logisticsSection, fields: [[labels.airfareFunding, details.airfareFunding], [labels.maintenanceFunding, details.maintenanceFunding], [labels.fundingSource, fundingLabels[details.fundingSource] || details.fundingSource], [labels.sponsorName, details.sponsorName], [labels.sponsorRelationship, details.sponsorRelationship], [labels.dutyCoverName, details.dutyCoverName], [labels.dutyCoverDesignation, details.dutyCoverDesignation], [labels.spouseAccompanying, details.spouseAccompanying ? labels.yes : labels.no], [labels.spouseName, details.spouseName]] },
  ];
  const hasDetails = Object.keys(details).length > 0;
  if (!hasDetails) return null;

  return <div className="request-review-details">
    {groups.map((group) => {
      const fields = group.fields.filter(([, value]) => value !== undefined && value !== null && value !== '');
      if (!fields.length) return null;
      return <section className="review-detail-group" key={group.title}>
        <h3>{group.title}</h3>
        <div className="review-detail-grid">{fields.map(([label, value]) => <div key={label}><span>{label}</span><strong>{String(value)}</strong></div>)}</div>
      </section>;
    })}
    {!!details.supportingDocuments?.length && <section className="review-detail-group"><h3>{labels.supportingSection}</h3><div className="review-detail-grid"><div className="review-wide"><span>{labels.documentsHint}</span><strong>{details.supportingDocuments.map((document) => documentLabels[document] || document).join(', ')}</strong></div></div></section>}
    {details.declarationConfirmed && <div className="review-declaration"><Check size={14}/>{labels.declaration}</div>}
  </div>;
}