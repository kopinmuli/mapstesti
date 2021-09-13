var map = L.map('mapid').setView([65.449,25.566], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);
  