import {
  Announcement,
  PageLayout,
  Slider,
  Categories,
  Products,
  Newsletter,
  Footer,
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
      <Footer />
    </>
  )
}

export default Home
