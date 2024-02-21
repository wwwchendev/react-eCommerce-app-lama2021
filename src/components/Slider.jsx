import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { sliderItems } from '@/data'
import { mobile, tablet } from '../responsive'

const animationDuration = 10 * 1000

/* 版型 */
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  ${mobile({
    height: '70vh',
  })}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  z-index: 2;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${p => p.direction === 'left' && '10px'};
  right: ${p => p.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  &:active,
  &:hover {
    opacity: 1;
  }
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${p => p.$slideIndex * -100}vw);
  transition: all ${animationDuration / 3}ms ease;
`
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${p => p.$bg};
  position: relative;
  ${tablet({ flexDirection: 'column-reverse' })}
`
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  ${mobile({
    position: 'absolute',
    bottom: '20%',
    right: '0',
  })}
  ${tablet({
    bottom: '20%',
  })}
`
const Image = styled.img`
  max-height: 90%;
  object-fit: cover;
  ${tablet({ maxHeight: '65%' })}
  ${mobile({ maxHeight: '50%' })}
  /* 禁用拖动和选择 */
  -webkit-user-drag: none; /* Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* 跨浏览器 */
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${tablet({
    position: 'absolute',
    top: '0%',
  })}
`
const Title = styled.h1`
  font-size: 4.5rem;
  ${mobile({
    fontSize: '3rem',
  })}
`
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  white-space: nowrap;
  ${tablet({
    margin: '20px 0',
  })}
`

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  &:active {
    transform: scale(0.98);
  }
  ${tablet({
    padding: '5px',
    fontSize: '18px',
  })}
`

export const Slider = () => {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSlides(sliderItems)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      )
    }, animationDuration)

    return () => clearInterval(interval)
  }, [slides])

  const handleClick = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slides.length - 1)
    } else {
      setSlideIndex(slideIndex < slides.length - 1 ? slideIndex + 1 : 0)
    }
  }

  if (loading) {
    return <p>載入中</p>
  }
  if (error) {
    return <p>取得資料時發生錯誤</p>
  }
  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper $slideIndex={slideIndex}>
        {slides.map(item => {
          return (
            <Slide $bg={item.bg} key={item.id}>
              <ImgContainer>
                <Image src={item.imgUrl} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>立即搶購</Button>
              </InfoContainer>
            </Slide>
          )
        })}
      </Wrapper>

      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  )
}
