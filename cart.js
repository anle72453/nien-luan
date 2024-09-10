let cart = [];

// Function to load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);  // Parse the cart data from localStorage
        displayCartItems();  // Display cart items when page loads
    }
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to localStorage
}

// Function to display cart items on cart.html page
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const totalQuantity = document.getElementById('total-quantity');
    const totalPrice = document.getElementById('total-price');

    // Clear the cart items list before populating
    cartItems.innerHTML = '';
    let total = 0;

    // If no items in the cart, display a message
    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Giỏ hàng của bạn đang trống</li>';
        totalQuantity.textContent = 0;
        totalPrice.textContent = '0';
        return;
    }

    cart.forEach(product => {
        total += product.price * product.quantity;

        const item = document.createElement('li');
        item.innerHTML = `${product.title} - ${product.quantity} x ${product.price.toLocaleString()} đ
        <button onclick="removeFromCart(${product.id})">Xóa</button>`;
        cartItems.appendChild(item);
    });

    totalQuantity.textContent = cart.reduce((total, product) => total + product.quantity, 0);
    totalPrice.textContent = total.toLocaleString();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    displayCartItems();  // Update cart display
    saveCart();  // Save updated cart to localStorage
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    loadCart();  // Load cart from localStorage when the page loads
});
