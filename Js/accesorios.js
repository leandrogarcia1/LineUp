//repuesto

class accesorio {
    constructor (id,nombre, precio, imagen){
        this.id=id
        this.nombre=nombre;
        this.precio = precio;
        this.imagen=imagen
    }
    
}
const accesorio1 = new accesorio(1,'POMO PALANCA DE CAMBIOS KEVLAR MANUAL (HILUX)' ,12076,"palancaDeCambio.jpeg")
const accesorio2 = new accesorio(2,'BARRA DEPORTIVA (HILUX)',90008 ,"barraDeportiva.jpeg")
const accesorio3 = new accesorio(3,'SILLA BEBE' ,253416,"sillaBebe.jpeg")
const accesorio4 = new accesorio(4,'HELADERA' ,34103,"heladera.jpeg")
const accesorio5 = new accesorio(5,'SOPORTE MATAFUEGO (HILUX)' ,4871,"soporteMatafuego.jpeg")
const accesorio6 = new accesorio(6,'GANCHO DE ARRASTRE 3500 KG (HILUX)', 88215 ,"ganchoArrastre.jpeg")
const accesorio7 = new accesorio(7,'FUNDA PROTECTORA (HILUX)', 34259 ,"fundaProtectora.jpeg")
const accesorio8 = new accesorio(8,'PORTA TABLET', 18959 ,"portaTablet.jpeg")

const tiendaOnline=[accesorio1,accesorio2,accesorio3,accesorio4,accesorio5,accesorio6,accesorio7,accesorio8]
 console.log(tiendaOnline)

//MOSTRAR TIENDA



let accesorios = document.getElementById("accesorios")
function mostrarCatalogo(array){

    
    for(let accesorio of array){
        
        let nuevoAccesorio  = document.createElement("div")
        nuevoAccesorio.classList.add("col-12","col-md","col-lg-4","my-3")
        nuevoAccesorio.innerHTML = `
        <div  id="${accesorio.id}" class="card" style="width: 18rem;">
            <img src="../fotos/${accesorio.imagen}" class="card-img-top" alt="...">
            <div  class="card-body">
                <h5 class="card-title">${accesorio.nombre}</h5>
                <p class="card-text">$ ${accesorio.precio} </p>
                <button id="agregarBtn${accesorio.id}" class="btn btn-outline-success">Agregar al Carrito</button>
                
            </div>
        </div>`
        accesorios.appendChild(nuevoAccesorio)

      
    }

}

mostrarCatalogo(tiendaOnline)

//buscador

let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")

function buscarInfo(buscado, array){
   
    let busquedaArray = array.filter(
        (accesorio) => accesorio.nombre.toLowerCase().includes(buscado.toLowerCase()) 
    ) 
    
    if(busquedaArray.length == 0){
        coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
        mostrarCatalogo(busquedaArray)
    }else{
        coincidencia.innerHTML = ""
        mostrarCatalogo(busquedaArray)

    }
}

buscador.addEventListener("input", ()=>{
    console.log(buscador.value)
    buscarInfo(buscador.value, tiendaOnline)
}) 


//ordenar

let selectOrden = document.getElementById("selectOrden")


function ordenarMenorMayor(array){
    
    const menorMayor = [].concat(array)
    
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){

const mayorMenor = [].concat(arr)
mayorMenor.sort((param1, param2)=>{
    return param2.precio - param1.precio
})
mostrarCatalogo(mayorMenor)
}


selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(tiendaOnline)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(tiendaOnline)
    }else{
        mostrarCatalogo(tiendaOnline)
    }
})