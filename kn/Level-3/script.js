const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

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

function allowDrop(event) {
    event.preventDefault();
}


function drop(event) {
    event.preventDefault();
    // Show the investigate button
    document.getElementById('investigate-button').classList.remove('hidden');
    document.getElementById('investigation-table').innerHTML = `<p>You can now investigate the URL.</p>`;
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function showUrlParts() {
    // Hide the investigation table and button
    document.getElementById('investigation-table').style.display = 'none';
    document.getElementById('investigate-button').classList.add('hidden');

    // Show URL parts
    document.getElementById('url-parts-container').classList.remove('hidden');
}

function showSecurityTips() {
    $('#securityTipsModal').modal('show');
}
// Load the Lottie animation
var httpsAnimation = lottie.loadAnimation({
    container: document.getElementById('https-animation'), // the DOM element that will contain the animation
    renderer: 'svg', // render as SVG
    loop: true, // loop the animation
    autoplay: true, // start playing the animation
    path: 'https.json' // the path to your JSON animation
});


function showModal(part) {
    let explanation;

    switch (part) {
        case 'https://':
            explanation = "HTTPS (Hypertext Transfer Protocol Secure) is a method used to exchange data securely over the internet. It is more secure than HTTP because it encrypts your data, ensuring that the connection between the website and your browser is protected from interception. Websites that use HTTPS display 'https://' in the URL and show a lock icon in the browser. This indicates that the website is legitimate and your information is secure. Understanding HTTPS is essential for safe browsing on the internet.";
            playAudio('./audio/HTTPS English.mp3'); // Specify the audio for HTTPS
            break;
        case 'scholarship':
            explanation = "Scholarship is a domain. Domains are unique names used to identify websites on the internet. Each domain has its own address, making it easier for users to remember and access. For example, names like 'example.com' or 'instagram.com' are examples of domains.";
            playAudio('./audio/domain English.mp3'); // Specify the audio for Domain
            break;
        case '.com':
            explanation = "The domain Instagram.com is legitimate and official. Its URL is https://www.instagram.com, where the use of 'https://' indicates a secure connection. The lock icon in the browser assures that this site is safe. Since Instagram is managed by Meta Platforms Inc., its purposes and services are trustworthy. All these elements help identify Instagram.com as a legitimate and secure website. This is the top-level domain (TLD), indicating the type of entity associated with the domain.";
            playAudio('./audio/domain English2.mp3'); // Specify the audio for TLD
            break;
        default:
            explanation = "Unknown part.";
    }

    const generalExplanation = `
            <h6>How to Recognize a Legitimate URL:</h6>
            <p>A legitimate URL typically includes:</p>
            <ul>
                <li><strong>HTTPS:</strong> Indicates a secure connection. Always check for 'https://' at the start of the URL.</li>
                <li><strong>Domain Name:</strong> The main part of the website address (e.g., 'scholarship' in this case).</li>
                <li><strong>Top-Level Domain (TLD):</strong> Common TLDs include '.com', '.org', '.net', etc. Check if the TLD is legitimate.</li>
            </ul>
            <p>Be cautious of URLs that have misspellings or unusual characters.</p>
        `;

    document.getElementById('modal-body-content').innerHTML = explanation + generalExplanation;
    $('#urlModal').modal('show');
}

function playAudio(src) {
    const audio = document.getElementById('modal-audio');
    audio.src = src;
    audio.play();
}