// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let gastos = [];
let idGasto = 0;
let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (typeof nuevoPresupuesto !== "number" || !(nuevoPresupuesto >= 0)) {
        console.error("El presupuesto debe ser un número no negativo.");
        return -1;
    }

    presupuesto = nuevoPresupuesto;
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
 
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.etiquetas = etiquetas;

    const fechaConvertida = Date.parse(fecha);
    if (Number.isNaN(fechaConvertida)) {
    this.fecha = Date.now();
    } else {
    this.fecha = fechaConvertida;
   }
    if (typeof valor !== "number" || !(valor >= 0)) {
        this.valor = 0;
    } else {
        
        this.valor = valor;
    }
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor) {
    if (typeof nuevoValor === "number" && nuevoValor >= 0) {
        this.valor = nuevoValor;
    }
    };
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
    for (const etiqueta of nuevasEtiquetas) {
        if (!this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta);
            }
        }
    };
        this.borrarEtiquetas = function(...etiquetasParaBorrar) {
        for (const etiqueta of etiquetasParaBorrar) {
        const index = this.etiquetas.indexOf(etiqueta);
            if (index !== -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    };
        this.actualizarFecha = function(nuevaFecha) {
        const fechaNueva = Date.parse(nuevaFecha);

        if (!Number.isNaN(fechaNueva)) {
            this.fecha = fechaNueva;
        }
    };
        this.mostrarGastoCompleto = function() {
        const fechaFormateada = new Date(this.fecha).toLocaleString();
        const etiquetasFormateadas = this.etiquetas.length > 0
            ? `- ${this.etiquetas.join("\n- ")}`
            : "";

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaFormateada}
Etiquetas:
${etiquetasFormateadas}
`;
    };

       this.obtenerPeriodoAgrupacion = function(periodo) {
       const fecha = new Date(this.fecha);
       const anyo = fecha.getFullYear();

       let mes = fecha.getMonth() + 1;
       let dia = fecha.getDate();

        if (mes < 10) {
        mes = "0" + mes;
        }

         if (dia < 10) {
         dia = "0" + dia;
        }

         if (periodo === "dia") {
         return `${anyo}-${mes}-${dia}`;
        }

        if (periodo === "mes") {
        return `${anyo}-${mes}`;
         }

        if (periodo === "anyo") {
        return `${anyo}`;
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
    const index = gastos.findIndex(gasto => gasto.id === id);

    if (index !== -1) {
        gastos.splice(index, 1);
    }
}
function calcularTotalGastos() {
    let totalGastos = 0;

    for (const gasto of gastos) {
        totalGastos += gasto.valor;
    }

    return totalGastos;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros){
    let gastosFiltrados = gastos;

    if (filtros.fechaDesde) {
        const fechaMinima = Date.parse(filtros.fechaDesde);

        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha >= fechaMinima);
    }


    if (filtros.fechaHasta) {
        const fechaMaxima = Date.parse(filtros.fechaHasta);

        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha <= fechaMaxima);
    }

    
    if(filtros.valorMinimo !== undefined) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= filtros.valorMinimo);
    }


   if(filtros.valorMaximo !== undefined) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= filtros.valorMaximo);
    }


   if (filtros.descripcionContiene) {
    const textoBuscado = filtros.descripcionContiene.toLowerCase();

    gastosFiltrados = gastosFiltrados.filter(gasto => gasto.descripcion.toLowerCase().includes(textoBuscado)
        
    );
}

    if(filtros.etiquetasTiene) {
    
        const etiquetasBuscadas = filtros.etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());

        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.etiquetas.some(etiqueta => etiquetasBuscadas.includes(etiqueta.toLowerCase())));
     
    }





    return gastosFiltrados;
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    if (!fechaHasta) {
        const hoy = new Date();
        const anyo = hoy.getFullYear();
        let mes = hoy.getMonth() + 1;
        let dia = hoy.getDate();

        if (mes < 10) {
            mes = "0" + mes;
        }

        if (dia < 10) {
            dia = "0" + dia;
        }

        fechaHasta = `${anyo}-${mes}-${dia}`;
    }

    const filtros = {
        fechaHasta: fechaHasta
    };

    if (fechaDesde) {
        filtros.fechaDesde = fechaDesde;
    }

    if (etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    const gastosFiltrados = filtrarGastos(filtros);

    return gastosFiltrados.reduce((acc, gasto) => {

    const clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

    if (acc[clavePeriodo] === undefined) {
        acc[clavePeriodo] = 0;
    }

    acc[clavePeriodo] += gasto.valor;
    return acc;
   },{});
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
