import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminTabs from '../components/Admin/AdminTabs';
import DynamicTable from '../components/Admin/DynamicTable';
import '../styles/global.css';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('diakok');

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/registration");

  return (
    <>
      <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #2A3B5C 0%, #1f2d4a 100%)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <div className="hero-text text-center">
                <h1 className="mb-4">Admin <span>Felület</span></h1>
                <p className="mb-4">Zeneiskola adatbázis kezelése</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section py-5">
        <div className="container">
          <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <DynamicTable tablaNeve={activeTab} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Admin;