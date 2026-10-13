// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;

// TODO: Variable global


function actualizarPresupuesto(valor) {
    // TODO
    let resultado = -1;
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        resultado = presupuesto;
    } else {
        console.log("Error: el presupuesto debe ser un número no negativo");
    }
    return resultado;

}

function mostrarPresupuesto() {
    // TODO
     return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO


}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
