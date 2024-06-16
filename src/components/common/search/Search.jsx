/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//components
import styled from 'styled-components'
import { IconButton } from '@/components/common'
import { md, sm } from '@/components/layout/responsive'
import Icon from '@/components/icon'
const { Heart, Cart1, People, Search: SearchIcon } = Icon

const SearchContainer = styled.form`
  align-self: flex-end;
  border: 1px solid #333;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 5px;

  input {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    ${md({ width: '100%' })}
  }
  ${sm({ display: 'none' })}
`

export const Search = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (searchTerm !== '') {
      navigate(`/products?search=${searchTerm}`)
      setSearchTerm('')
    }
  }
  return (
    <SearchContainer onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='搜尋商品..'
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value)
        }}
      />
      <IconButton type='submit' icon={SearchIcon} onClick={handleSubmit} />
    </SearchContainer>
  )
}
