import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'

export const SEO = ({
  title = '測試標題',
  description = '測試content',
  url,
  children,
}) => {
  const [currentTitle, setCurrentTitle] = useState(title)
  const marqueeInterval = useRef(null)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const marqueeText = '熱銷現貨，速速搶購⚡️　現貨直送，立即擁有!🚚　'
        let index = 0
        marqueeInterval.current = setInterval(() => {
          const newTitle =
            marqueeText.slice(index) + marqueeText.slice(0, index)
          setCurrentTitle(newTitle)
          index = (index + 1) % marqueeText.length
        }, 200)
      } else {
        if (marqueeInterval.current) {
          clearInterval(marqueeInterval.current)
          marqueeInterval.current = null
        }
        setCurrentTitle(title)
      }
    }

    setCurrentTitle(title)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (marqueeInterval.current) {
        clearInterval(marqueeInterval.current)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [title])

  useEffect(() => {
    document.title = currentTitle
  }, [currentTitle])

  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{currentTitle}</title>
      <meta name='description' content={description} />
      {children}
      {url ? <link rel='canonical' href={url} /> : ''}
      <link rel='icon' href='/favicon/favicon.ico' sizes='32x32' />
    </Helmet>
  )
}
