import { infoLogger } from "../services/logger/logger.js";
import * as dotenv from "dotenv";

dotenv.config();

function getVarEntorno(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /varEntorno${url} recibida`);
  res.json({
    mongoUrl: process.env.MONGO,
    emailParaMailer: process.env.EMAIL,
    paseEmail: process.env.PASS,
    jwtDuracion: process.env.DURACION,
    port: process.env.PORT,
  });
}

export { getVarEntorno };
