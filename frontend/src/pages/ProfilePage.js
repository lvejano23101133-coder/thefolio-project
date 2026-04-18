import React, { useState, useEffect, useRef } from 'react'; 
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../App.css'; 

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [pic, setPic] = useState(null);
  const fileInputRef = useRef(null);
  
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  // Update form state when user changes
  useEffect(() => {
    setName(user?.name || '');
    setBio(user?.bio || '');
  }, [user]);

  // Handle Profile Update
  const handleProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showMsg('Name is required', 'error');
      return;
    }
    if (bio.length > 200) {
      showMsg('Bio must be under 200 chars', 'error');
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setPic(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setPreviewUrl('');
      showMsg('Profile updated successfully! 🌿', 'success');
    } catch (err) {
      showMsg(err.response?.data?.message || 'Error updating profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Change
  const handlePassword = async (e) => {
    e.preventDefault();
    if (newPw.length < 6) {
      showMsg('Password must be at least 6 characters', 'error');
      return;
    }
    if (!/[A-Za-z]/.test(newPw) || !/\d/.test(newPw)) {
      showMsg('Password needs letters and numbers', 'error');
      return;
    }

    setLoading(true);
    try {
      await API.put('/auth/change-password', { 
        currentPassword: curPw, 
        newPassword: newPw 
      });
      setCurPw('');
      setNewPw('');
      showMsg('Password changed successfully! 🛡️', 'success');
    } catch (err) {
      showMsg(err.response?.data?.message || 'Error changing password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text, type) => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(''), 5000);
  };

  useEffect(() => {
    if (pic) {
      const url = URL.createObjectURL(pic);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl('');
    }
  }, [pic]);

  const picSrc = previewUrl || (user?.profilePic
    ? `${API.defaults.baseURL.replace('/api', '/uploads/')}${user.profilePic}`
    : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=367456&color=fff`);

  if (!user) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
        <div>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper home-content-fade-in">
      <div className="max-width-container">
        
        {/* Profile Header */}
        <section className="profile-header-card contact-card">
          <div className="section-header">
            <h1>Account Settings</h1>
            <p>Customize your profile and manage security.</p>
          </div>

          <div className="profile-header-info">
            <div className="profile-avatar-wrapper">
              <img 
                src={picSrc} 
                alt="Profile avatar" 
                className="profile-avatar"
                onError={(e) => { 
                  e.target.src = `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=367456&color=fff`;
                }}
              />
              {previewUrl && <span className="preview-badge">Preview</span>}
            </div>
            <div className="profile-user-info">
              <h2 className="profile-name">{user.name || 'Artist Profile'}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Message Banner */}
        {msg && (
          <div className={`msg-banner ${msgType}`}>
            <p>{msg}</p>
            <button onClick={() => setMsg('')} className="close-btn">&times;</button>
          </div>
        )}

        {/* Settings Grid */}
        <div className="settings-grid">
          
          {/* Profile Edit Form */}
          <section className="settings-card profile-form-card">
            <h2 className="section-title">Edit Profile</h2>
            <form onSubmit={handleProfile} className="form-stack">
              <div className="form-group">
                <label htmlFor="name">Display Name *</label>
                <input 
                  id="name"
                  type="text"
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Your display name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio"
                  value={bio} 
                  onChange={e => setBio(e.target.value)} 
                  placeholder="Tell us about your aesthetic..."
                  rows={4}
                  maxLength="200"
                />
                <small>{bio.length}/200</small>
              </div>

              <div className="form-group">
                <label htmlFor="avatar">Profile Picture</label>
                <input 
                  ref={fileInputRef}
                  id="avatar"
                  type="file" 
                  accept="image/*" 
                  onChange={e => setPic(e.target.files[0])}
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </section>

          {/* Password Form */}
          <section className="settings-card password-card">
            <h2 className="section-title">Change Password</h2>
            <form onSubmit={handlePassword} className="form-stack">
              <div className="form-group">
                <label htmlFor="curPw">Current Password</label>
                <input 
                  id="curPw"
                  type="password" 
                  placeholder="Enter current password" 
                  value={curPw} 
                  onChange={e => setCurPw(e.target.value)} 
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPw">New Password *</label>
                <input 
                  id="newPw"
                  type="password" 
                  placeholder="At least 6 chars with letters & numbers" 
                  value={newPw} 
                  onChange={e => setNewPw(e.target.value)} 
                  required 
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn secondary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </section>
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Saving changes...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
