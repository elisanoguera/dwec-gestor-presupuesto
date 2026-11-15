
// Importamos las funciones desde el archivo gestionPresupuesto.js
import * as gestionPresupuesto from './gestionPresupuesto.js';

// Exportamos las funciones para que puedan ser utilizadas en otros módulos
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

// Función para repintar la interfaz web con los datos actuales del presupuesto y los gastos

function repintar() {
    // Mostrar el presupuesto actual
    mostrarDatoEnId(
        'presupuesto',
        gestionPresupuesto.mostrarPresupuesto()
    );

    // Mostrar el total de gastos
    mostrarDatoEnId(
        'gastos-totales',
        gestionPresupuesto.calcularTotalGastos()
    );

    // Mostrar el balance actual
    mostrarDatoEnId(
        'balance-total',
        gestionPresupuesto.calcularBalance()
    );

    // Obtener el elemento HTML donde se mostrarán los gastos
    const gastosElemento = document.getElementById('listado-gastos-completo');

    // Comprobar que el elemento existe
    if (!gastosElemento) {
        return;
    }

    // Limpiar el contenido actual
    gastosElemento.innerHTML = '';

    // Obtener todos los gastos actuales
    const listadoGastosCompleto = gestionPresupuesto.listarGastos();

    // Mostrar cada gasto
    listadoGastosCompleto.forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
}



// Función para actualizar presupuesto
function actualizarPresupuestoWeb() {
    // Solicitamos el presupuesto con prompt
    const nuevoPresupuesto = prompt('Introduce el nuevo presupuesto:');

    // Comprobamos si el usuario ha cancelado
    if (nuevoPresupuesto === null) {
        return;
    }

    // Convertimos el texto en número con parseFloat
    const presupuestoNumerico = parseFloat(nuevoPresupuesto);

    // Actualizamos el presupuesto mediante el módulo de negocio
    gestionPresupuesto.actualizarPresupuesto(presupuestoNumerico);

    // Repintamos la interfaz para reflejar el nuevo presupuesto
    repintar();
}

// REGISTRO DE EVENTOS DEL BOTÓN DE ACTUALIZAR PRESUPUESTO
const botonActualizar = document.getElementById('actualizarpresupuesto');

botonActualizar.addEventListener('click', actualizarPresupuestoWeb);




// Función que añade un nuevo gasto a la lista de gastos y repinta la interfaz
function nuevoGastoWeb() {

    // Solicitamos la descripción del gasto
    const descripcion = prompt('Introduce la descripción del gasto:');

    // Comprobamos si el usuario ha cancelado
    if (descripcion === null) {
        return;
    }

    // Solicitamos el valor del gasto
    const valorTexto = prompt('Introduce el valor del gasto:');

    // Comprobamos si el usuario ha cancelado
    if (valorTexto === null) {
        return;
    }

    // Convertimos el texto en un número
    const valor = parseFloat(valorTexto);

    // Comprobamos si el valor es válido
    if (!Number.isFinite(valor) || valor < 0) {
        alert('El valor del gasto no es válido.');
        return;
    }

    // Solicitamos la fecha del gasto
    const fechaTexto = prompt('Introduce la fecha del gasto (formato: YYYY-MM-DD):');

    // Comprobamos si el usuario ha cancelado
    if (fechaTexto === null) {
        return;
    }

    // Convertimos el texto en un objeto Date
    const fecha = new Date(fechaTexto);

    // Comprobamos si la fecha es válida
    if (isNaN(fecha.getTime())) {
        alert('La fecha del gasto no es válida.');
        return;
    }

    // Solicitamos las etiquetas del gasto
    const etiquetasTexto = prompt('Introduce las etiquetas del gasto (separadas por comas):');

    // Comprobamos si el usuario ha cancelado
    if (etiquetasTexto === null) {
        return;
    }

    // Convertimos el texto de etiquetas en un array
    const etiquetas = etiquetasTexto
        .split(',')
        .map(etiqueta => etiqueta.trim())
        .filter(etiqueta => etiqueta !== '');

    // Creamos un nuevo objeto Gasto
    const nuevoGasto = new gestionPresupuesto.CrearGasto(
        descripcion,
        valor,
        fechaTexto,
        ...etiquetas
    );

    // Añadimos el gasto en la lógica de negocio
    gestionPresupuesto.anyadirGasto(nuevoGasto);

    // Volvemos a pintar la interfaz
    repintar();
}

// REGISTRO DE EVENTOS DEL BOTÓN DE AÑADIR GASTO
const botonAnadirGasto = document.getElementById('anyadirgasto');

botonAnadirGasto.addEventListener('click', nuevoGastoWeb);




// Función constructora para editar un gasto existente
function EditarHandle(gasto) {

    // Guardamos la referencia al gasto que se va a editar
    this.gasto = gasto;

    // Método que se ejecutará al pulsar el botón Editar
    this.handleEvent = function () {

        // Solicitamos los nuevos datos del gasto
        const nuevaDescripcion = prompt('Introduce la nueva descripción del gasto:');

        if (nuevaDescripcion === null) return;

        const nuevoValorTexto = prompt('Introduce el nuevo valor del gasto:');

        if (nuevoValorTexto === null) return;

        // Convertimos el valor a número
        const nuevoValor = parseFloat(nuevoValorTexto);

        // Comprobamos que el valor sea válido
        if (!Number.isFinite(nuevoValor) || nuevoValor < 0) {
            alert('El valor del gasto no es válido.');
            return;
        }

        const nuevaFechaTexto = prompt('Introduce la nueva fecha del gasto (formato: YYYY-MM-DD):');

        if (nuevaFechaTexto === null) return;

        // Comprobamos que la fecha sea válida
        if (Number.isNaN(Date.parse(nuevaFechaTexto))) {
            alert('La fecha del gasto no es válida.');
            return;
        }

        const nuevasEtiquetasTexto = prompt('Introduce las nuevas etiquetas (separadas por comas):');

        if (nuevasEtiquetasTexto === null) return;

        // Convertimos las etiquetas en un array
        const nuevasEtiquetas = nuevasEtiquetasTexto
            .split(',')
            .map(etiqueta => etiqueta.trim())
            .filter(etiqueta => etiqueta !== '');

        // Actualizamos las propiedades del gasto
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(nuevaFechaTexto);

        // Sustituimos las etiquetas anteriores por las nuevas
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        // Repintamos la interfaz
        repintar();
    };
}


// Función constructora para borrar un gasto
function BorrarHandle(gasto) {

    // Guardamos la referencia al gasto que se va a borrar
    this.gasto = gasto;

    // Método que se ejecutará cuando se pulse el botón Borrar
    this.handleEvent = function () {

        // Borramos el gasto utilizando su ID
        gestionPresupuesto.borrarGasto(this.gasto.id);

        // Repintamos la interfaz
        repintar();
    };
}


// Función constructora para borrar una etiqueta de un gasto
function BorrarEtiquetasHandle(gasto, etiqueta) {

    // Guardamos la referencia al gasto
    this.gasto = gasto;

    // Guardamos la etiqueta que queremos eliminar
    this.etiqueta = etiqueta;

    // Método que se ejecutará al pulsar sobre la etiqueta
    this.handleEvent = function () {

        // Borramos la etiqueta del gasto
        this.gasto.borrarEtiquetas(this.etiqueta);

        // Repintamos la interfaz
        repintar();
    };
}


// Función constructora para manejar la cancelación de un formulario
function CancelarHandle(formulario, boton) {

    this.formulario = formulario;
    this.boton = boton;

    this.handleEvent = function () {

        // Eliminamos el formulario de la página
        this.formulario.remove();

        // Volvemos a activar el botón que abrió el formulario
        this.boton.removeAttribute('disabled');
    };
}




function EditarHandleFormulario(gasto) {

    this.gasto = gasto;

    this.handleEvent = function (event) {

        // Copiar la plantilla del formulario
        const plantillaFormulario = document
            .getElementById('formulario-template')
            .content.cloneNode(true);

        // Obtener el formulario
        const formulario = plantillaFormulario.querySelector('form');

        // Rellenar los campos con los datos actuales del gasto
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;

        // Convertir la fecha a formato YYYY-MM-DD
        const fecha = new Date(this.gasto.fecha);
        const anyo = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');

        formulario.elements.fecha.value = `${anyo}-${mes}-${dia}`;

        // Mostrar las etiquetas separadas por comas
        formulario.elements.etiquetas.value =
            this.gasto.etiquetas.join(', ');

        // Crear el manejador del envío del formulario
        const manejadorSubmit = new EditarSubmitHandle(this.gasto);
        formulario.addEventListener('submit', manejadorSubmit);

        // Obtener el botón que ha abierto el formulario
        const botonEditarFormulario = event.currentTarget;

        // Obtener el botón Cancelar
        const botonCancelar = formulario.querySelector('button.cancelar');

        // Asociar el manejador de cancelación
        const manejadorCancelar = new CancelarHandle(
            formulario,
            botonEditarFormulario
        );

        botonCancelar.addEventListener('click', manejadorCancelar);

        // Desactivar el botón de edición
        botonEditarFormulario.setAttribute('disabled', '');

        // Añadir el formulario dentro del gasto correspondiente
        botonEditarFormulario.parentElement.append(plantillaFormulario);
    };
}



// Función constructora para gestionar el envío del formulario de edición
function EditarSubmitHandle(gasto) {

    this.gasto = gasto;

    this.handleEvent = function (event) {

        // Evitar que el formulario recargue la página
        event.preventDefault();

        // Obtener el formulario
        const formulario = event.currentTarget;

        // Obtener los valores introducidos
        const descripcion = formulario.elements.descripcion.value;
        const valor = parseFloat(formulario.elements.valor.value);
        const fecha = formulario.elements.fecha.value;

        const etiquetas = formulario.elements.etiquetas.value
            .split(',')
            .map(etiqueta => etiqueta.trim())
            .filter(etiqueta => etiqueta !== '');

        // Actualizar los datos del gasto
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        // Sustituir las etiquetas anteriores por las nuevas
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiquetas);

        // Eliminar el formulario
        formulario.remove();

        // Actualizar la interfaz
        repintar();
    };
}



// Función para mostrar el formulario de creación de gastos
function nuevoGastoWebFormulario() {

    // Copiamos el contenido de la plantilla HTML
    const plantillaFormulario = document
        .getElementById('formulario-template')
        .content.cloneNode(true);

    // Obtenemos el formulario de la plantilla
    const formulario = plantillaFormulario.querySelector('form');

    // Obtenemos el botón que ha abierto el formulario
    const botonFormulario = document.getElementById('anyadirgasto-formulario');

    // Manejamos el envío del formulario
    formulario.addEventListener('submit', function (event) {

        // Evitamos que se recargue la página
        event.preventDefault();

        // Obtenemos los campos del formulario
        const datosFormulario = event.currentTarget;

        const descripcion = datosFormulario.elements.descripcion.value;
        const valor = parseFloat(datosFormulario.elements.valor.value);
        const fecha = datosFormulario.elements.fecha.value;

        const etiquetas = datosFormulario.elements.etiquetas.value
            .split(',')
            .map(etiqueta => etiqueta.trim())
            .filter(etiqueta => etiqueta !== '');

        // Creamos el nuevo gasto
        const nuevoGasto = new gestionPresupuesto.CrearGasto(
            descripcion,
            valor,
            fecha,
            ...etiquetas
        );

        // Añadimos el gasto
        gestionPresupuesto.anyadirGasto(nuevoGasto);

        // Eliminamos el formulario
        formulario.remove();

        // Actualizamos la interfaz
        repintar();

        // Reactivamos el botón
        botonFormulario.removeAttribute('disabled');
    });

    // Obtenemos el botón Cancelar
    const botonCancelar = formulario.querySelector('button.cancelar');

    // Creamos su manejador de eventos
    const manejadorCancelar = new CancelarHandle(
        formulario,
        botonFormulario
    );

    botonCancelar.addEventListener('click', manejadorCancelar);

    // Desactivamos el botón mientras el formulario está abierto
    botonFormulario.setAttribute('disabled', '');

    // Añadimos el formulario a los controles principales
    document.getElementById('controlesprincipales')
        .append(plantillaFormulario);
}

// Registramos el evento del botón de formulario
const botonAnadirFormulario = document.getElementById('anyadirgasto-formulario');

botonAnadirFormulario.addEventListener('click', nuevoGastoWebFormulario);



// Muestra un valor de texto dentro de un elemento HTML.
function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);

    if (elemento) {
        elemento.textContent = valor;
    }
}


// Muestra un gasto dentro del elemento HTML indicado.
function mostrarGastoWeb(idElemento, gasto) {

    // Obtener el elemento HTML por su ID
    const elemento = document.getElementById(idElemento);

    // Verificar que el elemento y el gasto existen
    if (!elemento || !gasto) {
        return;
    }

    // Crear el HTML para las etiquetas del gasto
    const etiquetasHTML = gasto.etiquetas.map(etiqueta => {
        return `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`;
    }).join('');

    // Crear el HTML para el gasto completo
    const gastoHTML = `
        <div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleDateString()}</div>
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">
                ${etiquetasHTML}
            </div>
            <button class="gasto-editar" type="button">Editar</button>
            <button class="gasto-borrar" type="button">Borrar</button>
            <button class="gasto-editar-formulario" type="button">
                Editar (formulario)
            </button>
        </div>
    `;

    // Añadir el HTML del gasto al elemento sin reconstruir los gastos anteriores
    elemento.insertAdjacentHTML('beforeend', gastoHTML);

    // Obtener el elemento del gasto que acabamos de añadir
    const gastoElemento = elemento.lastElementChild;

    // Obtener el botón Editar
    const botonEditar = gastoElemento.querySelector('.gasto-editar');

    // Crear y asociar el manejador de edición
    const manejadorEditar = new EditarHandle(gasto);
    botonEditar.addEventListener('click', manejadorEditar);

    // Obtener el botón Borrar
    const botonBorrar = gastoElemento.querySelector('.gasto-borrar');

    // Crear y asociar el manejador de borrado
    const manejadorBorrar = new BorrarHandle(gasto);
    botonBorrar.addEventListener('click', manejadorBorrar);

    // Obtener el botón Editar (formulario)
    const botonEditarFormulario = gastoElemento.querySelector(
        '.gasto-editar-formulario'
    );

    // Crear el manejador de edición mediante formulario
    const manejadorEditarFormulario = new EditarHandleFormulario(gasto);

    // Asociar el evento click
    botonEditarFormulario.addEventListener(
        'click',
        manejadorEditarFormulario
    );

    // Obtener todas las etiquetas del gasto
    const etiquetasElementos = gastoElemento.querySelectorAll('.gasto-etiquetas-etiqueta');

    // Asociar un manejador de borrado a cada etiqueta
    etiquetasElementos.forEach((elementoEtiqueta, indice) => {

        // Obtener el texto de la etiqueta correspondiente
        const etiqueta = gasto.etiquetas[indice];

        // Crear el manejador para borrar la etiqueta
        const manejadorEtiqueta = new BorrarEtiquetasHandle(gasto, etiqueta);

        // Asociar el evento click a la etiqueta
        elementoEtiqueta.addEventListener('click', manejadorEtiqueta);
    });
}



// Muestra los totales agrupados por día, mes o año.
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtener el elemento HTML por su ID
    const elemento = document.getElementById(idElemento);

    // Verificar que el elemento y la agrupación existen
    if (!elemento || !agrup) {
        return;
    }

    // Mapeo de los periodos a su representación en texto
    const periodosTexto = {
        dia: 'día',
        mes: 'mes',
        anyo: 'año'
    };

    // Obtener el texto correspondiente al periodo
    const periodoTexto = periodosTexto[periodo];

    // Crear el HTML para cada agrupación
    const agrupacionesHTML = Object.entries(agrup).map(([clave, total]) => {
        return `
            <div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${clave}</span>
                <span class="agrupacion-dato-valor">${total}</span>
            </div>
        `;
    }).join('');

    // Crear el HTML final para la agrupación y añadirlo al elemento
    elemento.innerHTML = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodoTexto}</h1>
            ${agrupacionesHTML}
        </div>
    `;
}
