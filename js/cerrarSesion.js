$("#cerrarSesion").on("click", function () {

    sessionStorage.removeItem("Berghain");
    window.location.href = "./index.html"
})