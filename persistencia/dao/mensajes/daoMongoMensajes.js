import mongoose from "mongoose";

import { errorLogger } from "../../../services/logger/logger.js";

export default class daoMongoMensajes {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async saveMessage(message) {
    try {
      return await this.collection.create({
        usuario: message.usuario,
        mensaje: message.mensaje,
        isAdmin: message.isAdmin,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      errorLogger.error("error al guardar en mongo");
      console.log(err);
      return false;
    }
  }

  async getAll() {
    try {
      let contenido = await this.collection.find({}).lean();
      return contenido;
    } catch (err) {
      errorLogger.error("error en la lectura");
    }
  }

  async getAllFromUser(user) {
    try {
      let contenido = await this.collection.find({ usuario: user }).lean();
      return contenido;
    } catch (err) {
      errorLogger.error("error en la lectura");
    }
  }
}
