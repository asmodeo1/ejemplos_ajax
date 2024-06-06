function mostrarError() {
    alert("Ha habido algún problema en la petición")
}

function obtenerRespuestaCarrito(respuesta) {
    if(respuesta.status == 200) {
        return respuesta.json(); // Enviamos el JSON a la función mostrarCarrito
    } else if(respuesta.status == 404) {
        return {error: "El carrito no existe"};
    } else {
        return {error: "Otro error: " + respuesta.status }; 
    }
}

function obtenerRespuestaCarritos(respuesta) {
    if(respuesta.status == 200) {
        return respuesta.json(); // Enviamos el JSON a la función mostrarCarritos
    } else {
        return {error: "No se han podido obtener los carritos: " + respuesta.status }; 
    }
}

function mostrarCarritos(carritos) {

}

function mostrarCarrito(carrito) {
    if(carrito.error != undefined) {
        alert(carrito.error);
        return;
    }
    const contenedorCarrito = document.getElementById("carritos");
    let contenido = "<h2>Productos del carrito</h2>"
    for (const producto of carrito.products) {
        contenido += `<div class="m-2 bg-info-subtle p-2"><p>Nombre: ${producto.title}</p>`
            + `<p>Precio: ${producto.price}</p></div>`;
    }
    contenedorCarrito.innerHTML = contenido;
}


function buscarCarrito() {
    const idCarrito = document.getElementById("idCarrito").value;
    if(idCarrito == "") {
        fetch("https://dummyjson.com/carts/")
        .then(obtenerRespuestaCarritos)
        .then(mostrarCarritos)
        .catch(mostrarError);
    } else {
        fetch("https://dummyjson.com/carts/" + idCarrito)
        .then(obtenerRespuestaCarrito)
        .then(mostrarCarrito)
        .catch(mostrarError);
    }
}

document.getElementById("buscarCarrito").addEventListener("click", buscarCarrito);