import './App.css'
import React, { useState, useEffect } from "react"
import Header from "./Components/Header/Header"
import SearchBar from './Components/SearchBar/SearchBar'
import ListFilter from "./Components/ListFilter/ListFilter"
import Result from './Components/Result/Result'
import MapComponent from "./Components/Map/Map"
import Planner from "./Components/Planner/Planner"
import axios from "axios"
import 'antd/dist/antd.css'

const defaultZipCode = 10015
const defaultRadius = 1000
const defaultLng = -73.98888545
const defaultLat = 40.74743397

function App () {
  const [searchInput, setSearchInput] = useState('')
  const [searchFilter, setSearchFilter] = useState([''])
  const [radius, setRadius] = useState(defaultRadius)
  const [data, setData] = useState([])
  const [ZipCode, setZipCode] = useState(defaultZipCode)
  const [lng, setLng] = useState(defaultLng)
  const [lat, setLat] = useState(defaultLat)
  const [plannerVisible, setPlannerVisible] = useState(false)
  const [plannerList, setPlannerList] = useState([])
  const [resultPopup, setResultPopup] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(true)
  const [crimeData, setCrimeData] = useState([])

  function getDrawerVisible (drawStatus) {
    setDrawerVisible(drawStatus)
  }
  function getResultPopup (resultItem) {
    console.log(resultItem)
    setResultPopup(resultItem)
  }
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

  function addToPlanner (placeinfo) {
    setPlannerList(placeinfo)
    console.log(placeinfo)
  }

  function setLngLat (lng, lat) {
    setLng(lng)
    setLat(lat)
  }

  function plannerOpenClose (visible) {
    setPlannerVisible(visible)
  }

  // Make categories uppercase
  function uppercase (item) {
    for (let i = 0; i < item.category.length; i++) {
      item.category[i] = item.category[i].charAt(0).toUpperCase() + item.category[i].slice(1)
    }
    return item

  }
  // Use for initialized the result
  async function dataInit () {

    // Get the lng and lat by given zip code
    const ZipResult = await fetch(`http://localhost:4000/geocode/${ZipCode}`)
      .then(response => response.json())
      .catch(error => console.log('error', error))

    setLngLat(ZipResult.lon, ZipResult.lat)

    // Get the place result by given radius, lon, and lat
    await axios(`http://localhost:4000/axios/nyc/places/${radius}/500/${ZipResult.lon}/${ZipResult.lat}`)
      .then(response => response.data)

      .then(result => {
        // Initialize with highest rate
        var object = []
        result.map(item => {
          // In case the user did not check anything in category, will return place with highest rating
          if (searchFilter[0] == '' || searchFilter.length == 0) {
            if (item.rate >= 7) {
              object.push(uppercase(item))
            }
          }
          // Otherwise get the matched result
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


  // Use for search result
  async function dataSearch () {

    // Get the lng and lat by given zipcode
    const ZipResult = await fetch(`http://localhost:4000/geocode/${ZipCode}`)
      .then(response => response.json())
      .catch(error => console.log('error', error))

    setLngLat(ZipResult.lon, ZipResult.lat)
    console.log(ZipResult)

    // Get the place result by given radius, lon, and lat
    await axios(`http://localhost:4000/axios/nyc/places/${radius}/1000/${ZipResult.lon}/${ZipResult.lat}`)
      .then(response => response.data)
      .then(function (result) {
        // new array to store the matched result
        var object = []
        result.map(item => {
          // In case user did not filter the result (category)
          if (searchFilter[0] == '' || searchFilter.length == 0) {
            // If there is no input on place searchbar
            if (searchInput != '') {
              // add objects that contains SearchValue into list
              if (item.name.includes(searchInput)) {
                object.push(uppercase(item))
              }
            }
            // Other wise provide the place with highest rating
            else {
              if (item.rate >= 7) {
                object.push(uppercase(item))
              }
            }
          }
          // In case the user did filter the result
          else {
            // add the match result into the array
            for (let i = 0; i < searchFilter.length; i++) {
              // Check for name contains (park, museum)
              if (item.name.includes(searchFilter[i])) {
                object.push(uppercase(item))
                break
              }
              // Check for place category 
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

  async function crimeSearch () {

    // Get the lng and lat by given zipcode
    const crimeResult = await axios(`http://localhost:4000/nyccrime/location/${radius}/${lng}/${lat}`)
      .then(response => response.data)
      .catch(error => console.log('error', error))

    console.log(crimeResult)
  }

  useEffect(() => {

    // Initialize the zipcode
    if (ZipCode === undefined || ZipCode === '') {
      setZipCode(defaultZipCode)
    }

    // Initialize the Input from search bar
    if (searchInput === undefined) {
      setSearchInput('')
    }

    // Case : when user did not search anything, provide default data
    if (searchInput === '' && ZipCode === defaultZipCode) {
      dataInit()
    }
    // Case : when user did provide search values
    else {
      dataSearch()
    }

    crimeSearch()

  }, [searchInput, searchFilter, radius, ZipCode])


  return (
    <div className="App">
      <Header />
      <SearchBar
        getSearchValue={getSearchValue}
        getSearchZipCode={getSearchZipCode}
        showPlanner={plannerOpenClose}
      />
      <MapComponent
        passData={data}
        passLng={lng}
        passLat={lat}
        addPlanner={addToPlanner}
        showPlanner={plannerOpenClose}
        passPlannerList={plannerList}
        resultPopup={resultPopup}
        getDrawerVisible={getDrawerVisible}
        drawerVisible={drawerVisible}
      />
      <Result passData={data}
        getResultPopup={getResultPopup}
        drawerVisible={drawerVisible}
        getDrawerVisible={getDrawerVisible}
      />
      <ListFilter
        getRadius={getRadius}
        currentFilter={searchFilter}
        getSearchFilter={getSearchFilter}
      />
      {plannerVisible ?
        <Planner passPlannerList={plannerList} showPlanner={plannerOpenClose} addPlanner={addToPlanner} />
        : null}
    </div>
  )
}

export default App