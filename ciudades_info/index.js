

function obtenerRespuesta(peticion) {
    return peticion.json();
}

function mostrarRespuesta(datos) {
    if(datos.error == true ) {
        alert("La ciudad no existe u otro problema: " + error.msg);
        return;
    }
    console.log(datos.data.country);
    console.log(datos.data);
    for (const poblacion of datos.data.populationCounts) {
        console.log(poblacion.year, poblacion.value);
    }

}

/*
{
    "error": true,
    "msg": "you seem to be lost"
}

404
{
    "error": true,
    "msg": "city data not found"
}


*/

/*
200
{
    "error": false,
    "msg": "vigo with population",
    "data": {
        "city": "Vigo",
        "country": "Spain",
        "populationCounts": [
            {
                "year": "2012",
                "value": "296917",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2011",
                "value": "295625",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2011",
                "value": "297298",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2010",
                "value": "297183",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2009",
                "value": "297228",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2008",
                "value": "295703",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2006",
                "value": "293255",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            },
            {
                "year": "2001",
                "value": "280186",
                "sex": "Both Sexes",
                "reliabilty": "Final figure, complete"
            }
        ]
    }
}
*/



function mostrarError() {
    alert("Se ha producido un error al obtener los datos")
}

function buscarCiudad() {
    const ciudad = document.getElementById("ciudad").value;
    // Creamos un objeto con los datos de la petición
    const datos = {
        method: 'POST',
        body: '{"city": ciudad}',
        headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
        })
    };


    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
    .then(obtenerRespuesta)
    .then(mostrarRespuesta)
    //.catch(mostrarError);
}

document.getElementById("buscarCiudad").addEventListener("click", buscarCiudad);