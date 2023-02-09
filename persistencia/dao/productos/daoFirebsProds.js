import admin from "firebase-admin";
import config from "../../../utils/config.js";


admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

export default class daoFirebsProds{
    constructor ( collection ){
        this.collection = db.collection( collection )
    };

    async saveProduct(obj) {
        const producto = {...obj}
        producto.timestamp = new Date().toLocaleString()
        try {
            let objeto = await this.collection.add(producto)
            return { ...producto, id: objeto.id }
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

    async getProductById(id) {
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

    async updateProduct(id, producto) {
        try {
            const actualizado = await this.collection.doc(id).set(producto);
            return actualizado
        } catch (error) {
            return undefined
        }
    };

    async deleteById( id ) {
        try {
            const borrar = await this.collection.doc(id).delete();
            return borrar
        } catch (error) {
            return undefined
        }
    };
}