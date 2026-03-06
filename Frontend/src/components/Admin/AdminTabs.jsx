// components/Admin/AdminTabs.jsx
import React from 'react';

const AdminTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="admin-tabs mb-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'diakok' ? 'active' : ''}`}
            onClick={() => onTabChange('diakok')}
          >
            <i className="fas fa-users me-2"></i>
            Diákok
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'tanarok' ? 'active' : ''}`}
            onClick={() => onTabChange('tanarok')}
          >
            <i className="fas fa-chalkboard-teacher me-2"></i>
            Tanárok
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'hangszerek' ? 'active' : ''}`}
            onClick={() => onTabChange('hangszerek')}
          >
            <i className="fas fa-guitar me-2"></i>
            Hangszerek
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'kolcsonzesek' ? 'active' : ''}`}
            onClick={() => onTabChange('kolcsonzesek')}
          >
            <i className="fas fa-box me-2"></i>
            Kölcsönzések
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'orak' ? 'active' : ''}`}
            onClick={() => onTabChange('orak')}
          >
            <i className="fas fa-clock me-2"></i>
            Órák
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminTabs;