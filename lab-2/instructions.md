# Lab 2: Routing with Leaflet and the Mapbox Directions API
## TGIS 504, Winter 2020, Dr. Emma Slager
### Introduction
In this lab, you'll hone your technical skills by building a routing application. You'll also practice the more qualitative skills of evaluation and critique by assessing different Leaflet plugin options and evaluating the mobile friendliness of a particular API. This lab uses the Leaflet mapping platform and a routing plugin, with additional functionality that is built on the Mapbox Directions API and Mapbox Geocoding API. All the files you need for this lab you will either create or download from the Internet. A list of deliverables is included at the end of these instructions.

### Part 1: Working with and assesssing plugins
As you know from previous coursework, the core set of Leaflet features is designed to be as lightweight as possible, and additional features are provided through plugins. The majority of these plugins are built not by Leaflet staff but by community members. This modularity and customizability is typical of open-source software and has many advantages, but it also means quality can vary from plugin to plugin, so being able to assess them is important. 

Navigate to the Routing section of the Leaflet Plugins page: https://leafletjs.com/plugins.html#routing. Here you’ll see a list of 8 different routing plugins. Leaflet provides the name and a link to an external website or GitHub repository with more information about the plugin, a brief description, and the name of the maintainer of the plugin. Pick three of these, and answer the following questions about each in your write up: 
1.	Title and maintainer of plugin: 
2.	What are the main functionalities of the plugin? 
3.	When was the last commit pushed to the GitHub repo where the plugin can be downloaded? 
4.	Do the developers provide a working demo of the plugin?
5.	Based on the above information, how would you rank this in relation to the other two plugins you chose in terms of overall quality and usability? Justify your ranking. 

### Part 2: Integrate routing in a Leaflet map
Now that you’re a little more familiar with the routing plugins available for Leaflet, let’s integrate one into a Leaflet map. 
#### Step 1: Choose a routing plugin and set up your workspace
For basic routing functionality, I like Leaflet Routing Machine. Its latest version was released in November 2018, and the latest commit was made to its GitHub repository earlier this month. The documentation is more developed than many plugins, and there are working demos and even tutorials available. Let’s go with this one. As with most Leaflet libraries and plugins, we can download the necessary files (a CSS file and a JS file) for using Leaflet Routing Machine and host them ourselves, or we can find them on unpkg.com. We'll use the CDN unpkg.com version instead of downloading. 

#### Step 2: Set up a minimal Leaflet map and initialize the routing plugin
In a text editor like Atom, let's create our files: index.html, styles.css, and scripts.js. Save these in a new folder. As always, consider uploading your folder as a repository to GitHub now, or you can save this step until later when you're ready to put your work up on GitHub Pages. 

Edit your index.html file to include basic header information, CDN links to the Leaflet CSS and JS files, and a div for holding your map: 
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>give your page a title</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
</head>
<body>
    <div id="map"></div>
</body>
</html>
```
Edit your styles.css file to include the following styling: 
```css
body {
   padding: 0;
   margin: 0;
}

#map {
   position: absolute;
   width: 100vw;
   height: 100%;
}
```
In your index.html `<head>`, include a link to your styles.css file, and in the `<body>`, after you've created the map div, include a link to your scripts.js file. 
  
Next, initialize the map. Add the following code to your scripts.js file:
```javascript
var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: 'yourAccessTokenGoesHere',
}).addTo(map);
```
You should now have an HTML page that loads a Leaflet map centered on the South Sound. The code you copied above uses the Mapbox light style for its basemap. However, this style doesn't have the best contrast, making it somewhat difficult to use in bright light environments. Change the basemap to another style--either a custom style or another basemap option made available by Mapbox or another tile service--that has high contrast and emphasizes roads over terrain or other features. 

Next let's add links to the CSS and JS files we need in order to initialize the routing plugin. In the 'Getting Started' section of the [Leaflet Routing Machine homepage](http://www.liedman.net/leaflet-routing-machine), you can find links to where the necessary CSS and JS files are accessible via unpkg.com. Copy those links into the `<head>` of your index. 

Then, under the section of code that intiliazes your map in your scripts.js file, add the following code to initialize the routing plugin:
```javascript
      var control = L.Routing.control({
          waypoints: [
              L.latLng(47.246587, -122.438830),
              L.latLng(47.318017, -122.542970)
          ],
           routeWhileDragging: true
      }).addTo(map);
```
This code initializes the routing control and adds it to the map. The waypoints option defines the start and stop points, while the routeWhileDragging: true option allows you to change the markers at the start and stop points by dragging them. Save your work and preview in a browser. You should see a map with markers at either end of a route and directions from Pinkerton Hall to Point Defiance. Try adding a third point at latitude and longitude 47.258024,  -122.444725. Aha, now you can get baked goods at Corina Bakery on the way to the park.
#### Step 3: Modifying options for the routing control

If you aren’t testing in Google Chrome, switch browsers now and open up the console in Google Developer Tools. You should see the warning below:

![console message](console-message.png)

By default, Leaflet Routing Machine uses routing software from the Open Source Routing Machine (OSRM, website: http://project-osrm.org/). They provide a demo server for testing with their product, but it often gets overloaded by calls from everyone in the world running tests with it (you may have already run into an HTTP 429 error telling you the server had too much traffic while testing). If you want to use OSRM in production you need to build and host your own server. This is a more complicated process than we can cover in one lab, so instead, we’ll change our routing service from OSRM to the Mapbox Directions API. As an option when you initialize the routing control, add the following line of code: 
```javascript
router: L.Routing.mapbox('your-access-token-here'),
```
Insert your access token where requested, save, and open in Chrome. View the console in Developer Tools and you should no longer see the OSRM warning. Mapbox Directions API limits your free usage to 50,000 geolocation requests per month. The limit is more than sufficient for our purposes, but if you were to use this in a commercial product, you might exceed this and either pay for more usage or use a different routing service. 

There are various options built in to the Routing control that we can change to modify the application. Find a full list of these options in the plugin's documentation here: http://www.liedman.net/leaflet-routing-machine/api/ Note that the L.Routing.control class extends the L.Routing.interface class, so any of the options available under L.Routing.interface can also be used when we intialize L.Routing.control. Let's use a couple of these. 

First, change the units from metric to imperial by adding the following key-value pair as an option when you intialize the control: 
```javascript
units:'imperial',
```

Next, let's make the control collapsible, since this will allow the user to maximize screen real estate for the map itself. Add this option: 
```javascript
collapsible: true,
```
Now, review the documentation to figure out how you can set the control to be collapsed (not showing) when the map first loads and edit your code to achieve this. Hint: this is a boolean option available under the L.Routing.itinerary section. 

#### Step 4: Add a geocoder so you can add waypoints by searching for an address or location
Routing software is only able to look up routes between coordinate pairs. Thus, if users want to find routes between addresses or other locations described as a string of text, we need a geocoder that can turn that address string into a coordinate pair. For this, we add a geocoding service as a plugin to extend our Leaflet Routing Machine plugin. It’s plugins on plugins, y’all! 

The person who developed Leaflet Routing Machine also developed a Leaflet geocoder plugin that can be easily combined with the routing machine. It is called Leaflet Control Geocoder, and it can be used with many different geocoding services, such as [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim), [Bing Locations API](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/), [Google Geolocating API](https://developers.google.com/maps/documentation/geocoding/start), or [Mapbox Geocoding API](https://docs.mapbox.com/api/search/), among others. Since we're using Mapbox for directions, let's also use its geocoding service. 

To include the geocoder plugin, we first need to add links to its CSS and JS files in our index.html page. We’ll use unpkg again, though we could also download and store these locally. Add the following links to your index.html. I recommend keeping all your CSS files together and all your JS files together: 

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
```
Next, we initialize the plugin by adding the control to a map instance. As an option when you initialize the routing control, add the following line of code, adding your mapbox access token where requested:
```javascript
  geocoder: L.Control.Geocoder.mapbox('yourAccessTokenGoesHere'),
```
Test this out. Your routing control should now include text boxes where you can search for locations that are geocoded and available for routing. Note that there are again options that you can change to modify the geocoder's behavior. Find the list of these options in the documentation here: https://github.com/perliedman/leaflet-control-geocoder#api.

#### Step 5: Add waypoints by clicking on the map
By default, the Leaflet Routing Machine does not allow a user to add waypoints by clicking on the map. However, this could be a useful functionality. Let’s add it. We’ll do this by creating a popup when the map is clicked that gives buttons for ‘start from this location’ or ‘go to this location’, then add some functions for when those buttons are clicked to get the route. In your scripts.js file, add the following: 
```javascript
function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);  
 });
 ```
This code uses functionality built into JavaScript itself and into Leaflet itself to build a little user interface. When the map is clicked, the code creates a popup that contains two buttons, one called `startBtn` and one called `destBtn`. Save your work and test this out. Clicking the map produces the popup with buttons, but if you click the buttons, nothing happens. Let’s change that. 

When the “Start from this location” button is clicked, the first waypoint of the route should be replaced with the location that the user clicked on. Modifying the waypoints can be done with the method spliceWaypoints, which mimics the behavior of [JavaScript’s Array.splice](https://www.w3schools.com/jsref/jsref_splice.asp). To replace the first waypoint, you tell Leaflet Routing Machine to remove one waypoint at index 0 (the first), and then add a new at the clicked location. Add this code inside the map’s click event handler; e will refer to the click event, and e.latlng is the location clicked:
```javascript
    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
```
Save and test. Your startBtn should now do something, but your destBtn won’t yet. Add another section of code inside the map's click event handler to add functionality to that button:
```javascript
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
 ```
Observe that after this section of code modifies the array of `waypoints` in the `control` variable, it also uses a method called `control.show()` to expand the control from its initial collapsed position. After each button is clicked, the function also closes the popup. 

Now that you’ve added the ability to get waypoints by clicking on the map, let’s get rid of the initial waypoints. In the part of your code where you initialize your routing control, comment out the starting waypoints and add the value null instead. Your code should look like this: 
```javascript
waypoints: [
            null
              //L.latLng(47.246587, -122.438830),
              //L.latLng(47.258024, -122.444725),
              //L.latLng(47.318017, -122.542970)
          ],
```
Save and test. Is the ability to click on the map to create waypoints sufficiently discoverable? I don’t think it is. Make some changes to your map to make it more so. There are many ways to do this—you could create an overlay on your Leaflet map with instructions, set an initial starting waypoint with a popup that tells the user to click the map to change its location, etc. Come up with some way of improving the discoverability of your map, and explain the change you made in your write up. 

#### Step 6: add geolocation
Based on what you’ve learned in last lab and this lab, add functionality that will enable the user to zoom to their current location in case they want to use it as one of their waypoints. This will require using the map.locate function, which is built into Leaflet. I also recommend using the [EasyButton plugin](https://github.com/CliffCloud/Leaflet.EasyButton) to add your button, though it is not required. 

#### Step 7: host your map online
Your final output for this part of the lab should be a Leaflet map with the following features/functionalities:
* Draggable markers
* Units in miles
* collapsable control that is hidden on initial map load
* Geocoder to enable searching for locations
* Clickable buttons to create waypoints 
* Some modification that makes clickable functionality more discoverable
* The ability to zoom to current location 

Please host your map on GitHub Pages or your UW server space and include a link to its location in your lab write-up. 

### Part 3: Evaluating and critiquing mobile friendliness
Though Leaflet Routing Machine is a fairly good plugin, one major disadvantage is that the CSS file its maintainer makes available is not optimized for mobile browsing. In fact, let’s test this. Go view the map you made in Part 2 on your mobile device. Not great. In your browser, open up the leaflet-routing-machine.css file at its location on unpkg.com: https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css. Notice that widths, heights, and font sizes are defined in pixels rather than in relative units like percents or ems and that there is very little attempt to implement responsive design. 

I won’t ask you to rebuild this CSS file to make it mobile-friendly, but thinking back to the unit on responsive design and design conventions for mobile maps, please write a paragraph in your lab-write up that includes five specific suggestions for how you would modify the CSS to make Leaflet Routing Machine mobile-friendly. 

### Deliverables
**Part 1**: 

Answer the following questions about three different routing plugins that can work with Leaflet.
1.	Title and maintainer of the plugin: 
2.	What are the main functionalities of the plugin? 
3.	When was the last commit pushed to the GitHub repo where the plugin can be downloaded? 
4.	Do the developers provide a working demo of the plugin?
5.	Based on the above information, how would you rank this in relation to the other two plugins you chose in terms of overall quality and usability? Justify your ranking. 

**Part 2**: 
* Include a link to the URL of the map you built in Part 2
* Explain how you modified your map to improve the discoverability of the waypoint creating affordance.

**Part 3**: 

Drawing on the unit on responsive design and design conventions for mobile maps (Week 2), write a paragraph that includes five specific suggestions for how you would modify the CSS to make Leaflet Routing Machine mobile-friendly.

