//react
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Breadcrumb, NumberInput, Alert, Confirm } from '@/components/common'
import styled, { keyframes, css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { cartRequests, clearCartError } from '@/store/cart'
import { NotFound } from '@/pages'
import ProductCategoryList from './ProductCategoryList'
import ProductImageSlider from './ProductImageSlider'
import InvalidResource from './InvalidResource'
import Icon from '@/components/icon'
const { HeartAdd, HeartTick } = Icon
//utility
import customAxios from '@/utils/axios/customAxios'
import { md, sm } from '@/components/layout/responsive'
import HTMLReactParser from 'html-react-parser'
import { numberWithCommas } from '@/utils/format.js'
import { Container, Grid } from '@material-ui/core'
import { likedProductRequests } from '@/store/likedProduct'

const buttonHoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.2);
  }
  40% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`

const StyledContainer = styled(Container)`
  padding: 2rem 0;
`

const Aside = styled(Grid)`
  ${sm({ display: 'none' })}
`

const ProductInfo = styled(Grid)``
const ProductImageBox = styled.div`
  height: auto;
  width: 100%;
`
const ProductDetails = styled.div`
  width: auto;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${sm({
  width: '100%',
  alignItems: 'center',
  gap: '0.5rem',
})}
`

const ProductDetail = styled.div`
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
  width: 100%;
  margin: 0 auto;
  ${sm({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.25rem 0.5rem',
})}
`

const OptionButton = styled.button`
  padding: 0.3rem 1rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  font-size: 16px;
  background-color: ${p => (p.$active ? '#d31414' : '#fff')};
  color: ${p => (p.$active ? '#fff' : '#000')};
  border: ${p => (p.$active ? ' 2px solid #d31414' : '2px solid #ddd')};
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #f0f0f0;
    color: #aaaaaa;
    border: 2px solid #ddd;
    text-decoration: line-through;
    cursor: not-allowed;
    &:active {
      transform: scale(1);
    }
  }
  &:active {
    transform: scale(0.98);
  }
`
const Button = styled.button`
  display: block;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;

  &:disabled {
    background-color: #f0f0f0;
    color: #aaaaaa;
    border: 2px solid #ddd;
    text-decoration: line-through;
    cursor: not-allowed;
    &:active {
      transform: scale(1);
    }
  }
  &:active {
    transform: scale(0.98);
  }

  ${sm({
  width: '100%',
  margin: '0 auto',
})}
  //動畫
  ${p =>
    p.$animation &&
    css`
      &:hover {
        animation: ${buttonHoverAnimation} 1s ease-in-out;
      }
    `}
`
const PriceAndAddLikedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${sm({
  width: 'auto',
  gap: '1rem',
})}
`

const AddToLikedProductsButton = styled(Button)`
  background-color: #fff;
  border: ${p => (p.$isAdded ? '1px solid #8b7a7a' : '1px solid #810909')};
  color: ${p => (p.$isAdded ? '#8b7a7a' : '#810909')};
  padding: 0.3rem 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  font-size: 15px;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`
const AddToCartButton = styled(Button)`
  width: 100%;
  background-color: #810909;
  border: 0;
  color: #ffffff;
  padding: 0.75rem;
  margin-top: 1rem;
  ${sm({
  width: '100%',
})}
`
const Content = styled.div`
 padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.75;
  ul {
    list-style-type: none;
    padding: 0;
  }
  img {
    max-width: 90%;
    height: auto;
    object-fit: cover;
    ${md({
  width: '100%',
})}
  }
`
const Title = styled.h1`
  font-size: 30px;
  margin: 1rem 0;
  letter-spacing: 1px;
  ${md({ margin: '1rem 0 ' })}
`
const ProductPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  gap: 8px;
  font-size: 48px;
  font-weight: bold;
`
const ProductPrice = styled.p`
  line-height: 1;
  font-size: 48px;
  font-weight: bold;
  color: #d31414;
`
const StyledText = styled.p`
  font-size: ${p => (p.$fontSize ? p.$fontSize : '18px')};
  color: ${p => (p.$color ? p.$color : '')};
  margin-bottom: ${p => (p.$mb ? p.$mb : '')};
  line-height: 1;
  font-weight: ${p => (p.$fontWeight ? p.$fontWeight : '')};
  white-space: nowrap;
`

const ProductDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
`

const QuantityWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  height: 2.25rem;
`

const Flexbox = styled.div`
  border: ${p => (p.$border ? '1px solid purple' : '')};
  display: flex;
  flex-direction: ${p => (p.$direction ? p.$direction : '')};
  align-items: ${p => (p.$alignItems ? p.$alignItems : 'center')};
  justify-content: ${p => (p.$justifyContent ? p.$justifyContent : 'center')};
  gap: ${p => (p.$gap ? p.$gap : '')};
  width: ${p => (p.$width ? p.$width : '100%')};
  margin: ${p => (p.$margin ? p.$margin : '')};
  padding: ${p => (p.$padding ? p.$padding : '')};
  flex: ${p => (p.$flex ? p.$flex : '')};
  flex-wrap: ${p => (p.$flexWrap ? p.$flexWrap : '')};
  height: ${p => (p.$height ? p.$height : '')};
`

const showPriceRange = product => {
  if (!product || !product.variants || product.variants.length === 0) {
    return 'No variants available'
  }
  const maxPrice = product.variants.reduce(
    (max, variant) => (variant.price > max ? variant.price : max),
    product.variants[0].price,
  )

  const minPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    product.variants[0].price,
  )

  const text =
    maxPrice === minPrice
      ? `${numberWithCommas(maxPrice)}`
      : `${numberWithCommas(minPrice)} - ${numberWithCommas(maxPrice)}`

  return text
}

export const Product = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [categoryName, setCategoryName] = useState(null)
  const [price, setPrice] = useState(null)
  //TOKEN
  const authUserState = useSelector(state => state.authUser)
  const TOKEN = authUserState.data?.accessToken
  const cartState = useSelector(state => state.cart)
  const [showAddLikedSuccess, setShowAddLikedSuccess] = useState(false)
  //加購購物車選項
  // {
  //   "productId": "66124ab71837fef25e1f1e79",
  //   "variant": {
  //     "variantId": "66124ab71837fef25e1f1e7a",
  //     "specificationId": "66124ab71837fef25e1f1e7b",
  //     "quantity": 1
  //   }
  // }
  const [quantity, setQuantity] = useState(1)
  const [currentVariantIndex, setCurrentVariantIndex] = useState(null)
  const [currentSpecificationIndex, setCurrentSpecificationIndex] =
    useState(null)
  const maxQuantity =
    product?.variants[currentVariantIndex]?.specification[
      currentSpecificationIndex
    ]?.stock

  const initialPaths = [
    { label: '首頁', path: '/' },
    { label: '商品列表', path: '/products' },
  ]
  const [paths, setPaths] = useState(initialPaths)
  const [seoTitle, setSeoTitle] = useState('載入中')
  const [isAddedCart, setIsAddedCart] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCartLoginConfirm, setShowCartLoginConfirm] = useState(false)
  const [showLikedLoginConfirm, setShowLikedLoginConfirm] = useState(false)

  const likedProductState = useSelector(state => state.likedProduct)
  const [operateType, setOperateType] = useState('')
  const [showLoginConfirm, setShowLoginConfirm] = useState(false)
  const [showAlertDuplicate, setShowAlertDuplicate] = useState(false)

  const verifyDuplicate = () => {
    const index = likedProductState.data.products.findIndex(item => {
      return item?._id === product?._id
    })
    if (index !== -1) {
      return true
    } else {
      return false
    }
  }
  const isDuplicate = verifyDuplicate()
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await customAxios.get(
          `${import.meta.env.VITE_APIURL}/product/${id} `,
        )
        setProduct(response.data.data)
      } catch (error) {
        console.error(error)
        setError('無法獲取最新消息。')
      }
      setLoading(false)
    }
    fetchNews()
  }, [id])

  useEffect(() => {
    if (product !== null) {
      const productCategory = product?.productCategories?.find(
        item => item.categoryType === '依類別',
      )
      if (productCategory) {
        setCategoryName(productCategory?.categoryName)
      }
      setPaths([
        { label: '首頁', path: '/' },
        { label: '商品列表', path: '/products' },
        {
          label: `${productCategory?.categoryName}`,
          path: `/products?category=${productCategory?.categoryName}`,
        },
        {
          label: product?.productName,
          path: `/products/${product?.productNumber}`,
        },
      ])
      setSeoTitle(product?.productName)
    }
  }, [product])

  useEffect(() => {
    if (isAddedCart && cartState.error === null) {
      setShowSuccess(true)
      setIsAddedCart(false)
    }
  }, [cartState.data])

  const handleQuantity = type => {
    if (currentVariantIndex !== null && currentSpecificationIndex !== null) {
      if (type === 'dec') {
        quantity > 1 && setQuantity(quantity - 1)
      } else if (type === 'inc') {
        quantity < maxQuantity && setQuantity(quantity + 1)
      }
    } else {
      setShowAlert(true)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!(authUserState.data && authUserState.data?.accessToken)) {
      setShowCartLoginConfirm(true)
      return
    }
    const variant = product?.variants[currentVariantIndex]
    const specification = variant?.specification[currentSpecificationIndex]

    if (variant && specification) {
      const data = {
        'productId': product._id,
        'variant': {
          'variantId': variant._id,
          'variantName': variant.item,
          'specificationId': specification._id,
          'specificationName': specification.name,
          'quantity': quantity,
        },
      }
      dispatch(
        cartRequests.addCartItem(TOKEN, authUserState.data.username, data),
      )
      setIsAddedCart(true)
    } else {
      setShowAlert(true)
    }
  }

  //默認操作
  const [showRemoveLikedSuccess, setShowRemoveLikedSuccess] = useState(false)
  useEffect(() => {
    if (operateType === 'likedProduct' && likedProductState.error === null) {
      setShowAddLikedSuccess(true)
      setOperateType('')
    }
    if (operateType === 'unlikedProduct' && likedProductState.error === null) {
      setShowRemoveLikedSuccess(true)
      setOperateType('')
    }
  }, [likedProductState.data, likedProductState.error])

  const handleLike = () => {
    if (!(authUserState.data && authUserState.data?.accessToken)) {
      setShowLikedLoginConfirm(true)
      return
    }
    if (!isDuplicate) {
      setOperateType('likedProduct')
      const data = { 'productId': product._id }
      dispatch(
        likedProductRequests.addLikedItem(
          TOKEN,
          authUserState.data.username,
          data,
        ),
      )
    } else {
      setShowAlertDuplicate(true)
    }
  }
  const removeLike = () => {
    setOperateType('unlikedProduct')
    const data = { productId: product._id }
    dispatch(
      likedProductRequests.removeLikedItem(
        TOKEN,
        authUserState.data.username,
        data,
      ),
    )
  }

  if (error) {
    return <NotFound />
  }

  return (
    <Layout.PageLayout>
      <SEO
        title={`${seoTitle} | RESTART - SHOP`}
        description={null}
        url={null}
      />
      {(cartState.loading || likedProductState.loading || loading) && (
        <Layout.Loading
          type={'spin'}
          active={true}
          color={'#c9a388'}
          size={'160px'}
        />
      )}
      <StyledContainer>
        <Breadcrumb paths={paths} />
        <Grid container justifyContent='center' spacing={3}>
          <Aside item xs={12} md={2}>
            <ProductCategoryList categoryName={categoryName} />
          </Aside>

          <Grid item xs={12} md={10}>
            {!product && !loading && <InvalidResource />}
            {product && (
              <>
                <ProductInfo container justifyContent='center' spacing={3}>
                  <Grid item xs={12} md={6}>
                    <ProductImageBox>
                      <ProductImageSlider
                        images={[
                          product.productPromotionImage,
                          ...product.productImages,
                        ]}
                      />
                    </ProductImageBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ProductDetails>
                      <StyledText $fontWeight='bold' $fontSize='1.2rem'>
                        {product.productNumber}
                      </StyledText>
                      <Title>{product.productName}</Title>
                      <ProductDescription>
                        {product.description}
                      </ProductDescription>
                      <PriceAndAddLikedWrapper>
                        <ProductPriceWrapper>
                          <StyledText $fontSize={'1.5rem'}>NT$</StyledText>
                          <ProductPrice>
                            {price ? price : showPriceRange(product)}
                          </ProductPrice>
                        </ProductPriceWrapper>

                        <AddToLikedProductsButton
                          $animation={!isDuplicate}
                          onClick={!isDuplicate ? handleLike : removeLike}
                          $isAdded={isDuplicate}
                        >
                          {isDuplicate ? (
                            <>
                              {' '}
                              <HeartTick />
                              已收藏
                            </>
                          ) : (
                            <>
                              {' '}
                              <HeartAdd />
                              收藏
                            </>
                          )}
                        </AddToLikedProductsButton>
                      </PriceAndAddLikedWrapper>
                      <ProductDetail>
                        <StyledText>規格</StyledText>
                        <Flexbox
                          $gap={'8px'}
                          $justifyContent={'flex-start'}
                          $flexWrap={'wrap'}
                        >
                          {product.variants.map((item, idx) => {
                            return (
                              <OptionButton
                                type='button'
                                key={item._id}
                                onClick={() => {
                                  setCurrentVariantIndex(idx)
                                  setPrice(item.price)
                                }}
                                disabled={false}
                                $active={idx === currentVariantIndex}
                              >
                                {item.item}
                              </OptionButton>
                            )
                          })}
                        </Flexbox>
                      </ProductDetail>
                      <ProductDetail>
                        <StyledText>尺寸</StyledText>

                        <Flexbox
                          $gap={'8px'}
                          $justifyContent={'flex-start'}
                          $flexWrap={'wrap'}
                        >
                          {product.variants[
                            currentVariantIndex || 0
                          ].specification.map((item, idx) => {
                            return (
                              <OptionButton
                                type='button'
                                key={item._id}
                                onClick={() => {
                                  setCurrentSpecificationIndex(idx)
                                }}
                                disabled={item.stock < 10}
                                $active={idx === currentSpecificationIndex}
                              >
                                {item.name}
                              </OptionButton>
                            )
                          })}
                        </Flexbox>
                      </ProductDetail>
                      <ProductDetail>
                        <StyledText>數量</StyledText>
                        <QuantityWrapper>
                          <NumberInput
                            value={quantity}
                            onClickFunction={handleQuantity}
                            $size={'6rem'}
                          />
                          <p>
                            {maxQuantity ? `剩餘數量 ${maxQuantity} 件` : ''}
                          </p>
                        </QuantityWrapper>
                      </ProductDetail>

                      <AddToCartButton type='button' onClick={handleSubmit}>
                        加入購物車
                      </AddToCartButton>
                    </ProductDetails>
                  </Grid>
                </ProductInfo>
                <Content>{HTMLReactParser(product.richContent)}</Content>
              </>
            )}
          </Grid>
        </Grid>
        {showAlert && (
          <Alert
            title='加入購物車'
            iconType={'info'}
            onClose={() => setShowAlert(false)}
          >
            請選擇規格與尺寸
          </Alert>
        )}
        {showSuccess && (
          <Alert
            title='加入購物車'
            iconType={'cartCheck'}
            onClose={() => setShowSuccess(false)}
          >
            已加入購物車
          </Alert>
        )}
        {showCartLoginConfirm && (
          <Confirm
            title='添加至購物車'
            iconType={'info'}
            onConfirm={() => {
              navigate('/login')
              setShowCartLoginConfirm(false)
            }}
            onClose={() => setShowCartLoginConfirm(false)}
          >
            請先進行登入
          </Confirm>
        )}
        {showLikedLoginConfirm && (
          <Confirm
            title='添加至收藏清單'
            iconType={'info'}
            onConfirm={() => {
              navigate('/login')
              setShowLikedLoginConfirm(false)
            }}
            onClose={() => setShowLikedLoginConfirm(false)}
          >
            請先進行登入
          </Confirm>
        )}
      </StyledContainer>
      {showAddLikedSuccess && (
        <Alert
          iconType={'heartAdd'}
          title={'收藏清單'}
          onClose={() => setShowAddLikedSuccess(false)}
        >
          已加入收藏清單
        </Alert>
      )}
      {showRemoveLikedSuccess && (
        <Alert
          iconType={'heartRemove'}
          title={'收藏清單'}
          onClose={() => setShowRemoveLikedSuccess(false)}
        >
          已取消收藏此商品
        </Alert>
      )}
      {showAlertDuplicate && (
        <Alert
          iconType={'info'}
          title={'收藏清單'}
          onClose={() => setShowAlertDuplicate(false)}
        >
          收藏清單已存在相同商品
        </Alert>
      )}
    </Layout.PageLayout>
  )
}
