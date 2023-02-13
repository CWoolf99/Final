import daoFactoryOrdenes from "../dao/ordenes/daoFactoryOrdenes.js";

class repoOrdenes {
  constructor() {
    this.dao = daoFactoryOrdenes.getDao();
  }

  async saveOrder(cart) {
    return await this.dao.saveOrder(cart);
  }
}

const repoOrder = new repoOrdenes();

export default repoOrder;
