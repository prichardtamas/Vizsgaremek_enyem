// components/Events/E_DayModel.jsx
import React, { useEffect } from 'react';
import { Modal } from 'bootstrap';
import { getLocationText } from './E_Data';

const E_DayModel = ({ date, events, onClose, onEventClick }) => {
    useEffect(() => {
        const modelElement = document.getElementById('dayInfoModel');
        if (modelElement) {
            const model = new Modal(modelElement);
            model.show();

            modelElement.addEventListener('hidden.bs.modal', onClose);

            return () => {
                modelElement.removeEventListener('hidden.bs.modal', onClose);
            };
        }
    }, [onClose]);

    if (!date) return null;

    const dateStr = date.toLocaleDateString('hu-HU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="modal fade day-info-modal" id="dayInfoModel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nap eseményei</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="day-info-date">
                            <div className="day-number">{date.getDate()}</div>
                            <div className="month-name">
                                {date.toLocaleDateString('hu-HU', { month: 'long' })}
                            </div>
                            <div className="year">{date.getFullYear()}</div>
                        </div>
                        <div className="day-info-content">
                            <h4>Események: {dateStr}</h4>
                            
                            {events.length === 0 ? (
                                <div className="day-info-no-events">
                                    <i className="fas fa-calendar-times"></i>
                                    <h4>Nincsenek események</h4>
                                    <p>{dateStr} dátumon nincsenek események a kiválasztott szűrőkkel.</p>
                                </div>
                            ) : (
                                events.map(event => {
                                    const eventDate = new Date(event.start);
                                    const eventTime = eventDate.toLocaleTimeString('hu-HU', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });
                                    const locationText = getLocationText(event.location);

                                    return (
                                        <div key={event.id} className="day-info-event">
                                            <h4><i className="fas fa-calendar-check"></i> {event.title}</h4>
                                            <p>{event.description}</p>
                                            <div className="day-info-event-location">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>{locationText} • {eventTime}</span>
                                            </div>
                                            <button 
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => {
                                                    const model = Modal.getInstance(document.getElementById('dayInfoModel'));
                                                    model.hide();
                                                    onEventClick(event);
                                                }}
                                            >
                                                Részletek
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default E_DayModel;