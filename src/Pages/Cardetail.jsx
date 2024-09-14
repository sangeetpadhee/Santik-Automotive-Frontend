import React, { useEffect, useState, useRef } from 'react';
import Search from '../Components/Search';
import '../Style/Cardetailpage.css';
import { Link, useParams } from 'react-router-dom';
import items from '../CarsArray/ALL-CAR-DATA';
import DealerDetails from '../Components/DealerDetails';
import axios from 'axios';

const Cardetail = () => {
  const [buttonRed, setButtonRed] = useState("Variants");
  const [carFeedback, setCarFeedback] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [searchCar, setSearchCar] = useState([]);
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);

  const variantsRef = useRef(null);
  const imagesRef = useRef(null);
  const prosRef = useRef(null);
  const consRef = useRef(null);
  const specsRef = useRef(null);
  const dimensionsRef = useRef(null);
  const colorsRef = useRef(null);
  const reviewsRef = useRef(null);
  const dealerRef = useRef(null);
  const similarCarsRef = useRef(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get('https://santik-automotive-api.onrender.com/api/user/AllFeed');
        setAllFeedback(response.data.feedback);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundCar = items.find((car) => car.id === parseInt(id));
    const relatedCars = items.filter((product) => product.id !== parseFloat(id));
    const similar = relatedCars.filter((product) => product.category === foundCar?.category);
    setSimilarCars(similar);
    setCarData(foundCar || null);
  }, [id]);

  useEffect(() => {
    if (carData && allFeedback.length > 0) {
      const feedbackForCurrentCar = allFeedback.filter((feedback) => feedback.CarName === carData.name);
      setCarFeedback(feedbackForCurrentCar);
    }
  }, [carData, allFeedback]);

  if (!carData) {
    return <p>No data found for this car ID.</p>;
  }

  const getPriceWithoutSuffix = (car) => {
    const priceKey = car['price (Ex-Show)'] || car['Price (Ex-Show)'] || car['price (ex-show)'] || car['price (ex-show)'];
    if (priceKey) {
      const price = priceKey.replace(' (Ex-show)', '').replace(' (Ex-Show)', '').replace('Rs.', '').trim();
      return price;
    }
    return '';
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      const filteredCars = items.filter((car) => car.name.toLowerCase().includes(searchTerm));
      setSearchCar(filteredCars);
    } else {
      setSearchCar([]);
    }
  };

  const resetSearch = () => {
    setSearchCar([]);
  };

  const scrollToSection = (ref, section) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setButtonRed(section);
  };

  const colorsAvailable = [
    "Blazing Red",
    "Cerulean Blue",
    "Fire Brick Red",
    "Frost Blue",
    "Granite Grey",
    "Silky Silver",
    "Arctic White"
  ];

  const colorMap = {
    "Blazing Red": "#FF0000",
    "Cerulean Blue": "#2A52BE",
    "Fire Brick Red": "#B22222",
    "Frost Blue": "#E6E6FA",
    "Granite Grey": "#676767",
    "Silky Silver": "#C0C0C0",
    "Arctic White": "#F8F9FA"
  };

  const getTextColor = (color) => color === "Arctic White" ? 'black' : 'white';

  return (
    <>
      {/* SEARCH BAR */}
      <Search placeholdername={"Search Kia Seltos.."} filterprod={handleSearch} basearr={resetSearch} />

      {/* SEARCH RESULTS */}
      <div className="homesearchprod" style={{ maxHeight: '260px' }}>
        {searchCar.map((car) => (
          <Link key={car.id} to={`/Car-Details/${car.id}`} onClick={resetSearch}>
            <div className="bymakecardetail">
              <div className="imgbybody" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
              <div className="carnamebybody">
                <span>{car.name}</span>
                <p>{getPriceWithoutSuffix(car)} (Ex-Show)</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* TOP SECTION HEADER */}
      <div className="cardetailheader">
        <div className="Button-Manage">
          <button onClick={() => scrollToSection(variantsRef, 'Variants')}>Variants {buttonRed === 'Variants' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(imagesRef, 'Pictures')}>Pictures {buttonRed === 'Pictures' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(prosRef, 'Pros')}>Pros {buttonRed === 'Pros' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(consRef, 'Cons')}>Cons {buttonRed === 'Cons' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(specsRef, 'Specifications')}>Specifications {buttonRed === 'Specifications' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(dimensionsRef, 'Dimensions')}>Dimensions {buttonRed === 'Dimensions' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(colorsRef, 'Colors')}>Colors {buttonRed === 'Colors' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(dealerRef, 'Dealer')}>Dealer {buttonRed === 'Dealer' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(reviewsRef, 'Reviews')}>Reviews {buttonRed === 'Reviews' ? <hr /> : <></>}</button>
          <button onClick={() => scrollToSection(similarCarsRef, 'Similar Cars')}>Similar Cars {buttonRed === 'Similar Cars' ? <hr /> : <></>}</button>
        </div>
      </div>

      {/* CAR DETAILS */}
      <div className="cardetailsecond">
        <div className="cardetailsecondimg" style={{ backgroundImage: `url(${carData.mainImage})` }}></div>
        <div className="cardetailsecondright">
          <h1>{carData.name}</h1>
          <h2>Price: {getPriceWithoutSuffix(carData)} (Ex-Show)</h2>
          <h3>*The Price Mentioned Above Is Ex-Showroom Price Of The Given Car</h3>
        </div>
      </div>

      {/* VARIANTS */}
      <div className="containerheading">
        <div className="redbarheading" ref={variantsRef}></div>
        <div className="nameheading">Variants</div>
      </div>
      <div className="Car-Detail-Third-Container">
        {carData.variants.map((variant, index) => (
          <div className="Car-Detail-Third-Item" key={index}>
            <div className="variantfirstheading">
              <h1>{variant.variant}</h1>
              <h2>{variant.price}</h2>
            </div>
            <div className="variantsecondheading">
              <h1>{variant.fuelType}</h1>
              <h2>{variant.transmission}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGES */}
      <div className="containerheading" ref={imagesRef}>
        <div className="redbarheading"></div>
        <div className="nameheading">Images</div>
      </div>
      <div className="cardetailfour">
        <div className="detailimg1" style={{ backgroundImage: `url(${carData.image4})` }}></div>
        <div className="detailimg2" style={{ backgroundImage: `url(${carData.image2})` }}></div>
        <div className="detailimg3" style={{ backgroundImage: `url(${carData.image3})` }}></div>
      </div>

      {/* PROS */}
      <div className="cardetailfive" ref={prosRef}>
        <div className="containerheading" style={{ marginTop: '0px' }}>
          <div className="redbarheading"></div>
          <div className="nameheading">Pros:</div>
        </div>
        {carData.pros.map((pro, index) => (
          <div className="prosdetail" key={index}>
            <h1>{pro}</h1>
          </div>
        ))}
      </div>

      {/* CONS */}
      <div className="cardetailsix" ref={consRef}>
        <div className="containerheading" style={{ marginTop: '0px' }}>
          <div className="redbarheading"></div>
          <div className="nameheading">Cons:</div>
        </div>
        {carData.cons.map((con, index) => (
          <div className="prosdetail" key={index}>
            <h1>{con}</h1>
          </div>
        ))}
      </div>

      {/* SPECIFICATIONS */}
      <div className="containerheading" ref={specsRef}>
        <div className="redbarheading"></div>
        <div className="nameheading">{carData.name} Car Specification</div>
      </div>
      <table className="cardetailstable">
        <tbody>
          {Object.entries(carData.engine).map(([key, value]) => (
            <tr key={key}>
              <td className="label">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
              <td className="value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DIMENSIONS */}
      <div className="containerheading" ref={dimensionsRef}>
        <div className="redbarheading"></div>
        <div className="nameheading">Dimensions Of {carData.name}</div>
      </div>
      <table className="cardetailstable">
        <tbody>
          {Object.entries(carData.dimensions).map(([key, value]) => (
            <tr key={key}>
              <td className="label">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
              <td className="value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* COLORS */}
      <div className="containerheading" ref={colorsRef}>
        <div className="redbarheading"></div>
        <div className="nameheading">Colors Offered:</div>
      </div>
      <div className="cardetailnine">
        {colorsAvailable.map(color => (
          <button
            key={color}
            style={{
              backgroundColor: colorMap[color],
              color: getTextColor(color),
              padding: '10px',
              margin: '5px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {color}
          </button>
        ))}
      </div>

      {/* DEALER DETAILS */}
      <DealerDetails make={carData.make} refer={dealerRef} />

      {/* FEEDBACK */}
      <div className="containerheading" ref={reviewsRef}>
        <div className="redbarheading"></div>
        <div className="nameheading">User Reviews On {carData.name}</div>
      </div>
      <div className="User-Review-On-Car">
        {carFeedback.length > 0 ? (
          carFeedback.map((feed, index) => (
            <div className="User-Review-On-Car-Container" key={index}>
              <div className="User-Review-Upper">
                <div className="User-Review-Img" style={{ backgroundImage: `url(${feed.UserDetail.imageLink})` }}></div>
                <h1>{feed.UserDetail.name}</h1>
              </div>
              <div className="User-Review-Feedback">
                <p>{feed.Feedback}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No Reviews On This Car Made Yet</p>
        )}
      </div>

      {/* SIMILAR CARS */}
      <div className="containerheading" ref={similarCarsRef}>
        <div className="redbarheading"></div>
        <div className="nameheading">Other Similar Cars:</div>
      </div>
      <div className="cardetailten">
        {similarCars.map((car) => (
          <Link key={car.id} to={`/Car-Details/${car.id}`}>
            <div className="restdetailten">
              <div className="restimg" style={{ backgroundImage: `url(${car.mainImage})` }}></div>
              <div className="restinfo">
                <p>{car.name}</p>
                <h1>{getPriceWithoutSuffix(car)} (Ex-show)</h1>
                <span>Click Here For More Info</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cardetail;
