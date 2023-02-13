import repoMessages from "../persistencia/repos/repoMensajes.js";
import { infoLogger } from "../services/logger/logger.js";

function getChat(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /chat${url} recibida`);
  const user = req?.user;
  res.render("chat", { isAdmin: user?.isAdmin || false, usuario: user?.email });
}

async function getMyChat(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /chat${url} recibida`);
  const email = req.params.email;
  const mensajes = await repoMessages.getAllFromUser(email);
  if (mensajes.length > 0) {
    res.render("myChat", { usuario: email, mensajes: mensajes });
  } else {
    res.render("myChat", { usuario: email, sinMensajes: true });
  }
}

export { getChat, getMyChat };
