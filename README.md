<h1>Lab 1: Geolocation and mobile optimization with Leaflet</h1>
<h2> TGIS 504, Winter 2020, Dr. Emma Slager</h2>
<h4>Introduction</h4>
<p>In this lab, you will practice making web maps that recognize and design for both the unique constraints of mobile devices and their unique affordances. You will create a map that places a marker on the map based on the locational information provided by the user's device, include signifiers that indicate to the user the accuracy of their device's locational information, add functionality that switches the base map between light and dark based on whether the sun is up at the user's location, and utilize various other design conventions that optimize mobile map use. This lab also asks you to read relevant documentation on the technologies used and to answer a few questions about that documentation in order to assess your understanding of its contents.</p>
<p>This lab is based on the tutorial <a href="https://leafletjs.com/examples/mobile/" target="_blank">Leaflet on Mobile</a>, with modifications and additions by myself. </p>
<h4>Set up your workspace</h4>
<p>Begin by downloading the zipped folder of lab templates. This should contain an index.html, javascript.js, and styles.css file. Extract the files and save them to your workspace, making sure to set up an appropriate folder structure for the new term's work. Open the files in Atom or the text editor of your choice. Eventually, you will upload the files to GitHub or your UW server space, so you may wish to create a repository for your files now, which also provides the benefit of serving as a backup for your work. As always, I recommend saving your work frequently and testing it regularly using atom-live-server or a similar Atom package. We will not be using any geojson files in this lab, so you won't have cross-origin issues and local testing will therefore also be effective.</p>
``` javascript
window.onload = function(){
alert('This page will request your location in order to display your location on a map. We do not store your location information or do anything with it besides display this map.');
} //Modify the text that appears in the alert window to explain that the page will ask permission to access the user's location and explain why it will do so.
```
