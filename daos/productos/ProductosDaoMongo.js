import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

class ProductosDaoFs extends ContenedorMongo{
    constructor(){
        super('productos' , {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            imagen: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
            timestamp: { type: String, required: true }
        })
    }

    async save( obj ){
        await super.crearCarrito(obj);
    };

    async getAll(){
        let productos = await super.getAll();
        return productos
    };

    async buscarproducto( id ){
        let producto = await super.buscarProds(id);
        return producto;
    };

    async actualizaproducto( id , producto){
        let result = await super.actualizaproducto(id , producto );
        return result;
    };

    async borrarPorId(id){
        let result  = await super.borrarPorId(id);
        return result;
    };
};

export default ProductosDaoFs;