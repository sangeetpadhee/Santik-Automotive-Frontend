import React, { useState } from 'react';
import '../Style/Carnewspage.css';
import carnewsarr from '../CarsArray/CarNewsArr';

const Carnews = () => {
  window.scrollTo(0,0);
  // Corrected useState usage
  const [data, setData] = useState(carnewsarr);

  return (
    <>
        <div className="Popular-Car-Heading-Container" >
              <div className="containerheading" style={{marginTop:'0px' }}>
              <div className="redbarheading"></div>
              <div className="nameheading-popular-car" id='Home-Page-Red' >Car News : </div>
              </div>
        </div>
      <div className="containerww">
        {data.map((news, index) => (
          <div key={index} className="detail">
            <div className="img" style={{ backgroundImage: `url(${news.carimg})` }}></div>
            <div className="heading">{news.heading}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Carnews;
