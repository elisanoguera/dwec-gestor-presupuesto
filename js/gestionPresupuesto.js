let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(newBudget) {
  if (typeof newBudget === "number" && newBudget > 0) {
    presupuesto = newBudget;
    return presupuesto;
  } else {
    console.error("El nuevo presupuesto no es válido");
    return -1;
  }
}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  const timestamp = Date.parse(fecha);

  this.descripcion = descripcion;
  this.valor = typeof valor === "number" && valor >= 0 ? valor : 0;
  this.fecha = isNaN(timestamp) ? Date.now() : timestamp;
  this.etiquetas = etiquetas.length > 0 ? etiquetas : [];

  this.mostrarGasto = () => `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
  this.mostrarGastoCompleto = () =>
    `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
    `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
    `Etiquetas:\n` +
    `${this.etiquetas.map((e) => `- ${e}`).join("\n")}\n`;
  this.actualizarDescripcion = (descripcion) =>
    (this.descripcion = descripcion);
  this.actualizarValor = function (valor) {
    if (typeof valor === "number" && valor > 0) this.valor = valor;
  };
  this.actualizarFecha = (fecha) => {
    this.fecha = !isNaN(Date.parse(fecha)) ? Date.parse(fecha) : this.fecha;
  };
  this.anyadirEtiquetas = (...etiquetas) => {
    this.etiquetas = [...new Set([...this.etiquetas, ...etiquetas])];
  };
  this.borrarEtiquetas = (...etiquetas) => {
    this.etiquetas = this.etiquetas.filter((e) => !etiquetas.includes(e));
  };
  this.obtenerPeriodoAgrupacion = (periodo) => {
    let fechaAsDate = new Date(this.fecha);
    const anyo = fechaAsDate.getFullYear();
    const mes = (fechaAsDate.getMonth() + 1).toString().padStart(2, "0");
    const dia = fechaAsDate.getDate().toString().padStart(2, "0");


    switch(periodo){
      case "mes": return `${anyo}-${mes}`;
      case "anyo": return anyo;
      case "dia": return `${anyo}-${mes}-${dia}`;
      default: return "";
    }
  }
}

function listarGastos() {
  return gastos;
}

function anyadirGasto(gastoObject) {
  gastoObject.id = idGasto++;
  gastos.push(gastoObject);
}

function borrarGasto(gastoId) {
  gastos = gastos.filter((gasto) => gasto.id !== gastoId);
}

function calcularTotalGastos() {
  return gastos.reduce((final, gasto) => final + gasto.valor, 0);
}
function calcularBalance() {
  let gastosTotales = calcularTotalGastos();

  return presupuesto - gastosTotales;
}

function filtrarGastos(objeto) {
  let gastosFiltrados = gastos;

  if (Object.keys(objeto).length === 0) return gastosFiltrados;

  if ("fechaDesde" in objeto) {
    const timestampDesde = Date.parse(objeto.fechaDesde);
    gastosFiltrados = gastos.filter(gasto => gasto.fecha >= timestampDesde);
  }

  if ("fechaHasta" in objeto) {
    const timestampHasta = Date.parse(objeto.fechaHasta);
    gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha <= timestampHasta);
  }

  if ("valorMinimo" in objeto) {
    gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= objeto.valorMinimo);
  }

  if ("valorMaximo" in objeto) {
    gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= objeto.valorMaximo);
  }

  if ("descripcionContiene" in objeto) {
    gastosFiltrados = gastosFiltrados.filter(gasto => gasto.descripcion.toLowerCase().includes(objeto.descripcionContiene.toLowerCase()));
  }

  if ("etiquetasTiene" in objeto) {
    gastosFiltrados = gastosFiltrados.filter(gasto => {
      return gasto.etiquetas.some(etiqueta => objeto.etiquetasTiene.includes(etiqueta));
    });
  }

  return gastosFiltrados
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta = new Date() ) {
  let filters = {};

  if (fechaDesde !== undefined) filters.fechaDesde = fechaDesde;
  if (fechaHasta !== undefined) filters.fechaHasta = fechaHasta;
  if (etiquetas !== undefined && etiquetas.length > 0) filters.etiquetasTiene = etiquetas;

  let gastosFiltrados = filtrarGastos(filters);

  return gastosFiltrados.reduce((acc, gasto) => {
    let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

    if (!(periodoAgrupacion in acc)) acc[periodoAgrupacion] = 0;

    acc[periodoAgrupacion] += gasto.valor;

    return acc;
  }, {})
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
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
};
