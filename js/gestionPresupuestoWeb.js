import * as GestionPresupuesto from "./gestionPresupuesto.js";

function repintar() {
    mostrarDatoEnId(
        "presupuesto",
        GestionPresupuesto.mostrarPresupuesto()
    );

    mostrarDatoEnId(
        "gastos-totales",
        GestionPresupuesto.calcularTotalGastos()
    );

    mostrarDatoEnId(
        "balance-total",
        GestionPresupuesto.calcularBalance()
    );

    const idListado = "listado-gastos-completo";
    mostrarDatoEnId(idListado, "");

    GestionPresupuesto.listarGastos().forEach(gasto => {
        mostrarGastoWeb(idListado, gasto);
    });
}

function actualizarPresupuestoWeb() {
    const entrada = prompt("Introduce el nuevo presupuesto:");

    if (
        entrada === null ||
        (typeof entrada === "string" && entrada.trim() === "")
    ) {
        return;
    }

    const nuevoPresupuesto = Number(entrada);

    if (Number.isNaN(nuevoPresupuesto)) {
        alert("Introduce un presupuesto numérico.");
        return;
    }

    GestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

const botonActualizarPresupuesto =
    document.getElementById("actualizarpresupuesto");

botonActualizarPresupuesto.addEventListener(
    "click",
    actualizarPresupuestoWeb
);

function nuevoGastoWeb() {
    const descripcion = prompt("Introduce la descripción del gasto:");
    if (descripcion === null) return;

    const valorTexto = prompt("Introduce el valor del gasto:");
    if (valorTexto === null) return;

    const fecha = prompt("Introduce la fecha (yyyy-mm-dd):");
    if (fecha === null) return;

    const etiquetasTexto = prompt("Introduce las etiquetas separadas por comas:");
    if (etiquetasTexto === null) return;

    const valor = Number(valorTexto);
    const etiquetas = etiquetasTexto.split(",");

    const gasto = new GestionPresupuesto.CrearGasto(
        descripcion,
        valor,
        fecha,
        ...etiquetas
    );

    GestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

const botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.querySelector(`#${idElemento}`);
    elemento.textContent = valor;
}

function EditarHandle() {
}

EditarHandle.prototype.handleEvent = function () {
    const descripcion = prompt(
        "Descripción del gasto:",
        this.gasto.descripcion
    );
    if (descripcion === null) return;

    const valorTexto = prompt(
        "Valor del gasto:",
        this.gasto.valor
    );
    if (valorTexto === null) return;

    const fecha = prompt(
        "Fecha (yyyy-mm-dd):",
        this.gasto.fecha
    );
    if (fecha === null) return;

    const etiquetasTexto = prompt(
        "Etiquetas separadas por comas:",
        this.gasto.etiquetas.join(",")
    );
    if (etiquetasTexto === null) return;

    const valor = Number(valorTexto);
    const etiquetas = etiquetasTexto.split(",");

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
};

function BorrarHandle() {
}

BorrarHandle.prototype.handleEvent = function () {
    GestionPresupuesto.borrarGasto(this.gasto.id);
    repintar();
};

function BorrarEtiquetasHandle() {
}

BorrarEtiquetasHandle.prototype.handleEvent = function () {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
};

function mostrarGastoWeb(idElemento, gasto) {
    const elemento = document.querySelector(`#${idElemento}`);

    const divPrincipal = document.createElement("div");
    divPrincipal.classList.add("gasto");

    const divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divPrincipal.appendChild(divDescripcion);

    const divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divPrincipal.appendChild(divFecha);

    const divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;
    divPrincipal.appendChild(divValor);

    const divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    gasto.etiquetas.forEach(etiqueta => {
        const spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = etiqueta;

        const borrarEtiquetasHandle = new BorrarEtiquetasHandle();
        borrarEtiquetasHandle.gasto = gasto;
        borrarEtiquetasHandle.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", borrarEtiquetasHandle);

        divEtiquetas.appendChild(spanEtiqueta);
    });

    divPrincipal.appendChild(divEtiquetas);

    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.classList.add("gasto-editar");
    botonEditar.textContent = "Editar";

    const editarHandle = new EditarHandle();
    editarHandle.gasto = gasto;
    botonEditar.addEventListener("click", editarHandle);
    divPrincipal.appendChild(botonEditar);

    const botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.textContent = "Borrar";

    const borrarHandle = new BorrarHandle();
    borrarHandle.gasto = gasto;
    botonBorrar.addEventListener("click", borrarHandle);
    divPrincipal.appendChild(botonBorrar);

    elemento.appendChild(divPrincipal);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.querySelector(`#${idElemento}`);

    const divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let periodoMostrar = periodo;

    if (periodo === "dia") {
        periodoMostrar = "día";
    }

    if (periodo === "anyo") {
        periodoMostrar = "año";
    }

    const h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodoMostrar}`;
    divAgrupacion.appendChild(h1);

    Object.entries(agrup).forEach(([clave, valor]) => {
        const divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        const spanDatoClave = document.createElement("span");
        spanDatoClave.classList.add("agrupacion-dato-clave");
        spanDatoClave.textContent = clave;
        divDato.appendChild(spanDatoClave);

        const spanDatoValor = document.createElement("span");
        spanDatoValor.classList.add("agrupacion-dato-valor");
        spanDatoValor.textContent = valor;
        divDato.appendChild(spanDatoValor);

        divAgrupacion.appendChild(divDato);
    });

    elemento.appendChild(divAgrupacion);
}

export {
    repintar,
    mostrarDatoEnId,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};