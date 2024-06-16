import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { md, sm, xs } from '@/components/layout/responsive'
import { ProductCard } from '@/components/common'
import { useDispatch, useSelector } from 'react-redux'
import { cartRequests, clearCartError } from '@/store/cart'
import { likedProductRequests } from '@/store/likedProduct'
import { Alert, Confirm } from '@/components/common'

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.$viewMode === 'grid' ? 'repeat(4, 1fr)' : '1fr'};
  box-sizing: border-box;
  gap: 1rem; 
margin: 0 auto;
  ${md({
      gridTemplateColumns: props =>
        props.$viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
      gap: '1rem'
    })}

  ${sm({
      gridTemplateColumns: props =>
        props.$viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr',
      gap: '0.5rem'
    })}
`;

export const ProductCards = ({ $viewMode, products }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //TOKEN
  const authUserState = useSelector(state => state.authUser)
  const TOKEN = authUserState.data?.accessToken
  //Redux
  const cartState = useSelector(state => state.cart)
  const likedProductState = useSelector(state => state.likedProduct)

  const [data, setData] = useState(products)
  useEffect(() => {
    setData(products)
  }, [products])

  //驗證登入與商品是否已收藏
  const verifyLogin = useCallback(
    ({ title }) => {
      if (authUserState.data && authUserState.data?.accessToken) {
        return true
      } else {
        setShowConfirm({
          iconType: 'info',
          title: title,
          content: '請先登入',
          active: true,
          onConfirm: () => {
            navigate('/login')
            setShowConfirm(initConfirmInfo)
          },
        })

        return false
      }
    },
    [authUserState.data],
  )

  const verifyDuplicate = productId => {
    const index = likedProductState.data.products.findIndex(item => {
      return item._id.toString() === productId
    })
    if (index !== -1) {
      // setShowAlert({
      //   iconType: 'info',
      //   title: '收藏清單',
      //   content: '收藏清單已存在相同商品',
      //   active: true,
      // });
      return true
    } else {
      return false
    }
  }

  //從商品卡片可以操作的通用功能
  //加入購物車
  const handleAddToCart = useCallback(
    selectedSpecification => {
      if (!verifyLogin({ title: '添加至購物車' })) {
        return
      }
      if (!selectedSpecification) {
        setShowAlert({
          iconType: 'info',
          title: '購物車',
          content: '請選擇規格與尺寸',
          active: true,
        })
        return
      }
      setOperateType('cart')
      dispatch(
        cartRequests.addCartItem(
          TOKEN,
          authUserState.data.username,
          selectedSpecification,
        ),
      )
    },
    [TOKEN, verifyLogin],
  )

  //從收藏加入到購物車
  const handleRemoveToCartFromLiked = selectedSpecification => {
    if (!verifyLogin({ title: '添加至購物車' })) {
      return
    }
    if (!selectedSpecification) {
      setShowAlert({
        iconType: 'info',
        title: '購物車',
        content: '請選擇規格與尺寸',
        active: true,
      })
      return
    }
    setOperateType('removeToCartFromLiked')
    //加入購物車
    dispatch(
      cartRequests.addCartItem(
        TOKEN,
        authUserState.data.username,
        selectedSpecification,
      ),
    )
    //移除商品
    dispatch(
      likedProductRequests.removeLikedItem(TOKEN, authUserState.data.username, {
        productId: selectedSpecification.productId,
      }),
    )
  }

  //加入收藏
  const handleAddLike = useCallback(
    productId => {
      if (!verifyLogin({ title: '添加至收藏清單' })) {
        return
      }
      setOperateType('likedProduct')
      const data = { productId: productId }
      dispatch(
        likedProductRequests.addLikedItem(
          TOKEN,
          authUserState.data.username,
          data,
        ),
      )
    },
    [TOKEN, verifyLogin],
  )

  //移除收藏
  const handleRemoveLike = useCallback(
    productId => {
      setOperateType('unlikedProduct')
      const data = { productId: productId }
      dispatch(
        likedProductRequests.removeLikedItem(
          TOKEN,
          authUserState.data.username,
          data,
        ),
      )
    },
    [TOKEN, dispatch],
  )

  //Alert and Confirm
  const initAlertInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
  }
  const [showAlert, setShowAlert] = useState(initAlertInfo)

  const initConfirmInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
    onConfirm: '',
  }
  const [showConfirm, setShowConfirm] = useState(initConfirmInfo)

  //根據當前操作類型顯示Alert或Confirm元件
  const [operateType, setOperateType] = useState('')
  useEffect(() => {
    if (
      (operateType === 'cart' && cartState.error === null) ||
      (operateType === 'removeToCartFromLiked' &&
        cartState.error === null &&
        likedProductState.error === null)
    ) {
      setShowAlert({
        iconType: 'cartCheck',
        title: '購物車',
        content: '已加入購物車',
        active: true,
      })
    }
    if (operateType === 'likedProduct' && likedProductState.error === null) {
      setShowAlert({
        iconType: 'heartAdd',
        title: '收藏清單',
        content: '已加入收藏清單',
        active: true,
      })
    }
    if (operateType === 'unlikedProduct' && likedProductState.error === null) {
      setShowAlert({
        iconType: 'heartRemove',
        title: '收藏清單',
        content: '已取消收藏此商品',
        active: true,
      })
    }

    setOperateType('')
  }, [likedProductState.error, cartState.error, operateType])

  return (
    <>
      <ProductsWrapper $viewMode={$viewMode}>
        {data.map((product, idx) => {
          return (
            <ProductCard
              $viewMode={$viewMode}
              key={product.productNumber}
              product={product}
              verifyDuplicate={verifyDuplicate}
              handleAddToCart={handleAddToCart}
              handleAddLike={handleAddLike}
              handleRemoveLike={handleRemoveLike}
              handleRemoveToCartFromLiked={handleRemoveToCartFromLiked}
            />
          )
        })}
      </ProductsWrapper>

      {/* Alert and Confirm */}
      {showAlert.active && (
        <Alert
          iconType={showAlert.iconType}
          title={showAlert.title}
          content={showAlert.content}
          onClose={() => {
            setShowAlert(initAlertInfo)
          }}
        />
      )}
      {showConfirm.active && (
        <Confirm
          iconType={showConfirm.iconType}
          title={showConfirm.title}
          content={showConfirm.content}
          onClose={() => {
            setShowConfirm(initConfirmInfo)
          }}
          onConfirm={showConfirm.onConfirm}
        />
      )}
    </>
  )
}
