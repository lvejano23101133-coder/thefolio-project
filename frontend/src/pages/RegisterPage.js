import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'; // Siguraduhing tama ang path ng axios mo
import registerImg from '../assets/art.jpg'; // Palitan ng tamang file name ng magandang artwork mo!
import '../App.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    birthday: '',
    password: '',
    confirmPassword: '',
    level: 'Beginner', // Default value
    agreeToTerms: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 🛑 Simple Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    setLoading(true);

    try {
      // 🛰️ POST call sa iyong Backend API
      await API.post('/users/register', {
        fullName: formData.fullName,
        username: formData.username,
        birthday: formData.birthday,
        password: formData.password,
        level: formData.level
      });

      // Kapag successful, i-redirect sa login page
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        
        {/* Left Side: Registration Form */}
        <div className="register-form-container">
          <h2>Join My Art Community</h2>
          <p className="subtitle">By signing up, you will receive creative updates and photography inspirations.</p>

          {error && <p className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                name="username" 
                placeholder="Preferred Username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Birthday</label>
              <input 
                type="date" 
                name="birthday" 
                value={formData.birthday} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Min. 6 characters" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Repeat your password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Radio Buttons for Level */}
            <div className="form-group">
              <label>Level</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="level" 
                    value="Beginner" 
                    checked={formData.level === 'Beginner'} 
                    onChange={handleChange} 
                  /> Beginner
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="level" 
                    value="Intermediate" 
                    checked={formData.level === 'Intermediate'} 
                    onChange={handleChange} 
                  /> Intermediate
                </label>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                name="agreeToTerms" 
                checked={formData.agreeToTerms} 
                onChange={handleChange} 
              />
              <label>I agree to the terms</label>
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="register-image-container">
          <img src={registerImg} alt="Art Community" />
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;