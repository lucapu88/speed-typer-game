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
const heroScore = document.getElementById('hero');
const deleteAllScores = document.getElementById('delete-all-scores'); //pulsante che resetta il localStorage
const showRanking = document.getElementById('show-ranking');
const quit = document.getElementById('quit-game'); //per mostrare/nascondere il pulsante che ferma il gioco
const languages = document.getElementById('languages');
const audio = document.getElementById('audio');
const countdownBeforeStarting = document.getElementById(
  'countdownBeforeStarting'
); //per il conto alla rovescia prima che parte il gioco
const handsOnKeyboard = document.getElementById('hands-on-keyboard'); //tag p che indica di mostrare le mani sulla tastiera
const imgHandsOnKeyboard = document.getElementById('img-hands-on-keyboard'); //tag img che indican di mostrare le mani sulla tastiera
const difficultyChoise = document.getElementById('difficulty-choise'); //per stampare la difficoltà scelta sul game over
const timeChoise = document.getElementById('time-choise'); //per stampare il tempo scelto sul game over
const loremIpsumAPI = 'https://random-word-api.herokuapp.com/word?number=900';
const alternLoremIpsumAPI = 'http://www.mieliestronk.com/corncob_lowercase.txt';
const noDifficulty = document.getElementById('no-difficulty-in-exercise-mode'); //div contenente il pulsante di info della modalità esercitazione
const infoSentences = document.getElementById('info-sentences');

let wordToDisplay = document.getElementById('word-to-display'); //parola che viene mostrata
let timer = '60';
let countdown = '60';
let wordToPrint = ''; //serve sempre per la parola che viene mostrata
let initialScore = 0;
let finalScore = 0;
let showHelper = false; //per le impostazioni
let audioPlay = false; //per la musica
let difficultySelect = easy; //serve per impostare l'array con le parole
let difficultyName = 'easy'; //serve per impostare la difficoltà nella classifica
let languageExerciseInfoAlert = window.englishAlert;
let languageSentenceInfoAlert = window.sentenceEnglishAlert;
//   _   _    ___     ______    _    ____
//  | \ | |  / \ \   / / __ )  / \  |  _ \
//  |  \| | / _ \ \ / /|  _ \ / _ \ | |_) |
//  | |\  |/ ___ \ V / | |_) / ___ \|  _ <
//  |_| \_/_/   \_\_/  |____/_/   \_\_| \_\

//SELEZIONE DELLA DURATA
const selectTimeInput = document.querySelector('.select-time');
selectTimeInput.addEventListener('change', setTimer);

function setTimer(selected) {
  countdown = timer = selected.target.value;

  if (
    selected.target.value != 60 &&
    selected.target.value != 30 &&
    selected.target.value != 'free' &&
    selected.target.value != 'long-free'
  ) {
    //se un utente prova a barare inserendo manualmente nell'html un tempo diverso, ricarico la pagina e gli auguro una diarrea.
    reloadGame();
  }

  if (timer === 'free' || timer === 'long-free') {
    //se non scelgo un tempo ma voglio solo esercitarmi
    //nascondo la select delle difficoltà e mostro un pulsante di info
    difficulty.style.display = 'none';
    noDifficulty.style.display = 'flex';
  } else {
    //mostro la select delle difficoltà e nascondo un pulsante di info
    difficulty.style.display = 'inline-block';
    noDifficulty.style.display = 'none';
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
      selectHeroDifficulty(false);
      break;
    case '1':
      difficultySelect = window.medium;
      difficultyName = 'medium';
      selectHeroDifficulty(false);
      break;
    case '2':
      difficultySelect = window.hard;
      difficultyName = 'hard';
      selectHeroDifficulty(false);
      break;
    case '3':
      difficultySelect = window.hero;
      difficultyName = 'hero';
      selectHeroDifficulty(true);
      break;

    default:
      difficultySelect = window.easy;
      difficultyName;
      break;
  }
}

//NEL CASO SCELGO DIFFICOLTA' HERO NON POSSO IMPOSTARE 30 SECONDI
function selectHeroDifficulty(bool) {
  return (
    !bool ? (selectTime.disabled = false) : (selectTime.disabled = true),
    (selectTime.value = 60),
    selectTime.dispatchEvent(new Event('change'))
  );
}

//SE UN UTENTE INSISTE NEL VOLER CAMBIARE IL TEMPO DELLA DIFFICOLTÀ HERO (CHE NON SI PUÒ CAMBIARE)
let numberClicks = 0; //tengo conto dei click
function noChangeTimeWithHero() {
  /*è un pò contorta: per rendere meno invadente l'alert, se è stata scelta la difficoltà hero
    incremento numberClicks e se l'utente clicca più di una volta sulla select del cambio tempo
    appare un alert che spiega che il tempo non si può cambiare in difficoltà hero.*/
  if (difficultyName === 'hero') {
    numberClicks++;
    if (numberClicks > 1) {
      alert(
        'HERO Difficulty: Time is only 60 seconds to avoid nervous breakdowns and PC launched from the window.\nBe a good boy.'
      );
      numberClicks = 0;
    }
  }
}

//QUANDO IMPOSTO 'EXERCISE' INVECE DEL TEMPO
function exerciseModeStart() {
  const info = document.getElementById('info');
  info.classList.add('exercise');

  let randomWords = prepareWordsForPractice(loremIpsumAPI);
  randomWords.then((res) => {
    difficultySelect = res;
    return shootWords(res);
  });
}

//QUANDO IMPOSTO 'SENTENCES'
function sentencesModeStart() {
  averageTimesForLetters.splice(0, averageTimesForLetters.length);

  randomSentence = createSentence();
  const info = document.getElementById('info');
  info.classList.add('exercise');
  infoSentences.style.display = 'block';
  difficultySelect = null;
  const encloseWordsOfSentenceInSpan = randomSentence.map(
    (el) => `<span class="${el}" id="${el}">${el}</span>`
  );
  //a display faccio vedere la frase invece della parola
  wordToDisplay.classList.add('sentences-to-display');
  wordToDisplay.innerHTML = encloseWordsOfSentenceInSpan.join(' ');
}

//QUANDO CLICCO SUL PULSANTE "I" CON MODALITÀ EXERCISE O MODALITÀ SENTENCES
function showExerciseModeExplanation() {
  if (timer === 'free') alert(languageExerciseInfoAlert);
  if (timer === 'long-free') alert(languageSentenceInfoAlert);
}

//   __  __    _    ___ _   _
//  |  \/  |  / \  |_ _| \ | |
//  | |\/| | / _ \  | ||  \| |
//  | |  | |/ ___ \ | || |\  |
//  |_|  |_/_/   \_\___|_| \_|

//AL CLICK SUL PULSANTE START PARTE IL CONTO ALLA ROVESCIA
let count = 4;
function threeTwoOneCountdown() {
  const countNumber = document.getElementById('count-number');
  if (count > 1) {
    beforeStarting.style.display = 'none';
    countdownBeforeStarting.style.display = 'flex';
    count--;
    countNumber.textContent = count;
    setTimeout(threeTwoOneCountdown, 1000);
  } else {
    playGame();
  }
}

//A FINE CONTO ALLA ROVESCIA PARTE IL GIOCO
function playGame() {
  inputText.value = '';
  newScore.innerText = '';
  countdownBeforeStarting.style.display = 'none';
  gameStarted.style.display = 'block';
  timeInterval = setInterval(updateTime, 1000);
  startWithModeSelected();
  inputText.focus();
  score.textContent = 0;
  difficulty.disabled = true;
  selectTime.disabled = true;
  quit.style.display = 'inline-block';
  changeMusic('play');
}

function startWithModeSelected() {
  if (timer === 'free') {
    exerciseModeStart();
  } else if (timer === 'long-free') {
    sentencesModeStart();
  } else {
    shootWords(difficultySelect);
  }
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

//EVITO CHE QUALCHE FURBETTO COGLIONCELLO PROVI A BARARE ;-)
const source = document.querySelector('.word-to-display');

source.addEventListener('copy', (event) => {
  const shit = String.fromCodePoint(0x1f4a9);
  event.clipboardData.setData(
    'text/plain',
    `${shit}${shit}DON'T CHEAT${shit}${shit}`
  );
  event.preventDefault();
});

// CONFRONTA CIO' CHE SCRIVIAMO CON CIO' CHE CI VIENE MOSTRATO
inputText.addEventListener('keyup', compareWords);
inputText.addEventListener('touchend', compareWords);

function compareWords(e) {
  const writtenWord = e.target.value;
  const wordToPrintLowercase = wordToPrint.toLowerCase();
  const writtenWordLowercase = writtenWord.toLowerCase().trim();

  if (wordToPrintLowercase === writtenWordLowercase && timer !== 'long-free') {
    //in qualsiasi caso visualizzo la parola e se l'azzecco resetta l'input, ne spara un'altra e aumenta il punteggio
    shootWords(difficultySelect);
    inputText.value = '';
    initialScore++;
    score.textContent = initialScore;
    inputText.style.border = 'none';
  }

  if (timer === 'long-free') {
    //se ho scelto la modalità sentences
    ifIsSentence(writtenWordLowercase);
  }

  reportWrongWord(wordToPrintLowercase, writtenWordLowercase);
}

//SE SONO IN MODALILTÀ FRASE
let arrayToCalculateWordTime = [];

let seconds = 0;
function incrementSeconds() {
  seconds += 1;
}

totalTimeOfSentence = [];
function stopTimer(wordLength) {
  clearInterval(startTimerForSingleWord);
  calcAverageTimesForLetters(wordLength);

  totalTimeOfSentence.push(seconds);
  arrayToCalculateWordTime.splice(0, arrayToCalculateWordTime.length); //resetto l'array
  seconds = 0;
}

averageTimesForLetters = [];
function calcAverageTimesForLetters(wordLength) {
  const averageTimePerLetter = seconds / wordLength;
  averageTimesForLetters.push(averageTimePerLetter);
}

function calcLettersPerSecond() {
  const letterPerSecond =
    averageTimesForLetters.reduce(mySum) / averageTimesForLetters.length;

  const spanSpeedLettersContainer = document.getElementById('speed-letters');
  spanSpeedLettersContainer.innerText = `${letterPerSecond.toFixed(
    5
  )} letter per second`;
}

function calcWordsPerMinute() {
  const sentenceLenght = createSentence().length;
  const timeSpentOn = totalTimeOfSentence.reduce(mySum);
  const wordPerMinute = sentenceLenght / timeSpentOn;

  const spanSpeedWordsContainer = document.getElementById('speed-words');
  spanSpeedWordsContainer.innerText = `${wordPerMinute.toFixed(
    4
  )} word per second`;
}

function mySum(total, num) {
  return total + num;
}

function ifIsSentence(writtenWordLowercase) {
  const cloneOfrandomSentence = randomSentence;

  if (inputText.value !== '') inputText.style.backgroundColor = 'white';

  /*se scrivo qualcosa nell'input, la pusho nell'array e quindi parte il timer 
    che si fermerà successivamente solo se la parola è corretta (e così via per ogni parola)*/
  arrayToCalculateWordTime.push(writtenWordLowercase);
  if (arrayToCalculateWordTime.length === 1) {
    startTimerForSingleWord = setInterval(incrementSeconds, 1000);
  }

  cloneOfrandomSentence.forEach((w, i) => {
    /*ogni volta che elimino una parola dall'array, la parola successiva avrà indice 0, 
      quindi la elimino solo se ha indice 0, per far si che si segua la frase e non si elimino parole a cazzo*/
    if (w === writtenWordLowercase && i === 0) {
      //PAROLA GIUSTA
      inputText.value = '';
      document.getElementById(w).classList.remove('wrong');
      document.getElementById(w).classList.add('correct');
      cloneOfrandomSentence.splice(i, 1);
      stopTimer(w.length);
    }
    if (
      w !== writtenWordLowercase &&
      i === 0 &&
      writtenWordLowercase.length >= w.length
    ) {
      //PAROLA SBAGLIATA
      inputText.value = '';
      document.getElementById(w).classList.add('wrong');
    }
  });

  if (cloneOfrandomSentence.length === 0) {
    //se l'array con la frase è svuotato, vuol dire che è stata completata correttamente e quindi calcolo velocità e cambio frase
    calcLettersPerSecond();
    calcWordsPerMinute();
    sentencesModeStart();
    totalTimeOfSentence.splice(0, totalTimeOfSentence.length);
  }
}

function reportWrongWord(wordToPrint, writtenWord) {
  //se con modalità Exercise sbaglio una parola, segnala con box-shadow rosso sull'input
  if (
    timer === 'free' &&
    wordToPrint !== writtenWord &&
    writtenWord.length >= wordToPrint.length
  ) {
    inputText.style.boxShadow = '0px 0px 17px 10px rgba(197,0,0,1)';
  } else if (timer === 'free' && wordToPrint === writtenWord) {
    //se azzecco la parola fa la stessa cosa, ma con input verde
    inputText.style.boxShadow = '0px 0px 17px 10px rgba(61,214,0,1)';
  } else {
    inputText.style.boxShadow = 'none';
  }

  //se con difficoltà hero sbaglio una parola, resetta l'input, segnala con bordo rosso e diminuisce il punteggio
  if (
    initialScore !== 0 &&
    difficultyName === 'hero' &&
    wordToPrint !== writtenWord &&
    writtenWord.length >= wordToPrint.length
  ) {
    inputText.style.border = '4px solid red';
    inputText.value = '';
    initialScore--;
    score.textContent = initialScore;
  }
}

//FINE GIOCO
function gameOver() {
  count = 4;
  changeMusic('gameOver');
  time.innerHTML = '';
  inputText.value = '';
  countdown = timer;
  initialScore = 0;
  onGameOverChangeHtml();
  difficultyName != 'hero' && (selectTime.disabled = false);
}

function onGameOverChangeHtml() {
  score.textContent = 0;
  startGame.textContent = 'Retry';
  gameOverText.textContent = 'GAME OVER';
  totalScoreText.textContent = `Your score: ${finalScore}`;
  difficultyChoise.textContent = `Difficulty: ${difficultyName.toUpperCase()}`;
  difficultyName != 'hero' &&
    (timeChoise.textContent = `Time: ${+timer} seconds`);
  gameStarted.style.display = 'none';
  handsOnKeyboard.style.display = 'none';
  beforeStarting.style.display = 'flex';
  imgHandsOnKeyboard.style.display = 'none';
  difficulty.disabled = false;
}

function changeMusic(params) {
  switch (params) {
    case 'play':
      audio.loop = true;
      if (audioPlay) audio.src = 'sounds/Pokemon-gldSilverCrystal-Battle.mp3';
      if (audioPlay && difficultyName === 'hero')
        audio.src = 'sounds/Pokemon-DiamondPearlPlatinum-Bat.mp3';
      if (audioPlay && timer === 'free')
        audio.src = 'sounds/Bubble_Bobble-Main Theme.mp3';
      if (audioPlay && timer === 'long-free')
        audio.src = 'sounds/Super-Mario-Bros.mp3';
      break;

    case 'gameOver':
      if (audioPlay) {
        audio.src = 'sounds/Super-Mario-Game-Over.mp3';
        audio.loop = false;
      }
      break;
  }
}

//MODALITÀ ESERCITAZIONE
async function prepareWordsForPractice(url) {
  return fetch(url)
    .then((results) => {
      return results.json();
    })
    .then((json) => {
      const finalWordsArray = deleteShortAndDuplicateWords(json);
      return finalWordsArray;
    })
    .catch((err) => {
      ifThereIsAnError(err);
    });
}

function deleteShortAndDuplicateWords(array) {
  let totalWordsArray = [];

  //mi prendo solo le parole con 4 o più lettere ed evito di duplicarle.
  array.forEach((word) => {
    if (word.length >= 4 && !totalWordsArray.includes(word)) {
      totalWordsArray.push(word);
    }
  });

  return totalWordsArray;
}

function ifThereIsAnError(error) {
  const message = `There was an error on the server!
                        ${error},
                        Solution: reload the page or click Quit. 
                        If the problem persists contact the admin at: lucarhcp88@hotmail.it`;
  const errorApi = document.getElementById('error-api');
  const game = document.getElementById('game');

  errorApi.innerText = message;
  errorApi.classList.remove('exercise');
  game.classList.add('exercise');
}

//MODALITÀ PARAGRAFI
function deleteSpecialCharactersAndCreateArray(params) {
  //ricevo un testo enorme,
  const noPunctuation = params.replace(
    /[".,\/#!$?%\^&\*;:{}=\-_`~()]|[\[\]']/g,
    ''
  ); //elimino tutta la punteggiatura e i caratteri speciali,
  const wordsArray = noPunctuation.split(/[, ]+/); //lo trasformo in un array contenente ogni parola come elemento,
  //ritorno solo le parole che hanno almeno 2 lettere
  return wordsArray.filter((w) => w.length >= 2);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createSentence() {
  //testo enorme formattato
  const wordsArrayCreated = deleteSpecialCharactersAndCreateArray(
    window.myText
  );

  const range = getRandomInteger(9, 16);
  //creo un array con una frase che va da un minimo di N parole ad un max di N parole
  const sentence = Array.from({ length: range }, () =>
    wordsArrayCreated[
      Math.floor(Math.random() * wordsArrayCreated.length)
    ].toLowerCase()
  );
  const removeDuplicateWords = [...new Set(sentence)];

  return removeDuplicateWords;
}

//PUNTEGGIO
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

  //HERO
  var totalScoreHero = localStorage.getItem('scoreHero');

  if (+score > +totalScoreHero && +time === 60 && difficulty === 'hero') {
    localStorage.setItem('scoreHero', score);
    newScore.innerText = 'NEW SCORE';
  }
}

//CANCELLA TUTTI I PUNTEGGI
function deleteAll() {
  let text =
    'ARE YOU SURE YOU WANT TO DELETE ALL YOUR SCORES? \n you will not be able to recover them.';

  if (confirm(text) == true) {
    localStorage.removeItem('scoreEasy30');
    localStorage.removeItem('scoreEasy60');
    localStorage.removeItem('scoreMedium30');
    localStorage.removeItem('scoreMedium60');
    localStorage.removeItem('scoreHard30');
    localStorage.removeItem('scoreHard60');
    localStorage.removeItem('scoreHero');
    reloadGame();
  }
}

//   _____ ___   ___ _____ _____ ____
//  |  ___/ _ \ / _ \_   _| ____|  _ \
//  | |_ | | | | | | || | |  _| | |_) |
//  |  _|| |_| | |_| || | | |___|  _ <
//  |_|   \___/ \___/ |_| |_____|_| \_\

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

    const newHeroScore = await localStorage.getItem('scoreHero');
    heroScore.innerHTML = newHeroScore ? newHeroScore : '0';
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

//PARTE/FERMA L'AUDIO E CAMBIA L'ICONA
function toggleAudio() {
  const audioIcon = document.getElementById('audio-icon');
  audio.autoplay = true;
  audioPlay = !audioPlay;

  if (audioPlay) {
    audio.play();
    audioIcon.src = 'img/sound.png';
  } else {
    audio.pause();
    audioIcon.src = 'img/no-sound.png';
  }
}

function reloadGame() {
  window.location.reload();
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

//CAMBIO LINGUA
languages.addEventListener('change', changeLanguage);
function changeLanguage(event) {
  const languageText = document.getElementById('language-text');

  switch (event.target.value) {
    case 'eng':
      languageText.innerHTML = window.english;
      languageExerciseInfoAlert = window.englishAlert;
      languageSentenceInfoAlert = window.sentenceEnglishAlert;
      break;

    case 'ita':
      languageText.innerHTML = window.italiano;
      languageExerciseInfoAlert = window.italianoAlert;
      languageSentenceInfoAlert = window.sentenceItalianoAlert;
      break;

    case 'fra':
      languageText.innerHTML = window.francais;
      languageExerciseInfoAlert = window.francaisAlert;
      languageSentenceInfoAlert = window.sentenceFrancaisAlert;
      break;

    case 'spa':
      languageText.innerHTML = window.espanol;
      languageExerciseInfoAlert = window.espanolAlert;
      languageSentenceInfoAlert = window.sentenceEspanolAlert;
      break;

    case 'deu':
      languageText.innerHTML = window.deutsch;
      languageExerciseInfoAlert = window.deutschAlert;
      languageSentenceInfoAlert = window.sentenceDeutschAlert;
      break;

    default:
      languageText.innerHTML = window.english;
      break;
  }
}

//QUANDO CLICCA SULL'EMAIL COPIA IN AUTOMATICO L'EMAIL
const infoEmail = document.getElementById('info-email');

function copyToClipboard(event) {
  const copiedToClipboard = document.getElementById('copied-to-cliboard');
  const myEmail = event.target.textContent;
  copiedToClipboard.style.display = 'inline-block';
  setTimeout(() => {
    copiedToClipboard.style.display = 'none';
  }, 3000);
  navigator.clipboard.writeText(myEmail);
  //per le altre lingue questa funzione la trovi nel file "fake-db.js" dentro le variabili che contengono le traduzioni.
}
