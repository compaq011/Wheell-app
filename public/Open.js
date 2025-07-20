const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");

// Görseller
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

// Scroll alanına item görsellerini yükle
function populateItems() {
  for (let i = 0; i < 40; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)];
    scrollArea.appendChild(img);
  }
}

// Aç butonuna basınca spin başlat
function spin() {
  openButton.disabled = true;
  scrollArea.style.transition = "transform 5s ease-out";

  const itemWidth = 120;
  const stopAt = -(itemWidth * (Math.floor(Math.random() * 10) + 20));
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  setTimeout(() => {
    const centerIndex = Math.floor(Math.abs(stopAt) / itemWidth) + 2;
    const selectedImg = scrollArea.children[centerIndex];
    const winnerSrc = selectedImg ? selectedImg.src : "";

    // Kazananı modalda göster
    winnerImage.src = winnerSrc;
    winnerModal.style.display = "flex";

    // Tekrar butonu aktif et (istersen kapalı da bırakabilirsin)
    openButton.disabled = false;
  }, 5000);
}

// Modal tıklanınca kapansın
winnerModal.addEventListener("click", () => {
  winnerModal.style.display = "none";
});

populateItems();
openButton.addEventListener("click", spin);
