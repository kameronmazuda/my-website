
//  ## MAP ##
const map = L.map('map').setView([0,0], 0);
// icon for marker
const myIcon = L.icon({
    iconUrl: 'International_Space_Station.svg.png',
    iconSize: [64, 40.4],
});
// marker
const marker = L.marker([0, 0], {icon: myIcon}).addTo(map);
// add tiles to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

//api
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
//get data
async function getISS(firstTime = false) {
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude} = data;
    // location of a iss as a marker
    marker.setLatLng([latitude,longitude])
    if(firstTime) map.setView([latitude, longitude], 4);
}
getISS(true);

setInterval(getISS, 1000);