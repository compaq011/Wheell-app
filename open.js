const scrollArea = document.getElementById("scrollArea"); const openButton = document.getElementById("openButton"); const rollSound = document.getElementById("rollSound");

// Kasadaki itemlar ve görselleri const items = [ "images/Fracture.jpg", "images/Recoil.jpg", "images/Revolution.jpg", "images/Glock18-Vogue.jpg", "images/Gallery.jpg", "images/Kilowatt.jpg", "images/Chroma2.jpg", "images/TicketToHell.jpg" ];

// Scroll alanını doldur function populateItems() { for (let i = 0; i < 40; i++) { const img = document.createElement("img"); img.src = items[Math.floor(Math.random() * items.length)]; scrollArea.appendChild(img); } }

populateItems();

// Spin fonksiyonu function spin() { openButton.disabled = true; rollSound.currentTime = 0; rollSound.play();

// Rastgele pozisyon seç (yaklaşık kazanan 20. sırada) const itemWidth = 120; const stopAt = -(itemWidth * (Math.floor(Math.random() * 10) + 20)); scrollArea.style.transform = translateX(${stopAt}px);

// 5 saniye sonra sonucu göster setTimeout(() => { rollSound.pause(); rollSound.currentTime = 0; const centerIndex = Math.abs(stopAt + (scrollArea.clientWidth / 2)) / itemWidth; const selectedImg = scrollArea.children[Math.floor(centerIndex)]; alert("Kazandığın item: " + selectedImg.src.split("/").pop().replace(".jpg", "")); }, 5000); }

openButton.addEventListener("click", spin);

