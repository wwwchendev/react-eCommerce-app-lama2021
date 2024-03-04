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
        <Products limit={8} sort={'Newest'} filters={{}} />
        <Newsletter />
      </PageLayout>
    </>
  )
}

export default Home
