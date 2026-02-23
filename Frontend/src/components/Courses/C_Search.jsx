// components/Courses/C_Search.jsx
import React from 'react';

const C_Search = ({ searchTerm, setSearchTerm, instrumentFilter, setInstrumentFilter }) => {
    const instruments = [
        "Gitár", "Zongora", "Ének", "Dob", "Hegedű", "Fuvola", 
        "Szaxofon", "Brácsa", "Cselló", "Nagybőgő", "Trombita", "Klarinét"
    ];

    return (
        <div className="search-container fade-in">
            <div className="row g-3">
                <div className="col-lg-8">
                    <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Keresés kurzus neve, tanár neve vagy hangszer alapján..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-filter"></i></span>
                        <select 
                            className="form-select" 
                            value={instrumentFilter}
                            onChange={(e) => setInstrumentFilter(e.target.value)}
                        >
                            <option value="">Minden hangszer</option>
                            {instruments.map((inst, index) => (
                                <option key={index} value={inst.toLowerCase()}>{inst}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default C_Search;