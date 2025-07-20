const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// GEÇİCİ TOKEN VERİTABANI (Bellekte tutulur)
let tokens = {
  "abc124": false,
  "winner456": false,
  "test999": false
};

// ÖDÜLLER
const rewards = [
  "Fracture case",
  "Recoil case",
  "Revolution case",
  "Glock-18 vogue ft",
  "Gallery case",
  "Kilowatt case",
  "Chroma 2 case",
  "Ticket to hell mw"
];

// /spin endpoint
app.get('/spin', (req, res) => {
  const token = req.query.token;

  // Token yoksa veya bilinmiyorsa
  if (!token || !(token in tokens)) {
    return res.status(400).send("❌ Bağlantı geçersiz veya token tanınmıyor.");
  }

  // Token daha önce kullanıldıysa
  if (tokens[token]) {
    return res.status(403).send("⚠️ Bu token zaten kullanıldı.");
  }

  // Ödül seç
  const prize = rewards[Math.floor(Math.random() * rewards.length)];

  // Token'ı kullanılmış işaretle
  tokens[token] = true;

  // Cevap dön
  res.send(`🎉 Tebrikler! Kazandığın ödül: ${prize}`);
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
