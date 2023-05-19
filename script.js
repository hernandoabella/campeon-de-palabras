window.onload = init;

// Globals
const levels = {
  easy: 5,
  medium: 3,
  hard: 1,
};

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

// Word array
const words = ["juego", "amabilidad", "pasion", "comprension", "amor"];

// Initialize Game
function init() {
  showWord(words);
  wordInput.addEventListener("input", handleInput);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

// Start Match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  scoreDisplay.innerHTML = score === -1 ? 0 : score;
}

// Match current word to word input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "¡Correcto!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick and show random word
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "¡Juego terminado!";
    score = -1;
  }
}

// Handle input
function handleInput() {
  const input = wordInput.value;
  const current = currentWord.innerHTML;
  let coloredText = "";

  for (let i = 0; i < current.length; i++) {
    const isCorrect = input[i] === current[i];
    const color = isCorrect ? "green" : "red";
    coloredText += `<span style="color: ${color};">${current[i]}</span>`;
  }

  currentWord.innerHTML = coloredText;
}
