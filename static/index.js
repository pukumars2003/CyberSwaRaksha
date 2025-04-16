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
    const container = document.getElementById('container');
    container.classList.add('visible');
    
    // Create particles
    createParticles();
});

const greetings = {
    en: "Hello {name}, welcome to the game!",
    hi: "नमस्ते {name}, खेल में आपका स्वागत है!",
    kn: "ನಮಸ್ಕಾರ {name}, ಆಟಕ್ಕೆ ಸ್ವಾಗತ!",
    te: "హలో {name}, ఆటకు స్వాగతం!",
    ta: "வணக்கம் {name}, விளையாட்டிற்கு வரவேற்கிறோம்!"
};
const greet = {
    en: "Hello {name}, welcome to the game!",
    hi: "Namasakaar {name}, aapko cyber sva raksha mein swagat hai!",
    kn: "Namasakara {name}, nimmagay cyber sva raksha game gay swāgata!",
    te: "హలో {name}, ఆటకు స్వాగతం!",
    ta: "வணக்கம் {name}, விளையாட்டிற்கு வரவேற்கிறோம்!"
};

document.getElementById('start-button').addEventListener('click', function () {
    const name = document.getElementById('player-name').value.trim();
    const language = document.getElementById('language').value;

    if (name) {
        greetPlayer(name, language);
    } else {
        alert("Please enter your name.");
    }
});

function greetPlayer(name, language) {
    const greetingText = greetings[language].replace("{name}", name);
    const greetText = greet[language].replace("{name}", name);
    document.getElementById('greeting').textContent = greetingText;
    //document.getElementById('greeting').textContent = greetText;
    speak(greetText, language);

    setTimeout(function () {
        window.location.href = `${language}/game_level.html`;
    }, 5000);
}

function speak(text, language) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    utterance.onend = function () {
        console.log('Speech has finished.');
    };
    utterance.onerror = function (e) {
        console.error('Speech synthesis error: ' + e.error);
    };
    synth.speak(utterance);
}

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

document.getElementById('startButton').addEventListener('click', function () {
    var audio = document.getElementById('gameAudio');
    audio.play();
    setTimeout(function () {
        window.location.href = 'next_page.html'; // Change this to your target page
    }, 20000); // 20 seconds
});
