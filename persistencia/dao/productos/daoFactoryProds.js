import daoMongoProds from "./daoMongoProds.js";

const db = "Mongo";

const collectionMongo = "productosbackend";
const schema = {
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
};

let dao;
switch (db) {
  case "Mongo":
    dao = new daoMongoProds(collectionMongo, schema);
    break;
}

class daoFactoryProds {
  static getDao() {
    return dao;
  }
}

export default daoFactoryProds;
