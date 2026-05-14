"use strict";

/* =========================================================
   PETAL BACKGROUND IMAGES
   ========================================================= */
function applyPetalImages() {
  document.querySelectorAll(".petal[data-petal-img]").forEach((p) => {
    const url = p.dataset.petalImg;
    if (url) p.style.backgroundImage = `url("${url}")`;
  });
}

document.addEventListener("DOMContentLoaded", applyPetalImages);

/* =========================================================
   SCROLL LOCK HELPERS (used by lightbox)
   ========================================================= */
let _scrollY = 0;

function lockScroll() {
  _scrollY = window.scrollY || window.pageYOffset;
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");
  document.body.style.top = `-${_scrollY}px`;
}

function unlockScroll() {
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
  const top = document.body.style.top;
  document.body.style.top = "";
  window.scrollTo(0, top ? Math.abs(parseInt(top, 10)) : _scrollY);
}

/* =========================================================
   GALLERIES DATA
   ========================================================= */
const GALLERIES = {
  premade: [
    { src: "images/gallery/PREMADE/premade1.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade2.png", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade3.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade4.png", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade5.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade6.png", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade7.png", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade8.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade9.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade10.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade11.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade12.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade13.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade14.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade15.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade16.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade17.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade18.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade19.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade20.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade21.png", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade22.png", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade23.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade24.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade25.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade26.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade27.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade28.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade29.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade30.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade31.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade32.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade33.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade34.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade35.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade36.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade37.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade38.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade39.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade40.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade41.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade42.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade43.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade44.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade45.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade46.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade47.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade48.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade49.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade50.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade51.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade52.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade53.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade54.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade55.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade56.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade57.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade58.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade59.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade60.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade61.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade62.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade63.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade64.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade65.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade66.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade67.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade68.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade69.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade70.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade71.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade72.jpg", caption: "Premade arrangement" },
    { src: "images/gallery/PREMADE/premade73.jpg", caption: "Premade arrangement" }
  ],

  custom: [
    { src: "images/gallery/CUSTOM/custom1.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom2.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom3.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom4.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom5.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom6.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom7.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom8.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom9.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom10.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom11.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom12.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom13.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom14.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom15.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom16.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom17.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom18.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom19.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom20.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom21.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom22.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom23.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom24.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom25.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom26.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom27.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom28.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom29.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom30.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom31.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom32.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom33.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom34.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom35.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom36.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom37.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom38.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom39.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom40.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom41.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom42.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom43.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom44.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom45.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom46.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom47.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom48.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom49.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom50.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom51.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom52.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom53.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom54.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom55.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom56.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom57.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom58.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom59.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom60.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom61.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom62.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom63.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom64.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom65.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom66.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom67.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom68.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom69.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom70.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom71.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom72.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom73.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom74.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom75.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom76.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom77.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom78.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom79.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom80.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom81.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom82.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom83.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom84.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom85.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom86.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom87.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom88.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom89.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom90.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom91.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom92.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom93.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom94.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom95.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom96.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom97.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom98.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom99.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom100.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom101.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom102.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom103.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom104.jpg", caption: "Custom design" },
    { src: "images/gallery/CUSTOM/custom105.jpg", caption: "Custom design" }
  ],

  seasonal: [
    { src: "images/gallery/SEASONAL/seasonal1.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal2.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal4.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal5.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal6.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal7.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal8.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal9.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal10.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal11.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal12.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal13.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal14.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal15.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal16.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal17.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal18.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal19.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal20.png", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal21.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal22.jpeg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal23.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal24.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal25.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal26.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal27.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal28.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal29.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal30.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal31.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal32.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal33.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal34.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal35.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal36.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal37.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal38.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal39.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal40.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal41.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal42.jpg", caption: "Seasonal florals" },
    { src: "images/gallery/SEASONAL/seasonal43.jpg", caption: "Seasonal florals" }
  ],

  celebrations: [
    { src: "images/gallery/CELEBRATIONS/celebrations1.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations2.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations3.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations4.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations5.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations6.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations7.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations8.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations9.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations10.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations11.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations12.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations13.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations14.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations15.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations16.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations17.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations18.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations19.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations20.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations21.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations22.jpg", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations23.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations24.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations25.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations26.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations27.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations28.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations29.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations30.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations31.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations32.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations33.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations34.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations35.png", caption: "Celebrations" },
    { src: "images/gallery/CELEBRATIONS/celebrations36.png", caption: "Celebrations" }
  ],

  balloons: [
    { src: "images/gallery/BALLOONS/balloons1.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons2.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons3.png", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons4.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons5.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons6.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons7.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons8.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons9.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons10.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons11.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons12.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons13.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons14.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons15.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons16.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons17.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons18.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons19.jpg", caption: "Balloon add-ons" },
    { src: "images/gallery/BALLOONS/balloons20.jpg", caption: "Balloon add-ons" }
  ],

  funerals: [
    { src: "images/gallery/CASKET SPRAYS/casket-sprays1.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays2.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays3.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays4.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays5.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays6.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays7.jpeg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays8.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays9.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays10.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays11.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays12.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays13.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays14.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays15.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays16.png", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays17.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays18.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays19.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays20.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays21.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays22.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays23.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays24.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays25.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays26.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays27.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays28.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays29.jpg", caption: "Funeral Arrangements" },
    { src: "images/gallery/CASKET SPRAYS/casket-sprays30.jpeg", caption: "Funeral Arrangements" }
  ]
};

/* =========================================================
   LIGHTBOX LOGIC
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCount = document.getElementById("lightboxCount");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let activeCategory = null;
let activeIndex = 0;

function prettyTitle(key) {
  return key
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function openLightbox(categoryKey, startIndex = 0) {
  const list = GALLERIES[categoryKey] || [];
  if (!list.length || !lightbox) return;

  activeCategory = categoryKey;
  activeIndex = startIndex;

  lightboxTitle.textContent = prettyTitle(categoryKey);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  lockScroll();
  renderSlide();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  unlockScroll();
  activeCategory = null;
  activeIndex = 0;
}

function renderSlide() {
  if (!activeCategory) return;
  const list = GALLERIES[activeCategory] || [];
  const item = list[activeIndex];
  if (!item || !lightboxImg || !lightboxCaption || !lightboxCount) return;

  lightboxImg.src = item.src;
  lightboxImg.alt = item.caption || prettyTitle(activeCategory);
  lightboxCaption.textContent = item.caption || "";
  lightboxCount.textContent = `${activeIndex + 1} / ${list.length}`;

  const disableArrows = list.length <= 1;
  if (prevBtn) prevBtn.disabled = disableArrows;
  if (nextBtn) nextBtn.disabled = disableArrows;
}

function prevSlide() {
  if (!activeCategory) return;
  const list = GALLERIES[activeCategory] || [];
  if (!list.length) return;
  activeIndex = (activeIndex - 1 + list.length) % list.length;
  renderSlide();
}

function nextSlide() {
  if (!activeCategory) return;
  const list = GALLERIES[activeCategory] || [];
  if (!list.length) return;
  activeIndex = (activeIndex + 1) % list.length;
  renderSlide();
}

document.querySelectorAll(".petal").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.category;
    if (!cat) return;
    openLightbox(cat, 0);
  });
});

if (prevBtn) prevBtn.addEventListener("click", prevSlide);
if (nextBtn) nextBtn.addEventListener("click", nextSlide);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    const target = e.target;
    const shouldClose = target && target.dataset && target.dataset.close === "true";
    if (shouldClose) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});
