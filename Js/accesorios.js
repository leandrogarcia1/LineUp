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


//MOSTRAR TIENDA


let accesorios = document.getElementById("accesorios")
function mostrarCatalogo(array){

    accesorios.innerHTML = ""
    for(let accesorio of array){
        
        let nuevoAccesorio  = document.createElement("div")
        nuevoAccesorio.classList.add("col-12","col-md","col-lg-4","my-3")
        nuevoAccesorio.innerHTML = `
        <div  id="${accesorio.id}" class="card" style="width: 18rem;">
            <img src="../fotos/${accesorio.imagen}" class="card-img-top" alt="...">
            <div  class="card-body">
                <h5 class="card-title">${accesorio.nombre}</h5>
                <p class="card-text">$ ${accesorio.precio} </p>
                <button id="BtnAgregarCarrito${accesorio.id}" class="btn btn-outline-success">Agregar al Carrito</button>
                
            </div>
        </div>`
        accesorios.appendChild(nuevoAccesorio)

        let BtnAgregarCarrito = document.getElementById(`BtnAgregarCarrito${accesorio.id}`)
        
        BtnAgregarCarrito.addEventListener("click", ()=>{
            agregarAlCarrito(accesorio)
        }
        )
 
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

//array de productosComprados


let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []
console.log(productosEnCarrito)





//agregar al carrito

function agregarAlCarrito(accesorio){
    
    let accesorioAgregado = productosEnCarrito.find((elem)=> elem.id == accesorio.id)
    
    if(accesorioAgregado == undefined){
        
        console.log(`El articulo ${accesorio.nombre}  ha sido agregado. Vale ${accesorio.precio}`)
        productosEnCarrito.push(accesorio)
        console.log(productosEnCarrito)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        
        Swal.fire({
            title: "Ha agregado un producto ",
            text: `El  ${accesorio.nombre} ya ha sido agregado`,
            icon: "success",
            confirmButtonText: 'Entendido',
            confirmButtonColor: "green",
            //duración en mili segundos 
            timer: 5000,
            imageUrl: `../fotos/${accesorio.imagen}`,
            imageHeight: 200
        })

    }else{
        console.log(`EL articulo ${accesorio.nombre} ya existe en el carrito`)
        Swal.fire({
            title: `Producto ya existente`,
            text: `EL articulo ${accesorio.nombre}  ya existe en el carrito`,
            icon: "warning",
            timer: 5000,
            
        })
    }
}

//modal

//agregar al modal carrito
let botonCarrito= document.getElementById("botonCarrito")

let modalBodyCarrito = document.getElementById("modal-bodyCarrito")

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito) => {

        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="../fotos/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.nombre}</h4>
                    
                         <p class="card-text"> $ ${productoCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        
            
        `
    })
    array.forEach((productoEnCarrito)=> {
        
        document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click", ()=>{
            //elimnar  DOM
            let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
            cardProducto.remove()
            //eliminar array de compras
            
            // buscar en el array el objeto a eliminar
            let productoEliminar = array.find((auto)=>auto.id == productoEnCarrito.id)
            
            //indexOf para saber el indice en el array
            let posicion = array.indexOf(productoEliminar)
            
            array.splice(posicion,1)
           
            //limpiar storage
            localStorage.setItem("carrito", JSON.stringify(array))
            
            calcularTotal(array)
        })

    })
    calcularTotal(productosEnCarrito)
}

function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
    console.log("Con reduce " +total)

    
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
    precioTotal.innerHTML = `El total de su compra es <strong> $ ${total}</strong>`
}

//terminar compra
let botonFinalizarCompra2= document.getElementById("botonFinalizarCompra2")


botonFinalizarCompra2.addEventListener("click", ()=>{
    finalizarCompra()
})

//botonFinalizarCompra.addEventListener("click",()=>{
   // console.log("hola")} )

function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra. `,
                })
                //resetear carrito
                productosEnCarrito = []
                //removemos storage
                localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! `,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    }

    )
}
