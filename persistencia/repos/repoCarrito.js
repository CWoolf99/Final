import daoFactoryCarrito from "../dao/carritos/daoFactoryCarrito.js";

class repoCarrito {
  constructor() {
    this.dao = daoFactoryCarrito.getDao();
  }

  async getCart(id) {
    return await this.dao.getCart(id);
  }

  async createCart(id, adress) {
    return await this.dao.createCart(id, adress);
  }

  async deleteCartById(id) {
    return await this.dao.deleteCartById(id);
  }

  async addProductToCart(producto, id) {
    return await this.dao.addProductToCart(producto, id);
  }

  async deleteProductFromCart(productoId, id) {
    return await this.dao.deleteProductFromCart(productoId, id);
  }

  async validateId(id) {
    return await this.dao.validateId(id);
  }
}

const repoCart = new repoCarrito();

export default repoCart;
