import { Outlet } from 'react-router-dom'
import { Announcement, Navbar, ScrollToTop } from '@/components'
import { useOffset } from '@/context/OffsetContext'

function App() {
  const { announcementVisible } = useOffset()
  return (
    <>
      {announcementVisible && <Announcement />}
      <Navbar />
      <Outlet />
      <ScrollToTop />
    </>
  )
}

export default App
