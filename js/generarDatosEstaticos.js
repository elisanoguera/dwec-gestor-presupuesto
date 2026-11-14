import * as gestionPre from "./gestionPresupuesto.js";
import * as gPrespuestoWeb from "./gestionPresupuestoWeb.js";

gestionPre.actualizarPresupuesto(1500);

gPrespuestoWeb.mostrarDatoEnId(
    "presupuesto",
    gestionPre.mostrarPresupuesto()
);

let gasto1 = new gestionPre.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida");
let gasto2 = new gestionPre.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida");
let gasto3 = new gestionPre.CrearGasto("Bonobús",18.60,"2020-05-26","transporte");
let gasto4 = new gestionPre.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina");
let gasto5 = new gestionPre.CrearGasto("Seguro hogar",206.45,"2021-09-26","casa","seguros");
let gasto6 = new gestionPre.CrearGasto("Seguro coche",195.78,"2021-10-06","transporte","seguros");

gestionPre.anyadirGasto(gasto1);
gestionPre.anyadirGasto(gasto2);
gestionPre.anyadirGasto(gasto3);
gestionPre.anyadirGasto(gasto4);
gestionPre.anyadirGasto(gasto5);
gestionPre.anyadirGasto(gasto6);

gPrespuestoWeb.mostrarDatoEnId(
    "gastos-totales",
    gestionPre.calcularTotalGastos()
);

gPrespuestoWeb.mostrarDatoEnId(
    "balance-total",
    gestionPre.calcularBalance()
);

gPrespuestoWeb.listarGastos().forEach(gasto => {
    gPrespuestoWeb.mostrarGastoWeb(
        "listado-gastos-completo",
        gasto
    );
});

gestionPre.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
}).forEach(gasto => {

    gPrespuestoWeb.mostrarGastoWeb(
        "listado-gastos-filtrado-1",
        gasto
    );

});

gestionPre.filtrarGastos({
    valorMinimo: 50
}).forEach(gasto => {

    gPrespuestoWeb.mostrarGastoWeb(
        "listado-gastos-filtrado-2",
        gasto
    );

});
gestionPre.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
}).forEach(gasto => {

    gPrespuestoWeb.mostrarGastoWeb(
        "listado-gastos-filtrado-3",
        gasto
    );

});

gPrespuestoWeb.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ["comida","transporte"]
}).forEach(gasto => {

    gPrespuestoWeb.mostrarGastoWeb(
        "listado-gastos-filtrado-4",
        gasto
    );

});
gPrespuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-dia",
    gestionPre.agruparGastos("dia"),
    "dia"
);

gPrespuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-mes",
    gestionPre.agruparGastos("mes"),
    "mes"
);

gPrespuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-anyo",
    gestionPre.agruparGastos("anyo"),
    "anyo"
);