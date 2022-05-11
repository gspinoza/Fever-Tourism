const express = require('express')
const router = express.Router()
// to fetch external data
const fetch = require('node-fetch')
const axios = require("axios")
// var api_key = '5ae2e3f221c38a28845f05b60136f3be8a3b4fe024bc8cc4a3956574'

var api_key = '5ae2e3f221c38a28845f05b6f30a1b758501cadb129ddd11bd3f9499'
var api_key_zip = 'b450db216156525dfaa2f39d77acaa27'
var crime_data_token = 'bhpDzWIkU2Me9kazo21uTi1Bc'
var weather_key = '2f8d6aa22c98b163c7a7fe2cd5def46d'

function cleanData (data) {
  var opentripmapdata = JSON.parse(JSON.stringify(data))
  var features = opentripmapdata['features']
  // console.log(features)

  // data to return
  var placesArray = []


  // iterate opentripmapdata and create new json structure
  for (var i = 0, len = features.length; i < len; ++i) {
    // get current object
    var placeObject = features[i]
    // create a new object
    let newPlaceObject = {}
    // set new values
    newPlaceObject.id = placeObject["id"]
    newPlaceObject.name = placeObject["properties"]["name"]
    newPlaceObject.rate = placeObject["properties"]["rate"]
    categories = placeObject["properties"]["kinds"].split(',')
    newPlaceObject.category = categories
    newPlaceObject.lon = placeObject["geometry"]["coordinates"]["0"]
    newPlaceObject.lat = placeObject["geometry"]["coordinates"]["1"]
    // push object into array
    placesArray.push(newPlaceObject)
  }

  return JSON.stringify(placesArray)
}

function cleanPlaceDetails (data) {
  var opentripmapdata = JSON.parse(JSON.stringify(data))

  // data to return
  let newPlaceObject = {}
  newPlaceObject.id = opentripmapdata['xid']
  newPlaceObject.name = opentripmapdata['name']

  var house_number = opentripmapdata['address']['house_number']
  house_number = (house_number != undefined) ? house_number : ''
  var road = opentripmapdata['address']['road']
  road = (road != undefined) ? road : ''
  var suburb = opentripmapdata['address']['suburb']
  suburb = (suburb != undefined) ? suburb : ''
  var city = opentripmapdata['address']['city']
  city = (city != undefined) ? city : ''
  var postcode = opentripmapdata['address']['postcode']
  postcode = (postcode != undefined) ? postcode : ''
  var fullAddress = `${house_number} ${road}, ${suburb}, ${city} ${postcode}`
  if (fullAddress.trim().charAt(0) == ',') {
    fullAddress = `${suburb}, ${city} ${postcode}`
  }
  newPlaceObject.address = fullAddress

  newPlaceObject.rate = opentripmapdata['rate']
  newPlaceObject.kinds = opentripmapdata['kinds']
  newPlaceObject.url = opentripmapdata['url']
  newPlaceObject.wikipedia_url = opentripmapdata['wikipedia']
  newPlaceObject.image = opentripmapdata['preview']['source']
  newPlaceObject.wiki_info = opentripmapdata['wikipedia_extracts']['text']
  newPlaceObject.lon = opentripmapdata['point']['lon']
  newPlaceObject.lat = opentripmapdata['point']['lat']

  // console.log(newPlaceObject);
  return JSON.stringify(newPlaceObject)
}

function cleanGeocodeData (data) {
  var thezipcodesdata = JSON.parse(JSON.stringify(data))

  // data to return
  let newPlaceObject = {}
  newPlaceObject.lon = thezipcodesdata['location'][0]['longitude']
  newPlaceObject.lat = thezipcodesdata['location'][0]['latitude']
  // console.log(newPlaceObject);
  return JSON.stringify(newPlaceObject)
}

// cleans up crime data
function cleanCrimeData(data) {
  var crimeData = JSON.parse(JSON.stringify(data))
  // data to return
  var crimesArray = []

  // iterate crimeData and create new json structure
  for (var i = 0, len = crimeData.length; i < len; ++i) {
    // get current object
    var crimeObject = crimeData[i]
    // create a new object
    let newCrimeObject = {}
    // set new values
    newCrimeObject.date = crimeObject["cmplnt_fr_dt"]
    newCrimeObject.crime_type = crimeObject["law_cat_cd"]
    newCrimeObject.crime_desc = crimeObject["ofns_desc"]
    newCrimeObject.police_desc = crimeObject["pd_desc"]
    newCrimeObject.lon = crimeObject["longitude"]
    newCrimeObject.lat = crimeObject["latitude"]
    // push object into array
    crimesArray.push(newCrimeObject)
  }
  return JSON.stringify(crimesArray)
}

// cleans up weather data
function cleanWeatherData(data) {
  var weatherData = JSON.parse(JSON.stringify(data))
  
  let newWeatherObject = {}
  newWeatherObject.temp = weatherData["current"]["temp"]
  newWeatherObject.weather = weatherData["current"]["weather"][0]["main"]
  newWeatherObject.lon = weatherData["lon"]
  newWeatherObject.lat = weatherData["lat"]
  
  return JSON.stringify(newWeatherObject)
}

//timestamp conversion
function unixToRegularDate(timestamp) {
  var d = new Date(timestamp*1000);
  timeStampCon = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
  return timeStampCon;
};

const cors = require('cors')
router.use(cors())

// get place geo details
router.get('/geo/:place', (req, res) => {
  // make external request
  var requestOptions = { method: 'GET', redirect: 'follow' }
  fetch(`http://api.opentripmap.com/0.1/en/places/geoname?apikey=${api_key}&name=${req.params.place}`, requestOptions)
    .then(response => response.json())
    .then(data => res.end(JSON.stringify(data))) // return
    .catch(error => console.log('error', error))
})

// get places given lon, lat, radius, & limit
router.get('/nyc/places/:radius/:limit/:lon/:lat', (req, res) => {
  // make external request
  var requestOptions = { method: 'GET', redirect: 'follow' }
  fetch(`http://api.opentripmap.com/0.1/en/places/radius?apikey=${api_key}&radius=${req.params.radius}&limit=${req.params.limit}&kinds=natural,historic,cultural&rate=3&offset=10&lon=${req.params.lon}&lat=${req.params.lat}`, requestOptions)
    .then(response => response.json())
    .then(data => res.end(cleanData(data))) // return
    .catch(error => console.log('error', error))
})

// Axios: get places given lon, lat, radius, & limit
router.get('/axios/nyc/places/:radius/:limit/:lon/:lat', (req, res) => {
  // make external request
  axios(`http://api.opentripmap.com/0.1/en/places/radius?apikey=${api_key}&radius=${req.params.radius}&limit=${req.params.limit}&kinds=natural,historic,cultural&rate=3&offset=10&lon=${req.params.lon}&lat=${req.params.lat}`)
    .then(response => response.data)
    .then(data => res.end(cleanData(data))) // return
    .catch(error => console.log("Failed to fetch page: ", error))
})

// get place info
router.get('/nyc/place/details/:placeid', (req, res) => {
  // make external request
  var requestOptions = { method: 'GET', redirect: 'follow' }
  fetch(`http://api.opentripmap.com/0.1/en/places/xid/${req.params.placeid}?apikey=${api_key}`, requestOptions)
    .then(response => response.json())
    .then(data => res.end(cleanPlaceDetails(data))) // return
    .catch(error => console.log('error', error))
})

// Axios: get place details using
router.get('/axios/nyc/place/details/:placeid', (req, res) => {
  // make external request
  axios(`http://api.opentripmap.com/0.1/en/places/xid/${req.params.placeid}?apikey=${api_key}`)
    .then(response => response.data)
    .then(data => res.end(cleanPlaceDetails(data))) // return
    .catch(error => console.log("Failed to fetch page: ", error))
})

// get lon and lat given zipcode
router.get('/geocode/:zipcode', (req, res) => {
  // make external request
  var requestOptions = { method: 'GET', redirect: 'follow' }
  fetch(`https://thezipcodes.com/api/v1/search?zipCode=${req.params.zipcode}&countryCode=US&apiKey=${api_key_zip}`, requestOptions)
    .then(response => response.json())
    .then(data => res.end(cleanGeocodeData(data))) // return
    .catch(error => console.log('error', error))
})

// get all crime data from given borough
router.get('/nyccrime/borough/:borough', (req, res) => {
  // make external request
  var requestOptions = { method: 'GET', redirect: 'follow' }
  axios({
    method: 'GET',
    url: `https://data.cityofnewyork.us/resource/qb7u-rbmr.json?boro_nm=${req.params.borough}`,
    data: { limit : 5000, app_token : crime_data_token }})
    .then(function (response) {
      res.send(cleanCrimeData(response['data']))
      res.end()
    }) 
    .catch(function (error) {
      console.error(error);
    })
})

// get crime data from given location and radius
router.get('/nyccrime/location/:radius/:lon/:lat', (req, res) => {
  // make external request
  axios({
    method: 'GET',
    url: `https://data.cityofnewyork.us/resource/qb7u-rbmr.json?$where=within_circle(lat_lon, ${req.params.lat}, ${req.params.lon}, ${req.params.radius})`,
    data: { limit : 5000, app_token : crime_data_token
    }}) .then(function (response) {
      res.send(cleanCrimeData(response['data']))
      res.end()
    }) .catch(function (error) {
      console.error(error);
    })
})

// get weather from given location
router.get('/weather/:lon/:lat', (req, res) => {
  var exclude = 'minutely,hourly'
  // make external request
  var requestOptions = { method: 'GET', redirect: 'follow' }
  axios({
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lon}&exclude=${exclude}&units=imperial&appid=${weather_key}`})
    .then(function (response) {
      res.send(cleanWeatherData(response['data']))
      res.end()
    }) 
    .catch(function (error) {
      console.error(error);
    })
})

module.exports = router

