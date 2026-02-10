import React from 'react';
import Navbar from "../components/Navbar";
import R_Hero from "../components/Rent/R_Hero";
import R_Info from "../components/Rent/R_Info";
import R_Instruments from "../components/Rent/R_Instruments";
import R_Rent from "../components/Rent/R_Rent";
import R_Form from "../components/Rent/R_Form";
import Footer from "../components/Footer";

const Rent = () => {
  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  const handleRegisterClick = () => {
    console.log("Register clicked");
  };
  return (
    <>
      {/* Navigáció */}
      <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />

      {/* Hero szakasz */}
      <R_Hero />

      {/* Hogyan válassz tanárt szakasz */}
      <R_Info />

      {/* Oktatók listája */}
      <R_Instruments />

      {/* Kapcsolat űrlap */}
      <R_Rent />

      <R_Form />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Rent;