import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import '../Style/Newcarpage.css'
import hatch from '../Assets/hatchback.png'
import sedan from '../Assets/sedan.png'
import suv from '../Assets/suv.png'
import muv from '../Assets/muv.jpg'
import carlogo from '../CarsArray/CarLogoArr'
import items from '../CarsArray/ALL-CAR-DATA'
import Carousel from '../Components/CarouselCar'
import { Link } from 'react-router-dom'
import { onetofive, fivetoten, tentofifteen, fifteentothirty, abovethirty } from '../CarsArray/BY-PRICE'


window.scrollTo(0,0);
const Newcar = () => {
  const [searchcar, setSearchCar] = useState([])
  const [body, setBody] = useState([])
  const [logo, setLogo] = useState(carlogo)
  const [brand, setBrand] = useState([])
  const [byprice, setByPrice] = useState([])

  const filtermake = ((make) => {
    const filterbymake = items.filter((product) => product.make == make)
    setBrand(filterbymake)
  })

  const filterbody = (categories) => {
    const filterbybody = items.filter((product) => categories.includes(product.category));
    setBody(filterbybody);
  };

  const handlesearch = (e) => {
    const searchletter = e.target.value.toLowerCase();
    if(searchletter){
    const searchitem = items.filter((product) => product.name.toLowerCase().includes(searchletter));
    setSearchCar(searchitem);
    }else{
        setSearchCar([]);
    }
};
const resetsearch =()=>{
setSearchCar([])
}
const getPriceWithoutSuffix = (car) => {
    const priceKey = car['price (Ex-Show)'] || car['Price (Ex-Show)'] || car['price (ex-show)'] || car['price (ex-show)'];
    if (priceKey) {
        const exshow = priceKey.replace(' (Ex-show)', '').replace(' (Ex-Show)', '');
        const rs = exshow.replace('Rs.', '').trim();
        return rs;
    }
    return '';
};

  return (
    <>
      <Carousel/>
      {/* SEARCH BAR */}

      <Search placeholdername={"Search Kia Seltos.."} filterprod={handlesearch} basearr={resetsearch} />

      <div className="homesearchprod" style={{maxHeight:'345px'}}>
        {searchcar.map((car, index) => (
          <Link key={car.id} to={`/Car-Details/${car.id}`}><div className="bymakecardetail">
            <div className="imgbybody" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
            <div className="carnamebybody">
              <span>{car.name}</span>
              <p>{getPriceWithoutSuffix(car)} (Ex-Show)</p>
            </div>
          </div></Link>
        ))}

      </div>
      <div className="newcarcontainer">
        {/* BY BODY */}
        <div className="containerheading">
          <div className="redbarheading"></div>
          <div className="nameheading">By Body</div>
        </div>
        <div className="bybody">
          <div className="leftbybody">
            <div className="bybodybox" onClick={() => filterbody(['fronxsegment', 'premiumhatchback', 'lowprice', 'mini'])}>
              <img src={hatch} alt="" />
              <p>Hatchback</p>
            </div>
            <div className="bybodybox" onClick={() => filterbody(['sedan', '3seriessegment', 'eclass', '7series', 'rolls'])}>
              <img src={sedan} alt="" />
              <p>Sedan</p>
            </div>
            <div className="bybodybox" onClick={() => filterbody(['sub4metersuv', 'premiumsub4meter', 'tharsegment', 'fortunersegment', 'glssegment', 'dbxsegment', 'gwagonsegment'])}>
              <img src={suv} style={{ marginTop: '-15px' }} alt="" />
              <p>SUV</p></div>
            <div className="bybodybox" onClick={() => filterbody(['mpv', 'innovasegment', 'costlyvan'],)}>
              <img src={muv} style={{ marginTop: '-4px' }} alt="" />
              <p>MUV</p></div>
          </div>
          <div className="rightbybody">
            {body.slice(0, 8).map((car, index) => (
             <Link to={`/Car-Details/${car.id}`}> <div className="bybodycardetail">
                <div className="imgbybody" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
                <div className="carnamebybody">
                  <span>{car.name}</span>
                  <p>{getPriceWithoutSuffix(car)} (Ex-Show)</p>
                </div>
              </div> </Link>
            ))}
          </div>
        </div>
        <div className="restbymake" style={{height:'auto'}}>
          {body.slice(8).map((car, index) => (
            <Link to={`/Car-Details/${car.id}`}><div className="restdetail" key={index} style={{marginBottom:'5px'}}>
              <div className="restimg" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
              <div className="restinfo">
                <p>{car.name}</p>
                <h1>{getPriceWithoutSuffix(car)} (Ex-show)</h1>
                <span>Click Here For More Info</span>
              </div>
            </div></Link>
          ))}
        </div>


        {/* BY PRICE */}

        <div className="containerheading">
          <div className="redbarheading"></div>
          <div className="nameheading">By Price</div>
        </div>
        <div className="bypricesec">
          <div className="leftbyprice">
            {byprice.slice(0, 8).map((car, index) => (
              <Link to={`/Car-Details/${car.id}`}><div className="bypricecardetail">
                <div className="imgbybody" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
                <div className="carnamebybody">
                  <span>{car.name}</span>
                  <p>{getPriceWithoutSuffix(car)} (Ex-Show)</p>
                </div>
              </div></Link>
            ))}
          </div>
          <div className="rightbyprice">
            <button class="button-28" role="button" onClick={() => setByPrice(onetofive)} >1-5 Lakh</button>
            <button class="button-28" role="button" onClick={() => setByPrice(fivetoten)} >5-10 Lakh</button>
            <button class="button-28" role="button" onClick={() => setByPrice(tentofifteen)} >10-15 Lakh</button>
            <button class="button-28" role="button" onClick={() => setByPrice(fifteentothirty)} >15-30 Lakh</button>
            <button class="button-28" role="button" onClick={() => setByPrice(abovethirty)} >Above 30 Lakh</button>
          </div>
        </div>
        <div className="restbymake" style={{height:'auto'}}>
          {byprice.slice(8).map((car, index) => (
            <Link to={`/Car-Details/${car.id}`}><div className="restdetail" key={index} style={{marginBottom:'5px'}}>
              <div className="restimg" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
              <div className="restinfo">
                <p>{car.name}</p>
                <h1>{getPriceWithoutSuffix(car)} (Ex-show)</h1>
                <span>Click Here For More Info</span>
              </div>
            </div></Link>
          ))}
        </div>

        {/* BY MAKE */}

        <div className="containerheading">
          <div className="redbarheading"></div>
          <div className="nameheading">By Make</div>
        </div>
        <div className="bymakesec">
          <div className="leftbymake">
            <div className="minicontainer">
              {logo.map((car, index) => (
                <div key={index} className="boxcontainer" onClick={() => filtermake(car.brandname)}>
                  <div className="carlogobox" style={{ backgroundImage: `url(${car.imagelink})` }}></div>
                  <p>{car.brandname}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rightbymake">
            {brand.slice(0, 6).map((car, index) => (
              <Link to={`/Car-Details/${car.id}`}><div className="bymakecardetail">
                <div className="imgbybody" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
                <div className="carnamebybody">
                  <span>{car.name}</span>
                  <p>{getPriceWithoutSuffix(car)} (Ex-Show)</p>
                </div>
              </div></Link>
            ))}
          </div>
        </div>
        <div className="restbymake" style={{height:'auto'}}>
          {brand.slice(6).map((car, index) => (
            <Link to={`/Car-Details/${car.id}`}><div className="restdetail" key={index} style={{marginBottom:'5px'}}>
              <div className="restimg" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
              <div className="restinfo">
                <p>{car.name}</p>
                <h1>{getPriceWithoutSuffix(car)} (Ex-show)</h1>
                <span>Click Here For More Info</span>
              </div>
            </div></Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Newcar