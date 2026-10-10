let presupuesto = 0;

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

function CrearGasto(descripcion, valor) {
  this.descripcion = descripcion;
  this.valor = typeof valor === "number" && valor >= 0 ? valor : 0;

  this.mostrarGasto = () =>
    `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  this.actualizarDescripcion = (descripcion) =>
    (this.descripcion = descripcion);
  this.actualizarValor = function (valor) {
    if (typeof valor === "number" && valor > 0) this.valor = valor;
  };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export { mostrarPresupuesto, actualizarPresupuesto, CrearGasto };
