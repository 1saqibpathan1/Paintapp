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
video.addEventListener("loadedmetadata", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  container.style.width = video.videoWidth + "px";
  container.style.height = video.videoHeight + "px";
});

// Mouse events for desktop
canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", draw);

// Touch events for mobile
canvas.addEventListener("touchstart", (e) => {
  drawing = true;
  draw(e);
  e.preventDefault();
});
canvas.addEventListener("touchend", (e) => {
  drawing = false;
  e.preventDefault();
});
canvas.addEventListener("touchmove", (e) => {
  draw(e);
  e.preventDefault();
});

function draw(event) {
  if (!drawing) return;
  
  let x, y;
  // Check if this is a touch event
  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  
  // Adjust for canvas position
  const rect = canvas.getBoundingClientRect();
  x = x - rect.left;
  y = y - rect.top;
  
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
