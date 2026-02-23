// components/Courses/C_NoResults.jsx
import React from 'react';

const C_NoResults = ({ onClearFilters }) => {
    return (
        <div className="col-12 text-center py-5">
            <i className="fas fa-search fa-4x mb-4" style={{ color: 'var(--accent-turquoise)', opacity: 0.5 }}></i>
            <h4 className="mb-3" style={{ color: 'var(--dark-text)' }}>Nincs találat</h4>
            <p style={{ color: 'var(--light-text)', maxWidth: 500, margin: '0 auto' }}>
                Próbálj meg másik keresési kifejezést vagy szűrőt használni.
            </p>
            <button className="btn btn-primary mt-4" onClick={onClearFilters}>
                <i className="fas fa-times me-2"></i>Keresés törlése
            </button>
        </div>
    );
};

export default C_NoResults;