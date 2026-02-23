// components/Courses/C_Model.jsx
import React, { useEffect } from 'react';
import { Modal } from 'bootstrap';  

const C_Model = ({ course, onClose, onEnroll }) => {
    useEffect(() => {
        // Bootstrap modal inicializálása
        const modelElement = document.getElementById('courseModel');  
        if (modelElement) {
            const model = new Modal(modelElement);  // <- Bootstrap Modal osztály
            model.show();

            modelElement.addEventListener('hidden.bs.modal', onClose);

            return () => {
                modelElement.removeEventListener('hidden.bs.modal', onClose);
            };
        }
    }, [onClose]);

    if (!course) return null;

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('hu-HU');
    };

    const handleEnroll = () => {
        const model = Modal.getInstance(document.getElementById('courseModel'));  
        model.hide();
        onEnroll(course);
    };

    return (
        <div className="modal fade" id="courseModel" tabIndex="-1"> 
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{course.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="teacher-avatar me-3">{getInitials(course.teacher)}</div>
                                    <div>
                                        <h6 className="mb-1">Oktató</h6>
                                        <p className="mb-0 fw-bold">{course.teacher}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-course-details"> 
                            <div className="modal-course-detail">
                                <i className="fas fa-guitar"></i>
                                <span><strong>Hangszer:</strong> {course.instrument}</span>
                            </div>
                            <div className="modal-course-detail">
                                <i className="fas fa-money-bill-wave"></i>
                                <span><strong>Havi díj:</strong> {formatPrice(course.price)} Ft</span>
                            </div>
                            <div className="modal-course-detail">
                                <i className="fas fa-clock"></i>
                                <span><strong>Időtartam:</strong> {course.duration}</span>
                            </div>
                            <div className="modal-course-detail">
                                <i className="fas fa-calendar-alt"></i>
                                <span><strong>Gyakoriság:</strong> {course.frequency}</span>
                            </div>
                            {course.schedule && (
                                <div className="modal-course-detail">
                                    <i className="fas fa-calendar-day"></i>
                                    <span><strong>Időbeosztás:</strong> {course.schedule}</span>
                                </div>
                            )}
                            {course.requirements && (
                                <div className="modal-course-detail">
                                    <i className="fas fa-clipboard-check"></i>
                                    <span><strong>Követelmények:</strong> {course.requirements}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-4">
                            <h6 className="text-primary mb-3"><i className="fas fa-align-left me-2"></i>Leírás</h6>
                            <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{course.description}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Bezárás</button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleEnroll}
                        >
                            <i className="fas fa-pen-alt me-2"></i>Jelentkezés
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default C_Model;