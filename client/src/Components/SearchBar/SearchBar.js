
import React, { useState } from 'react'
import './SearchBar.css'
import { Input } from 'antd'
import { getInstance } from 'antd/lib/notification'


const { Search } = Input

export var string

function SearchBar (props) {
  const { getSearchValue } = props

  const [searchValue, setSearchValue] = useState()


  return (
    <div className='SearchBar'>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={getSearchValue(searchValue)}
      />
    </div>
  )
}
export default SearchBar