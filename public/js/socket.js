const socket = io()
const saveProduct =(title,price,description,code,category,stock,thumbnail,status)=>{
 socket.emit('cliente:new-product', {
        title,
        price,
        description,
        code,
        category,
        stock ,
        thumbnail,
        status:status
    })
    
}
const deleteProduct=(id)=>{
    socket.emit("client:deleteProduct",id)
}
    socket.on("server:load-products", (products)=>{
        renderProducts(products)
    })