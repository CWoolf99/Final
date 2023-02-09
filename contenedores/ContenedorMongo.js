import mongoose from "mongoose";
import config from "../utils/config.js"
import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';

import {errorLogger} from '../services/logger/logger.js'

//await mongoose.connect(process.env.MONGO,config.mongo.options);

class ContenedorMongo {
    constructor(collection , schema ){
        this.collection = mongoose.model(collection , schema )  
    }
   async guardarProducto(obj) {
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
    async crearCarrito(id){
        try{
            return await this.collection.create({productos:[],timestamp:new Date().toLocaleString(),id:id})
        } catch (err){
            errorLogger.error('error al guardar en mongo')
            return false
        }
    }

    async getAll () {
        try {
            let contenido = await this.collection.find({}).lean()
            return contenido; 
        }
        catch (err) {
            errorLogger.error('error en la lectura')
        }
    };

    async buscarCarrito(id) {
        try{
            let productos = await this.collection.findOne({id:id});
            return productos;
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

    async buscarProds(id) {
       try{
        let productos = await this.collection.findOne({_id:id}).lean();
        return productos;
    }
    catch (err){
        errorLogger.error('error en la lectura')
        return undefined
        }
    };

    async actualizaproducto(id, producto) {
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

    async modificarProducto (producto , id){
        try {
            await this.collection.updateOne({id:id},{$push:{productos:producto}})
            return producto
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return undefined
        }

    };

    async eliminarProducto (productoId , id ) {
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

export default ContenedorMongo;