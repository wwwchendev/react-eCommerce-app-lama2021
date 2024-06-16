import { Link } from 'react-router-dom'
//components
import styled from 'styled-components'
import { xs, sm, md } from '@/components/layout/responsive'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
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
