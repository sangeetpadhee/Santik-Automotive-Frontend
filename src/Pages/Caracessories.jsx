import React, { useEffect, useState } from 'react';
import items from '../CarsArray/CarAccessoriesPro'; 
import '../Style/Caraccessories.css';
import Search from '../Components/Search';
import { Link } from 'react-router-dom';

const Caracessories = () => {
  window.scrollTo(0,0);
  const [prodArr, setProdArr] = useState(items);
  const [filters, setFilters] = useState({
    search: '',
    price: '',
    rating: ''
  });

  useEffect(() => {
    let filteredProd = items;

    // Search filter
    if (filters.search) {
      filteredProd = filteredProd.filter((product) => 
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price filter
    if (filters.price) {
      filteredProd = filteredProd.filter((product) => {
        const price = product.price ? parseFloat(product.price.replace(/[^0-9.]+/g, '')) : 0;
        if (filters.price === '100') return price < 100;
        if (filters.price === '200') return price >= 100 && price <= 200;
        if (filters.price === '500') return price > 200 && price <= 500;
        if (filters.price === '500+') return price > 500;
        return true;
      });
    }

    // Rating filter
    if (filters.rating) {
      filteredProd = filteredProd.filter((product) => {
        const rating = product.rating || 0; // Default to 0 if rating is undefined or null
        if (filters.rating === 'rating1') return rating < 2;
        if (filters.rating === 'rating2') return rating < 3;
        if (filters.rating === 'rating3') return rating > 4;
        return true;
      });
    }

    setProdArr(filteredProd); // Update state with the filtered products
  }, [filters]);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      search: e.target.value
    }));
  };

  return (
    <>
      <Search placeholdername={"Search Car Accessories.."} filterprod={handleSearch} />
      <div className="cardetailheader">
        <button>Filter By :</button>
        <select name="price" id="price" onChange={handleFilter}>
          <option value="">By Price</option>
          <option value="100">Less Than ₹100</option>
          <option value="200">₹100 To ₹200</option>
          <option value="500">₹200 To ₹500</option>
          <option value="500+">More Than ₹500</option>
        </select>
        <select name="rating" id="rating" onChange={handleFilter}>
          <option value="">By Rating</option>
          <option value="rating1">Less Than 2 🌟</option>
          <option value="rating2">Less Than 3 🌟</option>
          <option value="rating3">More Than 4 🌟</option>
        </select>
      </div>
      <div className="caracccontainer">
        {prodArr.map((product, index) => (
          <Link to={`/Car-Accessories/${product.prodid}`}><div className="caraccsec" key={index}>
            <div className="caraccimg" style={{ backgroundImage: `url(${product.image})` }}></div>
            <div className="caraccname">{product.name}</div>
            <div className="pricerating">
              <h1>{product.price}</h1>
              <span>{product.rating}🌟</span>
            </div>
          </div></Link>
        ))}
      </div>
    </>
  );
};

export default Caracessories;
