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
        console.log(`El Modelo es ${this.modelo}, el Kilometraje es ${this.km}, color ${this.color}, su tipo de combistibles es ${this.Tipodecombustible} y su precio es ${this.precio}`)
    }
}
const auto1 = new auto(1,'Toyota Etios Xs 1.5 4p' ,2016,2940000 ,70062,'Rojo',"Diesel","ToyotaEtiosXs-rojo.jpg")
const auto2 = new auto(2,'Toyota Etios Platium 1.5 5p' ,2017,3640000 ,92062,'Blanco ',"Nafta","ToyotaEtiosPlatium-blanco.jpg")
const auto3 = new auto(3,'Volkswagen Gol Trend Trendilne 1.6  5p' ,2019,3570000 ,28302,'Gris',"Nafta/GNC","VolkswagenGolTrendTrendilne.jpg")
const auto4 = new auto(4,'Toyota Hilux 4x2 D/c Srx 2.8 Tdi 6 Mt' ,2018,8790000 ,97062,'Gris',"Diesel","ToyotaHilux4x2-gris.jpg")
const auto5 = new auto(5,'Renault Kangoo Ii Express Confort 5a 1' ,2018,4040000 ,137062,'Gris',"Nafta","RenaultKangoo-gris.jpg")
const auto6 = new auto(6,'Toyota Corolla Xei 1.8 6 M/t' ,2019,5270000 ,125062,'Blanco',"Nafta","ToyotaCorollaXei-Blanco.jpg")
const auto7 = new auto(7,'Nissan Sentra 1.8 Advance Pure Drive' ,2019,4540000 ,55062,'Azul',"Nafta","NissanSentra1.8-azul.jpg")

let garage=[]
    if(localStorage.getItem("garage")){
        garage=JSON.parse(localStorage.getItem("garage"))
    }else{
        garage.push(auto1,auto2,auto3,auto4,auto5,auto6,auto7)
        localStorage.setItem("garage",JSON.stringify(garage))
    }




//agregar auto
function agregarAuto(){
    
    let modeloIngresado=prompt('Ingrese modelo del rodado')
    let AñoIngresado=prompt('Ingrese Año de rodado')
    let PrecioIngresado=prompt('Ingrese precio del rodado')
    let KmIngresados=prompt('Ingrese Kms del rodado')
    let ColorIngresado=prompt('Ingrese color del rodado')
    let combustibleIngresado=prompt("Ingrese tipo de combustible que utiliza el rodado")

    const autoNuevo=new auto(garage.length+1,modeloIngresado,AñoIngresado,PrecioIngresado,KmIngresados,ColorIngresado,combustibleIngresado,)
     console.log(autoNuevo)

     garage.push(autoNuevo)
     console.log(garage)


garage.forEach((auto)=>{
    console.log(auto.id,auto.modelo, auto.año,auto.precio,auto.km, auto.color,auto.Tipodecombustible)
})

} 



//  ver catalogo
function verCatalogo(array){
    console.log('Bienvenidos! nuestro catalogo es:')
    array.forEach((auto)=>{
        console.log(auto.id,auto.modelo, auto.año,auto.precio,auto.km, auto.color,auto.Tipodecombustible)
    })
    preguntarOpcion()
}
// filtrar por modelo
function buscarPorModelo(arr){
    const ModeloBuscado = prompt("Ingrese el Modelo auto que está buscando")
    const busqueda = arr.filter((auto)=> auto.modelo.toLowerCase() == ModeloBuscado.toLowerCase())
    if(busqueda.length == 0){
        console.log(`No hay coincidencias para el rodado ${ModeloBuscado}`)
    }else{
        
        console.log(busqueda)
        verCatalogo(busqueda)
    }
    
}

//plantila para catalogo


let autos = document.getElementById("autos")
function mostrarCatalogo(array){

    autos.innerHTML=""
    for(let auto of garage){
        
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
        console.log(btnAgregar)
        btnAgregar.addEventListener("click",()=>{
            alert(`El modelo es ${auto.modelo}, con ${auto.km} Kms color ${auto.color}  año ${auto.año}, su combustible es ${auto.Tipodecombustible} y su precio final es de $${auto.precio}`)
        })
    }

}

mostrarCatalogo(garage)
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



