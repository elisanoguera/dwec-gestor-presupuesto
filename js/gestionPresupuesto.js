// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
  // TODO

  if (typeof valor === 'number' && valor >= 0) {
    presupuesto = valor;
    return presupuesto;
  } else {
    console.log(
      `Error: el valor introducido ${valor} no es un número no negativo`,
    );
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

  if (typeof valor === 'number' && valor >= 0) {
    this.valor = valor;
  } else {
    this.valor = 0;
  }

  if (typeof fecha === 'string' && !isNaN(Date.parse(fecha))) {
    this.fecha = Date.parse(fecha);
  } else {
    this.fecha = Date.now();
  }

  this.etiquetas = [];

  this.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let etiqueta of nuevasEtiquetas) {
      if (!this.etiquetas.includes(etiqueta)) {
        this.etiquetas.push(etiqueta);
      }
    }
  };

  this.anyadirEtiquetas(...etiquetas);

  //Métodos

  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  };

  this.mostrarGastoCompleto = function () {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;

    texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
    texto += `Etiquetas:`;

    for (let etiqueta of this.etiquetas) {
      texto += `\n - ${etiqueta}`;
    }

    return texto;
  };

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  };

  this.actualizarValor = function (nuevoValor) {
    if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
      this.valor = nuevoValor;
    }
  };

  this.actualizarFecha = function (nuevaFecha) {
    if (typeof nuevaFecha === 'string' && !isNaN(Date.parse(nuevaFecha))) {
      this.fecha = Date.parse(nuevaFecha);
    }
  };

  this.borrarEtiquetas = function (...etiquetas) {
    for (let etiqueta of etiquetas) {
      let posicion = this.etiquetas.indexOf(etiqueta);

      if (posicion !== -1) {
        this.etiquetas.splice(posicion, 1);
      }
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
  let posicion = gastos.findIndex((gasto) => gasto.id === id);

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
  let balance = presupuesto - calcularTotalGastos();
  return balance;
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
};
