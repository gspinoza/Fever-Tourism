import React, { useState } from 'react'
import './ListFilter.css'
import { List, Checkbox, Radio, Space } from 'antd'


const PlaceType = [

  'Museum',
  'Park',
  'Entertainment',
  'Natural',
  'Cultural',
  'Historical',
  'Sculpture',
  'Monument',
]

const Crime = [
  'Felony',
  'Misdemeanor',
  'Violation'
]


function ListFilter (props) {

  const { getRadius, currentFilter, getSearchFilter, getCrimeFilter, crimeFilter } = props

  const [radius, setRadius] = useState(1000)

  const [checkList, setCheckList] = useState([])     // state to show check

  const [crimeTypeList, setCrimeTypeList] = useState([])  // state to show check
  function filterType (e) {

    var temp = currentFilter
    var tag
    var check = checkList

    if (e.target.value === 'Natural') {
      tag = 'natural'
    } else if (e.target.value === 'Historical') {
      tag = 'historic'
    } else if (e.target.value === 'Cultural') {
      tag = 'cultural'
    } else if (e.target.value === 'Entertainment') {
      tag = 'theatres_and_entertainments'
    } else if (e.target.value === 'Sculpture') {
      tag = 'sculptures'
    } else if (e.target.value === 'Monument') {
      tag = 'monuments'
    } else {
      tag = e.target.value
    }

    if (e.target.checked) {
      // add to filter
      temp.push(tag)
      temp = currentFilter.filter(item => item != '')
      // add to checkList
      check.push(e.target.value)
    }
    else {
      //remove from filter
      temp = currentFilter.filter(item => item != tag)
      //remove from checkList
      check = checkList.filter(item => item != e.target.value)

    }
    setCheckList(check)
    getSearchFilter(temp)
  }

  function checkAllType (e) {
    const temp = ['natural', 'historic', 'cultural', 'theatres_and_entertainments', 'sculptures', 'monuments', 'Park', 'Museum']
    setCheckList(e.target.checked ? PlaceType : [])
    getSearchFilter(e.target.checked ? temp : [])
  }

  function checkAllCrimeType (e) {
    const temp = ['FELONY', 'MISDEMEANOR', 'VIOLATION']
    setCrimeTypeList(e.target.checked ? Crime : [])
    getCrimeFilter(e.target.checked ? temp : [])
  }


  function filterCrimeType (e) {

    var tempCrimeFilter = crimeFilter
    var tag
    var tempCrimeType = crimeTypeList
    if (e.target.value === 'Felony') {
      tag = 'FELONY'
    } else if (e.target.value === 'Misdemeanor') {
      tag = 'MISDEMEANOR'
    } else if (e.target.value === 'Violation') {
      tag = 'VIOLATION'
    } else {
      tag = e.target.value
    }

    if (e.target.checked) {
      // add to filter
      tempCrimeFilter.push(tag)
      tempCrimeFilter = crimeFilter.filter(item => item != '')
      // add to checkList
      tempCrimeType.push(e.target.value)
    }
    else {
      //remove from filter
      tempCrimeFilter = crimeFilter.filter(item => item != tag)
      //remove from checkList
      tempCrimeType = crimeTypeList.filter(item => item != e.target.value)

    }
    setCrimeTypeList(tempCrimeType)
    getCrimeFilter(tempCrimeFilter)

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
          <List.Item><Checkbox checked={checkList.includes(item) ? true : false} value={item} onChange={filterType}>{item}</Checkbox></List.Item>}
      /><br />
      Crime
      <Checkbox className='list-all' onChange={checkAllCrimeType}>Check All</Checkbox><br />
      <List
        size="large"
        bordered
        dataSource={Crime}
        renderItem={item =>
          <List.Item><Checkbox checked={crimeTypeList.includes(item) ? true : false} value={item} onChange={filterCrimeType}>{item}</Checkbox></List.Item>}
      /><br />
      Radius
      <div className='list-radiu'>
        <Radio.Group onChange={searchRadius} value={radius}>
          <Space direction="vertical">
            <Radio value={1000}>1km</Radio>
            <Radio value={2000}>3km</Radio>
            <Radio value={5000}>5km</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}
export default ListFilter