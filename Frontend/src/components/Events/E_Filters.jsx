// components/Events/E_Filters.jsx
import React from 'react';

const E_Filters = ({ filterType, setFilterType, filterLocation, setFilterLocation, onApply, onReset }) => {
    const typeOptions = [
        { value: 'all', label: 'Összes' },
        { value: 'concert', label: 'Koncert' },
        { value: 'workshop', label: 'Workshop' },
        { value: 'course', label: 'Kurzus' },
        { value: 'open-day', label: 'Nyílt nap' }
    ];

    const locationOptions = [
        { value: 'all', label: 'Összes helyszín' },
        { value: 'main-hall', label: 'Fő terem' },
        { value: 'studio-a', label: 'Stúdió A' },
        { value: 'studio-b', label: 'Stúdió B' },
        { value: 'outdoor', label: 'Kültéri' }
    ];

    return (
        <div className="filters-section">
            <h3><i className="fas fa-filter"></i> Szűrők</h3>
            
            <div className="row">
                <div className="col-md-6">
                    <div className="filter-group">
                        <label>Esemény típusa</label>
                        <div className="filter-options">
                            {typeOptions.map(option => (
                                <span
                                    key={option.value}
                                    className={`filter-option ${filterType === option.value ? 'active' : ''}`}
                                    data-type={option.value}
                                    onClick={() => setFilterType(option.value)}
                                >
                                    {option.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="filter-group">
                        <label>Helyszín</label>
                        <div className="filter-options">
                            {locationOptions.map(option => (
                                <span
                                    key={option.value}
                                    className={`filter-option ${filterLocation === option.value ? 'active' : ''}`}
                                    data-location={option.value}
                                    onClick={() => setFilterLocation(option.value)}
                                >
                                    {option.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-primary" onClick={onApply}>
                    <i className="fas fa-check-circle"></i> Szűrők alkalmazása
                </button>
                <button className="btn btn-outline-secondary" onClick={onReset}>
                    <i className="fas fa-broom"></i> Szűrők törlése
                </button>
            </div>
        </div>
    );
};

export default E_Filters;