# Lab 1: Geolocation and mobile optimization with Leaflet
## TGIS 504, Winter 2020, Dr. Emma Slager
### Introduction
In this lab, you will practice making web maps that recognize and design for both the unique constraints of mobile devices and their unique affordances. You will create a map that places a marker on the map based on the locational information provided by the user's device, include signifiers that indicate to the user the accuracy of their device's locational information, add functionality that switches the base map between light and dark based on whether the sun is up at the user's location, and utilize various other design conventions that optimize mobile map use. This lab also asks you to read relevant documentation on the technologies used and to answer a few questions about that documentation in order to assess your understanding of its contents.

The first part of this lab is based on the tutorial [Leaflet on Mobile](https://leafletjs.com/examples/mobile), with modifications and additions by myself. 
### Set up your workspace
Begin by downloading the zipped folder of lab templates. This should contain an index.html, javascript.js, and styles.css file. Extract the files and save them to your workspace, making sure to set up an appropriate folder structure for the new term's work. Open the files in Atom or the text editor of your choice. Eventually, you will upload the files to GitHub or your UW server space, so you may wish to create a repository for your files now, which also provides the benefit of serving as a backup for your work. As always, I recommend saving your work frequently and testing it regularly using atom-live-server or a similar Atom package. We will not be using any geojson files in this lab, so you won't have cross-origin issues and local testing will therefore also be possible.

### Step 1: Prepare the page and initialize the map
In your index.html file, add the necessary links to Leaflet's CSS and JS libraries to the `head`. Per our discussion of the relative merits of CDNs versus locally hosted libraries last quarter, I recommend using a CDN in order to minimize bandwidth usage for best mobile performance: 
 ``` html
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  ```
 In the `body` of the index, create a `div` element to hold the map: 
  ``` html
  <div id="map"></div>
  ```
  Define the height and width of your map container in the CSS file and give the page some additional basic styling. Because we want to maximize screen real estate for the map itself, we'll set the height and width to 100%:
  ```css
  body {
    padding: 0;
    margin: 0;
  }

html, body, #map {
  height: 100%;
  width: 100vw;
}
  ```
Initialize the map in the JavaScript file, setting the map to display the whole world. We'll use Mapbox tiles for the basemap. Be sure to replace `{accessToken}` with your own personal Mapbox access token:
```javascript
var map = L.map('map').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/streets-v10',
}).addTo(map);
```
### Step 2: Geolocation
As we've discussed in lecture, we can access a device's location using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) that is built into JavaScript. Leaflet makes accessing location even easier with its built-in [`locate` method](https://leafletjs.com/reference-1.6.0.html#map-locate). We can call this method with a single line of code, and when we do so, we can set [various options](https://leafletjs.com/reference-1.6.0.html#locate-options), such as `setView`, which, if true, recenters the map on the user's location, or `watch` which, if true, will continuously watch the device's location instead of detecting it just once. 

At the bottom of your JavaScript code, call the locate method with the following options: 
```javascript
map.locate({setView: true, maxZoom: 16});
```
Here we set the maxZoom to 16, which preserves some spatial context even if a user's device gives location information that is precise enough that the setView option could zoom in further. Save your work and test the page. If everything is working as expected, the map should recenter and zoom to your location. Note that you need to give the webpage permission to access your location information before the map can access it. 
#### A quick aside 
You may notice that the text on your map is very difficult to read when zoomed in. This has something to do with retina screen detection errors and tile size (see more in a Stack Overflow thread [here](https://stackoverflow.com/questions/37040494/street-labels-in-mapbox-tile-layer-too-small)). If this happens for you, add the following options to your tile layer where you call it with the L.tileLayer method, below where you specify attribution, maxZoom, and id:
```javascript
    tileSize: 512,
    zoomOffset: -1,
```
#### Now back to Geolocation

What if we want to do more than recenter and zoom the map after we've located the user's device? No sweat! Built into the `locate` method are two events that can fire after the method runs, `locationfound` and `locationerror`. We can write functions that will run if the location is found or if there is an error when the `locate` method tries to find the location (for instance, if the user doesn't give permission for the webpage to access their location).

Let's say we want to add a marker at the user's location if geolocation is successful and show an error message if geolocation fails. We can do so by writing functions and adding event listeners to our code. Note that the event listeners need to be included *before* the `map.locate` call! Add the following code before the `map.locate({setView: true, maxZoom: 16});` line. Read the comments to understand what the code is doing:

```javascript
function onLocationFound(e) {
    var radius = e.accuracy; //this defines a variable radius as the accuracy value returned by the locate method divided by 2. It is divided by 2 because the accuracy value is the sum of the estimated accuracy of the latitude plus the estimated accuracy of the longitude. The unit is meters.

    L.marker(e.latlng).addTo(map)  //this adds a marker at the lat and long returned by the locate function. 
        .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet from this point").openPopup(); //this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number. 

    L.circle(e.latlng, radius).addTo(map); //this adds a circle to the map centered at the lat and long returned by the locate function. Its radius is set to the var radius defined above.
}

map.on('locationfound', onLocationFound); //this is the event listener 
```
Next, we'll write a function that will run if the `locationerror` event fires. 
```javascript
function onLocationError(e) {
  alert(e.message);
}

	map.on('locationerror', onLocationError);

```
The message that displays will depend on the error; you can also find these errors in the JavaScript console in your web browser. I like to organize my code so that my functions are together and my event listeners are together right before the `map.locate` code, but you may organize things how you prefer. 

At this point, you've basically completed the Leaflet on Mobile tutorial and your map should look something like their [complete example](https://leafletjs.com/examples/mobile/example.html) but with some custom improvements. 

### Step 3: Giving the user feedback about the geolocation accuracy of their device
You've made some good progress on the lab. Well done. You've been doing your development and testing on a laptop or desktop computer; now, take a moment to test out your work on your mobile device. Upload your HTML, JS, and CSS files as a repository to GitHub and enable Pages for the repository (or, if you prefer, transfer your files to your UW server space using SFTP). After your files have upload, visit the URL where they are hosted test things out, comparing what displays to what you see on your computer. In all likelihood, the radius of the circle you get with your mobile device is much smaller than the radius of the circle you get with your computer. This is because your mobile device has GPS, which provides much greater locational accuracy than the IP address the webpage accesses to geolocate your computer. The size of the circle is one form of **feedback** that our web map gives the user to understand the accuracy of their geolocation. But let's add a second form of feedback to make this even more clear to the user. We'll use conditional styling to change the color of the circle if the accuracy is above a certain level of accuracy--green if its accurate within 100 meters and red if its less accurate than that. 

In the function `onLocationFound` replace the line of code that reads `L.circle(e.latlng, radius).addTo(map);` with the following: 
```javascript
if (radius <= 100) {
      L.circle(e.latlng, radius, [color: 'green'}).addTo(map);
  }
  else{
      L.circle(e.latlng, radius, {color: 'red'}).addTo(mymap);
  }
  ```
  Here we add styling the circle instead of using the blue color that is the default in Leaflet. The style is set based on a conditional operator: **if** the circle's radius (which is determined by the accuracy reading returned by the locate method) is less than or equal to 100, the circle will be green. **Else** if the radius is greater than 100, the circle will be red. *Before you test this change out, note that I've included two small errors in the code block above that you need to correct before the code will function correctly!
  
### Step 4: Changing the basemap based on environmental conditions

As this week's readings noted, a significant constraint of mobile mapping is that environmental conditions can impact useability; thus, for instance, we tend to prefer high contrast color schemes to improve readability of maps in bright light, since many people use mobile maps outdoors and not just at climate controlled desktop computers. In the final step of creating a map that is optimized for mobile use, we're going to add functionality that switches between a light and dark themed base map, depending on the user's environmental condtions. If it's during daylight hours in the time and place that your user is viewing your map, the basemap will be Mapbox's light map, and if it's not during daylight hours, the basemap will be Mapbox's dark map. 

First, we need to load tile layers for both the light and dark Mapbox styles. At the top of your JavaScript code, replace the lines where you add the `L.tileLayer` with the `id:'mapbox/streets-v10',` with the following code: 
```javascript
var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpzbGFnZXIiLCJhIjoiZUMtVjV1ZyJ9.2uJjlUi0OttNighmI-8ZlQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpzbGFnZXIiLCJhIjoiZUMtVjV1ZyJ9.2uJjlUi0OttNighmI-8ZlQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
});
```
We are replacing the single tile layer that used the Mapbox Streets style with two tile layers, one that uses the light style and one that uses the dark style. Note also that we have made each tile layer into a variable, which we have given the names `light` and `dark`, and that we have removed the method `addTo(map)` from the end of each section of code. 

Next, we need to initialize the map with one of the two tile layers. Let's choose light. Change the first line of the JavaScript code, where you initialize the map object, so that it reads as follows: 

```javascript
var map = L.map('map', {layers:[light]}).fitWorld();
```
Then, move that line **below** the sections of code that add the two tile layers. Your map should load with the Mapbox Light style instead of the Streets style now. 

But how do we get the basemap to change based on today's sunset and sunrise times in the user's location? Let's break this task down into component steps: 
1. figure out what time the sun rises and sets in the user's location on the current date 
2. figure out what the user's current location is and what the current date is 
3. figure out what the current time is and determine if the sun is currently up or if it is set
4. style the basemap conditionally based on the sun's position

Believe it or not, this is pretty easy to do with JavaScript. To make it even easier, we're going to use a library called SunCalc that was developed by the same person who developed Leaflet, Vladimir Agafonkin. 
