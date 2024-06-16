import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { md, sm } from '@/components/layout/responsive'

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  img {
    width: 100%;
    max-height: 100%;
    display: block;
  }
`

const FeaturedWrapper = styled.div`
  height: 450px;
  overflow: hidden;
  ${sm({ height: '300px' })}
`

const FeaturedImageWrapper = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: center;
  height: 100%;
  img {
    object-fit: cover;
    width: auto;
  }
`

const SliderWrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`

const Slider = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  scroll-behavior: smooth;
`

const Slide = styled.div`
  min-width: 100px;
  padding: 8px 4px;
  &:hover {
    opacity: 0.8;
  }
`

const Thumbnail = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  cursor: pointer;
  opacity: ${p => (p.$actived ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`

const Navigation = styled.button`
  position: absolute;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  top: 50%;
  transform: translate(20%, -40%);
  &:first-child {
    left: 8px;
  }
  &:last-child {
    right: 8px;
  }
  svg {
    width: 36px;
    height: 36px;
    color: #777777;
  }
`

const ProductImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    if (sliderRef.current) {
      const thumbnailWidth = 120
      sliderRef.current.scrollTo({
        left: activeIndex * thumbnailWidth,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  const handleThumbnailClick = index => {
    setActiveIndex(index)
  }

  const handlePrevClick = () => {
    setActiveIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1,
    )
  }

  const handleNextClick = () => {
    setActiveIndex(prevIndex =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0,
    )
  }

  return (
    <Container>
      <FeaturedWrapper>
        <FeaturedImageWrapper>
          <img
            src={`${import.meta.env.VITE_APIURL}/file${images[activeIndex]}`}
          />
        </FeaturedImageWrapper>
      </FeaturedWrapper>
      <SliderWrapper>
        <Slider ref={sliderRef}>
          {images.map((item, idx) => (
            <Slide key={idx}>
              <Link>
                <Thumbnail
                  src={`${import.meta.env.VITE_APIURL}/file${item}`}
                  $actived={idx === activeIndex}
                  onClick={() => handleThumbnailClick(idx)}
                />
              </Link>
            </Slide>
          ))}
        </Slider>

        <Navigation onClick={handlePrevClick} aria-label='檢視上一個燈箱項目'>
          <ArrowLeft />
        </Navigation>
        <Navigation onClick={handleNextClick} aria-label='檢視下一個燈箱項目'>
          <ArrowRight />
        </Navigation>
      </SliderWrapper>
    </Container>
  )
}

export default ProductImageSlider
