import React, { useState } from "react";

function ContactMain() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Itt lehet API hívás vagy form kezelés
    alert("Üzenet elküldve! Hamarosan felvesszük Önnel a kapcsolatot.");
    // Form reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
      newsletter: false
    });
  };

  return (
    <section className="contact-main py-5">
      <div className="container">
        <div className="row g-5">
          {/* Kapcsolat Űrlap */}
          <div className="col-lg-7">
            <div className="contact-form-container">
              <h2 className="mb-4">Küldj nekünk üzenetet</h2>
              <p className="mb-5">
                Töltsd ki az alábbi űrlapot, és mi hamarosan felvesszük veled a kapcsolatot.
              </p>

              <form id="contactFormMain" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="firstName" className="form-label">
                      Keresztnév *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="lastName" className="form-label">
                      Vezetéknév *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="email" className="form-label">
                      Email cím *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="phone" className="form-label">
                      Telefonszám
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="topic" className="form-label">
                    Ügy típusa *
                  </label>
                  <select
                    className="form-select"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Válassz egy opciót
                    </option>
                    <option value="jelentkezes">Jelentkezés kurzusra</option>
                    <option value="informacio">Általános információ</option>
                    <option value="tanar">Tanár információ</option>
                    <option value="eszkoz">Hangszer kölcsönzés</option>
                    <option value="esemeny">Esemény információk</option>
                    <option value="egyeb">Egyéb ügy</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label">
                    Üzenet *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength="2000"
                    required
                  ></textarea>
                  <div className="form-text mt-2">
                    Maximális karakterhossz: 2000 | Karakterek: {formData.message.length}/2000
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="newsletter">
                      Szeretnék feliratkozni a hírlevélre, hogy értesüljek az újdonságokról és
                      akciókról.
                    </label>
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Üzenet küldése
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Kapcsolat Információk */}
          <div className="col-lg-5">
            <div className="contact-info-sidebar">
              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Címünk</h3>
                </div>
                <div className="contact-card-body">
                  <p>
                    <strong>Harmónia Zeneiskola</strong>
                    <br />
                    1061 Budapest, Jókai tér 1.
                    <br />
                    II. emelet, ajtó 12.
                  </p>

                  <div className="mt-4">
                    <h5>Közlekedési lehetőségek</h5>
                    <ul className="transport-list">
                      <li>
                        <i className="fas fa-subway"></i> M1/M2/M3 metró - Deák tér
                      </li>
                      <li>
                        <i className="fas fa-bus"></i> Busz: 9, 16, 105, 178
                      </li>
                      <li>
                        <i className="fas fa-tram"></i> Villamos: 47, 49
                      </li>
                      <li>
                        <i className="fas fa-parking"></i> Parkolóház: Deák tér
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-clock"></i>
                  <h3>Nyitvatartás</h3>
                </div>
                <div className="contact-card-body">
                  <div className="opening-hours">
                    <div className="opening-item">
                      <span className="day">Hétfő - Péntek</span>
                      <span className="hours">14:00 - 20:00</span>
                    </div>
                    <div className="opening-item">
                      <span className="day">Szombat</span>
                      <span className="hours">10:00 - 16:00</span>
                    </div>
                    <div className="opening-item">
                      <span className="day">Vasárnap</span>
                      <span className="hours">Zárva</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="note">
                      <i className="fas fa-info-circle"></i> Nyitvatartási idő ünnepekkor
                      változhat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-header">
                  <i className="fas fa-headset"></i>
                  <h3>Gyorskapcsolatok</h3>
                </div>
                <div className="contact-card-body">
                  <div className="quick-contacts">
                    <div className="quick-contact-item">
                      <h5>Általános információk</h5>
                      <p>
                        <i className="fas fa-phone"></i> +36 1 234 5678
                        <br />
                        <i className="fas fa-envelope"></i> info@harmoniazene.hu
                      </p>
                    </div>

                    <div className="quick-contact-item">
                      <h5>Jelentkezés kurzusokra</h5>
                      <p>
                        <i className="fas fa-phone"></i> +36 1 234 5679
                        <br />
                        <i className="fas fa-envelope"></i> jelentkezes@harmoniazene.hu
                      </p>
                    </div>

                    <div className="quick-contact-item">
                      <h5>Hangszer kölcsönzés</h5>
                      <p>
                        <i className="fas fa-phone"></i> +36 1 234 5680
                        <br />
                        <i className="fas fa-envelope"></i> kolcsonzes@harmoniazene.hu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMain;