var next = document.getElementById("next");
var prev = document.getElementById("prev");
var imgHolder = document.querySelector(".img-holder");
var img = document.querySelector(".img");
let widthImg = img.clientWidth;
prev.addEventListener("click", () => {
  imgHolder.scrollLeft -= widthImg; //150
});
next.addEventListener("click", () => {
  imgHolder.scrollLeft += widthImg; //150
});
var cart = document.getElementById("cart");
var innerCart = document.querySelector(".inner-cart");
cart.addEventListener("click", () => {
  innerCart.classList.toggle("visible");
});
var closeCart = document.getElementById("close-cart");
closeCart.addEventListener("click", () => {
  innerCart.classList.remove("visible");
});
var numberOfProducts = document.querySelector(".numberOfProducts");
numberOfProducts.addEventListener("click", () => {
  innerCart.classList.toggle("visible");
});
var removeItemButtons = document.getElementsByClassName("btnDelete");
for (var i = 0; i < removeItemButtons.length; i++) {
  removeItemButtons[i].addEventListener("click", function (e) {
    e.target.parentElement.parentElement.remove();
    updateToCart();
  });
}
var quantityInputs = document.getElementsByClassName("count-cart");
for (var i = 0; i < quantityInputs.length; i++) {
  quantityInputs[i].addEventListener("change", quantityChanged);
}
var addtoCart = document.getElementsByClassName("addtoCart");
for (var i = 0; i < addtoCart.length; i++) {
  addtoCart[i].addEventListener("click", addtoCartClicked);
}

function addtoCartClicked(e) {
  var shopElement = e.target.parentElement.parentElement;
  var title = shopElement.getElementsByClassName('title')[0].innerText;
  var price = shopElement.getElementsByClassName('price')[0].innerText;
  var imgsrc = shopElement.getElementsByClassName('shopImg')[0].src;
  addtoCartItems(title , price , imgsrc)
  updateToCart()
}
function addtoCartItems(title, price, imgsrc) {
  var cartrow = document.createElement("div");
  cartrow.classList.add('cart-box');
  var cartContaineritems = document.getElementsByClassName("cart-box-holder")[0];
  //var cartitemsNames = cartContaineritems.getElementsByClassName('title-cart');
  // for(var i = 0 ; i < cartitemsNames.length; i++){
  //   if(cartitemsNames[i].innerText == title){
  //     alert('Item already exist in your cart!');
  //     return
  //   }
  // }
  var cartcontent = `
          <div class="cart-img">
          <img src="${imgsrc}">
          </div>
          <h4 class="title-cart">${title}</h4>
          <p class="price-cart">${ '$' + price}</p>
          <input type="number" class="count-cart" value="1">
          <span class="remove-cart"><i class="fa-solid fa-xmark btnDelete"></i></span>
`
updateCartCount();
  cartrow.innerHTML = cartcontent;
  cartContaineritems.append(cartrow);
  cartrow.getElementsByClassName('btnDelete')[0].addEventListener('click' , function(ev){
    for (var i = 0; i < removeItemButtons.length; i++) {
      removeItemButtons[i].addEventListener("click", function () {
        ev.target.parentElement.parentElement.remove();
        updateToCart();
      });
    }
  });
  cartrow.getElementsByClassName('count-cart')[0].addEventListener('change', quantityChanged)
}
function updateCartCount(){
  var arrayofcart = document.querySelectorAll('.cart-box');
  var numberOfProducts = document.querySelector('.numberOfProducts');
  numberOfProducts.innerHTML = arrayofcart.length + 1;
}
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateToCart();
}
function updateToCart() {
  var cartContainer = document.getElementsByClassName("cart-box-holder")[0];
  var cartRows = cartContainer.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var priceElement = cartRows[i].getElementsByClassName("price-cart")[0];
    var quantityElement = cartRows[i].getElementsByClassName("count-cart")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  if(total > 0){
    document.getElementsByClassName("price-out")[0].innerText = "$" + total;
  }else{
    document.getElementsByClassName("price-out")[0].innerText = "Empty";
    if(document.getElementsByClassName("price-out")[0].innerText == "Empty"){
      // document.getElementsByClassName("price-out")[0].style.fontWeight = '200';
      document.getElementsByClassName("price-out")[0].style.color = '#535353';
      document.getElementsByClassName("numberOfProducts")[0].innerText = '0';
    }else{
      document.getElementsByClassName("price-out")[0].style.color = '#00a4e4';
    }
  }
}
function checknewProduct(){
  var cartShop = document.getElementsByClassName('cartShop');
  for(var i=0 ; i < cartShop.length ; i++){
    if(cartShop[i].classList.contains == 'newPro'){
      cartShop[i].innerHTML += '<span class="new-div">new</span>';

    }
  }
}
checknewProduct();
let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".main");
toggle.addEventListener("click" , () =>{
  toggle.classList.toggle("active");
  menu.classList.toggle("active");

});

let lis = document.querySelectorAll(".main li");
let searchExtra = document.querySelector("#searchExtra");
let searchIcon = document.querySelector("#searchIcon");
let search = document.querySelector("#search");
searchExtra.addEventListener('click', function(){
  this.classList.add('active');
  searchIcon.classList.add('active');
  search.classList.add('active');
})

lis.forEach((li) => {
  li.addEventListener("click", removeActivetwo);
});

function removeActivetwo() {
  lis.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
    menu.classList.remove('active');
    toggle.classList.remove("active");
  });
}
var listFilter = document.getElementById('listFilter');
var comFilter = document.getElementById('comFilter');
var boxHolder = document.getElementsByClassName('box-holder');
listFilter.addEventListener('click', function(){
  listFilter.classList.add('active');
  comFilter.classList.remove('active');
  for(var i = 0 ; i < boxHolder.length ; i++){
    boxHolder[i].classList.add('active');
  }
});
comFilter.addEventListener('click', function(){
  comFilter.classList.add('active');
  listFilter.classList.remove('active');
  for(var x = 0 ; x < boxHolder.length ; x++){
    boxHolder[x].classList.remove('active');
  }
});