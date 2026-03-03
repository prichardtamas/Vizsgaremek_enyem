// components/Admin/AdminTabs.jsx
import React from 'react';

const AdminTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="admin-tabs mb-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => onTabChange('events')}
          >
            <i className="fas fa-calendar-alt me-2"></i>
            Események
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => onTabChange('orders')}
          >
            <i className="fas fa-box me-2"></i>
            Kölcsönzések
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminTabs;