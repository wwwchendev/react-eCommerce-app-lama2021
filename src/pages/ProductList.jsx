import styled from 'styled-components'
import { mobile } from '@/responsive'
import { PageLayout, Products, Newsletter } from '@/components'
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowRight } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`
const Filter = styled.div`
  margin: 0rem 0.5rem;
  display: flex;
  gap: 20px;
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
  padding: 0 15px;
  white-space: nowrap;
  ${mobile({ flexDirection: 'column' })}
`
const Select = styled.select`
  padding: 10px;
  width: 100%;
  ${mobile({ margin: '10px 0px' })}
`
const Option = styled.option``

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ProductList = () => {
  const navigator = useNavigate()
  const [category, setCategory] = useState('')
  const [filters, setFilters] = useState({})
  const [sortby, setSortby] = useState('Newest')

  //切換分類
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
  const handleFilters = e => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleSortby = e => {
    const { value } = e.target
    setSortby(value)
  }

  return (
    <PageLayout>
      <Title>
        <StyledLink
          to='/productList'
          onClick={() => {
            setCategory('')
          }}
        >
          全部商品
        </StyledLink>
        {category !== '' && category !== null && (
          <>
            <ArrowRight /> {category}
          </>
        )}
      </Title>
      <FilterContainer>
        <Filter>
          <SelectWrapper>
            <FilterText>商品分類</FilterText>
            <Select
              value={category ? category : ''}
              name='Categories'
              onChange={handleCategory}
            >
              <Option value=''>全部商品</Option>
              <Option value='襯衫上衣'>襯衫上衣</Option>
              <Option value='修身裙褲'>修身裙褲</Option>
              <Option value='帽襪配件'>帽襪配件</Option>
            </Select>
          </SelectWrapper>
        </Filter>
        <Filter>
          <SelectWrapper>
            <FilterText>商品尺寸</FilterText>
            <Select
              value={filters.size ? filters.size : ''}
              name='size'
              onChange={handleFilters}
            >
              <Option value=''>全部尺寸</Option>
              <Option value='S'>S</Option>
              <Option value='M'>M</Option>
              <Option value='L'>L</Option>
              <Option value='F'>F</Option>
            </Select>
          </SelectWrapper>
        </Filter>
        <Filter>
          <SelectWrapper>
            <FilterText>排序:</FilterText>
            <Select value={sortby} name='sortby' onChange={handleSortby}>
              <Option value='Newest'>上架日期</Option>
              <Option value='PriceAsc'>價格 (由低到高)</Option>
              <Option value='PriceDesc'>價格 (由高到低)</Option>
            </Select>
          </SelectWrapper>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sortby} />
      <Newsletter />
    </PageLayout>
  )
}

export default ProductList
