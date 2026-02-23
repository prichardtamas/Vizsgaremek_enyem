// components/Events/E_EventModel.jsx
import React, { useEffect } from 'react';
import { Modal } from 'bootstrap';
import { getLocationText, getTypeText } from './E_Data';

const E_EventModel = ({ event, onClose, onRegister }) => {
    useEffect(() => {
        const modelElement = document.getElementById('eventModel');
        if (modelElement) {
            const model = new Modal(modelElement);
            model.show();

            modelElement.addEventListener('hidden.bs.modal', onClose);

            return () => {
                modelElement.removeEventListener('hidden.bs.modal', onClose);
            };
        }
    }, [onClose]);

    if (!event) return null;

    const eventDate = new Date(event.start);
    const endDate = new Date(event.end);
    const locationText = getLocationText(event.location);
    const typeText = getTypeText(event.type);
    
    const now = new Date();
    const isPast = eventDate < now;
    const isFull = event.registered >= event.capacity;

    return (
        <div className="modal fade" id="eventModel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content event-modal-content">
                    <div className="modal-header event-modal-header">
                        <h5 className="modal-title">Esemény részletei</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body event-modal-body">
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="fas fa-calendar-alt"></i> Dátum
                            </div>
                            <div className="event-detail-value">
                                {eventDate.toLocaleDateString('hu-HU', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                        
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="far fa-clock"></i> Időpont
                            </div>
                            <div className="event-detail-value">
                                {eventDate.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })} - 
                                {endDate.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="fas fa-map-marker-alt"></i> Helyszín
                            </div>
                            <div className="event-detail-value">{locationText}</div>
                        </div>
                        
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="fas fa-user-tie"></i> Oktató
                            </div>
                            <div className="event-detail-value">{event.instructor}</div>
                        </div>
                        
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="fas fa-ticket-alt"></i> Ár
                            </div>
                            <div className="event-detail-value">{event.price}</div>
                        </div>
                        
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="fas fa-music"></i> Esemény típusa
                            </div>
                            <div className="event-detail-value">
                                <span className={`event-type-badge badge-${event.type}`}>{typeText}</span>
                            </div>
                        </div>
                        
                        <div className="event-detail-item">
                            <div className="event-detail-label">
                                <i className="fas fa-info-circle"></i> Leírás
                            </div>
                            <div className="event-detail-value">{event.description}</div>
                        </div>
                        
                        <div className="event-participation">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="event-detail-label mb-0">
                                    <i className="fas fa-users"></i> Részvétel
                                </div>
                                <div className="event-detail-value mb-0">
                                    {event.registered} / {event.capacity} fő
                                </div>
                            </div>
                            
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                ></div>
                            </div>
                            
                            <div className="text-center mt-2">
                                <small className="text-muted">
                                    {Math.round((event.registered / event.capacity) * 100)}% betöltöttség
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Bezárás</button>
                        <button 
                            type="button" 
                            className={`btn ${isPast || isFull ? 'btn-secondary' : 'btn-primary'}`}
                            disabled={isPast || isFull}
                            onClick={() => {
                                const model = Modal.getInstance(document.getElementById('eventModel'));
                                model.hide();
                                onRegister(event);
                            }}
                        >
                            {isPast ? 'Esemény lezárult' : isFull ? 'Betelt' : 'Jelentkezés'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default E_EventModel;