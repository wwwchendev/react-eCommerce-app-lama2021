import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '@/utils/responsive'
import { useNavigate } from 'react-router-dom'

const Actions = styled.div`
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
  flex: 0 0 calc(24.5% - 7.5px);
  width: 100%;
  max-height: 100%;
  /* border: 1px solid red; */
  overflow: hidden;
  //後代選擇器
  &:hover ${Actions} {
    opacity: 1;
  }
  ${mobile({
    flex: '0 0 calc(100%)',
  })}
`

const Circle = styled.div`
  border-radius: 50%;
`
const Bg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  padding: 20px;

  /* 在 Bg 內指定 Circle 元件的樣式 */
  & > ${Circle} {
    width: 180px;
    height: 180px;
    background-color: white;
    position: absolute;
  }
`

const Image = styled.img`
  height: 180px;
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
const Wrap = styled.div`
  display: flex;
  /* border: 1px solid red; */
`
const Info = styled.div`
  background-color: #deedf3;
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  height: 100%;

  & > ${Wrap}:first-child {
    justify-content: space-between;
    margin-bottom: 3px;
  }
`

export const Product = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Container>
      <Bg>
        <Circle />
        <Image src={item.img} />
        <Actions>
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
        </Actions>
      </Bg>

      <Info>
        <Wrap>
          <p>{item.title}</p>
          <p>
            {(() => {
              const minPrice = Math.min(
                ...item.specification.map(spec => spec.price),
              )
              const maxPrice = Math.max(
                ...item.specification.map(spec => spec.price),
              )
              // console.log(item.title, minPrice, maxPrice);
              return minPrice === maxPrice
                ? `$ ${minPrice} `
                : `$ ${minPrice} - ${maxPrice}`
            })()}
          </p>
        </Wrap>
      </Info>
    </Container>
  )
}
