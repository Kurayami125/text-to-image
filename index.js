const express = require("express");
const Canvas = require("@napi-rs/canvas");

const app = express();

app.get("/", (req, res) => {
res.send("Text Image API Online");
});

app.get("/text", async (req, res) => {
try {
const text = decodeURIComponent(
req.query.content || "Hello World"
);

const username = decodeURIComponent(
  req.query.username || "Unknown User"
);

const canvas = Canvas.createCanvas(1200, 400);
const ctx = canvas.getContext("2d");

// ===== BACKGROUND =====

ctx.fillStyle = "#0d1117";
ctx.fillRect(0, 0, 1200, 400);

for (let i = 0; i < 50; i++) {
  const x = Math.random() * 1200;
  const y = Math.random() * 400;
  const size = Math.random() * 4;

  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fill();
}

// ===== BORDER =====

ctx.strokeStyle = "rgba(255,255,255,0.15)";
ctx.lineWidth = 3;
ctx.strokeRect(20, 20, 1160, 360);

// ===== MAIN TEXT =====

let fontSize = 90;

do {
  ctx.font = `bold ${fontSize}px Sans`;
  fontSize -= 2;
} while (
  ctx.measureText(text).width > 1000 &&
  fontSize > 30
);

ctx.textAlign = "center";
ctx.textBaseline = "middle";

// Shadow RGB
ctx.fillStyle = "#00e5ff";
ctx.fillText(text, 603, 155);

ctx.fillStyle = "#ff6ec7";
ctx.fillText(text, 597, 145);

ctx.fillStyle = "#ffffff";
ctx.fillText(text, 600, 150);

// ===== CREDIT =====

const credit = `Make by ${username}`;

ctx.font = "bold 35px Sans";

ctx.fillStyle = "#00e5ff";
ctx.fillText(credit, 603, 305);

ctx.fillStyle = "#ff6ec7";
ctx.fillText(credit, 597, 295);

ctx.fillStyle = "#ffffff";
ctx.fillText(credit, 600, 300);

// ===== EXPORT =====

const buffer = canvas.toBuffer("image/png");

res.setHeader(
  "Content-Type",
  "image/png"
);

res.end(buffer);

} catch (err) {
console.error(err);
res.status(500).send(err.toString());
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("API Online | Port ${PORT}");
});
