document.addEventListener('DOMContentLoaded', function () {
    // Get the cart content element and the clear cart button
    const cartContent = document.getElementById('cart-content');
    const clearCartButton = document.getElementById('clear-cart');

    // Function to display cart content
    function displayCart() {
        // Get the shopping cart from local storage
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

        // Check if the cart is empty
        if (shoppingCart.length === 0) {
            // Display empty cart message
            cartContent.innerHTML = `
                <div class="empty-cart-message">
                    <img src="Pics/Cart.jpg" width="150px" height="150px" id="logo">
                    <h2>Your cart is empty!!</h2>
                    <p>Browse our products and enjoy our services</p>
                    <a href="Product Listing.html" class="btn btn-primary" id="home">Start Shopping</a>
                </div>
            `;
        } 
        else {
            // Display cart items
            let cartItemsHTML = `
                <h1>Your Shopping Cart</h1>
                <ul id="cart-items" class="list-group cart-items">
            `;

            shoppingCart.forEach(item => {
                cartItemsHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <img src="${item.image}" alt="${item.name}" width="50" height="50">
                        <span>${item.name}</span>
                        <span>${item.price}</span>
                    </li>
                `;
            });

            cartItemsHTML += '</ul>';
            cartContent.innerHTML = cartItemsHTML;
        }
    }



    // Display cart content on page load
    displayCart();

    // Add event listener to clear cart button
    clearCartButton.addEventListener('click', function () {
        // Clear the shopping cart in local storage
        localStorage.removeItem('shoppingCart');

        // Display updated cart content
        displayCart();
    });

    // Get all the buy buttons
    const buyButtons = document.querySelectorAll('.buy-button');

    // Add click event listener to each button
    buyButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the product name, price, and image
            const productName = this.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            const productPrice = this.previousElementSibling.textContent;
            const productImage = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('img').src;

            // Get the current shopping cart from local storage or create a new one
            let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

            // Create a product object
            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            // Add the product to the shopping cart
            shoppingCart.push(product);

            // Save the updated shopping cart back to local storage
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

            // Optional: Alert the user that the product has been added
            alert(`${productName} has been added to your cart!`);

            // Update cart content
            displayCart();
        });
    });
});