window.onload = function(){
alert('This page will request your location in order to display your location on a map. We do not store your location information or do anything with it besides display this map.');
} //Modify the text that appears in the alert window to explain that the page will ask permission to access the user's location and explain why it will do so.

//intializing the map and the light and dark base layers with layer control
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var light = L.tileLayer(mbURL, {
  id:'mapbox/light-v10',
  maxZoom:18,
  tileSize: 512,
  zoomOffset: -1,
  attribution: mbAttr
});
var dark = L.tileLayer(mbURL, {
  id:'mapbox/dark-v10',
  maxZoom:18,
  tileSize: 512,
  zoomOffset: -1,
  attribution: mbAttr
});
var map = L.map('map', {layers:[light]}).fitWorld();
var baseLayers = {
  "light" : light,
  "dark" : dark
}
L.control.layers(baseLayers).addTo(map);


//creating the locate function that runs on button click
L.easyButton('<img src ="icons/marker-icon.svg">', function(btn, map){
	map.locate({setView: true, maxZoom: 16, watch: false, timeout: 10000});
}).addTo(map);

L.easyButton('<img src ="icons/info-icon.svg">', function(){
	alert('This map exists to demonstrate ways to optimize user experience for web maps, especially when they are viewed on mobile. It maximizes the use of screen real estate for the map image, the basemap displays as light or dark depending on whether the sun is out in the user\'s location, and the color and size of the circle surrounding the "You are here" marker indicates the locational accuracy of the device\'s geolocation services. Enjoy!')
}).addTo(map);

//the below JS code takes advantage of the Geolocate API as it is incorporated in the Leaflet JS library with the locate method
function onLocationFound(e) { //this function does three things if the location is found: it defines a radius variable, adds a popup to the map, and adds a circle to the map.

  var radius = e.accuracy / 2; //this defines a variable radius as the accuracy value returned by the locate method divided by 2. It is divided by 2 because the accuracy value is the sum of the estimated accuracy of the latitude plus the estimated accuracy of the longitude. The unit is meters.

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet of this point.<br>Latitude: " + e.latitude.toFixed(6) + "<br>Longitude: " + e.longitude.toFixed(6)).openPopup();
  //this adds a Leaflet popup to the map at the lat and long returned by the locate function. The text of the popup is defined here as well. Please change this text to specify what unit the radius is reported in.

  //L.circle(e.latlng, radius).addTo(map); // this adds a Leaflet circle to the map at the lat and long returned by the locate function. Its radius is set to the var radius defined above.

  if (radius < 30) {
      L.circle(e.latlng, radius, {color: 'green'}).addTo(map);
  }
  else{
      L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
  }
  //this adds a Leaflet circle to the map at the lat and long returned by the locate function. Its radius is set to the var radius defined above. If the radius is less than 30, the color of the circle is blue. If it is more than 30, the color is red. Comment out the line of code that adds the simple circle and uncomment the seven lines of code that enable the responsively colored circle. NOTE: there are two syntax errors in the code that you must correct in order for it to function.
  var times = SunCalc.getTimes(new Date(), e.latitude, e.longitude);
  var sunrise = times.sunrise.getHours();
  var sunset = times.sunset.getHours();

  var currentTime = new Date().getHours();
    if (sunrise <= currentTime && currentTime <= sunset){
      map.removeLayer(dark);
      map.addLayer(light);
    }
    else {
      map.removeLayer(light);
      map.addLayer(dark);
    }
}

function onLocationError(e) {
  alert(e.message);
}
//this function runs if the location is not found when the locate method is called. It produces an alert window that reports the error

//these are event listeners that call the functions above depending on whether or not the locate method is successful
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
