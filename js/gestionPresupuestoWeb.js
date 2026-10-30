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
        divGastoEtiquetas.append(spanEtiqueta);
    });

    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    divGasto.append(divGastoEtiquetas)
    elementById.append(divGasto);
};

export const mostrarGastosAgrupadosWeb = (idElemento, agrup, periodo) => {
    let elementById = document.getElementById(idElemento);
    if (!elementById) return;

    let divAgrupacion = document.createElement('div');
    divAgrupacion.setAttribute("class", "agrupacion");

    let h1GastosAgrupadosPeriodo = document.createElement('h1');
    h1GastosAgrupadosPeriodo.textContent = `Gastos agrupados por ${periodo}`;

    divAgrupacion.append(h1GastosAgrupadosPeriodo);

    Object.entries(agrup).forEach(([key, value]) => {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.setAttribute('class', "agrupacion-dato");
        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.setAttribute('class', "agrupacion-dato-clave");
        spanAgrupacionDatoClave.textContent = key;
        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.setAttribute('class', "agrupacion-dato-valor");
        spanAgrupacionDatoValor.textContent = value;

        divAgrupacionDato.append(spanAgrupacionDatoClave);
        divAgrupacionDato.append(spanAgrupacionDatoValor);
        divAgrupacion.append(divAgrupacionDato);
    })

    elementById.append(divAgrupacion);
};