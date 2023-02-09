import { infoLogger } from "../services/logger/logger.js";
import repoProduct from "../persistencia/repos/repoProductos.js";



const admin = true;

async function getProductos ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const productoEnc = await repoProduct.getProductById(req.params.id);
    if(productoEnc){
        res.json({producto:productoEnc})
    } else {
        const productos = await repoProduct.getAll();
        res.json({productos:productos})
    }
};

function postProductos ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    if (admin === true){
  repoProduct.saveProduct(req.body);
  res.send(`se ha guardado con éxito el siguiente producto: ${JSON.stringify(req.body)}`) 
} else {
    const error = { error : -1, descripcion: 'ruta api/productos/ método post no autorizada' }
    res.send(error)
} 
};

async function putProductos ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    if (admin === true){
    const productoA = await repoProduct.updateProductById(req.params.id , req.body)
    if (productoA){
    res.send(`se actualizó el producto ${JSON.stringify(productoA)}`)
    }   else{
        res.send(`no se encontró el producto`)
    }
    } else {
    const error = { error : -1, descripcion: `ruta api/productos/${req.params.id} método put no autorizada` }
    res.send(error)
} 
};

async function deleteProductos ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    if (admin === true){
    const productoB = await repoProduct.deleteProductById(req.params.id)
    if (productoB){
    res.send(`se eliminó el producto con id ${req.params.id}`)
    }   else{
        res.send(`no se encontró el producto`)
    }
    } else {
    const error = { error : -1, descripcion: `ruta api/productos/${req.params.id} método delete no autorizada` }
    res.send(error)
} 
};

export { getProductos , postProductos , putProductos , deleteProductos };