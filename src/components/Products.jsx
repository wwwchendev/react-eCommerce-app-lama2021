import styled from 'styled-components'
// import { popularProducts } from '@/utils/data'
import { Product } from './Product'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { mobile } from '@/utils/responsive'
import { Loading } from '@/components'
import { useSearchParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  /* border:1px solid red; */
  justify-content: center;
  align-items: center;
  max-width: 100%;
  padding-bottom: 20px;
`
const ProductsContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
`

export const Products = ({ limit, getNew, sort }) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const [searchParams] = useSearchParams()
  const qCategory = searchParams.get('category')

  //用於請求資料
  useEffect(() => {
    const source = axios.CancelToken.source()
    setIsPending(true)
    const getProducts = async () => {
      let apiUrl = `${import.meta.env.VITE_APIURL}/products`
      const query = []
      if (limit) {
        query.push(`limit=${limit}`)
      }
      if (qCategory) {
        query.push(`categories=${qCategory}`)
      }
      if (getNew) {
        query.push(`new=${getNew}`)
      }
      if (query.length !== 0) {
        apiUrl += '?'
        query.forEach(q => (apiUrl += `&${q}`))
      }

      try {
        console.log(apiUrl)
        //解析路徑分類決定請求路徑
        const response = await axios.get(apiUrl)
        setProducts(response.data)
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setIsPending(false)
      }
    }
    getProducts()
    setFilteredProducts(products)

    // 返回清除函数
    return () => {
      source.cancel('Component unmounted')
    }
  }, [qCategory])

  // 設置篩選過的資料
  useEffect(() => {
    let filtered = products
    // console.log(category, filtered);
    setFilteredProducts(filtered)
  }, [qCategory, products])

  //排序
  useEffect(() => {
    if (products.length > 0) {
      if (sort === 'Newest') {
        // 使用 new Date() 函數將日期字串轉換為 JavaScript 日期對象再進行比較
        setFilteredProducts(prev =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        )
      } else if (sort === 'PriceAsc') {
        setFilteredProducts(prev =>
          [...prev].sort((a, b) => {
            const minPriceA = Math.min(
              ...a.specification.map(spec => spec.price),
            )
            const minPriceB = Math.min(
              ...b.specification.map(spec => spec.price),
            )
            return minPriceA - minPriceB
          }),
        )
      } else {
        setFilteredProducts(prev =>
          [...prev].sort((a, b) => {
            const minPriceA = Math.min(
              ...a.specification.map(spec => spec.price),
            )
            const minPriceB = Math.min(
              ...b.specification.map(spec => spec.price),
            )
            return minPriceB - minPriceA
          }),
        )
      }
    }
  }, [sort, products])

  if (error) {
    return <h1>{JSON.stringify(error)}</h1>
  }
  return (
    <>
      <Container>
        <Loading active={isPending} />
        <ProductsContainer>
          {filteredProducts.map(item => {
            return <Product item={item} key={item._id} />
          })}
        </ProductsContainer>
      </Container>
    </>
  )
}
