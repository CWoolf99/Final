import { infoLogger } from "../services/logger/logger.js";
import repoProduct from "../persistencia/repos/repoProductos.js";

async function getProductos(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /productos${url} recibida`);
  const productos = await repoProduct.getAll();
  res.json({ productos: productos });
}
async function getProducto(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /productos${url} recibida`);
  const isValid = await repoProduct.validateId(req.params.id);
  if (isValid == true) {
    const productoEnc = await repoProduct.getProductById(req.params.id);
    res.json({ producto: productoEnc });
  } else {
    res.status(404).json({ error: "id no valida" });
  }
}

async function getProductosPorCategoria(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /productos${url} recibida`);
  const productosEnc = await repoProduct.getProductByCategory(
    req.params.categoria
  );
  console.log(productosEnc);
  if (productosEnc.length > 0) {
    res.json({ productos: productosEnc });
  } else {
    const productos = await repoProduct.getAll();
    res
      .status(404)
      .json({ error: "categoria no encontrada", productos: productos });
  }
}

async function postProductos(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /productos${url} recibida`);
  const result = await repoProduct.saveProduct(req.body);
  console.log(result);
  res.json({ productoGuardado: req.body });
}

async function putProductos(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /productos${url} recibida`);
  const isValid = await repoProduct.validateId(req.params.id);
  if (isValid == true) {
    const productoA = await repoProduct.updateProductById(
      req.params.id,
      req.body
    );
    res.json({ productoActualizado: productoA });
  } else {
    res.status(404).json({ error: "id no valida" });
  }
}

async function deleteProductos(req, res) {
  const { url, method } = req;
  infoLogger.info(`Ruta ${method} /productos${url} recibida`);
  const isValid = await repoProduct.validateId(req.params.id);
  if (isValid == true) {
    const productoB = await repoProduct.deleteProductById(req.params.id);
    res.send({ idDeProductoEliminado: req.params.id });
  } else {
    res.status(404).json({ error: "id no valida" });
  }
}

export {
  getProductos,
  getProducto,
  postProductos,
  getProductosPorCategoria,
  putProductos,
  deleteProductos,
};
