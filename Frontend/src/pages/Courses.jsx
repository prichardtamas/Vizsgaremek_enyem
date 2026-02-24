// pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Courses komponensek
import { coursesData } from '../components/Courses/C_Data';
import C_Search from '../components/Courses/C_Search';
import C_Card from '../components/Courses/C_Card';
import C_Model from '../components/Courses/C_Model';
import C_NoResults from '../components/Courses/C_NoResults';
import C_Message from '../components/Courses/C_Message';

// CSS
import '../styles/global.css';

const Courses = () => {
    const navigate = useNavigate();
    
    // State-ek
    const [searchTerm, setSearchTerm] = useState('');
    const [instrumentFilter, setInstrumentFilter] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(coursesData);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [message, setMessage] = useState(null);

    // Szűrés
    useEffect(() => {
        let filtered = [...coursesData];
        
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(course => 
                course.name.toLowerCase().includes(term) ||
                course.teacher.toLowerCase().includes(term) ||
                course.instrument.toLowerCase().includes(term) ||
                course.description.toLowerCase().includes(term)
            );
        }
        
        if (instrumentFilter) {
            filtered = filtered.filter(course => 
                course.instrument.toLowerCase().includes(instrumentFilter)
            );
        }
        
        setFilteredCourses(filtered);
    }, [searchTerm, instrumentFilter]);

    // Eseménykezelők
    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    const handleRegisterClick = () => {
        navigate("/registration");
    };

    const handleViewCourse = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    const handleEnroll = (course) => {
        setMessage({
            text: `Sikeresen jelentkeztél a "${course.name}" kurzusra! Hamarosan felvesszük veled a kapcsolatot.`,
            type: 'success'
        });
    };

    const handleCloseMessage = () => {
        setMessage(null);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setInstrumentFilter('');
    };

    return (
        <>
            <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />
            
            <div className="main-content">
                <div className="container">
                    <div className="section-title">
                        <h2 className="mb-3">Kurzusok</h2>
                        <p className="mx-auto">
                            Fedezd fel zeneiskolánk széles választékát, és találd meg a számodra legmegfelelőbb kurzust!
                        </p>
                    </div>

                    {/* Kereső */}
                    <C_Search 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        instrumentFilter={instrumentFilter}
                        setInstrumentFilter={setInstrumentFilter}
                    />

                    {/* Kurzusok listája */}
                    <div className="row" id="coursesList">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map(course => (
                                <C_Card 
                                    key={course.id}
                                    course={course}
                                    onEnroll={handleEnroll}
                                    onView={handleViewCourse}
                                />
                            ))
                        ) : (
                            <C_NoResults onClearFilters={handleClearFilters} />
                        )}
                    </div>

                    {/* Nincsenek kurzusok üzenet (ha coursesData üres) */}
                    {coursesData.length === 0 && (
                        <div className="no-courses-container">
                            <i className="fas fa-music"></i>
                            <h3 className="mb-3">Jelenleg nincsenek elérhető kurzusok</h3>
                            <p className="mb-4">
                                Kérjük, látogass vissza később vagy vegye fel velünk a kapcsolatot további információkért.
                            </p>
                            <a href="#" className="btn btn-primary">
                                <i className="fas fa-phone me-2"></i>Kapcsolatfelvétel
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Model */}
            {selectedCourse && (
                <C_Model 
                    course={selectedCourse}
                    onClose={handleCloseModal}
                    onEnroll={handleEnroll}
                />
            )}

            {/* Üzenet */}
            {message && (
                <C_Message 
                    message={message.text}
                    type={message.type}
                    onClose={handleCloseMessage}
                />
            )}

            <Footer />
        </>
    );
};

export default Courses;