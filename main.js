import  express  from 'express';
import CarritosDaoMongo from './daos/carritos/CarritosDaoMongo.js';
import ProductosDaoMongo from './daos/productos/ProductosDaoMongo.js';
const { Router } = express;

const app = express();
const routerP = Router();
const routerC = Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*-------------Importación de las clases y declaración de admin----------- */
//const ContenedorProductos = require('./clases/productos');
//const ContenedorCarrito = require('./clases/carrito');

const ContenedorP = new ProductosDaoMongo();
const ContenedorC = new CarritosDaoMongo();

const admin = true;
/*-------------Router productos----------- */

routerP.get('/:id?', async ( req , res ) => { 
    const productoEnc = await ContenedorP.buscarproducto(req.params.id);
    if(productoEnc){
        res.send(productoEnc)
    } else {
        const productos = await ContenedorP.getAll();
        res.send(productos)
    }
});

routerP.post('/',( req , res ) => {
    if (admin === true){
  ContenedorP.save(req.body);
  res.send(`se ha guardado con éxito el siguiente producto: ${JSON.stringify(req.body)}`) 
} else {
    const error = { error : -1, descripcion: 'ruta api/productos/ método post no autorizada' }
    res.send(error)
} 
});

routerP.put('/:id', async ( req , res ) => {
    if (admin === true){
    const productoA = await ContenedorP.actualizaproducto(req.params.id , req.body)
    if (productoA){
    res.send(`se actualizó el producto ${JSON.stringify(productoA)}`)
    }   else{
        res.send(`no se encontró el producto`)
    }
    } else {
    const error = { error : -1, descripcion: `ruta api/productos/${req.params.id} método put no autorizada` }
    res.send(error)
} 
})

routerP.delete('/:id', async ( req , res ) => {
    if (admin === true){
    const productoB = await ContenedorP.borrarPorId(req.params.id)
    if (productoB){
    res.send(`se eliminó el producto con id ${req.params.id}`)
    }   else{
        res.send(`no se encontró el producto`)
    }
    } else {
    const error = { error : -1, descripcion: `ruta api/productos/${req.params.id} método delete no autorizada` }
    res.send(error)
} 
})

/*-------------Router carrito----------- */

routerC.post('/', async ( req , res ) => {
    const producto = await ContenedorP.buscarproducto(req.body.id)
    if (producto){
        const carrito = {productos:producto}
        const carritoN = await ContenedorC.crearCarrito(carrito)
        if (carritoN){
            res.send(carritoN)
        } else {
            res.send('error al guardar el carrito')
        }
    } else{
        res.send('no se encontro el producto')
    }  
})

routerC.delete('/:id', async ( req , res ) => {
    if (admin === true){
    const carritoB = await ContenedorC.borrarPorId(req.params.id)
    if (carritoB){
        res.send(`se eliminó el carrito con id ${req.params.id}`)
        } else{
            res.send(`no se encontró el carrito`)
        }
    } else {
        const error = { error : -1, descripcion: `ruta api/carrito/${req.params.id} método delete no autorizada` }
        res.send(error)
    } 
})

routerC.get('/:id/productos', async ( req , res ) => {
    const carrito = await ContenedorC.buscarCarrito(req.params.id)
    if (carrito){
    res.send(carrito.productos)
    } else {
        res.send('no se encontro el carrito')
    }
})

routerC.post('/:id/productos', async ( req , res ) => {
    const producto = await ContenedorP.buscarproducto(req.body.id)
    if (producto){
        const carrito = await ContenedorC.modificarProducto(producto , req.params.id)
        if (carrito){
            res.send(JSON.stringify(carrito))
        } else {
            res.send('error al guardar el carrito')
        }
    } else{
        res.send('no se encontro el producto')
    }  
})

routerC.delete('/:id/productos/:id_prod', async ( req , res ) => {
        const carrito = await ContenedorC.eliminarProducto(req.params.id_prod , req.params.id)
        if (carrito){
            res.send(JSON.stringify(carrito))
        } else {
            res.send('error al guardar el carrito')
        }
})

/*-------------Declaración de rutas base----------- */
app.use('/api/productos', routerP)
app.use('/api/carrito', routerC)

app.use('*', (req , res) => {
    const error = { error : -2, descripcion: `ruta no implementada`};
    res.send(error)
})

app.use(express.static('public'))

/*-------------Inicialización del server----------- */
const Port = 8080;

const connectedServer = app.listen(Port, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))