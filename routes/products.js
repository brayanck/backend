const express = require('express')
const { Router } = express
const routesProducts = new Router()
const ProductManager = require('../class/ProducManager')
const productManager = new ProductManager("./models/products.json");

routesProducts.get("/", async (req, res) => {
    const products = await productManager.getArrays()
    try {

        if (req.query.limit) {
            let removed = products.splice(0, req.query.limit);
            res.send(removed)
        }
        else {
            res.json({ status: "success", data: products })
        }

    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}
)
routesProducts.get("/:pid", async (req, res) => {
    try {
        let id = req.params.pid
        const product = await productManager.getProductsById(id)
        if (product) {
            res.json({ status: "success", data: product })
        } else {
            res.json({ status: "error", data: "Product no encontrado" })
        }
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
})

routesProducts.post("/", async (req, res) => {
    try {
        let product = req.body
        let products = await productManager.addProduct(product)
        if(products == false ){
            res.send({ status: "error", data: "faltan datos" })
        }else{
            res.json({ status: "success", data:products })
        }
        
        
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }


})
routesProducts.put("/:pid", async (req, res) => {
    try{
        const id = req.params.pid
        const nuevoProducto = req.body
        const product = await productManager.updateProducts(id, nuevoProducto)
        if (product == false) {
            res.json({ status: "error", data: "Producto no encontrado" })
        }else{
            res.json({ status: "success", data: product })
        }
    }catch(err){
        res.json({ status: "error", message: err.message })
    }

})

routesProducts.delete("/:pid", async(req, res) => {
    try{
    let id = req.params.pid
    const products = await productManager.deleteProducts(id)
    if (products == false) {
        res.json({ status: "error", data: "Product no encontrado" })
    } else {
        res.json({ status: "success", data: products })
    }
    }catch(err){
        res.json({ status: "error", message: err.message })
    }
    
})


module.exports = { routesProducts,productManager }