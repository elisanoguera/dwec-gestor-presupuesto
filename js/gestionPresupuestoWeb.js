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

        // Manejador para borrar la etiqueta al hacer clic
        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", manejadorBorrarEtiqueta);

        divEtiquetas.append(spanEtiqueta);
    }

    // Botón Editar
    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";

    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    botonEditar.addEventListener("click", manejadorEditar);

    // Botón Borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", manejadorBorrar);

    // Botón Editar (formulario)
    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.type = "button";
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.textContent = "Editar (formulario)";

    let manejadorEditarFormulario = new EditarHandleFormulario();
    manejadorEditarFormulario.gasto = gasto;
    botonEditarFormulario.addEventListener("click", manejadorEditarFormulario);

    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas, botonEditar, botonBorrar, botonEditarFormulario);
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

function nuevoGastoWebFormulario(event) {
    // 1. Copiar la plantilla (DocumentFragment) y localizar el <form>
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    // 2. Manejador del submit (función normal)
    formulario.addEventListener("submit", enviarNuevoGastoFormulario);

    // 3. Manejador del botón Cancelar (objeto manejador)
    let botonCancelar = formulario.querySelector("button.cancelar");
    let manejadorCancelar = new CancelarFormularioHandle();
    manejadorCancelar.formulario = formulario;
    manejadorCancelar.boton = event.currentTarget;   // el botón anyadirgasto-formulario
    botonCancelar.addEventListener("click", manejadorCancelar);

    // 4. Desactivar el botón anyadirgasto-formulario
    event.currentTarget.setAttribute("disabled", "");

    // 5. Insertar el formulario en la página
    document.getElementById("controlesprincipales").append(plantillaFormulario);
}

function enviarNuevoGastoFormulario(event) {
    // Evitar que el formulario se envíe y recargue la página
    event.preventDefault();

    // currentTarget es el <form> que tiene el manejador
    let formulario = event.currentTarget;

    let descripcion = formulario.elements.descripcion.value;
    let valor = Number(formulario.elements.valor.value);
    let fecha = formulario.elements.fecha.value;
    let etiquetas = formulario.elements.etiquetas.value
        .split(",")
        .map(etiqueta => etiqueta.trim())
        .filter(etiqueta => etiqueta !== "");

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);

    repintar();

    // Quitar el formulario y volver a activar el botón
    formulario.remove();
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

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

function CancelarFormularioHandle() {
    this.handleEvent = function(event) {
        this.formulario.remove();
        this.boton.removeAttribute("disabled");
    };
}

function EditarHandleFormulario() {
    this.handleEvent = function(event) {
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
