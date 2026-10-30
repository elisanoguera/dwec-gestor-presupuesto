import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

const data = [
    ["Compra carne", 23.44, "2021-10-06", "casa", "comida"],
    ["Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"],
    ["Bonobús", 18.60, "2020-05-26", "transporte"],
    ["Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"],
    ["Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"],
    ["Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"]
]

const gastos = data.map(item => new gestionPresupuesto.CrearGasto(...item));
gastos.forEach(gasto => gestionPresupuesto.anyadirGasto(gasto));

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

let listadoGastos = gestionPresupuesto.listarGastos()
listadoGastos.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto));

let gastosFiltradosPorFechaSeptiembre = gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
gastosFiltradosPorFechaSeptiembre.forEach(gfpfs => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gfpfs));

let gastosFiltradosPorMasDe50Euros = gestionPresupuesto.filtrarGastos({ valorMinimo: 50});
gastosFiltradosPorMasDe50Euros.forEach(gfpmdce => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gfpmdce));

let gastosFiltradosPorMasde200EurosConEtiquetaSeguros = gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etoquetasTiene: ["seguros"]});
gastosFiltradosPorMasde200EurosConEtiquetaSeguros.forEach(gfpmddeces => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gfpmddeces));

let gastosFiltadosPorEtiquetasComidaTransporteOMenos50Euros = gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})
gastosFiltadosPorEtiquetasComidaTransporteOMenos50Euros.forEach(gfpectomce => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gfpectomce));

let gastosAgrupadosPorDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosPorDia, "día");

let gastosAgrupadosPorMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupadosPorMes, "mes");

let gastosAgrupadosPorAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupadosPorAnyo, "año");