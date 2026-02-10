import React from "react";
import zeneiskola from '../../img/zeneiskolaBelso.jpg';

function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="contact-hero-text">
              <h1 className="mb-4">Kapcsolatfelvétel</h1>
              <p className="lead mb-4">
                Kérdéseid vannak? Ötleted? Szeretnél jelentkezni? Itt vagyunk neked! 
                Lépj velünk kapcsolatba bármikor.
              </p>
              <div className="hero-contact-info">
                <div className="d-flex align-items-center mb-3">
                  <div className="contact-icon-hero">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Hívj minket</h4>
                    <p className="mb-0">+36 1 234 5678</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="contact-icon-hero">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Írj nekünk</h4>
                    <p className="mb-0">info@harmoniazene.hu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-hero-image">
              <img 
                src= {zeneiskola}
                alt="Kapcsolatfelvétel" 
                className="img-fluid rounded"
              />
              <div className="contact-hero-overlay">
                <h3>24 órán belül válaszolunk!</h3>
                <p>Átlagos válaszidőnk mindössze 12 óra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;