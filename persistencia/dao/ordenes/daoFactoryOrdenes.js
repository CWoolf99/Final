import daoMongoOrdenes from "./daoMongoOrdenes.js";

const db = "Mongo";

const collectionMongo = "ordenesbackend";
const schema = {
  productos: { type: [], required: true },
  orden: { type: Number, required: true },
  estado: { type: String, required: true },
  timestamp: { type: String, required: true },
  email: { type: String, required: true },
};

let dao;
switch (db) {
  case "Mongo":
    dao = new daoMongoOrdenes(collectionMongo, schema);
    break;
}

class daoFactoryOrdenes {
  static getDao() {
    return dao;
  }
}

export default daoFactoryOrdenes;
