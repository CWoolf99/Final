import mongoose from "mongoose";

import { errorLogger } from "../../../services/logger/logger.js";

export default class daoMongoCarrito {
    constructor ( collection , schema ) {
        this.collection = mongoose.model( collection , schema )
    };

    async createCart( id ) {
        try{
            return await this.collection.create({productos:[],timestamp:new Date().toLocaleString(),id:id})
        } catch (err){
            errorLogger.error('error al guardar en mongo')
            return false
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

    async borrarPorId( id ) {
        try {
            await this.collection.deleteOne({_id:id})
            return true
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return false
        }
    };

    async getCart(id) {
        try{
            let cart = await this.collection.findOne({id:id});
            return cart;
        }
        catch{
            errorLogger.error('error en la lectura')
            return undefined;
        }
    };

    async buscarCarritoProds(id) {
        try{
            let productos = await this.collection.findOne({id:id}).select('productos');
            return productos;
        }
        catch{
            errorLogger.error('error en la lectura')
            return undefined;
        }
    };

    async addProductToCart (producto , id){
        try {
            await this.collection.updateOne({id:id},{$push:{productos:producto}})
            return producto
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return undefined
        }

    };

    async deleteProductFromCart ( productoId , id ) {
        const cartId= id
        const prodId= mongoose.Types.ObjectId(productoId)
        try {
            await this.collection.updateOne({id:cartId},{$pull:{productos:{_id:prodId}}});
            const carrito = await this.buscarCarritoProds(id)
            return carrito
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return false
        }
    };
}