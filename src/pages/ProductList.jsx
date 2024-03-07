import styled from 'styled-components'
import { mobile, tablet } from '@/utils/responsive'
import { PageLayout, Products, Newsletter } from '@/components'
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowRight } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

const Side = styled.div`
  /* border: 1px solid red; */
`
const Container = styled.div`
  display: flex;
  & > ${Side}:first-child {
    flex: 1;
    h2 {
      ${tablet({ display: 'none' })}
    }
  }
  & > ${Side}:last-child {
    flex: 3.5;
  }
  ${tablet({ flexDirection: 'column' })}
`

const Title = styled.h1`
  font-size: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  ${mobile({ flexDirection: 'column' })}
`
const Filter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px 0;
  width: 100%;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 2;
  ${mobile({ marginRight: '0px' })}
`
const SelectWrapper = styled.div`
  display: flex;
  gap: 5px;
  white-space: nowrap;
  ${mobile({
  flexDirection: 'row',
})}
`
const Select = styled.select`
  padding: 10px;
  width: 100%;
`
const Option = styled.option``

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  list-style-type: none;
  ${mobile({
  flexDirection: 'row',
  overflowX: 'scroll'
})}
`

const MenuItem = styled.li`
  width: 100%;
  font-size: 18px;
  white-space: nowrap;
  z-index: 999;

  &:nth-child(2) {
    margin-top: 40px;
    ${mobile({
  marginTop: '0',
})}
  }
  
  /* Move the conditional styling to StyledLink */
  ${StyledLink} {
    display: block;
    width: 100%;
    color: #000;
    font-weight: ${props =>
    props.$category === props.$currentCategory ? '900' : '0'};
  }
`

const ProductList = () => {
  const navigator = useNavigate()
  const [category, setCategory] = useState('')
  const [sortby, setSortby] = useState('Newest')

  //切換分類
  // 這裡獲取search參數可以改用useSearchParams
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const qCategory = queryParams.get('category')
  useEffect(() => {
    setCategory(qCategory)
  }, [qCategory, category])

  //切換分類路由
  const handleCategory = e => {
    const { value } = e.target
    if (value === '全部商品') {
      navigator(`/productList`)
    } else {
      navigator(`/productList?category=${value}`)
    }
  }

  //篩選
  const handleSortby = e => {
    const { value } = e.target
    setSortby(value)
  }



  return (
    <PageLayout>
      <Topbar>
        <Title>
          <StyledLink
            to='/productList'
            onClick={() => {
              setCategory('')
            }}
          >
            商品列表
          </StyledLink>
          <ArrowRight /> {category ? category : '全部商品'}
        </Title>
      </Topbar>
      <Container>
        <Side>
          <Menu>
            <h2>分類</h2>
            <MenuItem $currentCategory={category} $category={null}>
              <StyledLink to='/productList'>全部商品 (999)</StyledLink>
            </MenuItem>
            <MenuItem $currentCategory={category} $category={'襯衫上衣'}>
              <StyledLink to='/productList?category=襯衫上衣'>
                襯衫上衣 (?)
              </StyledLink>
            </MenuItem>
            <MenuItem $currentCategory={category} $category={'修身裙褲'}>
              <StyledLink to='/productList?category=修身裙褲'>
                修身裙褲 (?)
              </StyledLink>
            </MenuItem>
            <MenuItem $currentCategory={category} $category={'鞋包配件'}>
              <StyledLink to='/productList?category=鞋包配件'>
                鞋包配件 (?)
              </StyledLink>
            </MenuItem>
          </Menu>
        </Side>
        <Side>
          <FilterContainer>
            <Filter>
              <SelectWrapper>
                <FilterText>排序</FilterText>
                <Select value={sortby} name='sortby' onChange={handleSortby}>
                  <Option value='Newest'>上架日期</Option>
                  <Option value='PriceAsc'>價格 (由低到高)</Option>
                  <Option value='PriceDesc'>價格 (由高到低)</Option>
                </Select>
              </SelectWrapper>
            </Filter>
          </FilterContainer>
          <Products sort={sortby} />
        </Side>
      </Container>
      <Newsletter />
    </PageLayout>
  )
}

export default ProductList
