function obtenerRespuesta(respuesta) {
    return respuesta.json(); // Convierte los datos a un objeto JavaScript y se los pasa
                                // a la función mostrarDatos
}

function mostrarDatos(datos) {
    // Esta API siempre devuelve un atributo error (valor true si hubo error y false si no)
    if(datos.error == true) {
        alert("Ha habido un error: " + datos.msg); // msg es un atributo de la api con el mensaje de error
        return;
    }
    const contenedor = document.getElementById("contenedor");
    contenedor.textContent = "";
    for (const pais of datos.data) {
        const p = document.createElement("p");
        contenedor.appendChild(p);
        p.textContent = pais.name;
        const img = document.createElement("img");
        contenedor.appendChild(img);
        img.setAttribute("src", pais.flag); // img.src = pais.flag;
        img.setAttribute("width", "100px"); // img.width = "100px";
        img.setAttribute("alt", pais.name); // img.alt = "Es la bandera de " + pais.name;
        //img.style.width = "100px";
    }
}

function mostrarError(error) {
    alert(error);
}

function obtenerInfoBanderas() {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
    //fetch("ejercicio6.json")
    .then(obtenerRespuesta) // .then(respuesta => respuesta.json)
    .then(mostrarDatos)    // .then(datos => console.log(datos))
    .catch(mostrarError); // Dejarlo para el final
}

obtenerInfoBanderas();






