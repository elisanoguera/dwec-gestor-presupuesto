//Funciones para interactuar con el DOM
let mostrarDatoEnId = function(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

let anyadirElementoEnId = function(idElemento, elementoParaAnyadir) {
    let elemento = document.getElementById(idElemento);
    elemento.append(elementoParaAnyadir);
}

let crearDivConClase = function(clase) {
    let elemento = document.createElement('div');
    elemento.className = clase;
    return elemento;
}

let crearSpanConClase = function(clase) {
    let elemento = document.createElement('span');
    elemento.className = clase;
    return elemento;
}

//Un elemento es como un objeto, hay que copiarlo con elemento.cloneNode(true);
//Copia los elementos y todos los descendentes (true) pero no copia eventos
let mostrarGastoWeb = function(idElemento, gasto) {
    let divGasto = crearDivConClase('gasto');
    let descripcionGasto = crearDivConClase('gasto-descripcion');
    let fechaGasto = crearDivConClase('gasto-fecha');
    let valorGasto = crearDivConClase('gasto-valor');
    let etiquetasGasto = crearDivConClase('gasto-etiquetas');

    descripcionGasto.textContent = gasto.descripcion;
    fechaGasto.textContent =  gasto.obtenerFechaISO();
    valorGasto.textContent = gasto.valor;
    
    gasto.etiquetas.forEach((etiqueta) => {
        let etiquetaGasto = crearSpanConClase('gasto-etiquetas-etiqueta');
        etiquetaGasto.textContent = etiqueta;
        etiquetasGasto.append(etiquetaGasto);
    })

    divGasto.append(
        descripcionGasto,
        fechaGasto,
        valorGasto,
        etiquetasGasto
    );

    anyadirElementoEnId(idElemento, divGasto);
}

let pasarPeriodoACastellano = function(periodo) {
    if (periodo === 'mes')
        return 'mes';
    if (periodo === 'dia')
        return 'día';
    if (periodo === 'anyo')
        return 'año';
    throw new Error('El período no es válido');
}

let mostrarGastosAgrupadosWeb = function(idElemento, agrup, periodo) {
    let divAgrupacion = crearDivConClase('agrupacion');
    let tituloAgrupacion = document.createElement('h1');
    
    tituloAgrupacion.textContent = `Gastos agrupados por ${pasarPeriodoACastellano(periodo)}`;
    divAgrupacion.append(tituloAgrupacion);
    
    for (let [grupoFecha, valorGrupo] of Object.entries(agrup)) {
        let agrupacionDato = crearDivConClase('agrupacion-dato');
        let agrupacionDatoClave = crearSpanConClase('agrupacion-dato-clave');
        agrupacionDatoClave.textContent = grupoFecha;
        let agrupacionDatoValor = crearSpanConClase('agrupacion-dato-valor');
        agrupacionDatoValor.textContent = valorGrupo;
        agrupacionDato.append(agrupacionDatoClave, agrupacionDatoValor);
        divAgrupacion.append(agrupacionDato);
    }

    document.getElementById(idElemento).append(divAgrupacion);
}

export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}