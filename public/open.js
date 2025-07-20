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
  "images/TicketToHell.jpg"
];

function populateItems() {
  scrollArea.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)];
    scrollArea.appendChild(img);
  }
}

populateItems();

function spin() {
  openButton.disabled = true;

  // Görselleri yeniden oluştur
  populateItems();

  const itemWidth = 110; // image width + margin
  const totalItems = scrollArea.children.length;

  // Rastgele kazanan index (20 ila 24 arasında olacak)
  const winningIndex = 20 + Math.floor(Math.random() * 5);

  const stopAt = -(winningIndex * itemWidth) + (scrollArea.parentElement.clientWidth / 2) - (itemWidth / 2);
  scrollArea.style.transition = "transform 5s ease-out";
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  // Kazananı 5 saniye sonra göster
  setTimeout(() => {
    const winner = scrollArea.children[winningIndex];
    winnerImage.src = winner.src;
    winnerModal.style.display = "flex";

    openButton.disabled = false;
  }, 5200);
}

// Kasa açma butonu
openButton.addEventListener("click", spin);

// Modal kapatma
winnerModal.addEventListener("click", () => {
  winnerModal.style.display = "none";
});
