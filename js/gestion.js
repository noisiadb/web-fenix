if (sessionStorage.getItem("Berghain") == undefined
    || sessionStorage.getItem("Berghain") == "") {
    window.location.href = "./index.html"
}

/* Ocultamos todos los inputs, menos el de crear un usuario */
$("#tabla-usuarios tbody tr td input").hide()
$("#tabla-usuarios tbody tr:first td input").show()

/* Ocultamos todos los inputs, menos el de crear un usuario */
$("#tabla-zonas tbody tr td input").hide()
$("#tabla-zonas tbody tr:first td input").show()

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
                angular.forEach($scope.datosUsuarios, function (value, key) {
                    $scope.datosUsuarios[key]['editando'] = true
                });
                console.log($scope.datosUsuarios)

            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            })
    }

    /* Cargamos los usuarios y los guardamos en el $scope de usuarios */
    cargarUsuarios();
    /* Cargamos las zonas y los guardamos en el $scope de zonas */
    cargarZonas();

    /* Funcion para cancelar edicion registros de Usuarios */
    $scope.cancelarRegistroUsuario = function (index) {

        $scope.datosUsuarios[index].editando = true

        $("#tabla-usuarios tbody tr td input").hide()
        $("#tabla-usuarios tbody tr:first td input").show()
        $("#tabla-usuarios tbody tr td span").show()

        $("#tabla-usuarios tbody tr:eq(" + (index + 1) + ") td span").show()
    }

    /* Funcion para cancelar edicion registros de Zonas */
    $scope.cancelarRegistroZonas = function (index) {

        $("#tabla-zonas tbody tr td input").hide()
        $("#tabla-zonas tbody tr:first td input").show()
        $("#tabla-zonas tbody tr td span").show()

        $("#tabla-zonas tbody tr:eq(" + (index + 1) + ") td span").show()
    }

    /* Funcion para activar la edicion de un registro de Usuarios */
    $scope.activarEdicionRegistroUsuarios = function (index) {

        angular.forEach($scope.datosUsuarios, function (value, key) {
            $scope.datosUsuarios[key]['editando'] = true
        });

        $scope.datosUsuarios[index].editando = false

        $("#tabla-usuarios tbody tr td input").hide()
        $("#tabla-usuarios tbody tr:first td input").show()
        $("#tabla-usuarios tbody tr td span").show()

        $("#tabla-usuarios tbody tr:eq(" + (index + 1) + ") td span").hide()
        $("#tabla-usuarios tbody tr:eq(" + (index + 1) + ") td input").show()

    }

    /* Funcion para activar la edicion de un registro de Zonas */
    $scope.activarEdicionRegistroZonas = function (index) {

        $("#tabla-zonas tbody tr td input").hide()
        $("#tabla-zonas tbody tr:first td input").show()
        $("#tabla-zonas tbody tr td span").show()

        $("#tabla-zonas tbody tr:eq(" + (index + 1) + ") td span").hide()
        $("#tabla-zonas tbody tr:eq(" + (index + 1) + ") td input").show()

    }

    /* Funcion para crear un usuario */
    $scope.crearUsuario = function (index) {

        var userAdd = $scope.userAdd
        var passAdd = $scope.passAdd
        var adminAdd = $scope.adminAdd

        console.log(userAdd);
        console.log(passAdd);
        console.log(adminAdd);

        if (userAdd == "" || userAdd == undefined ||
            passAdd == "" || passAdd == undefined ||
            adminAdd == "" || adminAdd == undefined) {

            alert("Faltan campos por introducir")

        } else if (adminAdd == "true" || adminAdd == "false") {

            var r = confirm("Va a crear un nuevo usuario, ¿esta seguro?");
            if (r == true) {
                /* URL de la peticion - creacion de usuario */
                const urlCrearUsuario = "https://proyectofenix.herokuapp.com/usuarios/crear"

                /* Peticion API - Para crear un usuario nuevo */
                $http.post(urlCrearUsuario, {
                    user: userAdd,
                    pass: passAdd,
                    admin: adminAdd
                }).then(function (response) {
                    console.log(response.data);
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })

                /* Recargamos la tabla */
                setTimeout(function () {
                    cargarUsuarios();
                }, 1000)
            }
        } else {
            alert("El campo de admin tiene que ser true o false")
        }
    }

    /* Función delete a un usuario */
    $scope.deleteUsuario = function (index) {

        var r = confirm("¿Esta seguro que quiere borrar este usuario?");
        if (r == true) {
            const urlDeleteUsuario = "https://proyectofenix.herokuapp.com/usuarios/delete/" + $scope.datosUsuarios[index]._id

            $http.delete(urlDeleteUsuario)
                .then(function (response) {
                    console.log(response.data)
                    $scope.datosUsuarios.splice(index, 1)
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })

            setTimeout(function () {
                cargarUsuarios()
            }, 1000)
        }
    }

    /* Funcion de actualizar un usuario */
    $scope.actualizarUsuario = function (index) {
        var r = confirm("¿Esta seguro que quiere actualizar este usuario?");
        if (r == true) {

            const urlUpdateUsuario = "https://proyectofenix.herokuapp.com/usuarios/update/" + $scope.datosUsuarios[index]._id

            var userUpdate = $scope.datosUsuarios[index].user
            var passUpdate = $scope.datosUsuarios[index].pass
            var adminUpdate = $scope.datosUsuarios[index].admin

            console.log(userUpdate);
            console.log(passUpdate);
            console.log(adminUpdate);

            $http.put(urlUpdateUsuario, {
                user: userUpdate,
                pass: passUpdate,
                admin: adminUpdate
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.error('Error', response.status, response.data);
            })

            setTimeout(function () {
                cargarUsuarios()
            }, 1000)
        }
    }

    /* Funcion para actualizar la zona que estamos editando */
    $scope.actualizarZona = function (index) {

        /* Ventana de confirmación de actualización */
        var r = confirm("¿Desea actualizar la zona "
            + $scope.datosZonas[index].nombreZona + "?");
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

});