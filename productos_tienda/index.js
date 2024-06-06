function procesarRespuesta(respuesta) {
    document.getElementById("buscar").disabled = false;
    if(respuesta.status == 200) {
        return respuesta.json(); // Esta respuesta se le pasa al siguiente then
    } else if(respuesta.status == 404) { // Si el producto no existe devuelve un 404
        return {error: "No existe el producto"}
    } else {
        return {error: "Otro error:" + respuesta.status};
    }
}

// datos son los datos que devuelve el anterior then
function mostrarProducto(producto) {
    if(producto.error != undefined) {
        alert(producto.error);
        return;
    }
    const contenedorProducto = document.getElementById("producto");
    contenedorProducto.innerHTML = 
        `<p>Nombre: ${producto.name}</p>`
        + `<p>${JSON.stringify(producto.data)}</p>`;
}

function mostrarError() {
    document.getElementById("buscar").disabled = false;
    window.alert("Ha habido un problema al obtener el producto");
}

function buscarProducto() {
    const idProducto = document.getElementById("idProducto");
    if(idProducto.checkValidity() == false) {
        alert("Debes introducir el id del producto como número");
        return;
    }
    const contenedorProducto = document.getElementById("producto");
    contenedorProducto.innerHTML = "<p>Obteniendo datos</p>";
    document.getElementById("buscar").disabled = true;

    fetch("https://api.restful-api.dev/objects/" + idProducto.value)
    .then(procesarRespuesta)
    .then(mostrarProducto)
    .catch(mostrarError);
}

function comprobarTecla(evt) {
    const tecla = evt.key;
    if(tecla == "Enter") {
        buscarProducto();
        return;
    }
    if((tecla < '0' || tecla > '9') && tecla != "Backspace" && tecla != "Delete"
        && tecla != "ArrowLeft" && tecla != "ArrowRight") {
            evt.preventDefault();
    }
}

document.getElementById("idProducto").addEventListener("keydown", comprobarTecla);
document.getElementById("buscar").addEventListener("click", buscarProducto);






