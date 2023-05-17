document.addEventListener('DOMContentLoaded', function() {
  const currentWord = document.querySelector('.current-word');
  const wordInput = document.getElementById('word-input');
  const message = document.getElementById('message');
  const countdownDisplay = document.getElementById('countdown');
  const scoreDisplay = document.getElementById('score');
  const startButton = document.getElementById('start-btn');
  const levelButtons = document.querySelectorAll('input[name="level"]');

  let time = 0;
  let score = 0;
  let isPlaying = false;
  let words = [];
  let currentLevel = 'easy';
  let countdownInterval;

  // Initialize game
  function init() {
    // Set event listeners
    startButton.addEventListener('click', startGame);
    wordInput.addEventListener('input', checkWordMatch);
    levelButtons.forEach(function(button) {
      button.addEventListener('change', function() {
        currentLevel = this.value;
      });
    });

    // Load words based on selected level
    loadWords();

    // Update UI
    updateScore();
    updateCountdown();
  }

  // Load words based on selected level
  function loadWords() {
    switch (currentLevel) {
      case 'easy':
        words = [
          'width',
          'unlikely',
          'acceptable',
        ];
        time = 5;
        break;
      case 'medium':
        words = [
          'javascript',
          'programming',
          'challenge',
        ];
        time = 3;
        break;
      case 'hard':
        words = [
          'magnificent',
          'complicated',
          'exquisite',
        ];
        time = 1;
        break;
    }

    currentWord.textContent = getRandomWord();
  }

  // Start the game
  function startGame() {
    if (isPlaying) {
      return;
    }

    isPlaying = true;
    wordInput.disabled = false;
    wordInput.value = '';
    wordInput.focus();
    startButton.style.display = 'none';
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Check if typed word matches the current word
  function checkWordMatch() {
    if (!isPlaying) {
      return;
    }

    if (wordInput.value === currentWord.textContent) {
      message.textContent = '¡Correcto!';
      score++;
      updateScore();
      wordInput.value = '';
      currentWord.textContent = getRandomWord();
    }
  }

  // Update score display
  function updateScore() {
    scoreDisplay.textContent = score;
  }

  // Update countdown display and check game over condition
  function updateCountdown() {
    countdownDisplay.textContent = time;

    if (time === 0) {
      clearInterval(countdownInterval);
      isPlaying = false;
      wordInput.disabled = true;
      startButton.style.display = 'block';
      startButton.textContent = 'Reiniciar Juego';
      message.textContent = '¡Juego terminado! Puntuación final: ' + score;
    } else {
      time--;
    }
  }

  // Get a random word from the words array
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Initialize the game
  init();
});
