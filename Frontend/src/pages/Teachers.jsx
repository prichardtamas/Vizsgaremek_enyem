import React from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import T_Hero from "../components/Teachers/T_Hero";
import Footer from "../components/Footer";
import T_HowToChoose from "../components/Teachers/T_HowToChoose";
import T_Teachers from "../components/Teachers/T_Teachers";
import T_Contact from "../components/Teachers/T_Contact";

function Teachers() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    const handleRegisterClick = () => {
        navigate("/registration");
    };

    return (
        <>
            {/* Navigáció */}
            <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

            {/* Hero szakasz */}
            <T_Hero />

            {/* Hogyan válassz tanárt szakasz */}
            <T_HowToChoose />

            {/* Oktatók listája */}
            <T_Teachers />

            {/* Kapcsolat űrlap */}
            <T_Contact />

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Teachers;
