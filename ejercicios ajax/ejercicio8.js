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
        const botonEliminar = document.createElement("input");
        div.appendChild(botonEliminar);
        botonEliminar.setAttribute("type", "button");
        botonEliminar.value="🗑️";
        botonEliminar.addEventListener("click", eliminarTarea);
        const botonCambiarEstado = document.createElement("input");
        botonCambiarEstado.setAttribute("type", "button");
        div.appendChild(botonCambiarEstado);
        botonCambiarEstado.value="🌕";
        botonCambiarEstado.addEventListener("click", cambiarEstado);
    }
}

function mostrarError(error) {
    alert(error);
}

function cambiarEstado(evt) {
    const padre = evt.target.parentNode; // o evt.currentTarget.parentNode
    if(padre.style.backgroundColor == "") {
        padre.style.backgroundColor = "green";
    } else {
        padre.style.backgroundColor = "";
    }
}

function eliminarTarea(evt) {
    // Como el botón está dentro de un padre, eliminamos el padre
    evt.target.parentNode.remove(); // o evt.currentTarget.parentNode.remove();
}

fetch("https://jsonplaceholder.typicode.com/todos")
//fetch("ejercicio2.json")
.then(obtenerRespuesta) // .then(respuesta => respuesta.json)
.then(mostrarDatos)    // .then(datos => console.log(datos))
.catch(mostrarError); // Dejarlo para el final



