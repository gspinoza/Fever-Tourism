import React from 'react'
import './Result.css'


const object = [
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

function Result () {
  return (
    <div className='Result'>
      <ul>
        {object.map(item =>
          <li>
            <div>{item.place}</div>
            <div>{item.address}</div>
            <div>{item.openhour}</div>
          </li>
        )}
      </ul>


    </div>
  )
}
export default Result

