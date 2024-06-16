import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
//components
import styled from 'styled-components'
import Icon from '@/components/icon'
const { Heart, Cart1, Cart3, HeartRemove } = Icon
import { IconButton } from '@/components/common'
import { numberWithCommas } from '@/utils/format.js'
import { xs, sm, md } from '@/components/layout/responsive'

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.$viewMode === 'grid' ? 'column' : 'row')};
  align-items: ${props =>
    props.$viewMode === 'grid' ? 'center' : 'flex-start'};
  min-height: 200px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    height: ${props => (props.$viewMode === 'grid' ? '' : '240px')};

`
const ImageContainer = styled(Link)`
  position: relative;  
  min-width: ${props => (props.$viewMode === 'grid' ? '100%' : '240px')};
  padding-top: ${props => (props.$viewMode === 'grid' ? '100%' : '0')};
  cursor: pointer;
  max-height: ${props => (props.$viewMode === 'grid' ? '' : '100%')};
  overflow: hidden;
  height: 100%;
  max-width: 100%;
  img {
    transition: all 0.5s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  ${sm({
  maxHeight: '350px',
})}
  ${xs({
  maxHeight: props => (props.$viewMode === 'grid' ? '180px' : '100%'),
  minWidth: props => (props.$viewMode === 'grid' ? '100%' : '220px'),
})}
`
const ProductInfo = styled.div`
    box-sizing: border-box;
  padding: ${props =>
    props.$viewMode === 'grid' ? '0.5rem 1rem' : '2rem 2rem'};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  ${sm({
      padding: props =>
        props.$viewMode === 'grid' ? '0.3rem 1rem' : '1.5rem 1.5rem',
    })}
  ${sm({
      padding: props =>
        props.$viewMode === 'grid' ? '0.3rem 1rem' : '1rem 1rem',
    })}
`
const ProductName = styled(Link)`
  line-height: 1.5;
  text-decoration: none;
  color: #333;
  white-space: ${props => (props.$viewMode === 'grid' ? 'nowrap' : '')};
  font-size: ${props => (props.$viewMode === 'grid' ? '1rem' : '1.5rem')};
  ${sm({
  fontSize: props => (props.$viewMode === 'grid' ? '1rem' : '1.3rem'),
})}
`
const ProductDetails = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ProductDescription = styled(Link)`
  display: ${props => (props.$viewMode === 'grid' ? 'none' : 'flex')};
  color: #666;
  font-size: 1rem;
  text-decoration: none;
  align-items: center;
  height: 100%;
  ${sm({
  fontSize: props => (props.$viewMode === 'grid' ? '1rem' : '1rem'),
})}
`
const ProductPrice = styled.p`
  color: #d31414;
  font-size: ${props => (props.$viewMode === 'grid' ? '18px' : '1.4rem')};
  white-space: nowrap;
  ${sm({
  fontSize: props => (props.$viewMode === 'grid' ? '1rem' : '1rem'),
})}
`
const ButtonContainer = styled.div`
  display: flex;
  gap: ${props => (props.$viewMode === 'grid' ? '2rem' : '1rem')};
`
const Select = styled.select`
  border: 1px solid #ddd;
  padding: 0.25rem 0;
  border-radius: 5px;
  color:#333;
  font-size: ${props => (props.$viewMode === 'grid' ? '0.9rem' : '1rem')};
`
const ProductNumber = styled.span`
  font-size: 12px;
  color: #999;
  line-height: 1;
`
const SelectComponent = ({ $viewMode, product, onChange }) => {
  const flattenedOptions = product.variants.flatMap(variant =>
    variant.specification.map(item => ({
      id: `${variant._id}-${item._id}`,
      variantId: variant._id,
      specificationId: item._id,
      disabled: item.stock < 10,
      label: `${variant.item}-${item.name}`,
    })),
  )
  return (
    <Select $viewMode={$viewMode} defaultValue='' onChange={onChange}>
      <option value='' disabled>
        請選擇規格
      </option>
      {flattenedOptions.map(option => (
        <option key={option.id} value={option.id} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export const ProductCard = props => {
  const {
    $viewMode,
    product,
    verifyDuplicate,
    handleAddToCart,
    handleAddLike,
    handleRemoveLike,
    handleRemoveToCartFromLiked,
  } = props
  const location = useLocation()
  //顯示商品資訊
  const isDuplicate = verifyDuplicate(product._id)
  const showPrice = () => {
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

    return maxPrice === minPrice
      ? `NT$ ${numberWithCommas(maxPrice)}`
      : `NT$ ${numberWithCommas(minPrice)} - ${numberWithCommas(maxPrice)}`
  }

  //selectedSpecification
  const [specification, setSpecification] = useState({
    productId: product._id,
    variant: {
      variantId: '',
      specificationId: '',
      quantity: 1,
    },
  })
  const handleSpecificationChange = e => {
    const [variantId, specificationId] = e.target.value.split('-')
    setSpecification(prevSpec => ({
      ...prevSpec,
      variant: {
        ...prevSpec.variant,
        variantId,
        specificationId,
      },
    }))
  }
  const getSelectedSpecification = () => {
    const { productId, variant } = specification
    const { variantId, specificationId, quantity } = variant
    if (variantId && specificationId) {
      return {
        'productId': productId,
        'variant': {
          'variantId': variantId,
          'specificationId': specificationId,
          'quantity': quantity,
        },
      }
    } else {
      return null
    }
  }

  return (
    <>
      <ProductCardContainer $viewMode={$viewMode}>
        <ImageContainer
          $viewMode={$viewMode}
          to={`/products/${product.productNumber}`}
        >
          <img
            src={`${import.meta.env.VITE_APIURL}/file${product.productPromotionImage}`}
            alt={product.productName}
          />
        </ImageContainer>
        <ProductInfo $viewMode={$viewMode}>
          <ProductName
            to={`/products/${product.productNumber}`}
            $viewMode={$viewMode}
          >
            {product.productName}
          </ProductName>
          <ProductNumber>{product.productNumber}</ProductNumber>
          <ProductDescription
            to={`/products/${product.productNumber}`}
            $viewMode={$viewMode}
          >
            {product.description}
          </ProductDescription>
          <SelectComponent
            $viewMode={$viewMode}
            product={product}
            onChange={handleSpecificationChange}
          />
          <ProductDetails>
            <ProductPrice $viewMode={$viewMode}>{showPrice()}</ProductPrice>
            <ButtonContainer>
              {location.pathname === '/likedProducts' ? (
                <>
                  <IconButton
                    icon={HeartRemove}
                    onClick={() => handleRemoveLike(product._id)}
                  />
                  <IconButton
                    icon={Cart3}
                    onClick={() => {
                      const data = getSelectedSpecification()
                      handleRemoveToCartFromLiked(data)
                    }}
                  />
                </>
              ) : (
                <>
                  <IconButton
                    icon={Heart}
                    onClick={
                      isDuplicate
                        ? () => {
                          handleRemoveLike(product._id)
                        }
                        : () => {
                          handleAddLike(product._id)
                        }
                    }
                    $strokeColor={isDuplicate ? 'red' : '#333'}
                    $fillColor={isDuplicate ? 'red' : '#fff'}
                    $hoverColor='red'
                    $hoverStrokeColor='red'
                  />
                  <IconButton
                    icon={Cart1}
                    onClick={() => {
                      const data = getSelectedSpecification()
                      handleAddToCart(data)
                    }}
                  />
                </>
              )}
            </ButtonContainer>
          </ProductDetails>
        </ProductInfo>
      </ProductCardContainer>
    </>
  )
}
