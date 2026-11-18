import { CrearGasto } from './gestionPresupuesto.js';

let gasto1 = new CrearGasto(
  'Supermercado',
  50,
  '2026-11-18T10:30',
  'casa',
  'comida',
  'compra',
);

console.log(gasto1.mostrarGastoCompleto());
