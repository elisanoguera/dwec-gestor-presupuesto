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

export { mostrarDatoEnId, mostrarGastoWeb };
