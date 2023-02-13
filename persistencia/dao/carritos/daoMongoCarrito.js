import mongoose from "mongoose";

import { errorLogger } from "../../../services/logger/logger.js";

export default class daoMongoCarrito {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async createCart(id, adress) {
    try {
      return await this.collection.create({
        productos: [],
        id: id,
        direccion: adress,
      });
    } catch (err) {
      errorLogger.error("error al guardar en mongo");
      console.log(err);
      return false;
    }
  }

  async getCart(id) {
    try {
      let cart = await this.collection.findOne({ id: id });
      return cart;
    } catch {
      errorLogger.error("error en la lectura");
      return undefined;
    }
  }

  async deleteCartById(id) {
    try {
      await this.collection.deleteOne({ id: id });
      return true;
    } catch (err) {
      errorLogger.error("error al guardar en mongo");
      return false;
    }
  }

  async addProductToCart(producto, id) {
    try {
      await this.collection.updateOne(
        { id: id },
        { $push: { productos: producto } }
      );
      return producto;
    } catch (err) {
      errorLogger.error("error al guardar en mongo");
      return undefined;
    }
  }

  async deleteProductFromCart(productoId, id) {
    const cartId = id;
    const prodId = mongoose.Types.ObjectId(productoId);
    try {
      await this.collection.updateOne(
        { id: cartId },
        { $pull: { productos: { _id: prodId } } }
      );
      const carrito = await this.getCart(id);
      return carrito;
    } catch (err) {
      console.log(err);
      errorLogger.error("error al guardar en mongo");
      return false;
    }
  }

  async validateId(id) {
    try {
      const result = await this.collection
        .findOne({ id: id })
        .select("_id")
        .lean();
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      errorLogger.error("error al guardar en mongo");
    }
  }
}
