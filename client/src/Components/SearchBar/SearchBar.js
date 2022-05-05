
import React, { useState } from 'react'
import './SearchBar.css'
import { Input } from 'antd'


const { Search } = Input

const onSearch = value => console.log(value)

function search (e) {
  console.log(e.target.value)
}


function SearchBar () {
  const [searchValue, setSearchValue] = useState()
  return (
    <div className='SearchBar'>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        value={searchValue}
        onChange={search}
        onSearch={onSearch}
      />
    </div>
  )
}
export default SearchBar