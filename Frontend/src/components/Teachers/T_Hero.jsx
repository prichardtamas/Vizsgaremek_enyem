
const T_Hero = () => {

  const handleRegisterClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 mx-auto text-center">
            <div className="hero-text">
              <h1 className="mb-4">
                Ismerd meg <span>tanárainkat</span>
              </h1>

              <p className="mb-4">
                9 kiváló oktatónk aktív zenészek, producerek, akik valódi
                színpad- és stúdiótapasztalattal rendelkeznek. Mindenki
                megtalálja nálunk a legjobb tanárt!
              </p>

              <div className="hero-buttons d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={handleRegisterClick}
                >
                  Jelentkezés tanárhoz
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default T_Hero;
