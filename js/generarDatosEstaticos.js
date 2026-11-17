import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';


gestionPresupuesto.actualizarPresupuesto(1500);

//Creación de gastos
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

//Mostrar total de gastos y balance
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', 
    Math.round(gestionPresupuesto.calcularTotalGastos() * 100) / 100
);

gestionPresupuestoWeb.mostrarDatoEnId('balance-total', 
    Math.round(gestionPresupuesto.calcularBalance() * 100) / 100
);

//Todos los gastos
let gastosCompletos = gestionPresupuesto.listarGastos();

//Filtros de gastos
let gastosFiltrados1 = gestionPresupuesto.filtrarGastos({
    fechaDesde: '2021-09-01',
    fechaHasta: '2021-09-30' 
});

let gastosFiltrados2 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 50
});

let gastosFiltrados3 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ['seguros'] 
});

let gastosFiltrados4 = gestionPresupuesto.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ['comida', 'transporte'] 
});

//Mostrar gastos
gastosCompletos.forEach((gasto) => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
});

gastosFiltrados1.forEach((gasto) => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
});

gastosFiltrados2.forEach((gasto) => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
});

gastosFiltrados3.forEach((gasto) => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
});

gastosFiltrados4.forEach((gasto) => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
});

//Mostrar gastos agrupados

let gastosAgrupadosDia = gestionPresupuesto.agruparGastos('dia', '', '', '');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosDia, 'dia');

let gastosAgrupadosMes = gestionPresupuesto.agruparGastos('mes', '', '', '');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosMes, 'mes');

let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos('anyo', '', '', '');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosAnyo, 'anyo');