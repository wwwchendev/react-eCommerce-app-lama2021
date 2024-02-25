import {
  PageLayout,
  Slider,
  Categories,
  Products,
  Newsletter,
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
    </>
  )
}

export default Home
