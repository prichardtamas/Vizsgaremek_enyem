import React from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Con_Hero from "../components/Contact/Con_Hero";
import Con_Contact from "../components/Contact/Con_Contact";
import Con_Map from "../components/Contact/Con_Map";
import Con_GYIK from "../components/Contact/Con_GYIK";


const Contact = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    alert("Bejelentkezési oldal hamarosan elérhető!");
  };

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  return (
    <>
      {/* Navigáció */}
      <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

      {/* Hero szakasz */}
      <Con_Hero />

      {/* Kapcsolat űrlap */}
      <Con_Contact />

      {/* Térkép */}
      <Con_Map />

      {/* GYIK */}
      <Con_GYIK />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;