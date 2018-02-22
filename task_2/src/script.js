window.onload = function() {
    var product = document.getElementsByClassName("delete-elem");

    for (var i = 0; i < product.length; i++) {
        product[i].addEventListener('click', deleteProduct(product[i]), false);
    }

    function deleteProduct(elem) {
        return function() {
            var chosenProduct = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
            chosenProduct.parentNode.removeChild(chosenProduct);
        }
    }
}