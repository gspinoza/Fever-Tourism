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

  function getSearchValue (searchValue) {
    setValue(searchValue)
  }

  return (
    <div className="App">
      <Header />
      <SearchBar getSearchValue={getSearchValue} />
      <ListFilter />
      <Result SearchResult={value} />
      <Map SearchResult={value} />
    </div>
  )
}

export default App
