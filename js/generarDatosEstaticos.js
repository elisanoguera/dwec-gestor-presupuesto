import * as gestion from './gestionPresupuesto.js';
import * as web from './gestionPresupuestoWeb.js';

// Actualizar presupuesto
gestion.actualizarPresupuesto(1500);

// Mostrar presupuesto
web.mostrarDatoEnId('presupuesto', gestion.mostrarPresupuesto());

// Crear los gastos
let gasto1 = new gestion.CrearGasto(
  'Compra carne',
  23.44,
  '2021-10-06',
  'casa',
  'comida',
);

let gasto2 = new gestion.CrearGasto(
  'Compra fruta y verdura',
  14.25,
  '2021-09-06',
  'supermercado',
  'comida',
);

let gasto3 = new gestion.CrearGasto(
  'Bonobús',
  18.6,
  '2020-05-26',
  'transporte',
);

let gasto4 = new gestion.CrearGasto(
  'Gasolina',
  60.42,
  '2021-10-08',
  'transporte',
  'gasolina',
);

let gasto5 = new gestion.CrearGasto(
  'Seguro hogar',
  206.45,
  '2021-09-26',
  'casa',
  'seguros',
);

let gasto6 = new gestion.CrearGasto(
  'Seguro coche',
  195.78,
  '2021-10-06',
  'transporte',
  'seguros',
);

// Añadir los gastos
gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

// Mostrar total de gastos
web.mostrarDatoEnId('gastos-totales', gestion.calcularTotalGastos().toFixed(2));

// Mostrar balance total
web.mostrarDatoEnId('balance-total', gestion.calcularBalance().toFixed(2));

// Mostrar listado completo de gastos
let listado = gestion.listarGastos();

for (let gasto of listado) {
  web.mostrarGastoWeb('listado-gastos-completo', gasto);
}

// Mostrar gastos de septiembre de 2021
let gastosSeptiembre = gestion.filtrarGastos({
  fechaDesde: '2021-09-01',
  fechaHasta: '2021-09-30',
});

for (let gasto of gastosSeptiembre) {
  web.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

// Mostrar gastos de más de 50 €
let gastosMayores50 = gestion.filtrarGastos({
  valorMinimo: 50,
});

for (let gasto of gastosMayores50) {
  web.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

// Mostrar gastos de más de 200 € con etiqueta seguros
let gastosSeguros = gestion.filtrarGastos({
  valorMinimo: 200,
  etiquetasTiene: ['seguros'],
});

for (let gasto of gastosSeguros) {
  web.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

// Mostrar gastos inferiores a 50 € con etiquetas comida o transporte
let gastosComidaTransporte = gestion.filtrarGastos({
  valorMaximo: 50,
  etiquetasTiene: ['comida', 'transporte'],
});

for (let gasto of gastosComidaTransporte) {
  web.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}

// Mostrar gastos agrupados por día
let gastosPorDia = gestion.agruparGastos('dia');

web.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosPorDia, 'dia');
