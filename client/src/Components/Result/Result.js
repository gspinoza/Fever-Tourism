import React, { useState, useEffect } from 'react'
import './Result.css'
import { string } from '../SearchBar/SearchBar'
import Search from 'antd/lib/transfer/search'



function Result (props) {

  const { passData } = props

  const [objects, setObjects] = useState([])
  const [placeinfo, setPlaceinfo] = useState([])

  /*
  useEffect(() => {
    function placedata (place_id) {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch(`http://localhost:4000/nyc/place/details/${place_id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(3)
          console.log(result)
          setPlaceinfo([...placeinfo, result])
        }
        )
        .catch(error => console.log('error', error))
    }

    for (let i = 0; i < passData.length; i++) {
      placedata(passData[i].id)
    }

  }, [passData])
  */

  return (
    <div className='Result'>
      <ul>
        {passData.map(item =>
          <li key={item.id}>
            <h3>{item.name}</h3>
            <div>url:{item.url}</div>
            <div>Rating:{item.rate}</div>
          </li>
        )}
      </ul>
    </div>
  )
}
export default Result

