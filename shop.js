let allProducts = []; // Array to store all products globally

// Fetch products from products.json file
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        allProducts = products; // Store products data globally
        displayProducts(allProducts); // Display all products initially
    })
    .catch(error => console.error("Error fetching product data:", error));

// Display products in the grid
function displayProducts(products) {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = ""; // Clear previous items

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-card");
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Filter products based on selected filters
function filterProducts() {
    const category = document.getElementById("category").value.toLowerCase();
    const priceRange = document.getElementById("price").value.split("-");
    const size = parseInt(document.getElementById("size").value);

    const filteredProducts = allProducts.filter(product => {
        const inCategory = category === "all" || product.category.toLowerCase().includes(category);
        const inPriceRange = priceRange.length === 2
            ? product.price >= parseInt(priceRange[0]) && product.price <= parseInt(priceRange[1])
            : true;
        const inSize = isNaN(size) || product.size_options.includes(size);

        return inCategory && inPriceRange && inSize;
    });

    displayProducts(filteredProducts);
}

// Event listeners for filters
document.getElementById("category").addEventListener("change", filterProducts);
document.getElementById("price").addEventListener("change", filterProducts);
document.getElementById("size").addEventListener("change", filterProducts);

// Shopping Cart functionality
let cart = []; // Array to store cart items

function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalQuantity;
}

document.addEventListener("DOMContentLoaded", updateCartCount); // Update cart count on page load

// Function to view cart items in a modal or redirect to cart page
function viewCart() {
    window.location.href = "cart.html";
}

// Profile dropdown toggle
document.querySelector('.profile-link').addEventListener('click', function(event) {
    event.preventDefault();
    const dropdown = this.nextElementSibling;
    dropdown.classList.toggle('show');
});

// Logout function
function handleLogout() {
    const confirmation = confirm("Are you sure you want to log out?");
    
    if (confirmation) {
        alert("You have been logged out. Your data is still available for next login.");
        window.location.href = "index.html";
    } else {
        alert("Logout canceled. You are still logged in.");
    }
}

// Example cart modal functions for viewing items and clearing the cart
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }
}

function clearCart() {
    localStorage.removeItem("cart"); // Clear cart data from localStorage
    updateCartCount();
    updateCartItems();
}

function proceedToCheckout() {
    alert("Proceeding to checkout...");
}
