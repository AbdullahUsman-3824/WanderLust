// Parse coordinates string into an array
coordinates = JSON.parse("[" + coordinates + "]");

// Set Mapbox access token
mapboxgl.accessToken = mapToken;

// Initialize a new Mapbox map instance
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

// Add Fullscreen control to the map
map.addControl(new mapboxgl.FullscreenControl());

// Create a red marker at the specified coordinates
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates);

// Set a popup on the marker
marker.setPopup(
  new mapboxgl.Popup({ closeOnClick: false })
    .setText("Exact location will be shared after booking")
);

// Add the marker with popup to the map
marker.addTo(map);
