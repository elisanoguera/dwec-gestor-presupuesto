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

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
    };


    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    // Las etiquetas iniciales se añaden con anyadirEtiquetas
    this.anyadirEtiquetas(...etiquetas);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let posicion = gastos.findIndex(gasto => gasto.id === id);
    if (posicion !== -1) {
        gastos.splice(posicion, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
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
