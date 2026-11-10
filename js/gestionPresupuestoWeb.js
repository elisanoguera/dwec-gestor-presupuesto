
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    let elementoId = document.getElementById(idElemento); // Buscar idElemento dentro del HTML (se pone sin comillas).
    elementoId.textContent = valor; // Mostrar valor del Id
}

function mostrarGastoWeb(idElemento, gasto)
{
    // Elemento gasto
    let elementoGasto = document.createElement("div"); // Creo un contenedor div principal
    elementoGasto.className = "gasto"; // Le asigno su clase a div -> <div class="gasto"></div>

    let elementoId = document.getElementById(idElemento); // Localizar el contenedor donde irá el gasto
    elementoId.append(elementoGasto); // Introduzco el gasto en el contenedor <div class="gasto-descripcion">prueba</div>

    // Elemento gasto-descripción (dentro de Gasto)
    let elementoDescripcion = document.createElement("div"); // Creo un div para la siguiente etiqueta que es gasto-descripcion
    elementoDescripcion.className = "gasto-descripcion"; // Asigno una clase al div <div class="gasto-descripcion"></div>
    
    elementoGasto.append(elementoDescripcion); // Introducir la descripción dentro del padre elementoGasto
    elementoDescripcion.textContent = gasto.descripcion; // Introducir texto dentro de un elemento HTML (sin comillas para que no se vea como texto el div gasto.descripcion)

    // Elemento gasto-fecha (dentro de Gasto)
    let elementoFecha = document.createElement("div"); // Creo div para fecha
    elementoFecha.className = "gasto-fecha"; // Asigno una clase al div <div class="gasto-fecha"></div>

    elementoGasto.append(elementoFecha); // Introducir descripción dentro del padre
    elementoFecha.textContent = gasto.fecha; // Introducir texto HTML dentro del div fecha

    // Elemento gasto-valor (dentro de Gasto)
    let elementoValor = document.createElement("div"); // Creo div para valor
    elementoValor.className = "gasto-valor"; // Asigno una clase al div <div class="gasto-valor"></div>

    elementoGasto.append(elementoValor); // Introducir valor dentro del padre
    elementoValor.textContent = gasto.valor; // Introducir texto HTML dentro del div valor

    // Elemento gasto-etiquetas (dentro de Gasto)
    let elementoEtiquetas = document.createElement("div"); // Creo div para etiquetas 
    elementoEtiquetas.className = "gasto-etiquetas"; // Asigno una clase al div <div class="gasto-etiquetas"></div>

    // Recorro los elementos de gasto.etiquetas
    for(let elemento of gasto.etiquetas)
    {
        let elementoEtiquetasSpan = document.createElement("span"); // Se crea solamente un span
        elementoEtiquetasSpan.className = "gasto-etiquetas-etiqueta";

        elementoEtiquetas.append(elementoEtiquetasSpan); // Introduzco cada span dentro del div contenedor
        elementoEtiquetasSpan.textContent = elemento;

        // Eventos span
        let borrarEtiquetasHandle = new BorrarEtiquetasHandle(); // Crear nuevo objeto a raíz de la función constructora BorrarEtiquetasHandle
        borrarEtiquetasHandle.gasto = gasto; // Establecerle la propiedad gasto
        borrarEtiquetasHandle.etiqueta = elemento; // Establecer propiedad etiqueta al texto de la etiqueta (llamado elemento)

        elementoEtiquetasSpan.addEventListener("click", borrarEtiquetasHandle); // Pasar al elemento etiquetas span el click y la nueva propiedad
    }

    elementoGasto.append(elementoEtiquetas); // Introducir valor dentro de elementoGasto

    // Función 8. Modificación de la función mostrarGastoWeb
    
    // Botón editar
    let botonEditar = document.createElement("button"); // Creo un elemento button <button>
    botonEditar.classList.add('gasto-editar'); // Asigno su clase class
    botonEditar.type = 'button'; // type="button"
    botonEditar.textContent = "Editar"; // Añadir texto dentro de los <button>

    let editarManejador = new EditarHandle(); // Crear objeto manejador + new EditarHandle
    editarManejador.gasto = gasto; // Pasarle gasto al botón
        
    botonEditar.addEventListener("click", editarManejador); // Agrego el evento click + asociar objeto a evento
    elementoGasto.appendChild(botonEditar); // Lo inserto en el <body>
        
    // Botón borrar
    let botonBorrar = document.createElement("button"); // Crear elemento botón <button>
    botonBorrar.classList.add('gasto-borrar'); // Asigno su clase class
    botonBorrar.type = 'button'; // Asigno su type = "button"
    botonBorrar.textContent = "Borrar"; // Añadir texto dentro de <button>

    let borrarManejador = new BorrarHandle(); // Crear objeto manejador + new BorrarHandle
    borrarManejador.gasto = gasto; // Pasarle gasto al botón

    botonBorrar.addEventListener("click", borrarManejador); // Añadirle click una vez asociado a gasto
    elementoGasto.appendChild(botonBorrar); // Añadir DOM
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elementoId = document.getElementById(idElemento);

    // Elemento agrupación
    let elementoAgrupacion = document.createElement("div"); // Creo div para agrupacion
    elementoAgrupacion.className = "agrupacion"; // Asigno una clase al div <div class="agrupacion"></div>
    elementoId.append(elementoAgrupacion); // Introducir valor dentro de elementoId
    
    // Elemento título h1
    let elementoTitulo = document.createElement("h1"); // Crear una etiqueta h1 para meter los elementos

    if(periodo == "dia")
    {
       elementoTitulo.textContent = "Gastos agrupados por día";
    }
    else if(periodo == "mes")
    {
        elementoTitulo.textContent = "Gastos agrupados por mes";
    }
    else
    {
        elementoTitulo.textContent = "Gastos agrupados por año";
    }

    elementoAgrupacion.append(elementoTitulo); // Introducir valor dentro de Agrupacion

    // Recorrer el agrup
    for(let elemento of Object.entries(agrup)) // Agrup es un objeto y no un array, por eso lo recorro con object.entries
    {
        let elementoAgrupacionDato = document.createElement("div"); // Se crea un div para la clave
        elementoAgrupacionDato.className = "agrupacion-dato"; // Asignar clase dentro del div

        let elementoClave = document.createElement("span"); // Crear span para la clave
        elementoClave.className = "agrupacion-dato-clave"; // Se pone esto dentro del span
        elementoClave.textContent = elemento[0]; // El elemento 0 contiene la clave
        
        let elementoValor = document.createElement("span"); // Crear span para valor
        elementoValor.className = "agrupacion-dato-valor"; // Se pone esto dentro del span
        elementoValor.textContent = elemento[1]; // El elemento 1 contiene el valor

        // Dentro del padre introduzco los spans
        elementoAgrupacionDato.append(elementoClave);
        elementoAgrupacionDato.append(elementoValor);

        // Introduzco el div en la agrupación principal
        elementoAgrupacion.append(elementoAgrupacionDato);
    }
}

function repintar()
{
    // Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    let presupuestoActual = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuestoActual); // No poner delante gestionPresupuestoWeb.js para llamar a la página porque estamos ya en la misma página

    // Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    let gastosTotales = gestionPresupuesto.calcularTotalGastos(); // No recibe parámetros
    mostrarDatoEnId("gastos-totales", gastosTotales); // id del elemento + valor

    // Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    // Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById("listado-gastos-completo").innerHTML = ""; // Dejar vacío el contenido de la lista antes de mostrar los gastos

    // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let listadoGastos = gestionPresupuesto.listarGastos();

    for(let gasto of listadoGastos)
    {
        mostrarGastoWeb("listado-gastos-completo", gasto); // id + gasto
    }
}

function actualizarPresupuestoWeb()
{
    let introducirPresupuesto = prompt("Introducir texto", '');

    if(introducirPresupuesto != null)
    {
        let presupuesto = parseFloat(introducirPresupuesto); // Convertir el presupuesto en float
        gestionPresupuesto.actualizarPresupuesto(presupuesto); // Actualizar presupuesto
        repintar(); // Llamar a repintar
    }
}

// Registrar evento: Añadir click del botón actualizar presupuesto mediante addEventListener
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    // Pedir al usuario la información necesaria con prompt
    let descripcion = prompt("Descripción");
    let valor = prompt("Valor");
    let fecha = prompt("Fecha");
    let etiquetas = prompt("Etiquetas");
    
    let valorActualizado = parseFloat(valor); // Convertir valor a número
    let etiquetasActualizadas = etiquetas.split(","); // Convertir etiquetas con split
    
    // Crear objeto gasto
    let nuevoGasto = new gestionPresupuesto.CrearGasto(
        descripcion,
        valorActualizado,
        fecha,
        ...etiquetasActualizadas
    );

    // Añadir el nuevo gasto creado justo arriba
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    
    // Ejecutar repintar
    repintar();
}

// Se añadirá como manejadora del evento click del botón anyadirgasto mediante addEventListener
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

// Función 5. EditarHandle
function EditarHandle()
{
    this.handleEvent = function()
    {
        let descripcion = prompt("Descripción", this.gasto.descripcion);
        let valor = prompt("Valor", this.gasto.valor);
        let fecha = prompt("Fecha", this.gasto.fecha);
        let etiquetas = prompt("Etiquetas", this.gasto.etiquetas.join(","));

        valor = parseFloat(valor); // Convertir valor a número
        etiquetas = etiquetas.split(","); // Convertir etiquetas con split
        
        // Actualizar descripción, valor, fecha y etiquetas del objeto gasto
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        // Borrar las etiquetas anteriores y añadir las nuevas
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

// Función 6. BorrarHandle
function BorrarHandle()
{
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    };
}

// Función 7. BorrarEtiquetasHandle
function BorrarEtiquetasHandle()
{
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    };
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
