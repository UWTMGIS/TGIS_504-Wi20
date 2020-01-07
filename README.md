# Lab 1: Geolocation and mobile optimization with Leaflet
## TGIS 504, Winter 2020, Dr. Emma Slager
### Introduction
In this lab, you will practice making web maps that recognize and design for both the unique constraints of mobile devices and their unique affordances. You will create a map that places a marker on the map based on the locational information provided by the user's device, include signifiers that indicate to the user the accuracy of their device's locational information, add functionality that switches the base map between light and dark based on whether the sun is up at the user's location, and utilize various other design conventions that optimize mobile map use. This lab also asks you to read relevant documentation on the technologies used and to answer a few questions about that documentation in order to assess your understanding of its contents.

This lab is based on the tutorial [Leaflet on Mobile](https://leafletjs.com/examples/mobile), with modifications and additions by myself. 
### Set up your workspace
Begin by downloading the zipped folder of lab templates. This should contain an index.html, javascript.js, and styles.css file. Extract the files and save them to your workspace, making sure to set up an appropriate folder structure for the new term's work. Open the files in Atom or the text editor of your choice. Eventually, you will upload the files to GitHub or your UW server space, so you may wish to create a repository for your files now, which also provides the benefit of serving as a backup for your work. As always, I recommend saving your work frequently and testing it regularly using atom-live-server or a similar Atom package. We will not be using any geojson files in this lab, so you won't have cross-origin issues and local testing will therefore also be possible.

### Step 1: Set up the page and initialize the map
In your index.html file, add the necessary links to Leaflet's CSS and JS libraries to the `head`. I recommend using a CDN rather than locally hosting the libraries: 
 ``` html
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  ```
 In the `body` of the index, create a `div` element to hold the map. 
  ``` html
  <div id="map"></div>
  ```
  
