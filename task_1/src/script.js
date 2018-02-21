window.onload = function() {

    var shop = document.getElementsByClassName('drop-down-address');

    for (var i = 0; i < shop.length; i++) {
        shop[i].addEventListener('click', showAddress(shop[i]), false);
    }

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