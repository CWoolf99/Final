import admin from "firebase-admin";
import config from "../utils/config.js";


admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebs{
    constructor(collection){
        this.collection = db.collection(collection)
    };
    async crearProducto(obj) {
        const carrito = {...obj}
        carrito.timestamp = new Date().toLocaleString()
        try {
            let objeto = await this.collection.add(carrito)
            return { ...carrito, id: objeto.id }
        } 
        catch (err) {
            return undefined
        }
    };

    async crearCarrito(obj) {
        const carrito = {...obj}
        carrito.timestamp = new Date().toLocaleString()
        try {
            let objeto = await this.collection.add(carrito)
            return { ...carrito, id: objeto.id }
        } 
        catch (err) {
            return undefined
        }
    };
    async getAll () {
        try {
            let result = [];
            let contenido = await this.collection.get()
            contenido.docs.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
            }
        catch (err) {
            console.log('error en la lectura')
        }
    };

    async buscarCarritoProds(id) {
        try{
            let carrito = await this.collection.doc(id).get();
            let productos = carrito.data()
            return productos;
        }
        catch{
            return undefined;
        }
    };

    async buscarProds(id) {
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        }
    catch (err){
        return undefined
        }
    };

    async actualizaproducto(id, producto) {
        try {
            const actualizado = await this.collection.doc(id).set(producto);
            return actualizado
        } catch (error) {
            return undefined
        }
    };
    async borrarPorId( id ) {
        try {
            const borrar = await this.collection.doc(id).delete();
            return borrar
        } catch (error) {
            return undefined
        }
    };

    async modificarProducto (producto , id){
        let prods = await this.buscarCarritoProds(id);
        let productos = prods.productos
        let productosA = [...producto, ...productos]
        try {
            const actualizado = await this.collection.doc(id).update({productos: productosA})
            return actualizado
        } 
        catch (err) {
            return undefined
        }

    };

    async eliminarProducto (productoId , id ) {
        let prods = await this.buscarCarritoProds(id);
        let productos = prods.productos
        let productosA = productos.filter((prod)=>prod.id !== productoId)
        try {
            await this.collection.doc(id).update({productos:productosA})
            return 'se eliminó'
        } 
        catch (err) {
            return undefined
        }
    };
};

export default ContenedorFirebs;