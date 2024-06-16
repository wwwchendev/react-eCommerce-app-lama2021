//react
import { useRef } from 'react'
//redux
import { useConfigs } from '../../../context/ConfigsContext'
//components
import * as Layout from '@/components/layout'
const { PopupMessage } = Layout
import styled from 'styled-components'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'

const Content = styled.main`
  height: 100%;
  padding-top: ${p => p.$offset}rem;
`
export const PageLayout = ({ children }) => {
  const { CSSVariables } = useConfigs()
  const navbar = CSSVariables.navbar
  const announcement = CSSVariables.announcement

  const contentRef = useRef(null)
  const navbarOffset = navbar.height
  return (
    <>
      <Content
        $offset={
          announcement.actived
            ? announcement.height + navbarOffset
            : navbarOffset
        }
      >
        {children}
        <ScrollToTop $contentRef={contentRef} />
      </Content>
      <PopupMessage />
      <Layout.Footer />
    </>
  )
}
