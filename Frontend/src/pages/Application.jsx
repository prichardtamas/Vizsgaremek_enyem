import React from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import A_Hero from "../components/Application/A_Hero";
import Footer from "../components/Footer";
import A_HowToChoose from "../components/Application/A_HowToChoose";
import A_Teachers from "../components/Application/A_Teachers";
import A_Contact from "../components/Application/A_Contact";

function Application() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/registration");
    };

    return (
        <>
            {/* Navigáció */}
            <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

            {/* Hero szakasz */}
            <A_Hero />

            {/* Hogyan válassz tanárt szakasz */}
            <A_HowToChoose />

            {/* Oktatók listája */}
            <A_Teachers />

            {/* Kapcsolat űrlap */}
            <A_Contact />

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Application;
