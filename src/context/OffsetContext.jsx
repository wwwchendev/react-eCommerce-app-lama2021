import { createContext, useContext, useState, useEffect } from 'react'

// 創建偏移量上下文
const OffsetContext = createContext({})

// 提供偏移量的 OffsetProvider 元件
export const OffsetProvider = ({ children }) => {
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  const elHeight = {
    announcement: 40,
    navbar: 60,
  }

  const [componentOffsets, setComponentOffsets] = useState({
    navbar: 0,
    pageLayout: 0,
  })

  useEffect(() => {
    // 計算 Navbar offset 和 PageLayout offset
    const navbarOffset = announcementVisible ? elHeight.announcement : 0
    const pageLayoutOffset = announcementVisible
      ? elHeight.announcement + elHeight.navbar //100;
      : elHeight.navbar

    setComponentOffsets({
      ...componentOffsets,
      navbar: navbarOffset,
      pageLayout: pageLayoutOffset,
    })
  }, [announcementVisible])

  // 處理關閉 Announcement 組件的函數
  const handleAnnouncementClose = () => {
    setAnnouncementVisible(false)
  }
  return (
    <OffsetContext.Provider
      value={{
        announcementVisible,
        elHeight,
        componentOffsets,
        handleAnnouncementClose,
      }}
    >
      {children}
    </OffsetContext.Provider>
  )
}

// 自定義 hook 以便在其他元件中訪問偏移量
export const useOffset = () => {
  return useContext(OffsetContext)
}
