// pages/Events.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Events komponensek
import { eventsData } from '../components/Events/E_Data';
import E_Hero from '../components/Events/E_Hero';
import E_Filters from '../components/Events/E_Filters';
import E_Calendar from '../components/Events/E_Calendar';
import E_ListView from '../components/Events/E_Listview';
import E_Highlighted from '../components/Events/E_Highlighted';
import E_DayModel from '../components/Events/E_DayModel';
import E_EventModel from '../components/Events/E_EventModel';

// CSS
import '../styles/global.css';

const Events = () => {
    const navigate = useNavigate();

    // State-ek
    const [view, setView] = useState('month'); // 'month' vagy 'list'
    const [filterType, setFilterType] = useState('all');
    const [filterLocation, setFilterLocation] = useState('all');
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [message, setMessage] = useState(null);

    // Eseménykezelők
    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    const handleRegisterClick = () => {
        navigate("/registration");
    };

    const handleHeroContact = () => {
        alert("Ha eseményt szeretnél bejelenteni, kérjük vedd fel velünk a kapcsolatot a kapcsolati oldalon!");
    };

    const handleApplyFilters = () => {
        // Frissíti a nézetet
        if (view === 'calendar') {
            // A Calendar komponens magától frissül a filterek változására
        } else {
            // ListView frissül
        }
    };

    const handleResetFilters = () => {
        setFilterType('all');
        setFilterLocation('all');
    };

    const handleDayClick = (date, events) => {
        setSelectedDay(date);
        setSelectedDayEvents(events);
    };

    const handleCloseDayModal = () => {
        setSelectedDay(null);
        setSelectedDayEvents([]);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseEventModal = () => {
        setSelectedEvent(null);
    };

    const handleRegister = (event) => {
        setMessage({
            text: `Sikeresen jelentkeztél a "${event.title}" eseményre! Részleteket emailben küldünk.`,
            type: 'success'
        });
    };

    const handleCloseMessage = () => {
        setMessage(null);
    };

    // Szűrt események
    const filteredEvents = eventsData.filter(event => {
        if (filterType !== 'all' && event.type !== filterType) return false;
        if (filterLocation !== 'all' && event.location !== filterLocation) return false;
        return true;
    });

    return (
        <>
            <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />
            
            <E_Hero onContactClick={handleHeroContact} />

            <section className="calendar-section" id="calendar-section">
                <div className="container">
                    <div className="section-title text-center mb-5">
                        <h2 className="mb-3">Esemény Naptár</h2>
                        <p className="mx-auto">
                            Böngéssz visszamenőleg a múltbeli eseményeink között vagy nézd meg, mik várnak rád a jövőben.
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="calendar-container">
                                <div className="calendar-header">
                                    <div className="calendar-nav">
                                        <div className="calendar-views">
                                            <button 
                                                className={`btn btn-outline-secondary ${view === 'month' ? 'active' : ''}`}
                                                onClick={() => setView('month')}
                                            >
                                                <i className="fas fa-calendar-alt"></i> Hónap
                                            </button>
                                            <button 
                                                className={`btn btn-outline-secondary ${view === 'list' ? 'active' : ''}`}
                                                onClick={() => setView('list')}
                                            >
                                                <i className="fas fa-list"></i> Lista
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Filters */}
                                <E_Filters
                                    filterType={filterType}
                                    setFilterType={setFilterType}
                                    filterLocation={filterLocation}
                                    setFilterLocation={setFilterLocation}
                                    onApply={handleApplyFilters}
                                    onReset={handleResetFilters}
                                />

                                {/* Calendar or List View */}
                                {view === 'month' ? (
                                    <E_Calendar
                                        events={eventsData}
                                        filterType={filterType}
                                        filterLocation={filterLocation}
                                        onDayClick={handleDayClick}
                                    />
                                ) : (
                                    <div className="events-list-view">
                                        <E_ListView
                                            events={filteredEvents}
                                            onEventClick={handleEventClick}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kiemelt Események */}
            <E_Highlighted
                events={eventsData.filter(e => e.rating >= 4.8)}
                onEventClick={handleEventClick}
            />

            {/* Modals */}
            {selectedDay && (
                <E_DayModel
                    date={selectedDay}
                    events={selectedDayEvents}
                    onClose={handleCloseDayModal}
                    onEventClick={handleEventClick}
                />
            )}

            {selectedEvent && (
                <E_EventModel
                    event={selectedEvent}
                    onClose={handleCloseEventModal}
                    onRegister={handleRegister}
                />
            )}

            {/* Üzenet */}
            {message && (
                <div className="alert-message">
                    <div style={{ 
                        backgroundColor: message.type === 'success' ? '#28a745' : 'var(--accent-turquoise)', 
                        color: 'white', 
                        padding: '15px 20px', 
                        borderRadius: 12 
                    }}>
                        <div className="d-flex align-items-center">
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} me-3 fa-lg`}></i>
                            <div className="flex-grow-1">{message.text}</div>
                            <button 
                                type="button" 
                                className="btn-close btn-close-white" 
                                onClick={handleCloseMessage}
                                style={{ filter: 'brightness(0) invert(1)' }}
                            ></button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Events;