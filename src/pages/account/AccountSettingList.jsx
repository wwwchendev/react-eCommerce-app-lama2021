import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
//utility
import { StyledLink } from '@/components/common';

const Container = styled.div`
/* border: 1px solid blue; */
  width: 100%;
  position: sticky;
  top: 100px; 
  a{
    display: block;
    text-decoration: none;
    &:hover{
      color: #8f2d14;
    }
  }
`;

const Section = styled.section`
  /* border: 1px solid red; */
  margin-bottom: 1rem;
`

const Title = styled.p`
  font-weight: bold;
  line-height: 2;
  font-size: 16px;
  margin-bottom:${p => p.$mb ? p.$mb : '4px'};
`;

const List = styled.ul`
  /* border: 1px solid red;  */
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem ;
  gap: 8px;
`
const ListItem = styled.li`
text-indent: 0.5rem;
position: relative;
`
const SidebarLink = styled(StyledLink)`
color: ${p => p.$active ? "#8f2d14" : "#333"};
font-weight: ${p => p.$active ? "bold" : "normal"};
    &:hover{
  color: #8f2d14;
}
`

const AccountSettingList = () => {
  const location = useLocation();
  const stickyElementRef = useRef(null);


  return (
    <Container ref={stickyElementRef}>

      <Section>
        <Title>會員功能選單</Title>
        <List>
          <ListItem $active={location.pathname.includes("/orders")}>
            <SidebarLink
              to={`/orders`}
              $active={location.pathname.includes("/orders")}>
              訂單紀錄
            </SidebarLink>
          </ListItem>
          <ListItem $active={location.pathname === "/account"}>
            <SidebarLink
              to={`/account`}
              $active={location.pathname === "/account"}>
              修改會員資料
            </SidebarLink>
          </ListItem>
          <ListItem $active={location.pathname === "/updatePassword"}>
            <SidebarLink
              to={`/updatePassword`}
              $active={location.pathname === "/updatePassword"}>
              變更密碼
            </SidebarLink>
          </ListItem>
          <ListItem $active={location.pathname === "/likedProducts"}>
            <SidebarLink
              to={`/likedProducts`}
              $active={location.pathname === "/likedProducts"}>
              收藏清單
            </SidebarLink>
          </ListItem>
        </List>
      </Section>

    </Container>
  )
}

export default AccountSettingList