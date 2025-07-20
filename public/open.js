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

const itemWidth = 110; // image + margin

function populateItems() {
  scrollArea.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)];
    scrollArea.appendChild(img);
  }
}

populateItems();

function spin() {
  openButton.disabled = true;
  populateItems(); // görselleri yenile

  const totalItems = scrollArea.children.length;
  const center = scrollArea.parentElement.clientWidth / 2;

  const winningIndex = 20 + Math.floor(Math.random() * 10);
  const targetPosition = -(winningIndex * itemWidth) + center - (itemWidth / 2);

  let currentX = 0;
  let speed = 80; // ilk hız
  let deceleration = 0.95; // yavaşlama katsayısı

  const interval = setInterval(() => {
    speed *= deceleration;
    currentX -= speed;

    if (currentX <= targetPosition) {
      clearInterval(interval);
      scrollArea.style.transform = `translateX(${targetPosition}px)`;

      const winner = scrollArea.children[winningIndex];
      winnerImage.src = winner.src;
      winnerModal.style.display = "flex";
      openButton.disabled = false;
    } else {
      scrollArea.style.transform = `translateX(${currentX}px)`;
    }
  }, 16); // ~60 FPS
}

openButton.addEventListener("click", spin);

winnerModal.addEventListener("click", () => {
  winnerModal.style.display = "none";
});
