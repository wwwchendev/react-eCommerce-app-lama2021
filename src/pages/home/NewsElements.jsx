import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//components
import styled from 'styled-components'
import NewsElement from './NewsElement'
import { md, xs } from '@/components/layout/responsive'
import customAxios from '@/utils/axios/customAxios'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  ${xs({
  gridTemplateColumns: 'repeat(2, 1fr)',
})}
`

const NewsElements = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await customAxios.get(
          `${import.meta.env.VITE_APIURL}/news/all?limit=6`,
        )
        const data = response.data.data.map((item, idx) => ({
          title: item.title,
          image: `${import.meta.env.VITE_APIURL}/file${item.coverImage}`,
          linkUrl: `/news/${item.title}`,
          key: idx,
        }))
        setNews(data)
      } catch (error) {
        console.error(error)
        setError('無法獲取最新消息。')
      }
      setLoading(false)
    }
    fetchNews()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  return (
    <>
      <Container>
        {news.map((item, idx) => {
          return <NewsElement key={idx} announcement={item} />
        })}
      </Container>
    </>
  )
}

export default NewsElements
