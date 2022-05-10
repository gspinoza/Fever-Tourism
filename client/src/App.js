import './App.css'
import React, { useState, useEffect } from "react"
import Header from "./Components/Header/Header"
import SearchBar from './Components/SearchBar/SearchBar'
import ListFilter from "./Components/ListFilter/ListFilter"
import Result from './Components/Result/Result'
import Map from "./Components/Map/Map"
import axios from "axios"
import 'antd/dist/antd.css'

const defaultZipCode = 10015
function App () {
  const [searchInput, setSearchInput] = useState('')
  const [searchFilter, setSearchFilter] = useState([''])
  const [radius, setRadius] = useState(1000)
  const [data, setData] = useState([])
  const [ZipCode, setZipCode] = useState(defaultZipCode)
  const [lng, setLng] = useState(-73.98888545)
  const [lat, setLat] = useState(40.74743397)



  function getSearchValue (searchValue) {
    setSearchInput(searchValue)
  }

  function getRadius (searchRadius) {
    setRadius(searchRadius)
  }

  function getSearchFilter (placeType) {
    console.log(placeType)
    setSearchFilter(placeType)
  }

  function getSearchZipCode (ZipCode) {
    console.log(ZipCode)
    setZipCode(ZipCode)
  }

  function setLngLat (lng, lat) {
    setLng(lng)
    setLat(lat)
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

    setLngLat(ZipResult.lon, ZipResult.lat)

    //var requestOptions = { method: 'GET', redirect: 'follow' }
    await axios(`http://localhost:4000/axios/nyc/places/${radius}/500/${ZipResult.lon}/${ZipResult.lat}`)
      .then(response => response.data)

      .then(result => {
        console.log(result)
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

    setLngLat(ZipResult.lon, ZipResult.lat)
    console.log(ZipResult)

    //var requestOptions = { method: 'GET', redirect: 'follow' }
    await axios(`http://localhost:4000/axios/nyc/places/${radius}/1000/${ZipResult.lon}/${ZipResult.lat}`)
      .then(response => response.data)
      .then(function (result) {
        console.log(result)
        var object = []
        result.map(item => {
          if (searchFilter[0] == '' || searchFilter.length == 0) {
            if (searchInput != '') {
              // add objects that contains SearchValue into list
              if (item.name.includes(searchInput)) {
                object.push(uppercase(item))
              }
            } else {
              if (item.rate >= 7) {
                object.push(uppercase(item))
              }
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

        if (object.length === 0) {
          //console.log('123')
          setData(['no result'])
        }
        else {
          // replace the objects with search result
          //console.log('321')
          setData(object)
        }

      })
      .catch(error => console.log('error', error))

  }


  /*
  useEffect(() => {
    dataInit()

  }, [])
  */


  useEffect(() => {
    if (ZipCode === undefined || ZipCode === '') {
      setZipCode(defaultZipCode)
    }

    if (searchInput === undefined) {
      setSearchInput('')
    }
    console.log(searchInput)
    console.log(ZipCode)
    if (searchInput === '' && ZipCode === defaultZipCode) {
      console.log("0000")
      dataInit()
    }
    else {
      console.log(1111)
      dataSearch()
    }
  }, [searchInput, searchFilter, radius, ZipCode])





  return (
    <div className="App">
      <Header />
      <SearchBar getSearchValue={getSearchValue} getSearchZipCode={getSearchZipCode} />
      <Map passData={data} passLng={lng} passLat={lat} />
      <Result passData={data} />
      <ListFilter getRadius={getRadius} currentFilter={searchFilter} getSearchFilter={getSearchFilter} />
    </div>
  )
}

export default App