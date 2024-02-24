import styled from 'styled-components'
import { mobile } from '@/responsive'
import { PageLayout, Products, Newsletter } from '@/components'

const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`
const SelectWrapper = styled.div`
display: flex;
gap: 5px;
`
const Select = styled.select`
  padding: 10px;
  ${mobile({ margin: '10px 0px' })}
`
const Option = styled.option``
const ProductList = () => {
  return (
    <PageLayout>
      <Title>襯衫上衣</Title>
      <FilterContainer>
        <Filter>
          <FilterText>篩選商品:</FilterText>
          <SelectWrapper>
            <Select defaultValue='Color'>
              <Option disabled value='Color'>
                顏色
              </Option>
              <Option value='White'>白色</Option>
              <Option value='Black'>黑色</Option>
              <Option value='Red'>紅色</Option>
              <Option value='Blue'>藍色</Option>
              <Option value='Yellow'>黃色</Option>
              <Option value='Green'>綠色</Option>
            </Select>
            <Select defaultValue='Size'>
              <Option disabled value='Size'>
                尺寸
              </Option>
              <Option value='XS'>XS</Option>
              <Option value='S'>S</Option>
              <Option value='M'>M</Option>
              <Option value='L'>L</Option>
              <Option value='XL'>XL</Option>
            </Select>
          </SelectWrapper>
        </Filter>
        <Filter>
          <FilterText>排序:</FilterText>
          <Select defaultValue='Newest'>
            <Option value='Newest'>上架日期</Option>
            <Option value='PriceAsc'>價格 (由低到高)</Option>
            <Option value='PriceDesc'>價格 (由高到低)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
    </PageLayout>
  )
}

export default ProductList
