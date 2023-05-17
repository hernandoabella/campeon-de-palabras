// Available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1,
};

// To change levels
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

// Word array
const words = [
  "width",
  "unlikely",
  "acceptable",
];

// Initialize Game
const initializeGame = () => {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showRandomWord(words);
  // Start matching on word inputs
  wordInput.addEventListener("input", handleMatch);
  // Call countdown every second
  setInterval(startCountdown, 1000);
  // Check game status
  setInterval(checkGameStatus, 50);
};

// Start Match
const handleMatch = () => {
  if (isWordMatch()) {
    isPlaying = true;
    time = currentLevel + 1;
    showRandomWord(words);
    wordInput.value = "";
    updateScore(1);
  } else {
    clearMessage();
  }
};

// Check if word matches input
const isWordMatch = () => {
  const matched = wordInput.value === currentWord.innerHTML;
  message.innerHTML = matched ? "Correct!" : "";
  return matched;
};

// Pick and show random word
const showRandomWord = (words) => {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
};

// Countdown timer
const startCountdown = () => {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
};

// Check game status
const checkGameStatus = () => {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!";
    updateScore(-1);
  }
};

// Update score
const updateScore = (increment) => {
  score += increment;
  scoreDisplay.innerHTML = (score === -1) ? 0 : score;
};

// Clear message
const clearMessage = () => {
  message.innerHTML = "";
};

// Restart game
const restartGame = () => {
  const confirmRestart = confirm("Are you sure you want to restart the game?");
  if (confirmRestart) {
    time = currentLevel;
    score = 0;
    isPlaying = false;
    clearMessage();
    showRandomWord(words);
    wordInput.value = "";
    scoreDisplay.innerHTML = 0;
    timeDisplay.innerHTML = currentLevel;
  }
};

const dialogBox = document.getElementById("dialog-box");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const restartBtn = document.getElementById("restart-btn");

openBtn.addEventListener("click", () => {
  dialogBox.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  dialogBox.style.display = "none";
});

restartBtn.addEventListener("click", () => {
  restartGame();
});

// Initialize the game
initializeGame();