const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const rollSound = new Audio("sounds/roll.mp3");

const items = [
  { src: "images/Recoil.jpg", chance: 60 },
  { src: "images/Fracture.jpg", chance: 27 },
  { src: "images/Revolution.jpg", chance: 0.05 },
  { src: "images/kilowatt.jpg", chance: 4 },
  { src: "images/tickettohell.jpg", chance: 3 },
  { src: "images/gallery.jpg", chance: 0.05 },
  { src: "images/Chroma2.jpg", chance: 0 },
  { src: "images/Glock18-vogue.jpg", chance: 0 },
];

function weightedRandom() {
  const total = items.reduce((sum, i) => sum + i.chance, 0);
  let rand = Math.random() * total;
  for (const item of items) {
    if (rand < item.chance) return item;
    rand -= item.chance;
  }
  return items[0];
}

function preloadImages(callback) {
  let loaded = 0;
  const total = items.length;
  items.forEach(item => {
    const img = new Image();
    img.src = item.src;
    img.onload = () => {
      loaded++;
      if (loaded === total) callback();
    };
  });
}

function populateItems() {
  scrollArea.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const item = weightedRandom();
    const img = document.createElement("img");
    img.src = item.src;
    img.className = "item-img";
    scrollArea.appendChild(img);
  }
}

function spin() {
  openButton.disabled = true;
  rollSound.currentTime = 0;
  rollSound.play();

  const itemWidth = 110; // padding dahil
  const stopIndex = 30 + Math.floor(Math.random() * 5);
  const stopOffset = -itemWidth * stopIndex + scrollArea.clientWidth / 2 - itemWidth / 2;

  scrollArea.style.transition = "transform 6s cubic-bezier(0.1, 0.1, 0, 1)";
  scrollArea.style.transform = `translateX(${stopOffset}px)`;

  setTimeout(() => {
    rollSound.pause();
    const selectedImg = scrollArea.children[stopIndex];
    const src = selectedImg?.src.split("/").pop().replace(".jpg", "");
    alert("Kazandığın item: " + src);

    fetch("/winner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: src, time: new Date().toISOString() })
    });

    openButton.disabled = false;
  }, 6200);
}

preloadImages(() => {
  populateItems();
  openButton.disabled = false;
});

openButton.addEventListener("click", () => {
  populateItems();
  spin();
});
