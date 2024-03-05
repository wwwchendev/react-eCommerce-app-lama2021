import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { categories } from '@/utils/data'
import { CategoryItem } from './CategoryItem'
import { mobile } from '@/utils/responsive'

const Container = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;
  min-height: 50vh;
  justify-content: space-between;
  ${mobile({
    padding: '10px 10px 0 10px',
    flexDirection: 'column',
    minHeight: '100vh',
  })}
`

export const Categories = () => {
  const [categoryList, setCategoryList] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategoryList(categories)
      } catch (error) {
        setError(error)
      } finally {
        setIsPending(false)
      }
    }
    fetchData()
  }, [])

  if (isPending) {
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
