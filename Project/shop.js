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
    const nav = document.getElementById("main-nav") || document.querySelector("nav");
    if (!nav) return;

    const user = localStorage.getItem("freshmartUser");
    const count = getCart().reduce((total, item) => total + item.quantity, 0);

    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="products.html">Products</a>
        <a class="nav-cart" href="cart.html">Cart <span>${count}</span></a>
        ${user
            ? `<a href="#" onclick="logout(); return false;">Logout</a>`
            : `<a class="nav-login" href="login.html">Login</a>`
        }
    `;
}

function addToCart(productId, button) {
    if (!isLoggedIn()) {
        alert("Please login before adding products to your cart.");
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

    if (existingItem) existingItem.quantity += 1;
    else cart.push({ id: product.id, quantity: 1 });

    saveCart(cart);
    updateNavigation();

    if (button && button.classList.contains("button")) {
        const oldText = button.textContent;
        button.textContent = "Added ✓";
        setTimeout(() => button.textContent = oldText, 900);
    }
}

function logout() {
    localStorage.removeItem("freshmartUser");
    window.location.href = "index.html";
}

function getProductById(productId) {
    return products.find(item => item.id === productId);
}

document.addEventListener("DOMContentLoaded", updateNavigation);
