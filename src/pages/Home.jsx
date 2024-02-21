import {
  Announcement,
  PageLayout,
  Slider,
  Categories,
  Products,
} from '@/components'
const Home = () => {
  return (
    <>
      <Announcement />
      <PageLayout>
        <Slider />
        <Categories />
        <Products />
      </PageLayout>
    </>
  )
}

export default Home
