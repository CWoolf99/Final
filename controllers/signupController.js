import { infoLogger } from "../services/logger/logger.js";
import { nuevoUsuario } from "../services/mailer/mailer.js";
import generateToken from "../services/auth/auth.js";

function getSignup(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /signup${url} recibida`);
  res.render("signUp");
}

function postSignup(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /signup${url} recibida`);
  const { username, password } = req.body;
  const user = { email: username, password: password };
  nuevoUsuario(username);
  const access_token = generateToken(user);
  res.json({ access_token });
}

function getErrorSignup(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /signup${url} recibida`);
  res.render("errorSignUp");
}

export { getSignup, postSignup, getErrorSignup };
