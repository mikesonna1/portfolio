let products = [];
let cart = [];

async function loadProducts() {
    const res = await fetch('http://localhost:5000/api/products');
    products = await res.json();
    displayProducts(products);
}

function displayProducts(list) {
    const container = document.getElementById('products');
    container.innerHTML = '';
    list.forEach(p => {
        container.innerHTML += `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price">€${p.price.toFixed(2)}</p>
                <button class="btn-secondary" onclick="addToCart(${p.id})">Ajouter au panier</button>
            </div>
        </div>`;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(p => p.id === id);
    if(exist) exist.quantity++;
    else cart.push({...product, quantity:1});
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

function updateCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;
    cart.forEach(p => {
        total += p.price * p.quantity;
        container.innerHTML += `
        <div class="cart-item">
            <span>${p.name} x${p.quantity} - €${(p.price*p.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${p.id})">❌</button>
        </div>`;
    });
    document.getElementById('cart-total').textContent = `Total: €${total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = cart.reduce((acc,p)=>acc+p.quantity,0);
}

function filterProducts() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(search));
    displayProducts(filtered);
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length===0) return alert('Votre panier est vide !');
    alert('Paiement simulé PayPal 🔥 Total: €' + cart.reduce((acc,p)=>acc+p.price*p.quantity,0).toFixed(2));
    cart = [];
    updateCart();
});

loadProducts();
