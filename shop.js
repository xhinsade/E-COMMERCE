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

// Function to view the cart page
function viewCart() {
    // Redirect to the cart page
    window.location.href = "cart.html";
}

// Function to add items to the cart (you can implement the cart logic here)
function addToCart(productName, productPrice) {
    // Here you can save the cart data to localStorage or a cart object
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1 // Assuming the initial quantity is 1
    };

    // Check if product is already in the cart and update quantity
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count on the shop page
    updateCartCount();
}

// Function to update the cart item count on the page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("cart-item-count").innerText = cartCount;
}

// Update cart count when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);
<!-- Shop Page (shop.html) -->
// Function to add items to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1 // Assuming the initial quantity is 1
    };

    // Check if product is already in the cart and update quantity
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count on the shop page
    updateCartCount();
}

// Function to update the cart item count on the page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}

document.addEventListener("DOMContentLoaded", updateCartCount);


