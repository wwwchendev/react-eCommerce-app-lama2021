import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Breadcrumb, IconButton, ProductCards } from '@/components/common'
import ProductCategoryList from './ProductCategoryList'
import ProductNotFound from './ProductNotFound'
import Paginator from './Paginator' // 分頁器元件的引入
import Icon from '@/components/icon'
const { List, TableCells } = Icon
import customAxios from '@/utils/axios/customAxios'
import { md, sm } from '@/components/layout/responsive'
import { Container, Grid } from '@material-ui/core'

const StyledContainer = styled(Container)`
  padding: 2rem 0;
`

const Aside = styled(Grid)`
  ${sm({ display: 'none' })}
`

const ProductViewMode = styled.div`
  display: flex;
  gap: 0 1rem;
`

const SorterWidget = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

export const ProductList = () => {
  const [viewMode, setViewMode] = useState('grid')
  const query = new URLSearchParams(useLocation().search)
  const category = query.get('category')
  const subCategory = query.get('subCategory')
  const search = query.get('search')
  const release = query.get('release')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(16)
  const [totalDataCount, setTotalDataCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const initialPaths = [
    { label: '首頁', path: '/' },
    { label: '商品列表', path: '/products' },
  ]
  const [paths, setPaths] = useState(initialPaths)
  const [seoTitle, setSeoTitle] = useState('全部商品')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let response
        let updatedPaths = [...initialPaths]
        if (category) {
          updatedPaths.push({
            label: category,
            path: `/products?category=${category}`,
          })
          if (!subCategory) {
            response = await customAxios.post(
              `${import.meta.env.VITE_APIURL}/product/paginated`,
              {
                page: page,
                categoryName: category,
                sort: 'createdAt',
                orderBy: 'desc',
                perPage: perPage,
              },
            )
          } else {
            response = await customAxios.post(
              `${import.meta.env.VITE_APIURL}/product/paginated`,
              {
                page: page,
                categoryName: category,
                subCategoryName: subCategory,
                sort: 'createdAt',
                orderBy: 'desc',
                perPage: perPage,
              },
            )
            updatedPaths.push({
              label: subCategory,
              path: `/products?category=${category}&subCategory=${subCategory}`,
            })
          }
        } else if (search) {
          response = await customAxios.post(
            `${import.meta.env.VITE_APIURL}/product/paginated`,
            {
              page: page,
              query: search,
              sort: 'createdAt',
              orderBy: 'desc',
              perPage: perPage,
            },
          )
          updatedPaths.push({
            label: `搜尋結果【${search}】`,
            path: `/products?query=${category}`,
          })
        } else if (release) {
          response = await customAxios.post(
            `${import.meta.env.VITE_APIURL}/product/paginated`,
            {
              page: page,
              categoryName: '依上架日期',
              subCategoryName: release,
              sort: 'createdAt',
              orderBy: 'desc',
              perPage: perPage,
            },
          )
          updatedPaths.push({
            label: release,
            path: `/products?release=${release}`,
          })
        } else {
          response = await customAxios.post(
            `${import.meta.env.VITE_APIURL}/product/paginated`,
            {
              page: page,
              sort: 'createdAt',
              orderBy: 'desc',
              perPage: perPage,
            },
          )
        }
        setProducts(response.data.data)
        setTotalDataCount(response.data.totalDataCount)
        setTotalPages(Math.ceil(response.data.totalDataCount / perPage))
        setPaths(updatedPaths)
      } catch (error) {
        setProducts([])
        setError('Unable to fetch products.')
      }
      setLoading(false)
    }
    fetchProducts()
  }, [category, subCategory, search, release, page, perPage]) // 注意要加入 page 和 perPage 到依賴列表中

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  return (
    <Layout.PageLayout>
      <SEO
        title={`${seoTitle} | RESTART - SHOP`}
        description={null}
        url={null}
      />
      {loading && (
        <Layout.Loading
          type={'spin'}
          active={true}
          color={'#c9a388'}
          size={'160px'}
          $position={'fixed'}
        />
      )}
      <StyledContainer>
        <Breadcrumb paths={paths} />
        <Grid container justifyContent='center' spacing={3}>
          <Aside item xs={12} md={3}>
            <ProductCategoryList />
          </Aside>

          <Grid item xs={12} md={9}>
            <SorterWidget>
              {products.length > 0 ? (
                <p>
                  顯示 {perPage * (page - 1) + 1} -{' '}
                  {page !== totalPages ? perPage * page : totalDataCount} 共{' '}
                  {totalDataCount} 項商品
                </p>
              ) : (
                <p>共 {products.length} 項商品</p>
              )}

              <ProductViewMode>
                <IconButton
                  icon={TableCells}
                  $size='26px'
                  onClick={() => setViewMode('grid')}
                />
                <IconButton
                  icon={List}
                  $size='26px'
                  onClick={() => setViewMode('list')}
                />
              </ProductViewMode>
            </SorterWidget>
            {products.length === 0 ? (
              <ProductNotFound search={search} category={category} />
            ) : (
              <>
                <ProductCards $viewMode={viewMode} products={products} />
                <Paginator
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </Grid>
        </Grid>
      </StyledContainer>
    </Layout.PageLayout>
  )
}
