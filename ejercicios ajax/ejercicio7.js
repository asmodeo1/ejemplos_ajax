function obtenerRespuesta(respuesta) {
    document.getElementById("obtener").disabled = false;
    // Esta API siempre devuelve un json haya encontrado o no el pais o el endpoint no exista
    // Entre los datos que devuelve hay un atributo error con true si hay error o false si no
    return respuesta.json();
}

function mostrarDatos(datos) {
    // Esta API siempre devuelve un atributo error (valor true si hubo error y false si no)
    if(datos.error) {
        alert(datos.msg); // msg es un atributo de la api con el mensaje de error
        return;
    }
    const contenedor = document.getElementById("contenedor");
    contenedor.textContent = "";
    const p = document.createElement("p");
    contenedor.appendChild(p);
    p.textContent = datos.data.name;
    const img = document.createElement("img");
    contenedor.appendChild(img);
    img.setAttribute("src", datos.data.flag); // img.src = datos.data.flag;
    img.setAttribute("width", "100px"); // img.width = "100px";
    img.setAttribute("alt", datos.data.name); // img.alt = "Es la bandera de " + datos.data.name;
    //img.style.width = "100px";
}

function mostrarError(error) {
    alert(error);
}

function obtenerBandera() {
    const codigo = document.getElementById("codigo");
    if(codigo.checkValidity() == false) {
        alert("Introduce el codigo");
        return;
    }
    document.getElementById("obtener").disabled = true;

    // Creamos un objeto con los datos de la petición
    const datos = {
        method: 'POST',
        body: JSON.stringify({iso2: codigo.value}),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    };

    fetch("https://countriesnow.space/api/v0.1/countries/flag/images", datos)
    .then(obtenerRespuesta) // .then(respuesta => respuesta.json)
    .then(mostrarDatos)    // .then(datos => console.log(datos))
    .catch(mostrarError); // Dejarlo para el final
}

document.getElementById("obtener").addEventListener("click", obtenerBandera);





