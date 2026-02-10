import React from "react";
import { NavLink } from "react-router-dom";
import logo_feherHatter from "../img/logo_feherHatter.png";

function Footer() {
    return (
        <footer className="pt-5">
            <div className="container">
                <div className="row g-5 mb-5">
                    <div className="col-lg-4">
                        <div className="footer-about">
                            <div className="footer-logo mb-4">
                                <img
                                    src={logo_feherHatter}
                                    alt="Harmónia Zeneiskola logó"
                                    className="footer-logo-img"
                                />
                                Harmónia<span>Zene</span>
                            </div>
                            <p className="mb-4">
                                Modern zeneiskola, ahol a kreativitás és a szakma találkozik. Célunk, hogy
                                mindenki megtalálja a zenei önkifejezés módját.
                            </p>
                            <div className="social-icons d-flex gap-3">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-tiktok"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4">
                        <div className="footer-links">
                            <h3 className="mb-4">Oldalak</h3>
                            <ul>
                                <li>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Kezdőlap
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/courses"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Kurzusok
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/teachers"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Tanárok
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/instruments"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Hangszerek
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/rent"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Kölcsönzés
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/events"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Események
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/contact"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Kapcsolat
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4">
                        <div className="footer-links">
                            <h3 className="mb-4">Hasznos Linkek</h3>
                            <ul>
                                <li>
                                    <NavLink 
                                        to="/login"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Bejelentkezés
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/register"
                                        className={({ isActive }) => 
                                            isActive ? "active" : ""
                                        }
                                    >
                                        Regisztráció
                                    </NavLink>
                                </li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}>Általános Szerződési Feltételek</a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}>Adatvédelmi Tájékoztató</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="footer-links">
                            <h3 className="mb-4">Gyors elérhetőség</h3>
                            <ul className="contact-info list-unstyled">
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="fas fa-map-marker-alt me-3 mt-1"></i>
                                    <span>1061, Budapest Jókai tér 1.</span>
                                </li>
                                <li className="d-flex align-items-start">
                                    <i className="fas fa-phone me-3 mt-1"></i>
                                    <span>+36 1 234 5678</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="copyright pt-4">
                    <p className="text-center mb-0">
                        &copy; 2023 Harmónia Zeneiskola. Minden jog fenntartva. |
                        <a href="#" style={{ color: "#1DD3C6" }}>Adatvédelmi irányelvek</a> |
                        <a href="#" style={{ color: "#1DD3C6" }}>Impresszum</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;