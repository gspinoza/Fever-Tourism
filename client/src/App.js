import './App.css'
import React from "react"
import Header from "./Components/Header/Header"
import SearchBar from './Components/SearchBar/SearchBar'
import ListFilter from "./Components/ListFilter/ListFilter"
import Result from './Components/Result/Result'
import Map from "./Components/Map/Map"
import Planner from "./Components/Planner/Planner"


function App () {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <ListFilter />
      <Result />
      <Map />
    </div>
  )
}

export default App
