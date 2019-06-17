if (sessionStorage.getItem("Berghain") == undefined
    || sessionStorage.getItem("Berghain") == "") {
    window.location.href = "./index.html"
}

const uriZonas = "https://proyectofenix.herokuapp.com/mapa"

/* Peticion de las zonas de incendio */
$.get(uriZonas)
    .done(function (data) {
        console.log(data)

        //var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        var mymap = L.map('mapid').setView([data.zonas[0].Dispositivos[0].coordenadaXDispositivo, data.zonas[0].Dispositivos[0].coordenadaYDispositivo], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(mymap);

        

    }).fail(function () {
        alert("Ha ocurrido un error")
    })