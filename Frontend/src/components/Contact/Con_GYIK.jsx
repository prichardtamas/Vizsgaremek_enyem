import React from "react";
import { Accordion } from "react-bootstrap";

function FAQSection() {
  return (
    <section className="faq-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="mb-3">Gyakran Ismételt Kérdések</h2>
            <p className="lead">Találd meg gyorsan a választ kérdéseidre.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-10 mx-auto">
            <Accordion defaultActiveKey="faq1">
              <Accordion.Item eventKey="faq1">
                <Accordion.Header>Hogyan jelentkezhetek kurzusra?</Accordion.Header>
                <Accordion.Body>
                  Jelentkezni online az űrlapunkon keresztül, telefonon vagy személyesen is lehet.
                  Online jelentkezés után 24 órán belül felvesszük veled a kapcsolatot a részletek
                  megbeszélésére.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="faq2">
                <Accordion.Header>Van próbaóra lehetőség?</Accordion.Header>
                <Accordion.Body>
                  Igen, minden hangszerhez és kurzustípushoz kínálunk egy ingyenes próbaórát.
                  Ezen megismerkedhetsz az oktatóval, a tanteremmel, és eldöntheted, hogy tetszik-e a
                  kurzus.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="faq3">
                <Accordion.Header>Milyen fizetési lehetőségek vannak?</Accordion.Header>
                <Accordion.Body>
                  Elfogadunk készpénzt, bankkártyát és banki átutalást is. Lehetőség van havi,
                  negyedéves vagy féléves előfizetésre is, utóbbiak esetében kedvezményt biztosítunk.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="faq4">
                <Accordion.Header>Milyen hangszereket lehet kölcsönözni?</Accordion.Header>
                <Accordion.Body>
                  Kölcsönözhető gitárok (akusztikus, elektromos, basszus), billentyűk,
                  dobok, fúvós hangszerek és hegedűk. A kölcsönzés időtartama 1 hónaptól 1 évig
                  terjedhet.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="faq5">
                <Accordion.Header>Van-e korhatár a jelentkezéshez?</Accordion.Header>
                <Accordion.Body>
                  Nincs korhatár! Kurzusaink minden korosztály számára elérhetők, 4 éves kortól
                  felnőtt korig. Minden korosztály számára külön kurzusokat és tananyagot kínálunk.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="text-center mt-5">
              <p>
                Nem találtad a választ?{" "}
                <a 
                  href="#contact" 
                  className="faq-contact-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Kérdezz minket közvetlenül!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;