(() => {
// ====== FILTERING ====== 

const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".spray-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;

    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "" : "none";
    });
  });
});

// ====== ACCORDION ======
const accButtons = document.querySelectorAll(".acc-btn");

accButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.parentElement.querySelector(".acc-panel");
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // close all
    accButtons.forEach((b) => {
      b.setAttribute("aria-expanded", "false");
      const p = b.parentElement.querySelector(".acc-panel");
      p.style.maxHeight = 0;
      b.querySelector(".acc-icon").textContent = "+";
    });

    // open selected
    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
      btn.querySelector(".acc-icon").textContent = "–";
    }
  });
});

// ====== MESSAGE GENERATOR (copies into text/email easily) ======
const quoteForm = document.getElementById("quoteForm");
const msgBox = document.getElementById("generatedMessage");
const copybtn = document.getElementById("copybtn");

function clean(v) {
  return (v || "").toString().trim();
}

quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(quoteForm);
  const name = clean(fd.get("name"));
  const phone = clean(fd.get("phone"));
  const size = clean(fd.get("size"));
  const colors = clean(fd.get("colors"));
  const details = clean(fd.get("details"));

  const lines = [
    "Hi! I’m reaching out about a casket spray.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Spray size: ${size}`,
    colors ? `Color notes: ${colors}` : null,
    details ? `Service details: ${details}` : null,
    "",
    "Can you let me know availability and price range? Thank you."
  ].filter(Boolean);

  msgBox.value = lines.join("\n");
  msgBox.focus();
});

copybtn?.addEventListener("click", async () => {
  if (!msgBox.value) return;
  try {
    await navigator.clipboard.writeText(msgBox.value);
    copybtn.textContent = "Copied!";
    setTimeout(() => (copybtn.textContent = "Copy Message"), 1200);
  } catch {
    // fallback: select text
    msgBox.select();
    document.execCommand("copy");
    copybtn.textContent = "Copied!";
    setTimeout(() => (copybtn.textContent = "Copy Message"), 1200);
  }
});

// ====== lightbox GALLERIES ======
// Update these paths to your real photos.
const FUNERAL_GALLERIES = {
  "classic-white": [
    { src: "images/funerals/classic-white1.jpeg", caption: "Classic White full spray"},
    { src: "images/funerals/classic-white2.png", caption: "Classic White — detail" }
  ],
  "blush-garden": [
    { src: "images/funerals/blush-garden1.png", caption: "Blush Garden — half spray" },
    { src: "images/funerals/blush-garden2.png", caption: "Blush Garden — detail" }
  ],
  "sunset-tribute": [
    { src: "images/funerals/sunset-tribute1.png", caption: "Sunset Tribute — full spray" },
    { src: "images/funerals/sunset-tribute2.png", caption: "Sunset Tribute — detail" }
  ],
  "deep-red-rose": [
    { src: "images/funerals/deep-red-rose1.png", caption: "Deep Red Rose — half spray" },
    { src: "images/funerals/deep-red-rose2.png", caption: "Deep Red Rose — detail" }
  ]
};

const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCount = document.getElementById("lightboxCount");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const prevbtn = document.getElementById("prevbtn");
const nextbtn = document.getElementById("nextbtn");

let activeKey = null;
let activeIndex = 0;

function prettyTitle(key) {
  return key.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase());
}

function openlightbox(key, startIndex = 0) {
  const list = FUNERAL_GALLERIES[key] || [];
  if (!list.length) return;

  activeKey = key;
  activeIndex = startIndex;

  lightboxTitle.textContent = prettyTitle(key);

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  renderSlide();
}

function closelightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeKey = null;
  activeIndex = 0;
}

function renderSlide() {
  const list = FUNERAL_GALLERIES[activeKey] || [];
  const item = list[activeIndex];
  if (!item) return;

  lightboxImg.src = item.src;
  lightboxImg.alt = item.caption || prettyTitle(activeKey);
  lightboxCaption.textContent = item.caption || "";
  lightboxCount.textContent = `${activeIndex + 1} / ${list.length}`;

  const disable = list.length <= 1;
  prevbtn.disabled = disable;
  nextbtn.disabled = disable;
}

function prevSlide() {
  const list = FUNERAL_GALLERIES[activeKey] || [];
  if (!list.length) return;
  activeIndex = (activeIndex - 1 + list.length) % list.length;
  renderSlide();
}

function nextSlide() {
  const list = FUNERAL_GALLERIES[activeKey] || [];
  if (!list.length) return;
  activeIndex = (activeIndex + 1) % list.length;
  renderSlide();
}

// Open from cards
document.querySelectorAll(".spray-card").forEach((card) => {
  const key = card.dataset.gallery;

  const open = () => openlightbox(key, 0);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") open();
  });
});

// lightbox controls
prevbtn?.addEventListener("click", prevSlide);
nextbtn?.addEventListener("click", nextSlide);

lightbox?.addEventListener("click", (e) => {
  const shouldClose = e.target?.dataset?.close === "true";
  if (shouldClose) closelightbox();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (e.key === "Escape") closelightbox();
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
}); 
})();
document.querySelectorAll(".etiquette").forEach((wrap) => { 
  const items = wrap.querySelectorAll("details.acc");
  items.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      items.forEach((other) => {
        if (other !== d) other.removeAttribute("open");
      });
    });
  });
});
(() => { 
  const media = document.querySelector(".funeralHero2__media");
  const canvas = document.querySelector(".funeralHero2__canvas");
  if (!media || !canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, dpr;
  const particles = [];
  const COUNT = 32; // subtle amount

  const resize = () => {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    w = media.clientWidth;
    h = media.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const rand = (min, max) => Math.random() * (max - min) + min;

  const makeParticle = () => ({
    x: rand(0, w),
    y: rand(0, h),
    r: rand(0.8, 2.4),
    vy: rand(-0.25, -0.75),
    vx: rand(-0.12, 0.12),
    a: rand(0.12, 0.42),
    tw: rand(0.002, 0.01) // twinkle speed
  });

  const init = () => {
    particles.length = 0;
    for (let i = 0; i < COUNT; i++) particles.push(makeParticle());
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    // Use your soft-gold tone (RGBA approximations)
    for (const p of particles) {
      // twinkle
      p.a += Math.sin(Date.now() * p.tw) * 0.002;

      // motion
      p.x += p.vx;
      p.y += p.vy;

      // wrap
      if (p.y < -10) { p.y = h + 10; p.x = rand(0, w); }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      // glow
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `rgba(212,165,116,${Math.max(0, Math.min(p.a, 0.5))})`);
      g.addColorStop(1, "rgba(212,165,116,0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!prefersReduced) requestAnimationFrame(draw);
  };

  // Boot
  resize();
  init();
  if (!prefersReduced) draw();

  window.addEventListener("resize", () => {
    resize();
    init();
  });
})();
