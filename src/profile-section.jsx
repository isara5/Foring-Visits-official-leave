import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Building,
  Briefcase,
  Phone,
  Shield,
  Key,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function ProfileSection({ user, onProfileUpdated, token, language = 'en', showToast }) {
  const [salutation, setSalutation] = useState(user?.salutation || 'Mr.');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [designation, setDesignation] = useState(user?.designation || '');
  const [departmentName, setDepartmentName] = useState(user?.department_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [signature, setSignature] = useState(user?.signature || '');


  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form submit states
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch full profile from backend on mount
  useEffect(() => {
    if (!token) return;
    fetch('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          if (data.salutation) setSalutation(data.salutation);
          if (data.name) setName(data.name);
          if (data.email) setEmail(data.email);
          if (data.designation) setDesignation(data.designation);
          if (data.department_name) setDepartmentName(data.department_name);
          if (data.phone) setPhone(data.phone);
          if (data.signature) setSignature(data.signature);
        }
      })
      .catch(() => {});
  }, [token]);

  const ROLE_NAMES = {
    admin: { en: 'System Administrator', si: 'පද්ධති පරිපාලක' },
    applicant: { en: 'Public Officer / Applicant', si: 'රාජ්‍ය නිලධාරී / අයදුම්කරු' },
    department_head: { en: 'Head of Department / Institution', si: 'දෙපාර්තමේන්තු / ආයතන ප්‍රධානී' },
    reviewer: { en: 'Subject Officer (Leave & Establishment)', si: 'විෂයභාර නිලධාරී' },
    assistant_secretary: { en: 'Assistant Secretary', si: 'සහකාර ලේකම්' },
    senior_assistant_secretary: { en: 'Senior Assistant Secretary', si: 'ජ්‍යෙෂ්ඨ සහකාර ලේකම්' },
    additional_secretary: { en: 'Additional Secretary', si: 'අතිරේක ලේකම්' },
    secretary: { en: 'Ministry Secretary', si: 'අමාත්‍යාංශ ලේකම්' },
    authorized_official: { en: 'Director General / Authorized Official', si: 'අධ්‍යක්ෂ ජනරාල් / බලයලත් නිලධාරී' },
    minister: { en: 'Cabinet Minister', si: 'අමාත්‍යතුමා' },
    president: { en: 'His Excellency the President', si: 'අතිගරු ජනාධිපතිතුමා' }
  };

  const roleTitle = (ROLE_NAMES[user?.role] && ROLE_NAMES[user.role][language]) || user?.role || 'Officer';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError(language === 'si' ? 'කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.' : 'Name cannot be empty.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError(language === 'si' ? 'නව මුරපදය අවම වශයෙන් අකුරු 6කින් සමන්විත විය යුතුය.' : 'New password must be at least 6 characters.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError(language === 'si' ? 'නව මුරපදය සහ තහවුරු කළ මුරපදය එකිනෙකට නොගැළපේ.' : 'New password and confirmation password do not match.');
      return;
    }

    if (newPassword && !currentPassword) {
      setError(language === 'si' ? 'මුරපදය වෙනස් කිරීම සඳහා කරුණාකර ඔබගේ වත්මන් මුරපදය ඇතුළත් කරන්න.' : 'Please enter your current password to change password.');
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          salutation: salutation || 'Mr.',
          name: name.trim(),
          email: email.trim(),
          designation: designation.trim(),
          department_name: departmentName.trim(),
          phone: phone.trim(),
          signature: signature || null,
          currentPassword: currentPassword.trim() || undefined,
          newPassword: newPassword.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      setSuccess(
        language === 'si'
          ? 'ඔබගේ පැතිකඩ තොරතුරු සාර්ථකව යාවත්කාලීන කරන ලදී!'
          : 'Your profile has been updated successfully!'
      );
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      if (onProfileUpdated) {
        onProfileUpdated(data.user, data.token);
      }
      if (showToast) {
        showToast(language === 'si' ? 'පැතිකඩ සාර්ථකව යාවත්කාලීන විය!' : 'Profile updated successfully!');
      }
    } catch (err) {
      setError(err.message || 'Error updating profile.');
    } finally {
      setBusy(false);
    }
  };

  const initials = (name || user?.name || 'User')
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '30px' }}>
      {/* Top Heading */}
      <div className="page-heading" style={{ marginBottom: '22px' }}>
        <div>
          <div className="eyebrow">
            {language === 'si' ? 'පරිශීලක ගිණුම සහ පැතිකඩ' : 'OFFICIAL USER ACCOUNT & CREDENTIALS'}
          </div>
          <h1>{language === 'si' ? 'මගේ පැතිකඩ (My Profile)' : 'My Official Profile'}</h1>
          <p>
            {language === 'si'
              ? 'ඔබගේ නිල තොරතුරු, සම්බන්ධතා අංක සහ මුරපදය මෙතැනින් පරීක්ෂා කර යාවත්කාලීන කරගත හැක.'
              : 'View and update your personal details, designation, contact numbers, and password.'}
          </p>
        </div>
      </div>

      {/* Main Profile Summary Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: '0 4px 16px rgba(30, 58, 138, 0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#ffffff',
            color: '#1e3a8a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 800,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            flexShrink: 0
          }}>
            {initials}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{salutation ? `${salutation} ` : ''}{name || user?.name}</h2>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)'
              }}>
                {roleTitle}
              </span>
            </div>
            <div style={{ marginTop: '5px', fontSize: '13px', color: '#bfdbfe', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span>{email || user?.email}</span>
              {designation && (
                <>
                  <span>•</span>
                  <span>{designation}</span>
                </>
              )}
              {departmentName && (
                <>
                  <span>•</span>
                  <span>{departmentName}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Shield size={16} style={{ color: '#86efac' }} />
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#f0fdf4' }}>
            {language === 'si' ? 'සත්‍යාපිත නිල ගිණුම' : 'Verified Official Account'}
          </span>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {error && (
        <div style={{
          marginBottom: '18px',
          padding: '12px 16px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#b91c1c',
          fontSize: '12.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{
          marginBottom: '18px',
          padding: '12px 16px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          color: '#15803d',
          fontSize: '12.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <span>{success}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
          {/* Card 1: Official & Contact Information */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '22px 24px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} style={{ color: '#2563eb' }} />
              <span>{language === 'si' ? 'මූලික නිල තොරතුරු' : 'General & Official Information'}</span>
            </h3>

            <div style={{ display: 'grid', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(135px, 145px) 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                    {language === 'si' ? 'ගෞරව නාමය *' : 'Title *'}
                  </label>
                  <select
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="form-select"
                  >
                    <option value="Mr.">{language === 'si' ? 'Mr. (මයා)' : 'Mr.'}</option>
                    <option value="Mrs.">{language === 'si' ? 'Mrs. (මිය)' : 'Mrs.'}</option>
                    <option value="Miss">{language === 'si' ? 'Miss (මෙනවිය)' : 'Miss'}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                    {language === 'si' ? 'සම්පූර්ණ නම (Full Name) *' : 'Full Name *'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Nimal Perera"
                      style={{ width: '100%', height: '38px', padding: '0 12px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  {language === 'si' ? 'නිල විද්‍යුත් තැපෑල (Official Email) *' : 'Official Email *'}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. officer@foring.gov.lk"
                    style={{ width: '100%', height: '38px', padding: '0 12px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                  />
                </div>
                <small style={{ fontSize: '10.5px', color: '#64748b', display: 'block', marginTop: '3px' }}>
                  {language === 'si' ? 'පද්ධතියට ඇතුළුවීමට (Login) මෙම විද්‍යුත් තැපෑල භාවිත වේ.' : 'Used as your primary login credential.'}
                </small>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  {language === 'si' ? 'නිල තනතුර (Designation / Post)' : 'Official Designation / Post'}
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior Reviewing Officer / Assistant Director"
                  style={{ width: '100%', height: '38px', padding: '0 12px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  {language === 'si' ? 'දෙපාර්තමේන්තුව / අමාත්‍යාංශය (Department / Institution)' : 'Department / Ministry / Institution'}
                </label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  placeholder="e.g. Ministry of Civil Security / Sri Lanka Telecom"
                  style={{ width: '100%', height: '38px', padding: '0 12px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  {language === 'si' ? 'දුරකථන අංකය (Official / Mobile Phone)' : 'Contact / Mobile Phone'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +94 77 123 4567"
                  style={{ width: '100%', height: '38px', padding: '0 12px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  {language === 'si' ? 'පද්ධති භූමිකාව (System Role - ආරක්ෂාව පිණිස වෙනස් කළ නොහැක)' : 'System Role (Secured)'}
                </label>
                <div style={{
                  height: '38px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '0 12px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12.5px',
                  color: '#475569',
                  fontWeight: 600
                }}>
                  <Lock size={14} style={{ color: '#94a3b8', marginRight: '8px' }} />
                  <span>{roleTitle} ({user?.role})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Security & Password */}
          <div>

            {/* Card 3: Security & Password Change */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '22px 24px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={18} style={{ color: '#d97706' }} />
                  <span>{language === 'si' ? 'ආරක්ෂාව සහ මුරපදය (Password Security)' : 'Password & Security'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const next = !(showCurrentPassword && showNewPassword && showConfirmPassword);
                    setShowCurrentPassword(next);
                    setShowNewPassword(next);
                    setShowConfirmPassword(next);
                  }}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  {(showCurrentPassword || showNewPassword || showConfirmPassword) ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{(showCurrentPassword || showNewPassword || showConfirmPassword) ? (language === 'si' ? 'සියල්ල සඟවන්න' : 'Hide all') : (language === 'si' ? 'සියල්ල පෙන්වන්න' : 'Show all')}</span>
                </button>
              </div>

              <p style={{ margin: '0 0 14px', fontSize: '11px', color: '#64748b' }}>
                {language === 'si'
                  ? 'ඔබට මුරපදය වෙනස් කිරීමට අවශ්‍ය නැතිනම් පහත කොටු හිස්ව තබන්න.'
                  : 'Leave password fields blank if you do not wish to change your password.'}
              </p>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    {language === 'si' ? 'වත්මන් මුරපදය (Current Password)' : 'Current Password'}
                  </label>
                  <div className="password-input-wrap">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ height: '36px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      title={showCurrentPassword ? (language === 'si' ? 'මුරපදය සඟවන්න' : 'Hide password') : (language === 'si' ? 'මුරපදය පෙන්වන්න' : 'Show password')}
                      aria-label="Toggle password visibility"
                    >
                      {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      {language === 'si' ? 'නව මුරපදය' : 'New Password'}
                    </label>
                    <div className="password-input-wrap">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        style={{ height: '36px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        title={showNewPassword ? (language === 'si' ? 'මුරපදය සඟවන්න' : 'Hide password') : (language === 'si' ? 'මුරපදය පෙන්වන්න' : 'Show password')}
                        aria-label="Toggle password visibility"
                      >
                        {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      {language === 'si' ? 'තහවුරු කරන්න' : 'Confirm Password'}
                    </label>
                    <div className="password-input-wrap">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        style={{ height: '36px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        title={showConfirmPassword ? (language === 'si' ? 'මුරපදය සඟවන්න' : 'Hide password') : (language === 'si' ? 'මුරපදය පෙන්වන්න' : 'Show password')}
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Action Bar */}
        <div style={{
          marginTop: '24px',
          padding: '16px 20px',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {language === 'si'
              ? 'වෙනස්කම් සිදුකළ පසු පහත "වෙනස්කම් සුරකින්න" බොත්තම ඔබන්න.'
              : 'Click "Save Profile Changes" below to update your account information.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="submit"
              disabled={busy}
              className="primary-button"
              style={{
                height: '38px',
                padding: '0 22px',
                fontSize: '12.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#15803d',
                borderColor: '#166534',
                boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
                cursor: busy ? 'wait' : 'pointer'
              }}
            >
              {busy ? (
                <>
                  <Clock size={16} />
                  <span>{language === 'si' ? 'සුරකිමින්...' : 'Saving Changes...'}</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>{language === 'si' ? 'වෙනස්කම් සුරකින්න (Save Changes)' : 'Save Profile Changes'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
