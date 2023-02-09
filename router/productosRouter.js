import express from "express";
import passport from "passport";
import { deleteProductos, getProductos, postProductos, putProductos } from "../controllers/productosController.js";

const { Router } = express;
const productosRouter = Router();

productosRouter.get('/:id', passport.authenticate('jwt', {session:false}) , getProductos );

productosRouter.post('/', postProductos );

productosRouter.put('/:id', putProductos )

productosRouter.delete('/:id', deleteProductos )

export default productosRouter