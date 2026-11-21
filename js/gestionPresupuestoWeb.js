import * as gestionPresupuesto from './gestionPresupuesto.js';

// ============================================================
// 1. FUNCIONES PARA INTERACTUAR CON EL DOM
// ============================================================
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

// ============================================================
// 2. FUNCIONES PARA CREAR ELEMENTOS HTML
// ============================================================
let crearDivConClase = (clase) => {
    let elemento = document.createElement('div');
    elemento.className = clase;
    return elemento;
};

let crearSpanConClase = (clase) => {
    let elemento = document.createElement('span');
    elemento.className = clase;
    return elemento;
};

let crearSpanConClaseYHandler = (clase, handler) => {
    let elemento = document.createElement('span');
    elemento.className = clase;
    elemento.addEventListener('click', handler);
    return elemento;
};

let crearButtonConClaseYHandler = (nombre, clase, evento, handler) => {
    let elemento = document.createElement('button');
    elemento.className = clase;
    elemento.textContent = nombre;
    elemento.type = 'button';
    elemento.addEventListener(evento, handler);
    return elemento;
};

let crearFormConIdPlantilla = (idPlantilla) => {
    let plantilla = document.getElementById(idPlantilla);
    let copiaPlantilla = plantilla.content.cloneNode(true);
    return copiaPlantilla.querySelector('form');
}

function redondearDosCifras(numero) {
    return Math.round(numero * 100) / 100;
}


// ============================================================
// 3. FUNCIONES PARA PINTAR LOS DATOS EN EL HTML
// ============================================================
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
        let etiquetaGasto = crearSpanConClaseYHandler(
            'gasto-etiquetas-etiqueta',
            new BorrarEtiquetasHandle(gasto, etiqueta));

        etiquetaGasto.textContent = etiqueta;
        etiquetasGasto.append(etiquetaGasto);
    });

    //Crear los botones con sus objetos manejadores de eventos
    let btnEditarPrompt = crearButtonConClaseYHandler(
        'Editar (prompt)',
        'gasto-editar',
        'click',
        new EditarHandle(gasto));
        
    let btnBorrar = crearButtonConClaseYHandler(
        'Borrar',
        'gasto-borrar',
        'click',
        new BorrarHandle(gasto));

    let btnEditarForm = crearButtonConClaseYHandler(
        'Editar (form)',
        'gasto-editar-formulario',
        'click',
        new EditarHandleForm(gasto));

    divGasto.append(
        descripcionGasto,
        fechaGasto,
        valorGasto,
        etiquetasGasto,
        btnEditarPrompt,
        btnBorrar,
        btnEditarForm,
    );

    anyadirElementoEnId(idElemento, divGasto);
};

//Pintar lista de gastos
let mostrarListaGastoWeb = function(listaGastos, idElemento) {
    listaGastos.forEach((gasto) => {
        mostrarGastoWeb(idElemento, gasto)
    });
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

//Pintar agrupación de gastos
let mostrarGastosAgrupadosWeb = function(idElemento, agrup, periodo) {
    let divAgrupacion = crearDivConClase('agrupacion');
    let tituloAgrupacion = document.createElement('h1');
    
    tituloAgrupacion.textContent = `Gastos agrupados por ${pasarPeriodoACastellano(periodo)}`;
    divAgrupacion.append(tituloAgrupacion);
    
    for (let grupoFecha in agrup) {
        let valorGrupo = agrup[grupoFecha];

        let agrupacionDato = crearDivConClase('agrupacion-dato');
        let agrupacionDatoClave = crearSpanConClase('agrupacion-dato-clave');
        agrupacionDatoClave.textContent = grupoFecha;
        let agrupacionDatoValor = crearSpanConClase('agrupacion-dato-valor');
        agrupacionDatoValor.textContent = valorGrupo;

        agrupacionDato.append(agrupacionDatoClave, agrupacionDatoValor);
        divAgrupacion.append(agrupacionDato);
    }

    anyadirElementoEnId(idElemento, divAgrupacion);
}


// ============================================================
// 4. ACTUALIZAR LA INTERFAZ
// ============================================================

//Actualiza presupuesto, gastos totales, balance y listado
// de la página al añadir, borrar o modificar un gasto
let repintar = () => {
    //Listamos los gastos actualizados 
    let gastosCompletos = gestionPresupuesto.listarGastos();

    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
  
    mostrarDatoEnId('gastos-totales', 
        redondearDosCifras(gestionPresupuesto.calcularTotalGastos())
    );
    
    mostrarDatoEnId('balance-total', 
        redondearDosCifras(gestionPresupuesto.calcularBalance())
    );

    //Limpiar para que no se duplique la información del elemento
    limpiarElemento('listado-gastos-completo');
    mostrarListaGastoWeb(gastosCompletos, 'listado-gastos-completo');
}

// ============================================================
// 5. MANEJADORES DE EVENTOS
// ============================================================
//Objeto manejador de eventos - introducir gastos con PORMPT
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

//Objeto manejador de eventos -Introducir gastos con FORM
let EditarHandleForm = function(gasto) {
    this.gasto = gasto;
}

EditarHandleForm.prototype.handleEvent = function(event) {
    let formularioEditarGasto = crearFormConIdPlantilla('formulario-template');
    let btnEnviar = formularioEditarGasto.querySelector('.enviar');
    let btnCancelar = formularioEditarGasto.querySelector('.cancelar');
    
    //Para agregar el form al elemento que contiene al botón clicado
    event.currentTarget.parentElement.append(formularioEditarGasto);

    //Desactiva el botón clicado (Editar (form))
    event.target.disabled = true;

    //Para pintar los gastos actuales en el form:
    let inputConId = (idInput) => {
        return formularioEditarGasto.querySelector('#' + idInput);
    }
    
    inputConId('descripcion').value = this.gasto.descripcion;
    inputConId('valor').value = this.gasto.valor;
    inputConId('fecha').value = this.gasto.obtenerFechaISO().slice(0, 10);
    inputConId('etiquetas').value = this.gasto.etiquetas.join(',');

    //Para actualizar los datos editados en el gasto
    formularioEditarGasto.addEventListener('submit', (event) => {
        event.preventDefault();

        this.gasto.actualizarDescripcion(inputConId('descripcion').value);
        this.gasto.actualizarValor(inputConId('valor').value);
        this.gasto.actualizarFecha(inputConId('fecha').value);
        this.gasto.anyadirEtiquetas(
            ...transformarEtiquetasEnArray(inputConId('etiquetas').value));

        repintar();
    });

    addEventListenerBotonCancelarForm(formularioEditarGasto, btnCancelar, event.target);
}

//Objeto manejador de eventos -BORRAR eventos
function BorrarHandle(gasto) {
    this.gasto = gasto;
}

BorrarHandle.prototype.handleEvent  = function(event) {
    gestionPresupuesto.borrarGasto(this.gasto.id);

    repintar();
}

//Objeto manejador de eventos -BORRAR etiquetas
function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;
}

BorrarEtiquetasHandle.prototype.handleEvent = function(event) {
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
}


// ============================================================
// 6. FUNCIONES PARA LAS ACCIONES DEL USUARIO
// ============================================================
let controlesPrincipales = document.getElementById('controlesprincipales');

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

//Evento para añadir gasto con form
let btnAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');

btnAnyadirGastoForm.addEventListener('click', () => {
    if (btnAnyadirGastoForm.disabled === false) {
        nuevoGastoWebFormulario();
        btnAnyadirGastoForm.disabled = true;
    } 
});

function nuevoGastoWebFormulario() {
    let formGasto = crearFormConIdPlantilla('formulario-template');

    //Botón Enviar del formulario
    let btnEnviar = formGasto.querySelector('.enviar');
    let btnCancelar = formGasto.querySelector('.cancelar');

    formGasto.addEventListener('submit', (event) => {
        event.preventDefault();

        if (gestionarDatosFormAnyadirGasto()) {
            formGasto.remove();
            btnAnyadirGastoForm.disabled = false;
        } else {
            alert('Introduzca una descripción o un valor');
        }
    });
    
    function gestionarDatosFormAnyadirGasto() {
        if (cogerValorInput('descripcion') === '' &&
            cogerValorInput('valor') === '') {
                return false;
            }
    
        let nuevoGasto = new gestionPresupuesto.CrearGasto (
            cogerValorInput('descripcion'),
            cogerValorInput('valor'),
            cogerValorInput('fecha'),
            ...transformarEtiquetasEnArray(cogerValorInput('etiquetas')),
        );

        gestionPresupuesto.anyadirGasto(nuevoGasto);

        repintar();
    
        return true;
    }

    addEventListenerBotonCancelarForm(formGasto, btnCancelar, btnAnyadirGastoForm);

    controlesPrincipales.append(formGasto);
}

//Funciones auxiliares
function cogerValorInput(idInput) {
    return document.getElementById(idInput).value;
}

//Recibe el form, el botón que se clica y el botón Editar que debe reactivarse
function addEventListenerBotonCancelarForm(formulario, btnCancelar, btnAnyadirForm) {
    btnCancelar.addEventListener('click', () => {
        formulario.remove();
        btnAnyadirForm.disabled = false;
    });
}

function transformarEtiquetasEnArray(etiquetasString) {
    //Si el usuario pulsa Cancelar
    if (etiquetasString === null) {
        return [];
    }

    return etiquetasString
        .split(',')
        .map(etiqueta => etiqueta.trim())
        .filter(etiqueta => etiqueta !== '');
}


// ============================================================
// 8. MAIN: DATOS DE PRUEBA E INICIALIZACIÓN
// ============================================================
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

repintar();


// ============================================================
// 9. EXPORTACIONES
// ============================================================
export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}