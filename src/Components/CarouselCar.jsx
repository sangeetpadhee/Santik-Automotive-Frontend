import React, { useState, useEffect } from 'react';
import "../Style/Carouselcomp.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const CarouselComp = () => {
  const [slidePosition, setSlidePosition] = useState(0);
  const slides = [
    'https://i.cdn.newsbytesapp.com/images/l53620231120103549.png',
    'https://s7ap1.scene7.com/is/image/tatapassenger/curvv-ev-banner-desktop-homepage?$BA-1920-925-S$&fit=crop&fmt=webp',
    'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Alcazar-2024/9246/1724327608542/front-left-side-47.jpg'
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
    <div className="Slider-New-Car">
      {slides.map((slide, index) => (
        <div key={index} className={`slider-item ${index === slidePosition ? 'active' : 'hidden'}`} style={{ backgroundImage: `url(${slide})`, backgroundPosition:'centre', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}></div>
      ))}
      <div className="dots-New-Car">
        {slides.map((_, index) => (
          <div key={index} className={`dot-New-Car ${index === slidePosition ? 'dot-active' : ''}`} onClick={() => setSlidePosition(index)}></div>
        ))}
      </div>
    </div>
  )
}

export default CarouselComp