// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(nuevoValor) {
    if (esNumeroNoNegativo(nuevoValor)) {
        presupuesto = nuevoValor;
        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = obtenerValorInicial(valor);
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };
    this.actualizarValor = function(nuevoValor) {
        if (esNumeroNoNegativo(nuevoValor)) {
            this.valor = nuevoValor;
        }
    };
}

function esNumeroNoNegativo(numero) {
    return Number.isFinite(numero) && numero >= 0;
}

function obtenerValorInicial(numero) {
    if (esNumeroNoNegativo(numero)) {
        return numero;
    } else {
        return 0;
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
