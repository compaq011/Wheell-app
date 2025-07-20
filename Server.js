const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// RAM tabanlı token listesi
global.tokens = ['abc123', 'xyz789' , 'ykt' , 'ssd', 'ismail'];

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const token = req.query.token;
  if (!token || !global.tokens.includes(token)) {
    return res.status(403).send('Geçersiz veya eksik token.');
  }

  // Token kullanıldıktan sonra silinir
  global.tokens = global.tokens.filter(t => t !== token);
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
