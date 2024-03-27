//Arreglo de datos principal
let productsaux = [];
let products = [
  { id:1 ,nombre: 'Whisky Escocés', marca: 'Johnnie Walker', categoria: 'Licor', volumen: '750 ml', gradoAlcoholico: 40, precio: 25000, cantidad: 15, imagen: "Img/JWWH.png" },
  { id:2 ,nombre: 'Vodka', marca: 'Absolut', categoria: 'Licor', volumen: '700 ml', gradoAlcoholico: 40, precio: 16950, cantidad: 20, imagen:"Img/VAO.png" },
  { id:3 ,nombre: 'Vino Tinto', marca: 'Concha y Toro', categoria: 'Vino', volumen: '750 ml', gradoAlcoholico: 13, precio: 7500, cantidad: 30, imagen:"Img/VCYTR.png" },
  { id:4 ,nombre: 'Cerveza IPA', marca: 'Stone Brewing', categoria: 'Cerveza', volumen: '355 ml', gradoAlcoholico: 6.9, precio: 5000, cantidad: 50, imagen:"Img/SBCI.png" },
  { id:5 ,nombre: 'Ron', marca: 'Havana Club', categoria: 'Licor', volumen: '700 ml', gradoAlcoholico: 40, precio: 12000, cantidad: 25, imagen: "Img/RHC.png"},
  { id:6 ,nombre: 'Ginebra', marca: 'Bombay Sapphire', categoria: 'Licor', volumen: '750 ml', gradoAlcoholico: 47, precio: 17000, cantidad: 18, imagen:"Img/GBS.png" },
  { id:7 ,nombre: 'Tequila', marca: 'Patrón', categoria: 'Licor', volumen: '750 ml', gradoAlcoholico: 40, precio: 25000, cantidad: 22, imagen:"Img/TQS.png" },
  { id:8 ,nombre: 'Champán', marca: 'Moët & Chandon', categoria: 'Vino Espumoso', volumen: '750 ml', gradoAlcoholico: 12, precio: 20000, cantidad: 12, imagen:"Img/MCC.png" },
  { id:9 ,nombre: 'Sidra', marca: 'Strongbow', categoria: 'Cerveza de Sidra', volumen: '500 ml', gradoAlcoholico: 5, precio: 5000, cantidad: 40, imagen:"Img/SSBA.png" },
  { id:10 ,nombre: 'Licor de Café', marca: 'Kahlúa', categoria: 'Licor', volumen: '750 ml', gradoAlcoholico: 20, precio: 18000, cantidad: 15, imagen:"Img/LCK.png" }
];


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
        text: `Sr(a) ${name.value}\n Su pedido sera enviado a ${dir.value}\nSe le enviara un correo con la informacion de despacho`  ,
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
        console.log('Your mail is sent!');
      }).fail(function(error) {
        console.log('Oops... ' + JSON.stringify(error));
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


