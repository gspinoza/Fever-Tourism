import './App.css'
import React, { useState, useEffect } from "react"
import Header from "./Components/Header/Header"
import SearchBar from './Components/SearchBar/SearchBar'
import ListFilter from "./Components/ListFilter/ListFilter"
import Result from './Components/Result/Result'
import Map from "./Components/Map/Map"
import Planner from "./Components/Planner/Planner"


function App () {
  const [searchInput, setSearchInput] = useState('')
  const [radius, setRadius] = useState(1000)
  const [data, setData] = useState([])

  function getSearchValue (searchValue) {
    setSearchInput(searchValue)
  }

  function getRadius (searchRadius) {
    setRadius(searchRadius)
  }

  useEffect(() => {

    // Initialze the result
    function dataInit () {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + radius + "/1000/-74.0059/40.71427", requestOptions)
        .then(response => response.json())
        .then(result => {
          //console.log(result)
          console.log(1)
          // Initialize with highest rate
          var object = []
          result.map(item => {
            if (item.rate >= 7) {
              //placedata(item.id)
              object.push(item)
              //console.log(item)
            }
          })
          setData(object)
        })
        .catch(error => console.log('error', error))

    }

    // Get the search result
    function dataSearch () {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + radius + "/1000/-74.0059/40.71427", requestOptions)
        .then(response => response.json())
        .then(result => {
          var object = []
          console.log(2)
          result.map(item => {
            // add objects that contains SearchValue into list
            if (item.name.includes(searchInput)) {
              object.push(item)
            }
          })
          // replace the objects with search result
          setData(object)
        })
        .catch(error => console.log('error', error))
    }



    if (searchInput === undefined || searchInput === '') {
      console.log(searchInput)
      dataInit()
    }
    else {
      console.log(searchInput)
      console.log(1111)
      dataSearch()
    }

  }, [searchInput, radius])

  return (
    <div className="App">
      <Header />
      <SearchBar getSearchValue={getSearchValue} />
      <ListFilter getRadius={getRadius} />
      <Result passData={data} />
      <Map passData={data} />
    </div>
  )
}

export default App
