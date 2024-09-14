import React, { useState, useEffect } from 'react';
import "../Style/Carouselcomp.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const CarouselComp = () => {
  const [slidePosition, setSlidePosition] = useState(0);
  const slides = [
    'https://www.indiacarnews.com/wp-content/uploads/2024/03/Honda-Elevate-export-1000x600.jpg',
    'https://static.toiimg.com/photo/msid-108643993,width-147,height-108/108643993/108643993.jpg?pl=1203860',
    'https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/65e581c80d6b1.jpg',
    'https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/65fc0ca233ac9.jpg',
    'https://stimg.cardekho.com/images/cms/carnewsimages/editorimages/65f4459ea9cb6.png'
  ];

  const totalSlides = slides.length;

  const prevSlide = () => {
    setSlidePosition((prevPosition) => (prevPosition === 0 ? totalSlides - 1 : prevPosition - 1));
  };

  const nextSlide = () => {
    setSlidePosition((prevPosition) => (prevPosition === totalSlides - 1 ? 0 : prevPosition + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updatePosition = () => {
    // Logic to update slide position and handle CSS classes for active slide
  };

  useEffect(() => {
    updatePosition();
  }, [slidePosition]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div key={index} className={`slider-item ${index === slidePosition ? 'active' : 'hidden'}`} style={{ backgroundImage: `url(${slide})` }}></div>
      ))}
      <div className="slider-btns">
        <button id="btn-prev" onClick={prevSlide}>
         <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <button id="btn-next" onClick={nextSlide}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <div key={index} className={`dot ${index === slidePosition ? 'dot-active' : ''}`} onClick={() => setSlidePosition(index)}></div>
        ))}
      </div>
    </div>
  )
}

export default CarouselComp