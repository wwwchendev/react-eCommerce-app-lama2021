import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link, useParams, useLocation } from 'react-router-dom'

import { md, sm } from '@/components/layout/responsive'
import { StyledLink } from '@/components/common'

const Container = styled.div`
  padding: 100px 50px;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  position: relative;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${sm({ width: '75%' })}
  ${md({ width: '75%' })}
  padding:30px;
  border: 1px solid #333;
  border-radius: 5px;
  color: #999;
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 24px;
    font-size: 16px;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  ${StyledLink} {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-top: 50px;
  }
`

const InvalidResource = () => {
  return (
    <Container>
      <Wrapper>
        <h1>無效商品</h1>
        <p>非常抱歉，您目前訪問的商品可能不存在或已下架</p>
        <StyledLink to='/products'>回商品列表</StyledLink>
      </Wrapper>
    </Container>
  )
}

export default InvalidResource
