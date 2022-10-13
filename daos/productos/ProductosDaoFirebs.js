import ContenedorFirebs from "../../contenedores/ContenedorFirebs.js";

class ProductosDaoFs extends ContenedorFirebs{
    constructor(){
        super('productos')
    }

    async save( obj ){
        await super.crearProducto(obj);
    };

    async getAll(){
        let productos = await super.getAll();
        return productos
    };

    async buscarproducto( id ){
        let producto = await super.buscarProds(id);
        return [producto];
    };

    async actualizaproducto( id , producto){
        return await super.actualizaproducto(id,producto)
    };

    async borrarPorId(id){
        return await super.borrarPorId(id)
    };
};

export default ProductosDaoFs;