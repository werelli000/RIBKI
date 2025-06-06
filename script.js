const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});

let cart = [];
const cartModal = document.getElementById("cart-modal");
const cartCount = document.getElementById("cart-count");
const cartItemsGrid = document.getElementById("cart-items-grid");

window.onload = loadCart;

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartCount();
  saveCart();
}

function toggleCart() {
  cartModal.classList.toggle("open");
  renderCartItems();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCartItems() {
  cartItemsGrid.innerHTML = "";

  if (cart.length === 0) {
    cartItemsGrid.innerHTML = "<p>Корзина пуста</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const card = document.createElement("div");
    card.classList.add("cart-item-card");
    
    const originalCard = [...cards].find(card =>
      card.querySelector(".card-title").textContent === item.name
    );
    const imgSrc = originalCard ? originalCard.querySelector("img").src : "";

    card.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center;">
        <img src="${imgSrc}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;" />
        <div style="flex-grow: 1;">
          <strong>${item.name}</strong><br>
          Цена: €${item.price.toFixed(2)} × ${item.quantity} = <strong>€${subtotal.toFixed(2)}</strong>
        </div>
        <div>
          <button onclick="decreaseQuantity(${index})">-</button>
          <button onclick="increaseQuantity(${index})">+</button>
          <button onclick="removeFromCart(${index})">❌</button>
        </div>
      </div>
    `;

    cartItemsGrid.appendChild(card);
  });

  const totalElem = document.createElement("div");
  totalElem.classList.add("cart-total");
  totalElem.innerHTML = `<strong>Итого: €${total.toFixed(2)}</strong>`;
  cartItemsGrid.appendChild(totalElem);
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCartCount();
  saveCart();
  renderCartItems();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCartCount();
  saveCart();
  renderCartItems();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  saveCart();
  renderCartItems();
}

function checkout() {
  if (cart.length === 0) {
    alert("Корзина пуста.");
    return;
  }


  toggleCart();
  
  const deliverySection = document.querySelector('#delivery');
  if (deliverySection) {
    deliverySection.scrollIntoView({ behavior: 'smooth' });
  }
  

}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
    updateCartCount();
  }
}