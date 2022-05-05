import React from 'react'
import './Planner.css'
import { List } from 'antd'
import { useState, useEffect } from 'react'


const plan = [
  {
    place: 'place1',
    address: 'address1',
    openhour: 'open hr1'
  },
  {
    place: 'place2',
    address: 'address2',
    openhour: 'open hr2'
  },
  {
    place: 'place3',
    address: 'address4',
    openhour: 'open hr3'
  },
  {
    place: 'place4',
    address: 'address4',
    openhour: 'open hr4'
  },
]




function Planner () {

  const [data, setData] = useState([])

  /* !!! Used for test !!!
  useEffect(() => {
    function data1 (radius) {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + radius + "/3", requestOptions)
        .then(response => response.json())
        .then(result => setData(result)) // return
        .catch(error => console.log('error', error))
    }
    data1(1000)
    console.log(data)
  }, [])
  */

  return (
    <div className="Planner">

      <List
        size="large"
        bordered
        dataSource={plan}
        renderItem={item =>
          <List.Item>
            <div>{item.place}</div>
            <div>{item.address}</div>
            <div>{item.openhour}</div></List.Item>}
      />

    </div>
  )
}
export default Planner