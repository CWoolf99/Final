import daoMongoCarrito from "./daoMongoCarrito.js";

const db = "Mongo";

const collectionMongo = "carritosbackend";
const schema = {
  productos: { type: [], required: true },
  id: { type: String, required: true },
  direccion: { type: String, required: true },
};

let dao;
switch (db) {
  case "Mongo":
    dao = new daoMongoCarrito(collectionMongo, schema);
    break;
}

class daoFactoryCarrito {
  static getDao() {
    return dao;
  }
}

export default daoFactoryCarrito;
