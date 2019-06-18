$("#buttonIniciarSesion").on("click", function () {
    var user = $("#inputUser").val()
    var pass = $("#inputPass").val()

    const uriLogin = "https://proyectofenix.herokuapp.com/validar"

    $.post(uriLogin, {
        user: user,
        pass: pass
    }).done(function (data) {
        if (data.encontrado == true) {
            sessionStorage.setItem("Berghain", data.usuario[0]._id)
            if (data.usuario[0].admin == true) {
                sessionStorage.setItem("admin", true)
            } else {
                sessionStorage.setItem("admin", false)
            }
            window.location.href = "./aplicacion.html"
        } else {
            alert("FAIL")
        }
    }).fail(function () {
        alert("Ha ocurrido un error")
    })
})
