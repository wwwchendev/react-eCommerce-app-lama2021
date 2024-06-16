import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newsRequests } from '@/store/news'
import styled from 'styled-components'
import { md, sm } from '@/components/layout/responsive'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Breadcrumb } from '@/components/common'
import customAxios from '@/utils/axios/customAxios'
import { getDayString } from '@/utils/format.js'
import { Container } from '@material-ui/core'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0;
  gap: 0.75rem;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ListItem = styled.li`
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #dad7d4;
  ${sm({
    flexDirection: 'column',
    gap: '0',
  })}
`

const DateInfo = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const NewBadge = styled.div`
  padding: 0 5px;
  height: 18px;
  background: #db2e03;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  width: 100%;
  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: #000;
    &:hover {
      color: #d31414;
    }
  }
`

export const News = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [dataList, setDataList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    const fetchNewsList = async page => {
      setLoading(true)
      try {
        const response = await customAxios.post(
          `${import.meta.env.VITE_APIURL}/news/paginated`,
          {
            page,
            sort: 'createdAt',
            orderBy: 'desc',
            perPage: perPage,
          },
        )
        if (response.data.data.length === 0) {
          setHasMore(false)
        } else {
          setDataList(prevDataList => [...prevDataList, ...response.data.data])
        }
      } catch (error) {
        console.error(error)
        setError('無法獲取最新消息。')
      }
      setLoading(false)
    }

    fetchNewsList(page)
  }, [page])

  const lastNewsElementRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  return (
    <Layout.PageLayout>
      <SEO title='最新消息 | RESTART-SHOP' description={null} url={null} />
      <StyledContainer>
        <Breadcrumb
          paths={[
            { label: '首頁', path: '/' },
            { label: `最新消息`, path: '/news' },
          ]}
        />
        <List>
          {dataList.map((item, index) => {
            const month = new Date().getMonth() + 1
            const publishMonth = new Date(item.createdAt).getMonth() + 1
            if (dataList.length === index + 1) {
              return (
                <ListItem ref={lastNewsElementRef} key={item.newsNumber}>
                  <DateInfo>
                    <p>{getDayString(new Date(item.createdAt))}</p>
                    {month === publishMonth && <NewBadge>NEW</NewBadge>}
                  </DateInfo>
                  <Title>
                    <Link to={`/news/${item.title}`}>{item.title}</Link>
                  </Title>
                </ListItem>
              )
            } else {
              return (
                <ListItem key={item.newsNumber}>
                  <DateInfo>
                    <p>{getDayString(new Date(item.createdAt))}</p>
                    {month === publishMonth && <NewBadge>NEW</NewBadge>}
                  </DateInfo>
                  <Title>
                    <Link to={`/news/${item.title}`}>{item.title}</Link>
                  </Title>
                </ListItem>
              )
            }
          })}

          {loading && (
            <Layout.Loading
              type={'spin'}
              active={true}
              color={'#c9a388'}
              size={'160px'}
            />
          )}
          {error && <p>{error}</p>}
        </List>
      </StyledContainer>
    </Layout.PageLayout>
  )
}
