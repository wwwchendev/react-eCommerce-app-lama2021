import styled from 'styled-components'
import { mobile } from '@/responsive'
import { PageLayout, Newsletter } from '@/components'
import { Add, Remove } from '@material-ui/icons'

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`
// 產品圖片
const ImgContainer = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`
// 產品名稱描述價格
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight: 200;
`
const Desc = styled.p`
  margin: 20px 0px;
`
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`
// 篩選
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`
const FilterSizeOption = styled.option``

// 數量
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`

const Product = () => {
  return (
    <PageLayout>
      <Wrapper>
        <ImgContainer>
          <Image src='https://i.ibb.co/S6qMxwr/jean.jpg' />
        </ImgContainer>
        <InfoContainer>
          <Title>單寧連身褲</Title>
          <Desc>
            時尚且舒適的單寧連身褲，適合各種場合穿著。它以其獨特的設計和舒適的布料而著稱。這款連身褲採用了高品質的單寧布料製成，具有耐穿耐用的特性。它的設計非常時尚且具有彈性，能夠完美貼合身體曲線，展現出迷人的曲線美。
          </Desc>
          <Price>$ 699</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>顏色</FilterTitle>
              <FilterColor color='black' />
              <FilterColor color='darkblue' />
              <FilterColor color='gray' />
            </Filter>
            <Filter>
              <FilterTitle>尺寸</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>加入購物車</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </PageLayout>
  )
}

export default Product
