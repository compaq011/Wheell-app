const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
const winnerModal = document.getElementById("winnerModal");
const winnerImage = document.getElementById("winnerImage");
const rollSound = document.getElementById("rollSound");

const items = [
  { src: "public/images/Recoil.jpg", chance: 60 },
  { src: "public/images/Fracture.jpg", chance: 27 },
  { src: "public/images/Revolution.jpg", chance: 0.05 },
  { src: "public/images/Kilowatt.jpg", chance: 4 },
  { src: "public/images/tickettohell.jpg", chance: 3 },
  { src: "public/images/gallery.jpg", chance: 0.05 },
  { src: "public/images/Chroma2.jpg", chance: 0 },
  { src: "public/images/Glock18-vogue.jpg", chance: 0 }
];

function getRandomItem() {
  const total = items.reduce((sum, item) => sum + item.chance, 0);
  const rand = Math.random() * total;
  let cum = 0;
  for (const item of items) {
    cum += item.chance;
    if (rand <= cum) return item.src;
  }
  return items[0].src;
}

function populateItems(winningSrc) {
  scrollArea.innerHTML = "";
  const preItems = 20;
  for (let i = 0; i < preItems; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)].src;
    scrollArea.appendChild(img);
  }
  const winImg = document.createElement("img");
  winImg.src = winningSrc;
  scrollArea.appendChild(winImg);
  for (let i = 0; i < 20; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)].src;
    scrollArea.appendChild(img);
  }
}

function spin() {
  openButton.disabled = true;
  const winningSrc = getRandomItem();
  populateItems(winningSrc);
  rollSound.currentTime = 0;
  rollSound.play();

  const itemWidth = 110;
  const targetIndex = 20;
  const stopAt = -(itemWidth * targetIndex);
  scrollArea.style.transition = "transform 6s ease-out";
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  setTimeout(() => {
    rollSound.pause();
    winnerImage.src = winningSrc;
    winnerModal.style.display = "flex";
    fetch("/api/winner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: winningSrc.split("/").pop() }),
    });
    setTimeout(() => {
      winnerModal.style.display = "none";
      openButton.disabled = false;
    }, 3000);
  }, 6200);
}

openButton.addEventListener("click", spin);
