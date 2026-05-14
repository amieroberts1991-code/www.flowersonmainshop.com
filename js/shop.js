"use strict";

/* =========================================================
   FILTER ELEMENTS
   ========================================================= */
const priceFilter = document.getElementById("filter-price");
const colorFilter = document.getElementById("filter-color");
const sizeFilter = document.getElementById("filter-size");
const productsSection = document.getElementById("best-sellers");
const cards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("no-results");

/* =========================================================
   CART UI ELEMENTS (SHOP PAGE)
   ========================================================= */
const toast = document.getElementById("cart-toast");
const stickyCart = document.getElementById("sticky-cart");
const cartButtons = document.querySelectorAll(".add-to-cart");

/* =========================================================
   CART STORAGE HELPERS (SHOP)
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
  updateStickyCart();
}

function updateStickyCart() {
  const cart = getCart();
  if (stickyCart) {
    stickyCart.innerHTML = `<a href="cart.html">View Cart 🛒 (${cart.length})</a>`;
  }
}

/* =========================================================
   CART TOAST (SHOP)
   ========================================================= */
function showCartToast() {
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* =========================================================
   ADD TO CART (SHOP)
   ========================================================= */
if (cartButtons.length) {
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = {
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.image
      };

      const cart = getCart();
      cart.push(item);
      saveCart(cart);
      showCartToast();
    });
  });
}

updateStickyCart();

/* =========================================================
   FILTER PRODUCTS
   ========================================================= */
function filterProducts() {
  if (!cards.length) return;

  const priceValue = priceFilter ? priceFilter.value : "";
  const colorValue = colorFilter ? colorFilter.value : "";
  const sizeValue = sizeFilter ? sizeFilter.value : "";

  let visibleCount = 0;

  cards.forEach((card) => {
    const cardPrice = parseInt(card.dataset.price);
    const cardColor = card.dataset.color;
    const cardSize = card.dataset.size;

    let show = true;

    if (priceValue) {
      const minPrice = parseInt(priceValue.replace("$", "").replace("+", ""));
      if (cardPrice < minPrice) show = false;
    }

    if (colorValue && cardColor !== colorValue) show = false;
    if (sizeValue && cardSize !== sizeValue) show = false;

    if (show) {
      card.classList.remove("is-hiding");
      card.classList.add("is-showing");
      setTimeout(() => {
        card.style.display = "block";
      }, 10);
      visibleCount++;
    } else {
      card.classList.remove("is-showing");
      card.classList.add("is-hiding");
      setTimeout(() => {
        card.style.display = "none";
      }, 400);
    }
  });

  if (noResults) {
    if (visibleCount === 0) noResults.classList.add("show");
    else noResults.classList.remove("show");
  }
}

/* =========================================================
   SCROLL TO PRODUCTS
   ========================================================= */
function scrollToProducts() {
  if (!productsSection) return;
  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function handleFilterChange() {
  filterProducts();
  scrollToProducts();
}

if (priceFilter) priceFilter.addEventListener("change", handleFilterChange);
if (colorFilter) colorFilter.addEventListener("change", handleFilterChange);
if (sizeFilter) sizeFilter.addEventListener("change", handleFilterChange);
