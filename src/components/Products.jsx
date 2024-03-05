import styled from 'styled-components'
// import { popularProducts } from '@/utils/data'
import { Product } from './Product'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { mobile } from '@/utils/responsive'

const Container = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  margin: 20px auto;
  width: calc(100% - 36px);
  ${mobile({
    width: 'calc(100% - 20px)',
  })}
`

export const Products = ({ category, limit, getNew, filters, sort }) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

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
      if (category) {
        query.push(`categories=${category}`)
      }
      if (getNew) {
        query.push(`new=${getNew}`)
      }
      if (query.length !== 0) {
        apiUrl += '?'
        query.forEach(q => (apiUrl += q))
      }

      try {
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
  }, [category, getNew, limit])

  // 設置篩選過的資料
  useEffect(() => {
    let filtered = products

    if (category === '全部商品' && filters.size !== '全部尺寸') {
      filtered = products.filter(item => item.size === filters.size)
    } else if (category !== '全部商品' && filters.size === '全部尺寸') {
      filtered = products.filter(item => item.categories.includes(category))
    } else if (category === '全部商品' && filters.size === '全部尺寸') {
      filtered = products
    } else {
      filtered = products.filter(item =>
        Object.entries(filters).every(
          ([key, value]) => item[key] && item[key].includes(value),
        ),
      )
    }

    setFilteredProducts(filtered)
  }, [category, filters, products])

  //排序
  useEffect(() => {
    if (products.length > 0) {
      if (sort === 'Newest') {
        //使用 new Date() 函數將日期字串轉換為JavaScript日期對象再進行比較
        setFilteredProducts(prev =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        )
      } else if (sort === 'PriceAsc') {
        setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
      } else {
        setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
      }
    }
  }, [sort, filters, products])

  // Return
  if (isPending) {
    return (
      <Container>
        <h1>載入中...</h1>
      </Container>
    )
  }
  if (error) {
    return <h1>{JSON.stringify(error)}</h1>
  }
  return (
    <>
      <Container>
        {filteredProducts.map(item => {
          return <Product item={item} key={item._id} />
        })}
      </Container>
    </>
  )
}
