import React, { useState, useEffect } from "react";

export const CustomSlider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === data.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="custom-slider-container">
      {data.map((show, index) => (
        <div
          key={index}
          className={`custom-slider-item ${
            index === currentSlide ? "active" : ""
          }`}
        >
          <h2>{show.title}</h2>
          <img src={show.image} alt={`Show ${index + 1}`} />
          {/* Add any additional content or styling as needed */}
        </div>
      ))}
    </div>
  );
};

export default CustomSlider;
