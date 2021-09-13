const pyynto = new XMLHttpRequest();

pyynto.onload = function() {
    data = JSON.parse(this.responseText);
console.log("vastaus saatu!");
}
pyynto.open("GET", ("https://nominatim.openstreetmap.org/search?city=")+kaupunki2+("&format=json"));
pyynto.send();



var map = L.map('mapid').setView([65.449,25.566], 4);
var kaupunki1 = "mikkeli";
var kaupunki2 = "helsinki";

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:"© OpenStreetMapin tekijät",
    }).addTo(map);

   
    L.Routing.control({
        waypoints: [
            L.latLng(61.688728, 27.272146),
            L.latLng(60.169857, 24.938379)
        ],
        show: false,
        //addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
    }).addTo(map);
  

