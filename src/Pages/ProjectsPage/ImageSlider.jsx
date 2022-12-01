//Code from Oleksandr Kocherhin, MonsterLessonAcademy

import { useState, useEffect } from "react";


const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: 'absolute',
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "15px",
  fontSize: "calc(12px + 2vw)",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "15px",
  fontSize: "calc(12px + 2vw)",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  width: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  zIndex:1,
  position:'absolute',
  bottom:'0',
  width:'100%'
};

const dotStyle = {
  margin: "0 2px",
  cursor: "pointer",
  fontSize: "calc(6px + 0.5vw)",
  color: 'white',
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() =>{
    goToSlide(0)
    }, [slides])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };


  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      {slides.map((slide, slideIndex) => (
          <div 
            style={currentIndex === slideIndex ? {...slideStyles, backgroundImage: `url(${slides[slideIndex].url})`, visibility: 'visible'} : {...slideStyles, backgroundImage: `url(${slides[slideIndex].url})`, visibility: 'hidden'}}
            key={slideIndex}
          ></div>
        ))}
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={currentIndex === slideIndex ? {...dotStyle, color:'grey'} : {...dotStyle}}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

