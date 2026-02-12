import React, { useState, useEffect } from 'react';
import yamahaC40 from '../../img/yamahaC40.jpg';
import stentroHegedu from '../../img/stentorHegedu.jpg';
import bossKatanaErosito from '../../img/bossKatanaErosito.jpg'
import fenderS from '../../img/fenderS.jpg'
import fenderJazzBass from '../../img/fenderJazzBass.jpg'
import marshallErosito from '../../img/marshallErosito.jpg'
import yamahaYas from '../../img/yamahaYas280.jpg'
import yamahaP125 from '../../img/yamahaP125.jpg'
import gibsonLee from '../../img/gibsonLee.jpg'

const R_Instruments = () => {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    availability: 'all',
    sort: 'price-low'
  });

  // Kezdeti hangszer adatok
  const initialInstruments = [
    {
      id: 1,
      name: "Fender Stratocaster",
      category: "guitar",
      price: 5990,
      availability: "in-stock",
      description: "Amerikai gyártmányú elektromos gitár, ikonikus hangzással.",
      image: fenderS,
      badge: "Legnépszerűbb",
      minRental: "Min. 1 hónap"
    },
    {
      id: 2,
      name: "Yamaha P-125 Digitális Zongora",
      category: "keyboards",
      price: 8490,
      availability: "in-stock",
      description: "88 súlyozott billentyű, kiváló zongorahang, könnyű szállíthatóság.",
      image: yamahaP125,
      badge: "Újonnan érkezett",
      minRental: "Min. 1 hónap"
    },
    {
      id: 3,
      name: "Pearl Export Dobfelszerelés",
      category: "drums",
      price: 12990,
      availability: "in-stock",
      description: "5 részes dobfelszerelés hardware-ekkel és cintányérokkal.",
      image: "https://images.unsplash.com/photo-1519895609939-d2a6491c1196?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      badge: "Akciós",
      minRental: "Min. 3 hónap"
    },
    {
      id: 4,
      name: "Stentor Student II Hegedű",
      category: "strings",
      price: 3990,
      availability: "in-stock",
      description: "4/4-es méret, teljes készlet vonóval, táskával és kolophonnial.",
      image: stentroHegedu,
      badge: "Kezdőknek",
      minRental: "Min. 1 hónap"
    },
    {
      id: 5,
      name: "Yamaha YAS-280 Alto Szaxofon",
      category: "wind",
      price: 7490,
      availability: "in-stock",
      description: "Kiváló minőségű kezdő szaxofon komplett készlettel.",
      image: yamahaYas,
      minRental: "Min. 2 hónap"
    },
    {
      id: 6,
      name: "Marshall DSL40CR Gitár Erősítő",
      category: "amplifiers",
      price: 6990,
      availability: "in-stock",
      description: "40W tube erősítő, ikonikus Marshall hangzással.",
      image: marshallErosito,
      minRental: "Min. 1 hónap"
    },
    {
      id: 7,
      name: "Gibson Les Paul Standard",
      category: "guitar",
      price: 8990,
      availability: "in-stock",
      description: "Klasszikus elektromos gitár, meleg, teljes hangzással.",
      image: gibsonLee,
      minRental: "Min. 1 hónap"
    },
    {
      id: 8,
      name: "Roland TD-17KVX Elektromos Dob",
      category: "drums",
      price: 14990,
      availability: "in-stock",
      description: "Professzionális elektronikus dobfelszerelés, zajmentes gyakorláshoz.",
      image: "https://images.unsplash.com/photo-1519895609939-d2a6491c1196?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      minRental: "Min. 3 hónap"
    },
    {
      id: 9,
      name: "Korg Nautilus 61 Szintetizátor",
      category: "keyboards",
      price: 11990,
      availability: "in-stock",
      description: "61 billentyűs workstation szintetizátor, kreatív lehetőségek tárháza.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      minRental: "Min. 2 hónap"
    },
    {
      id: 10,
      name: "Fender Jazz Bass",
      category: "guitar",
      price: 6490,
      availability: "in-stock",
      description: "4 húros basszusgitár, funk és jazz stílusokhoz ideális.",
      image: fenderJazzBass,
      minRental: "Min. 1 hónap"
    },
    {
      id: 11,
      name: "Yamaha C40 Klasszikus Gitár",
      category: "guitar",
      price: 2990,
      availability: "in-stock",
      description: "Nilon húros klasszikus gitár, kezdők számára ideális.",
      image: yamahaC40,
      badge: "Kezdőknek",
      minRental: "Min. 1 hónap"
    },
    {
      id: 12,
      name: "Selmer Paris Tenor Szaxofon",
      category: "wind",
      price: 12990,
      availability: "in-stock",
      description: "Professzionális tenor szaxofon, concert minőség.",
      image: "https://images.unsplash.com/photo-1519735777090-ec97162dc5f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1415&q=80",
      badge: "Prémium",
      minRental: "Min. 3 hónap"
    },
    {
      id: 13,
      name: "Boss Katana 50 MkII Erősítő",
      category: "amplifiers",
      price: 4490,
      availability: "in-stock",
      description: "50W modeling erősítő, számos beépített effektussal.",
      image: bossKatanaErosito,
      minRental: "Min. 1 hónap"
    },
    {
      id: 14,
      name: "Mapex Mars Akusztikus Dob",
      category: "drums",
      price: 8990,
      availability: "in-stock",
      description: "5 részes dobfelszerelés, teljes hardware készlettel.",
      image: "https://images.unsplash.com/photo-1519895609939-d2a6491c1196?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      minRental: "Min. 2 hónap"
    },
    {
      id: 15,
      name: "Kawai K-15 Akusztikus Zongora",
      category: "keyboards",
      price: 15990,
      availability: "in-stock",
      description: "110 cm magas akusztikus zongora, kiváló hangminőséggel.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      badge: "Prémium",
      minRental: "Min. 6 hónap"
    }
  ];

  useEffect(() => {
    setInstruments(initialInstruments);
    setFilteredInstruments(initialInstruments);
  }, []);

  useEffect(() => {
    filterAndSortInstruments();
  }, [filters, instruments]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filterAndSortInstruments = () => {
    let result = [...instruments];

    // Kategória szűrés
    if (filters.category !== 'all') {
      result = result.filter(instrument => instrument.category === filters.category);
    }

    // Ár szűrés
    if (filters.price !== 'all') {
      switch (filters.price) {
        case '0-5000':
          result = result.filter(instrument => instrument.price <= 5000);
          break;
        case '5000-10000':
          result = result.filter(instrument => instrument.price > 5000 && instrument.price <= 10000);
          break;
        case '10000-15000':
          result = result.filter(instrument => instrument.price > 10000 && instrument.price <= 15000);
          break;
        case '15000+':
          result = result.filter(instrument => instrument.price > 15000);
          break;
      }
    }

    // Rendelkezésre állás szűrés
    if (filters.availability !== 'all') {
      result = result.filter(instrument => instrument.availability === filters.availability);
    }

    // Rendezés
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'hu'));
        break;
    }

    setFilteredInstruments(result);
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      price: 'all',
      availability: 'all',
      sort: 'price-low'
    });
  };

  const handleRentClick = (instrumentName) => {
    alert(`Kölcsönzés: ${instrumentName}`);
    // Itt általában átirányítanánk a kölcsönzés oldalra vagy megnyitnánk egy modalt
  };

  const getCategoryName = (category) => {
    const categories = {
      'guitar': 'Gitárok',
      'drums': 'Dobok',
      'keyboards': 'Billentyűsök',
      'strings': 'Vonósok',
      'wind': 'Fúvósok',
      'amplifiers': 'Erősítők'
    };
    return categories[category] || category;
  };

  const getAvailabilityText = (availability) => {
    return availability === 'in-stock' ? 'Készleten' : 'Hamarosan';
  };

  const getActiveFiltersText = () => {
    const activeFilters = [];
    
    if (filters.category !== 'all') {
      activeFilters.push(getCategoryName(filters.category));
    }
    
    if (filters.price !== 'all') {
      activeFilters.push(filters.price.replace('-', '-').replace('+', '+'));
    }
    
    if (filters.availability !== 'all') {
      activeFilters.push(getAvailabilityText(filters.availability));
    }
    
    if (activeFilters.length === 0) {
      return 'Összes hangszer';
    }
    
    return `${filteredInstruments.length} hangszer (${activeFilters.join(', ')})`;
  };

  return (
    <section className="popular-instruments py-5" id="instruments">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="mb-3">15 Kölcsönözhető Hangszer</h2>
          <p className="mx-auto">Válassz a széles kínálatunkból</p>
        </div>

        {/* Szűrők */}
        <div className="filters-section mb-5">
          <div className="filters-container p-4 rounded shadow">
            <h4 className="mb-4">
              <i className="fas fa-filter text-accent me-2"></i>Hangszer szűrők
            </h4>

            <div className="row g-3">
              <div className="col-lg-3 col-md-6">
                <div className="filter-group">
                  <label className="form-label">Kategória</label>
                  <select 
                    className="form-select filter-select" 
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="all">Összes kategória</option>
                    <option value="guitar">Gitárok</option>
                    <option value="drums">Dobok</option>
                    <option value="keyboards">Billentyűsök</option>
                    <option value="strings">Vonósok</option>
                    <option value="wind">Fúvósok</option>
                    <option value="amplifiers">Erősítők</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="filter-group">
                  <label className="form-label">Ár tartomány</label>
                  <select 
                    className="form-select filter-select" 
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                  >
                    <option value="all">Összes ár</option>
                    <option value="0-5000">0-5.000 Ft/hó</option>
                    <option value="5000-10000">5.000-10.000 Ft/hó</option>
                    <option value="10000-15000">10.000-15.000 Ft/hó</option>
                    <option value="15000+">15.000+ Ft/hó</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="filter-group">
                  <label className="form-label">Rendelkezésre állás</label>
                  <select 
                    className="form-select filter-select" 
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                  >
                    <option value="all">Összes</option>
                    <option value="in-stock">Készleten</option>
                    <option value="soon">Hamarosan</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="filter-group">
                  <label className="form-label">Rendezés</label>
                  <select 
                    className="form-select filter-select" 
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                  >
                    <option value="price-low">Ár szerint (olcsó)</option>
                    <option value="price-high">Ár szerint (drága)</option>
                    <option value="name">Név szerint</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-primary" onClick={resetFilters}>
                <i className="fas fa-redo me-2"></i>Szűrők törlése
              </button>
              <div className="filter-results">
                <span>{getActiveFiltersText()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hangszer kártyák */}
        <div className="row g-4">
          {filteredInstruments.map(instrument => (
            <div 
              key={instrument.id} 
              className="col-lg-4 col-md-6"
            >
              <div className="instrument-card">
                <div className="instrument-image">
                  <img 
                    src={instrument.image} 
                    alt={instrument.name} 
                    className="img-fluid"
                  />
                  {instrument.badge && (
                    <div className="instrument-badge">{instrument.badge}</div>
                  )}
                </div>
                <div className="instrument-content">
                  <h4>{instrument.name}</h4>
                  <p className="instrument-description">{instrument.description}</p>
                  <div className="instrument-details">
                    <div className="detail">
                      <i className="fas fa-tag"></i>
                      <span>{instrument.price.toLocaleString('hu-HU')} Ft/hó</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{instrument.minRental}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-box"></i>
                      <span>{getAvailabilityText(instrument.availability)}</span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary w-100 mt-3 rent-btn"
                    onClick={() => handleRentClick(instrument.name)}
                  >
                    Kölcsönzés most
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default R_Instruments;