import daoMongoProds from "./daoMongoProds.js";
import daoFirebsProds from "./daoFirebsProds.js";

const db = process.argv[3] || "Mongo";

const collectionMongo = 'productosFinal';
const schema = {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: String, required: true }
};

const collectionFbs = 'productos';

let dao
switch ( db ) {
    case 'Mongo':
        dao = new daoMongoProds( collectionMongo , schema )
        break
    case 'Fbs':
        dao = new daoFirebsProds( collectionFbs )
        break
}

class daoFactoryProds {
    static getDao() {
        return dao
    }
}

export default daoFactoryProds;