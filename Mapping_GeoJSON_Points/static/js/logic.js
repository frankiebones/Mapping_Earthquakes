// add console.log to check to see if our code is working
console.log("working");

/* // add GeoJSON data
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// grab GeoJSON data
L.geoJSON(sanFranAirport, {
  // turn each feature into a marker on map
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup();
  }
}).addTo(map); */

// create tile layer that will be background of map
let  dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let  satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

// create a base layer to hold mulitple map styles
let baseMaps = {
  Satellite: satStreets,
  Dark: dark,
  Watercolor: Stamen_Watercolor
};

// create map object with a center and zoom level
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [satStreets]
});

// pass map layers into layers control
L.control.layers(baseMaps).addTo(map);

// add specified tile layer to map
//satStreets.addTo(map);

// access GeoJSON URL
let airportData = "https://raw.githubusercontent.com/frankiebones/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// grab GeoJSON data
d3.json(airportData).then(function(data) {
  console.log(data);
  // create GeoJSON layer with retreived data
  L.geoJSON(data).addTo(map);
});