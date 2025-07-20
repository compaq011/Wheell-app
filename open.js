const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
//const rollSound = document.getElementById("rollSound");

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
  scrollArea.innerHTML = ""; // önce temizle
  for (let i = 0; i < 40; i++) {
    const img = document.createElement("img");
    img.src = items[Math.floor(Math.random() * items.length)];
    img.classList.add("item-img");
    scrollArea.appendChild(img);
  }
}

populateItems();

function spin() {
  openButton.disabled = true;
 // rollSound.currentTime = 0;
//  rollSound.play();

  const itemWidth = 120;
  const stopAt = -(itemWidth * (Math.floor(Math.random() * 10) + 20));

  scrollArea.style.transition = "transform 5s ease-out";
  scrollArea.style.transform = `translateX(${stopAt}px)`;

 setTimeout(() => {
   // rollSound.pause();
   // rollSound.currentTime = 0;

    const index = Math.floor(Math.abs(stopAt) / itemWidth) + 3;
    const selectedImg = scrollArea.children[index];
    const itemName = selectedImg
      ? selectedImg.src.split("/").pop().replace(".jpg", "")
      : "Bilinmeyen";

   const scrollArea = document.getElementById("scrollArea");
const openButton = document.getElementById("openButton");
// const rollSound = document.getElementById("rollSound"); // mp3 yoksa gerek yok

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
    img.className = "item-img";
    scrollArea.appendChild(img);
  }
}

populateItems();

function spin() {
  openButton.disabled = true;

  const itemWidth = 120;
  const stopAt = -(itemWidth * (Math.floor(Math.random() * 10) + 20));
  scrollArea.style.transition = "transform 5s ease-out";
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  setTimeout(() => {
    const centerIndex = Math.abs(stopAt + (scrollArea.clientWidth / 2)) / itemWidth;
    const selectedImg = scrollArea.children[Math.floor(centerIndex)];

    // Modalda göster
    winnerImage.src = selectedImg.src;
    winnerModal.style.display = "block";

    // Açma tekrarına engel
    // openButton.disabled = false; // açılmasın diye yorumda

  }, 5000);
}

openButton.addEventListener("click", spin);

    alert("Kazandığın item: " + itemName);

    // Butonu tekrar aktif et
    openButton.disabled = false;
    // Scroll reset (opsiyonel)
    scrollArea.style.transition = "none";
    scrollArea.style.transform = "translateX(0)";
    populateItems();
  }, 5000);
}

openButton.addEventListener("click", spin);
