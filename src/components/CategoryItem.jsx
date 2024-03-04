import styled from 'styled-components'
import { mobile, tablet } from '../responsive'
import { useNavigate } from 'react-router-dom'

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
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s ease;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  ${Container}:hover & {
    width: 120%;
    height: 120%;
  }
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
  ${mobile({
    flexDirection: 'row',
  })}
`
const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
  ${mobile({
    margin: '0 10px 0 0',
  })}
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  opacity: 0.9;
  &:active {
    transform: scale(0.98);
  }
`

export const CategoryItem = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Container key={item.id}>
      <Image src={item.imgUrl} />
      <Info>
        <Title>{item.title}</Title>
        <Button
          onClick={() => {
            navigate(`/productList/${item.title}`)
          }}
        >
          查看
        </Button>
      </Info>
    </Container>
  )
}
