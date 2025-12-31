// =====================
// Données produits (exemple, à remplacer par MongoDB)
// =====================
const products = [
  { id: 1, name: "iPhone 15 Pro", category: "phone", price: 1299, rating: 4.8, image: "images/iphone15.jpg" },
  { id: 2, name: "MacBook Air M2", category: "computer", price: 1499, rating: 4.7, image: "images/macbookair.jpg" },
  { id: 3, name: "AirPods Pro 2", category: "audio", price: 279, rating: 4.5, image: "images/airpods.jpg" },
  { id: 4, name: "PS5", category: "gaming", price: 499, rating: 4.9, image: "images/ps5.jpg" },
  { id: 5, name: "Samsung Galaxy S23", category: "phone", price: 999, rating: 4.6, image: "images/galaxy.jpg" },
  { id: 6, name: "Casque Bose QC45", category: "audio", price: 349, rating: 4.7, image: "images/boseqc45.jpg" }
];

let cart = [];

// =====================
// Fonctions principales
// =====================

// Afficher les produits
function displayProducts(productsList) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  productsList.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>💶 ${product.price}€</p>
      <p>⭐ ${product.rating}</p>
      <button onclick="addToCart(${product.id})">Ajouter au panier</button>
    `;
    grid.appendChild(productCard);
  });
}

// Ajouter au panier
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Supprimer du panier
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Mettre à jour l'affichage du panier
function updateCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartBadge = document.getElementById("cartBadge");
  const cartSummary = document.getElementById("cartSummary");
  const subtotalElem = document.getElementById("cartSubtotal");
  const totalElem = document.getElementById("cartTotal");

  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">🛒 Votre panier est vide</div>';
    cartSummary.style.display = "none";
    cartBadge.textContent = 0;
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>💶 ${item.price * item.quantity}€</span>
      <button onclick="removeFromCart(${item.id})">✕</button>
    `;
    cartItemsContainer.appendChild(li);
  });

  subtotalElem.textContent = subtotal.toFixed(2) + "€";
  totalElem.textContent = subtotal.toFixed(2) + "€"; // livraison gratuite
  cartSummary.style.display = "block";
  cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Filtrer les produits
function filterProducts(category) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (category === "all") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
  document.querySelector(`.filter-btn[onclick="filterProducts('${category}')"]`)?.classList.add("active");
}

// Trier les produits
function sortProducts(sortBy) {
  let sorted = [...products];
  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sorted = products;
  }
  displayProducts(sorted);
}

// Afficher / cacher le panier
function toggleCart() {
  const cartEl = document.getElementById("floatingCart");
  cartEl.style.display = cartEl.style.display === "block" ? "none" : "block";
}

// Recherche produit
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(input));
  displayProducts(filtered);
}

// Checkout (placeholder)
function checkout() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }
  alert("Redirection vers le paiement...");
  // Ici, tu pourras intégrer PayPal ou Stripe
}

// =====================
// Initialisation
// =====================
displayProducts(products);
