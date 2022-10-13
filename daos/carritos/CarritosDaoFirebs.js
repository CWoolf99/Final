import ContenedorFirebs from "../../contenedores/ContenedorFirebs.js";

class CarritosDaoFirebs extends ContenedorFirebs {
    constructor(){
        super('carritos')
    }
    async crearCarrito( obj ){
       return await super.crearCarrito(obj);
    };

    async getAll(){
        let productos = await super.getAll();
        return productos
    };

    async buscarCarrito( id ){
        let producto = await super.buscarCarritoProds(id);
        return producto;
    };

    async modificarProducto( id , producto){
        let result = await super.modificarProducto(id , producto );
        return result;
    };

    async eliminarProducto(productoId , id){
        let result  = await super.eliminarProducto(productoId,id);
        return result;
    };
};

export default CarritosDaoFirebs;