
import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

// Llamada a función para: Actualizar el presupuesto a 1500 € utilizando actualizarPresupuesto()
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
let presupuestoActual = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuestoActual); // Recibir los dos parámetros, el primero es el ID y va entre comillas.

// Crear los siguientes gastos (función crearGasto):
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"); // Texto entre comillas, números sin comillas
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir los gastos creados (función anyadirGasto)
gestionPresupuesto.anyadirGasto(gasto1); // Hacer seis llamadas independientes ya que van cada una por su id
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

// Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
let gastosTotales = gestionPresupuesto.calcularTotalGastos(); // No recibe parámetros
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastosTotales); // id del elemento + valor

// Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal);

// Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let listadoGastos = gestionPresupuesto.listarGastos();

for(let gasto of listadoGastos)
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto); // id + gasto
}

// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let filtradoDeGastos = gestionPresupuesto.filtrarGastos({
   fechaDesde: "2021-09-01",
   fechaHasta: "2021-09-30T23:59:59.999" 
});

for(let gasto of filtradoDeGastos)
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let listadoMas50 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 50.01
})

for(let gasto of listadoMas50)
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let listadoMas200 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 200.01,
    etiquetasTiene: ["seguros"]
})

for(let gasto of listadoMas200)
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let listadoGastosComidaTransporte = gestionPresupuesto.filtrarGastos({
    valorMaximo: 49.99,
    etiquetasTiene: ["comida", "transporte"]
})

for(let gasto of listadoGastosComidaTransporte)
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let listadoTotalGastosAgrupadosDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", listadoTotalGastosAgrupadosDia, "dia"); // Mostrar gastos por día

// Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let listadoTotalGastosAgrupadosMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", listadoTotalGastosAgrupadosMes, "mes"); // Mostrar gastos por mes

// Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let listadoTotalGastosAgrupadosAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", listadoTotalGastosAgrupadosAnyo, "anyo"); // Mostrar gastos por año

