quiero incorporar lo de ajax a mi proyecto, realice un archivo auto.json donde tengo la informacion de cada uno de los autos, q luego linkeando este archivo , se almacenan en garage.

en el archivo main, realizo :

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

pero cuando lo abro de live server, nunca se me carga el catalogo de autos, no se que esta mal.


Mi proyecto trata sobre una pagina de una concesionaria de autos. La idea es que contenga toda la informacion necesaria para el cliente.

aspectos mas relevantes:
1)Un apartado con nuestos autos usados en stock, con informacion detallada sobre cada uno, que se pueda filtar y ordenar la lista de acuerdo a los intereses del cliente.

2)Tienda online de accesorios: venta de productos originales de Toyota, que se pueda filtar y ordenar la lista de acuerdo a los intereses del cliente. Tambien incorporar un carrito, dodne se pueda agregar, eliminar productos, y finalizar compra. 


