import {
  CrearGasto,
  anyadirGasto,
  borrarGasto,
  listarGastos,
} from './gestionPresupuesto.js';

let gasto1 = new CrearGasto('Comida', 20);
let gasto2 = new CrearGasto('Gasolina', 50);
let gasto3 = new CrearGasto('Internet', 30);

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);

console.log('Antes de borrar:');
console.log(listarGastos());

borrarGasto(1);

console.log('Después de borrar:');
console.log(listarGastos());
