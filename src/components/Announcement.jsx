import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { announceList } from '@/utils/data'
import { CloseRounded } from '@material-ui/icons'
import { useOffset } from '@/context/OffsetContext'

const animationDuration = '2000'

const Container = styled.div`
  height: ${p => p.$elHeight.announcement}px;
  background-color: #c9c481;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: 99;
`
const CloseBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: white;
  border: 1px white solid;
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
  transform: translateY(${p => p.$announceIndex * -p.$elHeight.announcement}px);
  transition: all ${animationDuration}ms ease;
`
const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${p => p.$elHeight.announcement}px;
  text-decoration: none;
  color: #ffffff;
`

export const Announcement = () => {
  const { elHeight, handleAnnouncementClose } = useOffset()
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
    <Container $elHeight={elHeight}>
      <CloseBtn onClick={handleAnnouncementClose}>
        <CloseRounded />
      </CloseBtn>
      <Wrapper $announceIndex={announceIndex} $elHeight={elHeight}>
        {announceList.map((announce, idx) => {
          return (
            <Link
              href={announce.url}
              key={idx}
              $announceIndex={announceIndex}
              $index={idx}
              $elHeight={elHeight}
            >
              {announce.title}
            </Link>
          )
        })}
      </Wrapper>
    </Container>
  )
}
