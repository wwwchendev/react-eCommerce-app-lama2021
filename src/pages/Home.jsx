import {
  Announcement,
  PageLayout,
  Slider,
  Categories,
  Products,
  Newsletter,
} from '@/components'
const Home = () => {
  return (
    <>
      <Announcement />
      <PageLayout>
        <Slider />
        <Categories />
        <Products />
        <Newsletter />
      </PageLayout>
    </>
  )
}

export default Home
