const express = require('express');
const router = express.Router();
// to fetch external data
const fetch = require('node-fetch');
var api_key = '5ae2e3f221c38a28845f05b60136f3be8a3b4fe024bc8cc4a3956574'

function cleanData(data){
    var opentripmapdata =  JSON.parse(JSON.stringify(data))
    var features = opentripmapdata['features']
    // console.log(features)

    // data to return
    var placesArray = [];

    // iterate opentripmapdata and create new json structure
    for (var i = 0, len = features.length; i < len; ++i) {
        // get current object
        var placeObject = features[i];
        // create a new object
        let newPlaceObject = {};
        // set new values
        newPlaceObject.id = placeObject["id"];
        newPlaceObject.name = placeObject["properties"]["name"];
        newPlaceObject.rate = placeObject["properties"]["rate"];
        categories = placeObject["properties"]["kinds"].split(',');
        newPlaceObject.category = categories;
        newPlaceObject.lon = placeObject["geometry"]["coordinates"]["0"];
        newPlaceObject.lat = placeObject["geometry"]["coordinates"]["1"];
        // push object into array
        placesArray.push(newPlaceObject)
    }

    return JSON.stringify(placesArray)
}

// get place geo details
router.get('/geo/:place', (req, res) => {
    // make external request
    var requestOptions = {method: 'GET',redirect: 'follow'};
    fetch(`http://api.opentripmap.com/0.1/en/places/geoname?apikey=${api_key}&name=${req.params.place}`, requestOptions)
      .then(response => response.json())
      .then(data => res.end(JSON.stringify(data))) // return
      .catch(error => console.log('error', error));
});

// get place details
router.get('/nyc/places/:radius/:limit', (req, res) => {
    // make external request
    var requestOptions = {method: 'GET',redirect: 'follow'};
    fetch(`http://api.opentripmap.com/0.1/en/places/radius?apikey=${api_key}&radius=${req.params.radius}&limit=${req.params.limit}&offset=10&lon=-74.0059&lat=40.71427`, requestOptions)
      .then(response => response.json())
      .then(data => res.end(cleanData(data))) // return
      .catch(error => console.log('error', error));
});

module.exports = router;