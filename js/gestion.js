if (sessionStorage.getItem("Berghain") == undefined
    || sessionStorage.getItem("Berghain") == "") {
    window.location.href = "./index.html"
}

var app = angular.module('myApp', []);
app.controller('loadGestion', function ($scope, $http) {

    const uriCargarZonas = "https://proyectofenix.herokuapp.com/mapa";
    const uriCargarUsuarios = "https://proyectofenix.herokuapp.com/usuarios";

    $scope.datosZonas = [];
    $scope.datosUsuarios = [];

    /* Peticion API - Carga de zonas */
    $http.get(uriCargarZonas)
        .then(function (response) {

            $scope.datosZonas = response.data.zonas
            console.log($scope.datosZonas)

        }).catch(function (response) {
            console.error('Error', response.status, response.data);
        })

    /* Peticion API - Carga de Usuarios */
    $http.get(uriCargarUsuarios)
        .then(function (response) {

            $scope.datosUsuarios = response.data.usuarios
            console.log($scope.datosUsuarios)

        }).catch(function (response) {
            console.error('Error', response.status, response.data);
        })

    /* Funcion para cancelar edicion registros */
    $scope.deleteRegistroUsuario = function (index) {
        $scope.datosUsuarios.splice(index, 1)
        console.log($scope.datosUsuarios)
    }

});