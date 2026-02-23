// components/Courses/C_Message.jsx
import React, { useEffect } from 'react';

const C_Message = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getBgColor = () => {
        switch(type) {
            case 'success': return '#28a745';
            case 'error': return '#dc3545';
            case 'info': return '#17a2b8';
            default: return 'var(--accent-turquoise)';
        }
    };

    const getIcon = () => {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-info-circle';
        }
    };

    return (
        <div className="alert-message">
            <div style={{ backgroundColor: getBgColor(), color: 'white', padding: '15px 20px', borderRadius: 12 }}>
                <div className="d-flex align-items-center">
                    <i className={`fas ${getIcon()} me-3 fa-lg`}></i>
                    <div className="flex-grow-1">{message}</div>
                    <button 
                        type="button" 
                        className="btn-close btn-close-white" 
                        onClick={onClose}
                        style={{ filter: 'brightness(0) invert(1)' }}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default C_Message;