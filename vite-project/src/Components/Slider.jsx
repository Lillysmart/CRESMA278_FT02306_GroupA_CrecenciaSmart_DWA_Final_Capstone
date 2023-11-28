// CustomSlider.jsx

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const CustomSlider = ({ data }) => {
  // Take the first 10 shows
  const showsToDisplay = data.slice(0, 10);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings} className='slider-grid'>
        {showsToDisplay.map((show) => (
          <div key={show.id}>
            <h3>{show.title}</h3>
            <img src={show.image} alt={show.title}  />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
