import React from "react";

const R_Hero = () => {
    return (
        <section className="rental-hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="rental-hero-text">
                            <h1 className="mb-4">
                                Hangszer <span className="text-accent">Kölcsönzés</span>
                            </h1>
                            <p className="lead mb-4">
                                Próbáld ki álmaid hangszereit előzetes nagy beruházás nélkül! Kölcsönözz
                                tőlünk professzionális hangszereket kedvező áron.
                            </p>
                            <div className="hero-stats">
                                <div className="stat">
                                    <span className="stat-number">15</span>
                                    <span className="stat-label">Hangszer kínálat</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Online foglalás</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">30</span>
                                    <span className="stat-label">Napos garancia</span>
                                </div>
                            </div>
                            <div className="hero-buttons d-flex flex-column flex-sm-row gap-3 mt-4">
                                <a href="#instruments" className="btn btn-primary btn-lg">
                                    Hangszerek böngészése
                                </a>
                                <a href="#rental-form" className="btn btn-outline-primary btn-lg">
                                    Kölcsönzési űrlap
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="rental-hero-image">
                            <img
                                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Hangszerkölcsönzés"
                                className="img-fluid rounded"
                            />
                            <div className="floating-offer">
                                <div className="offer-text">Legjobb árak</div>
                                <div className="offer-percent">-15%</div>
                                <div className="offer-subtext">hosszabb kölcsönzésre</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default R_Hero;