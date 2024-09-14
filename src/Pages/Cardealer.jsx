import React, { useState } from 'react'
import '../Style/Cardealer.css'
import Logo from '../CarsArray/CarLogoArr'
import items from '../CarsArray/Dealer-Array'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown , faAngleUp} from '@fortawesome/free-solid-svg-icons'

const Cardealer = () => {
    const [selectedBrandIndex, setSelectedBrandIndex] = useState(null);
    const [dealerInfo, setDealerInfo] = useState([]);

    const handleDealer = (index, make) => {
        if(selectedBrandIndex === index){
            setSelectedBrandIndex(null);
            setDealerInfo([]);
        }else{
        setSelectedBrandIndex(index);
        const dealerfind = items.filter((prod) => prod.brandname === make);
        setDealerInfo(dealerfind);
    }
    }

    return (
        <>
<div className="containerheading" style={{ margin: '15px 0px 10px 10px' }}>
    <div className="redbarheading"></div>
    <div className="nameheading">Choose The Car Brand:</div>
</div>
<div className="Car-Brands-Container">
    <ul className="Car-Brands-List">
        {Logo.map((brand, index) => (
            <React.Fragment key={index}>
                 <li
                    className="Car-Brand-Item"
                            onClick={() => handleDealer(index, brand.brandname)}
                 >
                    <div className="Brand-Details">
                        <button>
                            <img src={brand.imagelink} alt={brand.brandname} />
                            {brand.brandname}
                        </button>
                     </div>
                     <div className="Choose-Icon">{selectedBrandIndex===index ?<FontAwesomeIcon icon={faAngleUp} onClick={()=> handleDealer(index, brand.brandname)}/>:<FontAwesomeIcon icon={faAngleDown} onClick={()=> handleDealer(index, brand.brandname)} />}</div>
                 </li>
                {selectedBrandIndex === index && dealerInfo.length > 0 &&(
                     <div className="Dealer-Info-Container">
                        {dealerInfo.map((dealer, dealerIndex) => (
                            <div key={dealerIndex} className="Dealer-Info-Details">
                                <div className="Dealer-Info-Name">{dealer.dealername}</div>
                                <div className="Dealer-Info-Address">{dealer.address}</div>
                                <div className="Dealer-Info-Contact">{dealer.contact}</div>
                            </div>
                         ))}
                    </div>
                )}
            </React.Fragment>
         ))}
    </ul>
</div>
        </>
    );
}

export default Cardealer
