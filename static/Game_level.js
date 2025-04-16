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

// Gradient points for background animation
const points = [
    { x: 100, y: 300, color: 'rgba(34, 43, 122, 0.8)', radius: 400, dx: 1, dy: 1.2 },
    { x: 300, y: 600, color: 'rgba(174, 227, 255, 0.5)', radius: 500, dx: 1, dy: 1.2 },
    { x: 800, y: 400, color: 'rgba(174, 141, 255, 0.5)', radius: 350, dx: -1, dy: -1 },
    { x: 400, y: 700, color: 'rgba(180, 180, 180, 0.5)', radius: 450, dx: 1.5, dy: -0.8 }
];

// Particles system
const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`
    });
}

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

    // Draw particles
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
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

    // Update particles
    particles.forEach(particle => {
        particle.y -= particle.speed;
        if (particle.y < -10) {
            particle.y = height + 10;
            particle.x = Math.random() * width;
        }
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

// Typing animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = [
    "Escape From Cyber Thieves", 
    "साइबर चोरों से बचें", 
    "ಸೈಬರ್ ಕಳ್ಳನಿಂದ ತಪಿಸಿಕೊಳ್ಳಿ", 
    "సైబర్ దొంగల నుంచి తప్పించుకోండి", 
    "சைபர் திருடர்களிடம் இருந்து தப்பிக்க"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) 
            cursorSpan.classList.add("typing");
        
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) 
            cursorSpan.classList.add("typing");
        
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Start typing animation when document is loaded
document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Initialize game levels
    initializeLevels();
});

// Game state
let score = 0;
let completedLevels = [];

// Level data
const levels = [
    { id: 1, title: "Phishing Tutorial", description: "Learn to identify phishing attempts" },
    { id: 2, title: "Spot the Phish", description: "Test your phishing detection skills" },
    { id: 3, title: "Ransomware Tutorial", description: "Understand ransomware threats" },
    { id: 4, title: "Decrypt the Threat", description: "Solve encryption challenges" },
    { id: 5, title: "Spot the Fake Call", description: "Identify vishing attempts" }
];

// Initialize level cards
function initializeLevels() {
    const levelGrid = document.getElementById('level-grid');
    levelGrid.innerHTML = '';
    
    levels.forEach(level => {
        const isCompleted = completedLevels.includes(level.id);
        
        const levelCard = document.createElement('div');
        levelCard.className = `level-card ${isCompleted ? 'completed' : ''}`;
        
        levelCard.innerHTML = `
            <div class="level-header">
                <div class="level-number">${level.id}</div>
                ${isCompleted ? '<div class="level-badge">Completed</div>' : ''}
            </div>
            <h3 class="level-title">${level.title}</h3>
            <p class="level-description">${level.description}</p>
            <button class="level-button ${isCompleted ? 'completed' : ''}" 
                    onclick="playLevel(${level.id})">
                ${isCompleted ? 'Replay' : 'Play'}
            </button>
            ${!isCompleted ? '<div class="glow-effect"></div>' : ''}
        `;
        
        levelGrid.appendChild(levelCard);
    });
}

// Play level function
function playLevel(level) {
    // Show achievement notification
    showAchievement(`Starting Level ${level}!`);
    
    // Play audio
    try {
        const greetingAudio = document.getElementById('greeting-audio');
        const levelAudio = document.getElementById(`level-audio${level}`);
        
        // Play greeting audio
        if (greetingAudio) {
            greetingAudio.play().catch(error => {
                console.error("Greeting audio playback failed:", error);
            });
        }
        
        // Play level-specific audio
        if (levelAudio) {
            levelAudio.play().catch(error => {
                console.error("Level audio playback failed:", error);
            });
        }
    } catch (error) {
        console.error("Audio error:", error);
    }
    
    // Simulate level completion after a delay
    setTimeout(() => {
        if (!completedLevels.includes(level)) {
            completedLevels.push(level);
            updateScore(100);
            showAchievement(`Level ${level} Completed! +100 points`);
            updateAchievements();
            initializeLevels(); // Refresh level cards
        }
    }, 2000);
    
    //In a real implementation, you would redirect to the level page
    setTimeout(() => {
     let levelPath = "";
       switch (level) {
           case 1: levelPath = "Level-1/ok.html"; break;
          case 2: levelPath = "Level-2/new.html"; break;
            case 3: levelPath = "Level-3/new.html"; break;
           case 4: levelPath = "Level-4/index.html"; break;
            case 5: levelPath = "Level-5/index.html"; break;
        }
        window.location.href = levelPath;
 }, 6000);
}

// Update score
function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
    
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = Math.min(score / 10, 100);
    progressFill.style.width = `${progressPercentage}%`;
}

// Show achievement notification
function showAchievement(text) {
    const notification = document.getElementById('achievement-notification');
    const achievementText = document.getElementById('achievement-text');
    
    achievementText.textContent = text;
    notification.classList.remove('hidden');
    
    // Hide notification after animation completes
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Update achievements panel
function updateAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    
    if (completedLevels.length === 0) {
        achievementsContainer.innerHTML = '<p class="empty-achievements">Complete levels to earn achievements</p>';
        return;
    }
    
    achievementsContainer.innerHTML = '';
    
    completedLevels.forEach(level => {
        const achievementItem = document.createElement('div');
        achievementItem.className = 'achievement-item';
        achievementItem.innerHTML = `
            <div class="achievement-badge">Level ${level}</div>
            <span>Completed</span>
        `;
        achievementsContainer.appendChild(achievementItem);
    });
}