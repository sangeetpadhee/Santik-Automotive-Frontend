import React, { useEffect, useState } from 'react';
import '../Style/Caraccessoriesdetail.css';
import items from '../CarsArray/CarAccessoriesPro';
import { Link, useParams } from 'react-router-dom';

const Caraccessoriesdetail = () => {
  const { prodid } = useParams();
  const [AccessoryDetails, setAccessoryDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0)
    const proddetails = items.find((prod)=> prod.prodid===parseFloat(prodid))
    setAccessoryDetails(proddetails)
  }, [prodid])

  const relatedAccProducts = items.filter((product) => product.prodid !== parseFloat(prodid));

  const startIndex = Math.floor(Math.random() * Math.max(1, relatedAccProducts.length - 8));
  const displayedProducts = relatedAccProducts.slice(startIndex, startIndex + 8);

  if (!AccessoryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="page-container">
        <header className="header">
          <div className="containerheading" style={{ margin: '0px' }}>
            <div className="redbarheading"></div>
            <div className="nameheading" style={{ fontWeight: '450' }}>Car Accessory Details :</div>
          </div>
        </header>

        <div className="content-wrapper">
          <aside className="sidebar">
            <nav>
              <ul>
                <li><a href="#overview">Overview</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </nav>
          </aside>

          <main className="main-content">
            <section id="overview" className="section overview">
              <div className="product-details">
                <img src={AccessoryDetails.image} alt={AccessoryDetails.name} />
                <div className="product-info">
                  <h3>{AccessoryDetails.name}</h3>
                  <div className="price-rating">
                    <button>Price: {AccessoryDetails.price}</button>
                    <button>Rating: {AccessoryDetails.rating}</button>
                  </div>
                </div>
              </div>
            </section>
            <div className="Product-Desc">
              <div className="containerheading" style={{ marginTop: '5px' }}>
                <div className="redbarheading"></div>
                <div className="nameheading" style={{ fontWeight: '500' }}>Product Description:</div>
              </div>
              <div className="Acce-Description">{AccessoryDetails.description}</div>
              <button>Buy Now</button>
            </div>
          </main>
        </div>
      </div>
      <div className="containerheading" style={{ marginTop: '20px' }}>
        <div className="redbarheading"></div>
        <div className="nameheading" style={{ fontWeight: '500' }}>Similar Products:</div>
      </div>
      <div className="Acc-Detail-Container">
        {displayedProducts.map((product) => (
          <Link to={`/Car-Accessories/${product.prodid}`} key={product.prodid}>
            <div className="caraccsec">
              <div className="caraccimg" style={{ backgroundImage: `url(${product.image})` }}></div>
              <div className="caraccname">{product.name}</div>
              <div className="pricerating">
                <h1>{product.price}</h1>
                <span>{product.rating}🌟</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Caraccessoriesdetail;
