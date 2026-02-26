import React, { useState, useEffect } from 'react';

const R_Form = ({ selectedInstrument }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // 1. lépés - Személyes adatok
        rentalFirstName: '',
        rentalLastName: '',
        rentalEmail: '',
        rentalPhone: '',
        rentalAddress: '',
        rentalBirthDate: '',

        // 2. lépés - Hangszer adatok
        instrumentSelect: '',
        rentalPeriod: '',
        startDate: '',

        // 3. lépés - Egyéb információk
        experienceLevel: '',
        purpose: '',
        additionalNotes: '',
        agreeTerms: false
    });

    // Külön állapot a dátum mezőkhöz
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');

    const [startYear, setStartYear] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startDay, setStartDay] = useState('');

    const instruments = [
        { value: 'fender_strat', label: 'Fender Stratocaster - 5.990 Ft/hó' },
        { value: 'yamaha_p125', label: 'Yamaha P-125 Digitális Zongora - 8.490 Ft/hó' },
        { value: 'pearl_drums', label: 'Pearl Export Dobfelszerelés - 12.990 Ft/hó' },
        { value: 'stentor_violin', label: 'Stentor Student II Hegedű - 3.990 Ft/hó' },
        { value: 'yamaha_sax', label: 'Yamaha YAS-280 Alto Szaxofon - 7.490 Ft/hó' },
        { value: 'marshall_amp', label: 'Marshall DSL40CR Gitár Erősítő - 6.990 Ft/hó' },
        { value: 'gibson_lespaul', label: 'Gibson Les Paul Standard - 8.990 Ft/hó' },
        { value: 'roland_drums', label: 'Roland TD-17KVX Elektromos Dob - 14.990 Ft/hó' },
        { value: 'korg_synth', label: 'Korg Nautilus 61 Szintetizátor - 11.990 Ft/hó' },
        { value: 'fender_jazz', label: 'Fender Jazz Bass - 6.490 Ft/hó' },
        { value: 'yamaha_c40', label: 'Yamaha C40 Klasszikus Gitár - 2.990 Ft/hó' },
        { value: 'selmer_sax', label: 'Selmer Paris Tenor Szaxofon - 12.990 Ft/hó' },
        { value: 'boss_amp', label: 'Boss Katana 50 MkII Erősítő - 4.490 Ft/hó' },
        { value: 'mapex_drums', label: 'Mapex Mars Akusztikus Dob - 8.990 Ft/hó' },
        { value: 'kawai_piano', label: 'Kawai K-15 Akusztikus Zongora - 15.990 Ft/hó' }
    ];

    // Segédfüggvény a hangszer név -> érték mappinghez
    const getInstrumentValueByName = (instrumentName) => {
        const mapping = {
            'Fender Stratocaster': 'fender_strat',
            'Yamaha P-125 Digitális Zongora': 'yamaha_p125',
            'Pearl Export Dobfelszerelés': 'pearl_drums',
            'Stentor Student II Hegedű': 'stentor_violin',
            'Yamaha YAS-280 Alto Szaxofon': 'yamaha_sax',
            'Marshall DSL40CR Gitár Erősítő': 'marshall_amp',
            'Gibson Les Paul Standard': 'gibson_lespaul',
            'Roland TD-17KVX Elektromos Dob': 'roland_drums',
            'Korg Nautilus 61 Szintetizátor': 'korg_synth',
            'Fender Jazz Bass': 'fender_jazz',
            'Yamaha C40 Klasszikus Gitár': 'yamaha_c40',
            'Selmer Paris Tenor Szaxofon': 'selmer_sax',
            'Boss Katana 50 MkII Erősítő': 'boss_amp',
            'Mapex Mars Akusztikus Dob': 'mapex_drums',
            'Kawai K-15 Akusztikus Zongora': 'kawai_piano'
        };
        return mapping[instrumentName] || '';
    };

    // Születési dátum összeállítása
    useEffect(() => {
        if (birthYear && birthMonth && birthDay) {
            const formattedDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
            setFormData(prev => ({ ...prev, rentalBirthDate: formattedDate }));
        }
    }, [birthYear, birthMonth, birthDay]);

    // Kezdő dátum összeállítása
    useEffect(() => {
        if (startYear && startMonth && startDay) {
            const formattedDate = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`;
            setFormData(prev => ({ ...prev, startDate: formattedDate }));
        }
    }, [startYear, startMonth, startDay]);

    // Ha van kiválasztott hangszer, beállítjuk a form értékét
    useEffect(() => {
        if (selectedInstrument && selectedInstrument.name) {
            const instrumentValue = getInstrumentValueByName(selectedInstrument.name);
            if (instrumentValue) {
                setFormData(prev => ({
                    ...prev,
                    instrumentSelect: instrumentValue
                }));
            }
        }
    }, [selectedInstrument]);

    const rentalPeriods = [
        { value: '', label: 'Válassz időtartamot', disabled: true },
        { value: '1', label: '1 hónap' },
        { value: '3', label: '3 hónap' },
        { value: '6', label: '6 hónap' },
        { value: '12', label: '12 hónap' },
        { value: 'custom', label: 'Egyedi időtartam' }
    ];

    const experienceLevels = [
        { value: '', label: 'Válassz egy opciót (opcionális)' },
        { value: 'beginner', label: 'Kezdő (0-1 év)' },
        { value: 'intermediate', label: 'Középhaladó (1-3 év)' },
        { value: 'advanced', label: 'Haladó (3+ év)' },
        { value: 'professional', label: 'Profi' }
    ];

    // Évek listájának generálása
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleStepNavigation = (direction) => {
        if (direction === 'next') {
            if (currentStep === 1) {
                if (!formData.rentalFirstName || !formData.rentalLastName || !formData.rentalEmail ||
                    !formData.rentalPhone || !formData.rentalAddress || !formData.rentalBirthDate) {
                    alert('Kérjük, töltsd ki az összes kötelező mezőt!');
                    return;
                }
            } else if (currentStep === 2) {
                if (!formData.instrumentSelect || !formData.rentalPeriod || !formData.startDate) {
                    alert('Kérjük, töltsd ki az összes kötelező mezőt!');
                    return;
                }
            }
            setCurrentStep(prev => Math.min(prev + 1, 3));
        } else if (direction === 'prev') {
            setCurrentStep(prev => Math.max(prev - 1, 1));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.agreeTerms) {
            alert('Kérjük, fogadd el az Általános Szerződési Feltételeket!');
            return;
        }

        console.log('Form adatok:', formData);
        alert('Köszönjük kérelmedet! Hamarosan felvesszük veled a kapcsolatot a részletek egyeztetésére.');

        setFormData({
            rentalFirstName: '',
            rentalLastName: '',
            rentalEmail: '',
            rentalPhone: '',
            rentalAddress: '',
            rentalBirthDate: '',
            instrumentSelect: '',
            rentalPeriod: '',
            startDate: '',
            experienceLevel: '',
            purpose: '',
            additionalNotes: '',
            agreeTerms: false
        });
        setBirthYear('');
        setBirthMonth('');
        setBirthDay('');
        setStartYear('');
        setStartMonth('');
        setStartDay('');
        setCurrentStep(1);
    };

    return (
        <section className="rental-form-section py-5" id="rental-form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="form-container">
                            <div className="form-header text-center mb-5">
                                <h2>Kölcsönzési Kérelem</h2>
                                <p>Töltsd ki az alábbi űrlapot hangszerkölcsönzési kérelem leadásához</p>
                            </div>

                            {/* Lépések jelző */}
                            <div className="step-indicator mb-4">
                                <div className="d-flex justify-content-between">
                                    <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                                        <span className="step-number">1</span>
                                        <span className="step-label">Személyes adatok</span>
                                    </div>
                                    <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                                        <span className="step-number">2</span>
                                        <span className="step-label">Hangszer kiválasztása</span>
                                    </div>
                                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                                        <span className="step-number">3</span>
                                        <span className="step-label">Egyéb információk</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} id="rentalRequestForm">
                                {/* 1. lépés - Személyes adatok */}
                                <div className={`form-step ${currentStep === 1 ? 'active' : 'd-none'}`} id="step1">
                                    <h4 className="mb-4">1. Személyes adatok</h4>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="rentalFirstName" className="form-label">
                                                Keresztnév *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="rentalFirstName"
                                                name="rentalFirstName"
                                                value={formData.rentalFirstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="rentalLastName" className="form-label">
                                                Vezetéknév *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="rentalLastName"
                                                name="rentalLastName"
                                                value={formData.rentalLastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="rentalEmail" className="form-label">
                                                Email cím *
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="rentalEmail"
                                                name="rentalEmail"
                                                value={formData.rentalEmail}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="rentalPhone" className="form-label">
                                                Telefonszám *
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="rentalPhone"
                                                name="rentalPhone"
                                                value={formData.rentalPhone}
                                                onChange={handleInputChange}
                                                required
                                                pattern="[0-9]{9,11}"
                                                placeholder="0612345678"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="rentalAddress" className="form-label">
                                                Lakcím *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="rentalAddress"
                                                name="rentalAddress"
                                                value={formData.rentalAddress}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Város, utca, házszám"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Születési dátum *</label>
                                            <div className="row g-2">
                                                <div className="col-4">
                                                    <select
                                                        className="form-select"
                                                        value={birthYear}
                                                        onChange={(e) => setBirthYear(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Év</option>
                                                        {years.map(year => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select
                                                        className="form-select"
                                                        value={birthMonth}
                                                        onChange={(e) => setBirthMonth(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Hónap</option>
                                                        {months.map(month => (
                                                            <option key={month} value={month}>{month}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select
                                                        className="form-select"
                                                        value={birthDay}
                                                        onChange={(e) => setBirthDay(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Nap</option>
                                                        {days.map(day => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary next-step"
                                            onClick={() => handleStepNavigation('next')}
                                        >
                                            Következő <i className="fas fa-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* 2. lépés - Hangszer kiválasztása */}
                                <div className={`form-step ${currentStep === 2 ? 'active' : 'd-none'}`} id="step2">
                                    <h4 className="mb-4">2. Hangszer kiválasztása</h4>
                                    <div className="mb-4">
                                        <label htmlFor="instrumentSelect" className="form-label">
                                            Válassz hangszert *
                                        </label>
                                        <select
                                            className="form-select"
                                            id="instrumentSelect"
                                            name="instrumentSelect"
                                            value={formData.instrumentSelect}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Kérjük válassz egy hangszert
                                            </option>
                                            {instruments.map((instrument) => (
                                                <option key={instrument.value} value={instrument.value}>
                                                    {instrument.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="rentalPeriod" className="form-label">
                                                Kölcsönzési időszak *
                                            </label>
                                            <select
                                                className="form-select"
                                                id="rentalPeriod"
                                                name="rentalPeriod"
                                                value={formData.rentalPeriod}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                {rentalPeriods.map((period) => (
                                                    <option
                                                        key={period.value}
                                                        value={period.value}
                                                        disabled={period.disabled}
                                                    >
                                                        {period.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Kezdő dátum *</label>
                                            <div className="row g-2">
                                                <div className="col-4">
                                                    <select
                                                        className="form-select"
                                                        value={startYear}
                                                        onChange={(e) => setStartYear(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Év</option>
                                                        {years.map(year => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select
                                                        className="form-select"
                                                        value={startMonth}
                                                        onChange={(e) => setStartMonth(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Hónap</option>
                                                        {months.map(month => (
                                                            <option key={month} value={month}>{month}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select
                                                        className="form-select"
                                                        value={startDay}
                                                        onChange={(e) => setStartDay(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Nap</option>
                                                        {days.map(day => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Átvételi mód *</label>
                                        <div className="delivery-info-box p-3 bg-light rounded">
                                            <p className="mb-2">
                                                <i className="fas fa-info-circle text-accent me-2"></i>
                                                Kizárólag személyes átvétel lehetséges iskolánkban:
                                            </p>
                                            <p className="mb-1">
                                                <strong>1061 Budapest, Jókai tér 1.</strong>
                                            </p>
                                            <p className="mb-1">H-P: 10:00-18:00 | Sz: 10:00-16:00</p>
                                            <p className="small text-muted mb-0">
                                                Kölcsönzési kérelmedet követően időpontot egyeztetünk veled.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary prev-step"
                                            onClick={() => handleStepNavigation('prev')}
                                        >
                                            <i className="fas fa-arrow-left me-2"></i>Vissza
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary next-step"
                                            onClick={() => handleStepNavigation('next')}
                                        >
                                            Következő <i className="fas fa-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* 3. lépés - Egyéb információk */}
                                <div className={`form-step ${currentStep === 3 ? 'active' : 'd-none'}`} id="step3">
                                    <h4 className="mb-4">3. Egyéb információk</h4>
                                    <div className="mb-4">
                                        <label htmlFor="experienceLevel" className="form-label">
                                            Tapasztalati szint
                                        </label>
                                        <select
                                            className="form-select"
                                            id="experienceLevel"
                                            name="experienceLevel"
                                            value={formData.experienceLevel}
                                            onChange={handleInputChange}
                                        >
                                            {experienceLevels.map((level) => (
                                                <option key={level.value} value={level.value}>
                                                    {level.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="purpose" className="form-label">
                                            Mire használnád a hangszert? *
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="purpose"
                                            name="purpose"
                                            rows="3"
                                            value={formData.purpose}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Pl.: Tanulás, koncertrehearsal, felvétel, stb."
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="additionalNotes" className="form-label">
                                            Egyéb megjegyzések
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="additionalNotes"
                                            name="additionalNotes"
                                            rows="3"
                                            value={formData.additionalNotes}
                                            onChange={handleInputChange}
                                            placeholder="Egyéb kérések, speciális igények..."
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="agreeTerms">
                                                Elfogadom a{' '}
                                                <a href="#" className="text-accent">
                                                    Kölcsönzési Általános Szerződési Feltételeket
                                                </a>{' '}
                                                és az{' '}
                                                <a href="#" className="text-accent">
                                                    Adatvédelmi Tájékoztatót
                                                </a>{' '}
                                                *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary prev-step"
                                            onClick={() => handleStepNavigation('prev')}
                                        >
                                            <i className="fas fa-arrow-left me-2"></i>Vissza
                                        </button>
                                        <button type="submit" className="btn btn-success btn-lg">
                                            <i className="fas fa-paper-plane me-2"></i>Kérelem elküldése
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="form-footer mt-5 pt-4 border-top">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>
                                            <i className="fas fa-info-circle text-accent me-2"></i>Fontos információk
                                        </h5>
                                        <p className="small">
                                            A kölcsönzési kérelmet követően 24 órán belül felvesszük veled a kapcsolatot a
                                            részletek egyeztetésére és a szerződés megkötésére.
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>
                                            <i className="fas fa-question-circle text-accent me-2"></i>Segítségre van szükséged?
                                        </h5>
                                        <p className="small">
                                            Hívj minket a <strong>+36 1 234 5680</strong>-as számon vagy írj a{' '}
                                            <strong>kolcsonzes@harmoniazene.hu</strong> címre.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default R_Form;