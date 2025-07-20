const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Token listesi (ileride veritabanına alınabilir)
const validTokens = ['abc123', 'def456'];

// Statik dosyaları public klasöründen sun
app.use(express.static(path.join(__dirname, 'public')));

// Token kontrol middleware
app.use((req, res, next) => {
  const urlToken = req.query.token;

  if (req.path === '/' || req.path === '/index.html') {
    if (!urlToken || !validTokens.includes(urlToken)) {
      return res.status(403).send('<h1>Erişim reddedildi</h1><p>Geçersiz token</p>');
    }
  }

  next();
});

// Ana sayfa route'u (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Geri kalan her şey (404)
app.use((req, res) => {
  res.status(404).send('<h1>404</h1><p>Sayfa bulunamadı</p>');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
