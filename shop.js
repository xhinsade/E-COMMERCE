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

// Example JavaScript to filter products by price
document.getElementById("price").addEventListener("input", function() {
    let priceValue = this.value;
    let priceText = "$" + priceValue + " - $300";
    document.querySelector(".filter-price span").textContent = priceText;

    // Here you would implement logic to filter products based on the selected price
    // Example: Show products within the selected price range
});

// JavaScript to handle Profile Dropdown Toggle
document.querySelector('.profile-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents default link behavior
    const dropdown = this.nextElementSibling; // The .dropdown-content
    dropdown.classList.toggle('show'); // Toggles the visibility by adding/removing the 'show' class
});


// Function to navigate to the Orders page
function goToOrders() {
    // Add any additional logic here if needed (e.g., fetching order data)
    window.location.href = "orders.html"; // Navigates to the Orders Page
}

// Function to handle user logout without clearing data
function handleLogout() {
    // Ask for user confirmation before logging out
    const confirmation = confirm("Are you sure you want to log out?");
    
    if (confirmation) {
        // Alert the user that they have logged out, but their data is still available
        alert("You have been logged out. Your data is still available for next login.");
        
        // Redirect the user to the login page after confirmation
        window.location.href = "index.html"; // Redirects to the Login Page
    } else {
        // If the user cancels, show an alert confirming the action was canceled
        alert("Logout canceled. You are still logged in.");
    }
}

fetch('products.json')
    .then(response => response.json()) // Parse JSON response
    .then(products => {
        // Get the product grid container
        const productGrid = document.getElementById('product-grid');

        // Clear any existing content in the product grid
        productGrid.innerHTML = "";

        // Loop through the products and create HTML for each
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="btn-primary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            `;

            // Append the card to the product grid
            productGrid.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error("Error fetching product data:", error);
    });
