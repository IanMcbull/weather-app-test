mapboxgl.accessToken = 'pk.eyJ1IjoiaWFubXVnZW55YSIsImEiOiJja2s2bWluZWswNWYzMm9wYmNpMjNnejI1In0.yV-AIxNvNkzay7hgcYjoXw';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});