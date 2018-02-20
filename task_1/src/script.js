window.onload = function() {

    var shop1 = document.getElementById('shop1');
    var shop2 = document.getElementById('shop2');
    var shop3 = document.getElementById('shop3');

   

    function show(element) {
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

    shop1.addEventListener('click', show(shop1), false);
    shop2.addEventListener('click', show(shop2), false);
    shop3.addEventListener('click', show(shop3), false);
}