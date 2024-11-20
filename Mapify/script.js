// Mapbox access token for authentication
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Request user's current location
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true, // Enable high accuracy for better location precision
});

// Function to initialize the map
function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: "map", // ID of the container where the map is rendered
    style: "mapbox://styles/mapbox/streets-v12", // Map style (streets)
    center: centerPosition, // Map center [longitude, latitude]
    zoom: 9, // Initial zoom level
  });

  // Map style switcher logic
  document.getElementById("streets").addEventListener("click", function () {
    map.setStyle("mapbox://styles/mapbox/streets-v11");
  });

  document.getElementById("satellite").addEventListener("click", function () {
    map.setStyle("mapbox://styles/mapbox/satellite-v9");
  });

  document.getElementById("dark").addEventListener("click", function () {
    map.setStyle("mapbox://styles/mapbox/dark-v11");
  });

  // Add search functionality to the map
  const searchControls = new MapboxGeocoder({
    accessToken: MAPBOX_ACCESS_TOKEN, // Access token for search
    mapboxgl: mapboxgl, // Reference to Mapbox GL JS
  });
  map.addControl(searchControls); // Add search control to the map

  // Add navigation controls (zoom in/out, compass)
  const navigationControls = new mapboxgl.NavigationControl();
  map.addControl(navigationControls);

  // Add directions control for route navigation
  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN, // Access token for directions
  });
  map.addControl(directionControls, "top-left"); // Position the directions control

  // Add a fullscreen button to the map
  const fullscreenControl = new mapboxgl.FullscreenControl();
  map.addControl(fullscreenControl);

  // Add a marker at the user's location or fallback location
  new mapboxgl.Marker().setLngLat(centerPosition).addTo(map);
}

// Function executed when location is successfully fetched
function successLocation(position) {
  console.log(position); // Log the position for debugging

  // Pass the user's location to setup the map
  setupMap([position.coords.longitude, position.coords.latitude]);
}

// Function executed if location fetching fails
function errorLocation() {
  // Fallback location (Manchester, UK)
  setupMap([-2.24, 53.48]);
}
