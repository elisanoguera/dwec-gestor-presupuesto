// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
// Añadir las nuevas variables globales
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valorActualizado) {
    // TODO
    if(typeof valorActualizado === "number" && valorActualizado >= 0){
        presupuesto = valorActualizado;
        return presupuesto;
    }
    else
    {
        console.log("Error")
        return - 1;
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = "Tu presupuesto actual es de " +presupuesto+ " €";
    return mensaje;
}
// 1. Propiedades -> Creación del objeto Gasto con Función constructora
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = fecha;
    this.etiquetas = [];

    // TODO
    if(typeof valor === "number" && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    // 2. Métodos a funciones constructoras
this.mostrarGasto = function() {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
};

this.mostrarGastoCompleto = function() {
    let textoEtiquetas = "";

    for (let i = 0; i < this.etiquetas.length; i++) {
        if (i > 0) {
            textoEtiquetas += "\n";
        }

        textoEtiquetas += "- " + this.etiquetas[i];
    }

    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
${textoEtiquetas}
`;
};



            this.actualizarDescripcion = function(descripcion)
            {
                this.descripcion = descripcion;
            };

            
            this.actualizarValor = function(valor) {
            if(typeof valor === "number" && valor >= 0)
            {
                this.valor = valor;
            }
        }

    let fechaNormal = Date.parse(fecha);

    if(isNaN(fechaNormal))
    {
        this.fecha = Date.now();
    }
    else
    {
        this.fecha = fechaNormal;
    }

        this.anyadirEtiquetas = function(...etiquetas)
        {
            for(let i = 0; i < etiquetas.length; i++)
            {
                if(!this.etiquetas.includes(etiquetas[i]))
                {
                    this.etiquetas.push(etiquetas[i]);
                }
            }
        }
        this.anyadirEtiquetas(...etiquetas); // Llamar a this.anyadirEtiquetas)()
        
        this.actualizarFecha = function(fecha)
        {
            let fechaActualizada = Date.parse(fecha);

            if(!isNaN(fechaActualizada))
            {
                this.fecha = fechaActualizada;
            }
        }

        this.borrarEtiquetas = function(...etiquetas)
        {
                for(let i = 0; i < etiquetas.length; i++)
                {
                    let posicion = this.etiquetas.indexOf(etiquetas[i]); // Compruebo la posición de la etiqueta
                    if(posicion !== -1)
                    {
                        this.etiquetas.splice(posicion, 1); // Eliminarla una vez vista la posición
                    }
                }             
        }

        this.obtenerPeriodoAgrupacion = function(periodo)
        {
            let fecha = new Date(this.fecha);
    
            let anyo = fecha.getFullYear(); // 
            let mes = fecha.getMonth() + 1; // Contar meses desde 0, empezamos por 1
            let dia = fecha.getDate();

            let dosNumerosMes = mes.toString().padStart(2, "0");    // Dos cifras desde cero para el mes
            let dosNumerosDia = dia.toString().padStart(2, "0");    // Dos cifras desde cero para el día

            if(periodo === "anyo")
            {
                return anyo.toString();
            }
            if(periodo === "mes")
            {
                return `${anyo}-${dosNumerosMes}`;
            }
            if(periodo === "dia")
            {
                return `${anyo}-${dosNumerosMes}-${dosNumerosDia}`
            }
        }
    }

function listarGastos()
{
return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto; // Asignar identificador actual al gasto.
    idGasto++;  // Incrementar contador para el siguiente gasto.
    gastos.push(gasto); // Añade objeto completo al array.
}

function borrarGasto(id)
{
    for(let i = 0; i < gastos.length; i++)
    {
        if(id == gastos[i].id)
        {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos()
{
    let suma = 0;

    for(let i = 0; i < gastos.length; i++)
    {
        suma = suma + gastos[i].valor;
    }
    return suma;
}

function calcularBalance()
{
    let totalBalance = calcularTotalGastos();

    totalBalance = presupuesto - totalBalance;

    return totalBalance;
}

function filtrarGastos(filtros)
{
    return gastos.filter(function(gasto)
    {
        let seCumple = true;

        if(filtros.fechaDesde) // El gasto no puede ser anterior
        {
            if(gasto.fecha < Date.parse(filtros.fechaDesde))
            {
                seCumple = false;
            }
        }

        if(filtros.fechaHasta) // El gasto no puede ser posterior
        {
            if(gasto.fecha > Date.parse(filtros.fechaHasta))
            {
                seCumple = false;
            }
        }
        
        if(filtros.valorMinimo !== undefined) // En el valor mínimo: el gasto no puede ser inferior
        {
            if(gasto.valor < filtros.valorMinimo)
            {
                seCumple = false;
            }
        }

        if(filtros.valorMaximo !== undefined)
        {
            if(gasto.valor > filtros.valorMaximo)
            {
                seCumple = false;
            }
        }

        if(filtros.descripcionContiene)
        {
            if(!gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase()))
            {
                seCumple = false;   // Si no se encuentra el texto dentro de la descripción, false.
            }
        }

        if(filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0)
        {
            let esCorrecto = filtros.etiquetasTiene.some(function(etiquetaBuscada) // Si al menos una etiqueta del array etiquetas es correcta, devuelvo array etiquetas.
             {
                return gasto.etiquetas.some(function(etiquetaGasto)
                {
                    return etiquetaGasto.toLowerCase() === etiquetaBuscada.toLowerCase();
                });
            });
            
            if(!esCorrecto)
            {
                seCumple = false;
            }
        }

        return seCumple;
    });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta)
{
    
    if(!fechaHasta)
    {
        let hoy = new Date();
        let fechaActual = hoy.toLocaleDateString();   
        fechaHasta = fechaActual;
    }

    let gastosFiltrados = filtrarGastos({
    fechaDesde: fechaDesde,
    fechaHasta: fechaHasta,
    etiquetasTiene: etiquetas
    });

    let resultado = gastosFiltrados.reduce((acc, gasto) => {
    let clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);
    
    let existe = true;

    if(acc[clavePeriodo] === undefined)
    {
        existe = false;
    }

    if(existe === false)
    {
        acc[clavePeriodo] = 0;
    }

    acc[clavePeriodo] += gasto.valor;

    return acc;
}, {});
return resultado;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
