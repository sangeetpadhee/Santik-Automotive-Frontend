import React, { useEffect, useState } from 'react';
import '../Style/AllCarReviews.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllCarReviews = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get('https://santik-automotive-api.onrender.com/api/user/AllFeed');
                setFeedback(response.data.feedback);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchFeedback();
    }, []);

    return (
      <div>
      <div className="reviews-heading">
        <div className="heading-title">User Reviews</div>
        <div className="heading-bar"></div>
      </div>
      <h1 className="write-review-title">
        Write a Review <Link to='/User-Detail'><a>Click Here</a></Link>
      </h1>
      <div className="reviews-list">
        {feedback.length > 0 ? (
          feedback.map((review, index) => (
            <div className="review-item" key={index}>
              <div className="review-header">
                <div
                  className="review-avatar"
                  style={{ backgroundImage: `url(${review.UserDetail.imageLink})` }}
                ></div>
                <div className="name-car">
                  <h1 className="reviewer-name">{review.UserDetail.name}</h1>
                </div>
              </div>
              <div className="review-content" >
              <h2 className="car-name">Car Name : {review.CarName}</h2>
                <p>{review.Feedback}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No Reviews On This Car Made Yet</p>
        )}
      </div>
    </div>

    );
};

export default AllCarReviews;
