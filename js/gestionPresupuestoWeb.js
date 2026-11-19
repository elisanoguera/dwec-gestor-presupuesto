//Funciones para interactuar con el DOM
import * as gestionPresupuesto from './gestionPresupuesto.js';


//Actualizar presupuesto, total, balance, listado gastos...
//al añadir, borrar o modificar un gasto
let repintar = () => {
    
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
  
    mostrarDatoEnId('gastos-totales', 
        redondearDosCifras(gestionPresupuesto.calcularTotalGastos())
    );
    
    mostrarDatoEnId('balance-total', 
        redondearDosCifras(gestionPresupuesto.calcularBalance())
    );

    let gastosCompletos = gestionPresupuesto.listarGastos();

    let mostrarListaGastoWeb = function(listaGastos, idElemento) {

        listaGastos.forEach((gasto) => {
            mostrarGastoWeb(idElemento, gasto)
        });
    };

    limpiarElemento('listado-gastos-completo');
    mostrarListaGastoWeb(gastosCompletos, 'listado-gastos-completo');
}

//Evento para actualizar presupuesto con prompt
let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');

btnActualizarPresupuesto.addEventListener('click', () => {
    let nuevoPresupuesto = prompt('Introduzca un nuevo presupuesto:');
    
    if (gestionPresupuesto.esNumeroNoNegativo(nuevoPresupuesto)) {
        gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
        repintar();
    } else {
        alert('Por favor, inserte un númeroválido mayor que 0.');
    }
});

//Evento para añadir gasto con prompts
let btnAnyadirGasto = document.getElementById('anyadirgasto');

btnAnyadirGasto.addEventListener('click', () => {
    nuevoGastoWeb();
});

function nuevoGastoWeb() {
        let gasto = new gestionPresupuesto.CrearGasto(
        prompt('Introduzca la descripción del gasto:'),
        prompt('Introduzca el valor del gasto:'),
        prompt('Introduzca la fecha del gasto:'),
        ...transformarEtiquetasEnArray(prompt('Introduzca las etiquetas separadas por comas:'))
    );

    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function transformarEtiquetasEnArray(etiquetasString) {
    return etiquetasString.split(',').map(etiqueta => etiqueta.trim());
}

//Objeto manejador de eventos EditarHandle
function EditarHandle(gasto) {
    this.gasto = gasto;
}

EditarHandle.prototype.handleEvent = function(event) {
    let descripcion = prompt(
        'Introduzca la descripción:',
        this.gasto.descripcion
    );

    let valor = prompt(
        'Introduzca el valor:',
        this.gasto.valor
    );

    let fecha = prompt(
        'Introduzca la fecha:',
        this.gasto.obtenerFechaISO()
    );

    let etiquetas = prompt(
        'Introduzca las etiquetas separadas por comas:',
        this.gasto.etiquetas.join(',')
    );

    valor = Number(valor);
    etiquetas = transformarEtiquetasEnArray(etiquetas);

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
};

let objetoManejador = {
    handleEvent(event) {
        alert(event.type + ' en ' + event.currentTarget);
    }
};

let handler = {
    handleEvent(event) {
        alert(event.type + ' en ' + event.currentTarget);
    }
};


//Funciones para pintar datos en el HTML
let limpiarElemento = (idElemento) => {
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = '';
};

let mostrarDatoEnId = (idElemento, valor) => {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
};

let anyadirElementoEnId = (idElemento, elementoParaAnyadir) => {
    let elemento = document.getElementById(idElemento);
    elemento.append(elementoParaAnyadir);
};

let crearDivConClase = (clase) => {
    let elemento = document.createElement('div');
    elemento.className = clase;
    return elemento;
};

let crearSpanConClaseYHandler = (clase) => {
    let elemento = document.createElement('span');
    elemento.className = clase;
    elemento.addEventListener('click', handler);
    return elemento;
};

let crearButtonConClaseYHandler = (nombre, clase, handler) => {
    let elemento = document.createElement('button');
    elemento.className = clase;
    elemento.textContent = nombre;
    elemento.addEventListener('click', handler);
    return elemento;
};

function redondearDosCifras(numero) {
    return Math.round(numero * 100) / 100;
}

//Pintar el gasto
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
        let etiquetaGasto = crearSpanConClaseYHandler('gasto-etiquetas-etiqueta', handler);
        etiquetaGasto.textContent = etiqueta;
        etiquetasGasto.append(etiquetaGasto);
    })

    let btnEditar = crearButtonConClaseYHandler(
        'Editar',
        'gasto-editar',
        new EditarHandle(gasto));

    let btnBorrar = crearButtonConClaseYHandler('Borrar', 'gasto-borrar', objetoManejador);

    divGasto.append(
        descripcionGasto,
        fechaGasto,
        valorGasto,
        etiquetasGasto,
        btnEditar,
        btnBorrar
    );

    anyadirElementoEnId(idElemento, divGasto);
};

let pasarPeriodoACastellano = (periodo) => {
    let periodos = {
        mes: 'mes',
        dia: 'día',
        anyo: 'año'
    };

    if (!periodos[periodo]) {
        throw new Error('El período no es válido');
    }

    return periodos[periodo];
};

//Pintar una agrupación de gastos
let mostrarGastosAgrupadosWeb = function(idElemento, agrup, periodo) {
    let divAgrupacion = crearDivConClase('agrupacion');
    let tituloAgrupacion = document.createElement('h1');
    
    tituloAgrupacion.textContent = `Gastos agrupados por ${pasarPeriodoACastellano(periodo)}`;
    divAgrupacion.append(tituloAgrupacion);
    
    for (let [grupoFecha, valorGrupo] of Object.entries(agrup)) {
        let agrupacionDato = crearDivConClase('agrupacion-dato');
        let agrupacionDatoClave = crearSpanConClaseYHandler('agrupacion-dato-clave', handler);
        agrupacionDatoClave.textContent = grupoFecha;
        let agrupacionDatoValor = crearSpanConClaseYHandler('agrupacion-dato-valor', handler);
        agrupacionDatoValor.textContent = valorGrupo;
        agrupacionDato.append(agrupacionDatoClave, agrupacionDatoValor);
        divAgrupacion.append(agrupacionDato);
    }

    anyadirElementoEnId(idElemento, divAgrupacion);
}



//DATOS DE PRUEBA----------------------------------------------------------------
gestionPresupuesto.actualizarPresupuesto(1500);

let datosDeGastos = [
    ["Compra carne", 23.44, "2021-10-06", "casa", "comida"],
    ["Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"],
    ["Bonobús", 18.60, "2020-05-26", "transporte"],
    ["Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"],
    ["Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"],
    ["Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"]
];

datosDeGastos.forEach((datosDeUnGasto) => {
    let nuevoGasto = new gestionPresupuesto.CrearGasto(...datosDeUnGasto);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
});

mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

mostrarDatoEnId('gastos-totales', 
    Math.round(gestionPresupuesto.calcularTotalGastos() * 100) / 100
);

mostrarDatoEnId('balance-total', 
    Math.round(gestionPresupuesto.calcularBalance() * 100) / 100
);

let gastosCompletos = gestionPresupuesto.listarGastos();

let mostrarListaGastoWeb = function(listaGastos, idElemento) {
    listaGastos.forEach((gasto) => {
        mostrarGastoWeb(idElemento, gasto)
    }
)};

mostrarListaGastoWeb(gastosCompletos, 'listado-gastos-completo');



export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}