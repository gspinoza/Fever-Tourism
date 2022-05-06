import './App.css'
import React, { useState } from "react"
import Header from "./Components/Header/Header"
import SearchBar from './Components/SearchBar/SearchBar'
import ListFilter from "./Components/ListFilter/ListFilter"
import Result from './Components/Result/Result'
import Map from "./Components/Map/Map"
import Planner from "./Components/Planner/Planner"


function App () {
  const [value, setValue] = useState('')
  const [radius, setRadius] = useState(1000)

  function getSearchValue (searchValue) {
    setValue(searchValue)
  }

  function getRadius (searchRadius) {
    setRadius(searchRadius)
  }

  return (
    <div className="App">
      <Header />
      <SearchBar getSearchValue={getSearchValue} />
      <ListFilter getRadius={getRadius} />
      <Result SearchResult={value} SearchRadius={radius} />
      <Map SearchResult={value} SearchRadius={radius} />
    </div>
  )
}

export default App
