const items = [
  "Fracture.jpg",
  "Revolution.jpg",
  "tickettohell.jpg",
  "Glock18-vogue.jpg",
  "Recoil.jpg",
  "Chroma2.jpg",
  "kilowatt.jpg",
  "gallery.jpg"
];

const probabilities = [
  27, 0.05, 3, 0, 60, 0, 4, 0.05
];

const scrollArea = document.querySelector(".scroll-area");
const openButton = document.getElementById("openButton");
const winnerImage = document.getElementById("winner-image");
const winnerContainer = document.getElementById("winner-container");

let imagesLoaded = 0;

// Görselleri yükle
items.forEach(src => {
  const img = document.createElement("img");
  img.src = `/images/${src}`;
  img.className = "item-img";
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === items.length) {
      openButton.disabled = false;
    }
  };
  scrollArea.appendChild(img);
});

function getRandomItem() {
  const total = probabilities.reduce((a, b) => a + b, 0);
  const rand = Math.random() * total;
  let cumulative = 0;
  for (let i = 0; i < items.length; i++) {
    cumulative += probabilities[i];
    if (rand <= cumulative) return items[i];
  }
  return items[items.length - 1];
}

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  winnerContainer.style.display = "none";

  const selectedItem = getRandomItem();
  const index = items.indexOf(selectedItem);
  const scrollDistance = index * 110 + 55 - (600 / 2); // itemWidth: 110px, container: 600px

  // Ses oynat
  const audio = new Audio("/sounds/roll.mp3");
  audio.play();

  // Scroll animasyonu
  scrollArea.style.transition = "none";
  scrollArea.style.transform = "translateX(0)";
  void scrollArea.offsetWidth;

  // Sonra yavaşlatmalı hareket
  scrollArea.style.transition = "transform 5s ease-out";
  scrollArea.style.transform = `translateX(-${scrollDistance}px)`;

  setTimeout(() => {
    winnerImage.src = `/images/${selectedItem}`;
    winnerContainer.style.display = "flex";

    // Kazananı sunucuya gönder
    fetch("/api/winner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: selectedItem })
    });

    openButton.disabled = false;
  }, 5500);
});
