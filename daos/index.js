let productosDao
let carritosDao

switch (process.env.PERS) {
    case 'json':
        const { default: ProductosDaoFs } = await import('./productos/ProductosDaoFs.js')
        const { default: CarritosDaoFs } = await import('./carritos/CarritosDaoFs.js')

        productosDao = new ProductosDaoFs()
        carritosDao = new CarritosDaoFs()
        break
    case 'firebase':
        const { default: ProductosDaoFirebs } = await import('./productos/ProductosDaoFirebs.js')
        const { default: CarritosDaoFirebs } = await import('./carritos/CarritosDaoFirebs.js')

        productosDao = new ProductosDaoFirebs()
        carritosDao = new CarritosDaoFirebs()
        break
    case 'mongodb':
        const { default: ProductosDaoMongo } = await import('./productos/ProductosDaoMongo.js')
        const { default: CarritosDaoMongo } = await import('./carritos/CarritosDaoMongo.js')

        productosDao = new ProductosDaoMongo()
        carritosDao = new CarritosDaoMongo()
        break
};
export { productosDao, carritosDao }