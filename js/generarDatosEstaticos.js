import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

// Presupuesto
gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

// Creación de gastos
let gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

// Totales
gestionWeb.mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
gestionWeb.mostrarDatoEnId("balance-total", gestion.calcularBalance());

// Listado completo
for (let gasto of gestion.listarGastos()) {
    gestionWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

// Filtrado 1: gastos de septiembre de 2021
let filtrado1 = gestion.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let gasto of filtrado1) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

// Filtrado 2: gastos de más de 50 €
let filtrado2 = gestion.filtrarGastos({valorMinimo: 50});
for (let gasto of filtrado2) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

// Filtrado 3: gastos de más de 200 € con la etiqueta seguros
let filtrado3 = gestion.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let gasto of filtrado3) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

// Filtrado 4: gastos de comida o transporte de menos de 50 €
let filtrado4 = gestion.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (let gasto of filtrado4) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

// Agrupaciones
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestion.agruparGastos("dia"), "dia");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestion.agruparGastos("mes"), "mes");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestion.agruparGastos("anyo"), "anyo");
