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
    valor.textContent = gasto.valor + " €";

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
}