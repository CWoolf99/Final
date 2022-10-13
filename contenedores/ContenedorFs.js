//const {promises:fs} = require('fs');
import { promises as fs } from "fs";
class ContenedorFs{
    constructor( archivo ){
        this.archivo=archivo;
    }


    async crearCarrito(obj) {
        const mensajes = await this.getAll(); 
        const id = mensajes.length + 1;
        const carrito = {...obj, id:id}
        carrito.timestamp = new Date().toLocaleString()
        mensajes.push(carrito) 
        console.log(mensajes)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(mensajes))
            return mensajes
        } 
        catch (err) {
            return undefined
        }
    }

    async getAll () {
        try {

            const contenido = await fs.readFile(`${this.archivo}`, 'utf-8')
            return JSON.parse(contenido); 
        }
        catch (err) {
            console.log('error en la lectura')
        }
    };

    async borrarPorId( id ) {
        let productos = await this.getAll();
        if(productos.find((valor) => valor.id == id)){
        productos = productos.filter((producto) => producto.id != id)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(productos))
            return true
        } 
        catch (err) {
            return undefined
        }
        } else {return undefined}
    };

    async buscarCarrito(id) {
        const productos = await this.getAll();
        return productos.find((valor) => valor.id == id )
    };

    async modificarProducto (producto , id){
        let carrito = await this.buscarCarrito(id);
        carrito.productos =  [...carrito.productos,producto];
        await this.borrarPorId(id)
        let carritos = await this.getAll();
        carritos.push(carrito)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(carritos))
            return carrito
        } 
        catch (err) {
            return undefined
        }

    };

    async eliminarProducto (productoId , id ) {
        let carrito = await this.buscarCarrito(id);
        let productos = carrito.productos
        let productosA = productos.filter((producto) => producto.id != productoId)
        carrito.productos =  [...productosA];
        await this.borrarPorId(id)
        let carritos = await this.getAll();
        carritos.push(carrito)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(carritos))
            return carrito
        } 
        catch (err) {
            return undefined
        }
    };

    async actualizaproducto(id, producto) {
        let productos = await this.getAll();
        if(productos.find((valor) => valor.id == id)){
        productos = productos.filter((producto) => producto.id != id)
        const productoA = {...producto, id: id} 
        productos.push(productoA);
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(productos))
            return productoA
        } 
        catch (err) {
            return undefined
        }
        }
    };

    async borrarPorId( id ) {
        let productos = await this.getAll();
        if(productos.find((valor) => valor.id == id)){
        productos = productos.filter((producto) => producto.id != id)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(productos))
            return true
        } 
        catch (err) {
            return false
        }
        }
    };

}


//module.exports = ContenedorCarrito; 
export default ContenedorFs;
