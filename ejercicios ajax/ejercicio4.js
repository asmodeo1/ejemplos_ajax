function obtenerRespuesta(respuesta) {
    //return respuesta.json();
    if(respuesta.status == 200) {
        return respuesta.json(); // Convierte los datos a un objeto JavaScript y se los pasa
                                // a la función mostrarDatos
    } else if(respuesta.status == 404) { // Esta API devuelve 404 si el planeta no existe
        return {aviso: "Ese planeta no existe"};
    } else {
        return {error: respuesta.status};
    }
}

function mostrarDatos(datos) {
    if(datos.error != undefined) {
        alert("Ha habido un error: " + datos.error);
        return;
    }
    if(datos.aviso != undefined) {
        alert(datos.aviso);
        return;
    }
    const contenedor = document.getElementById("contenedor");
    contenedor.textContent = "";
    let p = document.createElement("p");
    contenedor.appendChild(p);
    p.textContent = datos.name;
    p = document.createElement("p");
    contenedor.appendChild(p);
    p.textContent = datos.terrain;
    p = document.createElement("p");
    contenedor.appendChild(p);
    p.textContent = datos.population;
}

function mostrarError(error) {
    alert(error);
}

function obtenerInfoPlaneta() {
    const planeta = document.getElementById("planeta");
    if(planeta.checkValidity() == false) {
        alert("Introduce el planeta");
        return;
    }

    fetch("https://swapi.dev/api/planets/" + planeta.value)
    //fetch(`https://swapi.dev/api/planets/${planeta.value}`)
    .then(obtenerRespuesta) // .then(respuesta => respuesta.json)
    .then(mostrarDatos)    // .then(datos => console.log(datos))
    .catch(mostrarError); // Dejarlo para el final
}

document.getElementById("obtener").addEventListener("click", obtenerInfoPlaneta);





