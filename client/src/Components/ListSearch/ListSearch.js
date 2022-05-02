import React from 'react'
import './ListSearch.css'
import { List, Checkbox, Input } from 'antd'
import 'antd/dist/antd.css'

const { Search } = Input

const onSearch = value => console.log(value)

const PlaceType = [
  'Museum',
  'Park',
  '....',
]

function ListSearch () {

  function filter (e, placeType) {
    console.log(placeType)
    console.log(e.target.checked)

    /* 
    if e.target.checked == true{
      add to map
    }
    else{
      remove from map
    } 

    */
  }

  return (
    <div className="List">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <List
        size="large"
        bordered
        dataSource={PlaceType}
        renderItem={item =>
          <List.Item><Checkbox onChange={(e) => filter(e, item)}>{item}</Checkbox></List.Item>}
      />

    </div>
  )
}
export default ListSearch