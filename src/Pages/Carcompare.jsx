import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import '../Style/Carcompare.css';
import brand from '../CarsArray/CarLogoArr';
import items from '../CarsArray/ALL-CAR-DATA';
import compareimg from '../Assets/Compare.jpg'
import vsimg from '../Assets/VS.jpg'

const Carcompare = () => {
  const [BrandPage, setBrandPage] = useState(false);
  const [VariantPage, setVariantPage] = useState(false);
  const [NamePage, setNamePage] = useState(false);
  const [CarName, setCarName] = useState([]);
  const [SelectedBrand, setSelectedBrand] = useState(null);
  const [SelectedCar, setSelectedCar] = useState(null);
  const [SelectedVariant, setSelectedVariant] = useState(null);

  const [BrandPage2, setBrandPage2] = useState(false);
  const [VariantPage2, setVariantPage2] = useState(false);
  const [NamePage2, setNamePage2] = useState(false);
  const [CarName2, setCarName2] = useState([]);
  const [SelectedBrand2, setSelectedBrand2] = useState(null);
  const [SelectedCar2, setSelectedCar2] = useState(null);
  const [SelectedVariant2, setSelectedVariant2] = useState(null);

  const HandleBrand = (brand) => {
    const namefil = items.filter((product) => product.make.toLowerCase() === brand.toLowerCase());
    setSelectedBrand(brand);
    setCarName(namefil);
    setNamePage(true);
  };

  const HandleCar = (car) => {
    const detailfil = items.find((prod) => prod.name.toLowerCase() === car.toLowerCase());
    setSelectedCar(detailfil);
    setNamePage(false);
    setVariantPage(true);
  };

  const HandleClose = (variant) => {
    setSelectedVariant(variant);
    setBrandPage(false);
  };

  const HandleBrand2 = (brand) => {
    const namefiltwo = items.filter((product) => product.make.toLowerCase() === brand.toLowerCase());
    setSelectedBrand2(brand);
    setCarName2(namefiltwo);
    setNamePage2(true);
  };

  const HandleCar2 = (car) => {
    const detailfiltwo = items.find((prod) => prod.name.toLowerCase() === car.toLowerCase());
    setSelectedCar2(detailfiltwo);
    setNamePage2(false);
    setVariantPage2(true);
  };

  const HandleClose2 = (variant) => {
    setSelectedVariant2(variant);
    setBrandPage2(false);
  };

  // Function to get selected variant details
  const getVariantDetails = (car, variantName) => {
    if (!car || !car.variants) return {};
    return car.variants.find(variant => variant.variant === variantName) || {};
  };

  // Get details for selected variants
  const variantDetails = {
    car1: getVariantDetails(SelectedCar, SelectedVariant),
    car2: getVariantDetails(SelectedCar2, SelectedVariant2)
  };

  return (
    <>
    <h1 class="car-comparison-heading">Car Comparison</h1>
      <div className="Choose-Car-Container">
        <div className="Choose-First">
          <div className="Choose-Img" style={SelectedVariant ? { backgroundImage: `url(${SelectedCar?.image2})` } : { backgroundImage: `url(${compareimg})` }}></div>
          {SelectedVariant ? (
            <>
              <div className="Car-Final-Name">{SelectedCar?.name}</div>
              <div className="Car-Final-Variant">{SelectedVariant} <button onClick={() => { setSelectedVariant(null); setVariantPage(false); }}><FontAwesomeIcon icon={faPen}/></button></div>
            </>
          ) : (
            <div className="Choose-Car" onClick={() => setBrandPage(true)}>Choose Car</div>
          )}
        </div>
        <div className="Choose-Vs">
          <img src={vsimg} alt=""/>
        </div>
        <div className="Choose-Second">
          <div className="Choose-Img" style={SelectedVariant2 ? { backgroundImage: `url(${SelectedCar2?.image2})` } : { backgroundImage: `url(${compareimg})` }}></div>
          {SelectedVariant2 ? (
            <>
              <div className="Car-Final-Name">{SelectedCar2?.name}</div>
              <div className="Car-Final-Variant">{SelectedVariant2} <button onClick={() => { setSelectedVariant2(null); setVariantPage2(false); }}><FontAwesomeIcon icon={faPen}/></button></div>
            </>
          ) : (
            <div className="Choose-Car" onClick={() => setBrandPage2(true)}>Choose Car</div>
          )}
        </div>
      </div>

      {BrandPage && (
        <div className="Car-Brand-Name-Conatiner">
          <div className="containerqq" style={{ marginLeft: '-20px', height: '20px' }}>
            <div className="redbar" style={{ height: '30px', borderRadius: '10px' }}></div>
            <div className="name" style={{ fontSize: '16px' }}>Choose Brand</div>
          </div>
          <div className="Car-Brand">
            {brand.map((car, index) => (
              <div className="Brand-Details" key={index}>
                <button onClick={() => HandleBrand(car.brandname)}>
                  <img src={car.imagelink} alt="" />
                  {car.brandname}
                </button>
              </div>
            ))}
          </div>
          {NamePage && (
            <div className="Car-Name">
              <div className="containerqq" style={{ marginLeft: '-20px', height: '20px' }}>
                <div className="redbar" style={{ height: '30px', borderRadius: '10px' }}></div>
                <div className="name" style={{ fontSize: '16px' }}>Choose Car</div>
              </div>
              <div className="Brand-Name-Edit-Container">
                <div className="Brand-Name-Edit">
                  <h1>{SelectedBrand}</h1>
                  <button onClick={() => setNamePage(false)}>X</button>
                </div>
              </div>
              <div className="Car-Name-Detail">
                {CarName && CarName.map((cars, idx) => (
                  <button key={idx} onClick={() => HandleCar(cars.name)}>{cars.name}</button>
                ))}
              </div>
            </div>
          )}
          {VariantPage && SelectedCar && (
            <div className="Car-Name">
              <div className="containerqq" style={{ marginLeft: '-20px', height: '20px' }}>
                <div className="redbar" style={{ height: '30px', borderRadius: '10px' }}></div>
                <div className="name" style={{ fontSize: '16px' }}>Choose Variant</div>
              </div>
              <div className="Brand-Name-Edit-Container">
                <div className="Brand-Name-Edit">
                  <h1>{SelectedBrand}</h1>
                  <button onClick={() => { setNamePage(false); setVariantPage(false); }}>X</button>
                </div>
                <div className="Car-Name-Edit">
                  <h1>{SelectedCar.name.split(`${SelectedBrand} `)[1]}</h1>
                  <span onClick={() => { setVariantPage(false); setNamePage(true); }}>X</span>
                </div>
              </div>
              <div className="Car-Variant-Detail">
                {SelectedCar.variants.map((produ, ind) => (
                  <button key={ind} onClick={() => HandleClose(produ.variant)}>
                    <h1>{produ.variant}</h1>
                    <h2>{produ.price}</h2>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {BrandPage2 && (
        <div className="Car-Brand-Name-Conatiner">
          <div className="containerqq" style={{ marginLeft: '-20px', height: '20px' }}>
            <div className="redbar" style={{ height: '30px', borderRadius: '10px' }}></div>
            <div className="name" style={{ fontSize: '16px' }}>Choose Brand</div>
          </div>
          <div className="Car-Brand">
            {brand.map((car, index) => (
              <div className="Brand-Details" key={index}>
                <button onClick={() => HandleBrand2(car.brandname)}>
                  <img src={car.imagelink} alt="" />
                  {car.brandname}
                </button>
              </div>
            ))}
          </div>
          {NamePage2 && (
            <div className="Car-Name">
              <div className="containerqq" style={{ marginLeft: '-20px', height: '20px' }}>
                <div className="redbar" style={{ height: '30px', borderRadius: '10px' }}></div>
                <div className="name" style={{ fontSize: '16px' }}>Choose Car</div>
              </div>
              <div className="Brand-Name-Edit-Container">
                <div className="Brand-Name-Edit">
                  <h1>{SelectedBrand2}</h1>
                  <button onClick={() => setNamePage2(false)}>X</button>
                </div>
              </div>
              <div className="Car-Name-Detail">
                {CarName2 && CarName2.map((cars, idx) => (
                  <button key={idx} onClick={() => HandleCar2(cars.name)}>{cars.name}</button>
                ))}
              </div>
            </div>
          )}
          {VariantPage2 && SelectedCar2 && (
            <div className="Car-Name">
              <div className="containerqq" style={{ marginLeft: '-20px', height: '20px' }}>
                <div className="redbar" style={{ height: '30px', borderRadius: '10px' }}></div>
                <div className="name" style={{ fontSize: '16px' }}>Choose Variant</div>
              </div>
              <div className="Brand-Name-Edit-Container">
                <div className="Brand-Name-Edit">
                  <h1>{SelectedBrand2}</h1>
                  <button onClick={() => { setNamePage2(false); setVariantPage2(false); }}>X</button>
                </div>
                <div className="Car-Name-Edit">
                  <h1>{SelectedCar2.name.split(`${SelectedBrand2} `)[1]}</h1>
                  <span onClick={() => { setVariantPage2(false); setNamePage2(true); }}>X</span>
                </div>
              </div>
              <div className="Car-Variant-Detail">
                {SelectedCar2.variants.map((produ, ind) => (
                  <button key={ind} onClick={() => HandleClose2(produ.variant)}>
                    <h1>{produ.variant}</h1>
                    <h2>{produ.price}</h2>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

{SelectedVariant && SelectedVariant2 && (
  <div className="Comparison-Table">
    {/* Specifications Table */}
    <div className="containerheading" style={{margin:'30px 0 10px 0'}}>
      <div className="redbarheading"></div>
      <div className="nameheading">Specification :</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>{SelectedCar?.name} ({SelectedVariant})</th>
          <th>{SelectedCar2?.name} ({SelectedVariant2})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Price</td>
          <td>{variantDetails.car1.price}</td>
          <td>{variantDetails.car2.price}</td>
        </tr>
        <tr>
          <td>Transmission</td>
          <td>{variantDetails.car1.transmission}</td>
          <td>{variantDetails.car2.transmission}</td>
        </tr>
        <tr>
          <td>Fuel Type</td>
          <td>{variantDetails.car1.fuelType}</td>
          <td>{variantDetails.car2.fuelType}</td>
        </tr>
      </tbody>
    </table>

    {/* Dimensions Table */}
    <div className="containerheading" style={{margin:'30px 0 10px 0'}}>
      <div className="redbarheading"></div>
      <div className="nameheading">Dimensions :</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>{SelectedCar?.name} ({SelectedVariant})</th>
          <th>{SelectedCar2?.name} ({SelectedVariant2})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Engine Capacity</td>
          <td>{SelectedCar?.engine.capacity}</td>
          <td>{SelectedCar2?.engine.capacity}</td>
        </tr>
        <tr>
          <td>Seating Capacity</td>
          <td>{SelectedCar?.engine['seating capacity']}</td>
          <td>{SelectedCar2?.engine['seating capacity']}</td>
        </tr>
        <tr>
          <td>Length</td>
          <td>{SelectedCar?.dimensions.length}</td>
          <td>{SelectedCar2?.dimensions.length}</td>
        </tr>
        <tr>
          <td>Width</td>
          <td>{SelectedCar?.dimensions.width}</td>
          <td>{SelectedCar2?.dimensions.width}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{SelectedCar?.dimensions.height}</td>
          <td>{SelectedCar2?.dimensions.height}</td>
        </tr>
        <tr>
          <td>Wheel Base</td>
          <td>{SelectedCar?.dimensions.wheelbase}</td>
          <td>{SelectedCar2?.dimensions.wheelbase}</td>
        </tr>
        <tr>
          <td>Ground Clearance</td>
          <td>{SelectedCar?.dimensions.groundClearance}</td>
          <td>{SelectedCar2?.dimensions.groundClearance}</td>
        </tr>
      </tbody>
    </table>

    {/* Variants Table */}
    <div className="containerheading" style={{margin:'30px 0 10px 0'}}>
      <div className="redbarheading"></div>
      <div className="nameheading">Variants :</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>{SelectedCar?.name} ({SelectedVariant})</th>
          <th>{SelectedCar2?.name} ({SelectedVariant2})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Variants</td>
          <td>{SelectedCar?.variants.map(v => v.variant).join(', ')}</td>
          <td>{SelectedCar2?.variants.map(v => v.variant).join(', ')}</td>
        </tr>
      </tbody>
    </table>

    {/* Colors Table */}
    <div className="containerheading" style={{margin:'30px 0 10px 0'}}>
      <div className="redbarheading"></div>
      <div className="nameheading">Colors Available :</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>{SelectedCar?.name} ({SelectedVariant})</th>
          <th>{SelectedCar2?.name} ({SelectedVariant2})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Colors Available</td>
          <td><button>{SelectedCar?.colorsAvailable.join(', ')}</button></td>
          <td>{SelectedCar2?.colorsAvailable.join(', ')}</td>
        </tr>
      </tbody>
    </table>

    {/* Pros & Cons Table */}
    <div className="containerheading" style={{margin:'30px 0 10px 0'}}>
      <div className="redbarheading"></div>
      <div className="nameheading">Pros & Cons :</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>{SelectedCar?.name} ({SelectedVariant})</th>
          <th>{SelectedCar2?.name} ({SelectedVariant2})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Pros</td>
          <td>{SelectedCar?.pros.slice(0, 3).join(', ')}</td>
          <td>{SelectedCar2?.pros.slice(0, 3).join(', ')}</td>
        </tr>
        <tr>
          <td>Cons</td>
          <td>{SelectedCar?.cons.slice(0, 3).join(', ')}</td>
          <td>{SelectedCar2?.cons.slice(0, 3).join(', ')}</td>
        </tr>
      </tbody>
    </table>

    {/* Images Table */}
    <div className="containerheading" style={{margin:'30px 0 10px 0'}}>
      <div className="redbarheading"></div>
      <div className="nameheading">Images :</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>{SelectedCar?.name} ({SelectedVariant})</th>
          <th>{SelectedCar2?.name} ({SelectedVariant2})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Main Image</td>
          <td><img src={SelectedCar?.mainImage} alt="Car 1" /></td>
          <td><img src={SelectedCar2?.mainImage} alt="Car 2" /></td>
        </tr>
        <tr>
          <td>Exterior</td>
          <td><img src={SelectedCar?.image2} alt="Car 1" /></td>
          <td><img src={SelectedCar2?.image2} alt="Car 2" /></td>
        </tr>
        <tr>
          <td>Side-View</td>
          <td><img src={SelectedCar?.image3} alt="Car 1" /></td>
          <td><img src={SelectedCar2?.image3} alt="Car 2" /></td>
        </tr>
        <tr>
          <td>Interior</td>
          <td ><img src={SelectedCar?.image4} alt="Car 1" /></td>
          <td><img src={SelectedCar2?.image4} alt="Car 2" /></td>
        </tr>
      </tbody>
    </table>
  </div>
)}

    </>
  );
};

export default Carcompare;
