const express = require("express");
const Canvas = require("@napi-rs/canvas");

const app = express();

function applyText(canvas, text, width, size) {
const ctx = canvas.getContext("2d");

do {
ctx.font = "bold ${size -= 2}px Sans";
} while (
ctx.measureText(text).width > width &&
size > 20
);

return ctx.font;
}

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
ctx.fillRect(
  0,
  0,
  canvas.width,
  canvas.height
);

// Hạt sáng
for (let i = 0; i < 50; i++) {
  const x = Math.random() * 1200;
  const y = Math.random() * 400;
  const size = Math.random() * 4;

  ctx.beginPath();
  ctx.arc(
    x,
    y,
    size,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    "rgba(255,255,255,0.15)";
  ctx.fill();
}

// ===== KHUNG =====

ctx.strokeStyle =
  "rgba(255,255,255,0.15)";
ctx.lineWidth = 3;

ctx.strokeRect(
  20,
  20,
  1160,
  360
);

// ===== TEXT =====

ctx.font = applyText(
  canvas,
  text,
  1000,
  120
);

// RGB Shadow

ctx.fillStyle = "#00e5ff";
ctx.fillText(
  text,
  103,
  203
);

ctx.fillStyle = "#ff6ec7";
ctx.fillText(
  text,
  97,
  197
);

ctx.fillStyle = "#ffffff";
ctx.fillText(
  text,
  100,
  200
);

// ===== MAKE BY =====

const credit =
  `Make by ${username}`;

ctx.font = "bold 35px Sans";

ctx.fillStyle = "#00e5ff";
ctx.fillText(
  credit,
  383,
  303
);

ctx.fillStyle = "#ff6ec7";
ctx.fillText(
  credit,
  377,
  297
);

ctx.fillStyle = "#ffffff";
ctx.fillText(
  credit,
  380,
  300
);

// ===== EXPORT PNG =====

const buffer =
  canvas.toBuffer("image/png");

res.setHeader(
  "Content-Type",
  "image/png"
);

res.end(buffer);

} catch (err) {
console.error(err);

res.status(500).send(
  err.toString()
);

}
});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(
"Text Image API Online | Port ${PORT}"
);
});
