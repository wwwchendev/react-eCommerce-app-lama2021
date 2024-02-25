import { Outlet } from 'react-router-dom'
import { Announcement, Navbar, Footer, ScrollToTop } from '@/components'
import { useOffset } from '@/context/OffsetContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function App() {
  const { announcementVisible } = useOffset()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location.pathname])
  return (
    <>
      {announcementVisible && <Announcement />}
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
