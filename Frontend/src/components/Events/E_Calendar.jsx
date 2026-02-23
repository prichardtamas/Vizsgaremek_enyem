// components/Events/E_Calendar.jsx
import React, { useState, useEffect } from 'react';

const E_Calendar = ({ events, filterType, filterLocation, onDayClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState([]);

    const months = [
        'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
        'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ];

    useEffect(() => {
        generateCalendarDays();
    }, [currentDate, events, filterType, filterLocation]);

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Első nap a hónapban
        const firstDay = new Date(year, month, 1);
        // Utolsó nap a hónapban
        const lastDay = new Date(year, month + 1, 0);
        
        const daysInMonth = lastDay.getDate();
        // Első nap indexe (hétfő=0, vasárnap=6)
        const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        
        // Előző hónap napjai
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        const days = [];
        
        // Előző hónap napjai
        for (let i = firstDayIndex; i > 0; i--) {
            days.push({
                dayNumber: prevMonthLastDay - i + 1,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i + 1)
            });
        }
        
        // Aktuális hónap napjai
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday = date.toDateString() === today.toDateString();
            const dayEvents = getEventsForDate(date);
            
            days.push({
                dayNumber: i,
                isCurrentMonth: true,
                isToday,
                date,
                events: dayEvents,
                eventCount: dayEvents.length
            });
        }
        
        // Következő hónap napjai (összesen 42 cella)
        const totalCells = 42;
        const nextMonthDays = totalCells - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                dayNumber: i,
                isCurrentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }
        
        setCalendarDays(days);
    };

    const getEventsForDate = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return events.filter(event => {
            const eventDate = new Date(event.start).toISOString().split('T')[0];
            
            // Szűrők alkalmazása
            if (filterType !== 'all' && event.type !== filterType) return false;
            if (filterLocation !== 'all' && event.location !== filterLocation) return false;
            
            return eventDate === dateStr;
        });
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="calendar-nav">
                    <button className="btn btn-outline-primary" onClick={handlePrevMonth}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <h2 id="currentMonth">
                        {currentDate.getFullYear()}. {months[currentDate.getMonth()]}
                    </h2>
                    <button className="btn btn-outline-primary" onClick={handleNextMonth}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    <button className="btn btn-outline-secondary ms-3" onClick={handleToday}>
                        <i className="fas fa-calendar-day"></i> Ma
                    </button>
                </div>
            </div>

            <div className="custom-calendar">
                <div className="calendar-weekdays">
                    <div className="weekday">Hétfő</div>
                    <div className="weekday">Kedd</div>
                    <div className="weekday">Szerda</div>
                    <div className="weekday">Csütörtök</div>
                    <div className="weekday">Péntek</div>
                    <div className="weekday">Szombat</div>
                    <div className="weekday">Vasárnap</div>
                </div>
                <div className="calendar-days" id="calendarDays">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''} ${day.eventCount > 0 ? 'has-events' : ''}`}
                            onClick={() => day.isCurrentMonth && day.eventCount > 0 && onDayClick(day.date, day.events)}
                        >
                            <span className="day-number">{day.dayNumber}</span>
                            {day.eventCount > 0 && (
                                <div className="day-events">
                                    {day.events.slice(0, 2).map((event, idx) => (
                                        <div key={idx}>
                                            <span className={`event-dot ${event.type}`}></span> {event.title.substring(0, 10)}...
                                        </div>
                                    ))}
                                    {day.eventCount > 2 && (
                                        <span className="event-count">+{day.eventCount - 2} további</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default E_Calendar;