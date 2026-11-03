// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

// variable array para almacenar los gastos

let gastos = [];

// variable para almacenar el id de los gastos
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor === 'number' && valor >= 0) {
        presupuesto = valor;
        return valor;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// función constructora hace uso del operador this y para crear objetos basados en ella utiliza el operador new.
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    // propiedades

    // descripción
    this.descripcion = descripcion;

    // valor
    this.valor = valor;

    // comprobar el valor del gasto
    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    // fecha
    if (!fecha) {
        this.fecha = Date.now();
    } else {
        let timestamp = Date.parse(fecha);

        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        } else {
            this.fecha = Date.now();
        }
    }

    // etiquetas
    this.etiquetas = [];

    // métodos

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {

    let text = "";
    text += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
    text += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
    text += `Etiquetas:\n`;

    for (let e of this.etiquetas) {
        text += `- ${e}\n`;
    }

    return text;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    // Actualizar fecha
    this.actualizarFecha = function (nuevaFecha) {

        let timestamp = Date.parse(nuevaFecha);

        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    };

    // Añadir etiquetas
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {

        for (let etiqueta of nuevasEtiquetas) {

            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }

        }
    };

    // Borrar etiquetas
    this.borrarEtiquetas = function (...etiquetasABorrar) {

        this.etiquetas = this.etiquetas.filter(
            etiqueta => !etiquetasABorrar.includes(etiqueta)
        );

    };

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

    let indice = gastos.findIndex(gasto => gasto.id === id);

    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
    }

    function calcularTotalGastos() {

        let total = 0;

        for (let ga of gastos) {
        total += ga.valor;
        }

        return total;
    }

    function calcularBalance() {

        return presupuesto - calcularTotalGastos();
    }


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
