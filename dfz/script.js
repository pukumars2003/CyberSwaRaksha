// Canvas setup
const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Resize canvas on window resize
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

// Show the container with a fade-in effect
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('gameContainer');
    container.classList.add('visible');
    
    // Start typing animation for greeting
    typeWriter("Prepare to test your cybersecurity knowledge!", 0);
    
    // Create particles
    createParticles();
});

// Typing animation for greeting
function typeWriter(text, i) {
    const greeting = document.getElementById('greeting');
    const speed = 50; // typing speed in milliseconds
    
    if (i < text.length) {
        greeting.innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
            typeWriter(text, i);
        }, speed);
    }
}

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

// Gradient points for background animation
const points = [
    { x: 100, y: 300, color: 'rgba(34, 43, 122, 0.8)', radius: 400, dx: 1, dy: 1.2 },
    { x: 300, y: 600, color: 'rgba(174, 227, 255, 0.5)', radius: 500, dx: 1, dy: 1.2 },
    { x: 800, y: 400, color: 'rgba(174, 141, 255, 0.5)', radius: 350, dx: -1, dy: -1 },
    { x: 400, y: 700, color: 'rgba(180, 180, 180, 0.5)', radius: 450, dx: 1.5, dy: -0.8 }
];

// Draw gradient background
function drawGradient() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background gradients
    points.forEach(point => {
        const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, point.radius
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}

// Update animation elements
function updatePoints() {
    // Update gradient points
    points.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > width) point.dx *= -1;
        if (point.y < 0 || point.y > height) point.dy *= -1;
    });
}

// Animation loop
function animate() {
    updatePoints();
    drawGradient();
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Set animation
        particle.style.animation = `float-slow ${duration}s linear ${delay}s infinite`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
}