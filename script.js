/* ============================================================
   LUMINA — Color switcher (same logic as the original version)
   Mist (ivory) is the ORIGINAL — selected by default.
   Each variant swaps the real speaker image + color tint layers.
   ============================================================ */

const VARIANTS = [
  {
    id: "moss",
    name: "Moss",
    swatch: "#3c6b4a",
    tint: null,
    deep: null,
    wash: null,
    img: "speaker-moss.png",
    wordmark: false,
    price: "€129 · in stock",
    desc: "Deep emerald green fabric. A grounded, forest tone for calm evenings and garden tables.",
  },
  {
    id: "lilac",
    name: "Lilac",
    swatch: "#8a6ba8",
    tint: null,
    deep: null,
    wash: null,
    img: "speaker-lilac.png",
    wordmark: false,
    price: "€129 · in stock",
    desc: "Soft pastel violet fabric. Warm, gentle, and a little unexpected.",
  },
  {
    id: "mist",
    name: "Mist",
    swatch: "#d8cfc0",
    tint: null,
    deep: null,
    wash: null,
    img: "speaker.png",
    wordmark: false,
    price: "€129 · in stock",
    desc: "The original. A pale ivory woven fabric that picks up the light of the room it sits in.",
    original: true,
  },
  {
    id: "ember",
    name: "Ember",
    swatch: "#b23a2e",
    tint: null,
    deep: null,
    wash: null,
    img: "speaker-ember.png",
    wordmark: false,
    price: "€129 · in stock",
    desc: "Deep crimson red fabric. Bold, warm, and made for candle-lit nights.",
  },
];

/* ---------- Color switcher elements ---------- */
const switcherLamp = document.getElementById("switcher-lamp");
const switcherTint = document.getElementById("switcher-tint");
const switcherTintDeep = document.getElementById("switcher-tint-deep");
const switcherTintWash = document.getElementById("switcher-tint-wash");
const switcherName = document.getElementById("switcher-name");
const switcherPrice = document.getElementById("switcher-price");
const switcherDesc = document.getElementById("switcher-desc");
const swatchesWrap = document.querySelector(".swatches");

let activeId = "mist";

function setVariant(v) {
  activeId = v.id;

  // Base hue layer (color blend) — adds clean color to highlights.
  if (switcherTint) {
    switcherTint.style.setProperty("--tint", v.tint || "transparent");
    switcherTint.style.setProperty("--tint-opacity", v.tint ? (v.tintOpacity || "0.35") : "0");
  }
  // Multiply layer darkens the fabric to match the swatch color.
  if (switcherTintDeep) {
    switcherTintDeep.style.setProperty("--tint", v.deep || "transparent");
    switcherTintDeep.style.setProperty("--tint-opacity", v.deep ? (v.deepOpacity || "0.85") : "0");
  }
  // Wash layer flattens warm glow so saturated colors read clean.
  if (switcherTintWash) {
    switcherTintWash.style.setProperty("--tint", v.wash || "transparent");
    switcherTintWash.style.setProperty("--tint-opacity", v.wash ? (v.washOpacity || "0.4") : "0");
  }

  if (switcherLamp) {
    // Each variant has its own pre-rendered image (clean color).
    if (v.img) {
      switcherLamp.src = v.img;
      if (switcherTint) switcherTint.style.setProperty("--tint-opacity", "0");
      if (switcherTintDeep) switcherTintDeep.style.setProperty("--tint-opacity", "0");
      if (switcherTintWash) switcherTintWash.style.setProperty("--tint-opacity", "0");
    } else {
      switcherLamp.src = "speaker.png";
    }
    // Show glowing wordmark only where the etched logo is darkened.
    switcherLamp.parentElement.classList.toggle("show-wordmark", !!v.wordmark);
    switcherLamp.setAttribute("alt", "LUMINA speaker in " + v.name);
    // Smooth transition when the image changes.
    switcherLamp.animate(
      [{ opacity: 0, transform: "translateY(8px) scale(0.98)" }, { opacity: 1, transform: "none" }],
      { duration: 360, easing: "cubic-bezier(0.16,1,0.3,1)" }
    );
  }

  if (switcherName) switcherName.textContent = v.name + (v.original ? "  ·  Original" : "");
  if (switcherPrice) switcherPrice.textContent = v.price;
  if (switcherDesc) switcherDesc.textContent = v.desc;

  document.querySelectorAll(".swatch").forEach(function (s) {
    const selected = s.dataset.id === v.id;
    s.setAttribute("aria-checked", selected ? "true" : "false");
    s.classList.toggle("is-active", selected);
  });
}

if (swatchesWrap) {
  swatchesWrap.innerHTML = VARIANTS.map(function (v) {
    const label = v.original ? v.name + " — original" : v.name;
    return '<button class="swatch" type="button" role="radio" aria-checked="false" data-id="' + v.id + '" aria-label="' + label + '" title="' + label + '" style="--sw:' + v.swatch + ';"></button>';
  }).join("");
  swatchesWrap.querySelectorAll(".swatch").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const v = VARIANTS.find(function (x) { return x.id === btn.dataset.id; });
      if (v) setVariant(v);
    });
  });
  setVariant(VARIANTS.find(function (v) { return v.id === "mist"; }));
}
