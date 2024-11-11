let cart = [];  // Array to store cart items

// Function to add items to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartCount();
    updateCartItems();
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

// Function to open the cart modal and show cart items
function viewCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    updateCartItems();  // Ensure the cart items are up to date
}

// Function to update the cart items displayed in the modal
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

// Function to close the cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Function to clear the cart
function clearCart() {
    cart = [];  // Clear the cart array
    updateCartCount();  // Update the cart count in the navbar and modal
    updateCartItems();  // Update the cart items display in the modal
}

// Function to proceed to checkout (for now just a placeholder)
function proceedToCheckout() {
    alert("Proceeding to checkout...");
}

// Function to add items to the cart and store them in localStorage
function addToCart(itemName, itemPrice) {
    // Create an object to hold the item data
    const item = { name: itemName, price: itemPrice };

    // Retrieve the current cart from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push(item);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count on the page
    updateCartCount();
}

// Function to update the cart item count in the UI
function updateCartCount() {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update the cart count on the page
    document.getElementById('cart-item-count').textContent = cart.length;
    document.getElementById('cart-count').textContent = cart.length;
}
