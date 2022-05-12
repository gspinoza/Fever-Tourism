
import React, { useState } from 'react'
import './SearchBar.css'
import { Input } from 'antd'


const { Search } = Input

export var string

function SearchBar (props) {
  const { getSearchValue, getSearchZipCode, showPlanner } = props

  const [searchValue, setSearchValue] = useState()
  const [searchZipCode, setSearchZipCode] = useState()

  function search () {
    getSearchValue(searchValue)
  }
  function ZipCodeSearch () {
    getSearchZipCode(searchZipCode)
  }

  function openPlanner () {
    showPlanner(true)
  }

  return (
    <div className='SearchBar'>
      <div className='SearchBar-Name'>
        <Search
          placeholder="Search by Place"
          allowClear
          enterButton="Search"
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={search}
        />
      </div>
      <div className='SearchBar-ZipCode'>
        <Search
          placeholder="Search by ZipCode"
          allowClear
          enterButton="Search"
          size="large"
          value={searchZipCode}
          onChange={(e) => setSearchZipCode(e.target.value)}
          onSearch={ZipCodeSearch}
        />
      </div>
      <button className='ViewPlanner' onClick={openPlanner} role="button"><span>View Planner</span></button>
    </div>
  )
}
export default SearchBar