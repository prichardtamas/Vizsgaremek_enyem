import React, { useState } from 'react';

const A_Contact = () => {
    const [formData, setFormData] = useState({
        teacher: '',
        studentName: '',
        studentAge: '',
        studentLevel: '',
        parentName: '',
        contactEmail: '',
        contactPhone: '',
        teacherMessage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Itt lehet feldolgozni az űrlapadatokat, pl. küldeni egy API-nak
        console.log(formData);
    };

    return (
        <section className="contact py-5" id="contact">
            <div className="container">
                <div className="section-title text-center mb-5">
                    <h2 className="mb-3">Jelentkezés tanárhoz</h2>
                    <p className="mx-auto">Válaszd ki a számodra legmegfelelőbb tanárt, és küldd el jelentkezésedet</p>
                </div>

                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="contact-info">
                            <h3 className="mb-4">Miért érdemes nálunk tanulni?</h3>
                            <p className="mb-5">9 tapasztalt tanárunk nem csupán kiváló zenészek, hanem elkötelezett pedagógusok is. Minden
                                diákunk számára személyre szabott oktatási tervet készítünk, hogy a lehető leghatékonyabban
                                fejlődjön.</p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Személyre szabott tanterv</h4>
                                        <p>Minden diák számára egyéni tantervet készítünk a céljai és szintje alapján.</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-calendar-check"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Rugalmas időpontok</h4>
                                        <p>Naponta 8-22 óráig tartunk nyitva, hogy mindenki megtalálja a számára megfelelő
                                            időpontot.</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-award"></i>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Minőségi oktatás</h4>
                                        <p>Minden oktatónk diplomás zenész, akik szeretettel és türelemmel oktatják a
                                            diákokat.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="hours-box">
                                <h4 className="mb-4">Próbaórák időpontja</h4>
                                <div className="hours-list">
                                    <div className="hour-item">
                                        <span className="hour-day">Hétfő - Péntek</span>
                                        <span className="hour-time">14:00 - 20:00</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="hour-day">Szombat</span>
                                        <span className="hour-time">10:00 - 16:00</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="hour-day">Vasárnap</span>
                                        <span className="hour-time">Zárva</span>
                                    </div>
                                </div>
                                <p className="mt-3 small text-muted"><i className="fas fa-info-circle me-2"></i>Próbaórák időpontját
                                    előre egyeztetni kell</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="contact-form-box">
                            <h3 className="mb-4">Jelentkezési űrlap</h3>
                            <form onSubmit={handleSubmit} id="teacherContactForm">
                                <div className="mb-3">
                                    <label htmlFor="teacherSelect" className="form-label">Kívánt tanár *</label>
                                    <select
                                        className="form-select"
                                        id="teacherSelect"
                                        name="teacher"
                                        value={formData.teacher}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled selected>Válassz egy tanárt</option>
                                        <option value="Kovács Anna">Kovács Anna (Zongora)</option>
                                        <option value="Szabó Dóra">Szabó Dóra (Ének - pop)</option>
                                        <option value="Tóth Emese">Tóth Emese (Hegedű)</option>
                                        <option value="Németh Gábor">Németh Gábor (Elektromos gitár)</option>
                                        <option value="Kiss Réka">Kiss Réka (Dob)</option>
                                        <option value="Kerekes Ádám">Kerekes Ádám (Zongora - haladó)</option>
                                        <option value="Horváth Nóra">Horváth Nóra (Jazz ének)</option>
                                        <option value="Varga Petra">Varga Petra (Fuvola)</option>
                                        <option value="Sipos Bence">Sipos Bence (Dob - profi)</option>
                                        <option value="egyeb">Nem tudom, segítsetek!</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="studentName" className="form-label">Tanuló neve *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="studentName"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Kovács János"
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="studentAge" className="form-label">Kor *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="studentAge"
                                            name="studentAge"
                                            value={formData.studentAge}
                                            onChange={handleChange}
                                            required
                                            min="4"
                                            max="99"
                                            placeholder="25"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="studentLevel" className="form-label">Szint *</label>
                                        <select
                                            className="form-select"
                                            id="studentLevel"
                                            name="studentLevel"
                                            value={formData.studentLevel}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled selected>Válassz szintet</option>
                                            <option value="kezdo">Teljesen kezdő</option>
                                            <option value="alap">Alapfokú ismeretek</option>
                                            <option value="halado">Haladó</option>
                                            <option value="profi">Profi szint</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="parentName" className="form-label">Szülő neve (gyermek esetén)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="parentName"
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        placeholder="Kovácsné Nagy Éva"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contactEmail" className="form-label">Email cím *</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="contactEmail"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        required
                                        placeholder="pelda@email.hu"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contactPhone" className="form-label">Telefonszám *</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="contactPhone"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+36 20 123 4567"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="teacherMessage" className="form-label">Üzenet *</label>
                                    <textarea
                                        className="form-control"
                                        id="teacherMessage"
                                        name="teacherMessage"
                                        rows="4"
                                        value={formData.teacherMessage}
                                        onChange={handleChange}
                                        required
                                        placeholder="Írd ide, milyen hangszeren/területen szeretnél tanulni, milyen céljaid vannak..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary w-100 py-3">Jelentkezés elküldése</button>
                            </form>

                            <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(29, 211, 198, 0.05)' }}>
                                <h4 className="h5 mb-2">
                                    <i className="fas fa-clock me-2"></i> Mire számíthatsz jelentkezés után
                                </h4>
                                <p className="mb-0 small">
                                    1 munkanapon belül felvesszük veled a kapcsolatot a megadott telefonszámon, hogy
                                    megegyezzünk a próbaóra időpontjában.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default A_Contact;
