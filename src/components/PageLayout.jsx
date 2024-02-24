import styled from 'styled-components'
import { tablet } from '@/responsive'
import { useOffset } from '@/context/OffsetContext'

const Content = styled.main`
  ${p => {
    //console.log('navbar-offset', p.$componentOffsets.pageLayout)
  }}
  padding-top: ${p => p.$componentOffsets.pageLayout}px;

  ${tablet({
    paddingTop: `${p => p.$elHeight.navbar - 10}px`,
  })};
`

export const PageLayout = ({ children }) => {
  const { componentOffsets } = useOffset()
  return (
    <>
      <Content $componentOffsets={componentOffsets}>{children}</Content>
    </>
  )
}
