import {
  CrearGasto,
  anyadirGasto,
  calcularTotalGastos,
} from './gestionPresupuesto.js';

let gasto1 = new CrearGasto('Comida', 50);
let gasto2 = new CrearGasto('Gasolina', 30);
let gasto3 = new CrearGasto('Internet', 40);

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);

console.log(calcularTotalGastos());
