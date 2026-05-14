"use strict";

/* =========================================================
   CART STORAGE HELPERS (CART PAGE)
   ========================================================= */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}



/* =========================================================
   RENDER CART ITEMS
   ========================================================= */
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  if (container) {
    container.innerHTML = "";
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    if (container) container.appendChild(div);
  });

  if (totalDisplay) {
    totalDisplay.textContent = `Total: $${total}`;
  }

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      updateStickyCart();
    });
  });
}

renderCart();

/* =========================================================
   CHECKOUT FORM
   ========================================================= */
const form = document.getElementById("checkout-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const orderDetails = {
      name: form[0].value,
      recipient: form[1].value,
      address: form[2].value,
      date: form[3].value,
      message: form[4].value,
      cart: getCart()
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderDetails));

    // 🔴 PASTE YOUR STRIPE PAYMENT LINK BELOW
    window.location.href = "https://buy.stripe.com/YOUR_LINK_HERE";
  });
}
