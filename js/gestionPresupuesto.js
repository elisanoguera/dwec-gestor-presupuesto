// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// TODO: Variable global


function actualizarPresupuesto(valor) {
    // TODO
    let resultado = -1;
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        resultado = presupuesto;
    } else {
        console.log("Error: el presupuesto debe ser un número no negativo");
    }
    return resultado;

}

function mostrarPresupuesto() {
    // TODO
     return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO

    idGasto++;

    // Propiedades del objeto gasto
    this.descripcion = descripcion;
    this.valor = (typeof valor === "number" && valor >= 0) ? valor : 0;

    // Fecha en formato timestamp: si no se indica o no es válida, la fecha actual
    let fechaParseada = Date.parse(fecha);
    this.fecha = isNaN(fechaParseada) ? Date.now() : fechaParseada;

    // Si no se indican etiquetas, array vacío
    this.etiquetas = [];

    // Métodos del objeto gasto
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function() {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    };

    this.actualizarFecha = function(nuevaFecha) {
        let fechaParseada = Date.parse(nuevaFecha);
        if (!isNaN(fechaParseada)) {
            this.fecha = fechaParseada;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };


    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {
}

function borrarGasto() {
}

function calcularTotalGastos() {
}

function calcularBalance() {
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
