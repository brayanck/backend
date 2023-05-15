
const formAgregar = document.getElementById("form_agregar")
const title = document.getElementById("title")
const price = document.getElementById("price")
const description = document.getElementById("description")
const code = document.getElementById("code")
const category = document.getElementById("category")
const stock = document.getElementById("stock")
const thumbnail = document.getElementById("thumbnail")
const estado = document.getElementById("status")
console.log(formAgregar)
price.addEventListener('keypress', function (event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^([0-9])*$/.test(keyValue)) {
        event.preventDefault();
    }
});
stock.addEventListener('keypress', function (event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^([0-9])*$/.test(keyValue)) {
        event.preventDefault();
    }
});

formAgregar.addEventListener("submit", e => {
    e.preventDefault()
    saveProduct(title.value,price.value,description.value,code.value,category.value,stock.value,thumbnail.value,estado.value)
})
