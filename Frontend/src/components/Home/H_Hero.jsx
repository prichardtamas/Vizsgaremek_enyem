import React from "react";
import zeneiskolaBelso from "../../img/zeneiskolaBelso.jpg";

function Hero({ onRegisterClick }) {
    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-text mb-5 mb-lg-0">
                            <h1 className="mb-4">
                                Üdvözöl a <span>Harmónia Zeneiskola</span>
                            </h1>
                            <p className="mb-4">
                                Modern zeneiskola, ahol kreativitás, inspiráció és kiváló oktatás találkozik.
                                Kezdőktől a haladóig, minden korosztálynak.
                            </p>
                            <div className="hero-buttons d-flex flex-column flex-sm-row gap-3">
                                <button className="btn btn-primary" onClick={onRegisterClick}>
                                    Kapcsolat felvétel
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="hero-image">
                            <img
                                src={zeneiskolaBelso}
                                alt="Zeneiskola tantermi kép"
                                className="img-fluid"
                            />
                            <div className="floating-elements">
                                <div className="music-note note-1">
                                    <i className="fas fa-music"></i>
                                </div>
                                <div className="music-note note-2">
                                    <i className="fas fa-guitar"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
