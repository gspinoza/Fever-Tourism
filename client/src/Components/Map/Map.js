import './Map.css'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiNTA1NTM5MzY3IiwiYSI6ImNsMm1mbXA2bzBsM2IzcHA2d2duN3E2M3IifQ.fKjGBQZADXaVOxZA3p4eDw'


function Map () {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-73.9708) // defalt lng of New York
  const [lat, setLat] = useState(40.7253) // defalt lat of New York
  const [zoom, setZoom] = useState(10)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })



  return (
    <div className="Map">
      <div ref={mapContainer} className="map-container" />
      <div className="sidebar">
        Longitude: {''} | Latitude: {''}
      </div>


    </div>
  )
}
export default Map