// Importaciones.
import * as gesPre from './gestionPresupuesto.js'


// Funciones.
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedorPrincipal = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.classList.add('gasto-descripcion');
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement('div');
    divGastoFecha.classList.add('gasto-fecha');
    divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString('es-ES',
    {day: '2-digit', month: '2-digit', year: 'numeric'});
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.classList.add('gasto-valor');
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.classList.add('gasto-etiquetas');
    divGasto.append(divGastoEtiquetas);

    for (let etiqueta of gasto.etiquetas) {
        let spanGastoEtiquetasEtiqueta = document.createElement('span');
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanGastoEtiquetasEtiqueta.classList.add('gasto-etiquetas-etiqueta');
        spanGastoEtiquetasEtiqueta.textContent = etiqueta;
        divGastoEtiquetas.append(spanGastoEtiquetasEtiqueta);
        spanGastoEtiquetasEtiqueta.addEventListener('click', borrarEtiqueta);
    }

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    let editar = new EditarHandle();
    editar.gasto = gasto;
    botonEditar.classList.add('gasto-editar');
    botonEditar.textContent = 'Editar';
    divGasto.append(botonEditar);
    botonEditar.addEventListener('click', editar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    botonBorrar.classList.add('gasto-borrar');
    botonBorrar.textContent = 'Borrar';
    divGasto.append(botonBorrar);
    botonBorrar.addEventListener('click', borrar);

    let botonEditarFormulario = document.createElement('button');
    botonEditarFormulario.type = 'button';
    let editarFormulario = new EditarHandleFormulario();
    editarFormulario.gasto = gasto;
    botonEditarFormulario.classList.add('gasto-editar-formulario');
    botonEditarFormulario.textContent = 'Editar (formulario)';
    divGasto.append(botonEditarFormulario);
    botonEditarFormulario.addEventListener('click', editarFormulario);
    
    contenedorPrincipal.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedorPrincipal = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');

    let divEncabezado = document.createElement('h1');
    divEncabezado.classList.add('encabezado');

    if (periodo === 'dia') {
        divEncabezado.textContent = 'Gastos agrupados por día';
    }
    else if (periodo === 'anyo') {
        divEncabezado.textContent = 'Gastos agrupados por año';
    }
    else {
        divEncabezado.textContent = `Gastos agrupados por ${periodo}`;
    }
    divAgrupacion.append(divEncabezado);

    for (let periodoGasto in agrup) {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.classList.add('agrupacion-dato');
        divAgrupacion.append(divAgrupacionDato);

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.classList.add('agrupacion-dato-clave');
        spanAgrupacionDatoClave.textContent = periodoGasto;
        divAgrupacionDato.append(spanAgrupacionDatoClave);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.classList.add('agrupacion-dato-valor');
        spanAgrupacionDatoValor.textContent = `${agrup[periodoGasto].toFixed(2)} €`;
        divAgrupacionDato.append(spanAgrupacionDatoValor);
    }
    contenedorPrincipal.append(divAgrupacion);
}

function repintar() {
    let presupuesto = gesPre.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuesto);

    let gastosTotales = gesPre.calcularTotalGastos().toFixed(2);
    mostrarDatoEnId('gastos-totales', `Gastos totales: ${gastosTotales}`);

    let balanceTotal = gesPre.calcularBalance().toFixed(2);
    mostrarDatoEnId('balance-total', `Balance: ${balanceTotal}`);

    document.getElementById('listado-gastos-completo').innerHTML = '';
    for (let gasto of gesPre.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

function actualizarPresupuestoWeb() {
    let result = prompt('Introduce un presupuesto');
    result = Number(result);
    gesPre.actualizarPresupuesto(result);
    repintar();
}
let botonPresupuesto = document.getElementById('actualizarpresupuesto');
botonPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt('Introduce una descripción');
    let valor = prompt('Introduce un valor');
    let fecha = prompt('Introduce una fecha (yyyy-mm-dd)');
    let etiquetas = prompt('Introduce las etiquetas');
    valor = Number(valor);
    etiquetas = etiquetas.split(',');
    let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gesPre.anyadirGasto(gasto);
    repintar();
}
let botonGasto = document.getElementById('anyadirgasto');
botonGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function() {
        let descripcion = prompt('Introduce una descripcion', this.gasto.descripcion);
        let valor = prompt('Introduce un valor', this.gasto.valor);
        let fecha = prompt('Introduce una fecha (yyyy-mm-dd)', new Date(this.gasto.fecha).
        toISOString().slice(0, 10));
        let etiquetas = prompt('Introduce las etiquetas', this.gasto.etiquetas.join(','));
        valor = Number(valor);
        etiquetas = etiquetas.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function() {
        gesPre.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}

function nuevoGastoWebFormulario(evento) {
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector('form');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        let descripcion = evento.target.elements.descripcion.value;
        let valor = Number(evento.target.elements.valor.value);
        let fecha = evento.target.elements.fecha.value;
        let etiquetas = evento.target.elements.etiquetas.value.split(',');
        let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gesPre.anyadirGasto(gasto);
        repintar();
        let boton = document.getElementById('anyadirgasto-formulario');
        boton.disabled = false;
    });

    let botonCancelar = formulario.querySelector('button.cancelar');
    let cancelar = new CancelarHandle();
    cancelar.formulario = formulario;
    cancelar.boton = evento.currentTarget;
    botonCancelar.addEventListener('click', cancelar);
    evento.currentTarget.disabled = true;
    document.getElementById('controlesprincipales').append(plantillaFormulario);
}
let botonGastoFormulario = document.getElementById('anyadirgasto-formulario');
botonGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

function CancelarHandle() {
    this.handleEvent = function() {
        this.formulario.remove();
        this.boton.disabled = false;
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function(evento) {
        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector('form');

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas.join(',');

        let editarGasto = new EditarGastoFormularioHandle();
        editarGasto.gasto = this.gasto;
        formulario.addEventListener('submit', editarGasto);

        let botonCancelar = formulario.querySelector('button.cancelar');
        let cancelar = new CancelarHandle();
        cancelar.formulario = formulario;
        cancelar.boton = evento.currentTarget;
        botonCancelar.addEventListener('click', cancelar);

        evento.currentTarget.disabled = true;
        evento.currentTarget.parentElement.append(plantillaFormulario);
    }
}

function EditarGastoFormularioHandle() {
    this.handleEvent = function(evento) {
        evento.preventDefault();

        let descripcion = evento.target.elements.descripcion.value;
        let valor = Number(evento.target.elements.valor.value);
        let fecha = evento.target.elements.fecha.value;
        let etiquetas = evento.target.elements.etiquetas.value.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        for (let etiqueta of [...this.gasto.etiquetas]) {
            this.gasto.borrarEtiquetas(etiqueta);
        }
        this.gasto.anyadirEtiquetas(...etiquetas);
        evento.target.remove();
        repintar();
    };
}


// Export.
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}