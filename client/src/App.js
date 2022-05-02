import './App.css'
import React from "react"
import Header from "./Components/Header/Header"
import ListSearch from "./Components/ListSearch/ListSearch"
import Map from "./Components/Map/Map"
import Planner from "./Components/Planner/Planner"


function App () {
  return (
    <div className="App">
      <Header />
      <ListSearch />
      <Map />
      <Planner />
    </div>
  )
}

export default App
