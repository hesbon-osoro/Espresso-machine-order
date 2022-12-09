"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Hesbon Osoro
   Date: 12/10/22  
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

/* Event Listeners */

window.addEventListener("load", function () {
  calcCart();
  var cart = document.forms.cart;
  cart.elements.modelQty.onchange = calcCart;

  var shippingOptions = document.querySelectorAll('input[name="shipping"]');
  for (var i = 0; i <= shippingOptions.length; i++) {
    shippingOptions[i].onclick = calcCart;
  }
});

function calcCart() {
  var cart = document.forms.cart;
  var orderCost = cart.elements.modelCost.value * cart.elements.modelQty.value;
  cart.elements.orderCost.value = formatUSCurrency(orderCost);
  var shipCost =
    document.querySelector('input[name="shipping"]:checked').value *
    cart.elements.modelQty.value;
  cart.elements.shippingCost.value = formatNumber(shipCost, 2);
  cart.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);
  var salesTax = 0.05 * (orderCost + shipCost);
  cart.elements.salesTax.value = formatNumber(salesTax, 2);
  cart.elements.cartTotal.value = formatUSCurrency(
    /**
     * FIXME: Use this on step 5
     */
    orderCost + shipCost + salesTax
    /**
     * FIXME: Use this on step 5
     */
    // roundToTwo(orderCost) + roundToTwo(shipCost) + roundToTwo(salesTax)
  );
  cart.elements.shippingType.value = document.querySelector(
    'input[name="shipping"]:checked'
  ).labels[0].textContent;
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function formatNumber(val, decimals) {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatUSCurrency(val) {
  return val.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
