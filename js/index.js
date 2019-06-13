$("#buttonIniciarSesion").on("click", function () {
    var user = $("#inputUser").val()
    var pass = $("#inputPass").val()

    const uriLogin = "https://proyectofenix.herokuapp.com/validar"

    $.post(uriLogin, {
        user: user,
        pass: pass
    }).done(function (data) {
        if (data.encontrado == true) {
            alert("CORERECTUS")
            sessionStorage.setItem("Berghain", data.usuario[0]._id)
            window.location.href = "./historial.html"
        } else {
            alert("FAIL")
        }
    }).fail(function () {
        alert("Ha ocurrido un error")
    })
})