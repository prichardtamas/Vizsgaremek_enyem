import React from 'react';

const R_Rent = () => {
  const pricingTiers = [
    {
      id: 1,
      title: "Rövid távú",
      duration: "3-6 hónap",
      badge: "Legnépszerűbb",
      highlighted: false,
      features: [
        "Havi bérleti díj",
        "Ingyenes karbantartás",
        "30 napos garancia",
        "Ingyenes személyes átvétel"
      ],
      note: "Ajánlott próbaidőszaknak és rövid projektnek"
    },
    {
      id: 2,
      title: "Közép távú",
      duration: "6-12 hónap",
      badge: "Legjobb érték",
      highlighted: true,
      features: [
        "15% kedvezmény havi díjból",
        "Ingyenes karbantartás + hangolás",
        "90 napos garancia",
        "Ingyenes átvétel + felszerelés"
      ],
      note: "Tökéletes tanuláshoz és hosszabb projektekhez"
    },
    {
      id: 3,
      title: "Hosszú távú",
      duration: "12+ hónap",
      badge: null,
      highlighted: false,
      features: [
        "25% kedvezmény havi díjból",
        "Teljes szervizcsomag",
        "180 napos garancia",
        "Ingyenes átvétel + felszerelés"
      ],
      note: "Ideális profi használatra és hosszú távú beruházás helyett"
    }
  ];

  const terms = [
    {
      id: 1,
      icon: "fas fa-id-card",
      title: "Életkor & Igazolvány",
      description: "Minimum 16 éves kor szükséges. 18 év alattiaknál szülői beleegyezés szükséges. Személyi igazolvány és lakcímkártya bemutatása kötelező."
    },
    {
      id: 2,
      icon: "fas fa-file-signature",
      title: "Szerződés & Költség",
      description: "Kölcsönzési szerződés aláírása kötelező. Biztosítási költség minden kölcsönzésnél felmerül. Kártérítési zálog összege változó."
    },
    {
      id: 3,
      icon: "fas fa-shipping-fast",
      title: "Átvétel & Kézbesítés",
      description: "Kizárólag személyes átvétel iskolánkban lehetséges, előzetes egyeztetés alapján. Házhozszállítás nem biztosított."
    },
    {
      id: 4,
      icon: "fas fa-undo",
      title: "Visszahozatal & Késedelmes díj",
      description: "Hangszer visszahozatala a szerződésben rögzített dátummal egyezően. Késedelmes visszahozatal esetén napi bérleti díj 200%-át számítjuk fel."
    },
    {
      id: 5,
      icon: "fas fa-shield-alt",
      title: "Biztosítás & Felelősség",
      description: "Minden hangszer biztosítva van lopás és sérülés ellen. A kár megfelelő bizonyítását követően állunk. Szerződésszegés esetén teljes kártérítésre vagy peres eljárásra kerül sor."
    }
  ];

  return (
    <section className="pricing-terms py-5 bg-light">
      <div className="container">
        <div className="row">
          {/* Árazási szekció */}
          <div className="col-lg-6">
            <div className="pricing-section">
              <h2 className="mb-4">Kölcsönzési Árak</h2>
              <p className="mb-4">
                Rugalmas árazásunk lehetővé teszi, hogy a számodra legjobb opciót válassza ki.
              </p>

              <div className="pricing-table">
                {pricingTiers.map((tier) => (
                  <div 
                    key={tier.id} 
                    className={`pricing-tier ${tier.highlighted ? 'highlighted' : ''}`}
                  >
                    <div className="tier-header">
                      <h4>{tier.title}</h4>
                      {tier.badge && (
                        <span className="tier-badge">{tier.badge}</span>
                      )}
                    </div>
                    <div className="tier-price">{tier.duration}</div>
                    <div className="tier-features">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="feature">
                          <i className="fas fa-check text-success"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="tier-note">
                      <small>{tier.note}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feltételek szekció */}
          <div className="col-lg-6">
            <div className="terms-section">
              <h2 className="mb-4">Kölcsönzési Feltételek</h2>
              <p className="mb-4">
                Ismerd meg fontos szabályainkat és feltételeinket a zökkenőmentes kölcsönzés érdekében.
              </p>

              <div className="terms-list">
                {terms.map((term) => (
                  <div key={term.id} className="term-item">
                    <div className="term-icon">
                      <i className={term.icon}></i>
                    </div>
                    <div className="term-content">
                      <h5>{term.title}</h5>
                      <p>{term.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default R_Rent;