//Arreglo de datos principal
let products = [];


function initComps() {
  const cont = document.getElementById("content");
  cont.innerHTML = '<div id="Instruction" class="">Clickea sobre el producto</div>';
  products.forEach((sProduct) => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
    <div class="productoDesc">
        <h5>${sProduct.nombre} ${sProduct.marca}</h5>
        <img src="${sProduct.imagen}" onclick="display(${sProduct.id})">
        <h5>Volumen = ${sProduct.volumen}</h5>
        <h5>Precio(IVA incluido) = ${sProduct.precio}</h5>
    `
    cont.appendChild(div);
  });

  const end = document.getElementById('checkoutbutt');
  end.addEventListener('click', () =>{
    out();
  })
}

function display(id){
    const sProduct = products.find(p => p.id == id);
    const clean =  document.getElementById("content");
    clean.innerHTML = "";
    const cont = document.getElementById("showcase");
    cont.innerHTML = "";
    const div = document.createElement('div');
    div.className = 'productoShowcase';
    div.innerHTML = `
    <div class="productoDesc">
        <h5 class = "proTitle" id = "pName">${sProduct.nombre} ${sProduct.marca}</h5>
        <img id="pImg" src="${sProduct.imagen}" onclick="display(${sProduct.id})">
        <h5 class = "proDesc" id="pGrade">Grado alcoholico = ${sProduct.gradoAlcoholico}</h5>
        <h5 class = "proDesc" id="pVolu">Volumen = ${sProduct.volumen}</h5>
        <h5 class = "proDesc" id="pPrice">Precio(IVA incluido) = ${sProduct.precio}</h5>
        <h5 class = "proDesc" id="pStock">Stock = ${sProduct.cantidad}</h5>
        <button id="butt${sProduct.id}">Agregar al Carrito</button> 
        <input type="number" min="0" id="cantidadIng" placeholder="">
    `
    cont.appendChild(div);
    const cant = document.getElementById("cantidadIng").value=1;
    const boton = document.getElementById(`butt${sProduct.id}`);

    boton.addEventListener('click', ()=>{
        const cant = document.getElementById("cantidadIng").value;
        const cheky =  cant > 0 ? true : false
        if(cheky){
            pushCart(sProduct.id,cant,sProduct.precio);
            cont.innerHTML = "";
            clean.innerHTML = "";
            initComps();
        }else{
            sweety("Ingrese una cantidad valida",false);
        }

    });
  


}

function tosty(stri){
    Toastify({
        text: stri,
        style: {
          background: "linear-gradient(to right, yellow, orange)",
          color: "#000"
        }
      }).showToast();
    
}
function initShopcart() {
  const carticon = document.querySelector(".icon-cart");
  const body = document.querySelector("body");
  carticon.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  const closeb = document.querySelector(".Close");
  closeb.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
}

function sweety(str,check){
    if(!check){
        Swal.fire({
            text: str,
            icon: "warning"
          });
    }
}

function fin(){
    const name = document.getElementById('namecheck');
    const dir = document.getElementById('dirCheck');
    const mail = document.getElementById('mail');
    Swal.fire({
        text: `Sr(a) ${name.value}\n Su pedido sera enviado a ${dir.value}\nSe le enviara un correo con la informacion de despacho (WIP)`  ,
        icon: "success"
    });
    console.log("antes");
      moment().locale('es');
      let data = {
        service_id: 'service_omrt1ic',
        template_id: 'template_n8bhv7j',
        user_id: "MgI_IgdQlYnp99SqC",
        template_params: {
            'to_mail': mail.value,
            'to_name': name.value,
            'order_nr' : 1,
            'date': moment().add(2,'days').format('DD [De] MMMM'),
            'total' : shopCart.reduce((sum,item)=>{return sum+=item.cartprice;},0),
            'Lista' : listaemail()
        }
      };
      console.log(data.template_params);
      
      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done(function() {
        alert('Your mail is sent!');
      }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
      });
    const clear = document.getElementById("checkpage");
    clear.innerHTML = '';
    shopCart.forEach((pro) =>{
        const aux = products.find(p => p.id === pro.id);
        aux.cantidad =  parseInt(aux.cantidad) - parseInt(pro.quantityInside);
    });
    shopCart = [];
    initComps();
    updateCart();
    document.getElementById("totalCarro").innerHTML = "";
    document.getElementById("insidecart").innerHTML = "0"

}
function cartload(){//codigo arreglado por chat gpt
  products = [];
  fetch("https://moonharu.github.io/JustApi/Test.JSON")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(inside => products.push(inside));
    console.log(productsaux);
    initComps();
    initShopcart();
    JSONload();
    moment.locale("es");
  })
  .catch(error => console.error('Error fetching data:', error));
 // Manejo de errores
}
/* codgo hecho por mi
function cartload(){
  fetch("https://moonharu.github.io/JustApi/Test.JSON")
  .then((response) => response.json())
  .then((data) => data.forEach(inside => productsaux.push(inside)))
  .then(initComps(), initShopcart(), JSONload());
  console.log(products);
  
}
*/
cartload();
//initComps();
//initShopcart();
//JSONload();


