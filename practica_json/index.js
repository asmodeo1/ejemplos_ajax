/* Tenemos un array de objetos con:
 - texto: el valor que el usuario debe buscar en el JSON
 - fichero: fichero que se cargará para la pregunta. Lo cargaremos localmente mediante AJAX
 - correcta: el resultado en texto que debe salir para que la respuesta del usuario sea correcta
 */
let preguntas = [
    {texto: "nombre", fichero: "j1.json", correcta: "Juan Pérez"},
    {texto: "email", fichero: "j1.json", correcta: "juan.perez@ejemplo.com"},
    {texto: "calle", fichero: "j1.json", correcta: "Calle Falsa"},
    {texto: "telefonos", fichero: "j2.json", correcta: '[{"tipo":"casa","numero":"555-1234"},{"tipo":"trabajo","numero":"555-5678"}]'},
    {texto: "primer telefono (todos su datos)", fichero: "j2.json", correcta: '{"tipo":"casa","numero":"555-1234"}'},
    {texto: "primer número telefono", fichero: "j2.json", correcta: '555-1234'},
    {texto: "todas las ciudades (todos sus datos)", fichero: "j3.json", correcta: '[{"nombre":"Madrid","poblacion":3223000},{"nombre":"Barcelona","poblacion":1636000},{"nombre":"Valencia","poblacion":791000},{"nombre":"Sevilla","poblacion":688000},{"nombre":"Zaragoza","poblacion":675000},{"nombre":"Málaga","poblacion":578000},{"nombre":"Murcia","poblacion":460000},{"nombre":"Palma","poblacion":416000},{"nombre":"Las Palmas de Gran Canaria","poblacion":383000},{"nombre":"Bilbao","poblacion":345000}]'},
    {texto: "El nombre de la primera ciudad", fichero: "j3.json", correcta: 'Madrid'},
    {texto: "La población de la segunda ciudad", fichero: "j3.json", correcta: '1636000'},

    {texto: "Todos los datos de la empresa", fichero: "j5.json", correcta: '1636000'},
    {texto: "Todos los datos del contacto", fichero: "j5.json", correcta: '1636000'},
    {texto: "El pais de la empresa", fichero: "j5.json", correcta: '1636000'},
    {texto: "La callle de la empresa", fichero: "j5.json", correcta: '1636000'},
    {texto: "El email del contacto", fichero: "j5.json", correcta: '1636000'},
    {texto: "El cargo de la persona responsable del contacto", fichero: "j5.json", correcta: '1636000'},
    {texto: "El número de empleados", fichero: "j5.json", correcta: '1636000'},
    {texto: "Los sectores ", fichero: "j5.json", correcta: '1636000'},
    {texto: "El sector secundario", fichero: "j5.json", correcta: '1636000'},

    {texto: "Todos los datos de la empresa", fichero: "j5.json", correcta: '{"nombre":"Tech Solutions","ubicacion":{"pais":"España","ciudad":"Madrid","direccion":{"calle":"Calle Mayor","numero":123,"codigo_postal":"28013"}},"contacto":{"telefono":"555-1234","email":"info@techsolutions.com","persona_responsable":{"nombre":"Carlos García","cargo":"Director General"}},"detalles":{"numero_empleados":250,"anio_fundacion":1999,"sectores":{"principal":"Tecnología","secundario":"Consultoría"}}}'},
    {texto: "Todos los datos del contacto", fichero: "j5.json", correcta: '{"telefono":"555-1234","email":"info@techsolutions.com","persona_responsable":{"nombre":"Carlos García","cargo":"Director General"}}'},
    {texto: "El pais de la empresa", fichero: "j5.json", correcta: 'España'},
    {texto: "La callle de la empresa", fichero: "j5.json", correcta: 'Calle Mayor'},
    {texto: "El email del contacto", fichero: "j5.json", correcta: 'info@techsolutions.com'},
    {texto: "El cargo de la persona responsable del contacto", fichero: "j5.json", correcta: 'Director General'},
    {texto: "El número de empleados", fichero: "j5.json", correcta: '250'},
    {texto: "Los sectores ", fichero: "j5.json", correcta: '{"principal":"Tecnología","secundario":"Consultoría"}'},
    {texto: "El sector secundario", fichero: "j5.json", correcta: 'Consultoría'},

    {texto: "los proyectos (todos sus datos)", fichero: "j4.json", correcta: '[{"nombre":"Proyecto A","fecha_inicio":"2023-01-15","equipos":[{"nombre_equipo":"Equipo 1","miembros":["Juan","Pedro","María"]},{"nombre_equipo":"Equipo 2","miembros":["Lucía","Roberto","Sofía"]}]},{"nombre":"Proyecto B","fecha_inicio":"2024-05-20","equipos":[{"nombre_equipo":"Equipo 3","miembros":["Carlos","Elena","Laura"]},{"nombre_equipo":"Equipo 4","miembros":["Miguel","Sara","Pablo"]}]}]'},
    {texto: "el segundo proyecto (todos sus datos)", fichero: "j4.json", correcta: '{"nombre":"Proyecto B","fecha_inicio":"2024-05-20","equipos":[{"nombre_equipo":"Equipo 3","miembros":["Carlos","Elena","Laura"]},{"nombre_equipo":"Equipo 4","miembros":["Miguel","Sara","Pablo"]}]}'},
    {texto: "el nombre del primer proyecto", fichero: "j4.json", correcta: 'Proyecto A'},
    {texto: "los equipos del primer proyecto (todos sus datos)", fichero: "j4.json", correcta: '[{"nombre_equipo":"Equipo 1","miembros":["Juan","Pedro","María"]},{"nombre_equipo":"Equipo 2","miembros":["Lucía","Roberto","Sofía"]}]'},
    {texto: "el nombre del primer equipo del primer proyecto", fichero: "j4.json", correcta: 'Equipo 1'},
    {texto: "los miembros del primer equipo del primer proyecto", fichero: "j4.json", correcta: '["Juan","Pedro","María"]'},
    {texto: "el nombre del segundo miembro del primer equipo del primer proyecto", fichero: "j4.json", correcta: 'Pedro'},
];

// Esta variable contendrá la pregunta actual y que servirá para obtenerla del array preguntas.
// Como los arrays comienzan en la posición cero, ese es el valor que le damos
let preguntaActual = 0;

/**
 * Muestra el json del ejercicio y la pregunta
 * @param {JSON} json - objeto JSON a mostrar al usuario
 */
function mostrarJSON(json) {
    const pregunta =  document.getElementById("pregunta");
    // Contenido es un textarea
    const contenido =  document.getElementById("contenido");
    /* Usamos el metodo JSON.stringify para convertir el objeto JSON en una cadena que
    podemos mostrar en el textarea.
    Para poder mostrarlo bien formateado indicamos un tercer parámetro con el número
    de espacios a tabular lso datos*/
    contenido.value = JSON.stringify(json, null, 3);
    // Mostramos la pregunta actual
    pregunta.textContent = preguntas[preguntaActual].texto;
}

/**
 * Realiza una petición AJAX para cargar el fichero JSON de la pregunta actual
 */
function obtenerJSON() {
    fetch(preguntas[preguntaActual].fichero)
    // Este es una función arrow que veremos más adelante. 
    // Simplente devuelve los datos convertidos a un objeto JSON y se pasan al siguiente then
    .then(peticion => peticion.json()) 
    .then(mostrarJSON);
}

/**
 * Comprueba si la respuesta es correcta, en cuyo caso pasa a la siguiente pregunta
 */
function comprobar() {
    // Con trim quitamos los espacios vacíos a los lados que peuda haber puesto el usuario
    const valor = document.getElementById("texto").value.trim();
    if(valor == "") {
        alert("Falta el texto");
        return;
    }
    /* En este elemento mostraremos los datos a partir de lo indicado por el usuario */
    const obtenido = document.getElementById("obtenido");
    /* Como vamos a usar la función eval para ejecutar código JavaScript, esta puede 
    dar un error si no es código JavaScript válido. Por ello debemos meter en un try
    el código que puede fallar y el que debe seguir ejecutándose en caso de que no haya error
    Luego en el catch pondremos lo que hacer en caso de error. */
    try {
        /* La función eval coge un texto con código JavaScript y lo ejecuta. En este
        caso queremos usarlo para obtener los datos JSON que diga el usuario.
        Es una función peligrosa si no tenemos 100% certeza de que ese código JavaScript
        es seguro y nuestro */
        const evaluado = eval(valor);
        /* evall puede devolver un texto con el valor (por ejemplo el país, nombre, ...)
         o un objeto JSON con varios datos (como un producto, persona, ...). 
         Por ello debemos actuar diferente según el caso */
        if(typeof(evaluado) == "object") { // Si es un objeto lo convertimos a texto
            obtenido.textContent= JSON.stringify(evaluado);
        } else {
            // Si ya es un texto lo mostramos tal cual
            obtenido.textContent= evaluado;
        }
        // Comprobamos si lo obtenido es igual a la pregunta correcta 
        if(obtenido.textContent == preguntas[preguntaActual].correcta) {
            siguientePregunta();
        } else {
            // Si falla añadimos una nueva imagen a los fallos
            const fallos = document.getElementById("fallos");
            fallos.innerHTML += "<img src='fallo.png'>";
        }
    } catch {
        // eval puede producir una excepción si lo introducido no es código JavaScript válido
        obtenido.textContent = "Incorrecto";
    }
}

function siguientePregunta() {
    preguntaActual++; // Pasamos a la siguiente pregunta
    // Vemos si ya hemos llegado a la última pregunta
    if(preguntaActual == preguntas.length) {
        alert("Finalizado");
        // Desactivamos el botón comprobar
        document.getElementById("comprobar").disabled = true;
    } else {
        // Obtenemos el json de la siguiente pregunta
        obtenerJSON();
        document.getElementById("obtenido").textContent = "";
        const texto = document.getElementById("texto");
        texto.value = "datos.";
        texto.focus();
    }
}

/**
 * Pulsando la tecla Enter se llamará a la función comprobar salvo que ya no queden preguntas
 * @param {Event} evt - información del evento
 */
function comprobarEnter(evt) {
    const tecla = evt.key;
    if(tecla == "Enter" && preguntaActual < preguntas.length) {
        comprobar();
    }
}

// Como queremos mostrar el JSON al comienzo, llamamos a la función fuera de cualquier evento
obtenerJSON();
document.getElementById("texto").addEventListener("keydown", comprobarEnter);
document.getElementById("comprobar").addEventListener("click", comprobar);

