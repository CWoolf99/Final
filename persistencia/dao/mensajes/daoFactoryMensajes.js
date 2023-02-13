import daoMongoMensajes from "./daoMongoMensajes.js";

const db = "Mongo";

const collectionMongo = "mensajesbackend";
const schema = {
  usuario: { type: String, required: true },
  mensaje: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  timestamp: { type: String, required: true },
};

let dao;
switch (db) {
  case "Mongo":
    dao = new daoMongoMensajes(collectionMongo, schema);
    break;
}

class daoFactoryMensajes {
  static getDao() {
    return dao;
  }
}

export default daoFactoryMensajes;
