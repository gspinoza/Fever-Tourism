import './App.css'
import React, { useState, useEffect } from "react"
import Header from "./Components/Header/Header"
import SearchBar from './Components/SearchBar/SearchBar'
import ListFilter from "./Components/ListFilter/ListFilter"
import Result from './Components/Result/Result'
import Map from "./Components/Map/Map"
import axios from "axios"
import 'antd/dist/antd.css'


function App () {
  const [searchInput, setSearchInput] = useState('')
  const [searchFilter, setSearchFilter] = useState([''])
  const [radius, setRadius] = useState(1000)
  const [data, setData] = useState([])
  const [ZipCode, setZipCode] = useState(10013)



  function getSearchValue (searchValue) {
    setSearchInput(searchValue)
  }

  function getRadius (searchRadius) {
    setRadius(searchRadius)
  }

  function getSearchFilter (placeType) {
    setSearchFilter(placeType)
  }

  function getSearchZipCode (ZipCode) {
    setZipCode(ZipCode)
  }

  // Make categories uppercase
  function uppercase (item) {
    for (let i = 0; i < item.category.length; i++) {
      item.category[i] = item.category[i].charAt(0).toUpperCase() + item.category[i].slice(1)
    }
    return item

  }
  // Initialze the result
  async function dataInit () {

    const ZipResult = await fetch(`http://localhost:4000/geocode/${ZipCode}`)
      .then(response => response.json())
      .catch(error => console.log('error', error))


    //var requestOptions = { method: 'GET', redirect: 'follow' }
    await axios(`http://localhost:4000/axios/nyc/places/${radius}/500/${ZipResult.lon}/${ZipResult.lat}`)
      .then(response => response.data)

      .then(result => {
        // Initialize with highest rate
        var object = []
        result.map(item => {
          if (searchFilter[0] == '' || searchFilter.length == 0) {
            if (item.rate >= 7) {
              object.push(uppercase(item))
            }
          }
          else {
            for (let i = 0; i < searchFilter.length; i++) {
              if (item.name.includes(searchFilter[i])) {
                object.push(uppercase(item))
                break
              }
              else {
                if (item.category.includes(searchFilter[i])) {
                  object.push(uppercase(item))
                  console.log('find')
                  break
                }
              }
            }
          }
        })
        setData(object)
      })
      .catch(error => console.log('error', error))


  }


  // Get the search result
  async function dataSearch () {
    const ZipResult = await fetch(`http://localhost:4000/geocode/${ZipCode}`)
      .then(response => response.json())
      .catch(error => console.log('error', error))

    console.log(ZipResult)
    //var requestOptions = { method: 'GET', redirect: 'follow' }
    await axios(`http://localhost:4000/axios/nyc/places/${radius}/1000/${ZipResult.lon}/${ZipResult.lat}`)
      .then(response => response.data)
      .then(function (result) {
        var object = []
        result.map(item => {
          // add objects that contains SearchValue into list
          if (item.name.includes(searchInput)) {
            object.push(uppercase(item))
          }
        })
        // replace the objects with search result
        setData(object)
      })
      .catch(error => console.log('error', error))
  }


  /*
  useEffect(() => {
    dataInit()

  }, [])
  */


  useEffect(() => {
    if (searchInput === undefined || searchInput === '') {
      console.log(searchInput)
      console.log("0000")
      dataInit()
    }
    else {
      console.log(searchInput)
      console.log(1111)
      dataSearch()
    }
  }, [searchInput, searchFilter, radius])





  return (
    <div className="App">
      <Header />
      <SearchBar getSearchValue={getSearchValue} getSearchZipCode={getSearchZipCode} />
      <Map passData={data} />
      <Result passData={data} />
      <ListFilter getRadius={getRadius} currentFilter={searchFilter} getSearchFilter={getSearchFilter} />
    </div>
  )
}

export default App