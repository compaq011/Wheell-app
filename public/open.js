const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const rollSound = document.getElementById("rollSound");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");

// İtemler ve şans oranları
const itemPool = [
  { src: "images/Recoil.jpg", chance: 60 },
  { src: "images/Fracture.jpg", chance: 27 },
  { src: "images/Revolution.jpg", chance: 0.05 },
  { src: "images/Kilowatt.jpg", chance: 4 },
  { src: "images/TicketToHell.jpg", chance: 3 },
  { src: "images/Gallery.jpg", chance: 0.05 },
  { src: "images/Chroma2.jpg", chance: 0 },
  { src: "images/Glock18-vogue.jpg", chance: 0 },
];

// Şansa göre item seç
function getRandomItem() {
  const rand = Math.random() * 100;
  let sum = 0;
  for (const item of itemPool) {
    sum += item.chance;
    if (rand <= sum) return item.src;
  }
  return itemPool[0].src; // fallback
}

// Scroll area'yı doldur
function populateItems(selected) {
  scrollArea.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const img = document.createElement("img");
    img.src = selected && i === 24 ? selected : itemPool[Math.floor(Math.random() * itemPool.length)].src;
    img.className = "item-img";
    scrollArea.appendChild(img);
  }
}

function spin() {
  openButton.disabled = true;
  rollSound.currentTime = 0;
  rollSound.play();

  const selectedItem = getRandomItem();
  populateItems(selectedItem);

  // Scroll işlemi
  const itemWidth = 110;
  const totalShift = itemWidth * 35; // 25 item sola kayacak (kazanan ortada olacak)
  scrollArea.style.transition = "transform 10s cubic-bezier(0.1, 0.8, 0.2, 1)";
  scrollArea.style.transform = `translateX(-${totalShift}px)`;

  setTimeout(() => {
    rollSound.pause();
    rollSound.currentTime = 0;
    winnerImage.src = selectedItem;
    winnerModal.style.display = "flex";
    openButton.disabled = false;
  }, 6000);
}

openButton.addEventListener("click", spin);

// Modalı kapat
winnerModal.addEventListener("click", () => {
  winnerModal.style.display = "none";
});
