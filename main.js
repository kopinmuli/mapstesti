var map = L.map('mapid').setView([65.449,25.566], 4);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=J85hOuGW9yvZDxdg9l0Q', {
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map);

   
    L.Routing.control({
        waypoints: [
            L.latLng(61.688728, 27.272146),
            L.latLng(60.169857, 24.938379)
        ],
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
    }).addTo(map);
  