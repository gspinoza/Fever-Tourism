import React, { useState, useEffect } from 'react'
import './Result.css'
import { string } from '../SearchBar/SearchBar'
import Search from 'antd/lib/transfer/search'



function Result (props) {

  const { SearchResult, SearchRadius } = props

  const [objects, setObjects] = useState([])
  const [placeinfo, setPlaceinfo] = useState([])

  useEffect(() => {

    // Initialze the result
    function dataInit () {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + SearchRadius + "/1000", requestOptions)
        .then(response => response.json())
        .then(result => {
          //console.log(result)
          //console.log(1)
          // Initialize with highest rate
          var object = []
          result.map(item => {
            if (item.rate >= 7) {
              object.push(item)
            }
          })
          setObjects(object)
        })
        .catch(error => console.log('error', error))

      /*
    console.log(objects)
    for (let i = 0; i < objects.length; i++) {
      placedata(objects[i].id)
    }
    console.log(placeinfo)
    */
    }

    // Get the search result
    function dataSearch () {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + SearchRadius + "/1000", requestOptions)
        .then(response => response.json())
        .then(result => {
          var object = []
          //console.log(2)
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

    /*
    function placedata (place_id) {
      var object = []
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch(`http://localhost:4000/nyc/place/details/${place_id}`, requestOptions)
        .then(response => response.json())
        .then(result => object.push(result)
        )
        .catch(error => console.log('error', error))

      setPlaceinfo(object)
    }
    */
    if (SearchResult === undefined || SearchResult === '') {
      //console.log(SearchResult)
      dataInit()
    }
    else {
      //console.log(SearchResult)
      dataSearch()
    }

  }, [SearchResult, SearchRadius])

  return (
    <div className='Result'>
      <ul>
        {objects.map(item =>
          <li key={item.id}>
            <div>{item.name}</div>
            <div>Address:{item.address}</div>
            <div>Rating:{item.rate}</div>
          </li>
        )}
      </ul>
    </div>
  )
}
export default Result

