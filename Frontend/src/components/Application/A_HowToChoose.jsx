import React from "react";

const A_HowToChoose = () => {
  return (
    <section className="how-to-choose py-5 bg-light">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="mb-3">Hogyan válassz tanárt?</h2>
          <p className="mx-auto">
            Néhány tipp, hogy megtaláld a számodra legmegfelelőbb oktatót
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="choose-card text-center p-4 h-100">
              <div className="choose-icon mb-4">
                <i className="fas fa-music"></i>
              </div>
              <h4 className="mb-3">Zenei stílus</h4>
              <p className="mb-0">
                Válaszd ki, milyen stílusban szeretnél tanulni (klasszikus,
                jazz, pop, rock stb.)
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="choose-card text-center p-4 h-100">
              <div className="choose-icon mb-4">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h4 className="mb-3">Szint</h4>
              <p className="mb-0">
                Fontos, hogy a tanár a te szintedhez alkalmazkodjon (kezdő,
                haladó, profi)
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="choose-card text-center p-4 h-100">
              <div className="choose-icon mb-4">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h4 className="mb-3">Időbeosztás</h4>
              <p className="mb-0">
                Ellenőrizd, hogy a tanár időpontjai illeszkednek-e a te
                rendelkezésre állásodhoz
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="choose-card text-center p-4 h-100">
              <div className="choose-icon mb-4">
                <i className="fas fa-comments"></i>
              </div>
              <h4 className="mb-3">Próbaóra</h4>
              <p className="mb-0">
                Kérj próbaórát, hogy megismerd a tanár oktatási stílusát és
                személyiségét
              </p>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default A_HowToChoose;
