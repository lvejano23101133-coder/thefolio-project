import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar main-header">
      <div className="nav-container">
        
        {/* LEFT: TheFolio + Toggle */}
        <div className="nav-left">
          <Link to="/home" className="nav-logo">
            The<span>Folio</span>
          </Link>

          <div className="theme-switch-wrapper">
            <button onClick={toggleTheme} className="theme-toggle-nav" title="Toggle Mode">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* RIGHT: Navigation links + Profile */}
        <div className="nav-right">
          <div className="nav-links">
            {user ? (
              <>
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact</NavLink>
                <NavLink to="/create" className={({ isActive }) => (isActive ? 'active-link' : '')}>Create</NavLink>

                {user.role === 'admin' && (
                  <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : 'admin-link')}>Admin</NavLink>
                )}

                <Link to="/profile" className="nav-profile">
                  <img 
                    src={user?.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : `https://ui-avatars.com/api/?name=${user?.name}&background=367456&color=fff`} 
                    alt="Profile" 
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=User&background=367456&color=fff' }}
                  />
                </Link>

                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact</NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link btn-nav-auth' : 'btn-nav-auth')}>Login</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
