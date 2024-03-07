import styled from 'styled-components'
import { mobile } from '@/utils/responsive'
import { PageLayout, Newsletter } from '@/components'
import { Add, Remove, ArrowRight } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import { Loading } from '@/components'

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 400px;
`

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  ${mobile({ height: '60vh' })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`

const Title = styled.h1`
  font-size: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* border: 1px solid red; */
  width: 100%;
  ${mobile({ width: '100%' })}
  gap: 10px;
`

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 15px;
`

const Specification = styled.button``

const AddContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
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
  cursor: default;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    background-color: #f8f4f4;
  }
`

const Product = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [product, setProduct] = useState({
    title: '',
    desc: '',
    img: [],
    specification: [],
  })
  const [selectedOption, setSelectedOption] = useState({
    'style': '',
    'size': [],
  })
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const source = axios.CancelToken.source()
    setIsPending(true)

    const getProduct = async () => {
      try {
        const response = await axios.publicRequest.get(`/products/find/${id}`)
        setProduct(response.data.result)

        // 設定預設款式和尺寸
        if (response.data.result.specification.length > 0) {
          setSelectedOption({
            'style': '',
            'size': '',
          })
        }
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setIsPending(false)
      }
    }
    getProduct()

    return () => {
      source.cancel('Component unmounted')
    }
  }, [id])

  const handleQuantity = type => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => { }
  const handleOptions = (e, type) => {
    const option = e.target.innerText
    setSelectedOption({
      ...selectedOption,
      [type]: option,
    })
  }
  const selectedStock = product.specification.find(spec => {
    return (
      spec.name === selectedOption.style &&
      spec.stock.some(stock => stock.size === selectedOption.size)
    )
  })
  const StyledLink = styled(Link)`
    text-decoration: none;
  `

  if (error) {
    return <PageLayout>{JSON.stringify(error)}</PageLayout>
  }

  return (
    <PageLayout>
      <Loading active={isPending} />
      {!isPending && (
        <>
          <Title style={{ margin: '20px 0  0 20px' }}>
            <StyledLink to='/productList'>全部商品</StyledLink>
            <StyledLink
              to={`/productList?category=${product?.categories?.[0]}`}
            >
              <ArrowRight /> {product?.categories?.[0]}
            </StyledLink>
            <ArrowRight /> {product?.title}
          </Title>
          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>
                {(() => {
                  const priceRange = product.specification.map(
                    spec => spec.price,
                  )
                  const maxPrice = Math.max(...priceRange)
                  const minPrice = Math.min(...priceRange)
                  let displayPrice;

                  if (selectedOption.style === '') {
                    displayPrice = maxPrice === minPrice
                      ? `$ ${minPrice}`
                      : `$ ${minPrice} - ${maxPrice}`
                  } else {
                    const selectedSpec = product.specification.find(
                      spec => spec.name === selectedOption.style,
                    )
                    console.log("selectedSpec:", selectedSpec);
                    displayPrice = `$ ${selectedSpec?.price}`
                  }
                  return displayPrice
                })()}
              </Price>
              <FilterContainer>
                <FilterTitle>款式</FilterTitle>
                {product.specification.map((item, idx) => (
                  <Specification
                    key={idx}
                    onClick={e => handleOptions(e, 'style')}
                    style={{
                      fontWeight:
                        selectedOption.style === item.name ? 'bold' : 'normal',
                    }}
                  >
                    {item.name}
                  </Specification>
                ))}
              </FilterContainer>

              <FilterContainer>
                <FilterTitle>尺寸</FilterTitle>
                {product.specification.map(spec => {
                  const selectedStyle =
                    selectedOption.style !== ''
                      ? selectedOption.style
                      : product?.specification[0].name
                  if (spec.name === selectedStyle) {
                    return spec.stock.map((stock, j) => (
                      <Specification
                        key={j}
                        onClick={e => handleOptions(e, 'size')}
                        style={{
                          fontWeight:
                            selectedOption.size === stock.size
                              ? 'bold'
                              : 'normal',
                        }}
                      >
                        {stock.size}
                      </Specification>
                    ))
                  }
                  return null
                })}
              </FilterContainer>

              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity('dec')} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity('inc')} />
                  {selectedOption.size.length > 0 && (
                    <p style={{ margin: '0 20px' }}>
                      剩餘數量:{' '}
                      {selectedStock
                        ? selectedStock.stock.find(
                          stock => stock.size === selectedOption.size,
                        ).amount
                        : 0}
                    </p>
                  )}
                </AmountContainer>
                <Button onClick={handleAddToCart}>加入購物車</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <pre>selectedOption : {JSON.stringify(selectedOption)}</pre>
          <pre>{JSON.stringify(product, null, 2)}</pre>
        </>
      )}
      <Newsletter />
    </PageLayout>
  )
}

export default Product
