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

let preguntaActual = 0;
let datos = "";

function mostrarJSON(json) {
    const pregunta =  document.getElementById("pregunta");
    const contenido =  document.getElementById("contenido");
    contenido.value = JSON.stringify(json, null, 3);
    datos = json;
    pregunta.textContent = preguntas[preguntaActual].texto;
}

function obtenerJSON() {
    fetch(preguntas[preguntaActual].fichero)
    .then(peticion => peticion.json())
    .then(mostrarJSON);
}

function comprobar() {
    const valor = document.getElementById("texto").value.trim();
    if(valor == "") {
        alert("Falta el texto");
        return;
    }
    const obtenido = document.getElementById("obtenido");
    try {
        const evaluado = eval(valor);
        if(typeof(evaluado) == "object") {
            obtenido.textContent= JSON.stringify(evaluado);
        } else {
            obtenido.textContent= evaluado;
        }
        console.log(obtenido.textContent);
        if(obtenido.textContent == preguntas[preguntaActual].correcta) {
            siguientePregunta();
        } else {
            const fallos = document.getElementById("fallos");
            fallos.innerHTML += "<img src='fallo.png'>";
        }
    } catch {
        obtenido.textContent = "Incorrecto";
    }
}

function siguientePregunta() {
    preguntaActual++;
    if(preguntaActual == preguntas.length) {
        alert("Finalizado");
        document.getElementById("comprobar").disabled = true;
    } else {
        obtenerJSON();
        document.getElementById("obtenido").textContent = "";
        const texto = document.getElementById("texto");
        texto.value = "datos.";
        texto.focus();
    }
}

function comprobarEnter(evt) {
    const tecla = evt.key;
    if(tecla == "Enter") {
        comprobar();
    }
}

obtenerJSON();
document.getElementById("texto").addEventListener("keydown", comprobarEnter);
document.getElementById("comprobar").addEventListener("click", comprobar);

