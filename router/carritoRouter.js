import express from "express";
import passport from "passport";

import { infoLogger } from "../services/logger/logger.js";
import { getCart , postCart , deleteCart } from "../controllers/carritoController.js";

const { Router } = express;
const carritoRouter = Router();

carritoRouter.get('/', passport.authenticate('jwt', {session:false}) , getCart);

carritoRouter.delete('/:id', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    if (admin === true){
    const carritoB = await ContenedorC.borrarPorId(req.params.id)
    if (carritoB){
        res.send(`se eliminó el carrito con id ${req.params.id}`)
        } else {
            res.send(`no se encontró el carrito`)
        }
    } else {
        const error = { error : -1, descripcion: `ruta api/carrito/${req.params.id} método delete no autorizada` }
        res.send(error)
    } 
})

carritoRouter.get('/:id/productos', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const user = req.user
    const carrito = await ContenedorC.buscarCarritoProds(req.params.id);
    if (carrito){
    res.render('carrito', {prodsC:carrito.productos , prods:productos , user:user})
    } else {
        res.send('no se encontro el carrito')
    }
})

carritoRouter.post('/:id/productos', postCart)

carritoRouter.delete('/:id/productos/:id_prod', deleteCart)

carritoRouter.post('/compra', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const user = req.user
    const productos = await ContenedorC.buscarCarritoProds(user?.username)
    emailCompra(productos , user?.username , user?.username)
    compraRealizada(user?.number , productos , user?.username)
    res.send('gracias por tu compra')
})

export default carritoRouter;