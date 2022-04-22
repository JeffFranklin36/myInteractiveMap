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
 const results = await foursquare('13032')
 const markers = addMarkers(results)
 L.layerGroup(markers).addTo(myMap)
})();


console.log(getCoords());

//foursquare api code
async function foursquare(business){
  let userLocation = await getCoords()
  let coordsString = `${userLocation[0]},${userLocation[1]}`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq38E/GAmehKsjYRAvk3pKPu85GCIj2dCva6yRixLRBZtk='
    }
  };
  let response = await fetch(`https://api.foursquare.com/v3/places/search?radius=100000&limit=5&ll=${coordsString}&categories${business}`, options)
  let data = await response.json()
  let markers = data.results.map((x)=>{
    return {geocode: [x.geocodes.main.latitude, x.geocodes.main.longitude], name: x.name}
  })
  return markers
  }


    // .then(response => {
    //  response.json()
    // })
    // .then(data => {console.log(data.results)})
    // .catch(err => console.error(err));


//Add FourSquare Markers:
function addMarkers(results){
  return results.map(x => L.marker(x.geocode).bindPopup(x.name))
}





// foursquare API Key DO NOT DELETE fsq38E/GAmehKsjYRAvk3pKPu85GCIj2dCva6yRixLRBZtk=
