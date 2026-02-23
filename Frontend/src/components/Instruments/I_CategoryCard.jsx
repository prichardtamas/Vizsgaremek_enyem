// CategoryCard.jsx
import React from 'react';

const CategoryCard = ({ category }) => {
    return (
        <div className="category-card">
            <div className="category-image">
                <img src={category.image} alt={category.name} loading="lazy" />
            </div>
            <div className="category-content">
                <h3><i className={category.icon}></i> {category.name}</h3>
                <p className="category-description">{category.description}</p>
                
                <div className="category-types">
                    <h4><i className="fas fa-list"></i> Főbb típusok:</h4>
                    <ul>
                        {category.types.map((type, index) => (
                            <li key={index}>{type}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="category-info">
                    <div className="info-item">
                        <i className="fas fa-volume-up"></i>
                        <span>Hangforrás: {category.soundSource}</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-star"></i>
                        <span>{category.popularFor}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;