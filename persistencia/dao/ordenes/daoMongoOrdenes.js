import mongoose from "mongoose";

import { errorLogger } from "../../../services/logger/logger.js";

export default class daoMongoOrdenes {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async saveOrder(cart) {
    try {
      let contenido = await this.collection.find({}).lean();
      let orden = contenido.length + 1;
      return await this.collection.create({
        productos: cart.productos,
        orden: orden,
        estado: "generated",
        timestamp: new Date().toLocaleString(),
        email: cart.id,
      });
    } catch (err) {
      errorLogger.error("error al guardar en mongo");
      console.log(err);
      return false;
    }
  }
}
