import React, { useState, useEffect } from 'react'
import './Result.css'
import { string } from '../SearchBar/SearchBar'
import Search from 'antd/lib/transfer/search'


const objectArray = [
  {
    id: 1,
    name: "place1",
    address: "address1",
    rate: 2
  },
  {
    id: 2,
    name: "place1",
    address: "address1",
    rate: 2
  }
]

function Result (props) {

  const { SearchResult } = props

  const [objects, setObjects] = useState(objectArray)

  useEffect(() => {

    // Initialze the result
    function dataInit (radius) {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + radius + "/1000", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          // Initialize with highest rate
        })
        .catch(error => console.log('error', error))
    }

    // Get the search result
    function dataSearch (radius) {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + radius + "/1000", requestOptions)
        .then(response => response.json())
        .then(result => {
          var object = []
          result.map(item => {
            // add objects that contains SearchValue into list
            if (item.name.includes(SearchResult)) {
              object.push(item)
            }
          })
          // replace the objects with search result
          setObjects(object)
        })
        .catch(error => console.log('error', error))
    }

    if (SearchResult === '') {
      dataInit(1000)
    }
    else {
      dataSearch(1000)
    }

  }, [SearchResult])

  return (
    <div className='Result'>
      <ul>
        {objects.map(item =>
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.address}</div>
            <div>{item.rate}</div>
          </li>
        )}
      </ul>
    </div>
  )
}
export default Result

