import React, { useState, useEffect } from "react"

export const CustomSlider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="custom-slider-container">
      {/* Your slider items */}
      {data.map((show, index) => (
        <div
          key={index}
          className={`custom-slider-item ${index === currentSlide ? "active" : ""}`}
        >
          <h2>{show.title}</h2>
          <img src={show.image} alt={`Show ${index + 1}`} />
          {/* Add any additional content or styling as needed */}
        </div>
      ))}
      
      {/* Button to manually navigate to the next slide */}
      <button className="next-button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default CustomSlider;
