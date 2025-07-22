const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;
const VALID_TOKENS = ["abc123", "def456", "ykt", "tky"];
const winnersFile = path.join(__dirname, "winners.json");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  const token = req.query.token;
  if (!VALID_TOKENS.includes(token)) {
    return res.status(403).send("Geçersiz token.");
  }
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/winner", (req, res) => {
  const { item } = req.body;
  if (!item) return res.status(400).send("Item gerekli.");

  let winners = [];
  if (fs.existsSync(winnersFile)) {
    winners = JSON.parse(fs.readFileSync(winnersFile));
  }
  winners.push({ item, timestamp: new Date().toISOString() });
  fs.writeFileSync(winnersFile, JSON.stringify(winners, null, 2));
  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
