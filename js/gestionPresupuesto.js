// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(presupActualizado) {
    // TODO
    if (esNumeroNoNegativo(presupActualizado)) {
        return presupuesto = presupActualizado;
    }
    else {
        console.log('Valor incorrecto.');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
        this.descripcion = descripcion;
        this.valor = valor;
        this.fecha = isNaN(Date.parse(fecha)) ? Date.now() : Date.parse(fecha);
        this.etiquetas = [];

        if (!esNumeroNoNegativo(this.valor)) this.valor = 0;

        this.mostrarGasto = function() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
        };
        this.actualizarDescripcion = function(descripcion) {
            this.descripcion = descripcion;
        };
        this.actualizarValor = function(valor) {
            if (esNumeroNoNegativo(valor)) this.valor = valor;
        };
        this.mostrarGastoCompleto = function() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
${saltoLineaCadena(this.etiquetas)}`
        }
        this.actualizarFecha = function(fecha) {
            if (!isNaN(Date.parse(fecha))) this.fecha = Date.parse(fecha);
        }
        this.anyadirEtiquetas = function(...etiquetas) {
            for (let etiqueta of etiquetas) {
                if (!this.etiquetas.includes(etiqueta)) {
                    this.etiquetas.push(etiqueta);
                }
            }
        }
        this.anyadirEtiquetas(...etiquetas);

        this.borrarEtiquetas = function(...etiquetas) {
            for (let etiqueta of etiquetas) {
                let index = this.etiquetas.indexOf(etiqueta);

                if (index >= 0) this.etiquetas.splice(index, 1);
            }
        }

        this.obtenerPeriodoAgrupacion = function(periodo) {
            let fecha = new Date(this.fecha);

            if (periodo === 'anyo') {
                return fecha.getFullYear().toString();
            }
            else if (periodo === 'mes') {
                return `${fecha.getFullYear()
                .toString()}-${(fecha.getMonth() + 1)
                .toString().padStart(2, '0')}`;
            }
            else if (periodo === 'dia') {
                return `${fecha.getFullYear()
                .toString()}-${(fecha.getMonth() + 1)
                .toString().padStart(2, '0')}-${fecha.getDate()
                .toString().padStart(2, '0')}`;
            }
        }
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let gasto of gastos) {

        if (id === gasto.id) {
            let index = gastos.indexOf(gasto);
            gastos.splice(index, 1);

            return;
        }
    }
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function calcularTotalGastos() {
    let totalGasto = 0;

    for (let gasto of gastos) {
        totalGasto += gasto.valor;
    }

    return totalGasto;
}

function listarGastos() {
    return gastos;
}

function filtrarGastos(filtros) {
    let resultado = gastos.filter(function(gasto) {
        if (filtros.fechaDesde !== undefined) {
            if (gasto.fecha < Date.parse(filtros.fechaDesde)) return false;
        }

        if (filtros.fechaHasta !== undefined) {
            if (gasto.fecha > Date.parse(filtros.fechaHasta)) return false;
        }

        if (filtros.valorMinimo !== undefined) {
            if (gasto.valor < filtros.valorMinimo) return false;
        }

        if (filtros.valorMaximo !== undefined) {
            if (gasto.valor > filtros.valorMaximo) return false;
        }
        
        if (filtros.descripcionContiene !== undefined) {
            if (!gasto.descripcion.toLowerCase().
            includes(filtros.descripcionContiene.toLowerCase())) return false;
        }
        
        if (filtros.etiquetasTiene !== undefined) {
            for (let etiqueta of filtros.etiquetasTiene) {
                if (gasto.etiquetas.includes(etiqueta)) return true;
            }

            return false;
        }

        return true;
    });

    return resultado;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    let filtros = {
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    }

    let gastosFiltrados = filtrarGastos(filtros);

    let resultado = gastosFiltrados.reduce(function(acumulador, gasto) {
        let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acumulador[periodoGasto] === undefined) {
            acumulador[periodoGasto] = 0;
        }

        acumulador[periodoGasto] += gasto.valor;
        return acumulador;
    }, {});

    return resultado;
}

// Función auxiliar.
function esNumeroNoNegativo(num) {
    return (typeof num === 'number' && num >= 0) ? true : false;
}
function saltoLineaCadena(etiquetas) {
    let textoEtiquetas = '';

    for (let i = 0; i < etiquetas.length; i++) {
        textoEtiquetas += `- ${etiquetas[i]}\n`;
    }

    return textoEtiquetas;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    anyadirGasto,
    borrarGasto,
    calcularBalance,
    calcularTotalGastos,
    listarGastos,
    filtrarGastos,
    agruparGastos
}
