import daoFactoryMensajes from "../dao/mensajes/daoFactoryMensajes.js";

class repoMensajes {
  constructor() {
    this.dao = daoFactoryMensajes.getDao();
  }

  async saveMessage(message) {
    return await this.dao.saveMessage(message);
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getAllFromUser(user) {
    return await this.dao.getAllFromUser(user);
  }
}

const repoMessages = new repoMensajes();

export default repoMessages;
