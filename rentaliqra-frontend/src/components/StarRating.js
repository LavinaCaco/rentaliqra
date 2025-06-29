import React from 'react';
import { FaStar } from 'react-icons/fa';


const StarRating = ({ rating, setRating }) => {
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const isInteractive = !!setRating;

                return (
                    <label key={index}>
                        {isInteractive && (
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                                style={{ display: 'none' }}
                            />
                        )}
                        <FaStar
                            size={30}
                            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                            style={{ cursor: isInteractive ? 'pointer' : 'default', marginRight: '5px' }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
