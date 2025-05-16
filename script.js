
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});


function addToCart(item, price) {
  alert(`Added ${item} (€${price}) to cart.`);

}

function toggleCart() {
  const cart = document.getElementById("cartModal");
  cart.style.display = cart.style.display === "block" ? "none" : "block";
}

function checkout() {
  alert("Proceeding to checkout...");
}
    


let cart = [];
let cartModal = document.getElementById("cart-modal");
let cartCount = document.getElementById("cart-count");
let cartItemsGrid = document.getElementById("cart-items-grid");


function toggleCart() {
  cartModal.classList.toggle("open");
  renderCartItems();
}


function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
}


function updateCartCount() {
  cartCount.textContent = cart.length;
}


function renderCartItems() {
  cartItemsGrid.innerHTML = "";

  if (cart.length === 0) {
    cartItemsGrid.innerHTML = "<p>Корзина пуста </p>";
    return;
  }

  cart.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("cart-item-card");
    card.innerHTML = `
      <img src="images/fish1.jpg" alt="${item.name}">
      <h4>${item.name}</h4>
      <div class="price">€${item.price.toFixed(2)}</div>
    `;
    cartItemsGrid.appendChild(card);
  });
}


function checkout() {
  alert("Спасибо за заказ! ");
  cart = [];
  updateCartCount();
  toggleCart();
}
