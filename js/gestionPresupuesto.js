// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;



//Función Actualizar presupuesto
function actualizarPresupuesto(valor) {
    // TODO

    if(valor < 0 || typeof valor != "number"){
    
        console.log("Error, el número es menor de 0");
        return -1;

    }else{

        console.log("Es un número correcto");
        presupuesto = valor;
        return presupuesto;
    }
    
}

//Funcion mostrar presupuesto
function mostrarPresupuesto() {

    let texto;

        texto = "Tu presupuesto actual es de " + presupuesto + " €";

    return texto;
    
}




//CREAR OBJETO 

//constructor objeto.
//Creo las funciones dentro del constructor del objeto en vez de con prototype
function CrearGasto(descripcionIntro, valorIntro, fecha, ...etiquetas) {
        

        this.descripcion = descripcionIntro;
        this.valor = valorIntro;
        this.etiquetas = [];

 //-----------------------------------DESCRIPCIÓN-------------------------------------------------- 
     

    //funcion actualizar descripcion
        this.actualizarDescripcion = function(nuevaDescripcion){
            
            this.descripcion = nuevaDescripcion;
        }

    

//--------------------------------------VALOR-----------------------------------------------    
    
    //Validación de propiedad VALOR

        if( typeof valorIntro == "number" && valorIntro >= 0){
        this.valor = valorIntro;

        }else{
                this.valor = 0;
            }
        
        //funcion actualizar valor
        this.actualizarValor = function(nuevoValor){

            if(typeof nuevoValor == "number" && nuevoValor >= 0){

               this.valor = nuevoValor;

            }
        }
    
        
//-------------------------------------FECHA------------------------------------------------    
    //Validación de propiedad FECHA
        let fechaTimestamp = Date.parse(fecha);

    //validar si la fecha es una fecha, si no, devuelve la fecha de hoy
    //validar si no se ha introducido una fecha, si no se ha introducido, devuelve la de hoy
    //si la fecha introducida es correcta, de devuelve la fecha introducida.
        if(Number.isNaN(fechaTimestamp)){

                this.fecha = Date.now();

        }else{
            this.fecha = fechaTimestamp;


        }

    //Método actualizar fecha
        
        this.actualizarFecha = function(nuevaFecha){
            let fechaNuevaTimestamp = Date.parse(nuevaFecha);

            if(!Number.isNaN(fechaNuevaTimestamp)){

                this.fecha = fechaNuevaTimestamp;
            
            }
            
        }
//-------------------------------------ETIQUETAS------------------------------------------------    

       


        this.anyadirEtiquetas = function (...etiquetas){

            //se recorre etiquetas no this.etiquetas, y lo comparamos con this.etiquetas
            for(let nuevaEtiqueta of etiquetas){

                if(!this.etiquetas.includes(nuevaEtiqueta)){

                    this.etiquetas.push(nuevaEtiqueta)
                }
            }
        
        }

        //para añadir las primeras etiquetas que entran por parametro
         this.anyadirEtiquetas(...etiquetas);


         //FUNCIÓN Borrar etiquetas
         this.borrarEtiquetas = (...etiquetas) => {

           for (let eti of etiquetas){

            let posEti = this.etiquetas.indexOf(eti);

            if(posEti !== -1){

                this.etiquetas.splice(posEti, 1);
            }
           };
                
        }
//-------------------------------------FUNCIONES------------------------------------------------    



//-------------------------------TEST INTRO JS II----------------------------


    //función mostrarGastoCompleto

        this.mostrarGastoCompleto = function(){
            let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";
            texto += "Fecha: " + new Date(this.fecha).toLocaleString() + "\n";
            texto += "Etiquetas:\n";

            for(let etiqueta of this.etiquetas){
                texto += "- " + etiqueta + "\n";
            }


            return texto;
        }

       //funcion mostrar descripcion y gasto
        this.mostrarGasto = function(){

            let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €" ;

            return texto;
            
        
        }

      

    }



    //FUNCION LISTAR GASTOS
    function listarGastos(){
        return gastos;
    }

    //FUNCION AÑADIR GASTO
    function anyadirGasto(gasto){

        gasto.id = idGasto;
        gastos.push(gasto);
        idGasto++;
        
        
    }

    //FUNCION BORRAR GASTO
    function borrarGasto(idGasto){

       for(let gasto of gastos ){

        if(gasto.id === idGasto){

              let posicion = gastos.indexOf(gasto);

        gastos.splice(posicion, 1);

        break;
        }
       }

    }

    //FUNCION cALCULAR TOTAL GASTO
    function calcularTotalGastos(){

        let suma = 0;

        for (let gasto of gastos){
            suma += gasto.valor;
        }
        return suma;

    }

    //FUNCION cALCULAR BALANCE
    function calcularBalance(){

        let balance = 0;

           balance = presupuesto - calcularTotalGastos();

        return balance;
    }




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance


}
