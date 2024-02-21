import styled from 'styled-components'
import { tablet } from '../responsive'
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  ${tablet({
    maxHeight: '50vh',
  })}
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  &:active {
    transform: scale(0.98);
  }
`

export const CategoryItem = ({ item }) => {
  return (
    <Container key={item.id}>
      <Image src={item.imgUrl} />
      <Info>
        <Title>{item.title}</Title>
        <Button>查看</Button>
      </Info>
    </Container>
  )
}
