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

        //-----------------------------------------------

        this.obtenerPeriodoAgrupacion = function(periodo){

            let fechaObjeto = new Date(this.fecha);

            let anyo = fechaObjeto.getFullYear();
            let mes = fechaObjeto.getMonth() +1;
            let dia = fechaObjeto.getDate();

            let texto = "";

            if(mes < 10){
                mes = "0" + mes;
            }

            if (dia < 10){
                dia = "0" + dia;
            }
            if(periodo === "anyo"){

                texto = anyo;

            }else if(periodo === "mes"){

                texto = anyo + "-" + mes;

            }else if (periodo === "dia"){

                texto = anyo + "-" + mes + "-" + dia;
            }

            return texto;
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

    //FUNCION FILTRAR GASTOS
    function filtrarGastos(filtro){

        let resultadoFiltracion = gastos.filter(function(gasto){
            
            
            let seFiltra = true;
           
            
            //-----minimo y maximo valor---------
            if(filtro.valorMinimo !== undefined){

                if(gasto.valor < filtro.valorMinimo  ){ // ssi no lo cumple, no pasa, 

                 seFiltra = false;

                }
            }

            if(filtro.valorMaximo !== undefined){

                if(gasto.valor  > filtro.valorMaximo   ){

                 seFiltra = false;
                }
            }
            

        //---------fecha desde y hasta--------------
            if(filtro.fechaDesde !== undefined){

               if (gasto.fecha <  Date.parse(filtro.fechaDesde)) {

                     seFiltra = false;

                }
            }

            

            if(filtro.fechaHasta !==undefined){
                //console.log("Fecha del gasto:", gasto.fecha);
                //console.log("Fecha del filtro:", Date.parse(filtro.fechaDesde));
                //console.log("Comparación:", gasto.fecha < Date.parse(filtro.fechaDesde));

                if(gasto.fecha > Date.parse(filtro.fechaHasta)){

                 seFiltra = false;
                }
            }

        //---------descripción--------------

            if(filtro.descripcionContiene !== undefined){

                if(!gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())){

                 seFiltra = false;
                }
            }

        //---------etiquetas--------------
            //primero con map creamos un nuevo array del array original de etiquetas pasandole el array de etiquetas del objeto gasto del array "...etiquetas" y lo pasamos a minusculas
            //creamos una variable para valorar que etiquetas coinciden con del array que nos pasan del objeto que nos pasan en esta función
            //hacemos un for para recorrer el array de etiquetasTiene (que es el array de las etiquetas del objeto que nos pasan por parametro)
            //el if nos dice que en el nuevo array en minisculas que hemos creado con map incluye alguno de las etiquetas del array etiquetasTiene de [i] y en minuscula
            if(filtro.etiquetasTiene !== undefined){

                let etiquetasGasto = gasto.etiquetas.map(function(etiquetas) {
                    return etiquetas.toLowerCase();
                });
              
                let etiquetaCoincide = false;

                for(let i = 0; i < filtro.etiquetasTiene.length; i++){

                    if(etiquetasGasto.includes(filtro.etiquetasTiene[i].toLowerCase())){
                        etiquetaCoincide = true;
                        //console.log("Etiqueta que estoy buscando:", filtro.etiquetasTiene[i]);
                    }
                }

                //Si este gasto no tiene ninguna de las etiquetas que estoy buscando, no quiero que aparezca en el resultado
                if(!etiquetaCoincide){

                 seFiltra = false;
                }  
            }

            
            return seFiltra;
            
        });
       
       return resultadoFiltracion;
    }

    //FUNCION AGRUPAR GASTOS
    function agruparGastos(periodo ="mes", etiquetas = [], fechaDesde, fechaHasta ){

          if(fechaHasta === undefined){
               fechaHasta = new Date().toISOString();
          }

        //objeto filtro
      let filtro = {
        
        etiquetasTiene: etiquetas.length > 0 ? etiquetas : undefined,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
      }

      console.log("FILTROOO:", filtro);
      //llamo a la funcion filtrarGastos y le paso el objeto filtro que acabo de crear arriba y
      //guardamos el array que se crea en gastosFiltrados
      let gastosFiltrados = filtrarGastos(filtro);

      console.log("Gastos filtrado0000s:", gastosFiltrados);
   
    
      let resultados = gastosFiltrados.reduce(function(acc, gasto){

        let clave = gasto.obtenerPeriodoAgrupacion(periodo);
           console.log("ACC:", acc);
        if(acc[clave] === undefined){
            //solo para la primera vuelta
            acc[clave] = 0;
            acc[clave] = gasto.valor;

        }else{
             acc[clave] += gasto.valor;
              
        }

        

        return acc;

      

      }, {});
      return resultados;

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
    calcularBalance,
    filtrarGastos,
    agruparGastos,


}
