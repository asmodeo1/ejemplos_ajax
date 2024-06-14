function obtenerRespuesta(respuesta) {
    //return respuesta.json();
    if(respuesta.status == 200) {
        return respuesta.json(); // Convierte los datos a un objeto JavaScript y se los pasa
                                // a la función mostrarDatos
    } else {
        return {error: respuesta.status};
        //return null;
    }
}

function mostrarDatos(datos) {
    //console.log(datos);
    /*if(datos == null) {
        alert("Ha habido un error");
    }*/
    if(datos.error != undefined) {
        alert("Ha habido un error: " + datos.error);
        return;
    }
    const contenedor = document.getElementById("contenedor");
    for (const tarea of datos) {
        const div = document.createElement("div");
        contenedor.appendChild(div);
        const pTitulo = document.createElement("p");
        div.appendChild(pTitulo);
        pTitulo.textContent = tarea.title;
        const pIdUsuario = document.createElement("p");
        div.appendChild(pIdUsuario);
        pIdUsuario.textContent = tarea.userId;
    }
}

function mostrarError(error) {
    alert(error);
}

fetch("https://jsonplaceholder.typicode.com/todos")
//fetch("ejercicio2.json")
.then(obtenerRespuesta) // .then(respuesta => respuesta.json)
.then(mostrarDatos)    // .then(datos => console.log(datos))
.catch(mostrarError); // Dejarlo para el final



