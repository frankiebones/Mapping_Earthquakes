// add console.log to check to see if our code is working
console.log("working");

// create tile layer that will be background of map
let  dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let  light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
  Light: light,
  Dark: dark,
  Satellite: satStreets,
  Watercolor: Stamen_Watercolor
};

// create map object with a center and zoom level
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [light]
});

// pass map layers into layers control
L.control.layers(baseMaps).addTo(map);

// access GeoJSON URL
let routeData = "https://raw.githubusercontent.com/frankiebones/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// create style for lines
let myStyle = {
  color: "#ffffa1",
  weight: 2
}
// grab GeoJSON data
d3.json(routeData).then(function(data) {
  console.log(data);
  // create GeoJSON layer with retreived data
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3><i> Airline: </i>" + feature.properties.airline + "</h3> <hr> <h3><i> Destination: </i>" + feature.properties.dst + "</h3>");
    }
  }).addTo(map);
});