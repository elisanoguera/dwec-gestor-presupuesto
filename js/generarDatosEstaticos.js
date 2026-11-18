import * as gestion from './gestionPresupuesto.js';
import * as web from './gestionPresupuestoWeb.js';

// Actualizar presupuesto
gestion.actualizarPresupuesto(1500);

// Mostrar presupuesto
web.mostrarDatoEnId('presupuesto', gestion.mostrarPresupuesto());
