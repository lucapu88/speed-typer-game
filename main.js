const difficulty = document.getElementById('difficulty'); //tag select scelta difficoltà
const selectTime = document.getElementById('select-time'); //tag select scelta tempo
const startGame = document.getElementById('start'); //button start
const beforeStarting = document.getElementById('before-starting'); //div contenitore pulsante start
const gameStarted = document.getElementById('game-started'); //div contenitore del gioco iniziato
const inputText = document.getElementById('input-text'); // vabbè si sa
const time = document.getElementById('time'); //span dove appare il timer del tempo che resta
const score = document.getElementById('score'); //span dove appare il punteggio in tempo reale
const gameOverText = document.getElementById('game-over-text'); //tag p dove appare la scritta game over
const totalScoreText = document.getElementById('total-score-text'); //tag p dove appare il punteggio totale
const ranking = document.getElementById('ranking'); //div contenitore della classifica
const gameContainer = document.getElementById('game-container'); //primo div nel main contenente il cuore del gioco
const newScore = document.getElementById('new-score'); //span che mostra la scritta nel caso c'è un nuovo record
//qui sotto ci sono gli span all'interno degli <li> della classifica che mostra i punteggi
const easy30 = document.getElementById('easy-30');
const easy60 = document.getElementById('easy-60');
const medium30 = document.getElementById('medium-30');
const medium60 = document.getElementById('medium-60');
const hard30 = document.getElementById('hard-30');
const hard60 = document.getElementById('hard-60');
const deleteAllScores = document.getElementById('delete-all-scores'); //pulsante che resetta il localStorage
const showRanking = document.getElementById('show-ranking');
const quit = document.getElementById('quit-game'); //per mostrare/nascondere il pulsante che ferma il gioco

let wordToDisplay = document.getElementById('word-to-display'); //parola che viene mostrata
let timer = '60';
let countdown = '60';
let wordToPrint = ''; //serve sempre per la parola che viene mostrata
let initialScore = 0;
let finalScore = 0;
let showHelper = false;
//queste 2 sotto servono per impostare la lingua degli array
let italiano = Boolean;
let english = Boolean;

let difficultySelect = easy; //serve per impostare l'array con le parole
let difficultyName = 'easy'; //serve per impostare la difficoltà nella classifica

//SELEZIONE DELLA DURATA
const selectTimeInput = document.querySelector('.select-time');
selectTimeInput.addEventListener('change', setTimer);

function setTimer(selected) {
  //uso uno switch nel caso in futuro aggiungo altre durate
  switch (selected.target.value) {
    case '0':
      countdown = '60';
      timer = '60';
      break;
    case '1':
      countdown = '30';
      timer = '30';
      break;

    default:
      countdown;
      timer;
      break;
  }
}

//SELEZIONE DIFFICOLTA'
const selectDifficultyInput = document.querySelector('.difficulty');
selectDifficultyInput.addEventListener('change', difficultySelected);

function difficultySelected(selectedDiff) {
  switch (selectedDiff.target.value) {
    case '0':
      difficultySelect = window.easy;
      difficultyName = 'easy';
      break;
    case '1':
      difficultySelect = window.medium;
      difficultyName = 'medium';
      break;
    case '2':
      difficultySelect = window.hard;
      difficultyName = 'hard';
      break;

    default:
      difficultySelect = window.easy;
      difficultyName;
      break;
  }
}

//AL CLICK SUL PULSANTE START PARTE IL GIOCO
function playGame() {
  inputText.value = '';
  newScore.innerText = '';
  beforeStarting.style.display = 'none';
  gameStarted.style.display = 'block';
  timeInterval = setInterval(updateTime, 1000);
  shootWords(difficultySelect);
  inputText.focus();
  score.textContent = 0;
  difficulty.disabled = true;
  selectTime.disabled = true;
  quit.style.display = 'inline-block';
}

//TIMER
function updateTime() {
  +countdown--;

  time.innerHTML = countdown + 's';

  if (countdown === 0) {
    clearInterval(timeInterval);
    finalScore = initialScore;
    saveScoreAndTime(finalScore, timer, difficultyName);
    gameOver();
  }
}

//RECUPERA PAROLE CASUALI DA UN ARRAY CHE GLI PASSIAMO
function randomWords(words) {
  return words[Math.floor(Math.random() * words.length)];
}
//IMMETTE LE PAROLE CASUALI CHE L'UTENTE DOVRA' RICOPIARE
function shootWords(array) {
  wordToPrint = randomWords(array);
  wordToDisplay.textContent = wordToPrint;
}

// CONFRONTA CIO' CHE SCRIVIAMO CON CIO' CHE CI VIENE MOSTRATO
inputText.addEventListener('keyup', compareWords);
inputText.addEventListener('touchend', compareWords);

function compareWords(e) {
  const writtenWord = e.target.value;

  if (wordToPrint.toLowerCase() === writtenWord.toLowerCase()) {
    shootWords(difficultySelect);
    inputText.value = '';
    initialScore++;
    score.textContent = initialScore;
  }
}

//FINE GIOCO
function gameOver() {
  time.innerHTML = '';
  inputText.value = '';
  countdown = timer;
  initialScore = 0;
  score.textContent = 0;
  startGame.textContent = 'Retry';
  gameOverText.textContent = 'GAME OVER';
  totalScoreText.textContent = `Your score: ${finalScore}`;
  gameStarted.style.display = 'none';
  beforeStarting.style.display = 'flex';
  difficulty.disabled = false;
  selectTime.disabled = false;
}

function saveScoreAndTime(score, time, difficulty) {
  //EASY 30 SECONDS
  var totalScoreEasy30 = localStorage.getItem('scoreEasy30');

  if (+score > +totalScoreEasy30 && +time === 30 && difficulty === 'easy') {
    localStorage.setItem('scoreEasy30', score);
    newScore.innerText = 'NEW SCORE';
  }
  //EASY 60 SECONDS
  var totalScoreEasy60 = localStorage.getItem('scoreEasy60');

  if (+score > +totalScoreEasy60 && +time === 60 && difficulty === 'easy') {
    localStorage.setItem('scoreEasy60', score);
    newScore.innerText = 'NEW SCORE';
  }

  //MEDIUM 30 SECONDS
  var totalScoreMedium30 = localStorage.getItem('scoreMedium30');

  if (+score > +totalScoreMedium30 && +time === 30 && difficulty === 'medium') {
    localStorage.setItem('scoreMedium30', score);
    newScore.innerText = 'NEW SCORE';
  }
  //MEDIUM 60 SECONDS
  var totalScoreMedium60 = localStorage.getItem('scoreMedium60');

  if (+score > +totalScoreMedium60 && +time === 60 && difficulty === 'medium') {
    localStorage.setItem('scoreMedium60', score);
    newScore.innerText = 'NEW SCORE';
  }

  //HARD 30 SECONDS
  var totalScoreHard30 = localStorage.getItem('scoreHard30');

  if (+score > +totalScoreHard30 && +time === 30 && difficulty === 'hard') {
    localStorage.setItem('scoreHard30', score);
    newScore.innerText = 'NEW SCORE';
  }
  //HARD 60 SECONDS
  var totalScoreHard60 = localStorage.getItem('scoreHard60');

  if (+score > +totalScoreHard60 && +time === 60 && difficulty === 'hard') {
    localStorage.setItem('scoreHard60', score);
    newScore.innerText = 'NEW SCORE';
  }
}

//MOSTRA/NASCONDE LA TABELLA DEI PUNTEGGI
function toggleScore() {
  const init = async () => {
    const newEasy30Score = await localStorage.getItem('scoreEasy30');
    easy30.innerHTML = newEasy30Score ? newEasy30Score : '0';
    const newEasy60Score = await localStorage.getItem('scoreEasy60');
    easy60.innerHTML = newEasy60Score ? newEasy60Score : '0';

    const newMedium30Score = await localStorage.getItem('scoreMedium30');
    medium30.innerHTML = newMedium30Score ? newMedium30Score : '0';
    const newMedium60Score = await localStorage.getItem('scoreMedium60');
    medium60.innerHTML = newMedium60Score ? newMedium60Score : '0';

    const newHard30Score = await localStorage.getItem('scoreHard30');
    hard30.innerHTML = newHard30Score ? newHard30Score : '0';
    const newHard60Score = await localStorage.getItem('scoreHard60');
    hard60.innerHTML = newHard60Score ? newHard60Score : '0';
  };

  init();

  if (!ranking.style.display || ranking.style.display === 'none') {
    gameContainer.style.display = 'none';
    ranking.style.display = 'flex';
  } else {
    gameContainer.style.display = 'block';
    ranking.style.display = 'none';
  }
}

//CANCELLA TUTTI I PUNTEGGI
function deleteAll() {
  let text =
    'ARE YOU SURE YOU WANT TO DELETE ALL YOUR SCORES? \n you will not be able to recover them.';
  confirm(text) == true && (localStorage.clear(), location.reload());
}

function quitGame() {
  location.reload();
}

//MOSTRA/NASCONDE IL RIQUADRO CON LE ISTRUZIONI
function toggleHelper() {
  showHelper = !showHelper;

  if (showHelper) {
    var helper = document.getElementById('helper-description');
    helper.classList.add('slideUp');
    helper.classList.remove('slideDown');

    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
  } else {
    var helper = document.getElementById('helper-description');
    helper.classList.remove('slideUp');
    helper.classList.add('slideDown');

    helper.scrollTo(0, 0);
    document.documentElement.style.overflow = 'auto';
  }
}

// function changeLanguage(value) {
//   const englishValue = document.getElementById('english');
//   const italianoValue = document.getElementById('italiano');

//   if (value.checked && value.name === 'ita') {
//     englishValue.checked = false;
//     italianoValue.checked = true;
//   } else {
//     italianoValue.checked = false;
//     englishValue.checked = true;
//   }
// }
