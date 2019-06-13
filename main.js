window.addEventListener("load", function()
{

  var coordenadas = 0;
  console.log(coordenadas);

  $.get('http://localhost:3000/json', function(res) 
  {
    var coordenadas = res.split(",");
    console.log(coordenadas[0]);
    console.log(res);

  //var mymap = L.map('mapid').setView([51.505, -0.09], 13); 
  var mymap = L.map('mapid').setView([coordenadas[0],coordenadas[1]], 13);
        
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(mymap);
  
  // DISPOSITIVO 1
  var dispositivo1 = L.marker([coordenadas[0],coordenadas[1]]).addTo(mymap);
  dispositivo1.bindPopup("Dispositivo 1"); //.openPopup(); ESTA FUNCIÓN ABRE UN POPUP CON EL MENSAJE.

  // DISPOSITIVO 2
  var dispositivo2 = L.marker([37.0497849,-6.4564193]).addTo(mymap); 
  dispositivo2.bindPopup("Dispositivo 2");

  //DISPOSITIVO 3
  var dispositivo3 = L.marker([37.0376933,-6.4247049]).addTo(mymap); 
  dispositivo3.bindPopup("Dispositivo 3");

  // DISPOSITIVO 4
  var dispositivo4 = L.marker([37.0569774,-6.4790786]).addTo(mymap);
  dispositivo4.bindPopup("Dispositivo 4");

  // DISPOSITIVO 5
  var dispositivo5 = L.marker([37.0682099,-6.5007079]).addTo(mymap);
  dispositivo5.bindPopup("Dispositivo 5");

  // DISPOSITIVO 6
  var dispositivo6 = L.marker([37.0445786,-6.4395965]).addTo(mymap);
  dispositivo6.bindPopup("Dispositivo 6");

  // DISPOSITIVO 7
  var dispositivo7 = L.marker([37.0799885,-6.5261138]).addTo(mymap);
  dispositivo7.bindPopup("Dispositivo 7");

  // DISPOSITIVO 8
  var dispositivo8 = L.marker([37.0523195,-6.5137542]).addTo(mymap);
  dispositivo8.bindPopup("Dispositivo 8");

  // DISPOSITIVO 9
  var dispositivo9 = L.marker([37.0419067,-6.4890350]).addTo(mymap);
  dispositivo9.bindPopup("Dispositivo 9");

   // DISPOSITIVO 10
   var dispositivo10 = L.marker([37.0323148,-6.4691222]).addTo(mymap);
   dispositivo10.bindPopup("Dispositivo 10");

    // DISPOSITIVO 11
  var dispositivo11 = L.marker([37.0243662,-6.4522994]).addTo(mymap);
  dispositivo11.bindPopup("Dispositivo 11");

    // DISPOSITIVO 12
    var dispositivo12 = L.marker([37.0169651,-6.4382232]).addTo(mymap);
    dispositivo12.bindPopup("Dispositivo 12");

    // DISPOSITIVO 13
    var dispositivo13 = L.marker([37.0007898,-6.4509261]).addTo(mymap);
    dispositivo13.bindPopup("Dispositivo 13");

    // DISPOSITIVO 14
    var dispositivo14 = L.marker([37.0169651,-6.4382232]).addTo(mymap);
    dispositivo14.bindPopup("Dispositivo 14");

    // DISPOSITIVO 15
    var dispositivo15 = L.marker([37.0169651,-6.4382232]).addTo(mymap);
    dispositivo15.bindPopup("Dispositivo 15");


  var circle = L.circle([coordenadas[0],coordenadas[1]], 
    {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 2000
  }).addTo(mymap);
  circle.bindPopup("¡FUEGO!").openPopup();

  /* ESTE ES EL OTRO TIPO DE MAPA.

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-0.09, 51.5]),
      zoom: 4
    })
  }); */
  })
})