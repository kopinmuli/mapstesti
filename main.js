const pyynto = new XMLHttpRequest();
var kaupunki1 = "tampere";
var kaupunki2 = "helsinki";
var kayttajanimi = "motoriikkamiikka";
var kaupunki1lat;
var kaupunki1lon;
var map = L.map('mapid').setView([65.449,25.566], 4);
var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  var goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });



pyynto.onload = function() {
    var data = JSON.parse(this.responseText);
    var latlng = [data[0].lat, data[0].lon];
    kaupunki1lat = data[0].lat;
    kaupunki1lon = data[0].lon;
    L.control.fullscreen().addTo(map);
    
    L.Routing.control({
        createMarker: function(i, wp, nWps) {
            return L.marker(wp.latLng).bindPopup("Reitti alkaa: " + kaupunki1 + "<br>Päättyy: " + kaupunki2 + "<br>30.06.2022, lähtö klo 8.00 <br>Kyydin luoja:<div id=kayttajanimi>" + kayttajanimi + "</div>Puhelin:<br><button id='kakkanappi' onclick='poistaReitti(index)'>POISTA</button>");
        },
        waypoints: [
            L.latLng(kaupunki1lat, kaupunki1lon),
            L.latLng(60.169857, 24.938379)
        ],
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        
        }).addTo(map);
}



pyynto.open("GET", ("https://nominatim.openstreetmap.org/search?city=")+kaupunki1+("&format=json"));
pyynto.send();









L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:"© OpenStreetMapin tekijät",
    }).addTo(map);



   
    
 map.locate({setView: true, maxZoom: 16});

 function onLocationFound(e) {
    L.marker(e.latlng, {icon: greenIcon}).addTo(map)
        .bindPopup("Olet tässä!").openPopup();
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);




L.Routing.control({
    createMarker: function(i, wp, nWps) {
        return L.marker(wp.latLng)
            .bindPopup('Reitti sieltä sinne, 30.06.2022, lähtö klo 8.00');
    },
    waypoints: [
        L.latLng(60.769857, 24.758379),
        L.latLng(60.369857, 24.538379)
    ],
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    routeWhileDragging: false,
    }).addTo(map);

