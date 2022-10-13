import ContenedorFs from "../../contenedores/ContenedorFs.js";


class ProductosDaoFs extends ContenedorFs{
    constructor(){
        super('./productos.json')
    };
    
    async save( obj ){
        await super.crearCarrito(obj);
    };
    
    async getAll(){
        let productos = await super.getAll();
        return productos;
    };
    
    async buscarproducto( id ){
        let producto = await super.buscarCarrito(id);
        return producto;
    };

    async buscarproductoC( id ){
        let producto = await super.buscarCarrito(id);
        return [producto];
    };
    
    async actualizaproducto( id , producto){
        let productoA = await super.actualizaproducto( id , producto );
        return productoA;
    };
    
    async borrarPorId(id){
        let result = await super.borrarPorId(id);
        return result;
    };
};

export default ProductosDaoFs;