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
  rollSound.currentTime = 0;
  rollSound.play();

  const itemWidth = 120;
  const stopAt = -(itemWidth * (Math.floor(Math.random() * 10) + 20));

  scrollArea.style.transition = "transform 5s ease-out";
  scrollArea.style.transform = `translateX(${stopAt}px)`;

  setTimeout(() => {
    rollSound.pause();
    rollSound.currentTime = 0;

    const index = Math.floor(Math.abs(stopAt) / itemWidth) + 3;
    const selectedImg = scrollArea.children[index];
    const itemName = selectedImg
      ? selectedImg.src.split("/").pop().replace(".jpg", "")
      : "Bilinmeyen";

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
