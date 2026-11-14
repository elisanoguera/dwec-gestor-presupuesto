//import 
import * as gestionP from "./gestionPresupuesto.js";


// Función para mostrar un dato en un elemento del DOM con un id específico
function mostrarDatoEnId(idElemento , valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    let descripcion = document.createElement("div"); 
    descripcion.classList.add("gasto-descripcion"); 
    descripcion.textContent = gasto.descripcion; 

    let valor = document.createElement("div");
    valor.classList.add("gasto-valor");
     valor.textContent = gasto.valor;

    let fecha = document.createElement("div");
    fecha.classList.add("gasto-fecha");
    fecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let etiquetas = document.createElement("div");
    etiquetas.classList.add("gasto-etiquetas");

    for(let etiqueta of gasto.etiquetas){

        let span = document.createElement("span");

        span.classList.add(
          "gasto-etiquetas-etiqueta"
        );

        span.textContent = etiqueta;

        etiquetas.append(span);
    }

    divGasto.append(
        descripcion,
        fecha,
        valor,
        etiquetas
    )
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let contenedor =
        document.getElementById(idElemento);

    let divAgrupacion =
        document.createElement("div");

    divAgrupacion.classList.add("agrupacion");

    let titulo =
        document.createElement("h1");

    let textoPeriodo = periodo;

        if (periodo === "dia") {
        textoPeriodo = "día";
    }
    else if (periodo === "anyo") {
        textoPeriodo = "año";
    }

titulo.textContent =
    `Gastos agrupados por ${textoPeriodo}`;

    divAgrupacion.append(titulo);

    for (let [clave, valor] of Object.entries(agrup)) {

        let dato =
            document.createElement("div");

        dato.classList.add("agrupacion-dato");

        let spanClave =
            document.createElement("span");

        spanClave.classList.add(
            "agrupacion-dato-clave"
        );

        spanClave.textContent = clave;

        let spanValor =
            document.createElement("span");

        spanValor.classList.add(
            "agrupacion-dato-valor"
        );

        spanValor.textContent = valor;

        dato.append(spanClave);
        dato.append(spanValor);

        divAgrupacion.append(dato);
    }

    contenedor.append(divAgrupacion);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

//FUNCION REPINTAR 
function repintar() {

  mostrarDatoEnId(
    "presupuesto",
    gestionP.mostrarPresupuesto()
  );

  mostrarDatoEnId(
    "gastos-totales",
    gestionP.calcularTotalGastos()
  );

  mostrarDatoEnId(
    "balance-total",
    gestionP.calcularBalance()
  );

  document.getElementById(
    "listado-gastos-completo"
  ).innerHTML = "";

  gestionP.listarGastos().forEach(
    gasto => mostrarGastoWeb("listado-gastos-completo", gasto)
  );
}