import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { shopInfo } from '@/utils/data'
import Icon from '@/components/icon'
import { Button, IconButton } from '@/components/common';
const { LINE, Instagram, Youtube, FB } = Icon
import { Container as MuiContainer, Grid } from '@material-ui/core';
import { xs, sm, md, lg, xl } from '@/components/layout/responsive';

const Wrapper = styled.div`
  background-color: #f4f4f4;
`
const StyledContainer = styled(MuiContainer)`
text-align: center;
padding: 1.5rem 0;

`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap:1rem;
`
const ListItem = styled.li`
  & a {
      color: #333;
    text-decoration: none;
    font-size: 16px;
    white-space: nowrap;
  }
`
const SocialMediaLinks = styled.ul`
padding: 0;
overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap:1rem;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
`
const Copyright = styled.p`
  letter-spacing:1px;
  font-size: 12px;
  color: #7a7a7a;
`
const StyledGrid = styled(Grid)`
  *{
    margin-bottom:4px;
  }
`;

export const Footer = () => {
  const hoverColor = "#861b1b"
  return (
    <Wrapper>
      <StyledContainer>
        <StyledGrid container direction="column" justifyContent="center" alignItems="center">
          <SocialMediaLinks>
            <IconButton icon={LINE} $size="26px" $hoverColor={hoverColor}
              onClick={() => { window.open('https://line.me/tw/', '_blank'); }} />
            <IconButton icon={Instagram} $size="26px" $hoverColor={hoverColor}
              onClick={() => { window.open('https://www.instagram.com/', '_blank'); }} />
            <IconButton icon={FB} $size="26px" $hoverColor={hoverColor}
              onClick={() => { window.open('https://www.facebook.com/', '_blank'); }} />
            <IconButton icon={Youtube} $size="26px" $hoverColor={hoverColor}
              onClick={() => { window.open('https://www.youtube.com/', '_blank'); }} />
          </SocialMediaLinks>
          <List>
            <ListItem><Link to="/news">最新消息</Link></ListItem>
            <ListItem><Link to="/about?type=brand">品牌介紹</Link></ListItem>
            <ListItem><Link to="/about?type=qa">購物說明</Link></ListItem>
            <ListItem><Link to="/about?type=afterSales">售後服務</Link></ListItem>
            <ListItem><Link to="/about?type=privatePolicy">隱私權保護</Link></ListItem>
          </List>
          <p>
            週一至週五 Mon-Fri  09:00-17:00  {` / `}
            <StyledLink href={`tel:+886 - ${shopInfo.tel} `}>{shopInfo.tel}</StyledLink>
          </p>
          <StyledLink href={`mailto: ${shopInfo.mail} `}> {shopInfo.mail} </StyledLink>
          < Copyright>Copyright © RE-START CO., Ltd. All rights reserved.</ Copyright>
        </StyledGrid>
      </StyledContainer>
    </Wrapper >
  )
}