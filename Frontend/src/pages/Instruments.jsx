// pages/Instruments.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Instruments oldal specifikus komponensek
import I_Hero from '../components/Instruments/I_Hero';
import I_Carousel from '../components/Instruments/I_Carousel';
import { categories } from '../components/Instruments/I_Data';  // adatok importálása

// CSS
import '../styles/global.css';

const Instruments = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    const handleRegisterClick = () => {
        navigate("/registration");
    };

    return (
        <>
            <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />
            <I_Hero />
            {/* ITT ADJUK ÁT AZ ADATOKAT A CAROUSELNEK! */}
            <I_Carousel categories={categories} />
            <Footer />
        </>
    );
};

export default Instruments;