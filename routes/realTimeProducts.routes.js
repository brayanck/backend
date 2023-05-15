const express = require('express')
const { Router } = express
const ProductManager = require('../class/ProducManager')
const productManager = new ProductManager("./models/products.json");
const router = new Router()

let todos_products=[]
const productos=async()=>{
    try{
        todos_products = await productManager.getArrays()
        
    }catch(err){
        console.log(err)
    }
}
productos()
module.exports = function (io) {
    router.get('/',(req, res) => {
        res.render("realTimeProducts", {})
    });

    // establecemos la conexión de Socket.IO
    io.on('connection', function (socket) {
        console.log('cliente conectado');
        
        socket.emit("server:load-products",todos_products)
        socket.on("cliente:new-product", async (data) => {
            let product =await productManager.addProduct(data) 
        })
        socket.on("client:deleteProduct",async (id)=>{
            let product = await productManager.deleteProducts(id)
        })
        
        socket.on('disconnect', function () {
            console.log('Un usuario se ha desconectado');
        });
    });

    return router;
};

