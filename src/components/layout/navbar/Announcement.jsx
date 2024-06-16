//react
import { useState, useEffect } from 'react'
//redux
import { announceList } from '@/utils/data'
import { useConfigs } from '../../../context/ConfigsContext'
//components
import styled from 'styled-components'
import { CloseRounded } from '@material-ui/icons'

const animationDuration = '4000'
const Container = styled.div`
  height: ${p => p.$elHeight.announcement}rem;
  background-color: #ac7a71;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`
const CloseBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: white;
  border: 2px white solid;
  border-radius: 5px;
  display: flex;
  padding: 2px 2px;
  outline: none;
  position: absolute;
  right: 10px;
  transform: scale(0.7);
  opacity: 0.8;
  &:active {
    transform: scale(0.65);
  }
`
const Wrapper = styled.div`
  height: 100%;
`
const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${p => p.$elHeight}rem;
  text-decoration: none;
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 14px;
`

const Announcement = () => {
  const { CSSVariables, showAnnouncementElement } = useConfigs()
  const announcement = CSSVariables.announcement
  const handleAnnouncementClose = () => {
    showAnnouncementElement('hide')
  }
  const [announceIndex, setAnnounceIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceIndex(prevIndex =>
        prevIndex === 0 ? announceList.length - 1 : prevIndex - 1,
      )
    }, animationDuration)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      {announcement.actived && (
        <Container $elHeight={announcement.height}>
          <Wrapper
            $announceIndex={announceIndex}
            $elHeight={announcement.height}
          >
            {announceList.map((announce, idx) => {
              if (idx !== announceIndex) {
                return
              }
              return (
                <Link
                  href={announce.url}
                  key={idx}
                  $announceIndex={announceIndex}
                  $index={idx}
                  $elHeight={announcement.height}
                >
                  {announce.title}
                </Link>
              )
            })}
          </Wrapper>
          <CloseBtn onClick={handleAnnouncementClose}>
            <CloseRounded />
          </CloseBtn>
        </Container>
      )}
    </>
  )
}
export default Announcement
