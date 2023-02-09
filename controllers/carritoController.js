import { infoLogger } from "../services/logger/logger.js"
import repoCart from "../persistencia/repos/repoCarrito.js"
import repoProduct from "../persistencia/repos/repoProductos.js"


async function getCart ( req , res ) {
    const { url , method } = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const user = req?.user
    let carrito = await repoCart.getCart( user?.username )
    if ( carrito ) {
        res.json( carrito )
    } if ( !carrito ){
        carrito = await repoCart.createCart(user?.username)
        res.json( carrito )
    }
};

async function postCart ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const producto = await repoProduct.getProductById(req.body.id)
    if (producto){
        const carrito = await repoCart.addProductToCart( producto , req.params.id )
        if (carrito){
            res.json(carrito)
        } else {
            res.send('error al guardar el carrito')
        }
    } else{
        res.send('no se encontro el producto')
    }  
};

async function deleteCart ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
        const carrito = await repoCart.deleteProductFromCart(req.params.id_prod , req.params.id)
        if (carrito){
            res.json(carrito)
        } else {
            res.send('error al guardar el carrito')
        }
};

export { getCart , postCart , deleteCart }