const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const container = document.getElementById("container");
const ctx = canvas.getContext("2d");
let drawing = false;
let color = "red";
let lastX, lastY;

// Get camera feed
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});

// Once the video metadata is loaded, adjust canvas size to match the video dimensions
video.addEventListener("loadedmetadata", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  container.style.width = video.videoWidth + "px";
  container.style.height = video.videoHeight + "px";
});

// Utility function to get coordinates relative to canvas
function getCoords(event) {
  let x, y;
  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  const rect = canvas.getBoundingClientRect();
  return [x - rect.left, y - rect.top];
}

// Mouse events for desktop
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = getCoords(e);
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
  lastX = undefined;
  lastY = undefined;
});
canvas.addEventListener("mousemove", draw);

// Touch events for mobile
canvas.addEventListener("touchstart", (e) => {
  drawing = true;
  [lastX, lastY] = getCoords(e);
  e.preventDefault();
});
canvas.addEventListener("touchend", (e) => {
  drawing = false;
  lastX = undefined;
  lastY = undefined;
  e.preventDefault();
});
canvas.addEventListener("touchmove", (e) => {
  draw(e);
  e.preventDefault();
});

function draw(event) {
  if (!drawing) return;
  const [x, y] = getCoords(event);
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  // Update the last coordinates
  [lastX, lastY] = [x, y];
}

function changeColor(newColor) {
  color = newColor;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
