import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as Layout from '@/components/layout';
const { SEO } = Layout;
import { Breadcrumb, IconButton, ProductCards, Alert } from '@/components/common';
import Icon from '@/components/icon';
const { List, TableCells, HeartEdit } = Icon;
import { md, sm } from '@/components/layout/responsive';
import AccountSettingList from '../account/AccountSettingList';
import { likedProductRequests } from '@/store/likedProduct';
import NoProduct from './NoProduct';
import { Container, Grid } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

const StyledContainer = styled(Container)`
padding: 2rem 0 4rem 0;
border: 1px solid blue;
`;


const Aside = styled(Grid)`
border: 1px solid blue;
  ${sm({ display: 'none' })}
`;

const ProductViewMode = styled.div`
  display: flex;
  gap: 0 1rem;
`;

const SorterWidget = styled.aside`
/* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const LikedProducts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const dispatch = useDispatch()

  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [paths, setPaths] = useState([
    { label: '首頁', path: '/' },
    { label: '會員中心', path: '/account' },
    { label: '收藏清單', path: '/likedProducts' }
  ]);
  const [seoTitle, setSeoTitle] = useState("收藏清單");

  //TOKEN
  const authUser = useSelector(state => state.authUser.data)
  const TOKEN = authUser?.accessToken;
  const likedProductState = useSelector(state => state.likedProduct)


  useEffect(() => {
    dispatch(likedProductRequests.get(TOKEN, authUser?.username))
    setLikedProducts(likedProductState.data.products)
  }, [TOKEN]);


  return (
    <Layout.PageLayout>
      <SEO title={`${seoTitle} | RESTART - SHOP`} description={null} url={null} />
      <StyledContainer>
        {
          likedProductState.loading && (
            <Layout.Loading
              type={'spin'}
              active={true}
              color={'#c9a388'}
              size={'160px'}
            />
          )
        }
        <Breadcrumb paths={paths} />

        <Grid container justifyContent='center' spacing={0}>
          <Aside item xs={12} md={2}>
            <AccountSettingList />
          </Aside>
          <Grid item xs={12} md={10}>
            <SorterWidget>
              {likedProductState.data?.products?.length > 0
                ? <p>顯示 1 - {likedProductState.data?.products?.length} 共 {likedProductState.data?.products?.length} 項商品</p>
                : <p>共 {likedProductState.data?.products?.length} 項商品</p>}

              <ProductViewMode>
                <IconButton
                  icon={TableCells}
                  $size="26px"
                  onClick={() => setViewMode('grid')}
                />
                <IconButton
                  icon={List}
                  $size="26px"
                  onClick={() => setViewMode('list')}
                />
              </ProductViewMode>
            </SorterWidget>
            {(likedProductState.data.products.length === 0 || likedProductState.data.username !== authUser?.username)
              ? <NoProduct />
              : <>
                <ProductCards
                  $viewMode={viewMode}
                  products={likedProductState.data.products}
                />
              </>
            }
            {/* <pre> {JSON.stringify(likedProductState.data.products, null, 2)}</pre> */}
          </Grid>
        </Grid>

      </StyledContainer>
    </Layout.PageLayout>
  );
};
