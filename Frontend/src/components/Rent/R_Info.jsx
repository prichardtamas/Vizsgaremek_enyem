import React from "react";

const R_Info = () => {
  return (
    <section className="how-it-works py-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="mb-3">Hogyan működik a kölcsönzés?</h2>
          <p className="mx-auto">
            Négy egyszerű lépésben bérelhetsz hangszert tőlünk
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4>Hangszer választás</h4>
              <p>
                Tallózz kínálatunkban és válaszd ki a számodra megfelelő hangszert.
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h4>Időpont foglalás</h4>
              <p>
                Válaszd ki a kölcsönzés időtartamát és foglald le online időpontod.
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <h4>Szerződéskötés</h4>
              <p>Írd alá a kölcsönzési szerződést személyesen.</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">
                <i className="fas fa-guitar"></i>
              </div>
              <h4>Átvétel & élvezet</h4>
              <p>Vedd át a hangszert és élvezd a zene alkotás örömét!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default R_Info;
