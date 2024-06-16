import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//components
import * as Layout from '@/components/layout'
import styled from 'styled-components'
import customAxios from '@/utils/axios/customAxios'
import { ProductCard, ProductCards } from '@/components/common'
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
  position: relative;
`

const RecommendProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cartState = useSelector(state => state.cart)
  const likedProductState = useSelector(state => state.likedProduct)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await customAxios.post(
          `${import.meta.env.VITE_APIURL}/product/searchByCategory?limit=8`,
          {
            categoryName: '熱銷推薦',
          },
        )
        const data = response.data
        setProducts(data.data)
      } catch (error) {
        console.error(error)
        setError('無法獲取最新消息。')
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])
  if (error) return <p>{error}</p>

  return (
    <>
      <Container>
        {(cartState.loading || likedProductState.loading || loading) && (
          <Layout.Loading
            type={'spin'}
            active={true}
            color={'#c9a388'}
            size={'160px'}
          />
        )}

        <ProductCards $viewMode={'grid'} products={products} />
      </Container>
    </>
  )
}

export default RecommendProducts
