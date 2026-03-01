// components/Events/E_Hero.jsx
import React from 'react';

const E_Hero = ({ onContactClick }) => {
    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-text mb-5 mb-lg-0">
                            <h1 className="mb-4">Zenei <span>Események</span></h1>
                            <p className="mb-4">Fedezd fel legfrissebb eseményeinket, koncertjeinket, workshopjainkat és
                                tevékenységeinket. Bővítsd zenei horizontodat és találkozz más zenész lelkesekkel.</p>
                            <div className="hero-buttons d-flex flex-column flex-sm-row gap-3">
                                <button className="btn btn-primary" onClick={onContactClick}>
                                    Esemény jelentés
                                </button>
                                <a href="#calendar-section" className="btn btn-outline-primary">
                                    Nézd meg a naptárt
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-image">
                            <img src="src/img/koncert.png" alt="Zenei esemény képe" className="img-fluid" />
                            <div className="floating-elements">
                                <div className="music-note note-1"><i className="fas fa-calendar-alt"></i></div>
                                <div className="music-note note-2"><i className="fas fa-microphone"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default E_Hero;