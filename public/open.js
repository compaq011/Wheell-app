const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const rollSound = document.getElementById("rollSound");

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
  rollSound.currentTime = 0;
  rollSound.play();

  const itemWidth = 110; // Görsele göre ayarla
  const stopIndex = Math.floor(Math.random() * 10) + 25; // 25-35 arası
  const stopAt = -(itemWidth * stopIndex);

  scrollArea.style.transition = "transform 6s cubic-bezier(0.1, 0.8, 0.3, 1)";
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  setTimeout(() => {
    rollSound.pause();
    rollSound.currentTime = 0;

    const selectedImg = scrollArea.children[stopIndex];
    const winnerModal = document.getElementById("winnerModal");
    const winnerImage = document.getElementById("winnerImage");

    winnerImage.src = selectedImg.src;
    winnerModal.style.display = "flex";

    setTimeout(() => {
      winnerModal.style.display = "none";
      openButton.disabled = false;
      populateItems(); // yeni görseller
      scrollArea.style.transition = "none";
      scrollArea.style.transform = "translateX(0)";
    }, 3000);
  }, 6000);
}

openButton.addEventListener("click", spin);
