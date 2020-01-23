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
    id: 'mapbox/streets-v11',
    accessToken: 'yourAccessTokenGoesHere',
}).addTo(map);
```
You should now have an HTML page that loads a Leaflet map centered on the South Sound. Next let's add links to the CSS and JS files we need in order to initialize the routing plugin. In the 'Getting Started' section of the [Leaflet Routing Machine homepage](http://www.liedman.net/leaflet-routing-machine), you can find links to where the necessary CSS and JS files are accessible via unpkg.com. Copy those links into the `<head>` of your index. 

Then, under the section of code that intiliazes your map in your scripts.js file, add the following code to initialize the routing plugin:
```javascript
      var control = L.Routing.control({
          waypoints: [
              L.latLng(47.246587, -122.438830),
              L.latLng(47.318017, -122.542970)
          ],
      }).addTo(map);
```
Save your work and preview in a browser. You should see a map with markers at either end of a route and directions from Pinkerton Hall to Point Defiance. Try adding a third point at latitude and longitude 47.258024,  -122.444725. Aha, now you can get baked goods at Corina Bakery on the way to the park.
#### Step 3: Modifying options for the routing control

