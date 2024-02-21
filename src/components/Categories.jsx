import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { categories } from '@/data'
import { CategoryItem } from './CategoryItem'
import { mobile } from '../responsive'

const Container = styled.div`
  display: flex;
  padding: 20px   20px 0 20px ;
  justify-content: space-between;
  ${mobile({
  flexDirection: 'column',
})}
`

export const Categories = () => {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategoryList(categories)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <p>載入中</p>
  }
  if (error) {
    return <p>取得資料時發生錯誤</p>
  }
  return (
    <Container>
      {categoryList.map((category, idx) => {
        return <CategoryItem item={category} key={idx} />
      })}
    </Container>
  )
}
