import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//components
import styled, { keyframes } from 'styled-components'
import Icon from '@/components/icon'
import { md, sm } from '@/components/layout/responsive';
import { Container } from '@material-ui/core';

const StyledContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-items: center;
  gap: 16px;

${sm({
  gridTemplateColumns: 'repeat(4, 1fr)'
})} 
`;
const CircleBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* background: #333; */
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(60deg);
  box-shadow: 0px 0px 2px rgba(0,0,0,0.5);
`;
const Item = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  a {
    text-decoration: none;
    color: #000;
  }
  &:hover{ 
    a {
    color: #d31414;
    font-weight: 800;
    }
    ${CircleBackground} {
      &:before,&:after{display: block}
      box-shadow: 0px 0px 20px rgba(241, 175, 175, 0.5);
    }
    svg{      
      transform:scale(1.2) ;
    }
  }
`;

const CircleWrapper = styled.div`
  width:6rem;
  height:6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  ${md({ width: '5rem', height: '5rem' })}
`;
const CircleInner = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  svg {
    /* border: 1px solid red; */
    height: 5rem;
    width: 5rem;
    transition: scale 1000ms ease-in-out;
  ${md({ width: '4rem', height: '4rem' })}
  }
`;

const ProductCategories = () => {
  const navigate = useNavigate();
  const list = [
    {
      title: '全部',
      icon: <Icon.All />,
      linkUrl: '/products'
    },
    {
      title: '上衣',
      icon: <Icon.Clothes />,
      linkUrl: '/products?category=上衣'
    },
    {
      title: '外套',
      icon: <Icon.Coat />,
      linkUrl: '/products?category=外套'
    },
    {
      title: '褲子',
      icon: <Icon.Shorts />,
      linkUrl: '/products?category=褲子'
    },
    {
      title: '裙子',
      icon: <Icon.Skirt />,
      linkUrl: '/products?category=裙子'
    },
    {
      title: '連身套裝',
      icon: <Icon.Suit />,
      linkUrl: '/products?category=連身套裝'
    },
    {
      title: '包包',
      icon: <Icon.Accessories />,
      linkUrl: '/products?category=包包'
    },
    {
      title: '配件',
      icon: <Icon.Accessories />,
      linkUrl: '/products?category=配件'
    },
  ];

  return (
    <>
      <StyledContainer >
        {list.map((item, idx) => {
          return (
            <Item key={idx}>
              <CircleWrapper onClick={() => { navigate(`${item.linkUrl}`) }}>
                <CircleBackground />
                <CircleInner>
                  {item.icon}
                </CircleInner>
              </CircleWrapper>
              <Link to={item.linkUrl}>{item.title}</Link>
            </Item>
          );
        })}
        {/* Vectors and icons by <a href="https://dribbble.com/Chanut-is-Industries?ref=svgrepo.com" target="_blank">Chanut Is Industries</a> in CC Attribution License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a> */}
      </StyledContainer >
    </>
  );
};

export default ProductCategories;
