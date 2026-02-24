// InstrumentCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import CategoryCard from './I_CategoryCard';

const InstrumentCarousel = ({ categories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const trackRef = useRef(null);

    // Reszponzív beállítás
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCardsPerView(1);
            } else if (width < 992) {
                setCardsPerView(2);
            } else {
                setCardsPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(categories.length / cardsPerView);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="instrument-carousel" id="categories">
            <div className="container">
                <div className="section-title">
                    <h2>Hangszer Kategóriák</h2>
                    <p>A hangszereket családokba soroljuk aszerint, hogy milyen módon keletkezik bennük a hang</p>
                </div>
                
                <div className="carousel-wrapper">
                    <div className="carousel-container">
                        <div 
                            className="carousel-track" 
                            ref={trackRef}
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                            }}
                        >
                            {categories.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="carousel-controls">
                    <button 
                        className="carousel-button" 
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        aria-label="Előző"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    
                    <div className="carousel-dots">
                        {[...Array(totalSlides)].map((_, index) => (
                            <div
                                key={index}
                                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                    
                    <button 
                        className="carousel-button" 
                        onClick={nextSlide}
                        disabled={currentIndex === totalSlides - 1}
                        aria-label="Következő"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InstrumentCarousel;