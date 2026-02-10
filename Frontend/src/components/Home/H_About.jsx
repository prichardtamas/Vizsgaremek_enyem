import React from "react";
import zeneiskolaBelso2 from "../../img/zeneiskolaBelso2.jpg";

function About() {
    return (
        <section className="about py-5" id="about">
            <div className="container">
                <div className="section-title text-center mb-5">
                    <h2 className="mb-3">Bemutatkozás</h2>
                    <p className="mx-auto">
                        Ismerj meg minket közelebbről, és fedezd fel, mi tesz minket egyedivé a zeneoktatás világában.
                    </p>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="about-text">
                            <h3 className="mb-4">A zene varázslatos világába kalauzolunk</h3>
                            <p className="mb-4">
                                A Harmónia Zeneiskola 2010 óta működik, és mára az ország egyik legnépszerűbb és
                                legmodernebb zenei oktatási intézménye lett. Célunk, hogy mindenki megtalálja a számára
                                megfelelő zenei kifejezési formát, akár hobbiként, akár profi pályafutás céljával.
                            </p>
                            <p className="mb-5">
                                Tantermekeink a legkorszerűbb eszközökkel vannak felszerelve, oktatóink pedig
                                mind aktív zenészek, producerek, akik valódi színpad- és stúdiótapasztalattal rendelkeznek.
                                Hiszünk abban, hogy a zene egyesíti az embereket és fejleszti a kreatív képességeket.
                            </p>

                            <div className="row about-features">
                                <div className="col-md-6 about-feature">
                                    <div className="feature-icon">
                                        <i className="fas fa-graduation-cap"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Professzionális oktatás</h4>
                                        <p className="mb-0">
                                            Minden oktatónk diplomás zenész, akik szeretettel és türelemmel oktatják a diákokat.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6 about-feature">
                                    <div className="feature-icon">
                                        <i className="fas fa-music"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Modern felszereltség</h4>
                                        <p className="mb-0">
                                            Digitális stúdiók, legújabb hangszerek és felszerelések várnak kreativitásodra.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6 about-feature">
                                    <div className="feature-icon">
                                        <i className="fas fa-users"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Közösségi élmény</h4>
                                        <p className="mb-0">
                                            Rendszeres koncertek, workshopok és közös zenei alkalmak várnak diákjainkra.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6 about-feature">
                                    <div className="feature-icon">
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                    <div className="feature-text">
                                        <h4>Rugalmas nyitvatartás</h4>
                                        <p className="mb-0">
                                            Hétfőtől péntekig 14:00–20:00 között, szombaton 10:00–16:00-ig, vasárnap zárva.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="about-stats mt-5 p-4 rounded">
                                <div className="row text-center">
                                    <div className="col-6 col-md-3 stat-item">
                                        <span className="stat-number">13+</span>
                                        <span className="stat-label">Éves tapasztalat</span>
                                    </div>
                                    <div className="col-6 col-md-3 stat-item">
                                        <span className="stat-number">24</span>
                                        <span className="stat-label">Oktató</span>
                                    </div>
                                    <div className="col-6 col-md-3 stat-item">
                                        <span className="stat-number">850+</span>
                                        <span className="stat-label">Elégedett diák</span>
                                    </div>
                                    <div className="col-6 col-md-3 stat-item">
                                        <span className="stat-number">15</span>
                                        <span className="stat-label">Hangszer lehetőség</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <img
                            src={zeneiskolaBelso2}
                            alt="Zeneiskola belső tere"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
