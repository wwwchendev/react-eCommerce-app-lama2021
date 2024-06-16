import { Link } from 'react-router-dom'
//components
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
`
const ImageContainer = styled(Link)`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease-in-out;
  }
  &:hover {
    img {
      scale: 1.1;
    }
  }
`

const NewsElement = ({ announcement }) => {
  return (
    <>
      <Container>
        <ImageContainer to={announcement.linkUrl}>
          <img src={announcement.image} alt={announcement.title} />
        </ImageContainer>
      </Container>
    </>
  )
}

export default NewsElement
