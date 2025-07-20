const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");

const items = [
  "images/Fracture.jpg",
  "images/Recoil.jpg",
  "images/Revolution.jpg",
  "images/Glock18-vogue.jpg",
  "images/Gallery.jpg",
  "images/Kilowatt.jpg",
  "images/Chroma2.jpg",
  "images/TickettoHell.jpg"
];

// Scroll alanına rastgele itemleri yerleştir
function populateItems() {
  scrollArea.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)];
    img.classList.add("item-img");
    scrollArea.appendChild(img);
  }
}

populateItems();

function spin() {
  openButton.disabled = true;

  // Scroll alanı genişliği
  const itemWidth = 110; // CSS'e uygun
  const totalItems = scrollArea.children.length;

  // Kazanan item pointer’ın altına gelsin (20. index civarı)
  const winningIndex = 20 + Math.floor(Math.random() * 10);
  const stopPosition = -(winningIndex * itemWidth);

  // Hızlı başlayıp yavaşlayan animasyon
  scrollArea.style.transition = "transform 5s ease-out";
  scrollArea.style.transform = `translateX(${stopPosition}px)`;

  setTimeout(() => {
    // Kazanan item'i belirle
    const selectedImg = scrollArea.children[winningIndex];
    const imgSrc = selectedImg.src;

    // Modal göster
    winnerImage.src = imgSrc;
    winnerModal.style.display = "flex";

    // Tekrar oynatmak istersen modal'ı kapat
    openButton.disabled = false;
  }, 5200); // Animasyon süresiyle uyumlu olmalı
}

// Butona tıklandığında çalıştır
openButton.addEventListener("click", spin);
