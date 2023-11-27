
import React , {useState}from "react"

export const Slider= ({ shows }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + shows.length) % shows.length);
    };


    return ( <div className="sliding-carousel-container">
    <div className="sliding-carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {shows.map((show, index) => (
        <div key={index} className="sliding-carousel-item">
          {show}
        </div>
      ))}
    </div>
    <button className="sliding-carousel-button prev" onClick={prevSlide}>
    </button>
    <button className="sliding-carousel-button next" onClick={nextSlide}>
      ❯
    </button>
  </div>
)}
 export default Slider