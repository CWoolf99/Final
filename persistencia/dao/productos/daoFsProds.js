import { promises as fs } from "fs";
class ContenedorFs{
    constructor( archivo ){
        this.archivo=archivo;
    }

    async saveProduct(obj) {
        const productos = await this.getAll(); 
        const id = productos.length + 1;
        const producto = {...obj, id:id}
        producto.timestamp = new Date().toLocaleString()
        productos.push(producto) 
        console.log(productos)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(productos))
            return productos
        } 
        catch (err) {
            return undefined
        }
    };

    async getAll () {
        try {
            const contenido = await fs.readFile(`${this.archivo}`, 'utf-8')
            return JSON.parse(contenido); 
        }
        catch (err) {
            console.log('error en la lectura')
        }
    };

    async getProductoById(id) {
        const productos = await this.getAll();
        return productos.find((valor) => valor.id == id )
    };

    async updateProduct(id, producto) {
        let productos = await this.getAll();
        if(productos.find((valor) => valor.id == id)){
        productos = productos.filter((producto) => producto.id != id)
        const productoA = {...producto, id: id} 
        productos.push(productoA);
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(productos))
            return productoA
        } 
        catch (err) {
            return undefined
        }
        }
    };

    async deleteProductById( id ) {
        let productos = await this.getAll();
        if(productos.find((valor) => valor.id == id)){
        productos = productos.filter((producto) => producto.id != id)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(productos))
            return true
        } 
        catch (err) {
            return false
        }
        }
    };
}