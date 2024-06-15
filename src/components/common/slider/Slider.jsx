import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { md, sm, xs } from '@/components/layout/responsive';

const squishAnimation = keyframes` 
  50% { transform: scale(1.4, 0.6); } 
`;

const Container = styled.section`
/* border: 1px solid red; */
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; 
  button { cursor: pointer; } 
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  
  a {
    flex: 0 0 100%; 
  }
  
  img {    
    object-fit: cover;
    width: 100%;  
    height: 100%;   
    transform: ${p => `translateX(-${100 * p.$slideIndex}%)`};
    transition: transform 0.5s ease-in-out;
  }
`;

const Navigation = styled.div`
  button {    
    all: unset;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:nth-of-type(1) { left: 0; }
    &:nth-of-type(2) { right: 0; }
    height: 100%; 
    color: #fff;    
    &:hover, &:focus-visible { 
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer; 
    }
    transition: background-color 500ms ease-in-out;

    &:hover > *, &:focus-visible > * { animation: ${squishAnimation} 200ms ease-in-out; }
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Pagination = styled.div`
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Img = styled.img`
  display: ${p => p.$size === "default" ? "block" : "none"};
  ${xs({
  display: p => p.$size === "small" ? "block" : "none"
})}
`;

const Circle = styled.button`
  border: none;
  height: 10px;
  width: 10px;
  padding: 4px;
  background-color: ${p => p.$isActived ? '#fff' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transition: transform 100ms ease-in-out;
  &:hover, &:focus-visible {
    transform: scale(1.2);
  }
  &:focus-visible { outline: auto; }
`;

const defaultOptions = {
  automatic: false,
  navigation: true,
  pagination: true
};

export const Slider = ({ slides, options = defaultOptions }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const animationDuration = options?.duration * 1000 || 5000;

  useEffect(() => {
    if (!options?.automatic) return;
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, animationDuration);
    return () => clearInterval(interval);
  }, [slides, options.automatic, animationDuration]);

  const showPrevSlide = () => {
    setSlideIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const showNextSlide = () => {
    setSlideIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container aria-label="燈箱元件">
      <InnerContainer $slideIndex={slideIndex}>
        {slides.map((slide, index) => (
          <Link to={slide.linkUrl} key={slide.id} tabIndex="-1" aria-hidden={slideIndex !== index}>
            <Img src={slide.src.default} $size="default" alt={slide.title} />
            <Img src={slide.src.small} $size="small" alt={slide.title} />
          </Link>
        ))}
      </InnerContainer>
      {options?.navigation && (
        <Navigation>
          <button onClick={showPrevSlide} aria-label="檢視上一個燈箱項目">
            <ArrowLeft />
          </button>
          <button onClick={showNextSlide} aria-label="檢視下一個燈箱項目">
            <ArrowRight />
          </button>
        </Navigation>
      )}
      {options?.pagination && (
        <Pagination>
          {slides.map((_, index) => (
            <Circle key={index} aria-label={`檢視燈箱-${index + 1}`} onClick={() => setSlideIndex(index)} $isActived={index === slideIndex} />
          ))}
        </Pagination>
      )}
    </Container>
  );
};
