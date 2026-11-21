// Importar gestionPresupuesto y gestionPresupuestoWeb.
import * as gesPre from './gestionPresupuesto.js';
import * as gesPreWeb from './gestionPresupuestoWeb.js';

// Datos introducidos.
// Actualizar el presupuesto.
gesPre.actualizarPresupuesto(1500);

// Mostrar el presupuesto.
let presupuesto = gesPre.mostrarPresupuesto();
gesPreWeb.mostrarDatoEnId('presupuesto', presupuesto);

// Crear y añadir los gastos.
gesPre.anyadirGasto(new gesPre.
    CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida'));
gesPre.anyadirGasto(new gesPre.
    CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida'));
gesPre.anyadirGasto(new gesPre.
    CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte'));
gesPre.anyadirGasto(new gesPre.
    CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina'));
gesPre.anyadirGasto(new gesPre.
    CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros'));
gesPre.anyadirGasto(new gesPre.
    CrearGasto('Seguro coche', 195.78, '2021-10-06', 'trasnporte', 'seguros'));

// Mostrar los gastos totales.
let gastosTotales = gesPre.calcularTotalGastos().toFixed(2);
gesPreWeb.mostrarDatoEnId('gastos-totales', `Gastos totales: ${gastosTotales}`);

// Mostrar el balance total.
let balanceTotal = gesPre.calcularBalance().toFixed(2);
gesPreWeb.mostrarDatoEnId('balance-total', `Balance: ${balanceTotal}`);

// Mostrar el listado completo de gastos.
for (let gasto of gesPre.listarGastos()) {
    gesPreWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
}

// Mostrar el listado de gastos realizados en septiembre de 2021.
let filtroFecha = {
    fechaDesde: '2021-09-01',
    fechaHasta: '2021-09-30'
}
for (let gastoPeriodo of gesPre.filtrarGastos(filtroFecha)) {
    gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gastoPeriodo);
}

// Mostrar el listado de gastos de más de 50€.
let filtroValor = {
    valorMinimo: 50
}
for (let gastoValor of gesPre.filtrarGastos(filtroValor)) {
    gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastoValor);
}

// Mostrar el listado de gastos de más de 200€ con etiqueta 'seguros'.
let filtrosVarios1 = {
    etiqueta: 'comida',
    etiqueta: 'trasnporte',
    valorMinimo: 200
}
for (let datosVarios1 of gesPre.filtrarGastos(filtrosVarios1)) {
    gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-3', datosVarios1);
}

// Mostrar el listado de gastos que tengan las etiquetas 'comida' o 'trasnporte' de menos de 50€.
let filtrosVarios2 = {
    etiqueta: 'comida',
    etiqueta: 'transporte',
    valorMaximo: 50
}
for (let datosVarios2 of gesPre.filtrarGastos(filtrosVarios2)) {
    gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-4', datosVarios2);
}

// Mostrar el total de gastos agrupados por día.
let gastosDia = gesPre.agruparGastos('dia');
gesPreWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosDia, 'dia');

// Mostrar el total de gastos agrupados por mes.
let gastosMes = gesPre.agruparGastos('mes');
gesPreWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosMes, 'mes');

// Mostrar el total de gastos agrupados por año.
let gastosAnyo = gesPre.agruparGastos('anyo');
gesPreWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAnyo, 'anyo');
