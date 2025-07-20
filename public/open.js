const items = [
  { name: 'Recoil', src: '/public/images/Recoil.jpg', chance: 60 },
  { name: 'Fracture', src: '/public/images/Fracture.jpg', chance: 27 },
  { name: 'tickettohell', src: '/public/images/tickettohell.jpg', chance: 3 },
  { name: 'kilowatt', src: '/public/images/kilowatt.jpg', chance: 4 },
  { name: 'gallery', src: '/public/images/gallery.jpg', chance: 0.05 },
  { name: 'Revolution', src: '/public/images/Revolution.jpg', chance: 0.05 },
  { name: 'Chroma2', src: '/public/images/Chroma2.jpg', chance: 0 },
  { name: 'Glock18-vogue', src: '/public/images/Glock18-vogue.jpg', chance: 0 }
];

function pickWinner() {
  const total = items.reduce((sum, item) => sum + item.chance, 0);
  const rand = Math.random() * total;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.chance;
    if (rand < cumulative) return item;
  }
  return items[0];
}

document.getElementById('openButton').addEventListener('click', () => {
  const scrollArea = document.getElementById('scrollArea');
  const winnerModal = document.getElementById('winnerModal');
  const winnerImage = document.getElementById('winnerImage');
  const audio = document.getElementById('openSound');

  scrollArea.innerHTML = '';
  winnerModal.style.display = 'none';

  const winner = pickWinner();
  const fullList = [];

  for (let i = 0; i < 30; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    fullList.push(item);
  }
  fullList.push(winner);

  fullList.forEach(item => {
    const img = document.createElement('img');
    img.src = item.src;
    img.className = 'item-img';
    scrollArea.appendChild(img);
  });

  const itemWidth = 110;
  const totalWidth = itemWidth * (fullList.length - 1);
  const centerOffset = (scrollArea.clientWidth / 2) - (itemWidth / 2);

  audio.play();

  scrollArea.style.transition = 'transform 6s cubic-bezier(0.1, 0.9, 0.4, 1)';
  scrollArea.style.transform = `translateX(-${totalWidth - centerOffset}px)`;

  setTimeout(() => {
    winnerImage.src = winner.src;
    winnerModal.style.display = 'flex';
  }, 6100);
});
