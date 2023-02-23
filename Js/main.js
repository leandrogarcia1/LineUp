class auto  {
    constructor (id,modelo, año, precio, km, color, Tipodecombustible,imagen){
        this.id=id
        this.modelo=modelo;
        this.año=año;
        this.precio = precio;
        this.km= km;
        this.color=color;
        this.Tipodecombustible= Tipodecombustible;
        this.imagen=imagen
    }
    mostrarInfoAuto(){
        console.log(`El Modelo es ${this.modelo}, el Kilometraje es ${this.km}, color ${this.color}, su tipo de combistibles es ${this.Tipodecombustible} y su precio es ${this.precio} `)
    }
}
/*
const auto1 = new auto(1,'Toyota Etios Xs 1.5 4p' ,2016,2940000 ,70062,'Rojo',"Diesel","ToyotaEtiosXs-rojo.jpg")
const auto2 = new auto(2,'Toyota Etios Platium 1.5 5p' ,2017,3640000 ,92062,'Blanco ',"Nafta","ToyotaEtiosPlatium-blanco.jpg")
const auto3 = new auto(3,'Volkswagen Gol Trend Trendilne 1.6  5p' ,2019,3570000 ,28302,'Gris',"Nafta/GNC","VolkswagenGolTrendTrendilne.jpg")
const auto4 = new auto(4,'Toyota Hilux 4x2 D/c Srx 2.8 Tdi 6 Mt' ,2018,8790000 ,97062,'Gris',"Diesel","ToyotaHilux4x2-gris.jpg")
const auto5 = new auto(5,'Renault Kangoo Ii Express Confort 5a 1' ,2018,4040000 ,137062,'Gris',"Nafta","RenaultKangoo-gris.jpg")
const auto6 = new auto(6,'Toyota Corolla Xei 1.8 6 M/t' ,2019,5270000 ,125062,'Blanco',"Nafta","ToyotaCorollaXei-Blanco.jpg")
const auto7 = new auto(7,'Nissan Sentra 1.8 Advance Pure Drive' ,2019,4540000 ,55062,'Azul',"Nafta","NissanSentra1.8-azul.jpg")
*/
let garage=[]
/*
    if(localStorage.getItem("garage")){
        garage=JSON.parse(localStorage.getItem("garage"))
    }else{
        garage.push(auto1,auto2,auto3,auto4,auto5,auto6,auto7)
        localStorage.setItem("garage",JSON.stringify(garage))
    }
*/
const cargarEstanteria = async ()=>{
    //con el async puedo incluir el await
    //ruta relativa es: la del HTML al JSON y abrir con liveServer
    const response = await fetch("../autos.json")
    const data = await response.json()
    console.log(data)
    for(let auto of data){
        let autoNuevo = new auto(auto.id, auto.modelo, auto.año, auto.precio, auto.km, auto.color,auto.Tipodecombustible, auto.imagen)
        garage.push(autoNuevo)
    }
    //dentro de la function async seteamos el storage ahí anda perfecto
    localStorage.setItem("garage", JSON.stringify(garage))
}

cargarEstanteria()
//plantila  catalogo

let autos = document.getElementById("autos")
function mostrarCatalogo(array){

    autos.innerHTML=""
    for(let auto of array){
        
        let nuevoAuto  = document.createElement("div")
        nuevoAuto.classList.add("col-12","col-md","col-lg-4","my-3")
        nuevoAuto.innerHTML = `
        <div  id="${auto.id}" class="card" style="width: 18rem;">
            <img src="../fotos/${auto.imagen}" class="card-img-top" alt="...">
            <div  class="card-body">
                <h5 class="card-title">${auto.modelo}</h5>
                <p class="card-text">Kms: ${auto.km} Año${auto.año}.</p>
                <button id="agregarBtn${auto.id}" class="btn btn-outline-success">Ver mas Informacion</button>
                
            </div>
        </div>`
      autos.appendChild(nuevoAuto)

      let btnAgregar = document.getElementById(`agregarBtn${auto.id}`)
        //console.log(btnAgregar)
        btnAgregar.addEventListener("click",()=>{
            Swal.fire({
                title: `${auto.modelo}`,
                imageUrl: `../fotos/${auto.imagen}`,
                imageHeight: 200,
                text: `Con ${auto.km} Kms, color ${auto.color}  año ${auto.año}, su combustible es ${auto.Tipodecombustible} y su precio final es de  $${auto.precio}`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              
            //alert(`El modelo es ${auto.modelo}, con ${auto.km} Kms color ${auto.color}  año ${auto.año}, su combustible es ${auto.Tipodecombustible} y su precio final es de $${auto.precio}`)
        })
    }

}

//mostrarCatalogo(garage)

let loaderTexto=document.getElementById("loaderTexto")
let loader=document.getElementById("loader")

setTimeout(()=>{
    mostrarCatalogo(garage)
    loader.remove()
    loaderTexto.remove()
}
,4000
)

//declaro inputs agregar auto

let cargarRodadoNuevo=document.getElementById("cargarRodadoNuevo")

 //pasao al boton cargarAuto nuevo

 cargarRodadoNuevo.addEventListener("click", ()=>{cargarAuto(garage)
console.log("funciona")})


function cargarAuto(array){
    
        let rodadoInput1=document.getElementById("rodadoInput1")
        let anioInput1 =document.getElementById("anioInput1")
        let precioInput1=document.getElementById("precioInput1")
        let KmInput1=document.getElementById("KmInput1")
        let ColorInput1r=document.getElementById("ColorInput1")
        let tipoDeCombustibleInput1=document.getElementById("tipoDeCombustibleInput1")
 

    const autoNuevo=new auto(array.length+1,rodadoInput1.value,anioInput1.value,precioInput1.value,KmInput1.value,ColorInput1r.value,tipoDeCombustibleInput1.value,"fotoAutoGenerica.jpg")
     console.log(autoNuevo)
     //sumo a garage
     array.push(autoNuevo)
     localStorage.setItem("garage",JSON.stringify(array))
     mostrarCatalogo(array)

        rodadoInput1.value=""
        anioInput1.value=""
        precioInput1.value=""
        KmInput1.value=""  
        ColorInput1r.value=""
        tipoDeCombustibleInput1.value=""

} 

//buscador

let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")

function buscarInfo(buscado, array){
   
    let busquedaArray = array.filter(
        (auto) => auto.modelo.toLowerCase().includes(buscado.toLowerCase()) 
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
    buscarInfo(buscador.value, garage)
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
function ordenarPorKm(array){
const ordenadoKm = [].concat(array)
 ordenadoKm.sort((a,b) => {
      if(a.km  > b.km) {
        return 1
      }
      if (a.km < b.km) {
        return -1
      }
      
      return 0;
})
mostrarCatalogo(ordenadoKm)
}

selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(garage)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(garage)
    }else if(selectOrden.value == 3){
        ordenarPorKm(garage)
    }else{
        mostrarCatalogo(garage)
    }
})

