import * as gp from "./gestionPresupuesto.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
  document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
});

export const mostrarDatoEnId = (idElemento, valor) => {
  let elementById = document.getElementById(idElemento);
  if (elementById) elementById.textContent = valor;
};

export const mostrarGastoWeb = (idElemento, gasto) => {
  let elementById = document.getElementById(idElemento);
  if (!elementById) return;

  let divGasto = document.createElement("div");
  divGasto.setAttribute("class", "gasto");

  let divGastoDescripcion = document.createElement("div");
  divGastoDescripcion.setAttribute("class", "gasto-descripcion");
  divGastoDescripcion.textContent = gasto.descripcion;

  let divGastoFecha = document.createElement("div");
  divGastoFecha.setAttribute("class", "gasto-fecha");
  divGastoFecha.textContent = gasto.fecha;

  let divGastoValor = document.createElement("div");
  divGastoValor.setAttribute("class", "gasto-valor");
  divGastoValor.textContent = gasto.valor;

  let divGastoEtiquetas = document.createElement("div");
  divGastoEtiquetas.setAttribute("class", "gasto-etiquetas");

  gasto.etiquetas.forEach((etiqueta) => {
    let spanEtiqueta = document.createElement("span");
    spanEtiqueta.setAttribute("class", "gasto-etiquetas-etiqueta");
    spanEtiqueta.textContent = etiqueta;

    let deleteTagsHandler = new BorrarEtiquetasHandle();
    deleteTagsHandler.gasto = gasto;
    deleteTagsHandler.etiqueta = etiqueta;
    spanEtiqueta.addEventListener("click", deleteTagsHandler);

    divGastoEtiquetas.append(spanEtiqueta);
  });

  let btnEditar = document.createElement("button");
  btnEditar.setAttribute("type", "button");
  btnEditar.setAttribute("class", "gasto-editar");
  btnEditar.textContent = "Editar";
  let editHandler = new EditarHandle();
  editHandler.gasto = gasto;
  btnEditar.addEventListener("click", editHandler);

  let btnBorrar = document.createElement("button");
  btnBorrar.setAttribute("type", "button");
  btnBorrar.setAttribute("class", "gasto-borrar");
  btnBorrar.textContent = "Borrar";
  let deleteHandler = new BorrarHandle();
  deleteHandler.gasto = gasto;
  btnBorrar.addEventListener("click", deleteHandler);

  divGasto.append(divGastoDescripcion);
  divGasto.append(divGastoFecha);
  divGasto.append(divGastoValor);
  divGasto.append(divGastoEtiquetas);
  divGasto.append(btnEditar);
  divGasto.append(btnBorrar);
  elementById.append(divGasto);
};

export const mostrarGastosAgrupadosWeb = (idElemento, agrup, periodo) => {
  let elementById = document.getElementById(idElemento);
  if (!elementById) return;

  let divAgrupacion = document.createElement("div");
  divAgrupacion.setAttribute("class", "agrupacion");

  let h1GastosAgrupadosPeriodo = document.createElement("h1");
  h1GastosAgrupadosPeriodo.textContent = `Gastos agrupados por ${periodo}`;

  divAgrupacion.append(h1GastosAgrupadosPeriodo);

  Object.entries(agrup).forEach(([key, value]) => {
    let divAgrupacionDato = document.createElement("div");
    divAgrupacionDato.setAttribute("class", "agrupacion-dato");
    let spanAgrupacionDatoClave = document.createElement("span");
    spanAgrupacionDatoClave.setAttribute("class", "agrupacion-dato-clave");
    spanAgrupacionDatoClave.textContent = key;
    let spanAgrupacionDatoValor = document.createElement("span");
    spanAgrupacionDatoValor.setAttribute("class", "agrupacion-dato-valor");
    spanAgrupacionDatoValor.textContent = value;

    divAgrupacionDato.append(spanAgrupacionDatoClave);
    divAgrupacionDato.append(spanAgrupacionDatoValor);
    divAgrupacion.append(divAgrupacionDato);
  });

  elementById.append(divAgrupacion);
};

const repintar = () => {
  mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
  mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
  mostrarDatoEnId("balance-total", gp.calcularBalance());
  document.getElementById("listado-gastos-completo").innerHTML = null;

  gp.listarGastos().forEach((gasto) =>
    mostrarGastoWeb("listado-gastos-completo", gasto),
  );
};

const actualizarPresupuestoWeb = () => {
  gp.actualizarPresupuesto(parseInt(prompt("Introduce un prespuesto")));
  repintar();
};

const nuevoGastoWeb = () => {
  gp.anyadirGasto(
    new gp.CrearGasto(
      prompt("Dime la descripción del gasto"),
      parseInt(prompt("Dime el valor del gasto")),
      Date.parse(prompt("Dime la fecha del gasto")),
      ...prompt("Dime las etiquetas del gasto separado por comas").split(','),
    ),
  );
  repintar();
};

function EditarHandle() {
  this.handleEvent = () => {
    this.gasto.actualizarDescripcion(prompt("Dime la descripción del gasto", this.gasto.descripcion));
    this.gasto.actualizarValor(parseFloat(prompt("Dime el valor del gasto", this.gasto.valor)));
    this.gasto.actualizarFecha(Date.parse(prompt("Dime la fecha del gasto", this.gasto.fecha)));
    this.gasto.anyadirEtiquetas(...prompt("Dime las etiquetas del gasto separado por comas", this.gasto.etiquetas.join(",")).split(","));
    
    repintar();
  };
}

function BorrarHandle() {
    this.handleEvent = () => {
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = () => {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}
