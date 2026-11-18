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
