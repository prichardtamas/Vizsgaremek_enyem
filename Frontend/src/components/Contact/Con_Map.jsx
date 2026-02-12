import React from "react";

function ContactMap() {
  // Útvonaltervezés Google Maps-re
  const handleDirections = (e) => {
    e.preventDefault();
    const address = "1061 Budapest, Jókai tér 1";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  // Parkolási információk
  const handleParkingInfo = (e) => {
    e.preventDefault();
    alert("Parkolási lehetőségek:\n\n• Deák téri parkolóház (0-24)\n• Utcai parkoló a környéken\n• Jókai tér aluljáró parkoló\n\nÁrak: 500 Ft/óra");
  };

  return (
    <section className="contact-map py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="mb-3">Helyszínünk</h2>
            <p className="lead">
              Könnyen megközelíthető helyen található iskolánk, Budapest szívében.
            </p>
          </div>
        </div>

        <div className="map-container-large position-relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.546959963268!2d19.05062427685681!3d47.49935827118095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc3d8e0d4f5b%3A0x5c3168c4e1c7c2d9!2sBudapest%2C%20J%C3%B3kai%20t%C3%A9r%201%2C%201061!5e0!3m2!1shu!2shu!4v1700000000000!5m2!1shu!2shu"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Harmónia Zeneiskola helyszíne - 1061 Budapest, Jókai tér 1"
          ></iframe>

          {/* Összes overlay eltávolítva */}
        </div>
      </div>
    </section>
  );
}

export default ContactMap;