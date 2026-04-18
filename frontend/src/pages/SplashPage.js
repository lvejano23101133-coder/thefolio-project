import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import digitalart from '../assets/digitalart.png';
import '../App.css'; 

const SplashPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className={`splash-page splash-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="floating-particles">
        <span className="particle">🎨</span>
        <span className="particle">🖼️</span>
        <span className="particle">✨</span>
        <span className="particle">🖌️</span>
      </div>

      {isLoading ? (
        <div className="splash-loader">
          <img src={digitalart} alt="TheFolio Logo" className="splash-logo" />
          <h1>TheFolio</h1>
          <div className="spinner"></div>
          <p className="loading-text">Everything is an art...</p>
        </div>
      ) : (
        <div className="splash-hero">
          <h1 className="hero-title">Welcome to TheFolio</h1>
          <p className="hero-subtitle">A minimalist space for your art, thoughts, and digital gallery.</p>
          <div className="splash-actions">
            <Link to="/login" className="splash-hero-cta">Get Started</Link>
            <Link to="/register" className="splash-hero-cta secondary">Join Community</Link>
          </div>
        </div>
      )}
    </div>
  );

};

export default SplashPage;