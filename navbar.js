import React from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();          
    navigate('/');       
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">📚 Library System</div>
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>

          <li className="dropdown">
            <span className="navbar-link">Books ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/viewBooks" className="dropdown-item">Add/View Books</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span className="navbar-link">Members ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/viewMembers" className="dropdown-item">Add/View Members</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span className="navbar-link">Staff ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/viewStaff" className="dropdown-item">Add/View Staff</Link></li>
            </ul>
          </li>

          <li><Link to="/issued" className="navbar-link">Issued/Borrowed</Link></li>
        </ul>

        <button onClick={handleLogoutClick} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
