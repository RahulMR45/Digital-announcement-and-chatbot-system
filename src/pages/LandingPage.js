import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import your custom CSS

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h2 className="landing-title">
          Welcome to the Notification System
        </h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/admin/login')} 
            className={`landing-button admin-button`}
          >
            <span>Admin Login</span>
          </button>
          
          <button 
            onClick={() => navigate('/user')} 
            className={`landing-button user-button`}
          >
            <span>User Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
