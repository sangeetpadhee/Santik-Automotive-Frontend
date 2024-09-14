import React, { useEffect, useState } from 'react';
import '../Style/Carservicedetail.css';
import items from '../CarsArray/CarServiceData';
import { Link, useParams } from 'react-router-dom';

const CarserviceDetails = () => {
  const { serviceid } = useParams();
  const [ServiceDetail, setServiceDetail] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0)
    const details = items.find((product) => product.serviceid === parseInt(serviceid));
    setServiceDetail(details);
  }, [serviceid]);

  const parseShortText = (text) => {
    const lines = text.split('\n');
    const schedule = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split('\t');
      if (parts.length >= 2) {
        schedule.push({ component: parts[0], petrol: parts[1], diesel: parts[2] || '' });
      } else if (parts.length === 1) {
        schedule.push({ component: parts[0], petrol: '', diesel: '' });
      }
    }
    return schedule;
  };

  return (
    <>
      {ServiceDetail && (
        <div>
          <div className="containerheading">
            <div className="redbarservice"></div>
            <div className="nameheading">{ServiceDetail.name}</div>
          </div>
          <div
            className="servicedetailcarimg"
            style={{ backgroundImage: `url(${ServiceDetail.img})` }}
          ></div>
          <div className="details">
            <table className="service-table">
              <thead>
                <tr>
                  <th>Service Component</th>
                  <th>Petrol</th>
                  <th>Diesel</th>
                </tr>
              </thead>
              <tbody>
                {parseShortText(ServiceDetail.shorttext).map((item, index) => (
                  <tr key={index}>
                    <td>{item.component}</td>
                    <td>{item.petrol}</td>
                    <td>{item.diesel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="containerheading">
            <div className="redbarheading"></div>
            <div className="nameheading">Service Details Of Other Cars</div>
      </div>      
      <div className="cardetailten">
        {items.slice(0,8).map((car, index) => (
          <Link to={`/Car-Service/${car.serviceid}`}><div className="restdetailten" key={index}>
            <div className="restimg" style={{ backgroundImage: `url(${car.img})`, backgroundSize:'cover', height:'120px' }}></div>
            <div className="restinfo">
              <p>{car.name}</p>
              <span>Click Here For More Info</span>
            </div>
          </div></Link>
        ))}
      </div>
    </>
  );
};

export default CarserviceDetails;
