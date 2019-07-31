window.addEventListener('load', init);

// DOM elements
const presentTime = document.querySelector('#time');
const presentScore = document.querySelector('#score');
const wordInput = document.querySelector('#textInput');
const presentWord = document.querySelector('#Current-word')
const feedback = document.querySelector('#feedback');
const seconds = document.querySelector('#seconds')
const difficulty = document.querySelector('#diff')


// Available levels
const levels = {
  easy: 6,
  medium: 4,
  hard: 2
}

// To change the levels
let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;


const words = ['javascript', 'nutrition', 'establishment', 'occurrence',
  'significance', 'physically', 'unbearable', 'unbalanced', 'temperament',
  'investigate', 'horrendous', 'nincompoop', 'naturalist', 'inquisition',
  'accountant', 'accomplice', 'accidental', 'accusation', 'accusingly',
  'activities', 'typewriter', 'typography', 'additional', 'adaptation',
  'occasional', 'observance', 'retrospect', 'hexagonal', 'spiritualy',
  'physically', 'materially', 'cartilage', 'cartographer', 'demonstrate'
]

function init() {
  // Change the time to complete the game  depending on the level
  seconds.innerHTML = currentLevel
  
  // Loads the word from array
  showWord(words);
  
  // match word on word input
  wordInput.addEventListener('input', startMatch)
  
  // check the difficulty the player is on
  // checkDifficulty();
  
  // Calls the countDown every second
  setInterval(countDown, 1000);
  setInterval(checkStatus, 50);
}


// function checkDifficulty() {
//   if (difficulty.value === "medium") {
//     time = levels.medium;
//     currentLevel = 4
//   } else if(difficulty.value === "hard") {
//     time = levels.hard;
//     currentLevel = 2
//   } else {
//     time = levels.easy;
//     currentLevel = 6
//   }
// }

function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score += 2;
  }

  // If score is -2 display 0. You don't want to see -2  ;-)
  if (score === -2) {
    presentScore.innerHTML = 0
  } else {
    presentScore.innerHTML = score;
  }
}

// Match current word with the  present Word input
function matchWord() {
  if (wordInput.value === presentWord.innerHTML) {
    feedback.innerHTML = "Correct!!!";
    return true;
  } else {
    feedback.innerHTML = "";
    return false;
  }
}


function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  presentWord.innerHTML = words[randIndex]
}

function countDown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  presentTime.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    // feedback.innerHTML = "Game Over!";
    gameOver()
  }
}

function gameOver() {
  if (time === 0) {
    feedback.innerHTML = "Game Over! " + "Your score is " + score;
    presentScore.innerHTML = 0;
  }
}
