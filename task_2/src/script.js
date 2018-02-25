window.onload = function () {
  
  var product = document.getElementsByClassName('delete-elem');
  var discountInput = document.getElementById('discount');
  var discountForm = document.getElementById('discount-form');
  var plusButtons = document.querySelectorAll('.plus');         //stepUp buttons
  var minusButtons = document.querySelectorAll('.minus');       //stepDown buttons

  /*
  /*delete product from basket
  */
  function deleteProduct (elem) {
    return function() {
      var chosenProduct = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
      chosenProduct.parentNode.removeChild(chosenProduct);
      //checking if cart is empty
      if(document.getElementsByClassName('delete-elem').length === 0) {
        document.getElementById('product-cart').innerHTML = "<div style='padding:5px; color:rgba(0, 0, 0, 0.3); text-align: center;'>В корзине ничего нет</div>"
        document.querySelectorAll('.total-price').forEach(function (elem) {
        elem.innerHTML = 0;
        })
        document.getElementById('total-price-delivery').innerHTML = 0;
      } else {
      calculateAll(); //recalculating all prices
      } 
    }
  }

  /*
  /* count price of each one product
  */
  function countPrice () { 
      var quantity = document.getElementsByClassName('product-quantity');     //quantity of product
      var prices = document.getElementsByClassName('product-price');          //product price
      //price = parseInt(price.replace(/\s+/g, ''));                          //make price an integer
      var discounts = document.getElementsByClassName('product-discount');    //discount in percent
      //discount = discount.replace("%", '');
      var pricesWithDiscount = document.getElementsByClassName('price-with-discount');
      //count product price with discount
      var pricesWithDiscountMobile = document.getElementsByClassName('price-with-discount-mobile');
      for(var k = 0; k < prices.length; k++) { 
        var price = parseInt(prices[k].innerHTML.replace(/\s+/g, ''));
        var discount = parseInt(discounts[k].innerHTML.replace("%", ''))/100;
        var result = numberWithSpaces((quantity[k].value)*(price - price*discount));
        pricesWithDiscount[k].innerHTML = result;
        pricesWithDiscountMobile[k].innerHTML = result;
      }
  }

  /*
  /* count total price in cart
  */
  function countTotalPrice () {
    var allPrices = document.querySelectorAll('.price-with-discount');
    var totalPrice = document.querySelectorAll('.total-price');
    var intPrices = [];
    for(var i = 0; i < allPrices.length; i++) {
      intPrices.push(parseInt(allPrices[i].innerHTML.replace(/\s+/g, '')));
    }
    var total = intPrices.reduce(function(prev, curr, index, arr) {
        return prev + curr;
    });
    totalPrice.forEach(function(elem) {
      elem.innerHTML = numberWithSpaces(total);
    });    
  }
  
  /*
  /* count total price with delivery
  */
  function countDeliveryPrice () {
    var currentPrice = parseInt(document.querySelector('.total-price').innerHTML.replace(/\s+/g, ''));
    var deliveryPrice = 0;
    var totalPriceDelivery = currentPrice;
    //find checked radio
    if(document.getElementById('delivery1').checked) { 
    //courier-delivery was chosen
      if (totalPriceDelivery < 3000) {
        deliveryPrice = 200;
        document.getElementById('courier-price').innerHTML = deliveryPrice;
        totalPriceDelivery = currentPrice + deliveryPrice;
      } else {
        deliveryPrice = 0;
        document.getElementById('courier-price').innerHTML = deliveryPrice;
      }
    } else if (document.getElementById('delivery2').checked) {
      deliveryPrice = 50;
      totalPriceDelivery = currentPrice + deliveryPrice;
    }
    document.getElementById('total-price-delivery').innerHTML = numberWithSpaces(totalPriceDelivery);
  }

  // create a number string with spaces
  function numberWithSpaces (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  //calculate all prcies
  function calculateAll () {
    countPrice();
    countTotalPrice();
    countDeliveryPrice();
  }
  calculateAll();

  //add event listeners to all delete buttons
  for (var i = 0; i < product.length; i++) {
    product[i].addEventListener('click', deleteProduct(product[i]));
  }

  //choose delivery 
  var radios = document.forms['delivery'].elements['mydelivery'];
  for (var i = 0; i < radios.length; i++) {
    radios[i].onclick = countDeliveryPrice;
  }

  //change quantity
  //adding event listeners
  for (var i = 0; i < plusButtons.length; i++) {
    //if plus button is clicked then increase input's value by one
    plusButtons[i].addEventListener('click', function () {
      this.parentNode.querySelector('input[type=number]').value++;
      if(this.parentNode.querySelector('input[type=number]').value > 10) {
        this.parentNode.querySelector('input[type=number]').value = 10;
      }
      calculateAll(); //recalculating all prices
    });
    //if minus button is clicked then decrease input's value by one
    minusButtons[i].addEventListener('click', function () {
      this.parentNode.querySelector('input[type=number]').value--;
      if(this.parentNode.querySelector('input[type=number]').value <= 0) {
        this.parentNode.querySelector('input[type=number]').value = 1;
      }
      calculateAll(); //recalculating all prices
    });
  }

  //add discount to all products
  //listens for discount to be submitted
  discountForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var percent = "10%";
      if(document.getElementById('discount').value === 'sale') {
        var discounts = document.getElementsByClassName('product-discount');
        for(var j = 0; j < discounts.length; j++) {
          discounts[j].innerHTML = percent;
        }
      } else {
        alert('Попробуйте ввести в поле "sale".')
      }
      calculateAll();
  });
  
}