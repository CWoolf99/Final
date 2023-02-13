import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import * as dotenv from "dotenv";
import cluster from "cluster";
import { createServer } from "http";
import { Server } from "socket.io";

import { warnLogger } from "./services/logger/logger.js";
import loginRouter from "./router/loginRouter.js";
import registerRouter from "./router/signupRouter.js";
import productosRouter from "./router/productosRouter.js";
import carritoRouter from "./router/carritoRouter.js";
import repoMessages from "./persistencia/repos/repoMensajes.js";
import { chatRouter } from "./router/chatRouter.js";
import varEntornoRouter from "./router/varEntornoRouter.js";

dotenv.config();
const modo = process.argv[2] == "Cluster";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  repoMessages.getAll().then((msjs) => {
    socket.emit("mensajes", msjs);
  });

  socket.on("nuevoMensaje", async (mensaje) => {
    repoMessages.saveMessage(mensaje).then((msjs) => {
      repoMessages.getAll().then((msjs) => {
        io.sockets.emit("mensajes", msjs);
      });
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(
  session({
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());

/*-------------Declaración de rutas base----------- */
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);
app.use("/signup", registerRouter);
app.use("/", loginRouter);
app.use("/chat", chatRouter);
app.use("/varEntorno", varEntornoRouter);

app.get("*", (req, res) => {
  const { url, method } = req;
  warnLogger.warn(`Ruta ${method} ${url} no está implementada`);
  res.send(`Ruta ${method} ${url} no está implementada`);
});

/*-------------Inicialización del server----------- */
const PORT = process.env.PORT || 8080;

if (modo && cluster.isPrimary) {
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  const connectedServer = httpServer.listen(PORT, () => {
    console.log(
      `Servidor http escuchando en el puerto ${
        connectedServer.address().port
      }-PID ${process.pid}`
    );
  });
  connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
  );
}
