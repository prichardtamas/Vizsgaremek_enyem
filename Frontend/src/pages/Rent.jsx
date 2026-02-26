import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import R_Hero from "../components/Rent/R_Hero";
import R_Info from "../components/Rent/R_Info";
import R_Instruments from "../components/Rent/R_Instruments";
import R_Rent from "../components/Rent/R_Rent";
import R_Form from "../components/Rent/R_Form";
import Footer from "../components/Footer";

const Rent = () => {
   const navigate = useNavigate();
   const [selectedInstrument, setSelectedInstrument] = useState(null);

   const handleLoginClick = () => {
      navigate("/login");
   };

   const handleRegisterClick = () => {
      navigate("/registration");
   };

   const handleRentClick = (instrument) => {
      setSelectedInstrument(instrument);
   };

   return (
      <>
         {/* Navigáció */}
         <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

         {/* Hero szakasz */}
         <R_Hero />

         {/* Hogyan válassz tanárt szakasz */}
         <R_Info />

         {/* Hangszerek listája - most már kapja az onRentClick prop-ot */}
         <R_Instruments onRentClick={handleRentClick} />

         {/* Kapcsolat űrlap */}
         <R_Rent />

         {/* Kölcsönzési űrlap - most már kapja a selectedInstrument prop-ot */}
         <R_Form selectedInstrument={selectedInstrument} />

         {/* Footer */}
         <Footer />
      </>
   );
};

export default Rent;