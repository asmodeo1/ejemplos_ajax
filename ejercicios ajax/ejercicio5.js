function obtenerRespuesta(respuesta) {
    document.getElementById("obtener").disabled = false;
    //return respuesta.json();
    if(respuesta.status == 200) {
        return respuesta.json(); // Convierte los datos a un objeto JavaScript y se los pasa
                                // a la función mostrarDatos
    } else {
        return {error: respuesta.status};
    }
}

function mostrarDatos(datos) {
    if(datos.error != undefined) {
        alert("Ha habido un error: " + datos.error);
        return;
    }
    const contenedor = document.getElementById("contenedor");
    contenedor.textContent = "";
    // Convertimos a mayúscula porque los código vienes en mayúsculas
    const codigoIntroducido = document.getElementById("codigo").value.toUpperCase();
    let encontrado = false;
    for (const aeropuerto of datos) {
        if(aeropuerto.code == codigoIntroducido) {
            let p = document.createElement("p");
            contenedor.appendChild(p);
            p.textContent = aeropuerto.name;
            p = document.createElement("p");
            contenedor.appendChild(p);
            p.textContent = aeropuerto.city;
            p = document.createElement("p");
            contenedor.appendChild(p);
            p.textContent = aeropuerto.country;
            encontrado = true;
            break;
            // return; Lo más fácil sería hacer un return
        }
    }
    if(encontrado == false) { // if(!encontrado) {
        window.alert("Ese código no se ha encontrado");
    }
}

function mostrarError(error) {
    alert(error);
}

function obtenerInfoAeropuerto() {
    const codigo = document.getElementById("codigo");
    if(codigo.checkValidity() == false) {
        alert("Introduce el codigo de tres caracteres");
        return;
    }
    document.getElementById("obtener").disabled = true;

    fetch("https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json")
    //fetch("ejercicio5.json")
    .then(obtenerRespuesta) // .then(respuesta => respuesta.json)
    .then(mostrarDatos)    // .then(datos => console.log(datos))
    .catch(mostrarError); // Dejarlo para el final
}

document.getElementById("obtener").addEventListener("click", obtenerInfoAeropuerto);





