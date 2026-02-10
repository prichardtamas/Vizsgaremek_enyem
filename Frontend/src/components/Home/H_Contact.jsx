import React from "react";

function Contact({ onSubmit }) {
    return (
        <section className="contact py-5" id="contact">
            <div className="container">
                <div className="section-title text-center mb-5">
                    <h2 className="mb-3">Kapcsolat</h2>
                    <p className="mx-auto">
                        Lépj velünk kapcsolatba bármilyen kérdéssel, jelentkezéssel vagy információkért.
                    </p>
                </div>

                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="contact-info">
                            <h3 className="mb-4">Keress minket bátran!</h3>
                            <p className="mb-5">
                                Ha bármilyen kérdésed van az iskolánkkal, kurzusainkkal vagy eseményeinkkel kapcsolatban, állunk rendelkezésedre. Célunk, hogy minél hamarabb válaszoljunk minden megkeresésre.
                            </p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Címünk</h4>
                                        <p>
                                            1061, Budapest Jókai tér 1.
                                            <br />
                                            II. emelet, ajtó 12.
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Telefonszám</h4>
                                        <p>
                                            +36 1 234 5678
                                            <br />
                                            +36 30 123 4567 (mobil)
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Email cím</h4>
                                        <p>
                                            info@harmoniazene.hu
                                            <br />
                                            jelentkezes@harmoniazene.hu
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="hours-box">
                                <h4 className="mb-4">Nyitvatartás</h4>
                                <div className="hours-list">
                                    <div className="hour-item">
                                        <span className="hour-day">Hétfő - Péntek</span>
                                        <span className="hour-time">14:00 - 20:00</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="hour-day">Szombat</span>
                                        <span className="hour-time">10:00 - 16:00</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="hour-day">Vasárnap</span>
                                        <span className="hour-time">Zárva</span>
                                    </div>
                                </div>
                            </div>

                            <div className="map-container mt-5">
                                <div className="map-embed">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.546959963268!2d19.05062427685681!3d47.49935827118095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc3d8e0d4f5b%3A0x5c3168c4e1c7c2d9!2sBudapest%2C%20J%C3%B3kai%20t%C3%A9r%201%2C%201061!5e0!3m2!1shu!2shu!4v1700000000000!5m2!1shu!2shu"
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Harmónia Zeneiskola helyszíne - 1061 Budapest, Jókai tér 1"
                                    />
                                    <div className="map-overlay">
                                        <div className="map-info">
                                            <h4>
                                                <i className="fas fa-map-marker-alt"></i> Helyszínünk
                                            </h4>
                                            <p>
                                                <strong>1061 Budapest, Jókai tér 1.</strong>
                                            </p>
                                            <p className="map-note">
                                                <i className="fas fa-info-circle"></i> Kattints a térképre részletes utasításokért!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="contact-form-box">
                            <h3 className="mb-4">Küldj üzenetet</h3>
                            <form id="contactForm" onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Teljes név *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Kovács János"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email cím *
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="pelda@email.hu"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Telefonszám
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="+36 20 123 4567"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">
                                        Ügy típusa *
                                    </label>
                                    <select
                                        className="form-select"
                                        id="subject"
                                        name="subject"
                                        required
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Válassz egy opciót
                                        </option>
                                        <option value="jelentkezes">Jelentkezés kurzusra</option>
                                        <option value="informacio">További információk</option>
                                        <option value="esemeny">Eseményekről információk</option>
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
                                        required
                                        placeholder="Írd ide üzeneted részleteit..."
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 py-3">
                                    Üzenet küldése
                                </button>
                            </form>

                            <div
                                className="mt-4 p-3 rounded"
                                style={{ backgroundColor: "rgba(29, 211, 198, 0.05)" }}
                            >
                                <h4 className="h5 mb-2">
                                    <i className="fas fa-info-circle me-2"></i> Gyakran feltett kérdések
                                </h4>
                                <p className="mb-0 small">
                                    Általában 24 órán belül válaszolunk minden megkeresésre. Sürgős esetben hívj minket a
                                    +36 30 123 4567-es számon!
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
