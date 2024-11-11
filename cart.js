// Sample cart data (you can dynamically fetch this from a database or local storage)
let cartItems = [
    {
        name: "Air Max 270",
        price: 120,
        quantity: 1,
        image: "images/nike-air-max.jpg"
    },
    {
        name: "React Infinity",
        price: 150,
        quantity: 2,
        image: "images/nike-react.jpg"
    }
];

// Function to display items in the cart
function displayCartItems() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear current cart items

    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>$${item.price}</p>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" class="quantity-input">
                    <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
                    <p>Total: $${itemTotal}</p>
                </div>
            </div>
        `;

        cartContainer.innerHTML += cartItemHTML;
    });

    document.getElementById("total-price").innerText = total;
}

// Update quantity of a specific item
function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        newQuantity = 1; // Ensure the quantity doesn't go below 1
    }

    cartItems[index].quantity = newQuantity;
    displayCartItems(); // Re-render the cart with updated quantities
}

// Remove an item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove the item at the specified index
    displayCartItems(); // Re-render the cart after removal
}

// Proceed to checkout
function proceedToCheckout() {
    // Your checkout logic here (e.g., redirect to checkout page or show modal)
    alert("Proceeding to checkout...");
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", displayCartItems);
