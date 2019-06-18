$("#cerrarSesion").on("click", function () {

    sessionStorage.removeItem("Berghain");
    sessionStorage.removeItem("admin");
    window.location.href = "./index.html"
    
})