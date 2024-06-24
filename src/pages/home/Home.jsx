//react
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
//redux
import { useConfigs } from '../../context/ConfigsContext'
//components
import styled from 'styled-components'
import * as Layout from '@/components/layout'
const { SEO, ScrollToTop, PopupMessage } = Layout
import { Slider } from '@/components/common'
import ProductCategories from './ProductCategories'
import RecommendProducts from './RecommendProducts'
import NewsElements from './NewsElements'
//utility
import { xs, md, sm } from '@/components/layout/responsive'

import { Container } from '@material-ui/core'

const StyledContainer = styled(Container)`
  padding: 2rem 0;
  overflow: hidden;
`

const HeroArea = styled.div`
  height: 600px;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  padding-top: ${p => p.$offset}rem;
  ${xs({ height: '500px' })}
`
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 0 0 0;
  width: 100%;
  h2 {
    font-size: 30px;
    letter-spacing: 4px;
    text-align: center;
  }
`
const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 8px 32px;
  display: block;
  margin: 0 auto;
  font-size: 18px;
  cursor: pointer;
  font-weight: 400;
  color: #333;
  &:hover {
    box-shadow: 0px 0px 16px rgba(241, 175, 175, 0.5);
    color: #d31414;
    font-weight: 800;
  }
`

export const Home = () => {
  const navigate = useNavigate()
  const { CSSVariables } = useConfigs()
  const navbar = CSSVariables.navbar
  const announcement = CSSVariables.announcement
  const navbarOffset = navbar.height

  const contentRef = useRef(null)
  const slides = [
    {
      id: 0,
      title: 'a-woman-standing-on-a-boat-looking-out-over-the-water',
      src: {
        default: '/images/home/slide01.gif',
        small: '/images/home/slide01-sm.gif',
      },
      linkUrl: '/products/P202405010',
    },
    {
      id: 1,
      title: 'flash-wcdHBS27RKg',
      src: {
        default: '/images/home/slide02.gif',
        small: '/images/home/slide02-sm.gif',
      },
      linkUrl: '/products/P202405011',
    },
    {
      id: 2,
      title: 'woman-in-black-long-sleeve-shirt-sitting-on-brown-wooden-chair',
      src: {
        default: '/images/home/slide03.gif',
        small: '/images/home/slide03-sm.gif',
      },
      linkUrl: '/products/P202405008',
    },
  ]
  return (
    <>
      <SEO title='RESTART-SHOP' description={null} url={null} />
      <HeroArea
        $offset={
          announcement.actived
            ? announcement.height + navbarOffset
            : navbarOffset
        }
      >
        <Slider
          slides={slides}
          options={{
            automatic: true,
            duration: 8,
            navigation: true,
            pagination: true,
          }}
        />
      </HeroArea>
      <StyledContainer>
        <ProductCategories />
        <Section>
          <h2>熱銷推薦</h2>
          <RecommendProducts />
          <MoreButton
            onClick={() => {
              navigate('/products?category=熱銷推薦')
            }}
          >
            了解更多
          </MoreButton>
        </Section>
        <Section>
          <h2>優惠公告</h2>
          <NewsElements />
          <MoreButton
            onClick={() => {
              navigate('/news')
            }}
          >
            了解更多
          </MoreButton>
        </Section>
        <ScrollToTop $contentRef={contentRef} />
      </StyledContainer>
      <PopupMessage />
      <Layout.Footer />
    </>
  )
}
