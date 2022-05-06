import React, { useState } from 'react'
import './ListFilter.css'
import { List, Checkbox, Radio, Space } from 'antd'
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



function ListFilter (props) {

  const { getRadius } = props

  const [radius, setRadius] = useState(1000)

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

  function filterRadius (e, feature) {
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
  function searchRadius (e) {
    setRadius(e.target.value)
    getRadius(e.target.value)
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
      /><br />
      Radius
      <div className='list-radiu'>
        <Radio.Group onChange={searchRadius} value={radius}>
          <Space direction="vertical">
            <Radio value={1000}>1km</Radio>
            <Radio value={5000}>5km</Radio>
            <Radio value={10000}>10km</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}
export default ListFilter