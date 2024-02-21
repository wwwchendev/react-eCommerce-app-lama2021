import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
} from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { shopInfo } from '@/data'

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`

/* 左:網站介紹 */
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Logo = styled.h1``
const Desc = styled.p`
  margin: 20px 0px;
`
const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  & img {
    width: 25px;
  }
`

/* 中:網站導覽 */
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: 'none' })}
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  & a {
    text-decoration: none;
  }
`

/* 右:聯絡我們 */
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: '#fff8f8' })}
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  & a {
    text-decoration: none;
    color: #000;
  }
`
const PaymentContainer = styled.div`
display: flex;
  width: 50%;
`
const PaymentItem = styled.img`
max-height: 40px;
margin-right: 5px;
`

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>{shopInfo.shopTWName}</Logo>
        <Desc>{shopInfo.desc}</Desc>
        <SocialContainer>
          <SocialIcon
            color='3B5999'
            href='https://facebook.com/'
            target='_blank'
            rel='noreferrer'
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'
            href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer'>
            <Instagram />
          </SocialIcon>
          <SocialIcon
            color='4CC764'
            href='https://line.me/tw/'
            target='_blank'
            rel='noreferrer'
          >
            <img src='./images/icons/social-media/line.svg' alt="line-icon" />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>網站導覽</Title>
        <List>
          <ListItem>
            <a href=''>首頁</a>
          </ListItem>
          <ListItem>
            <a href=''>購物車</a>
          </ListItem>
          <ListItem>
            <a href=''>我的帳戶</a>
          </ListItem>
          <ListItem>
            <a href=''>訂單查詢</a>
          </ListItem>
          <ListItem>
            <a href=''>許願清單</a>
          </ListItem>
          <ListItem>
            <a href=''>網站條款</a>
          </ListItem>
          <ListItem>
            <a href=''>常見問答</a>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>聯絡我們</Title>
        <ContactItem>
          <Room style={{ marginRight: '10px' }} />
          <a
            href={`https://www.google.com/maps/?q=${shopInfo.address}`}
            target='_blank'
            rel='noreferrer'
          >
            {shopInfo.address}
          </a>
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '10px' }} />
          <a href={`tel:+886-${shopInfo.tel}`}>{shopInfo.tel}</a>
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '10px' }} />
          <a href={`mailto:${shopInfo.mail}`}>{shopInfo.mail}</a>
        </ContactItem>
        <PaymentContainer>
          <PaymentItem src='./images/icons/payment/master.svg' />
          <PaymentItem src='./images/icons/payment/visa.svg' />
          <PaymentItem src='./images/icons/payment/jcb.svg' />
          <PaymentItem src='./images/icons/payment/linepay.svg' />
        </PaymentContainer>
      </Right>
    </Container>
  )
}
