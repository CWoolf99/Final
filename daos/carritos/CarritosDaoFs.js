import ContenedorCarrito from "../../contenedores/ContenedorFs.js";

class CarritoDaoFs extends ContenedorCarrito{
    constructor(){
        super('./carritos.json')
    }
    
    async crearCarrito(obj){
        let carritos = await super.crearCarrito(obj);
        return carritos;
    };

    async getAll (){
        let productos = await super.getAll();
        return productos;
    };

    async borrarPorId(id){
        let result = await super.borrarPorId(id)
        return result
    };

    async buscarCarrito(id){
        let carrito = await super.buscarCarrito(id);
        return carrito
    };

    async modificarProducto(producto , id){
        let carrito = await super.modificarProducto(producto , id);
        return carrito;
    };

    async eliminarProducto (productoId , id){
        let carrito = await super.eliminarProducto(productoId , id);
        return carrito;
    }
};

export default CarritoDaoFs;