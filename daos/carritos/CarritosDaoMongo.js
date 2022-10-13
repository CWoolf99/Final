import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

class   CarritosDaoMongo extends ContenedorMongo{
    constructor(){
        super('carritos' , {
            productos: { type: [], required: true },
            timestamp: { type: String, required: true }
        })
    }

    async crearCarrito(obj){
        console.log(obj)
        let carritos = await super.crearCarrito();
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
        let carrito = await super.buscarCarritoProds(id);
        return carrito;
    };

    async modificarProducto(producto , id){
        let carrito = await super.modificarProducto(producto , id);
        return carrito;
    };

    async eliminarProducto (productoId , id){
        let carrito = await super.eliminarProducto(productoId , id);
        return carrito;
    };
}

export default CarritosDaoMongo;
