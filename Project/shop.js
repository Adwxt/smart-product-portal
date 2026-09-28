function getCart() {
    return JSON.parse(localStorage.getItem("freshmartCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("freshmartCart", JSON.stringify(cart));
}

function isLoggedIn() {
    return localStorage.getItem("freshmartUser") !== null;
}

function updateNavigation() {
    const nav = document.querySelector("nav");

    if (!nav) return;

    const user = localStorage.getItem("freshmartUser");

    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="products.html">Products</a>
        <a href="cart.html">Cart (${getCart().reduce((total, item) => total + item.quantity, 0)})</a>
        ${
            user
                ? `<a href="#" onclick="logout(); return false;">Logout (${user})</a>`
                : `<a href="login.html">Login</a>`
        }
    `;
}

function addToCart(productId) {
    if (!isLoggedIn()) {
        alert("Please login with the demo account before adding products to your cart.");
        window.location.href = "login.html";
        return;
    }

    const product = products.find(item => item.id === productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart(cart);
    updateNavigation();

    alert(product.name + " added to cart.");
}

function logout() {
    localStorage.removeItem("freshmartUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
}

function getProductById(productId) {
    return products.find(item => item.id === productId);
}

document.addEventListener("DOMContentLoaded", updateNavigation);
