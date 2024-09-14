import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../Style/UpperBelow.css";
import "../Style/MediaQuery.css";
import "../Style/Search.css";
import "../Style/PopularCar.css";
import "../Style/ChooseSec.css";
import "../Style/CarNews.css";
import HomeFilter from '../CarsArray/HomeFilter.jsx';
import Carousel from './CarouselComp.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import headcarimg from "../Assets/Untitled-1.png";
import rendering1 from "../Assets/SCORPIO.png"
import rendering2 from "../Assets/TOYOTADELTA.png"
import rendering3 from "../Assets/ENDEAVOURFACELIFT.png"
import { Link } from 'react-router-dom';
import items from '../CarsArray/ALL-CAR-DATA.jsx'
import Search from './Search.jsx';

const Home = () => {
    const [searchcar, setSearchCar] = useState([])
    const [currentCars, setCurrentCars] = useState(HomeFilter.popfive); // Initialize state correctly
    const [NewHeight, setNewHeight] = useState(false)

    // Event handlers to update currentCars state
    const handleFiveLk = () => setCurrentCars(HomeFilter.popfive);
    const handleTenLk = () => setCurrentCars(HomeFilter.popten);
    const handleFifteenLk = () => setCurrentCars(HomeFilter.popfifteen);
    const handleThirty = () => setCurrentCars(HomeFilter.popthirty);
    const handleAboveTh = () => setCurrentCars(HomeFilter.popabove);

    const handlesearch = (e) => {
        const searchletter = e.target.value.toLowerCase();
        if (searchletter) {
            const searchitem = items.filter((product) => product.name.toLowerCase().includes(searchletter));
            setSearchCar(searchitem);
        } else {
            setSearchCar([]);
        }
    };
    const resetsearch = () => {
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
            {/* UPPER BELOW */}
            <div className="upperbelow">
                <div className="redlineupper"></div>
                <div className="upperbelowbox">
                    <li>LATEST CAR NEWS</li>
                    <li>NEW CAR & PRICE</li>
                    <li>CAR WALLPAPERS</li>
                    <li>CAR RENDERINGS</li>
                </div>
                <img src={headcarimg} alt="" className='carupper' />
            </div>

            {/* SEARCH BAR */}

            <Search placeholdername={"Search Kia Seltos.."} filterprod={handlesearch} basearr={resetsearch} />

            <div className="homesearchprod">
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

            {/* ChooseSec */}
            <div className="container">
                <div className="onerow">
                    <Link to='/car-news'><div className='carnews' ></div></Link>
                    <Link to='/new-car'><div className='newcar'></div></Link>
                </div>
                <div className="secondrow">
                    <Link to='/wallpaper'><div className='wallpaper'></div></Link>
                    <Link to='/car-rendering'><div className='carrendering'></div></Link>
                </div>
            </div>

            {/* Popular Car */}
            <div className="byprice">
            <div className="containerheading" style={{margin:'6px auto 12px auto' }}>
                 <div className="redbarheading"></div>
                 <div className="nameheading" id='Home-Page-Red' >Popular Car By Budget : </div>
            </div>
                <div className="upperbyprice">
                    <button className="budget" id="oneto" onClick={handleFiveLk}>1-5 Lakh</button>
                    <button className="budget" onClick={handleTenLk}>5-10 Lakh</button>
                    <button className="budget" onClick={handleFifteenLk}>10-15 Lakh</button>
                    <button className="budget" onClick={handleThirty}>15-30 Lakh</button>
                    <button className="budget" onClick={handleAboveTh}>Above 30 Lakh</button>
                </div>

                <div className="bypricecardetail1">
                    {currentCars.map((car, index) => (
                       <Link to={`/Car-Details/${car.id}`}><div key={index} className="bycarpricedetailitem">
                            <div className="imgsec" style={{ backgroundImage: `url(${car.img})` }}></div>
                            <span id="namesec">{car.Name}</span>
                            <span id="pricesec">{car.price}</span>
                        </div></Link> 
                    ))}
                </div>
                <div className="extraspace"></div>
            </div>
            {/* Categories Section */}
      <div className="categories-container" style={{ height: NewHeight ? 'auto' : '' }}>
        <div className="header-new">
        <div className="containerheading" style={{marginTop:'6px', backgroundColor:'#fff' }}>
                 <div className="redbarheading" id='Home-Page-RedBar' ></div>
                 <div className="nameheading" id='Home-Page-Red' style={{color:'black'}}>Explore Our Categories </div>
            </div>
          <a className="view-all-link" onClick={() => setNewHeight(!NewHeight)}>View All Services ➔</a>
        </div>
        <div className="categories-grid">
            <Link to='/Car-Service'><div className="category-card">
              <img src={"https://img.freepik.com/premium-vector/auto-service-repair-cars-maintenance-workshop-with-mechanics-team_333239-68.jpg"} className="category-image" />
              <h3>Car Service</h3>
              <p>Discover service prices and schedule your car maintenance easily.</p>
            </div></Link>
            <Link to='/Car-Compare'><div className="category-card">
              <img src={"https://imgd.aeplcdn.com/1280x720/n/cw/ec/155249/front-view0.jpeg?isig=0"} className="category-image" />
              <h3>Car Comparison</h3>
              <p>Compare car models to choose the best one for you.</p>
            </div></Link>
           <Link to='/UsedCar'><div className="category-card">
              <img src={"https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://img.haymarketsac.in/autocarpro/5f918a8b-cfba-4db3-a8fb-e2a9fe026723_prewwowned-cars.jpg&w=750&h=490&q=75&c=1"} className="category-image" />
              <h3>Used Car</h3>
              <p>Browse verified pre-owned cars and find great deals near you.</p>
            </div></Link>
            <Link to='/CarAccessories'><div className="category-card">
              <img src={"https://5.imimg.com/data5/SELLER/Default/2023/7/329445291/GM/TD/PC/193857351/car-accessories.jpeg"} className="category-image" />
              <h3>Car Accessories</h3>
              <p>Discover accessories to enhance and personalize your car.</p>
            </div></Link>
        </div>
              {/* Features Section */}
      <div className="features-container">
        <div className="features-grid">
            <Link to='/Feedbacks'><div className="feature-card" >
              <div className="feature-icon" style={{backgroundImage:`url(${"https://yt3.googleusercontent.com/mdzV0zJH1H4aK_GQbT8Bx9lBlDI6nu8y3heMLcJYKqwzZ2mCo5p3R-7Kuvp5p5aWhSYPgrvv=s900-c-k-c0x00ffffff-no-rj"})`}}></div>
              <h3>Car Reviews</h3>
              <p>Read & write reviews on the latest car models</p>
            </div></Link>
            <Link to='/Car-Rc-Details'><div className="feature-card" >
             <div className="feature-icon" style={{backgroundImage:`url(${"https://loconav.com/vahan/wp-content/uploads/2020/11/rc-certificate.png"})`}}></div>
              <h3>RC Check</h3>
              <p>Quickly access detailed registration info for any vehicle.</p>
            </div></Link> 
            <Link to='/Emi-Calculator'><div className="feature-card" >
              <div className="feature-icon" style={{backgroundImage:`url(${"https://img.freepik.com/premium-vector/calculator-icon-vector_614983-3715.jpg"})`}}></div>
              <h3>EMI Calculator</h3>
              <p>'Calculate your car loan EMI easily with our tool.</p>
            </div>  </Link> 
            <Link to='/Car-Dealer'><div className="feature-card" >
              <div className="feature-icon" style={{backgroundImage:`url(${"https://static.wixstatic.com/media/eb3040_c0eb112d6351421cb306fc807236823b~mv2.jpg/v1/fill/w_922,h_482,al_c,lg_1,q_85/eb3040_c0eb112d6351421cb306fc807236823b~mv2.jpg"})`}}></div>
              <h3>Car Dealers</h3>
              <p>Find reliable car dealers in your area.</p>
            </div></Link> 
            <Link to='/wallpaper'><div className="feature-card" >
              <div className="feature-icon" style={{backgroundImage:`url(${"https://cdn.shopify.com/app-store/listing_images/08313cab5d04fcc9a59ffc39eefa1521/icon/CPuHmrL0lu8CEAE=.png"})`}}></div>
              <h3>Customised Wallpapers</h3>
              <p>Calculate your car loan EMI quickly and accurately.</p>
            </div></Link> 
            <Link to='/new-car'><div className="feature-card" >
              <div className="feature-icon" style={{backgroundImage:`url(${"https://img.freepik.com/premium-vector/car-icon-car-icon-white-background-illustration_995545-84.jpg"})`}}></div>
              <h3>Explore Cars</h3>
              <p>Browse through a wide selection of cars.</p>
            </div></Link> 
            
        </div>
      </div>
      </div>


            {/* Car News */}
            <div className="containerheading" style={{margin:'30px 0 12px 20px' }}>
                 <div className="redbarheading"></div>
                 <div className="nameheading" id='Home-Page-Red'>Latest Car News : </div>
            </div>
            <Carousel />

            {/* MORE WALLPAPER */}
            <div className="popularcar">
                <div className="containerheading" style={{marginTop:'10px'}}>
                    <div className="redbarheading"></div>
                    <div className="nameheading" id='Home-Page-Red'>Car Renderings</div>
                </div>
                <div className="popularcarlist">
                    <div className="popularcarbody" style={{ backgroundImage: `url(${rendering1})` }}>
                    </div>
                    <div className="popularcarbody" style={{ backgroundImage: `url(${rendering2})` }}>
                    </div>
                    <div className="popularcarbody" style={{ backgroundImage: `url(${rendering3})` }}>
                    </div>
                    <div className="formorefilter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <span>Click Below For More Renderings</span>
                        <Link to='/car-rendering'><button className="formorefilterbutton">Click Here</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
