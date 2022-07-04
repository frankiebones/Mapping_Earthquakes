// add console.log to check to see if our code is working
console.log("working");

// create tile layers that will be background of map
let  streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let  satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a base layer to hold mulitple map styles
let baseMaps = {
  Streets: streets,
  Satellite: satStreets
};

// create map object with a center and zoom level
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// pass map layers into layers control
L.control.layers(baseMaps).addTo(map);

// access GeoJSON URL
let quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// grab GeoJSON data
d3.json(quakeData).then(function(data) {
    
    function getRadius(mag) {
        if (mag === 0) {
            return 1;
        }
    
        return mag * 4;
    }
    
    // create style for circle markers
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        weight: 0.5,
        stroke: true,
        radius: getRadius(feature.properties.mag)
      };
    }
    
    // create GeoJSON layer with retreived data
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
    },
    style: styleInfo
  }).addTo(map);
});

     