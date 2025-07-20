const scrollArea = document.getElementById("scrollArea"); const openButton = document.getElementById("openButton"); const rollSound = document.getElementById("rollSound");

const items = [ "images/Fracture.jpg", "images/Recoil.jpg", "images/Revolution.jpg", "images/Glock18-vogue.jpg", "images/Gallery.jpg", "images/Kilowatt.jpg", "images/Chroma2.jpg", "images/TicketToHell.jpg" ];

function populateItems() { for (let i = 0; i < 40; i++) { const img = document.createElement("img"); img.src = items[Math.floor(Math.random() * items.length)]; scrollArea.appendChild(img); } }

populateItems();

function spin() { openButton.disabled = true; rollSound.currentTime = 0; rollSound.play(); kazanan 20. sırada) const itemWidth = 120; const stopAt = -(itemWidth * (Math.floor(Math.random() * 10) + 20)); scrollArea.style.transform = translateX(${stopAt}px);

setTimeout(() => { rollSound.pause(); rollSound.currentTime = 0; const centerIndex = Math.abs(stopAt + (scrollArea.clientWidth / 2)) / itemWidth; const selectedImg = scrollArea.children[Math.floor(centerIndex)]; alert("Kazandığın item: " + selectedImg.src.split("/").pop().replace(".jpg", "")); }, 5000); }

openButton.addEventListener("click", spin);

