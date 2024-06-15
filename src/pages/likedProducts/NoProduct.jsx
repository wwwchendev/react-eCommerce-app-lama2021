import React from 'react'
//components
import styled from 'styled-components'
import Icon from '@/components/icon';
const { HeartFolder } = Icon;

const Container = styled.div`
 /* border: 1px solid red; */
 width: 100%;
padding:2rem  0;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;
const StyledText = styled.p`
font-size:${p => p.$fontSize ? p.$fontSize : ''} ;
color:${p => p.$color ? p.$color : ''};
line-height: 2;
letter-spacing: 4px;
`

const ImageContainer = styled.div`
width: 240px;
height:auto;
color: #ddd;
`
const NoProduct = ({ search, category }) => {
  const Image = <HeartFolder />
  return (
    <Container>
      <ImageContainer>
        {Image}
      </ImageContainer>
      <StyledText $color="#666" $fontSize="1.75rem">
        收藏清單中尚無商品
      </StyledText>
    </Container>
  )
}

export default NoProduct