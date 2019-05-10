let mapz = L.map('mapid').setView([54.40135,24.05474], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZWxlbjIiLCJhIjoiY2p2Nms2Y2JzMDBxZjRmcGZvdTllOXF0eiJ9.IMiGn8FUOUT4sj0vmb1Myw'
}).addTo(mapz);

let bridgeMarker = L.marker([54.40135,24.05474])
  .addTo(mapz);

let bridgePolygon = L.polygon([
  [54.40096,24.05404],
  [54.40097,24.05402],
  [54.40168,24.05542],
  [54.40167,24.05546]
]).addTo(mapz);

bridgeMarker.bindPopup("Im a bridge !").openPopup();
bridgePolygon.bindPopup("Im a bridge, but as a Polygon !")

let popupFloat = L.popup();

function onMapClick(e) {
  popupFloat
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mapz);
}

mapz.on('click', onMapClick);

function onMarkerClick(e) {
  document.location.href="bridge.html";
}

bridgeMarker.on('click', onMarkerClick);
