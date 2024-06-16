//react
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { newsRequests } from '@/store/news'
//components
import styled from 'styled-components'
import { xs, md, sm } from '@/components/layout/responsive'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Breadcrumb } from '@/components/common'
import { NotFound } from '@/pages'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
//utility
import customAxios from '@/utils/axios/customAxios'
import HTMLReactParser from 'html-react-parser'
import { getDayString } from '@/utils/format.js'
import { Container } from '@material-ui/core'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  gap: 0.75rem;

  ${md`
    ${Breadcrumb} {
      display: none;
    }
  `}
`
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 1000px;
  border: #dbd6d6 1px solid;
  margin-bottom: 1rem;
  border-radius: 5px;
  overflow-y: scroll;
  ${sm({
  maxHeight: '100%',
  overflowY: 'auto',
})}
`
const Main = styled.main`
  position: relative;
  padding: 2rem 0rem;
  height: 100%;
  width: 80%;
  min-height: 300px;
  ${md({
  width: '100%',
})}
  img {
  }
`
const Title = styled.h1`
  font-weight: 900;
  font-size: 2rem;
  margin: 1rem 0 2rem 0;
  ${md({ fontSize: '1.8rem' })}
  ${sm({ fontSize: '1.5rem' })}
`
const Content = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ul {
    list-style-type: none;
    padding: 0;
  }
  img {
    width: 80%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
    ${md({
  width: '100%',
})}
  }
`
const DateText = styled.p`
  font-size: 24px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 5rem;
  position: relative;
  ${sm({
  flexDirection: 'column',
})}
`
const Navigate = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-decoration: none;
  color: #000;
  border: #dbd6d6 1px solid;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  box-sizing: border-box;
  position: absolute;
  left: ${p => (p.$type === 'prev' ? '0' : '')};
  right: ${p => (p.$type === 'next' ? '0' : '')};
  max-width: 40%;
  div {
    display: flex;
    gap: 0.5rem;
  }

  &:last-child {
    align-items: flex-end;
    text-align: right;
  }
  &:hover {
    border: #000000 1px solid;
  }
  p {
    white-space: nowrap;
    ${sm({
  display: 'none',
})}
  }
  ${sm({
  width: '40%',
})}
`

/* 版型 */
export const SingleNews = () => {
  const { title } = useParams()
  const [news, setNews] = useState({
    title: title,
    content: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  //redux
  const dispatch = useDispatch()
  const newsState = useSelector(state => state.news)

  const [navItems, setNavItems] = useState({ next: null, prev: null })

  useEffect(() => {
    if (!newsState.data.length) {
      dispatch(newsRequests.getAll())
    }
    const index = newsState.data.findIndex(item => item.title === title)
    if (index === 0) {
      setNavItems({
        prev: newsState.data[index + 1],
        next: null,
      })
    } else if (index === newsState.data.length - 1) {
      setNavItems({
        prev: null,
        next: newsState.data[index - 1],
      })
    } else {
      setNavItems({
        prev: newsState.data[index + 1],
        next: newsState.data[index - 1],
      })
    }
  }, [dispatch, newsState.data.length, title])

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await customAxios.get(
          `${import.meta.env.VITE_APIURL}/news/${title}`,
        )
        setNews(response.data.data)
      } catch (error) {
        console.error(error)
        setError('無法獲取最新消息。')
      }
      setLoading(false)
    }
    fetchNews()
  }, [title])

  if (error) return <NotFound />
  return (
    <Layout.PageLayout>
      <SEO title={`${title} | RESTART-SHOP`} description={null} url={null} />
      <StyledContainer>
        <Breadcrumb
          paths={[
            { label: '首頁', path: '/' },
            { label: '最新消息', path: '/news' },
            { label: `${title}`, path: `/news/${title}` },
          ]}
        />
        <Wrapper>
          <Main>
            {loading ? (
              <Layout.Loading
                type={'spin'}
                active={true}
                color={'#c9a388'}
                size={'160px'}
              />
            ) : (
              <>
                <DateText>{getDayString(new Date(news.createdAt))}</DateText>
                <Title>{news.title}</Title>
                <Content>{HTMLReactParser(news.richContent)}</Content>
              </>
            )}
          </Main>
        </Wrapper>
        <Bottom>
          {navItems.prev && (
            <Navigate
              to={`/news/${navItems.prev?.title}`}
              disabled={navItems.prev}
              $type='prev'
            >
              <div>
                <ArrowBack />
                上一則
              </div>
              <p>{navItems.prev?.title}</p>
            </Navigate>
          )}

          {navItems.next && (
            <Navigate to={`/news/${navItems.next?.title}`} $type='next'>
              <div>
                下一則
                <ArrowForward />
              </div>
              <p>{navItems.next?.title}</p>
            </Navigate>
          )}
        </Bottom>
      </StyledContainer>
    </Layout.PageLayout>
  )
}
