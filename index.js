const express = require('express')
const app =express()
const handlebars = require('express-handlebars') 
const {routesProducts} = require('./routes/products')
const routesCarts = require('./routes/carts')
const ProductManager = require('./class/ProducManager')
const productManager = new ProductManager("./models/products.json");
const http = require('http')
const server = http.createServer(app)
//socket
const {Server} = require('socket.io')
const io = new Server(server)
const routesRealTimeProducts = require('./routes/realTimeProducts.routes')(io)


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//public
app.use(express.static(__dirname+"/public"))

//views handlebars
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')




//routes
app.use('/api/products', routesProducts)
app.use('/api/carts', routesCarts)
app.use('/realTimeProducts',routesRealTimeProducts)

app.get('/', async(req,res)=>{
    const products = await productManager.getArrays()
    res.render('home',{
        title:"lista de productos",
        products:products
    })
})
const port = 8080 || process.env.port

server.listen(port,()=>{
    console.log("el servidor esta corriendo en el puerto 8080")
})