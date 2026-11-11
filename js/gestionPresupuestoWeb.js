import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.append(spanEtiqueta);
    }

    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);
    contenedor.append(divGasto);
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);
    let nombresPeriodo = { dia: "día", mes: "mes", anyo: "año" };

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${nombresPeriodo[periodo]}`;
    divAgrupacion.append(titulo);

    for (let [clave, valor] of Object.entries(agrup)) {
        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor;

        divDato.append(spanClave, spanValor);
        divAgrupacion.append(divDato);
    }

    contenedor.append(divAgrupacion);
}

function repintar() {
    // Totales
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    // Borrar el listado anterior para no duplicar
    document.getElementById("listado-gastos-completo").innerHTML = "";

    // Volver a pintar el listado completo
    for (let gasto of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let presupuesto = Number(prompt("Introduce un nuevo presupuesto:"));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto:");
    let valor = Number(prompt("Introduce el valor del gasto:"));
    let fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    let etiquetasTexto = prompt("Introduce las etiquetas separadas por comas (eti1,eti2,eti3):");

    let etiquetas = etiquetasTexto.split(",");

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);

    repintar();
}

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function(event) {
        let descripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
        let valor = Number(prompt("Introduce el nuevo valor:", this.gasto.valor));
        let fechaActual = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        let fecha = prompt("Introduce la nueva fecha (yyyy-mm-dd):", fechaActual);
        let etiquetasTexto = prompt("Introduce las etiquetas separadas por comas:", this.gasto.etiquetas.join(","));

        let etiquetas = etiquetasTexto.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function(event) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
