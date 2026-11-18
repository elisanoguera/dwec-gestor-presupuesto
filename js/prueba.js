import { CrearGasto } from './gestionPresupuesto.js';

let gasto1 = new CrearGasto('Comida', 50, '2026-11-18');

console.log('Fecha inicial:', gasto1.fecha);

gasto1.actualizarFecha('2026-11-20');

console.log('Fecha actualizada:', gasto1.fecha);

gasto1.actualizarFecha('fecha incorrecta');

console.log('Fecha después del error:', gasto1.fecha);
