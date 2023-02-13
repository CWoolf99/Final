import express from "express";
import passport from "passport";

import {
  getCart,
  postCart,
  deleteProductFromCart,
  deleteCart,
  buyCart,
} from "../controllers/carritoController.js";

const { Router } = express;
const carritoRouter = Router();

carritoRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getCart
);

carritoRouter.delete("/:id", deleteCart);

carritoRouter.post("/:id/productos", postCart);

carritoRouter.delete("/:id/productos/:id_prod", deleteProductFromCart);

carritoRouter.post(
  "/compra",
  passport.authenticate("jwt", { session: false }),
  buyCart
);

export default carritoRouter;
