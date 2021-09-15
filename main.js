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
    console.log(coords)
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.onload = function() {
        var jsondata = JSON.parse(ajaxrequest.response)
        console.log(jsondata)
    }
    ajaxrequest.open("GET", 'https://nominatim.openstreetmap.org/search?query={lat:' + coords.lat + ', lon:' + coords.lng + '}&format=json')
    ajaxrequest.send()
})

var startCoords;
var endCoords;

var startwaypoints = [];

function setRoute() {
    let start = document.getElementById('coordinputStart').value
    let end = document.getElementById('coordinputDestination').value

    var ajaxRequeststart = new XMLHttpRequest();
    ajaxRequeststart.onload = function() {
        startPoint = JSON.parse(ajaxRequeststart.response)
        startCoords = [startPoint[0].lat, startPoint[0].lon]
        startwaypoints.push(startCoords)
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
        startwaypoints.push(endCoords)
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

var newwaypoints = []
var test;

function addWayPoint() {
    let waypoint = document.getElementById('addwaypoint').value
    var ajaxRequestWayPoint = new XMLHttpRequest();
    ajaxRequestWayPoint.onload = function() {
        var waypointjson = JSON.parse(ajaxRequestWayPoint.response)
        console.log(waypointjson)
        if (document.getElementById('searchParameter').value == 'postal') {
            for (let i = 0; i < waypointjson.length; i++) {
                if (waypointjson[i].display_name.includes('Suomi')) {
                    waypointjson = waypointjson[i]
                    break
                }
            }
            waypointcoords = { lat: parseFloat(waypointjson.lat), lng: parseFloat(waypointjson.lon) }
            newwaypoints.push([waypointcoords.lat, waypointcoords.lng])
            newwaypoints.sort(function(a, b) {
                if (startwaypoints[0][0] > startwaypoints[startwaypoints.length - 1][0]) {

                    console.log(a, b)
                    if (a[0] > b[0] && a[1] > b[1]) return a[0] - b[0]
                    else return a[1] - b[1]
                } else {
                    console.log(a, b)
                    if (b[0] > a[0] && b[1] > a[1]) return b[0] - a[0]
                    return b[1] - a[1]
                }

            })
            for (let i = 0; i < newwaypoints.length; i++) {
                startwaypoints.splice(1, 0, newwaypoints[i])
            }


        }
        if (document.getElementById('searchParameter').value == 'city') {
            waypointcoords = { lat: parseFloat(waypointjson[0].lat), lng: parseFloat(waypointjson[0].lon) }
            newwaypoints.push([waypointcoords.lat, waypointcoords.lng])
            newwaypoints.sort(function(a, b) {
                if (startwaypoints[0][0] > startwaypoints[startwaypoints.length - 1][0]) {

                    console.log(a, b)
                    if (a[0] > b[0] && a[1] > b[1]) return a[0] - b[0]
                    else return a[1] - b[1]
                } else {
                    console.log(a, b)
                    if (b[0] > a[0] && b[1] > a[1]) return b[0] - a[0]
                    return b[1] - a[1]
                }

            })
            for (let i = 0; i < newwaypoints.length; i++) {
                startwaypoints.splice(1, 0, newwaypoints[i])
            }


        }
        if (document.getElementById('searchParameter').value == 'street') {

        }
        routecontrol.setWaypoints(startwaypoints)

        startwaypoints = [startCoords, endCoords]

    }
    if (document.getElementById('searchParameter').value == 'city') {
        ajaxRequestWayPoint.open('GET', 'https://nominatim.openstreetmap.org/search?city=' + waypoint + '&format=json')
    } else if (document.getElementById('searchParameter').value == 'postal') {
        ajaxRequestWayPoint.open('GET', 'https://nominatim.openstreetmap.org/search?postalcode=' + waypoint + '&format=json')
    } else {
        ajaxRequestWayPoint.open('GET', 'https://nominatim.openstreetmap.org/search?street=' + waypoint + '&format=json')

    }
    ajaxRequestWayPoint.send()
}