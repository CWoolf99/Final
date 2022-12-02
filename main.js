import  express  from 'express';
import handlebars from 'express-handlebars';
import { engine } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import * as dotenv from 'dotenv';
import cluster from 'cluster';

import CarritosDaoMongo from './daos/carritos/CarritosDaoMongo.js';
import ProductosDaoMongo from './daos/productos/ProductosDaoMongo.js';
import checkAuthentication from './auth/auth.js';
import { nuevoUsuario , emailCompra ,compraRealizada } from './mailer/mailer.js';
//import mongoose from 'mongoose';

dotenv.config()
const modo = process.argv[2] == 'Cluster'

const { Router } = express;

const app = express();
const routerP = Router();
const routerC = Router();
const routerL = Router();
const routerR = Router();

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
app.use(passport.session());


/*-------------Importación de las clases y declaración de admin----------- */
//const ContenedorProductos = require('./clases/productos');
//const ContenedorCarrito = require('./clases/carrito');

const ContenedorP = new ProductosDaoMongo();
const ContenedorC = new CarritosDaoMongo();

const admin = true;
/*-------------Router productos----------- */

routerP.get('/:id?', checkAuthentication , async ( req , res ) => { 
    const productoEnc = await ContenedorP.buscarproducto(req.params.id);
    const id = req.user.username
    if(productoEnc){
        res.render('home' , {prods:[productoEnc], id:id , carritoExiste:carritoExiste })
    } else {
        const carrito = await ContenedorC.buscarCarrito(id)
        let carritoExiste = false
        if (carrito) { carritoExiste = true }
        const productos = await ContenedorP.getAll();
        res.render('home' , {prods:productos, id:id , carritoExiste:carritoExiste})
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
    let id = req.user.username
    const carritoN = await ContenedorC.crearCarrito(id)
    if (carritoN){
        res.redirect('/api/productos')
    } else {
        res.send('error al guardar el carrito')
    }
});

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

routerC.get('/:id/productos', checkAuthentication , async ( req , res ) => {
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
        const carrito = await ContenedorC.eliminarProducto(req.params.id_prod , req.params.id)
        if (carrito){
            res.redirect(`/api/carrito/${req.params.id}/productos`)
        } else {
            res.send('error al guardar el carrito')
        }
})

routerC.post('/compra', async ( req , res ) => {
    const user = req.user
    const productos = await ContenedorC.buscarCarritoProds(user?.username)
    emailCompra(productos , user?.username , user?.username)
    compraRealizada(user?.number , productos , user?.username)
    res.send('gracias por tu compra')
})

/*-------------Router Login----------- */
routerL.get('/' , (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    } else {
    const {url , method} = req
    //infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('formLogin')
}
});

routerL.post('/' , passport.authenticate('login', {failureRedirect:'/login/errorLogIn'}),  (req,res) => {res.redirect('/api/productos')}); 
routerL.get('/errorLogIn', (req,res) => {
    const {url , method} = req
    //infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('errorLogIn')
})
routerL.get('/logout' , (req,res) => {
    let nombre = req.user.username
    req.logout(err => {
    if (!err) {
        const {url , method} = req
        //infoLogger.info(`Ruta ${method} ${url} recibida`)
        res.render('logout', {nombre:nombre}) 
         
    } else {
        res.redirect('/login')
    }}); 
})
/*-------------Router Register----------- */
routerR.get('/', (req,res) => {
    //const {url , method} = req
    //infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('signUp')
});
routerR.post('/', passport.authenticate('signup', {failureRedirect:'/register/errorRegister'}), (req,res) => {
    nuevoUsuario(req?.user)
    res.redirect('/api/productos')});
routerR.get('/errorRegister', (req,res) => {
    //const {url , method} = req
    //infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('errorSignUp')
})

/*-------------Declaración de rutas base----------- */
app.use('/api/productos', routerP)
app.use('/api/carrito', routerC)
app.use('/login', routerL)
app.use('/register', routerR)

app.use('*', (req , res) => {
    const {url} = req
    const error = { error : -2, descripcion: `ruta ${url} no implementada`};
    res.send(error)
});

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
