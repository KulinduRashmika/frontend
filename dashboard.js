import React from 'react';
import './Dashboard.css';


function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="dashboard-heading">✨ Welcome Library Management System!</h2>
        <p className="dashboard-subheading">
          
        </p>

        {/* <div className="dashboard-grid">
          {}
          <div className="card blue">
            <div className="icon">📖</div>
            <h3>Total Books</h3>
            <p>1,234</p>
          </div>

          <div className="card green">
            <div className="icon">📤</div>
            <h3>Borrowed Books</h3>
            <p>123</p>
          </div>

          <div className="card purple">
            <div className="icon">👥</div>
            <h3>Registered Members</h3>
            <p>567</p>
          </div>

          <div className="card red">
            <div className="icon">⏰</div>
            <h3>Overdue Books</h3>
            <p>15</p>
          </div>

          <div className="card yellow">
            <div className="icon">✅</div>
            <h3>Available Books</h3>
            <p>1,111</p>
          </div>

          <div className="card indigo">
            <div className="icon">🆕</div>
            <h3>New Arrivals</h3>
            <p>30</p>
          </div>
        </div> */}

        <div className="dashboard-footer">
          <p>Start managing your library's resources efficiently!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
