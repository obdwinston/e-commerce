import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const stars = [1, 2, 3, 4, 5];

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {stars.map((star, index) => (
        <span key={index}>
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
