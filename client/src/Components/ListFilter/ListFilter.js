import React, { useState } from 'react'
import './ListFilter.css'
import { List, Checkbox } from 'antd'
import 'antd/dist/antd.css'


const PlaceType = [
  'Museum',
  'Park',
  'Natural',
  'Cultural',
  'Historical',
  '....',
]

const Feature = [
  'Crime',
  'Weather',
  '.....',
]

function ListFilter () {


  function filterType (e, placeType) {
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

  function filterFeature (e, feature) {
    console.log(feature)
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
  function checkAllType (e) {
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
  function checkAllFeature (e) {
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
    <div className="ListFilter">
      Catetories
      <Checkbox className='list-all' onChange={checkAllType}>Check All</Checkbox><br />
      <List
        size="large"
        bordered
        dataSource={PlaceType}
        renderItem={item =>
          <List.Item><Checkbox onChange={(e) => filterType(e, item)}>{item}</Checkbox></List.Item>}
      /><br />
      Features
      <Checkbox className='list-all' onChange={checkAllFeature}>Check All</Checkbox><br />
      <List
        size="large"
        bordered
        dataSource={Feature}
        renderItem={item =>
          <List.Item><Checkbox onChange={(e) => filterFeature(e, item)}>{item}</Checkbox></List.Item>}
      />

    </div>
  )
}
export default ListFilter