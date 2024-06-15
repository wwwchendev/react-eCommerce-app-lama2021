import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Layout from '@/components/layout';
const { SEO } = Layout;
import { Breadcrumb, StyledLink } from '@/components/common';
import { md, sm } from '@/components/layout/responsive';
import QA from './QA';
import Brand from './Brand';
import PrivatePolicy from './PrivatePolicy';
import AfterSales from './AfterSales';
import { Container, Grid } from '@material-ui/core';

const StyledContainer = styled(Container)`
border: 1px solid blue;
  padding: 2rem 0;
`;

const Aside = styled(Grid)`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
  position: sticky;
  top: 130px;
  z-index: 100;

    ${sm({
  flexDirection: 'row',
  display: 'none'
})} 
    li {
      a {
        display: block;
        padding: 5px 0;
      }
      ${md({ marginBottom: '0' })}
    }
  }
`;

const SidebarLink = styled(StyledLink)`
  text-decoration: none;
  color: ${props => props.$actived ? '#8f2d14' : '#666'}; 
  font-weight: ${props => props.$actived ? 'bold' : 'normal'};

  &:hover { color: #8f2d14 }
`

const TitleWrapper = styled.div`
  position: relative;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1;
  h1 {
    font-size: 1.5rem;
    text-indent: 1rem;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: #333;
  }
`;

export const About = () => {
  const sideItems = [
    { title: '品牌介紹', linkUrl: '/about?type=brand', contentElement: <Brand /> },
    { title: '購物說明', linkUrl: '/about?type=qa', contentElement: <QA /> },
    { title: '售後服務', linkUrl: '/about?type=afterSales', contentElement: <AfterSales /> },
    { title: '隱私權保護', linkUrl: '/about?type=privatePolicy', contentElement: <PrivatePolicy /> },
  ];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const currentItem = sideItems.find(item => item.linkUrl.includes(`type=${type}`)) || sideItems[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);



  return (
    <Layout.PageLayout>
      <SEO title={`${currentItem.title} | RESTART-SHOP`} description={null} url={null} />
      <StyledContainer>

        <Breadcrumb paths={[
          { label: '首頁', path: '/' },
          { label: currentItem.title, path: currentItem.linkUrl }
        ]} />

        <Grid container justifyContent='center' spacing={3}>
          <Aside item xs={12} md={2}>
            <ul>
              {sideItems.map((item, idx) => (
                <li key={idx}>
                  <SidebarLink
                    to={item.linkUrl}
                    $actived={item.linkUrl.includes(`type=${type}`)}
                  >
                    {item.title}
                  </SidebarLink>
                </li>
              ))}
            </ul>
          </Aside>
          <Grid item xs={12} md={10}>
            <TitleWrapper><h1>{currentItem.title}</h1></TitleWrapper>
            {currentItem.contentElement}
          </Grid>
        </Grid>

      </StyledContainer>

    </Layout.PageLayout>
  );
};
