let cart = [];  // Array to store cart items

// Function to add items to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartCount();
}

// Update the cart item count and display
function updateCartCount() {
    const cartItemCount = document.getElementById('cart-item-count');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    cartItemCount.textContent = cart.length;
    cartCount.textContent = cart.length;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Function to open the cart modal
function viewCart() {
    const modal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(itemElement);
    });

    modal.style.display = 'block';
}

// Function to close the cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Function to proceed to checkout (for now just a placeholder)
function proceedToCheckout() {
    alert("Proceeding to checkout...");
}
