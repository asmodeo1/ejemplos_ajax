
// respuesta es la respuesta de la petición
function obtenerRespuesta(respuesta) {
    if(respuesta.status == 200) {
        return respuesta.json().message; // datos a enviar a la función mostrarSubrazas
    } else if(respuesta.status == 404) {
        return {error: "No existe esa subraza"};
    } else {
        return {error: "Otro error: " + respuesta.status};
    }
}

// respuesta es la información que devuelve la función obtenerRespuesta
function mostrarSubrazas(respuesta) {
    if(respuesta.error != undefined) {
        alert(error);
        return;
    }
    const subrazas = document.getElementById("subrazas");
    subrazas.textContent = "";
    for(const subraza of subrazas) {
        const li = document.createElement("li");
        li.textContent = subraza;
        subrazas.appendChild(li);
    }
}

function mostrarError() {
    alert("Ha habido un problema al obtener las subrazas");
}

function obtenerSubrazas() {
    fetch("https://dog.ceo/api/breed/hound/list")
    .then(obtenerRespuesta)
    .then(mostrarSubrazas)
    .catch(mostrarError);
}

document.getElementById("obtenerSubrazas").addEventListener("click", obtenerSubrazas);