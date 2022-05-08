import './Map.css'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import Planner from '../Planner/Planner'
import axios from 'axios'
import ReactDOM from 'react-dom'

mapboxgl.accessToken = 'pk.eyJ1IjoiNTA1NTM5MzY3IiwiYSI6ImNsMm1mbXA2bzBsM2IzcHA2d2duN3E2M3IifQ.fKjGBQZADXaVOxZA3p4eDw'

const Marker = ({ onClick, place }) => {
  const _onClick = () => {
    onClick(place)
  }
  return (
    <div onClick={_onClick} className="marker"></div>
  )
}

/*
const DetailPopup = ({ place }) => {

  console.log(place)
  return (
    <div className="detail">
      <h3>{place.name}</h3>
      <div>Address :{place.address}</div>
      <div>Description:{place.wiki_info}</div>
      <div>Image:{place.image}</div>
    </div>
  )
}
*/

function Map (props) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-74.0059) // defalt lng of New York
  const [lat, setLat] = useState(40.71427) // defalt lat of New York
  const [zoom, setZoom] = useState(12)
  const { passData } = props

  async function placedata (item) {

    const result = await axios(`http://localhost:4000/axios/nyc/place/details/${item.id}`)
      .then(response => response.data)
      .catch(error => console.log('error', error))

    console.log(result)
    window.alert(result.name)

    /*
    const ref = React.createRef()
    // Create a new DOM node and save it to the React ref
    ref.current = document.createElement('div')
    // Render a Marker Component on our new DOM node
    ReactDOM.render(
      <DetailPopup place={result} />,
      ref.current
    )
    */
  }

  // Add marker on map and popup place detail
  function addMarker (item) {

    const ref = React.createRef()
    // Create a new DOM node and save it to the React ref
    ref.current = document.createElement('div')
    // Render a Marker Component on our new DOM node
    ReactDOM.render(
      <Marker onClick={placedata} place={item} />,
      ref.current
    )

    // Create a Mapbox Marker at our new DOM node
    new mapboxgl.Marker(ref.current)
      .setLngLat([item.lon, item.lat])
      .addTo(map.current)

  }

  useEffect(() => {
    if (!map.current) {// initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      })
    }
    // set lng, lat, and zoom as the map moving
    if (map.current) { // wait for map to initialize
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4))
        setLat(map.current.getCenter().lat.toFixed(4))
        setZoom(map.current.getZoom().toFixed(2))
      })
    }
  })

  useEffect(() => {
    if (map.current) {
      // initialize map again
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      })

      // set lng, lat, and zoom as the map moving
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4))
        setLat(map.current.getCenter().lat.toFixed(4))
        setZoom(map.current.getZoom().toFixed(2))
      })
    }
    for (let i = 0; i < passData.length; i++) {
      addMarker(passData[i])
    }
  }, [passData])

  return (
    <div className="Map">
      <h3></h3>
      <div ref={mapContainer} className="map-container" />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <Planner />
    </div>
  )
}
export default Map