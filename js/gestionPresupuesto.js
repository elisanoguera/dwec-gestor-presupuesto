// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoValor) {
    if (!esNumeroNoNegativo(nuevoValor)) {
        return -1;
    }
    presupuesto = nuevoValor;
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

//PRUEBAS--------
//let gasto1 = new CrearGasto('descr', 23.55, "2021-10-06T13:10Z");
//console.log(gasto1.mostrarGastoCompleto());
//PRUEBAS------------

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = obtenerValorInicial(valor);
    //Si es fecha válida la almacena en timestamp
    //Si no es fecha válida almacena la fecha actual
    this.fecha = validarYTransformarFechaATimestamp(fecha);
    //Añade una etiqueta
    this.etiquetas = [...etiquetas];
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    //Devuelve fecha en formato local
    this.mostrarGastoCompleto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.` + `\n` +
        `Fecha: ${imprimirFechaFormatoDate(this.fecha)}` + `\n` +
        `Etiquetas:` + `\n` +
        `${imprimirEtiquetas(this.etiquetas)}`;
    };

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    };
    this.actualizarValor = valor => {
        if (esNumeroNoNegativo(valor)) {
            this.valor = valor;
        }
    };
    this.actualizarFecha = fecha => {
        let fechaTimestamp = Date.parse(fecha);
        if (Number.isFinite(fechaTimestamp))
            this.fecha = fechaTimestamp;
    };
    //Comprobando que no haya duplicados
    this.anyadirEtiquetas = function(...etiquetas) {
        etiquetas.forEach(etiqueta => {
            if (this.etiquetas.indexOf(etiqueta) === -1)
                this.etiquetas.push(etiqueta);
        });
    };
    this.borrarEtiquetas = function(...etiquetas){
        let estiquetasFiltradas = [];
        etiquetas.forEach(etiquetaParaBorrar => {
            estiquetasFiltradas = this.etiquetas.filter(etiqueta =>
                etiqueta !== etiquetaParaBorrar);
            this.etiquetas = estiquetasFiltradas;
        });
    };
}

function imprimirEtiquetas(etiquetas) {
    let impresionEtiquetas = '';
    for (let etiqueta of etiquetas){
        impresionEtiquetas += `- ${etiqueta}` + `\n`;
    }
    return impresionEtiquetas;
};

    let gasto1 = new CrearGasto("descripción del gasto", 5, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
    console.log(gasto1.mostrarGastoCompleto());

function esNumeroNoNegativo(numero) {
    return Number.isFinite(numero) && numero >= 0;
}

function obtenerValorInicial(numero) {
    return esNumeroNoNegativo(numero) ? numero : 0;
}

function validarYTransformarFechaATimestamp(fecha) {
        let fechaTimestamp = Date.parse(fecha);
        if (Number.isFinite(fechaTimestamp))
            return fechaTimestamp;
        else
            return Date.now();
    };

function imprimirFechaFormatoDate(fecha) {
    let fechaImpresa = new Date(fecha);
    return fechaImpresa.toLocaleString();
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
    let gastosFiltrados = gastos.filter(gasto => gasto.id != id);
    gastos = gastosFiltrados;
}

function calcularTotalGastos() {
    let total = 0;
    gastos.forEach(gasto => total += gasto.valor);
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
