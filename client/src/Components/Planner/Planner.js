import React from 'react'
import './Planner.css'
import { List } from 'antd'




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
  return (
    <div class="Planner">
      Planner
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