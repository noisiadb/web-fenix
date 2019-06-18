if (sessionStorage.getItem("Berghain") == undefined
    || sessionStorage.getItem("Berghain") == "") {
    window.location.href = "./index.html"
}

/* Ocultamos todos los inputs, menos el de crear un usuario */
$("#tabla-usuarios tbody tr td input").hide()
$("#tabla-usuarios tbody tr:last td input").show()

var app = angular.module('myApp', []);
app.controller('loadGestion', function ($scope, $http) {

    const uriCargarZonas = "https://proyectofenix.herokuapp.com/mapa";
    const uriCargarUsuarios = "https://proyectofenix.herokuapp.com/usuarios";

    $scope.datosZonas = [];
    $scope.datosUsuarios = [];

    /* Function - Peticion API - Carga de zonas */
    function cargarZonas() {
        $http.get(uriCargarZonas)
            .then(function (response) {

                $scope.datosZonas = response.data.zonas
                console.log($scope.datosZonas)

            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            })
    }

    /* Funcion - Peticion API - Carga de Usuarios */
    function cargarUsuarios() {
        $http.get(uriCargarUsuarios)
            .then(function (response) {

                $scope.datosUsuarios = response.data.usuarios
                console.log($scope.datosUsuarios)

            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            })
    }

    /* Cargamos los usuarios y los guardamos en el $scope de usuarios */
    cargarUsuarios();
    /* Cargamos las zonas y los guardamos en el $scope de zonas */
    cargarZonas();

    /* Funcion para cancelar edicion registros */
    $scope.deleteRegistroUsuario = function (index) {
        $scope.datosUsuarios.splice(index, 1)
        console.log($scope.datosUsuarios)
    }

    /* Funcion para editar un registro */
    $scope.activarEdicionRegistroUsuarios = function (index) {

        $("#tabla-usuarios tbody tr:eq(" + index + ") td span").hide()
        $("#tabla-usuarios tbody tr:eq(" + index + ") td input").show()

    }

    $scope.actualizarUsuario = function (index) {

    }

    /* Funcion para actualizar la zona que estamos editando */
    $scope.actualizarZona = function (index) {

        /* Ventana de confirmación de actualización */
        var r = confirm("¿Desea actualizar la zona " + $scope.datosZonas[index].nombreZona + "?");
        if (r == true) {

            /* URL de la peticion de edicion */
            const urlEditarZona = "https://proyecto-mdc-api.herokuapp.com/zona/editar/" + $scope.datosZonas

            $http.put(urlEditarZona, {

            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })
        }
    }

    /* Vaciamos $scope de las matriculas */
    $scope.matriculasPendientes = [];

    setTimeout(function () {
        $http.post(uriCargar, {
            estado: "pendiente"
        }).then(function (response) {
            var matriculas;
            matriculas = response.data.matriculas
            $scope.matriculasPendientes = matriculas

            /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
            encuentran */
            angular.forEach($scope.matriculasPendientes, function (value, key) {

                /* Asigamos niveles */

                /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                es una matricula nueva */
                if (value.idUsuarioAsignado == ""
                    || value.idUsuarioAsignado == "x"
                    || value.idUsuarioAsignado == undefined) {
                    $scope.matriculasPendientes[key]['asignada'] = 'nueva'

                    /* Si el valor es igual al id del usuario logeado es una matricula
                    que tiene asignada */
                } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                    $scope.matriculasPendientes[key]['asignada'] = 'propia'

                    /* Entonces lo unico que queda darle el nivel de que esta asignada
                    a otro usuario del sistema diferente */
                } else {
                    $scope.matriculasPendientes[key]['asignada'] = 'yaAsignada'
                }
            });

            /* Matriculas */
            console.log($scope.matriculasPendientes);

            $(".divTablaPendientes").show()
            $("#divMatriculaVer").hide()

        }).catch(function (response) {
            console.error('Error', response.status, response.data);
        })
    }, 500)


});