let shopCart = [];


function listaemail(){
    let lista = "";
    shopCart.forEach(pro => {
        const sour = products.find(p=> p.id == pro.id);
        const name = sour.nombre+" "+sour.marca;
        const quant = pro.quantityInside;
        const precio = pro.cartprice;
        lista += name+" Cantidad: "+quant+" Precio final: "+precio+"\n";
    });
    return lista;
}
function productdelete(product){
    const index = shopCart.indexOf(product);
    if (index>-1){
        shopCart.splice(index,1);
    }
}

function JSONStore(){
    const JSONFY = JSON.stringify(shopCart);
    localStorage.setItem("CarroBack", JSONFY);
}

function updateCart(){
    const list = document.getElementById("cartList");
    list.innerHTML = "";
    shopCart.forEach((cartPro) =>{
        const sour = products.find(p=> p.id == cartPro.id);
        const div = document.createElement('div');
        div.className = 'cartProduct'
        div.innerHTML = `
        <div id="cartItem">
            <div id="cartimage"><img src="${sour.imagen}" alt="" srcset=""></div>
            <div class = "text" id="cartName">${sour.nombre}</div>
            <div class = "text" id="cartPrice">${cartPro.cartprice}</div>
            <div class = "text" id="quan">
                <span id="more" onclick="(pushCart(${cartPro.id},1,${sour.precio}))">+</span>
                <span id="cartquantityInside">${cartPro.quantityInside}</span>
                <span id="minus" onclick="(pushCart(${cartPro.id},-1,${sour.precio}))">-</span>
            </div>
        </div>
        `;
        
        const noti = document.getElementById("insidecart");
        noti.innerHTML = shopCart.length;
        const total = document.getElementById("totalCarro");
        total.innerHTML = "Total = "+shopCart.reduce((sum,item)=>{
           return sum+=item.cartprice;
        },0)
        list.appendChild(div);
    });
    JSONStore();
}

function CantiCart(idProducto,cantidadIngresada,costoProducto){

    let productoshopCart = shopCart.find(p=> p.id == idProducto);
      if(productoshopCart === undefined){
         obj ={ 
             id: idProducto,
             quantityInside: cantidadIngresada,
             cartprice: parseInt(costoProducto)*parseInt(cantidadIngresada)
         }
         shopCart.push(obj);
         tosty(`Agregado/s ${cantidadIngresada} Productos`);
     }else{
         productoshopCart.quantityInside = parseInt(productoshopCart.quantityInside) + parseInt(cantidadIngresada);
         if(productoshopCart.quantityInside<=0){
             productdelete(productoshopCart);
             const noti = document.getElementById("insidecart");
             noti.innerHTML = shopCart.length;
             tosty(`Producto eliminado`);
         }else{
             productoshopCart.cartprice =  parseInt(costoProducto)*parseInt(productoshopCart.quantityInside);
 
         }
     }
 }
 function checkAvalaible(id,Canti){
    const pro = products.find(p => p.id == id);
    const aux = shopCart.find(p => p.id == id);
    if(aux != undefined){
        Canti = parseInt(Canti) + parseInt(aux.quantityInside);
    }
    return Canti<=pro.cantidad ? true: false;
}

function pushCart(id,quantityInside,costoProducto){
    const check= checkAvalaible(id,quantityInside);
    check ? CantiCart(id,quantityInside,costoProducto):sweety("Producto fuera de stock",false);
    updateCart();
}


function out(){
    const outbody = document.getElementById('content');
    outbody.innerHTML = "";
    const showcaseaux = document.getElementById('showcase');
    showcaseaux.innerHTML='';
    const div = document.createElement('div');
    div.className = 'checkout';
    div.innerHTML=`
    <div id = checkpage>
            <span id="title">Checkout</span>
            <br>
            <span>Nombre</span>
            <input type="text" id="namecheck">
            <br>
            <span>Direccion</span>
            <input type="text" id="dirCheck">
            <br>
            <span>Correo</span>
            <input type="text" id="mail">
            <br>
            <span>Numero tarjeta</span>
            <input type="text" id="tarjeta">
            
            <button id="buttCheck" onclick="fin()">Finalizar compra</button>
        </div>
    `
    outbody.appendChild(div);
}

function JSONload(){
   shopCart = JSON.parse(localStorage.getItem("CarroBack"));
   updateCart();
}

