import React, { useState } from "react";
import kovacsAnnaImage from '../../img/kovacs_anna.jpeg';
import szaboDoraImage from '../../img/szabo_dora.jpg';
import tothEmeseImage from '../../img/toth_emese.jpg';
import nemethGaborImage from '../../img/nemeth_gabor.jpg';
import kissRekaImage from '../../img/kiss_reka.jpg';
import kerekesAdamImage from '../../img/kerekes_adam.jpg';
import horvathNoraImage from '../../img/horvath_nora.jpg';
import vargaPetraImage from '../../img/varga_petra.jpeg';
import siposBenceImage from '../../img/sipos_bence.png';

// Tanár adat objektum - KÉP IGZÁÍTÁSI STÍLUSOKKAL
const teachersData = [
    {
        name: "Kovács Anna",
        title: "Zongora tanár, zeneelmélet",
        description: "15+ év tanítási tapasztalat. Kiemelkedő pedagógusi érzékkel rendelkezik, gyerekeket és felnőtteket egyaránt oktat.",
        category: ["piano", "theory"],
        skills: ["Kezdő", "Haladó", "Zeneelmélet"],
        education: "Liszt Ferenc Zeneművészeti Egyetem",
        instruments: "Zongora, Zeneelmélet, Szolfézs",
        schedule: "Hétfő-Csütörtök 14:00-20:00",
        image: kovacsAnnaImage,
        contactTime: "Jelentkezés",
        imagePosition: "25%"
    },
    {
        name: "Szabó Dóra",
        title: "Énektanár - könnyűzene, pop",
        description: "Aktív énekes, aki szereti átadni tapasztalatait. Különösen tinédzserek és felnőttek kedvelik. Stúdiófelvételekre is felkészít.",
        category: ["vocal"],
        skills: ["Kezdő", "Haladó", "Profi"],
        education: "Kőbányai Zenei Stúdió",
        instruments: "Pop Ének, Stúdió technika",
        schedule: "Kedd, Péntek 16:00-20:00",
        image: szaboDoraImage,
        contactTime: "Jelentkezés",
        imagePosition: "5%"
    },
    {
        name: "Tóth Emese",
        title: "Hegedűtanár",
        description: "Gyerekek kedvenc tanára. Kreatív és játékos módszerekkel tanítja a hegedű játék alapjait. 10+ év tanítási tapasztalat.",
        category: ["violin"],
        skills: ["Kezdő", "Haladó", "Versenykészítés"],
        education: "Szegedi Tudományegyetem",
        instruments: "Hegedű, Vonós alapok",
        schedule: "Hétfő, Szerda 14:00-18:00",
        image: tothEmeseImage,
        contactTime: "Jelentkezés",
        imagePosition: "3%"
    },
    {
        name: "Németh Gábor",
        title: "Elektromos gitár tanár",
        description: "Különösen tinédzserek és felnőttek kedvelt tanára. Színpadi tapasztalatokkal rendelkezik, rock és blues specialista.",
        category: ["guitar"],
        skills: ["Kezdő", "Haladó", "Profi"],
        education: "Kőbányai Zenei Stúdió",
        instruments: "Elektromos gitár, Effekt technika",
        schedule: "Hétfő-Csütörtök 17:00-20:00",
        image: nemethGaborImage,
        contactTime: "Jelentkezés",
        imagePosition: "30%"
    },
    {
        name: "Kiss Réka",
        title: "Dobtanár",
        description: "Energikus és motiváló oktató, aki szereti felpezsdíteni a tanórákat. Aktív zenész, jazz és rock specialista.",
        category: ["drums"],
        skills: ["Kezdő", "Haladó", "Zenekari"],
        education: "Kőbányai Zenei Stúdió",
        instruments: "Dob, Ütőhangszerek",
        schedule: "Hétfő, Péntek 16:00-19:00",
        image: kissRekaImage,
        contactTime: "Jelentkezés",
        imagePosition: "20%"
    },
    {
        name: "Kerekes Ádám",
        title: "Zongora tanár - haladó szint",
        description: "Professzionális zongorista, aki főként haladó felnőttek oktatására specializálódott. Jazz és klasszikus specialista.",
        category: ["piano"],
        skills: ["Haladó", "Profi", "Kamarazene"],
        education: "Liszt Ferenc Zeneművészeti Egyetem",
        instruments: "Zongora, Jazz, Improvizáció",
        schedule: "Kedd, Péntek 15:00-19:00",
        image: kerekesAdamImage,
        contactTime: "Jelentkezés",
        imagePosition: "25%"
    },
    {
        name: "Horváth Nóra",
        title: "Jazz ének tanár",
        description: "Kiváló improvizációs készséggel rendelkező oktató, aki átadja a jazz ének titkait. Aktív énekes klubokban.",
        category: ["vocal"],
        skills: ["Haladó", "Profi", "Improvizáció"],
        education: "Liszt Ferenc Zeneművészeti Egyetem",
        instruments: "Jazz Ének, Improvizáció",
        schedule: "Szerda, Péntek 17:00-20:00",
        image: horvathNoraImage,
        contactTime: "Jelentkezés",
        imagePosition: "30%"
    },
    {
        name: "Varga Petra",
        title: "Fuvola tanár",
        description: "Fiatal, lelkes oktató, aki különös figyelmet fordít a helyes légzési technikákra. Főként gyerekeket oktat.",
        category: ["flute"],
        skills: ["Kezdő", "Haladó", "Technika"],
        education: "Debreceni Egyetem",
        instruments: "Fuvola, Fúvós alapok",
        schedule: "Kedd-Csütörtök 14:00-18:00",
        image: vargaPetraImage,
        contactTime: "Jelentkezés",
        imagePosition: "9%"
    },
    {
        name: "Sipos Bence",
        title: "Dobtanár - profi szint",
        description: "Stúdiózenész, aki gazdag tapasztalattal rendelkezik. Főként haladó és profi szinten oktat. Modern technikák specialistája.",
        category: ["drums"],
        skills: ["Haladó", "Profi", "Stúdió"],
        education: "Magánzenei akadémiák",
        instruments: "Dob, Stúdió technika",
        schedule: "Péntek este, Hétvége",
        image: siposBenceImage,
        contactTime: "Jelentkezés",
        imagePosition: "50%"
    }
];

// Filter opciók
const filterOptions = [
    { id: "all", label: "Összes" },
    { id: "piano", label: "Zongora" },
    { id: "guitar", label: "Gitár" },
    { id: "vocal", label: "Ének" },
    { id: "violin", label: "Hegedű" },
    { id: "drums", label: "Dob" },
    { id: "theory", label: "Zeneelmélet" },
    { id: "flute", label: "Fuvola" }
];

const A_Teachers = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  // Görgetés a contact formhoz
  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const filteredTeachers = teachersData.filter((teacher) =>
    filter === "all" ? true : teacher.category.includes(filter)
  );

  return (
    <section className="teachers py-5" id="teachers">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="mb-3">Oktatóink</h2>
          <p className="mx-auto">
            9 tapasztalt és elkötelezett tanárunk szeretettel és türelemmel
            oktatja diákjainkat
          </p>
        </div>

        {/* Filter buttons */}
        <div className="teacher-filters mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className={`btn btn-outline-primary filter-btn ${
                  filter === option.id ? "active" : ""
                }`}
                onClick={() => handleFilterChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="row g-4 teacher-grid">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <div key={index} className="col-lg-4 col-md-6 teacher-card">
                <div className="card h-100 border-0 shadow-hover">
                  <div className="teacher-img-container">
                    {/* KÉP INLINE STÍLUSSAL */}
                    <img
                      src={teacher.image}
                      className="card-img-top"
                      alt={`Tanár: ${teacher.name}`}
                      style={{
                        objectPosition: `center ${teacher.imagePosition || '30%'}`
                      }}
                    />
                  </div>
                  
                  <div className="card-body">
                    <h3 className="teacher-name">{teacher.name}</h3>
                    <p className="teacher-title">{teacher.title}</p>
                    <p className="teacher-description">{teacher.description}</p>

                    <div className="teacher-skills mb-3">
                      {teacher.skills.map((skill, i) => (
                        <span key={i} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="teacher-info">
                      <div className="info-item">
                        <i className="fas fa-graduation-cap"></i>
                        <span>{teacher.education}</span>
                      </div>
                      <div className="info-item">
                        <i className="fas fa-music"></i>
                        <span>{teacher.instruments}</span>
                      </div>
                      <div className="info-item">
                        <i className="fas fa-clock"></i>
                        <span>{teacher.schedule}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent border-top-0">
                    <button 
                      className="btn btn-primary w-100 teacher-contact-btn"
                      onClick={scrollToContact}
                    >
                      {teacher.contactTime}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-5">
              <div className="no-results-box">
                <i className="fas fa-search fa-3x mb-3"></i>
                <h4 className="mb-3">Nincs találat</h4>
                <p className="mb-4">
                  Sajnos nincs oktató a kiválasztott kategóriában. 
                  Próbálj másik szűrőt választani, vagy lépj kapcsolatba velünk!
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleFilterChange("all")}
                >
                  Összes oktató mutatása
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default A_Teachers;