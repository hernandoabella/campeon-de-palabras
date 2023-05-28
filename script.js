const words = ["Hello", "World", "Game", "Font", "Play"];
const cards = document.querySelectorAll(".card");
const input = document.getElementById("input");
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
let timer;
let timeLeft = 5; // Tiempo en segundos

// Mostrar palabras durante 5 segundos
function showWords() {
  cards.forEach((card, index) => {
    card.textContent = words[index];
  });

  timerElement.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      cards.forEach(card => {
        card.textContent = "";
      });
      startGame();
    }
  }, 1000); // Actualizar el temporizador cada segundo (1000 ms)
}

// Iniciar el juego después de que las palabras se oculten
function startGame() {
  input.value = "";
  input.disabled = false;
  input.focus();

  input.addEventListener("input", checkInput);
}

// Verificar la entrada del usuario
function checkInput() {
  const userInput = input.value.trim().toLowerCase();
  const currentWord = words[0].toLowerCase();

  if (userInput === currentWord) {
    words.shift();

    if (words.length === 0) {
      endGame(true); // Todas las palabras se han ingresado correctamente
    } else {
      input.value = "";
    }
  }
}

// Finalizar el juego
function endGame(completed) {
  clearInterval(timer);
  input.disabled = true;
  input.removeEventListener("input", checkInput);

  if (completed) {
    alert("¡Has ingresado todas las palabras correctamente en el tiempo dado!");
  } else {
    alert("¡El tiempo ha terminado! No has ingresado todas las palabras.");
  }
}

startButton.addEventListener("click", showWords);
