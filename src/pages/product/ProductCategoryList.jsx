import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams, useLocation } from 'react-router-dom'
import Icon from '@/components/icon'
const { ArrowDown, Plus, Minus } = Icon
import { IconButton, Search } from '@/components/common'
//utility

const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 110px;
  a {
    display: block;
    text-decoration: none;
    &:hover {
      color: #8f2d14;
    }
  }
`

const Section = styled.section`
  margin-bottom: 1rem;
`

const Title = styled.p`
  font-weight: bold;
  line-height: 2;
  font-size: 16px;
  margin-bottom: ${p => (p.$mb ? p.$mb : '4px')};
  color: #1a0f0f;
  a {
    color: #1a0f0f;
  }
`

const List = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ListItem = styled.li`
  position: relative;
  padding: 0.25rem 1rem;
  white-space: nowrap;
  letter-spacing: 1px;
  a {
    color: #271818;
  }
`

const SubList = styled.ul`
  padding-left: 0rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: ${p => (p.$open ? '100%' : '0')};
  opacity: ${p => (p.$open ? '1' : '0')};
  li {
    letter-spacing: 2px;
    a {
      color: ${p => (p.$active ? '#8f2d14' : '#666666')};
    }
  }
`

const StyledLink = styled(Link)`
  color: ${p => (p.$active ? '#8f2d14' : '')};
  font-weight: ${p => (p.$active ? 'bold' : '')};
  &:hover {
    color: #8f2d14;
  }
`
const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ProductCategoryList = ({ categoryName }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const query = new URLSearchParams(useLocation().search)
  const category = query.get('category')
  const subCategory = query.get('subCategory')
  const search = query.get('search')
  const release = query.get('release')

  const [showDropdown, setShowDropdown] = useState({
    '上衣': false,
    '褲子': false,
    '裙子': false,
    '連身套裝': false,
    '配件': false,
    '外套': false,
    '包包': false,
  })
  const categoryList = [
    {
      'category': '上衣',
      'subCategory': ['無袖', '長袖', '短袖'],
    },
    {
      'category': '外套',
      'subCategory': ['皮衣', '西裝外套', '連帽外套', '針織外套'],
    },
    {
      'category': '褲子',
      'subCategory': ['長褲', '短褲'],
    },
    {
      'category': '裙子',
      'subCategory': ['長裙', '短裙'],
    },
    {
      'category': '連身套裝',
      'subCategory': ['連衣裙', '成套組合'],
    },
    {
      'category': '包包',
      'subCategory': ['肩背包', '後背包'],
    },
    {
      'category': '配件',
      'subCategory': ['襪子', '披肩圍巾'],
    },
  ]

  if (loading) return null
  if (error) return <p>載入時發生錯誤</p>

  const categoryByType = data.filter(item => item.type === '依類別')
  const categoryByPopular = data.filter(
    item => item.type === '依群組' && item.categoryName === '熱銷推薦',
  )
  // console.log(categoryByType );

  return (
    <Container>
      <Section>
        <Search />
      </Section>
      <Section>
        <Title $mb='1rem'>
          <StyledLink
            to={`/products`}
            $active={!category && !search && !release && !categoryName}
          >
            全部商品
          </StyledLink>
        </Title>
        <Title $mb='1rem'>
          <StyledLink
            to={`/products?category=熱銷推薦`}
            $active={category === '熱銷推薦'}
          >
            熱銷推薦
          </StyledLink>
        </Title>
      </Section>
      <Section>
        <Title>新品上架</Title>
        <List>
          <ListItem $active={release === '202406'}>
            <StyledLink
              to={`/products?release=20240609`}
              $active={release === '20240609'}
            >
              20240609
            </StyledLink>
          </ListItem>
          <ListItem $active={release === '20240523'}>
            <StyledLink
              to={`/products?release=20240523`}
              $active={release === '20240523'}
            >
              20240523
            </StyledLink>
          </ListItem>
        </List>
      </Section>
      <Section>
        <Title>
          <StyledLink to={`/products`}>商品分類</StyledLink>
        </Title>

        <List>
          {categoryList.map((group, index) => {
            const Icon = showDropdown[group.category] ? Minus : Plus
            return (
              <ListItem $active={category === group.category} key={index}>
                <CategoryWrapper>
                  <StyledLink
                    to={`/products?category=${group.category}`}
                    $active={
                      category === group.category ||
                      categoryName === group.category
                    }
                  >
                    {group.category}
                  </StyledLink>
                  <IconButton
                    icon={Icon}
                    $size='1rem'
                    onClick={() => {
                      setShowDropdown(prev => {
                        return { [group.category]: !prev[group.category] }
                      })
                    }}
                  />
                </CategoryWrapper>
                {group.subCategory.map((sub, subIndex) => {
                  return (
                    <SubList
                      $open={showDropdown[group.category]}
                      key={subIndex}
                      $active={subCategory === sub}
                    >
                      <ListItem $active={subCategory === sub}>
                        <StyledLink
                          to={`/products?category=${group.category}&subCategory=${sub}`}
                          $active={subCategory === sub}
                        >
                          {sub}
                        </StyledLink>
                      </ListItem>
                    </SubList>
                  )
                })}
              </ListItem>
            )
          })}
        </List>
      </Section>
    </Container>
  )
}

export default ProductCategoryList
