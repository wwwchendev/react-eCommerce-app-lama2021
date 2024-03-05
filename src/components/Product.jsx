import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '@/utils/responsive'
import { useNavigate } from 'react-router-dom'

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`

const Container = styled.div`
  flex: 0 0 calc(25% - 10px);
  margin: 5px;
  min-width: 280px;
  height: 350px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  //後代選擇器
  &:hover ${Info} {
    opacity: 1;
  }

  ${mobile({
    flex: 1,
    height: '300px',
  })}
`
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`

const Image = styled.img`
  height: 75%;
  z-index: 2;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

const FixedComponent = styled.div`
  position: absolute;
  bottom: 1rem;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 30px);
  user-select: none;
`

export const Product = ({ item }) => {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Circle />
        <Image src={item.img} />
        <Info>
          <Icon>
            <ShoppingCartOutlined onClick={() => {}} />
          </Icon>
          <Icon>
            <SearchOutlined
              onClick={() => {
                navigate(`/product/${item._id}`)
              }}
            />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
        <FixedComponent>
          <p>
            {item.title} / {item.size}
          </p>
          <p>${item.price}</p>
        </FixedComponent>
      </Container>
    </>
  )
}
