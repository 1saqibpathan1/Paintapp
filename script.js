const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let color = "red";

// Set canvas size
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

// Get camera feed
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
    requestAnimationFrame(drawVideoFrame);
});

// Draw video feed to canvas
function drawVideoFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawVideoFrame);
}

// Drawing functions
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!drawing) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(event.clientX, event.clientY, 5, 0, Math.PI * 2);
    ctx.fill();
}

function changeColor(newColor) {
    color = newColor;
}

function clearCanvas() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
