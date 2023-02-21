// JSON Import
import burgers from "../data.json" assert { type: "json" };

const main = document.querySelector(".box-container");

for (let i = 0; i < burgers.length; i++) {
  const product = document.createElement("div");
  product.className = "box";

  product.innerHTML =
  '<div data-aos="fade-up" data-aos-delay="200" class="content">'+
    '<img data-aos="fade-up" data-aos-delay="150" class="product-img" src="images/' +
    burgers[i].image +
    '" >' +
    `<div class="stars">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half-alt"></i>
    </div>`+
    '<h3 class="product-title">' +
    burgers[i].name +
    "</h3>" +
    "<div class='price'> $" +
    burgers[i].price +
    "</div><div class='btn add-cart'>add to cart</div></div>"

  main.append(product);
}

// Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close')

cartIcon.onclick = ()=>{
  cart.classList.add("active")
}

closeCart.onclick = ()=>{
  cart.classList.remove("active")
}

// Cart Working JS
if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready)
}else{
  ready()
}

// Making Function
function ready(){
  // Remove Items From Cart
  let removeCartButtons = document.getElementsByClassName('cart-remove')
  for(let i = 0; i <  removeCartButtons.length; i++){
    let button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  updateTotal()
  // Quantity Changes
  let quantityInputs =document.getElementsByClassName('cart-quantity')
  for(let i = 0; i < quantityInputs.length; i++){
    let input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
}

// Add To Cart
let addCart = document.getElementsByClassName('add-cart')
for(let i = 0; i <  addCart.length; i++){
  let button = addCart[i]
  button.addEventListener("click", addCartClicked)
}

// Order Button Work
document
  .getElementsByClassName('btn-order')[0]
  .addEventListener('click', orderButtonClicked)

// Order Button
function orderButtonClicked(){
  alert('Your Order is placed')
  let cartContent = document.getElementsByClassName('cart-content')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal()
}

// Remove Items From Cart
function removeCartItem(event){
  let buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal()
}

// Quantity Changes
function quantityChanged(event){
  let input = event.target
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateTotal()
}

// Add To Cart
function addCartClicked(event){
  let button = event.target
  let shopProducts = button.parentElement
  let title = shopProducts.getElementsByClassName('product-title')[0].innerText
  let price = shopProducts.getElementsByClassName('price')[0].innerText
  let productImg = shopProducts.getElementsByClassName('product-img')[0].src
  addProductToCart(title,price,productImg)
  updateTotal()
}
function addProductToCart(title, price, productImg){
  let cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-box')
  let cartItems = document.getElementsByClassName("cart-content")[0]
  let cartItemsNames = cartItems.getElementsByClassName("cart-burger-title")
  for(let i = 0; i <  cartItemsNames.length; i++){
    if(cartItemsNames[i].innerText == title){
      // alert('You have already add this burger to cart!')
      return
    }
  }

  let cartBoxContent = `
                <img src="${productImg}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-burger-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <!-- Remove Cart -->
                <i class="fas fa-solid fa-trash icons cart-remove"></i>
  `
  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)

  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem)
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged)
}
// Update Total
function updateTotal(){
  let cartContent = document.getElementsByClassName('cart-content')[0]
  let cartBoxes = cartContent.getElementsByClassName('cart-box')
  let total = 0
  for(let i = 0; i < cartBoxes.length; i++){
    let cartBox = cartBoxes[i]
    let priceElement = cartBox.getElementsByClassName('cart-price')[0]
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
    let price = parseFloat(priceElement.innerText.replace("$", ""))
    let quantity = quantityElement.value
    total = total + (price * quantity)
  }
    // Contain Cents Value
  total = Math.round(total * 100) / 100

  document.getElementsByClassName("total-price")[0].innerText = '$' + total
}

// // Multilanguage
// const select = document.querySelector('select');
// const allLang = ['en', 'jp', 'uz'];

// select.addEventListener('change', changeURLLanguage);

// // перенаправить на url с указанием языка
// function changeURLLanguage() {
//     let lang = select.value;
//     location.href = window.location.pathname + '#' + lang;
//     location.reload();
// }

// function changeLanguage() {
//     let hash = window.location.hash;
//     hash = hash.substr(1);
//     console.log(hash);
//     if (!allLang.includes(hash)) {
//         location.href = window.location.pathname + '#en';
//         location.reload();
//     }
//     select.value = hash;
//     document.querySelector('title').innerHTML = LangArr['unit'][hash];
//     for (let key in LangArr) {
//         let elem = document.querySelector('.lng-' + key);
//         if (elem) {
//             elem.innerHTML = LangArr[key][hash];
//         }

//     }
// }

// changeLanguage();