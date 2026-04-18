import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import artImage from '../assets/art.jpg'; // Hero image like Home (change if needed)
import '../App.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-content-fade-in">
      {/* Hero layout like HomePage */}
      <div className="login-hero-wrapper">
        <div className="login-hero-content">
          
          {/* Left: Hero Text + Form */}
          <div className="login-hero-text">
            <h2 className="hero-title">Welcome Back</h2>
            <p className="hero-subtitle">
              "Creativity is intelligence having fun."
            </p>
            <h3 className="hero-welcome">Log into your Folio</h3>
            
            {error && (
              <div className="error-banner">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="hero-form">
              <div className="form-group hero-input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={loading}
                />
              </div>
              
              <div className="form-group hero-input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="hero-cta-btn"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Log In'}
              </button>
            </form>
            
            <p className="hero-link-text">
              New here? <Link to="/register" className="hero-link">Create Account</Link>
            </p>
          </div>

          {/* Right: Aesthetic Image like Home */}
          <div className="login-hero-image">
            <img src={artImage} alt="Creative aesthetic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
