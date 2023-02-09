import daoMongoCarrito from "./daoMongoCarrito.js";
import daoFirebsCarrito from "./daoFirebsCarrito.js";

const db = process.argv[3] || "Mongo";

const collectionMongo = 'carritos';
const schema = {
    productos: { type: [], required: true },
    timestamp: { type: String, required: true },
    id: {type: String, required: true}
};

const collectionFbs = 'carritos';

let dao
switch ( db ) {
    case 'Mongo':
        dao = new daoMongoCarrito( collectionMongo , schema )
        break
    case 'Fbs':
        dao = new daoFirebsCarrito( collectionFbs )
        break
};

class daoFactoryCarrito {
    static getDao() {
        return dao
    }
};

export default daoFactoryCarrito;