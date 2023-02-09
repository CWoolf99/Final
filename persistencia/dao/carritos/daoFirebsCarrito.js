import admin from "firebase-admin";

const db = admin.firestore();

export default class daoFirebsCarrito {
    constructor ( collection ) {
        this.collection = db.collection( collection )
    }

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

    async modificarProductos (producto , id){
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
}