window.onload = function () {
    const gameContainer = document.querySelector("#game-container");
    const clickContainer = document.querySelector("#click-container");
    const fishingLine = document.querySelector("#line");
    const audio = document.getElementById('intro-audio');
    const startScreen = document.querySelector("#start-screen");
    const startTitle = document.querySelector("#start-title");
    const infoWrapper = document.querySelector("#info-wrapper");
    const instructions = document.querySelector("#instructions");
    const startBtn = document.querySelector("#start-btn");
    const gameStats = document.querySelector("#game-stats");
    const gameGoal = document.querySelector("#game-goal");
    const gameDay = document.querySelector("#game-day");
    const gameTimer = document.querySelector("#game-timer");
    const gameTimerGauge = document.querySelector(".timer-gauge");
    const gameScore = document.querySelector("#game-score");
    var mousePosition = {
        x: 0,
        y: 0
    }

    var gameTimerInterval = null;
    var day = 0;
    var score = 0;
    var currentScore = 0;
    var fishTracker = [0, 0, 0, 0] //first item is fish, second is rare fish, third is trash, fourth is jellyfish. no sharks as it will lead to autolose

    //initialise the create items interval variables
    var createFishInterval = null;
    var createRareFishInterval = null;
    var createTrashInterval = null;
    var createJellyfishInterval = null;
    var createSharkInterval = null;

    var days = [{
        "day": 0,
        "score": 20,
        "instruction": "<p>Hello This is the Simulation of Phishing Work.</p>"
    }, {
        "day": 4,
        "score": 45,
        "instruction": "Sharks have been sighted lately.<br>You have to restart the entire week if you catch them!<br>Let's continue and not provoke them!"
    }];

    //music and sounds
    var bgm; //set bgm
    var blop; //fish sound
    var rareBlop; // rare fish sound
    var trashSound; // trash sound
    var bzzt; //jellyfish zapping sound
    var bite; //shark bite sound

    //event listeners
    console.log(startBtn);
    startButton.addEventListener('click', function () {
        // Play audio
        
            // Start the timer for 15 seconds after the audio starts
            let timeLeft = 1;
            timerDisplay.textContent = `${timeLeft}s`;

            const timerInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `${timeLeft}s`;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    startGame(); // Call the startGame function when timer ends
                }
            }, 1000);

            // Hide the start button
            startButton.style.display = "none";
        })
    
    clickContainer.addEventListener("mousemove", checkCursor);
    clickContainer.addEventListener("touchmove", checkCursor);

    clickContainer.addEventListener("click", hit);
    clickContainer.addEventListener("touchend", hit);


    function getRandomName(type) {
        const names = {
            fish: ['Ajay', 'Darshan', 'Pavan', 'Surya'],
            rareFish: ['Sparkle', 'Glimmer', 'Treasure', 'Shimmer'],
            jellyfish: ['Jelly', 'Wobble', 'Floaty', 'Bouncy'],
            shark: ['Jaws', 'Finn', 'Chomper', 'Sharky'],
            bait: ['Cash', 'Popularity', 'Fame', 'Wealth', 'Luxury', 'Greed', 'Lust', 'Desire'],
            color: ['#003366', '#004080', '#00334d', '#005e99', '#002d3a', '#001f26'],
        };

        const randomIndex = Math.floor(Math.random() * names[type].length);
        return names[type][randomIndex];
    }

    function checkCursor(event) {
        // Prevent default behavior for touch events
        event.preventDefault();

        // Determine the mouse/touch position
        let posX, posY;
        if (event.type === "touchmove") {
            posX = event.touches[0].clientX; // Get the touch position
            posY = event.touches[0].clientY;
        } else {
            posX = event.clientX; // Get mouse position
            posY = event.clientY;
        }

        // Update cursor coordinates
        mousePosition.x = posX;
        mousePosition.y = posY;

        // Set fishing line to follow cursor
        fishingLine.style.left = mousePosition.x + "px";
        fishingLine.style.top = mousePosition.y + "px";

        // Optional: Change the hook name based on proximity to items
        const items = document.querySelectorAll(".item");
        let greedName = ""; // Variable to store the greed name

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(itemRect.left + itemRect.width / 2 - mousePosition.x, 2) +
                Math.pow(itemRect.top + itemRect.height / 2 - mousePosition.y, 2)
            );

            if (distance < 50) { // Adjust threshold as needed
                // Assign a greed-themed name if close to an item
                greedName = getRandomName('bait'); // Use bait names for greed
            }
        });

        // Optionally display the greed name somewhere (e.g., on the fishing line)
        fishingLine.textContent = greedName || "Hook"; // Default to "Hook" if no name
    }

    //create audio element for playing music and sfx
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }

    //start game function
    function startGame() {
        //day = 4;
        //initialise sounds
        console.log("Start game function called!");
        blop = new sound('sfx/fish.mp3');
        rareBlop = new sound('sfx/rare-fish.mp3');
        trashSound = new sound('sfx/trash.mp3');
        bzzt = new sound('sfx/bzzt.mp3');
        bite = new sound('sfx/bite.mp3');
        bgm = new sound('sfx/Phishing Game Audio English.mp3');
        bgm.play();
        if (day === 0) {
            fishTracker = [0, 0, 0, 0, 0];
            score = 0;
        }
        currentScore = 0;
        infoWrapper.style.display = "none";

        startTitle.style.display = "none";
        clickContainer.style.display = "block";
        gameStats.style.display = "flex";
        gameGoal.style.display = "block";
        createItems();
    }
    function createItems() {
        createTimer();
        day++;
        gameDay.innerText = "Day 0" + day;
        gameGoal.innerText = `Goal: ${currentScore}/${days[day - 1].score}`;
        // Adjust the intervals here
        switch (day) {
            case 1:
                createFishInterval = setInterval(createFish, 500); // Slowed down
                break;

            case 2:
                createFishInterval = setInterval(createFish, 400); // Slowed down
                createRareFishInterval = setInterval(createRareFish, 1500); // Slowed down
                createJellyfishInterval = setInterval(createJellyfish, 2500); // Slowed down
                createSharkInterval = setInterval(createShark, 6000); // Slowed down
                break;
        }
    }

    //create timer function
    function createTimer() {
        gameTimer.innerText = "25s";
        gameScore.innerText = "Total Score: 0";
        let sec = 0;
        gameTimerInterval = setInterval(startGameTimer, 1000);
        function startGameTimer() {
            gameTimer.textContent = 25 - sec + "s";
            if (sec === 25) {
                sec = 0;
                endDay(false);
                gameTimer.textContent = 25 - sec + "s";
                gameTimer.classList.remove("warning");
                gameTimerGauge.classList.remove("ticking");
            }
            else {
                if (sec === 1) {
                    gameTimerGauge.classList.add("ticking");
                }
                if (sec > 9) {
                    gameTimer.classList.add("warning");
                }
                sec++
            }
        }
    }
    // Modify the createFish function
    function createFish() {
        let fish = document.createElement("div");
        fish.classList.add("item", "fish");
        fish.textContent = getRandomName('fish'); // Assign a random name
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("mouseover", hit);
        setTimeout(function () {
            if (!fish.classList.contains("caught")) {
                fish.classList.add("disappear");
            }
            setTimeout(function () {
                if (clickContainer.contains(fish)) {
                    clickContainer.removeChild(fish);
                }
            }, 350);
        }, 1000);
    }

    // Modify the createRareFish function
    function createRareFish() {
        let fish = document.createElement("div");
        fish.classList.add("item", "rare-fish");
        fish.textContent = getRandomName('rareFish'); // Assign a random name
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("mouseover", hit);
        setTimeout(function () {
            if (!fish.classList.contains("caught")) {
                fish.classList.add("disappear");
            }
            setTimeout(function () {
                if (clickContainer.contains(fish)) {
                    clickContainer.removeChild(fish);
                }
            }, 350);
        }, 650);
    }




    function setPosition(item) {
        let leftPos = Math.floor(Math.random() * (clickContainer.offsetWidth - 100));
        let topPos = Math.floor(Math.random() * ((clickContainer.offsetHeight / 5 * 4) - 100) + (clickContainer.offsetHeight / 5));
        if (!item.classList.contains("trash")) {
            let randomNum = Math.floor(Math.random() * 2);
            if (randomNum % 2 === 0) {
                // left side movement
                setInterval(function () {
                    if (item.classList.contains("fish")) {
                        leftPos += 15; // Slowed down
                    } else if (item.classList.contains("rare-fish")) {
                        leftPos += 25; // Slowed down
                    }
                    item.style.left = leftPos + "px";
                    item.style.top = topPos + "px";
                }, 150); // Slowed down
                item.classList.add("left");
            } else {
                // right side movement
                setInterval(function () {
                    if (item.classList.contains("fish")) {
                        leftPos -= 15; // Slowed down
                    } else if (item.classList.contains("rare-fish")) {
                        leftPos -= 25; // Slowed down
                    }
                    item.style.left = leftPos + "px";
                    item.style.top = topPos + "px";
                }, 150); // Slowed down
                item.classList.add("right");
            }
            item.style.left = leftPos + "px";
            item.style.top = topPos + "px";
        } else {
            item.style.left = leftPos + "px";
            item.style.top = topPos + "px";
        }
    }

    function hit(event) {
        const item = event.target;
        if (!fishingLine.classList.contains("zapped")) {
            let type = item.classList;
            let hitText = document.createElement('span');
            hitText.setAttribute('class', 'hit-text');
            this.parentNode.insertBefore(hitText, this);
            hitText.style.left = item.style.left;
            hitText.style.top = item.style.top;

            if (!item.classList.contains("caught")) {
                item.classList.add("caught");
                if (type.contains("fish")) {
                    hitText.innerText = "+1 (Caught " + getRandomName('bait') + ")"; // Add greed name
                    hitText.style.color = getRandomName('color');
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("rare-fish")) {
                    hitText.innerText = "+5 (Caught " + getRandomName('bait') + ")"; // Add greed name
                    hitText.style.color = "#9766d3";
                    rareBlop.play();
                    score += 5;
                    currentScore += 5;
                    fishTracker[1]++;
                }
                else if (type.contains("jellyfish")) {
                    fishingLine.classList.add("zapped");
                    clickContainer.classList.add("zapped");
                    hitText.innerText = "zap!";
                    bzzt.play();
                    hitText.style.color = "#ffff33";
                    fishTracker[2]++;
                    setTimeout(function () {
                        fishingLine.classList.remove("zapped");
                        clickContainer.classList.remove("zapped");
                    }, 2000);
                }
                else if (type.contains("shark")) {
                    bite.play();
                    endDay(true);
                    sec = 0;
                }
                setTimeout(function () {
                    clickContainer.removeChild(hitText);
                }, 1000);
                gameScore.innerText = `Total Score: ${score}`;
                gameGoal.innerText = `Goal: ${currentScore}/${days[day - 1].score}`;
            }
        }
    }
    function endDay(died) {
        bgm.stop();
        clearInterval(gameTimerInterval);
        clearInterval(createFishInterval);
        clearInterval(createRareFishInterval);
        clearInterval(createTrashInterval);
        clearInterval(createJellyfishInterval);
        clearInterval(createSharkInterval);
        let remainingItems = document.querySelectorAll(".item");
        for (var i = 0; i < remainingItems.length; i++) {
            clickContainer.removeChild(remainingItems[i]);
        }
        gameStats.style.display = "none";
        clickContainer.style.display = "none";
        gameGoal.style.display = "none";
        //startBtn.style.top = "66%";

        if (!died) {
            // Only one day, so no need for day counter
            console.log(`Day 01`);
            if (currentScore <= days[0].score) {
                instructions.innerHTML = `<h2>END OF DAY 01</h2>Your score for the day: ${currentScore}</p><p>Your score is not high enough. Please try again!</p>`;
            } else {
                instructions.innerHTML = `<h2>END OF DAY 01</h2>Your score for the day: ${currentScore}</p><p></p>`;
            }
        } else {
            instructions.innerHTML = `<h2>Too bad!</h2><p>You provoked the shark and it destroyed your boat.<br>Your entire day of fishing went to waste!</p>`;
        }

        //infoWrapper.style.display = "block";
        startTitle.style.display = "block";
        setTimeout(() => {
            window.location.href = '../game_level.html';
        }, 5000);

    }

    //Make bubbles
    var bubbles = document.getElementById('bubbles');
    var randomN = function (start, end) {
        return Math.random() * end + start;
    };
    var bubbleNumber = 0,
        generateBubble = function () {
            if (bubbleNumber < 20) {
                var bubble = document.createElement('div');
                var size = randomN(5, 10);
                bubble.setAttribute('style', 'width: ' + size + 'px; height: ' + size + 'px; left:' + randomN(1, bubbles.offsetWidth - (size + 4)) + 'px;');
                bubbles.appendChild(bubble);
                bubbleNumber++;
            }
            else {
                clearInterval(bubbleInterval);
            }
        };
    generateBubble();
    var bubbleInterval = setInterval(generateBubble, 500);

    instructions.innerHTML = `<p>${days[day].instruction}</p>`;
};