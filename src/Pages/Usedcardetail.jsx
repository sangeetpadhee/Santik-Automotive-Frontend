import React, { useEffect, useState } from 'react';
import '../Style/Usedcardetail.css';
import items from '../CarsArray/UsedcarArr';
import { Link, useParams } from 'react-router-dom';

const Usedcardetail = () => {
    window.scrollTo(0,0);
    const { carid } = useParams();
    const [detailusedcar, setdetailusedcar] = useState(null);
    const [RelatedCar, setRelatedCar] = useState([]);

    useEffect(() => {
        const filteredcar = items.find((product) => product.carid === parseInt(carid));
        if (filteredcar) {
            const filterbrand = items.filter((prod) => prod.brand === filteredcar.brand);
            setRelatedCar(filterbrand);
            setdetailusedcar(filteredcar);
        } else {
            // Handle the case where car is not found
            setdetailusedcar(null);
            setRelatedCar([]);
        }
    }, [carid]);

    if (!detailusedcar) {
        return <div>Car not found!</div>;
    }

    return (
        <>
            <div className="car-detail-page">
                {/* Hero Section */}
                <section className="hero-section">
                    <img
                        src={detailusedcar.image}
                        alt={detailusedcar.name}
                        className="hero-image"
                    />
                    <div className="hero-text">
                        <h1 className="car-name">{detailusedcar.name}</h1>
                        <p className="car-price">{detailusedcar.price}</p>
                    </div>
                </section>

                {/* Details Section */}
                <section className="details-section">
                    <div className="details-container">
                        <div className="containerheading" style={{ marginTop: '0px', marginLeft: '-5px' }}>
                            <div className="redbarheading"></div>
                            <div className="nameheading">Car Details :</div>
                        </div>
                        <p><strong>Make:</strong> {detailusedcar.brand}</p>
                        <p><strong>Fuel:</strong> {detailusedcar.fuel}</p>
                        <p><strong>KM Run:</strong> {detailusedcar.kmrun}</p>
                        <p><strong>Transmission:</strong> {detailusedcar.transmission}</p>
                        <p><strong>Price:</strong> {detailusedcar.price}</p>
                        <p><strong>City:</strong> {detailusedcar.city}</p>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="cta-section">
                    <a
                        href={detailusedcar.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button"
                    >
                        View Listing
                    </a>
                </section>
            </div>

            {/* Related Cars Section */}
            <div className="usedcardetailten">
                {RelatedCar.slice(0, 8).map((car) => (
                    <Link to={`/Used-Car/${car.carid}`} key={car.carid}>
                        <div className="usedrestdetailten">
                            <div className="usedrestimg" style={{ backgroundImage: `url(${car.image})` }}></div>
                            <div className="restinfo">
                                <p style={{ textTransform: 'Capitalize' }}>{car.name}</p>
                                <span>Click Here For More Info</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Usedcardetail;
