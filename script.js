const VARIANTS = [
  {
    id: "moss",
    name: "Moss",
    swatch: "#3c6b4a",
    img: "speaker-moss.png",
    price: "€129 · in stock",
    desc: "Deep emerald green fabric. A grounded, forest tone for calm evenings and garden tables.",
  },
  { id: "lilac",
    name: "Lilac",
    swatch: "#8a6ba8",
    img: "speaker-lilac.png",
    price: "€129 · in stock",
    desc: "Soft pastel violet fabric. Warm, gentle, and a little unexpected.",
  },
  {id: "mist",
    name: "Mist",
    swatch: "#d8cfc0",
    img: "speaker.png",
    price: "€129 · in stock",
    desc: "The original. A pale ivory woven fabric that picks up the light of the room it sits in.",
    original: true,
  },
  {
id: "ember",
    name: "Ember",
    swatch: "#b23a2e",
    img: "speaker-ember.png",
    price: "€129 · in stock",
    desc: "Deep crimson red fabric. Bold, warm, and made for candle-lit nights.",
  },
];
const switcherLamp = document.getElementById("switcher-lamp");
const switcherName = document.getElementById("switcher-name");
const switcherPrice = document.getElementById("switcher-price");
const switcherDesc = document.getElementById("switcher-desc");
const swatchesWrap = document.querySelector(".swatches");
function setVariant(v) {
  if (switcherLamp) {
    switcherLamp.src = v.img;
    switcherLamp.setAttribute("alt", "LUMINA speaker in " + v.name);
    switcherLamp.animate(
      [{ opacity: 0, transform: "translateY(8px) scale(0.98)" }, { opacity: 1, transform: "none" }],
      { duration: 360, easing: "cubic-bezier(0.16,1,0.3,1)" }
    );
  }if (switcherName) switcherName.textContent = v.name + (v.original ? "  ·  Original" : "");
  if (switcherPrice) switcherPrice.textContent = v.price;
  if (switcherDesc) switcherDesc.textContent = v.desc;
document.querySelectorAll(".swatch").forEach(function (s) {
    const selected = s.dataset.id === v.id;
    s.setAttribute("aria-checked", selected ? "true" : "false");
    s.classList.toggle("is-active", selected);
  });
}/* ---------- Attach click events to existing buttons ---------- */
if (swatchesWrap) {
  swatchesWrap.querySelectorAll(".swatch").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const v = VARIANTS.find(function (x) { return x.id === btn.dataset.id; });
      if (v) setVariant(v);
    });
  });
  setVariant(VARIANTS.find(function (v) { return v.id === "mist"; }));
}