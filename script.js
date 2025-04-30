const products = [
  { id: 1, name: 'Rainbow Guppy', price: 4.99, image: 'https://cdn.pixabay.com/photo/2021/10/27/12/46/fish-6747115_1280.jpg' },
  { id: 2, name: 'Betta Fish', price: 6.99, image: 'https://cdn.pixabay.com/photo/2020/03/04/07/53/fish-4899707_1280.jpg' },
  { id: 3, name: 'Neon Tetra', price: 2.99, image: 'https://cdn.pixabay.com/photo/2022/04/03/18/34/fish-7108916_1280.jpg' },
  { id: 4, name: 'Goldfish', price: 3.99, image: 'https://cdn.pixabay.com/photo/2015/03/30/12/35/goldfish-698888_1280.jpg' },
  { id: 5, name: 'Clownfish', price: 5.99, image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/clown-fish-1235220_1280.jpg' },
  { id: 6, name: 'Discus', price: 12.99, image: 'https://cdn.pixabay.com/photo/2019/04/04/15/13/fish-4100503_1280.jpg' },
  { id: 7, name: 'Swordtail', price: 3.49, image: 'https://cdn.pixabay.com/photo/2019/06/15/15/55/fish-4275852_1280.jpg' },
  { id: 8, name: 'Zebra Danio', price: 2.49, image: 'https://cdn.pixabay.com/photo/2022/01/11/01/43/fish-6928955_1280.jpg' }
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById('product-grid');
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Basket</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  const isOpen = modal.style.display === 'flex';
  modal.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen) {
    renderCart();
  }
}


function renderCart() {
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">x</button>`;
    list.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function clearCart() {
  cart = [];
  updateCartCount();
  renderCart();
}

function handleFeedback(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  if (name && message) {
    document.getElementById('feedback-status').innerText = `Thank you, ${name}! Your message was sent.`;
    event.target.reset();
  } else {
    document.getElementById('feedback-status').innerText = "Please fill out all fields.";
  }
}

window.onload = renderProducts;
function toggleCheckout() {
  const modal = document.getElementById('checkout-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total-amount').innerText = `$${total.toFixed(2)}`;
}

function confirmPayment() {
  alert("Thank you! Your payment was successful.");
  clearCart();
  toggleCheckout();
}
if (cart.length > 0) {
  const checkoutBtn = document.createElement('button');
  checkoutBtn.innerText = 'Checkout';
  checkoutBtn.onclick = toggleCheckout;
  document.getElementById('cart-items').appendChild(checkoutBtn);
}