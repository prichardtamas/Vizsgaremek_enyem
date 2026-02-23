// components/Events/E_ListView.jsx
import React from 'react';
import { getLocationText, getTypeText, getTypeBgColor, getTypeColor } from './E_Data';

const E_ListView = ({ events, onEventClick }) => {
    if (events.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="fas fa-calendar-times fa-3x mb-3" style={{ color: '#1DD3C6', opacity: 0.5 }}></i>
                <h4 style={{ color: '#2A3B5C' }}>Nincsenek események</h4>
                <p className="text-muted">Nincsenek események a kiválasztott szűrőkkel.</p>
            </div>
        );
    }

    const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

    return (
        <div className="events-list" id="eventsList">
            {sortedEvents.map(event => {
                const eventDate = new Date(event.start);
                const endDate = new Date(event.end);
                const typeBgColor = getTypeBgColor(event.type);
                const typeColor = getTypeColor(event.type);
                const locationText = getLocationText(event.location);

                return (
                    <div
                        key={event.id}
                        className="list-event-item"
                        onClick={() => onEventClick(event)}
                    >
                        <div className="list-date-box">
                            <span className="list-date-day">{eventDate.getDate()}</span>
                            <span className="list-date-month">
                                {eventDate.toLocaleString('hu', { month: 'short' })}
                            </span>
                        </div>
                        
                        <div className="list-event-content">
                            <h4 className="list-event-title">{event.title}</h4>
                            
                            <div className="list-event-details">
                                <span className="list-type-badge" style={{ backgroundColor: typeBgColor, color: typeColor }}>
                                    {getTypeText(event.type)}
                                </span>
                                
                                <span className="list-time">
                                    <i className="far fa-clock"></i>
                                    {eventDate.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })} - 
                                    {endDate.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                
                                <span className="list-participants">
                                    <i className="fas fa-users"></i>
                                    {event.registered}/{event.capacity} fő
                                </span>
                                
                                <span className="list-time">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {locationText}
                                </span>
                            </div>
                            
                            <p className="list-event-description">{event.description}</p>
                        </div>
                        
                        <div className="list-chevron-container">
                            <i className="fas fa-chevron-right list-chevron"></i>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default E_ListView;