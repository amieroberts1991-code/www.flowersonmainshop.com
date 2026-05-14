// ---------- INIT ----------
updateStickyCart();

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');

 if (container) {
    container.innerHTML = "";
  }
  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    container.appendChild(div);
  });

  if (totalDisplay) {
    totalDisplay.textContent = `Total: $${total}`;
  }

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
    });
  });
}

renderCart();
const form = document.getElementById('checkout-form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

  const orderDetails = {
    name: form[0].value,
    recipient: form[1].value,
    address: form[2].value,
    date: form[3].value,
    message: form[4].value,
    cart: JSON.parse(localStorage.getItem('cart')) || []
  };

  localStorage.setItem('latestOrder', JSON.stringify(orderDetails));

  // 🔴 PASTE YOUR STRIPE PAYMENT LINK BELOW
  window.location.href = "https://buy.stripe.com/YOUR_LINK_HERE";
});
// --- Scroll lock helpers (safe + reversible) --- 
let _scrollY = 0;

function lockScroll() {
  _scrollY = window.scrollY || window.pageYOffset;

  // prevent background scroll
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");

  // preserve position (prevents jump on iOS/Chrome)
  document.body.style.top = `-${_scrollY}px`;
}

function unlockScroll() {
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");

  // restore position
  const top = document.body.style.top;
  document.body.style.top = "";
  window.scrollTo(0, top ? Math.abs(parseInt(top, 10)) : _scrollY);
}
}
/* =========================================================
   STICKY CART (OPTIONAL ON CART PAGE)
   ========================================================= */
function updateStickyCart() {
  const stickyCart = document.getElementById("sticky-cart");
  if (!stickyCart) return;
  const cart = getCart();
  stickyCart.innerHTML = `<a href="cart.html">View Cart 🛒 (${cart.length})</a>`;
}

updateStickyCart();
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('lazy-loaded');
  });
});
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  function applyFadeIn() {
    img.classList.add('lazy-loaded');
  }

  if (img.complete) {
    // Image already loaded (cached or instant)
    applyFadeIn();
  } else {
    // Image will load later
    img.addEventListener('load', applyFadeIn);
  }
});
