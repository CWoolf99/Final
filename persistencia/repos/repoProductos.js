import daoFactoryProds from "../dao/productos/daoFactoryProds.js";

class repoProductos {
    constructor(){
        this.dao = daoFactoryProds.getDao()
    }

    async saveProduct (obj) {
        return await this.dao.saveProduct(obj)
    };

    async getAll () {
        return await this.dao.getAll()
    };

    async getProductById (id) {
        return await this.dao.getProductById(id)
    }

    async updateProductById (id,obj) {
        return await this.dao.updateProductById(id,obj)
    };

    async deleteProductById (id) {
        return await this.dao.deleteProductById(id)
    }
}

const repoProduct = new repoProductos(); 

export default repoProduct