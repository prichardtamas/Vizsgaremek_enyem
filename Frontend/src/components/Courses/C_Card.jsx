// components/Courses/C_Card.jsx
import React from 'react';

const C_Card = ({ course, onEnroll, onView }) => {
    // Segédfüggvények
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('hu-HU');
    };

    const handleCardClick = (e) => {
        // Ne aktiválódjon, ha a gombra kattintanak
        if (!e.target.closest('.enroll-btn')) {
            onView(course);
        }
    };

    const handleEnrollClick = (e) => {
        e.stopPropagation(); // Ne aktiválja a kártya kattintást
        onEnroll(course);
    };

    return (
        <div className="col-lg-6 col-xl-4 mb-4 fade-in">
            <div className="course-card" onClick={handleCardClick}>
                <div className="course-card-header">
                    <h4>{course.name}</h4>
                </div>
                <div className="course-card-body">
                    <div className="course-teacher">
                        <div className="teacher-avatar">{getInitials(course.teacher)}</div>
                        <div className="teacher-info">
                            <h5>{course.teacher}</h5>
                            <p>Oktató</p>
                        </div>
                    </div>
                    
                    <div className="course-details">
                        <div className="course-detail">
                            <i className="fas fa-guitar"></i>
                            <span><strong>Hangszer:</strong> {course.instrument}</span>
                        </div>
                        <div className="course-detail">
                            <i className="fas fa-clock"></i>
                            <span><strong>Időtartam:</strong> {course.duration}</span>
                        </div>
                        <div className="course-detail">
                            <i className="fas fa-calendar-alt"></i>
                            <span><strong>Gyakoriság:</strong> {course.frequency}</span>
                        </div>
                        <div className="course-detail">
                            <i className="fas fa-money-bill-wave"></i>
                            <span><strong>Havi díj:</strong> {formatPrice(course.price)} Ft</span>
                        </div>
                    </div>
                    
                    <div className="course-description">
                        {truncateText(course.description, 120)}
                    </div>
                    
                    <div className="course-actions">
                        <button 
                            className="btn btn-primary btn-enroll enroll-btn" 
                            onClick={handleEnrollClick}
                        >
                            <i className="fas fa-pen-alt me-2"></i>Jelentkezés
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default C_Card;