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
    
    this.descripcion = descripcion;
}
    //comprobar el valor del gasto, si es un número y mayor o igual a 0, se asigna a la propiedad valor, de lo contrario se asigna 0.
    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

      //para la fecha comprobamos si se ha proporcionado un valor válido, si no se proporciona o es inválido, se asigna la fecha actual.
    if (!fecha) {
    this.fecha = Date.now();
    } else {
    let timestamp = Date.parse(fecha);

    if (!isNaN(timestamp)) {
        this.fecha = timestamp; //la fecha se almacenará en formato timestamp.
    } else {
        this.fecha = Date.now();
    }
    //
    //utilizar el operador rest para permitir que se pasen múltiples etiquetas como argumentos. Luego, las almacenamos en un array llamado etiquetas.
    this.etiquetas = [];

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        this.etiquetas.push(...nuevasEtiquetas); // se utiliza el operador spread para agregar las nuevas etiquetas al array existente de etiquetas.
    };

    this.anyadirEtiquetas(...etiquetas);

    // Métodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    
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
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
