import {
  CrearGasto,
  anyadirGasto,
  listarGastos,
} from './gestionPresupuesto.js';

/*let gasto1 = new CrearGasto('Comida', 50);

let gasto2 = new CrearGasto('Supermercado', 80, '2026-11-18', 'casa', 'comida');

console.log(gasto1);
console.log(gasto2);

console.log(gasto1.etiquetas);
console.log(gasto2.etiquetas);
console.log(gasto2.fecha);
*/

let gasto1 = new CrearGasto('Comida', 50);
let gasto2 = new CrearGasto('Gasolina', 30);

anyadirGasto(gasto1);
anyadirGasto(gasto2);

console.log(listarGastos());
