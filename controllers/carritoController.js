import { infoLogger } from "../services/logger/logger.js";
import repoCart from "../persistencia/repos/repoCarrito.js";
import repoProduct from "../persistencia/repos/repoProductos.js";
import repoOrder from "../persistencia/repos/repoOrdenes.js";
import { emailCompra } from "../services/mailer/mailer.js";

async function getCart(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} ${url} recibida`);
  const user = req?.user;
  let carrito = await repoCart.getCart(user?.email);
  if (carrito) {
    res.json(carrito);
  }
  if (!carrito) {
    carrito = await repoCart.createCart(user?.email, user?.adress);
    res.json(carrito);
  }
}

async function deleteCart(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} ${url} recibida`);
  const isValid = await repoCart.validateId(req.params.id);
  if (isValid == true) {
    const carritoB = await repoCart.deleteCartById(req.params.id);
    res.send(`se eliminó el carrito con id ${req.params.id}`);
  } else {
    res.status(400).json({ error: "id no valida" });
  }
}

async function postCart(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} ${url} recibida`);
  const isValid = await repoCart.validateId(req.params.id);
  if (isValid == true) {
    const producto = await repoProduct.getProductById(req.body.id);
    if (producto) {
      producto.cantidad = req.body.cantidad;
      const carrito = await repoCart.addProductToCart(producto, req.params.id);
      res.json({ productoGuardado: carrito });
    } else {
      res.status(404).json({ error: "no se encontro el producto" });
    }
  } else {
    res.status(404).json({ error: "id de carrito no valida" });
  }
}

async function deleteProductFromCart(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} ${url} recibida`);
  const isValid = await repoCart.validateId(req.params.id);
  if (isValid == true) {
    const carrito = await repoCart.deleteProductFromCart(
      req.params.id_prod,
      req.params.id
    );
    res.json({ carritoSinProducto: carrito });
  } else {
    res.status(404).json({ error: "id de carrito no valida" });
  }
}

async function buyCart(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} ${url} recibida`);
  const user = req.user;
  const productos = await repoCart.getCart(user?.email);
  await repoOrder.saveOrder(productos);
  emailCompra(productos, user?.email, user);
  res.send("gracias por tu compra");
}

export { getCart, postCart, deleteCart, deleteProductFromCart, buyCart };
