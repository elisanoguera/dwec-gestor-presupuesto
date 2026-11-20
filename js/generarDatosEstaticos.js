import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

gestionPresupuesto.actualizarPresupuesto(1500);



gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

const gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestionPresupuesto.anyadirGasto(gasto1);
const gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestionPresupuesto.anyadirGasto(gasto2);
const gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestionPresupuesto.anyadirGasto(gasto3);    
const gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestionPresupuesto.anyadirGasto(gasto4);
const gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestionPresupuesto.anyadirGasto(gasto5);
const gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gestionPresupuesto.anyadirGasto(gasto6);


gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

gestionPresupuesto.listarGastos().forEach(gasto => {gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto)});

gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"}).forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
});

gestionPresupuesto.filtrarGastos({valorMinimo: 50}).forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
});

gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
});

gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida", "transporte"], valorMaximo: 50}).forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)});

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gestionPresupuesto.agruparGastos("dia"),"dia");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gestionPresupuesto.agruparGastos("mes"),"mes");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gestionPresupuesto.agruparGastos("anyo"),"anyo");