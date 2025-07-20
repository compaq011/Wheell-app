
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const tokensFile = 'tokens.json';
let tokens = JSON.parse(fs.readFileSync(tokensFile));

const rewards = [
  "Fracture case", "Recoil case", "Revolution case", "Glock-18 vogue ft",
  "Gallery case", "Kilowatt case", "Chroma 2 case", "Ticket to hell mw"
];

app.get('/:token', (req, res) => {
  const { token } = req.params;
  if (!tokens[token]) {
    return res.send("❌ Bu bağlantı geçersiz ya da zaten kullanıldı.");
  }
  
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  tokens[token] = false;
  fs.writeFileSync(tokensFile, JSON.stringify(tokens));
  res.send(`🎉 Tebrikler! Kazandığınız ödül: ${reward}`);
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
