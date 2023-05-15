const caja = document.getElementById("caja")
function render (data){

    const div = document.createElement("div")
    div.innerHTML = `
    <div class="col">
    <div class="card h-100">
      <img src="${data.thumbnail}" class="card-img-top " alt="${data.title}">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">precio:$${data.price}</p>
        <p class="card-text">${data.description}</p>
      </div>
      <div class="card-footer">
      <button class="btn btn-danger delete" data-id="${data.id}">eliminar</button>
      </div>
    </div>
  </div>`
  const btnDelete=div.querySelector(".delete")
  
  btnDelete.addEventListener("click",()=>{
    deleteProduct(btnDelete.dataset.id)
  })
  return div
}

const renderProducts = (products)=>{
    console.log(products)
    caja.innerHTML=""
    products.forEach(element => {
        caja.append(render(element))
    });
}
