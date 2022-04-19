//obtain users location
async function getCoords(){
 pos = await new Promise((resolve, reject) => {
     navigator.geolocation.getCurrentPosition(resolve, reject)
 })
 return [pos.coords.latitude, pos.coords.longitude]
}


// created map that centers on users location
(async () => {
 let userLocation = await getCoords()
 console.log(userLocation)
 let myMap = L.map('map').setView(userLocation, 15);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(myMap);
let userMarker = L.marker(userLocation).addTo(myMap)
let userPopup= L.popup()
 .setLatLng(userLocation)
 .setContent('<p>You are Here</p>')
 .openOn(myMap)


})();


console.log(getCoords());

//finding 5 nearest businesses of a specific type