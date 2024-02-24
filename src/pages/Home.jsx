import {
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
