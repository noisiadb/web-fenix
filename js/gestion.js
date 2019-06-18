if (sessionStorage.getItem("Berghain") == undefined
    || sessionStorage.getItem("Berghain") == "") {
    window.location.href = "./index.html"
}

var app = angular.module('myApp', []);
app.controller('loadIncendios', function ($scope, $http) {

    const uriCargar = "https://proyectofenix.herokuapp.com/mapa"
    const uriCargar = "https://proyectofenix.herokuapp.com/usuarios"
    $scope.datosHistorialIncendio = [];

    console.log("Estoy dentro");

    $http.get(uriCargar)
        .then(function (response) {

            $scope.datosHistorialIncendio = response.data.zonas[0].Incendios
            console.log($scope.datosHistorialIncendio)


        }).catch(function (response) {
            console.error('Error', response.status, response.data);
        })

});