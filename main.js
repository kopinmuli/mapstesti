var map = L.map('map', {
    center: [61.688, 27.27],
    zoom: 13,

});

var mapLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {

    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYm9vdHRlZCIsImEiOiJja3RpYTh3MXQwenNzMm9udW5xOTRnOWMyIn0.YtJp-pc0wb_EoFBrZ-GHzQ'
}).addTo(map)

var routecontrol = L.Routing.control({

    show: false,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map)

map.on('click', (e) => {
    coords = e.latlng
    console.log(coords.lat, coords.lng)
})

map.on('doubleclick', (e) => {
    coords = e.latlng
    L.marker(coords, 'icon').addTo(map)
})
var startCoords;
var endCoords;


function setRoute() {
    let start = document.getElementById('coordinputStart').value
    let end = document.getElementById('coordinputDestination').value

    var ajaxRequeststart = new XMLHttpRequest();
    ajaxRequeststart.onload = function() {
        startPoint = JSON.parse(ajaxRequeststart.response)
        startCoords = [startPoint[0].lat, startPoint[0].lon]
        console.log(startCoords)
    }
    ajaxRequeststart.open("GET", 'https://nominatim.openstreetmap.org/search?city=' + start + '&format=json')
    ajaxRequeststart.send()
        // + '&format=json'
    var ajaxRequestend = new XMLHttpRequest();
    ajaxRequestend.onload = function() {
        endPoint = JSON.parse(ajaxRequestend.response)
        endCoords = [endPoint[0].lat, endPoint[0].lon]
        console.log(endCoords)
        addroute()
    }
    ajaxRequestend.open("GET", 'https://nominatim.openstreetmap.org/search?city=' + end + '&format=json')
    ajaxRequestend.send()

}

function addroute() {
    routecontrol.setWaypoints([
        L.latLng(startCoords),
        L.latLng(endCoords)
    ])

    console.log(routecontrol.getWaypoints())
}
var waypointcoords;
var startwaypoints = []
var newwaypoints = []

function addWayPoint() {
    let waypoint = document.getElementById('addwaypoint').value
    var ajaxRequestWayPoint = new XMLHttpRequest();
    ajaxRequestWayPoint.onload = function() {
        var waypointjson = JSON.parse(ajaxRequestWayPoint.response)
        console.log(waypointjson)
        waypointcoords = { lat: parseFloat(waypointjson[0].lat), lng: parseFloat(waypointjson[0].lon) }
        for (let i = 0; i < routecontrol.getWaypoints().length; i++) {
            startwaypoints.push({ lat: routecontrol.getWaypoints()[i].latLng["lat"], lng: routecontrol.getWaypoints()[i].latLng["lng"] })
        }

        startwaypoints.splice(startwaypoints.length / 2, 0, waypointcoords)

        console.log(startwaypoints)
        startwaypoints.sort(function(firstEl, lastEl) {
            firstEl = startwaypoints[0]
            lastEl = startwaypoints[startwaypoints.length - 1]
            if (firstEl.lat > lastEl.lat) {
                return firstEl.lat - lastEl.lat
            }
            if (firstEl.lat < lastEl.lat) {
                return lastEl.lat - firstEl.lat
            }
        });
        routecontrol.setWaypoints(startwaypoints)
        startwaypoints = []


    }
    ajaxRequestWayPoint.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + waypoint + '&format=json')
    ajaxRequestWayPoint.send()
}