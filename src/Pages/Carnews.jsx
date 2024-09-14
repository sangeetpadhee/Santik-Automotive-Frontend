import React, { useState } from 'react';
import '../Style/Carnewspage.css';
import carnewsarr from '../CarsArray/CarNewsArr';

const Carnews = () => {
  window.scrollTo(0,0);
  // Corrected useState usage
  const [data, setData] = useState(carnewsarr);

  return (
    <>
      <div className="containerqq">
        <div className="redbar"></div>
        <div className="name">CAR NEWS</div>
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
