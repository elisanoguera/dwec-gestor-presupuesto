// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

//variable array para almacenar los gastos

let gastos = [];

//variable para almacenar el id de los gastos
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

//función constructora hace uso del operador this y para crear objetos basados en ella utiliza el operador new.
function CrearGasto(descripcion, valor,fecha, ...etiquetas) {

    //propiedades

    //descripción
    this.descripcion = descripcion;
    //valor
    this.valor = valor;
    //comprobar el valor del gasto, si es un número y mayor o igual a 0, se asigna a la propiedad valor, de lo contrario se asigna 0.
   if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }
 //mostrar gasto completo, se utiliza el método toLocaleString() para formatear la fecha en un formato legible.
    this.mostrarGastoCompleto = function() {
    let resultado =
        `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
        `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
        `Etiquetas:`;

    for (let etiqueta of this.etiquetas) {
        resultado += `\n  ${etiqueta}`;
    }

    return resultado;
    };
    //Actualizar fecha
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
    // para la fecha comprobamos si se ha proporcionado un valor válido, si no se proporciona o es inválido, se asigna la fecha actual.
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
    //utilizar el operador rest para permitir que se pasen múltiples etiquetas como argumentos. Luego, las almacenamos en un array llamado etiquetas.
    this.etiquetas = [];

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        this.etiquetas.push(...nuevasEtiquetas); // se utiliza el operador spread para agregar las nuevas etiquetas al array existente de etiquetas.
    };
    
    //metodos
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
       if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
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
