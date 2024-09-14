import React, { useState, useEffect } from 'react';
import '../Style/Usedcar.css';
import Search from '../Components/Search';
import item from '../CarsArray/UsedcarArr';
import { Link } from 'react-router-dom';

const Usedcar = () => {
  window.scrollTo(0,0);
  const [carArr, setCarArr] = useState(item);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    price: '',
    km: '',
    fuel: '',
    make: '',
    transmission: ''
  });

  useEffect(() => {
    let filteredCars = item;

    // Apply search filter
    if (filters.search) {
      filteredCars = filteredCars.filter((product) => product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply city filter
    if (filters.city) {
      filteredCars = filteredCars.filter((product) => product.city && product.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.price) {
      filteredCars = filteredCars.filter((product) => {
        const price = product.price ? parseFloat(product.price.replace(/[^0-9.-]+/g, '')) : 0;
        if (filters.price === '5lakh') return price < 500000;
        if (filters.price === '10lakh') return price >= 500000 && price < 1000000;
        if (filters.price === '15lakh') return price >= 1000000 && price < 1500000;
        if (filters.price === '15+lakh') return price >= 1500000;
        return true;
      });
    }

    // Apply km filter
    if (filters.km) {
      filteredCars = filteredCars.filter((product) => {
        const kmrun = product.kmrun ? parseInt(product.kmrun.replace(/[^0-9]+/g, '')) : 0;
        if (filters.km === '10k') return kmrun < 10000;
        if (filters.km === '20k') return kmrun >= 10000 && kmrun < 20000;
        if (filters.km === '50k') return kmrun >= 20000 && kmrun < 50000;
        if (filters.km === '50+k') return kmrun >= 50000;
        return true;
      });
    }

    // Apply fuel filter
    if (filters.fuel) {
      filteredCars = filteredCars.filter((product) =>
        product.fuel && product.fuel.toLowerCase().includes(filters.fuel.toLowerCase())
      );
    }

    // Apply make filter
    if (filters.make) {
      filteredCars = filteredCars.filter((product) =>
        product.brand && product.brand.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    // Apply transmission filter
    if (filters.transmission) {
      filteredCars = filteredCars.filter((product) =>
        product.transmission && product.transmission.toLowerCase().includes(filters.transmission.toLowerCase())
      );
    }

    setCarArr(filteredCars);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const searchfilter = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value
    }));
  };

  const resetsearch = () => {
    setFilters({
      search: '',
      city: '',
      price: '',
      km: '',
      fuel: '',
      make: '',
      transmission: ''
    });
  };

  return (
    <>
      <Search 
        placeholdername="Search Mahindra Bolero..." 
        filterprod={searchfilter} 
        resetSearch={resetsearch} 
      />
      <div className="containerqq" style={{ marginLeft: '-25px' }}>
        <div className="redbar"></div>
        <div className="name">Search Car By Filter :</div>
      </div>
      <div className="cardetailheader" style={{ marginTop: '-10px', height: 'auto', flexWrap: 'wrap' }}>
        <select name="city" id="place" onChange={handleFilterChange}>
          <option value="">By City</option>
          <option value="bhubaneswar">Bhubaneswar</option>
          <option value="cuttack">Cuttack</option>
          <option value="rourkela">Rourkela</option>
          <option value="berhampur">Berhampur</option>
          <option value="jharsuguda">Jharsuguda</option>
          <option value="baleswar">Baleswar</option>
          <option value="bargarh">Bargarh</option>
          <option value="angul">Angul</option>
          <option value="puri">Puri</option>
          <option value="balangir">Balangir</option>
          <option value="khordha">Khordha</option>
        </select>
        <select name="price" id="sortprice" onChange={handleFilterChange}>
          <option value="">By Price</option>
          <option value="5lakh">Less Than 5 Lakh</option>
          <option value="10lakh">5 To 10 Lakh</option>
          <option value="15lakh">10 To 15 Lakh</option>
          <option value="15+lakh">Above 15 Lakh</option>
        </select>
        <select name="km" id="km" onChange={handleFilterChange}>
          <option value="">By Km</option>
          <option value="10k">Less Than 10,000</option>
          <option value="20k">10,000-20,000</option>
          <option value="50k">20,000-50,000</option>
          <option value="50+k">Above 50,000</option>
        </select>
        <select name="fuel" id="fuel" onChange={handleFilterChange}>
          <option value="">By Fuel</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="cng">CNG</option>
          <option value="ev">EV</option>
        </select>
        <select name="make" id="make" onChange={handleFilterChange}>
          <option value="">By Brand</option>
          <option value="maruti">Maruti Suzuki</option>
          <option value="tata">Tata</option>
          <option value="toyota">Toyota</option>
          <option value="mahindra">Mahindra</option>
          <option value="kia">Kia</option>
          <option value="skoda">Skoda</option>
          <option value="mg">MG</option>
          <option value="honda">Honda</option>
          <option value="volkswagen">Volkswagen</option>
          <option value="renault">Renault</option>
          <option value="ford">Ford</option>
          <option value="isuzu">Isuzu</option>
          <option value="bmw">BMW</option>
          <option value="mercedesbenz">Mercedes-Benz</option>
          <option value="volvo">Volvo</option>
          <option value="mini">Mini</option>
          <option value="hyundai">Hyundai</option>
        </select>
        <select name="transmission" id="transmission" onChange={handleFilterChange}>
          <option value="">By Transmission</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>
      <div className="usedcarcontainer">
        {carArr.map((used, index) => (
          <Link to={`/Used-Car/${used.carid}`}><div className="usedcarsec" key={index}>
            <div className="usedcarimg" style={{ backgroundImage: `url(${used.image})`}}></div>
            <div className="usedcarname"><h1>{used.name}</h1></div>
            <div className="usedcarprice">
              <h1>{used.price}</h1>
              <span>{used.transmission}</span>
            </div>
            <div className="locationkm">
              <h1>{used.city}</h1>
              <span>{used.kmrun}</span>
            </div>
          </div></Link> 
        ))}
      </div>
    </>
  );
};

export default Usedcar;
