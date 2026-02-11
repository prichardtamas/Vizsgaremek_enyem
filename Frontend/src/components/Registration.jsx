import React, { useState, useEffect } from 'react';
import logo from "../img/logo.png";

const Registration = () => {
  // State-ek
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    width: '0%',
    color: '#e1e5eb',
    text: 'Jelszó erőssége: nincs megadva'
  });
  
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false
  });

  // Regisztrált felhasználók betöltése localStorage-ból
  const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('harmonia_users');
    return users ? JSON.parse(users) : [];
  };

  // Felhasználónév foglaltság ellenőrzése
  const isUsernameTaken = (username) => {
    const users = getUsersFromLocalStorage();
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
  };

  // Email foglaltság ellenőrzése
  const isEmailTaken = (email) => {
    const users = getUsersFromLocalStorage();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  // Jelszó validálás
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('A jelszónak minimum 8 karakter hosszúnak kell lennie!');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('A jelszónak tartalmaznia kell legalább egy számot!');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('A jelszónak tartalmaznia kell legalább egy nagybetűt!');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('A jelszónak tartalmaznia kell legalább egy kisbetűt!');
    }
    
    return errors;
  };

  // Jelszó erősség számolás
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return Math.min(100, strength);
  };

  // Jelszó követelmények frissítése
  const updatePasswordRequirements = (password) => {
    setRequirements({
      length: password.length >= 8,
      number: /[0-9]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password)
    });
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
    setErrors(prev => ({ ...prev, [id]: '' }));
    
    // Jelszó erősség számolás
    if (id === 'password') {
      const strength = calculatePasswordStrength(value);
      let color = '#e1e5eb';
      let text = 'Jelszó erőssége: nincs megadva';
      
      if (strength > 0) {
        if (strength < 50) {
          color = '#dc3545';
          text = 'Jelszó erőssége: gyenge';
        } else if (strength < 75) {
          color = '#ffc107';
          text = 'Jelszó erőssége: közepes';
        } else {
          color = '#28a745';
          text = 'Jelszó erőssége: erős';
        }
      }
      
      setPasswordStrength({
        width: strength + '%',
        color,
        text
      });
      
      updatePasswordRequirements(value);
    }
  };

  // Regisztráció kezelése
  const handleRegister = (e) => {
    e.preventDefault();
    
    const { fullName, username, email, role, password, confirmPassword } = formData;
    
    // Hibák törlése
    setShowError(false);
    setShowSuccess(false);
    setErrors({});
    
    // 1. Kötelező mezők ellenőrzése
    if (!fullName || !username || !email || !role || !password || !confirmPassword) {
      setErrorMessage('Kérjük, tölts ki minden kötelező mezőt!');
      setShowError(true);
      return;
    }
    
    // 2. Email formátum ellenőrzése
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Kérjük, adj meg egy érvényes email címet!');
      setShowError(true);
      setErrors(prev => ({ ...prev, email: 'invalid' }));
      return;
    }
    
    // 3. Felhasználónév hossz ellenőrzése
    if (username.length < 4) {
      setErrorMessage('A felhasználónévnek minimum 4 karakter hosszúnak kell lennie!');
      setShowError(true);
      setErrors(prev => ({ ...prev, username: 'invalid' }));
      return;
    }
    
    // 4. Jelszó erősség ellenőrzése
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrorMessage(passwordErrors[0]);
      setShowError(true);
      setErrors(prev => ({ ...prev, password: 'invalid' }));
      return;
    }
    
    // 5. Jelszó egyezés ellenőrzése
    if (password !== confirmPassword) {
      setErrorMessage('A jelszavak nem egyeznek!');
      setShowError(true);
      setErrors(prev => ({ ...prev, confirmPassword: 'invalid' }));
      return;
    }
    
    // 6. ÁSZF elfogadás ellenőrzése
    const terms = document.getElementById('terms')?.checked;
    if (!terms) {
      setErrorMessage('Kérjük, fogadd el az Adatvédelmi irányelveket és a Felhasználási feltételeket!');
      setShowError(true);
      return;
    }
    
    // 7. Felhasználónév egyediség ellenőrzése
    if (isUsernameTaken(username)) {
      setErrorMessage('Ez a felhasználónév már foglalt!');
      setShowError(true);
      setErrors(prev => ({ ...prev, username: 'invalid' }));
      return;
    }
    
    // 8. Email egyediség ellenőrzése
    if (isEmailTaken(email)) {
      setErrorMessage('Ezzel az email címmel már regisztráltak!');
      setShowError(true);
      setErrors(prev => ({ ...prev, email: 'invalid' }));
      return;
    }
    
    // Regisztráció
    setIsLoading(true);
    
    // Új felhasználó létrehozása
    const newUser = {
      fullName,
      username,
      email,
      role,
      password,
      registeredAt: new Date().toISOString()
    };
    
    // Mentés localStorage-ba
    const users = getUsersFromLocalStorage();
    users.push(newUser);
    localStorage.setItem('harmonia_users', JSON.stringify(users));
    
    // Sikeres regisztráció
    setTimeout(() => {
      setSuccessMessage(`Sikeres regisztráció! Üdvözöljük, ${fullName}! Átirányítás a bejelentkezéshez...`);
      setShowSuccess(true);
      setIsLoading(false);
      
      // Átirányítás
      setTimeout(() => {
        window.location.href = '/login';
      }, 2500);
    }, 1500);
  };

  // Navigációs függvények
  const goBackToHome = () => {
    window.location.href = './';
  };

  const goToLogin = () => {
    window.location.href = '/login';
  };

  const showTerms = (e) => {
    e.preventDefault();
    alert('📜 Adatvédelmi irányelvek és Felhasználási feltételek\n\nA Harmónia Zeneiskola elkötelezett az Ön adatainak védelme mellett. Regisztrációval elfogadja, hogy személyes adatait a zeneiskolai szolgáltatások nyújtása céljából kezeljük. Adatait harmadik félnek nem adjuk ki.\n\nA teljes dokumentum megtekinthető iskolánkban vagy weboldalunk Adatvédelem menüpontjában.');
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
      
      {/* Regisztrációs űrlap konténer */}
      <div className="register-wrapper">
        <div className="register-card">
          {/* Logo */}
          <div className="logo-wrapper">
            <div className="logo-circle">
              HZ
            </div>
          </div>
          
          {/* Fejléc */}
          <div className="register-header">
            <h1>Harmónia<span className="brand-highlight">Zene</span></h1>
            <p>Csatlakozz a zeneiskola közösségéhez!</p>
          </div>
          
          {/* Sikeres regisztráció üzenet */}
          {showSuccess && (
            <div className="success-message show" id="successMessage">
              <i className="fas fa-check-circle"></i>
              <span id="successText">{successMessage}</span>
            </div>
          )}
          
          {/* Hibaüzenet */}
          {showError && (
            <div className="error-message show" id="errorMessage">
              <i className="fas fa-exclamation-circle"></i>
              <span id="errorText">{errorMessage}</span>
            </div>
          )}
          
          {/* Regisztrációs űrlap */}
          <form className="register-form" onSubmit={handleRegister}>
            {/* Teljes név mező */}
            <div className="input-group-custom">
              <i className="fas fa-user input-icon"></i>
              <input 
                type="text" 
                id="fullName" 
                placeholder="Teljes név" 
                required 
                autoComplete="off"
                autoFocus
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'is-invalid' : ''}
              />
              <label htmlFor="fullName" className="input-label">Teljes név</label>
            </div>
            
            {/* Felhasználónév mező */}
            <div className="input-group-custom">
              <i className="fas fa-at input-icon"></i>
              <input 
                type="text" 
                id="username" 
                placeholder="Felhasználónév" 
                required 
                autoComplete="off"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'is-invalid' : ''}
              />
              <label htmlFor="username" className="input-label">Felhasználónév</label>
            </div>
            
            {/* Email mező */}
            <div className="input-group-custom">
              <i className="fas fa-envelope input-icon"></i>
              <input 
                type="email" 
                id="email" 
                placeholder="Email cím" 
                required 
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'is-invalid' : ''}
              />
              <label htmlFor="email" className="input-label">Email cím</label>
            </div>
            
            {/* Szerepkör választó - CSAK DIÁK ÉS TANÁR */}
            <div className="select-group-custom">
              <i className="fas fa-user-tag"></i>
              <select 
                id="role" 
                required
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>Válassz szerepkört</option>
                <option value="diak">Diák</option>
                <option value="tanar">Tanár</option>
              </select>
            </div>
            
            {/* Jelszó mező */}
            <div className="input-group-custom">
              <i className="fas fa-lock input-icon"></i>
              <input 
                type="password" 
                id="password" 
                placeholder="Jelszó" 
                required 
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'is-invalid' : ''}
              />
              <label htmlFor="password" className="input-label">Jelszó</label>
            </div>
            
            {/* Jelszó erősség jelző */}
            <div className="password-strength">
              <div 
                className="strength-bar" 
                id="strengthBar" 
                style={{ 
                  width: passwordStrength.width, 
                  backgroundColor: passwordStrength.color 
                }}
              ></div>
              <span className="strength-text" id="strengthText">
                {passwordStrength.text}
              </span>
            </div>
            
            {/* Jelszó követelmények */}
            <div className="password-requirements">
              <div className={`requirement ${requirements.length ? 'met' : ''}`} id="reqLength">
                <i className={requirements.length ? 'fas fa-check-circle' : 'fas fa-circle'}></i>
                <span>Minimum 8 karakter</span>
              </div>
              <div className={`requirement ${requirements.number ? 'met' : ''}`} id="reqNumber">
                <i className={requirements.number ? 'fas fa-check-circle' : 'fas fa-circle'}></i>
                <span>Tartalmazzon számot</span>
              </div>
              <div className={`requirement ${requirements.uppercase ? 'met' : ''}`} id="reqUppercase">
                <i className={requirements.uppercase ? 'fas fa-check-circle' : 'fas fa-circle'}></i>
                <span>Tartalmazzon nagybetűt</span>
              </div>
              <div className={`requirement ${requirements.lowercase ? 'met' : ''}`} id="reqLowercase">
                <i className={requirements.lowercase ? 'fas fa-check-circle' : 'fas fa-circle'}></i>
                <span>Tartalmazzon kisbetűt</span>
              </div>
            </div>
            
            {/* Jelszó megerősítés */}
            <div className="input-group-custom">
              <i className="fas fa-lock input-icon"></i>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Jelszó megerősítése" 
                required 
                autoComplete="off"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'is-invalid' : ''}
              />
              <label htmlFor="confirmPassword" className="input-label">Jelszó megerősítése</label>
            </div>
            
            {/* ÁSZF checkbox */}
            <div className="terms-group">
              <div className="terms-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  Elfogadom az <a href="#" onClick={showTerms}>Adatvédelmi irányelveket</a> és 
                  <a href="#" onClick={showTerms}>Felhasználási feltételeket</a>
                </label>
              </div>
            </div>
            
            {/* Regisztráció gomb */}
            <button 
              type="submit" 
              className="register-btn" 
              id="registerButton"
              disabled={isLoading}
            >
              {isLoading ? (
                <><i className="fas fa-spinner fa-spin me-2"></i> Regisztráció folyamatban...</>
              ) : (
                <><span>Regisztráció</span><i className="fas fa-user-plus"></i></>
              )}
            </button>
            
            {/* Bejelentkezés link */}
            <div className="login-section">
              <p>Már van fiókod?</p>
              <a href="#" className="login-link" onClick={goToLogin}>
                <i className="fas fa-arrow-left"></i>
                <span>Bejelentkezés</span>
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

export default Registration;