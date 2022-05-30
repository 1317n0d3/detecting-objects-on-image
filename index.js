let objectDetector;
let status;
let objects = [];
let canvas, ctx;
const width = 640;
const height = 420;

async function make() {
  img = new Image();
  img.src = "./3.jpg";
  img.width = width;
  img.height = height;

  objectDetector = await ml5.objectDetector("cocossd", startDetecting);

  canvas = createCanvas(width, height);
  ctx = canvas.getContext("2d");
}

window.addEventListener("DOMContentLoaded", function () {
  make();
});

function startDetecting() {
  console.log("model ready");
  detect();
}

function detect() {
  objectDetector.detect(img, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    objects = results;

    if (objects) {
      draw();
    }
  });
}

function draw() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 0, 0, width, height);
  for (let i = 0; i < objects.length; i += 1) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16);

    ctx.beginPath();
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
  }
}

function createCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas;
}
