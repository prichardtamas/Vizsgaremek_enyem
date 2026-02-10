import React from "react";

function Events({ onEventClick }) {
    return (
        <section className="events py-5" id="events">
            <div className="container">
                <div className="section-title text-center mb-5">
                    <h2 className="mb-3">Események</h2>
                    <p className="mx-auto">
                        Fedezd fel legfrissebb eseményeinket, koncertjeinket és workshopjainkat.
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-7">
                        <h3 className="mb-4">Közelgő események</h3>

                        <div className="row row-cols-1 gy-4">
                            <div className="col">
                                <div className="event-card">
                                    <div className="d-flex flex-column flex-md-row align-items-start gap-3 mb-3">
                                        <div className="event-date">
                                            <span className="event-day">25</span>
                                            <span className="event-month">OKT</span>
                                        </div>
                                        <div>
                                            <h4 className="event-title">Nyílt nap és próbaórák</h4>
                                            <p className="event-details mb-2">
                                                Ismerd meg iskolánkat, találkozz oktatóinkkal, és próbálj ki hangszereket ingyenes próbaórákon.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pt-3 border-top">
                                        <div className="event-location mb-2 mb-md-0">
                                            <i className="fas fa-map-marker-alt me-2"></i>
                                            <span>Fő épület, Nagytér</span>
                                        </div>
                                        <button className="btn btn-outline-primary" onClick={onEventClick}>
                                            Részletek
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="event-card">
                                    <div className="d-flex flex-column flex-md-row align-items-start gap-3 mb-3">
                                        <div className="event-date">
                                            <span className="event-day">05</span>
                                            <span className="event-month">NOV</span>
                                        </div>
                                        <div>
                                            <h4 className="event-title">Diákok estje - Akusztikus koncert</h4>
                                            <p className="event-details mb-2">
                                                Tehetséges diákjaink bemutatkoznak egy különleges akusztikus koncerten. Szavazhatsz a közönségdíjra!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pt-3 border-top">
                                        <div className="event-location mb-2 mb-md-0">
                                            <i className="fas fa-map-marker-alt me-2"></i>
                                            <span>Kisterem, 1. emelet</span>
                                        </div>
                                        <button className="btn btn-outline-primary" onClick={onEventClick}>
                                            Részletek
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="event-card">
                                    <div className="d-flex flex-column flex-md-row align-items-start gap-3 mb-3">
                                        <div className="event-date">
                                            <span className="event-day">15</span>
                                            <span className="event-month">NOV</span>
                                        </div>
                                        <div>
                                            <h4 className="event-title">Zenei Produkciós Workshop</h4>
                                            <p className="event-details mb-2">
                                                Tanuld meg a digitális zeneszerkesztés alapjait professzionális producerektől. Kezdőknek és haladóknak.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pt-3 border-top">
                                        <div className="event-location mb-2 mb-md-0">
                                            <i className="fas fa-map-marker-alt me-2"></i>
                                            <span>Stúdió A, 2. emelet</span>
                                        </div>
                                        <button className="btn btn-outline-primary" onClick={onEventClick}>
                                            Részletek
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="info-box">
                            <h3 className="mb-4">Miért érdemes részt venni eseményeinken?</h3>
                            <p className="mb-4">
                                Eseményeink nem csupán szórakozás, hanem lehetőséget kínálnak a fejlődésre, új kapcsolatok építésére és a zenei közösség részévé válásra.
                            </p>

                            <div className="info-features">
                                <div className="d-flex mb-4">
                                    <div className="me-3 text-accent">
                                        <i className="fas fa-handshake fa-2x"></i>
                                    </div>
                                    <div>
                                        <h4>Közösségépítés</h4>
                                        <p className="mb-0">
                                            Találkozz más zenész lelkesekkel, építs kapcsolatokat és alkoss együtt.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <div className="me-3 text-accent">
                                        <i className="fas fa-chart-line fa-2x"></i>
                                    </div>
                                    <div>
                                        <h4>Fejlődési lehetőség</h4>
                                        <p className="mb-0">
                                            Workshopjainkon új technikákat sajátíthatsz el, koncertjeinken pedig színpadi gyakorlatot szerezhetsz.
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <div className="me-3 text-accent">
                                        <i className="fas fa-gift fa-2x"></i>
                                    </div>
                                    <div>
                                        <h4>Ajándékok és meglepetések</h4>
                                        <p className="mb-0">
                                            Rendszeresen készítünk ajándékokat, kedvezményeket és meglepetéseket a résztvevők számára.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="hours-box">
                                <h4 className="mb-4">Események időpontjai</h4>
                                <div className="hours-list">
                                    <div className="hour-item">
                                        <span className="hour-day">Hétfő - Péntek</span>
                                        <span className="hour-time">16:00 - 20:00</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="hour-day">Szombat</span>
                                        <span className="hour-time">10:00 - 18:00</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="hour-day">Vasárnap</span>
                                        <span className="hour-time">Zárt (kivéve különleges események)</span>
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

export default Events;
