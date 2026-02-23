// components/Events/E_Highlighted.jsx
import React from 'react';

const E_Highlighted = ({ events, onEventClick }) => {
    // Csak a 3 legnépszerűbb esemény
    const highlightedEvents = events.slice(0, 3);

    return (
        <section className="upcoming-events-section">
            <div className="container">
                <div className="section-title text-center mb-5">
                    <h2 className="mb-3">Kiemelt Események</h2>
                    <p className="mx-auto">Válogass legnépszerűbb és legvárhatóbb eseményeink közül</p>
                </div>

                <div className="row g-4">
                    {highlightedEvents.map(event => {
                        const getIcon = (type) => {
                            switch(type) {
                                case 'concert': return 'fa-guitar';
                                case 'workshop': return 'fa-drum';
                                case 'open-day': return 'fa-tree';
                                default: return 'fa-calendar';
                            }
                        };

                        return (
                            <div key={event.id} className="col-md-6 col-lg-4">
                                <div className="event-highlight-card">
                                    <div className="event-highlight-header">
                                        <div className="event-highlight-icon">
                                            <i className={`fas ${getIcon(event.type)}`}></i>
                                        </div>
                                        <h3 className="h4 mb-0">{event.title}</h3>
                                        <span className="event-highlight-date">
                                            {new Date(event.start).toLocaleDateString('hu-HU', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="event-highlight-content">
                                        <p>{event.description.substring(0, 100)}...</p>
                                        <div className="event-highlight-stats">
                                            <div className="stat">
                                                <span className="stat-number">{event.registered}</span>
                                                <span className="stat-label">Jelentkezett</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-number">{event.rating}</span>
                                                <span className="stat-label">Értékelés</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-number">{event.capacity}</span>
                                                <span className="stat-label">Kapacitás</span>
                                            </div>
                                        </div>
                                        <button 
                                            className="btn btn-primary w-100 mt-4"
                                            onClick={() => onEventClick(event)}
                                        >
                                            Részletek és jelentkezés
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default E_Highlighted;