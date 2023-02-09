import  express  from 'express';
import handlebars from 'express-handlebars';
import { engine } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import * as dotenv from 'dotenv';
import cluster from 'cluster';

import checkAuthentication from './services/auth/auth.js';
import { emailCompra ,compraRealizada } from './services/mailer/mailer.js';
import {warnLogger , infoLogger } from './services/logger/logger.js'
import loginRouter from './router/loginRouter.js';
import registerRouter from './router/signupRouter.js';
import productosRouter from './router/productosRouter.js';
import carritoRouter from './router/carritoRouter.js';

dotenv.config()
const modo = process.argv[2] == 'Cluster'

const { Router } = express;

const app = express();
const routerC = Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.engine('handlebars' , engine())
app.set('view engine', 'handlebars')
app.set("views", "./views");
app.use(session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))

app.use(passport.initialize());


/*-------------Importación de las clases y declaración de admin----------- */
//const ContenedorProductos = require('./clases/productos');
//const ContenedorCarrito = require('./clases/carrito');

//const ContenedorC = new CarritosDaoMongo();

const admin = true;

/*-------------Router carrito----------- */

routerC.post('/', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    let id = req.user.username
    const carritoN = await ContenedorC.crearCarrito(id)
    if (carritoN){
        res.redirect('/api/productos')
    } else {
        res.send('error al guardar el carrito')
    }
});

routerC.delete('/:id', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
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

routerC.get('/:id/productos', checkAuthentication , async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const user = req.user.username
    const carrito = await ContenedorC.buscarCarritoProds(req.params.id);
    const productos= await ContenedorP.getAll();
    if (carrito){
    res.render('carrito', {prodsC:carrito.productos , prods:productos , user:user})
    } else {
        res.send('no se encontro el carrito')
    }
})

routerC.post('/:id/productos', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const producto = await ContenedorP.buscarproducto(req.body.id)
    if (producto){
        const carrito = await ContenedorC.modificarProducto(producto , req.params.id)
        if (carrito){
            res.redirect(`/api/carrito/${req.params.id}/productos`)
        } else {
            res.send('error al guardar el carrito')
        }
    } else{
        res.send('no se encontro el producto')
    }  
})

routerC.post('/:id/productos/:id_prod', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
        const carrito = await ContenedorC.eliminarProducto(req.params.id_prod , req.params.id)
        if (carrito){
            res.redirect(`/api/carrito/${req.params.id}/productos`)
        } else {
            res.send('error al guardar el carrito')
        }
})

routerC.post('/compra', async ( req , res ) => {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const user = req.user
    const productos = await ContenedorC.buscarCarritoProds(user?.username)
    emailCompra(productos , user?.username , user?.username)
    compraRealizada(user?.number , productos , user?.username)
    res.send('gracias por tu compra')
})

/*-------------Declaración de rutas base----------- */
app.use('/productos', productosRouter)
app.use('/carrito', carritoRouter)
app.use('/signup', registerRouter)
app.use('/login', loginRouter)

app.get('*', ( req , res ) => {
    const {url , method} = req
    warnLogger.warn(`Ruta ${method} ${url} no está implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
})


/*-------------Inicialización del server----------- */
const PORT = process.env.PORT || 8080;

if(modo && cluster.isPrimary) {
    console.log(`PID MASTER ${process.pid}`)
  
    for(let i=0; i<3; i++) {
        cluster.fork()
    }
  
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
  }
  else {
    const connectedServer = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}-PID ${process.pid}`)
    })
    connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
    
  }
