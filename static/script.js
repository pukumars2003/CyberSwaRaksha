let score = 0;

function completeLevel(level) {
    const levelDiv = document.getElementById(`level${level}`);
    const statusSpan = levelDiv.querySelector('.status');
    const button = levelDiv.querySelector('button'); // Get the button

    // Check if level is already completed
    if (statusSpan.textContent !== 'Completed') {
        score += 100; // Increase score for completing a level
        document.getElementById('score').textContent = score; // Update score display
        statusSpan.textContent = 'Completed'; // Mark level as completed
        levelDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Change color to indicate completion

        // Change button text to "Replay"
        button.textContent = 'Replay';
    }
}

function playLevel(level) {
    // Logic to start the level can go here
    alert(`Starting/replaying Level ${level}`);
    // For now, just an alert; implement actual level start logic here.
}
