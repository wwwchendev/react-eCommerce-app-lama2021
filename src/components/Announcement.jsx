import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { announceList } from '@/data'

const itemHeight = '30'
const animationDuration = '2000'

const Container = styled.div`
  height: ${itemHeight}px;
  background-color: #c9c481;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: 99;
`
const Wrapper = styled.div`
  height: 100%;
  transform: translateY(${p => p.$announceIndex * -itemHeight}px);
  transition: all ${animationDuration}ms ease;
`
const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${itemHeight}px;
  text-decoration: none;
  color: #ffffff;
`

export const Announcement = () => {
  const [announceIndex, setAnnounceIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceIndex(prevIndex =>
        prevIndex === announceList.length - 1 ? 0 : prevIndex + 1,
      )
    }, animationDuration)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <Wrapper $announceIndex={announceIndex}>
        {announceList.map((announce, idx) => {
          return (
            <Link
              href={announce.url}
              key={idx}
              $announceIndex={announceIndex}
              $index={idx}
            >
              {announce.title}
            </Link>
          )
        })}
      </Wrapper>
    </Container>
  )
}
