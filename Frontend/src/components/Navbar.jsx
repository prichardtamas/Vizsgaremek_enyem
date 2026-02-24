import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.png";

function Navbar({ onLogin, onRegister }) {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">

                {/* LOGÓ – Kezdőlap */}
                <NavLink 
                    className="navbar-brand me-4" 
                    to="/"
                    onClick={handleScrollToTop}
                >
                    <img
                        src={logo}
                        alt="Harmónia Zeneiskola logó"
                        className="logo-img"
                    />
                    <span className="brand-text">
                        Harmónia<span>Zene</span>
                    </span>
                </NavLink>

                {/* HAMBURGER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* MENÜ */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">

                        {/* Kezdőlap */}
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Kezdőlap
                            </NavLink>
                        </li>

                        {/* Tanárok */}
                        <li className="nav-item">
                            <NavLink
                                to="/application"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Jelentkezés
                            </NavLink>
                        </li>

                        {/* Hangszerek */}
                        <li className="nav-item">
                            <NavLink
                                to="/instruments"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Hangszerek
                            </NavLink>
                        </li>

                        {/* Kölcsönzés */}
                        <li className="nav-item">
                            <NavLink
                                to="/rent"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Kölcsönzés
                            </NavLink>
                        </li>

                        {/* Események */}
                        <li className="nav-item">
                            <NavLink
                                to="/events"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Események
                            </NavLink>
                        </li>

                        {/* Kapcsolat */}
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Kapcsolat
                            </NavLink>
                        </li>

                        {/* Admin */}
                        <li className="nav-item">
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                onClick={handleScrollToTop}
                            >
                                Admin
                            </NavLink>
                        </li>

                    </ul>

                    {/* GOMBOK */}
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-secondary-custom"
                            onClick={() => {
                                handleScrollToTop();
                                if (onLogin) onLogin();
                            }}
                        >
                            Bejelentkezés
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleScrollToTop();
                                if (onRegister) onRegister();
                            }}
                        >
                            Regisztráció
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;