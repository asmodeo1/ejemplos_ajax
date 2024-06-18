
function obtenerRespuesta(respuesta) {
    if(respuesta.status == 200) {
        // Enviamos el JSON procesado a mostrarRespuesta
        return respuesta.json();
    } else if(respuesta.status == 404) {
        return {error: "El código no existe"};
    } else {
        return {error: "Ha habido otro error: " + respuesta.status};
    }
}

function mostrarRespuesta(datos) {
    // Volvemos a activar el botón
    document.getElementById("buscar").disabled = false;
    const pais = document.getElementById("pais");
    const lugar = document.getElementById("lugar");
    const provincia = document.getElementById("provincia");

    if(datos.error != undefined) {
        mostrarMensaje(datos.error);
        pais.textContent = "";
        lugar.textContent = "";
        provincia.textContent = "";

        /*for (const elemento of [pais, lugar, provincia]) {
            elemento.textContent = "";
        }*/

        //document.querySelectorAll("#pais, #lugar, #provincia").forEach( e => e.textContent = "");

        return;
    }

    pais.textContent = datos.country;
    lugar.textContent = datos.places[0]["place name"];
    provincia.textContent = datos.places[0].state;

}

function mostrarMensaje(texto) {
    const mensaje = document.getElementById("mensaje");
    mensaje.style.animation = "";
    mensaje.offsetWidth;
    mensaje.style.animation = "animarMensaje .5s";
    mensaje.textContent = texto;
}

function mostrarError() {
    mostrarMensaje("Se ha producido otro error")
}

function obtenerCodigo() {
    const codigo = document.getElementById("codigo");
    const mensaje = document.getElementById("mensaje");

    //if(codigo.value < 10_000 || codigo.value > 99_999) {
    //if(codigo.value.length != 5 || isNaN(Number(codigo.value))) {
    //if(/^\d{5}$/.test(codigo.value) == false) {
    if(codigo.checkValidity() == false) {
        mostrarMensaje("Falta el código o no tiene 5 dígitos");
        codigo.focus();
        return;
    } 
    mensaje.textContent = "";
    // Desactivamos el botón
    document.getElementById("buscar").disabled = true;
    fetch("https://api.zippopotam.us/es/" + codigo.value)
    //fetch(`https://api.zippopotam.us/es/${codigo.value}`)
    .then(obtenerRespuesta)
    .then(mostrarRespuesta)
    .catch(mostrarError);
}


document.getElementById("buscar").addEventListener("click", obtenerCodigo);