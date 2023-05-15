const fs = require("fs");
const uuid4 = require('uuid4')
class ProductManager {
    constructor(path) {

        this.path = path;
    }
    writeFile = async (data) => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
        } catch (err) {
            console.log(err)
        }

    }
    getArrays = async () => {
        try {
            let readProduct = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(readProduct);

        } catch (err) {
            console.log(err)
        }

    }
    addProduct = async (product) => {
        try {
            let products = await this.getArrays()
            if (
                !product.code ||
                !product.description ||
                !product.price ||
                !product.title ||
                !product.stock ||
                !product.category
            ) {
                return false
            } else {
                if (!product.status) {
                    product.status = true
                }
                product.id = uuid4()
                products = [...products, product]
                await this.writeFile(products)
                return product
            }
        } catch (error) {
            console.log("error al agregar producto");
        }
    }
    getProductsById = async (id) => {
        try {
            let products = await this.getArrays()
            let product = products.find((product) => product.id === id)
            if (product) {
                return product
            } else {
                return false
            }
        } catch (error) {
            console.log("error al agregar producto");
        }
    }
    deleteProducts = async (id) => {
        try {
            let products = await this.getArrays()
            const index = products.findIndex(producto => producto.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                await this.writeFile(products)
                return products
            } else {
                return false
            }

        } catch (error) {
            console.log("error al eliminar producto");
        }
    }
    updateProducts = async (id, nuevoProducto) => {
        try {
            let products = await this.getArrays()
            const product = products.find(product => product.id == id)
            const index = products.findIndex(producto => producto.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                for (let atributo in nuevoProducto) {
                    if (product.hasOwnProperty(atributo)) {
                        product[atributo] = nuevoProducto[atributo];
                    }
                }
                const productoActualizado = {
                    ...product,
                    id: id
                };
                products.push(productoActualizado)
                await this.writeFile(products)
                return products
            } else {
                return false
            }

        } catch (error) {
            console.log("error al actualizar el producto");
        }

    }
}
module.exports = ProductManager;
