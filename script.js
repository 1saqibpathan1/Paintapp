const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const container = document.getElementById("container");
const ctx = canvas.getContext("2d");
let drawing = false;
let color = "red";

// Get camera feed
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});

// Once the video metadata is loaded, adjust canvas size to match the video dimensions
video.addEventListener('loadedmetadata', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  container.style.width = video.videoWidth + "px";
  container.style.height = video.videoHeight + "px";
});

// Drawing functions on the transparent canvas
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(event) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
}

function changeColor(newColor) {
  color = newColor;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
