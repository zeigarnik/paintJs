const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtm = document.getElementById("jsSave");

const ctx = canvas.getContext("2d");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown() {
  painting = true;
}

function onMouseUp() {
  painting = false;
}

function handleChangeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleChangeMode() {
  if (filling === false) {
    mode.innerText = "Paint";
    filling = true;
  } else {
    mode.innerText = "Fill";
    filling = false;
  }
}

function startPainting() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } else {
    painting = true;
  }
}

function stopPainting() {
  painting = false;
}

function saveImage() {
  canvas.toBlob(function(blob) {
    const link = document.createElement("a");
    link.download = "PaintJS[🎨]";
    link.href = URL.createObjectURL(blob);
    link.click();
  });
}

function handleContextMenu(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleChangeColor)
  );
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleChangeMode);
}

if (saveBtm) {
  saveBtm.addEventListener("click", saveImage);
}
