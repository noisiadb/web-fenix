if (sessionStorage.getItem("Berghain") == undefined
    || sessionStorage.getItem("Berghain") == "") {
    window.location.href = "./index.html"
}


// Angular, peticion API
var app = angular.module('myApp', ['ngStorage']);
app.controller('loadMatriculasPendientes', function ($scope, $localStorage, $http) {
    
    const uriCargar = "https://proyectofenix.herokuapp.com/validar"
    $scope.datosHistorial = [];

    $http.post(uriCargar).then(function (response) {
        var historial;
        $scope.historial = response.data.historial
        $scope.datosHistorial = historial

        angular.forEach($scope.datosHistorial, function (value, key) {

            if (value.idLugarIncendio == ""
                || value.coordenadaXIncendio == ""
                || value.coordenadaYIncendio == "") {
                $scope.datosHistorial[key]['asignada'] = 'nueva'
        }else {

                $scope.datosHistorial[key]['asignada'] = 'yaAsignada'
            }
        });
        console.log($scope.datosHistorial);

    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

});
