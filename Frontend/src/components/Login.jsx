// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../img/logo.png";

const Login = () => {
  const navigate = useNavigate();
  
  // State-ek
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Felhasználók betöltése localStorage-ból
  const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('harmonia_users');
    return users ? JSON.parse(users) : [];
  };

  // Bejelentkezett felhasználó mentése
  const saveLoggedInUser = (user) => {
    localStorage.setItem('harmonia_current_user', JSON.stringify(user));
  };

  // Input változás kezelése
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Hibaüzenet törlése
    setShowError(false);
  };

  // Jelszó megjelenítés/elrejtés
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Bejelentkezés kezelése
  const handleLogin = (e) => {
    e.preventDefault();
    
    const { username, password } = formData;
    
    // Hibák törlése
    setShowError(false);
    setShowSuccess(false);
    
    // 1. Kötelező mezők ellenőrzése
    if (!username || !password) {
      setErrorMessage('Kérjük, add meg a felhasználóneved és jelszavad!');
      setShowError(true);
      return;
    }
    
    // Bejelentkezés szimulálása
    setIsLoading(true);
    
    // Felhasználók lekérése
    const users = getUsersFromLocalStorage();
    
    // Felhasználó keresése
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() || 
      u.email.toLowerCase() === username.toLowerCase()
    );
    
    setTimeout(() => {
      if (!user) {
        setErrorMessage('Nem található felhasználó ezzel a névvel vagy email címmel!');
        setShowError(true);
        setIsLoading(false);
        return;
      }
      
      if (user.password !== password) {
        setErrorMessage('Helytelen jelszó!');
        setShowError(true);
        setIsLoading(false);
        return;
      }
      
      // Sikeres bejelentkezés
      saveLoggedInUser(user);
      
      // Üdvözlő üzenet szerepkör alapján
      let welcomeMessage = '';
      if (user.role === 'diak') {
        welcomeMessage = `Üdvözöljük ${user.fullName}! Sikeresen bejelentkeztél diákként.`;
      } else if (user.role === 'tanar') {
        welcomeMessage = `Üdvözöljük ${user.fullName}! Sikeresen bejelentkeztél tanárként.`;
      } else {
        welcomeMessage = `Üdvözöljük ${user.fullName}! Sikeresen bejelentkeztél.`;
      }
      
      setSuccessMessage(welcomeMessage);
      setShowSuccess(true);
      setIsLoading(false);
      
      // Átirányítás a főoldalra
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    }, 1500);
  };

  // Navigációs függvények
  const goBackToHome = () => {
    navigate('/');
  };

  const goToRegistration = () => {
    navigate('/registration');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('🔑 Elfelejtett jelszó\n\nKérjük, vedd fel a kapcsolatot az iskola adminisztrációjával a jelszó helyreállításhoz, vagy használd a "Regisztráció" gombot egy új fiók létrehozásához.');
  };

  return (
    <>
      {/* Vissza gomb a főoldalra */}
      <div className="back-to-home">
        <a href="#" onClick={goBackToHome} className="back-btn">
          <i className="fas fa-arrow-left"></i>
          <span>Vissza a főoldalra</span>
        </a>
      </div>
      
      {/* Bejelentkező űrlap konténer */}
      <div className="register-wrapper">
        <div className="register-card">
          {/* Logo */}
          <div className="logo-wrapper">
            <img 
              src={logo} 
              alt="Harmónia Zeneiskola logó" 
              className="register-logo-img"
            />
          </div>
          
          {/* Fejléc */}
          <div className="register-header">
            <h1>Harmónia<span className="brand-highlight">Zene</span></h1>
            <p>Üdvözöljük újra! Jelentkezz be a folytatáshoz.</p>
          </div>
          
          {/* Sikeres bejelentkezés üzenet */}
          {showSuccess && (
            <div className="success-message show">
              <i className="fas fa-check-circle"></i>
              <span>{successMessage}</span>
            </div>
          )}
          
          {/* Hibaüzenet */}
          {showError && (
            <div className="error-message show">
              <i className="fas fa-exclamation-circle"></i>
              <span>{errorMessage}</span>
            </div>
          )}
          
          {/* Bejelentkező űrlap */}
          <form className="register-form" onSubmit={handleLogin}>
            {/* Felhasználónév / Email mező */}
            <div className="input-group-custom">
              <i className="fas fa-user input-icon"></i>
              <input 
                type="text" 
                id="username" 
                placeholder="Felhasználónév vagy email cím" 
                required 
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className="input-label">Felhasználónév vagy email</label>
            </div>
            
            {/* Jelszó mező (show/hide gombbal) */}
            <div className="input-group-custom" style={{ position: 'relative' }}>
              <i className="fas fa-lock input-icon"></i>
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                placeholder="Jelszó" 
                required 
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                style={{ paddingRight: '45px' }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--light-text)',
                  zIndex: 3
                }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              <label htmlFor="password" className="input-label">Jelszó</label>
            </div>
            
            {/* Elfelejtett jelszó link */}
            <div style={{ textAlign: 'right', marginTop: '-5px', marginBottom: '5px' }}>
              <a 
                href="#" 
                onClick={handleForgotPassword}
                style={{
                  color: 'var(--accent-turquoise)',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Elfelejtett jelszó?
              </a>
            </div>
            
            {/* Bejelentkezés gomb */}
            <button 
              type="submit" 
              className="register-btn" 
              disabled={isLoading}
              style={{ marginTop: '10px' }}
            >
              {isLoading ? (
                <><i className="fas fa-spinner fa-spin me-2"></i> Bejelentkezés...</>
              ) : (
                <><span>Bejelentkezés</span><i className="fas fa-sign-in-alt"></i></>
              )}
            </button>
            
            {/* Regisztráció link */}
            <div className="login-section">
              <p>Még nincs fiókod?</p>
              <a href="#" className="login-link" onClick={goToRegistration}>
                <i className="fas fa-user-plus"></i>
                <span>Regisztráció</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </form>
        </div>
        
        {/* Lábléc */}
        <div className="text-center mt-4 text-muted small">
          <i className="fas fa-music me-1"></i> 
          Harmónia Zeneiskola - Hangszerkölcsönzés
          <i className="fas fa-music ms-1"></i>
        </div>
      </div>
    </>
  );
};

export default Login;