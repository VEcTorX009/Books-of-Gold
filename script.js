const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addCart = document.getElementsByClassName("normal");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
function buyButtonClicked() {
  alert("Thanks for shopping!");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg =
    shopProducts.parentElement.getElementsByClassName("img1")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart");
      return;
    }
  }
  var cartBoxContent = `<img src="${productImg}" class="cart-img" alt="">
  <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" min="1" max="3">
  </div>
<i class="fa-regular fa-trash-can cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    total = Math.round(total * 100) / 100;
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// let carts = document.querySelectorAll('.normal');

// let products = [
//   {
//     name: 'Atomic Habits',
//     price: 11.99 ,
//     tag: 'https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg',
//     inCart: 0
//   },
//   {
//     name: 'The Power of Subconscious Mind',
//     price: 4.94,
//     inCart: 0
//   },
//   {
//     name: 'Richest Man of Babylone',
//     price: 12.39,
//     inCart: 0
//   },
//   {
//     name: 'Ego is the Enemy',
//     price: 12.59,
//     inCart: 0
//   }
// ];

// for(let i=0;i<carts.length;i++){
//   carts[i].addEventListener('click',()=>{
//     cartNumbers();
//     totalCost(products[i]);
//   })
// }

// function onLoadCartNumbers() {
//   let productNumbers = localStorage.getItem('cartNumbers')
//   if(productNumbers){
//     document.querySelector('#navbar span').textContent = productNumbers;

//   }
// }

// function cartNumbers() {
//   let productNumbers = localStorage.getItem('cartNumbers')
//   localStorage.setItem('cartNumbers',1)

//   productNumbers = parseInt(productNumbers);

//   if(productNumbers){
//   localStorage.setItem('cartNumbers',productNumbers+1);
//   document.querySelector('#navbar span').textContent = productNumbers+1;
//   }
//   else{
//   localStorage.setItem('cartNumbers',1);
//   document.querySelector('#navbar span').textContent=1;
//   }
//   setItems(products);
// }
// function setItems(product) {
//   let cartItems = localStorage.getItem('productsInCart');
//   cartItems = JSON.parse(cartItems)
// if(cartItems!=null){
//   if(cartItems[product.tag] !=undefined){
//     cartItems={
//       ...cartItems,
//       [product.tag]: product
//     }
//   }
//   cartItems[product.tag].inCart+=1;
// }
// else{

//   product.inCart=1;
//    cartItems = {
//   [product.tag]: product
//   }

// }

//   localStorage.setItem("productsInCart",JSON.stringify(cartItems))
// }
// function totalCost(product){
//   let cartCost = localStorage.getItem('totalCost')
//   localStorage.setItem("totalCost",product.price);
//   if(cartCost!=null)
//   {
//     cartCost = parseInt(cartCost)
//     localStorage.setItem("totalCost", cartCost + product.price)
//   }
//   else{
//     localStorage.setItem("totalCost",product.price)
//   }
// }

// function displayCart(){
//   let cartItems = localStorage.getItem("productInCart")
//   cartItems = JSON.parse(cartItems);
//   let productContainer = document.querySelector(".products-container")

//   console.log(cartItems);
//   if(cartItems && productContainer){
//     productContainer.innerHTML='';
//     Object.values(cartItems).map(item=>{
//       productContainer.innerHTML+=`
//       <div class="product">
//       <i class="fa-regular fa-trash-can cart-remove"></i>
//       <img src = ${item.tag}>
//       <span>${item.name}</span>
//       </div>
//       <div class="price1">${item.price}
//       </div>
//       <div class="quantity">
//       <ion-icon class ="decrease"
//       name = "arrow-dropright-circle"><ion-icon>
//       </div>
//       <div class ="total1">
//       $${item.inCart*item.price},00
//       </div>
//       `
//     })
//     productContainer.innerHTML+=`
//     <div class="basketTotalContainer">
//     <h4 class="basketTotal`
//   }
// }

// onLoadCartNumbers();
// displayCart();
