import daoFactoryCarrito from "../dao/carritos/daoFactoryCarrito.js";

class repoCarrito {
    constructor(){
        this.dao = daoFactoryCarrito.getDao();
    };

    async getCart ( id ) {
        return await this.dao.getCart( id )
    };

    async createCart ( id ) {
        return await this.dao.createCart( id )
    };

    async addProductToCart ( producto , id ) {
        return await this.dao.addProductToCart( producto , id )
    };

    async deleteProductFromCart ( productoId , id ) { 
        return await this.dao.deleteProductFromCart( productoId , id )
    };
}

const repoCart = new repoCarrito();

export default repoCart;