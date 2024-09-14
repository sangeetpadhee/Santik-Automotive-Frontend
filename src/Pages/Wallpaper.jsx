import React, { useEffect, useState } from 'react';
import '../Style/Wallpaperpage.css';
import {MobileWallpaperArray, LaptopWallpaperArray} from '../CarsArray/Wallpaper-Array';

const Wallpaper = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  


  return (
    <>
    <div className="Upper-wallpaper-Container">
      <div className="containerheading" style={{marginTop:'15px', marginLeft:'2px'}}>
        <div className="redbarheading"></div>
        <div className="nameheading">Wallpapers  </div>
      </div>
      </div>
      <div className="Main-Wallpaper-Conainer">
        {MobileWallpaperArray.map((car, index) => (
          <div className="Wallpaper-Container" key={index}>
            <div className="Wallpaper-Page-Img">
              <img src={car.ImgSrc} alt="" loading='lazy' />
            </div>
            <div className="Wallpaper-Page-Name">{car.Name}</div>
            <a href="" download={car.ImgSrc} className="Wallpaper-Page-Download">Download <i class="fa-solid fa-download" style={{fontSize: '18px', marginTop: '1px'}}></i></a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wallpaper;
