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
        var mymap = L.map('mapid').setView([data.zonas[0].Dispositivos[0].coordenadaXDispositivo,
        data.zonas[0].Dispositivos[0].coordenadaYDispositivo], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(mymap);

        setInterval(function () {
            //DISPOSITIVOS 
            var dispositivo

            for (var i = 0; i < data.zonas[0].Dispositivos.length; i++) {
                if (data.zonas[0].Dispositivos[i].estadoDispositivo == 1) {
                    dispositivo = L.marker([data.zonas[0].Dispositivos[i].coordenadaXDispositivo,
                    data.zonas[0].Dispositivos[i].coordenadaYDispositivo]).addTo(mymap);
                    dispositivo.bindPopup("Dispositivo " + i); //.openPopup(); ESTA FUNCIÓN ABRE UN POPUP CON EL MENSAJE.
                }
            }

            var aleatorio = numeroAleatorio(1, 18)
            var estadoDispositivoAleatorio = data.zonas[0].Dispositivos[aleatorio].estadoDispositivo
            if (estadoDispositivoAleatorio == 1) {
                estadoDispositivoAleatorio = 0
            } else {
                estadoDispositivoAleatorio = 1
            }

            var urlDispositivoAleatorizar = "https://proyectofenix.herokuapp.com/update"
            $.put(urlDispositivoAleatorizar, {
                dispositivoAleatorio : aleatorio,
                estadoDispositivoAleatorio : estadoDispositivoAleatorio
            })

        }, 5000);

        //   // DISPOSITIVO 1
        //   var dispositivo1 = L.marker([data.zonas[0].Dispositivos[0].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[0].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo1.bindPopup("Dispositivo 1"); //.openPopup(); ESTA FUNCIÓN ABRE UN POPUP CON EL MENSAJE.

        //   // DISPOSITIVO 2
        //   var dispositivo2 = L.marker([data.zonas[0].Dispositivos[1].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[1].coordenadaYDispositivo]).addTo(mymap); 
        //   dispositivo2.bindPopup("Dispositivo 2");

        //   //DISPOSITIVO 3
        //   var dispositivo3 = L.marker([data.zonas[0].Dispositivos[2].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[2].coordenadaYDispositivo]).addTo(mymap); 
        //   dispositivo3.bindPopup("Dispositivo 3");

        //   // DISPOSITIVO 4
        //   var dispositivo4 = L.marker([data.zonas[0].Dispositivos[3].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[3].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo4.bindPopup("Dispositivo 4");

        //   // DISPOSITIVO 5
        //   var dispositivo5 = L.marker([data.zonas[0].Dispositivos[4].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[4].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo5.bindPopup("Dispositivo 5");

        //   // DISPOSITIVO 6
        //   var dispositivo6 = L.marker([data.zonas[0].Dispositivos[5].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[5].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo6.bindPopup("Dispositivo 6");

        //   // DISPOSITIVO 7
        //   var dispositivo7 = L.marker([data.zonas[0].Dispositivos[6].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[6].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo7.bindPopup("Dispositivo 7");

        //   // DISPOSITIVO 8
        //   var dispositivo8 = L.marker([data.zonas[0].Dispositivos[7].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[7].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo8.bindPopup("Dispositivo 8");

        //   // DISPOSITIVO 9
        //   var dispositivo9 = L.marker([data.zonas[0].Dispositivos[8].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[8].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo9.bindPopup("Dispositivo 9");

        //    // DISPOSITIVO 10
        //    var dispositivo10 = L.marker([data.zonas[0].Dispositivos[9].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[9].coordenadaYDispositivo]).addTo(mymap);
        //    dispositivo10.bindPopup("Dispositivo 10");

        //     // DISPOSITIVO 11
        //   var dispositivo11 = L.marker([data.zonas[0].Dispositivos[10].coordenadaXDispositivo, 
        //     data.zonas[0].Dispositivos[10].coordenadaYDispositivo]).addTo(mymap);
        //   dispositivo11.bindPopup("Dispositivo 11");

        //     // DISPOSITIVO 12
        //     var dispositivo12 = L.marker([data.zonas[0].Dispositivos[11].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[11].coordenadaYDispositivo]).addTo(mymap);
        //     dispositivo12.bindPopup("Dispositivo 12");

        //     // DISPOSITIVO 13
        //     var dispositivo13 = L.marker([data.zonas[0].Dispositivos[12].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[12].coordenadaYDispositivo]).addTo(mymap);
        //     dispositivo13.bindPopup("Dispositivo 13");

        //     // DISPOSITIVO 14
        //     var dispositivo14 = L.marker([data.zonas[0].Dispositivos[13].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[13].coordenadaYDispositivo]).addTo(mymap);
        //     dispositivo14.bindPopup("Dispositivo 14");

        //     // DISPOSITIVO 15
        //     var dispositivo15 = L.marker([data.zonas[0].Dispositivos[14].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[14].coordenadaYDispositivo]).addTo(mymap);
        //     dispositivo15.bindPopup("Dispositivo 15");

        //     // DISPOSITIVO 16
        //     var dispositivo16 = L.marker([data.zonas[0].Dispositivos[15].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[15].coordenadaYDispositivo]).addTo(mymap);
        //     dispositivo16.bindPopup("Dispositivo 16");

        //     // DISPOSITIVO 17
        //     var dispositivo17 = L.marker([data.zonas[0].Dispositivos[16].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[16].coordenadaYDispositivo]).addTo(mymap);
        //     dispositivo17.bindPopup("Dispositivo 17");

        //      // DISPOSITIVO 18
        //      var dispositivo18 = L.marker([data.zonas[0].Dispositivos[17].coordenadaXDispositivo, 
        //         data.zonas[0].Dispositivos[17].coordenadaYDispositivo]).addTo(mymap);
        //      dispositivo18.bindPopup("Dispositivo 18");



    }).fail(function () {
        alert("Ha ocurrido un error")
    })