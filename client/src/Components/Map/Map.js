import './Map.css'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Drawer, Button, message } from 'antd'

mapboxgl.accessToken = 'pk.eyJ1IjoiNTA1NTM5MzY3IiwiYSI6ImNsMm1mbXA2bzBsM2IzcHA2d2duN3E2M3IifQ.fKjGBQZADXaVOxZA3p4eDw'

const Marker = ({ onClick, place }) => {
  const _onClick = () => {
    onClick(place)
  }
  return (
    <div onClick={_onClick} className="marker"></div>
  )
}


function Map (props) {
  const { passData, passLng, passLat, addPlanner,
    showPlanner, passPlannerList, resultPopup,
    getDrawerVisible, drawerVisible } = props
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-73.98888545) // defalt lng of New York
  const [lat, setLat] = useState(40.74743397) // defalt lat of New York
  const [zoom, setZoom] = useState(12)
  const [detailVisible, setDetailVisible] = useState(false)
  const [placeinfo, setPlaceInfo] = useState({})


  function showDrawer () {
    setDetailVisible(true)
    getDrawerVisible(true)
  }
  function closeDetail () {
    setDetailVisible(false)
    getDrawerVisible(false)
  }

  function addToPlanner () {
    if (!passPlannerList.includes(placeinfo)) {
      addPlanner([...passPlannerList, placeinfo])
      showPlanner(true)
      msg(true)
    } else {
      showPlanner(true)
      msg(false)
    }
  }

  function msg (flag) {
    if (flag) {
      message.success({
        content: 'Success Add to Planner',
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }
    else {
      message.warning({
        content: 'Item Already Exist in Planner',
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      })
    }

  };

  async function placedata (item) {
    console.log(item)
    const result = await axios(`http://localhost:4000/axios/nyc/place/details/${item.id}`)
      .then(response => response.data)
      .catch(error => console.log('error', error))

    setPlaceInfo(result)
    console.log(result)


    const popup = new mapboxgl.Popup({ closeOnClick: true, className: 'Map-popup' })
      .setLngLat([item.lon, item.lat])
      .setMaxWidth('500')
      .setHTML(
        `<h2>${result.name}</h2>
        Address :
        <div> ${result.address}</div>`
      )
      .addTo(map.current)

    showDrawer(result)
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
    setLng(passLng)
    setLat(passLat)
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
    if (passData.length !== 1 && passData[0] !== 'no result') {
      for (let i = 0; i < passData.length; i++) {
        addMarker(passData[i])
      }
    }
  }, [passData, passLat, passLng])

  useEffect(() => {
    if (drawerVisible && resultPopup !== null) {
      placedata(resultPopup)
    }
  }, [resultPopup, drawerVisible])

  return (
    <div className="Map">
      <h3></h3>
      <div ref={mapContainer} className="map-container" >
        <Drawer
          title={placeinfo.name}
          placement="right"
          closable={true}
          onClose={closeDetail}
          visible={detailVisible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <Button type="primary" onClick={addToPlanner} ghost>
            Add to Planner
          </Button><br /><br />
          <h3 style={{ fontWeight: 'bold' }}>Address :</h3>
          <div>{placeinfo.address}</div><br />
          <h3 style={{ fontWeight: 'bold' }}>Description :</h3>
          <div>{placeinfo.wiki_info}</div><br />
          <img src={placeinfo.image}></img>
        </Drawer>
      </div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
    </div>
  )
}
export default Map