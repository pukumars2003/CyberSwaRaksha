const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
// Show the container with a fade-in effect
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('gameContainer');
    container.classList.add('visible');
});

// Start the video and redirect on button click
document.getElementById('startButton').addEventListener('click', function () {
    const video = document.getElementById('gameVideo');  // Get the video element
    const videoContainer = document.getElementById('videoContainer');  // Get the video container

    // Hide the start button and show video container
    document.getElementById('startButton').style.display = 'none';
    videoContainer.style.display = 'block';

    // Play the video
    video.play().then(() => {
        // Redirect after the video ends
        video.addEventListener('ended', () => {
            window.location.href = 'index.html'; // Change this to your target page
        });
    }).catch((error) => {
        console.error('Video playback failed:', error);
    });
});
const points = [
    { x: 100, y: 300, color: 'rgba(34, 43, 122,0.8)', radius: 400, dx: 1, dy: 1.2 },
    { x: 300, y: 600, color: 'rgba(174, 227, 255, 0.5)', radius: 500, dx: 1, dy: 1.2 },
    { x: 800, y: 400, color: 'rgba(174, 141, 255, 0.5)', radius: 350, dx: -1, dy: -1 },
    { x: 400, y: 700, color: 'rgb(180, 180, 180,0.5)', radius: 450, dx: 1.5, dy: -0.8 }
];

function drawGradient() {
    ctx.clearRect(0, 0, width, height);
    points.forEach(point => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius);
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}

function updatePoints() {
    points.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > width) point.dx *= -1;
        if (point.y < 0 || point.y > height) point.dy *= -1;
    });
}

function animate() {
    updatePoints();
    drawGradient();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});