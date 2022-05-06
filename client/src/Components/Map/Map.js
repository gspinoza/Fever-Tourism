import './Map.css'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import Planner from '../Planner/Planner'


mapboxgl.accessToken = 'pk.eyJ1IjoiNTA1NTM5MzY3IiwiYSI6ImNsMm1mbXA2bzBsM2IzcHA2d2duN3E2M3IifQ.fKjGBQZADXaVOxZA3p4eDw'



function Map (props) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-74.0059) // defalt lng of New York
  const [lat, setLat] = useState(40.71427) // defalt lat of New York
  const [zoom, setZoom] = useState(12)
  //const [data, setData] = useState([])
  const { SearchResult, SearchRadius } = props

  //console.log(SearchRadius)

  function addMarker (item) {
    const el = document.createElement('div')
    el.className = 'marker'

    new mapboxgl.Marker(el)
      .setLngLat([item.lon, item.lat])

      // pop up place detail ***************(add more)*********************
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<h3>${item.name}</h3>
                    <div>Rating:${item.rate}</div>
                    <!-- <div>${item.rate}</div> --> `
          )
      )
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

  // add marker on map
  useEffect(() => {
    // get the place detail
    function dataInit () {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + SearchRadius + "/1000/" + lng + "/" + lat, requestOptions)
        .then(response => response.json())
        .then(result => {
          //console.log(1)
          // display the marker.
          result.map((item) => {
            addMarker(item)
          })
        })
        .catch(error => console.log('error', error))
    }

    // Get the search result
    function dataSearch () {
      var requestOptions = { method: 'GET', redirect: 'follow' }
      fetch("http://localhost:4000/nyc/places/" + SearchRadius + "/1000/" + lng + "/" + lat, requestOptions)
        .then(response => response.json())
        .then(result => {
          //console.log(SearchRadius)
          //console.log(2)
          result.map(item => {
            // add Marker on Matched result
            if (item.name.includes(SearchResult)) {
              addMarker(item)
            }
          })
        })
        .catch(error => console.log('error', error))
    }

    if (SearchResult === '' || SearchResult === undefined) {
      //console.log(SearchResult)
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
      dataInit()

    }
    else {
      //console.log(SearchResult)
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

      dataSearch()
    }

  }, [SearchResult, SearchRadius])


  return (
    <div className="Map">
      <div ref={mapContainer} className="map-container" />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <Planner />
    </div>
  )
}
export default Map