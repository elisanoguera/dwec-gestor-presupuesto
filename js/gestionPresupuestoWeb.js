function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
  let contenedor = document.getElementById(idElemento);

  let divGasto = document.createElement('div');
  divGasto.className = 'gasto';

  let descripcion = document.createElement('div');
  descripcion.className = 'gasto-descripcion';
  descripcion.textContent = gasto.descripcion;
  divGasto.append(descripcion);

  let fecha = document.createElement('div');
  fecha.className = 'gasto-fecha';
  fecha.textContent = new Date(gasto.fecha).toLocaleString();
  divGasto.append(fecha);

  let valor = document.createElement('div');
  valor.className = 'gasto-valor';
  valor.textContent = gasto.valor;
  divGasto.append(valor);

  let etiquetas = document.createElement('div');
  etiquetas.className = 'gasto-etiquetas';

  for (let etiqueta of gasto.etiquetas) {
    let span = document.createElement('span');
    span.className = 'gasto-etiquetas-etiqueta';
    span.textContent = etiqueta;
    etiquetas.append(span);
  }

  divGasto.append(etiquetas);
  contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let contenedor = document.getElementById(idElemento);

  let divAgrupacion = document.createElement('div');
  divAgrupacion.className = 'agrupacion';

  let titulo = document.createElement('h1');

  if (periodo === 'dia') {
    titulo.textContent = 'Gastos agrupados por día';
  } else if (periodo === 'anyo') {
    titulo.textContent = 'Gastos agrupados por año';
  } else {
    titulo.textContent = 'Gastos agrupados por mes';
  }

  divAgrupacion.append(titulo);

  for (let clave of Object.keys(agrup)) {
    let divDato = document.createElement('div');
    divDato.className = 'agrupacion-dato';

    let spanClave = document.createElement('span');
    spanClave.className = 'agrupacion-dato-clave';
    spanClave.textContent = clave;

    let spanValor = document.createElement('span');
    spanValor.className = 'agrupacion-dato-valor';
    spanValor.textContent = agrup[clave];

    divDato.append(spanClave);
    divDato.append(spanValor);

    divAgrupacion.append(divDato);
  }

  contenedor.append(divAgrupacion);
}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
