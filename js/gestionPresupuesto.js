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

//Función constructora de Gasto y sus métodos
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = obtenerValorInicial(valor);
    this.fecha = validarFecha(fecha) ? Date.parse(fecha) : Date.now();
    this.etiquetas = [...etiquetas];
}

CrearGasto.prototype.mostrarGasto = function() {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
};

CrearGasto.prototype.mostrarGastoCompleto = function() {
    return `${this.mostrarGasto()}.` + `\n` +
    `Fecha: ${imprimirFechaFormatoDate(this.fecha)}` + `\n` +
    `Etiquetas:` + `\n` +
    `${imprimirEtiquetas(this.etiquetas)}`;
};

CrearGasto.prototype.actualizarDescripcion = function(descripcion) {
    this.descripcion = descripcion;
};

CrearGasto.prototype.actualizarValor = function(valor) {
    if (esNumeroNoNegativo(valor)) {
        return this.valor = valor;
    }
};

CrearGasto.prototype.actualizarFecha = function (fecha) {
    if (validarFecha(fecha))
        this.fecha = Date.parse(fecha);
};

CrearGasto.prototype.anyadirEtiquetas = function(...etiquetas) {
    etiquetas.forEach(etiqueta => {
        if (!this.etiquetas.includes(etiqueta))
            this.etiquetas.push(etiqueta);
    });
};

CrearGasto.prototype.borrarEtiquetas = function(...etiquetasBorrar){
    this.etiquetas = this.etiquetas.filter(etiquetaParaBorrar => 
        !etiquetasBorrar.includes(etiquetaParaBorrar));  
};

function esNumeroNoNegativo(numero) {
    return Number.isFinite(numero) && numero >= 0;
}

function obtenerValorInicial(numero) {
    return esNumeroNoNegativo(numero) ? numero : 0;
}

function validarFecha(fecha) {
        return Number.isFinite(Date.parse(fecha));
    };

function imprimirFechaFormatoDate(fecha) {
    let fechaImpresa = new Date(fecha);
    return fechaImpresa.toLocaleString();
}

function imprimirEtiquetas(etiquetas) {
    return etiquetas.reduce((impresionEtiquetas, etiqueta) => 
        impresionEtiquetas += `- ${etiqueta}` + `\n`, '');
};

function listarGastos() {
    return [...gastos];
}

function anyadirGasto(gasto) {
    if(gasto instanceof CrearGasto) {
        gasto.id = idGasto;
        idGasto++;
        gastos.push(gasto);
    }
}

function borrarGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

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
