// --- Stars: lightweight canvas field --- 
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

const stars = Array.from({ length: 140 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.6 + 0.2,
  a: Math.random() * 0.7 + 0.2,
  s: Math.random() * 0.25 + 0.05
}));

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const st of stars) {
    st.y += st.s;
    if (st.y > window.innerHeight + 10) {
      st.y = -10;
      st.x = Math.random() * window.innerWidth;
    }
    ctx.globalAlpha = st.a;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fillStyle = "#F6F7FF";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();

// --- Launch console logic (scroll-driven) ---
const tminusEl = document.getElementById("tminus");
const statusText = document.getElementById("statusText");
const meterBar = document.getElementById("meterBar");
const steps = Array.from(document.querySelectorAll("#sequence li"));

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function formatTime(seconds){
  const s = Math.max(0, Math.floor(seconds));
  const mm = String(Math.floor(s / 60)).padStart(2,"0");
  const ss = String(s % 60).padStart(2,"0");
  return `${mm}:${ss}`;
}

// total scroll range "fuel"
const LAUNCH_SECONDS = 30;

function onScroll(){
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const p = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  const progress = clamp(p, 0, 1);

  // Countdown decreases as you scroll down
  const remaining = LAUNCH_SECONDS * (1 - progress);
  tminusEl.textContent = formatTime(remaining);

  meterBar.style.width = `${Math.round(progress * 100)}%`;

  // Active step
  const idx = Math.floor(progress * steps.length);
  steps.forEach((li, i) => li.classList.toggle("active", i === clamp(idx, 0, steps.length - 1)));

  const labels = [
    "Initiating mission…",
    "Calibrating brand + layout…",
    "Designing system + components…",
    "Building responsive + motion…",
    "Preparing launch + QA…",
    "Monitoring + optimizing…"
  ];
  statusText.textContent = labels[clamp(idx, 0, labels.length - 1)];
}

window.addEventListener("scroll", onScroll, { passive:true });
onScroll();
// --- Gravity lens pointer tracking ---
document.querySelectorAll(".module").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });
});
// ========================= 
// LAUNCH SCENE INTERACTION
// Paste at END of app.js
// =========================
(function () {
  const rocket = document.getElementById("rocket");
  if (!rocket) return;

  // Buttons that should trigger launch
  const launchButtons = [
    ...document.querySelectorAll('.nav__cta'),
    ...document.querySelectorAll('a[href="#contact"]'),
    ...document.querySelectorAll('a[href="#services"]') // optional
  ];

  const launch = () => {
    document.body.classList.add("launching");

    // Remove after animation so you can trigger it again
    window.setTimeout(() => {
      document.body.classList.remove("launching");
    }, 1800);
  };

  launchButtons.forEach((btn) => {
    btn.addEventListener("click", launch);
  });
})();
// Click Start Mission to trigger launch animation 
(() => {
  const rocket = document.getElementById("rocket");
  if (!rocket) return;

  const btn = document.querySelector('a[href="#contact"], .nav__cta');
  if (!btn) return;

  btn.addEventListener("click", () => {
    document.body.classList.add("launching");
    setTimeout(() => document.body.classList.remove("launching"), 1800);
  });
})();
