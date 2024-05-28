function mostrarFotos(evt) {
    const contenedorFotos = document.getElementById('contenedorFotos');
    if(evt.target.status == 200) {
        const fotos = evt.target.response;
        for (const foto of fotos) {
            const img = document.createElement("img");
            img.setAttribute("loading", "lazy");
            img.setAttribute("src", foto.thumbnailUrl);
            const enlace = document.createElement("a");
            enlace.setAttribute("href", foto.url);
            enlace.setAttribute("target", "_blank");
            enlace.appendChild(img);
            contenedorFotos.appendChild(enlace);
        }
    } else {
        contenedorFotos.textContent = "No se han podido descargar las fotos: " + evt.target.status;
    }
}

function mostrarError() {
    window.alert("Se ha producido un error inesperado");
}

function obtenerFotos() {
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("load", mostrarFotos);
    peticion.addEventListener("error", mostrarError);
    peticion.open("GET", "https://jsonplaceholder.typicode.com/photos");
    peticion.responseType = "json";
    peticion.send();
}


document.getElementById('obtenerFotos').addEventListener("click", obtenerFotos);

