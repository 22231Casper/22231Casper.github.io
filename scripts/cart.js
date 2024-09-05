function updateCartDisplay() {
    let cartDisplay = document.getElementById("cartDisplay");
    let cart = getCart();

    if (cart.length = 0 || cart.length == undefined) {
        console.log("Nothing in cart");
        cartTotal = 0;
        updateCartTotal(cartTotal);
        updateCartNumDisplays();
        let emptyCart = document.createElement("p")
        emptyCart.innerHTML = "Nothing in cart."
        cartDisplay.appendChild(emptyCart);
        return;
    }

    var cartItems = [];
    cartTotal = 0;

    // Get the cart template
    fetch("/templates/cartItem.html")
    .then((res) => res.text())
    .then((template) => {
        // Get the products json
        fetch("/products/products.json")
        .then((res) => res.text())
        .then((jsonGuff) => {
            products = JSON.parse(jsonGuff)["products"];
            // Remove all current children from cartDisplay
            while (cartDisplay.firstChild) {
                cartDisplay.removeChild(cartDisplay.firstChild);
            }
            // For every product in the cart
            for (let i = 0; i < cart.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j]["imageName"] == cart[i]) {
                        var newCartItem = template;
                        for (let [attribute, value] of Object.entries(products[j])) {
                            var toReplace = `---${attribute}---`;
                            newCartItem = newCartItem.replaceAll(toReplace, value);
                        }
                        cartItems[i] = document.createElement("div");
                        cartItems[i].className = "cartItem";
                        cartItems[i].innerHTML = newCartItem;
                        cartDisplay.appendChild(cartItems[i]);

                        cartTotal += parseFloat(products[j]["price"]);
                    }
                }
            }
            cartTotal -= 0;
            updateCartTotal(cartTotal);
        });
    });
    updateCartNumDisplays();
}

updateCartDisplay();