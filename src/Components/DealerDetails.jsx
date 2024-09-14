import React, { useEffect, useState } from 'react';
import Dealer from '../CarsArray/Dealer-Array';
import '../Style/DealerArray.css';

const DealerDetails = ({ make ,refer }) => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    const dealers = Dealer.filter((prod) => prod.brandname === make);
    setBrandList(dealers);
  }, [make]);

  return (
    <>
      <div className="containerheading">
        <div className="redbarheading" ref={refer}></div>
        <div className="nameheading">{make} Showrooms :</div>
      </div>
      {brandList ? (
        <div className="Dealer-Showroom-Container">
        {brandList.map((dealer, dealerIndex) => (
            <div key={dealerIndex} className="Dealer-Showroom-Details">
                <div className="Dealer-Showroom-Name">{dealer.dealername}</div>
                <div className="Dealer-Showroom-Address">{dealer.address}</div>
                <div className="Dealer-Showroom-Contact">{dealer.contact}</div>
            </div>
         ))}
    </div>
      ) : (
        <p>No dealers found for this brand.</p>
      )}
    </>
  );
};

export default DealerDetails;
