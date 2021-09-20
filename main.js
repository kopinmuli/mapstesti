var map = L.map('map', {
    center: [61.688, 27.27],
    zoom: 13,

});
const ROUTEARRAY = []
var NUMBER_OF_ROUTES = 0;
var mapLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {

    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYm9vdHRlZCIsImEiOiJja3RpYTh3MXQwenNzMm9udW5xOTRnOWMyIn0.YtJp-pc0wb_EoFBrZ-GHzQ'
}).addTo(map)



//    createMarker: function(i, wp, nWps) {return L.marker(wp.latLng).bindPopup('I\'m waypoint ' + i + nWps);}

function requestNominatimData(startPoint, endPoint) {
    let startPointdata;
    let endPointdata;
    console.log(startPoint, endPoint)
    const HTTP_REQUEST = [new XMLHttpRequest(), new XMLHttpRequest()]
    HTTP_REQUEST[0].onload = () => {
        let jsonDataForStartPoint = JSON.parse(HTTP_REQUEST[0].responseText)
        startPointdata = jsonDataForStartPoint
    }
    HTTP_REQUEST[1].onload = () =>{
        let jsonDataForEndPoint = JSON.parse(HTTP_REQUEST[1].responseText)
        endPointdata = jsonDataForEndPoint
        createInitialRoute(startPointdata[0], endPointdata[0])
    }
    

    HTTP_REQUEST[0].open('GET', 'https://nominatim.openstreetmap.org/search?city="' + startPoint + '"&format=json')
    HTTP_REQUEST[0].send()
    HTTP_REQUEST[1].open('GET', 'https://nominatim.openstreetmap.org/search?city="' + endPoint + '"&format=json')
    HTTP_REQUEST[1].send()
}

function createInitialRoute(startPoint, endPoint){
    ROUTEARRAY.push(L.Routing.control({

        show: false,
        geocoder: L.Control.Geocoder.nominatim(),
        createMarker: function(i = 0, wp, nWps) {return L.marker(wp.latLng).bindPopup('Reitin Alku: ' + startPoint.display_name.split(",")[0] + '<br> Reitti päättyy: ' + endPoint.display_name.split(",")[0]);},
        
    }).addTo(map))
    ROUTEARRAY[NUMBER_OF_ROUTES].setWaypoints([L.latLng(startPoint.lat, startPoint.lon), L.latLng(endPoint.lat, endPoint.lon)]).addTo(map)
    console.log(startPoint, endPoint)
    NUMBER_OF_ROUTES++;
}
