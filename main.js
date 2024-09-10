let cart = [];

// Hardcoded product data (this is for product listing page)
const products = [
    
        {
          "id": 1,
          "title": "Quần jean ống rộng nữ phong cách",
          "price": 800000,
          "quantity": 1
        }
      ]
      
 
// Function to load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);  // Parse the cart data from localStorage
        updateCartIcon();  // Update the cart icon with number of items
    } else {
        cart = [];  // Initialize empty cart if there's no saved data
    }
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to localStorage
}

// Function to update cart icon with the number of items
function updateCartIcon() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {  // Check if the cart icon exists on the page
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Function to populate product list on product page
function populateProducts(products) {
    const productContainer = document.querySelector('.cartegory-right-content');

    products.forEach(product => {
        const productHTML = `
            <div class="cartegory-right-content-item">
                <img src="${product.img}" alt="${product.title}">
                <h1>${product.title}</h1>
                <p>${product.price.toLocaleString()}<sup>đ</sup>
                <button class="add-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">
                    <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                </button></p>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });

    // Attach event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const title = button.dataset.title;
            const price = parseInt(button.dataset.price);
            addToCart(productId, title, price);
        });
    });
}

// Function to add products to the cart
function addToCart(productId, title, price) {
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;  // Increase quantity if product is already in the cart
    } else {
        cart.push({ id: productId, title, price, quantity: 1 });  // Add new product to cart
    }

    updateCartIcon();  // Update the cart icon
    saveCart();  // Save the updated cart to localStorage
}

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
    loadCart();  // Load cart from localStorage when the page loads
    populateProducts(products);  // Populate products on the product page
});
localStorage.clear();
