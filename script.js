// Create a map


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
 let myMap = L.map('map').setView(userLocation, 13);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(myMap);
})();


console.log(getCoords());



// Get the user's coordinates: 
// let userLocation = getCoords().then(userLocation => userLocation.pos)
// console.log(userLocation)
// let lat = getCoords().then(lat => userLocation[0])
// let long = getCoords().then(long => userLocation.pos.longitude)

//creste a map centered on users location

//finding 5 nearest businesses of a specific type