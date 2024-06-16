//components
import styled from 'styled-components'
import BoxSvg from './BoxSvg'
import SearchSvg from './SearchSvg'

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.p`
  font-size: ${p => (p.$fontSize ? p.$fontSize : '')};
  color: ${p => (p.$color ? p.$color : '')};
  line-height: 2;
  letter-spacing: 4px;
`

const ImageContainer = styled.div`
  width: 240px;
  height: auto;
`
const ProductNotFound = ({ search, category }) => {
  const Image = search ? <SearchSvg /> : <BoxSvg />
  return (
    <Container>
      <ImageContainer>{Image}</ImageContainer>
      <StyledText $color='#666' $fontSize='1.75rem'>
        {search ? `查無與"${search}"有關的商品` : '分類商品準備中'}
      </StyledText>
      <StyledText $color='#999' $fontSize='1.3rem'>
        {search ? '請嘗試其他關鍵字搜尋' : '先去別的分類逛逛'}
      </StyledText>
    </Container>
  )
}

export default ProductNotFound
