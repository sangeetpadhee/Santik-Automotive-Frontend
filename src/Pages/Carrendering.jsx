import React, { useEffect } from 'react'
import '../Style/Carrenderingpage.css'
import { LaptopWallpaperArray } from '../CarsArray/Wallpaper-Array'

const Carrendering = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <>
      <div className="containerheading" style={{ marginTop: '12px', marginLeft: '2px' }}>
        <div className="redbarheading"></div>
        <div className="nameheading">Car Renderings</div>
      </div>
      <div className="Main-Wallpaper-Laptop-Conainer">
        {LaptopWallpaperArray.map((car, index) => (
          <div className="Wallpaper-Laptop-Container" key={index}>
            <div className="Wallpaper-Laptop-Page-Img">
              <img src={car.ImgSrc} alt="" loading='lazy'/>
            </div>
            <div className="Wallpaper-Laptop-Page-Name">{car.Name}</div>
            <a href="" download={car.ImgSrc} className="Wallpaper-Laptop-Page-Download">Download <i class="fa-solid fa-download" style={{ fontSize: '18px', marginTop: '1px' }}></i></a>
          </div>
        ))}
      </div>
    </>
  )
}

export default Carrendering