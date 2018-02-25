window.onload = function() {

  var shops = document.getElementsByClassName('drop-down-address'); //pick all dropdown elements
  // iterate to add event listeners to all clickable objeckts
  for (var i = 0; i < shops.length; i++) {
    shops[i].addEventListener('click', showAddress(shops[i]), false);
  }
  //on click show selected shop address
  function showAddress(element) {
    return function() {
      var chosenElem = element.nextElementSibling;
      if (chosenElem.style.display === "flex") {
        chosenElem.style.display = "none";
        element.removeAttribute("style");
        element.lastElementChild.removeAttribute("style");
      } else {
        chosenElem.style.display = "flex";
        element.style.border = "0px";
        element.lastElementChild.setAttribute("style", "transform: rotate(180deg)");
      }
    }
  }
}