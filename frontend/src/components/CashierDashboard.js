import React from 'react';
import './CashierDashboard.css';

function CashierDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="cashier-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>💰 Cashier Dashboard</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, Cashier!</h2>
          <p>Your cashier system is ready to use.</p>
          
          <div className="quick-actions">
            <div className="action-card">
              <div className="action-icon">🛒</div>
              <h3>New Sale</h3>
              <p>Start a new transaction</p>
              <button className="action-btn">Start Sale</button>
            </div>
            
            <div className="action-card">
              <div className="action-icon">📦</div>
              <h3>Inventory</h3>
              <p>View and manage products</p>
              <button className="action-btn">View Inventory</button>
            </div>
            
            <div className="action-card">
              <div className="action-icon">📊</div>
              <h3>Reports</h3>
              <p>View sales reports</p>
              <button className="action-btn">View Reports</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CashierDashboard;
