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
    for (const album of datos) {
        const div = document.createElement("div");
        contenedor.appendChild(div);
        const p = document.createElement("p");
        div.appendChild(p);
        p.textContent = album.title;
        // Recordamos otra manera de crear botones
        const boton = document.createElement("button");
        div.appendChild(boton);
        boton.textContent = "Mostrar fotos";
        boton.dataset.idalbum = album.id;
        boton.addEventListener("click", mostraFotosAlbum);
    }
}


function mostrarError(error) {
    alert(error);
}


function mostrarDatosAlbum(datos) {
    //console.log(datos);
    /*if(datos == null) {
        alert("Ha habido un error");
    }*/
    if(datos.error != undefined) {
        alert("Ha habido un error: " + datos.error);
        return;
    }
    const fotos = document.getElementById("fotos");
    fotos.textContent = "";
    for (const foto of datos) {
        const img = document.createElement("img");
        fotos.appendChild(img);
        img.setAttribute("src", foto.thumbnailUrl); // o img.src = foto.thumbnailUrl;
    }
}

function mostraFotosAlbum(evt) {
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + evt.target.dataset.idalbum)
    .then(obtenerRespuesta) // En este ejercicio podemos usar la misma función obtenerRespuesta
    .then(mostrarDatosAlbum)    
    .catch(mostrarError); // Dejarlo para el final
}

fetch("https://jsonplaceholder.typicode.com/albums")
//fetch("ejercicio1.json")
.then(obtenerRespuesta) // .then(respuesta => respuesta.json)
.then(mostrarDatos)    // .then(datos => console.log(datos))
.catch(mostrarError); // Dejarlo para el final



