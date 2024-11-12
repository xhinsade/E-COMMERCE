// Function to load and render cart items from localStorage
function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear existing items
    
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}</div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" id="quantity-${item.id}" onchange="updateQuantity(${item.id}, this)">
                <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });
    updateTotalPrice();
}

// Function to increase quantity
function increaseQuantity(itemId) {
    updateItemQuantity(itemId, 1);
}

// Function to decrease quantity
function decreaseQuantity(itemId) {
    updateItemQuantity(itemId, -1);
}

// Function to update quantity in localStorage
function updateItemQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1; // Ensure the quantity is at least 1
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

// Function to handle manual quantity update
function updateQuantity(itemId, inputElement) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = parseInt(inputElement.value);
        if (isNaN(item.quantity) || item.quantity < 1) {
            item.quantity = 1; // Default to 1 if invalid input
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

// Function to update total price
function updateTotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Proceed to checkout function (placeholder)
function proceedToCheckout() {
    alert('Proceeding to checkout');
}

// Initialize the cart page
renderCartItems();
