import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container as MuiContainer, Grid } from '@material-ui/core';
import Icon from '@/components/icon';
import * as Layout from '@/components/layout';
import { StyledLink } from '@/components/common';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { xs, sm, md } from '@/components/layout/responsive';

const { BrokenLink } = Icon;
const { SEO } = Layout;


const StyledContainer = styled(MuiContainer)`
  height: 100%;
  height: calc(100vh - 300px);
`;

const Message = styled.div`
  position: relative;
  padding: 30px;
  border: 1px solid #333;
  border-radius: 5px;
  color: #999;
  text-align: center; 

  h1 {
    color: #333;
    margin-bottom: 24px;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  ${StyledLink} {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-top: 50px;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 60px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const NotFound = () => {
  const theme = useTheme();

  return (
    <Layout.PageLayout>
      <SEO title='找不到該頁面 | RESTART-SHOP' description={null} url={null} />
      <StyledContainer maxWidth='lg' >
        <Grid container justifyContent='center' alignItems='center' style={{ height: '100%' }}>
          <Grid item xs={12} sm={8} md={7} lg={5}>
            <Message>
              <h1>Not Found</h1>
              <p>您所請求的網址資源無效，該資源可能已移除或暫時無法使用。請於稍後重新嘗試，或點此 <Link to="/"> 回首頁</Link></p>
              <StyledLink to="/">回首頁</StyledLink>
              <ImageWrapper> <BrokenLink /></ImageWrapper>
            </Message>
          </Grid>
        </Grid>
      </StyledContainer>
    </Layout.PageLayout>
  );
};
