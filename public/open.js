// Değiştirilecek item şansı
const chances = {
  Recoil: 0.60,
  Fracture: 0.27,
  Revolution: 0.0005,
  Kilowatt: 0.04,
  TicketToHell: 0.03,
  Gallery: 0.0005,
  Chroma2: 0.0,
  Glock18Vogue: 0.0
};
const items = Object.keys(chances);
const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const rollSound = document.getElementById("rollSound");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");

function getRandomItem() {
  const rnd = Math.random();
  let cum = 0;
  for (const item of items) {
    cum += chances[item];
    if (rnd < cum) return item;
  }
  return items[items.length - 1];
}

function populateItems() {
  scrollArea.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const name = items[Math.floor(Math.random() * items.length)];
    const img = document.createElement("img");
    img.src = `images/${name}.jpg`;
    img.alt = name;
    scrollArea.appendChild(img);
  }
}

function spin() {
  openButton.disabled = true;
  const winner = getRandomItem();
  const targetIndex = 20;
  const stopAt = -(targetIndex * 110); // 110px item genişliği+margin
  scrollArea.style.transition = "transform 4s ease-out";
  rollSound.play();
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  setTimeout(() => {
    rollSound.pause();
    winnerImage.src = `images/${winner}.jpg`;
    winnerModal.style.display = "flex";
    // Sunucuya POST olarak gönder
    fetch('/winner?token=abc123', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: winner, date: Date.now() })
    });
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  populateItems();
  openButton.addEventListener("click", spin);
});
