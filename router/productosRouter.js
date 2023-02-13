import express from "express";
import passport from "passport";
import {
  deleteProductos,
  getProductos,
  getProducto,
  getProductosPorCategoria,
  postProductos,
  putProductos,
} from "../controllers/productosController.js";

const { Router } = express;
const productosRouter = Router();

productosRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getProductos
);

productosRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getProducto
);

productosRouter.get("/categoria/:categoria", getProductosPorCategoria);

productosRouter.post("/", postProductos);

productosRouter.put("/:id", putProductos);

productosRouter.delete("/:id", deleteProductos);

export default productosRouter;
