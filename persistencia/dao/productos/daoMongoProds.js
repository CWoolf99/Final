import mongoose from "mongoose";

import { errorLogger } from "../../../services/logger/logger.js";

export default class daoMongoProds {
    constructor ( collection , schema ) {
        this.collection = mongoose.model( collection , schema )
    };

    async saveProduct(obj) {
        const carrito = {...obj}
        carrito.timestamp = new Date().toLocaleString()
        try {
            await this.collection.create(carrito)
            return carrito
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return undefined
        }
    };

    async getAll () {
        try {
            let contenido = await this.collection.find({}).lean()
            return contenido; 
        }
        catch (err) {
            errorLogger.error('error en la lectura')
        }
    };

    async getProductById(id) {
        try{
         let productos = await this.collection.findOne({_id:id}).lean();
         return productos;
     }
     catch (err){
         errorLogger.error('error en la lectura')
         return undefined
         }
     };

     async updateProductById(id, producto) {
        let prod = producto
        try {
            await this.collection.updateOne({_id:id} , {$set:{nombre:prod.nombre,descripcion:prod.descripcion,codigo:prod.codigo, imagen:prod.imagen,precio:prod.precio,stock:prod.stock}})
            return prod
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return undefined
        }
    };

    async deleteProductById( id ) {
        try {
            await this.collection.deleteOne({_id:id})
            return true
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return false
        }
    };
}