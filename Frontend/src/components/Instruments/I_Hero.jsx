// HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    const handleConsultClick = () => {
        alert("Köszönjük érdeklődésed a hangszer konzultációért! Hamarosan felvesszük veled a kapcsolatot a megadott információkkal.");
    };

    const handleRentClick = () => {
        navigate('/kolcsonzes');
    };

    return (
        <section className="page-hero" id="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 mx-auto">
                        <div className="hero-text text-center">
                            <h1 className="mb-4">A Hangszerek <span>Világa</span></h1>
                            <p className="mb-4">Fedezd fel a különböző hangszercsaládokat, jellemzőiket és működésüket. Ismerd meg, melyik hangszert milyen zenei stílusokhoz használják és miben különböznek egymástól.</p>
                            <div className="hero-buttons d-flex justify-content-center gap-3">
                                <button className="btn btn-primary" onClick={handleConsultClick}>
                                    Hangszer Konzultáció
                                </button>
                                <button className="btn btn-outline-primary" onClick={handleRentClick}>
                                    Hangszer Kölcsönzés
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;