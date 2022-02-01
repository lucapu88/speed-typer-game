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
//sotto ci sono gli span all'interno degli <li> della classifica che mostra i punteggi
const easy30 = document.getElementById('easy-30');
const easy60 = document.getElementById('easy-60');
const medium30 = document.getElementById('medium-30');
const medium60 = document.getElementById('medium-60');
const hard30 = document.getElementById('hard-30');
const hard60 = document.getElementById('hard-60');
const deleteAllScores = document.getElementById('delete-all-scores'); //pulsante che resetta il localStorage

let wordToDisplay = document.getElementById('word-to-display'); //parola che viene mostrata
let timer = '60';
let selectedTime = '60';
let wordToPrint = ''; //serve sempre per la parola che viene mostrata
let initialScore = 0;
let finalScore = 0;
let showHelper = false;

const easy = [
  'prova',
  'pippo',
  'pluto',
  'ciao',
  'gatto',
  'cane',
  'lello',
  'lallo',
  'abato',
  'abbai',
  'abbia',
  'bacca',
  'bacco',
  'bachi',
  'bacia',
  'calza',
  'calze',
  'calzi',
  'calzo',
  'dande',
  'dando',
  'dandy',
  'danna',
  'edera',
  'edere',
  'edile',
  'edili',
  'edipo',
  'fallo',
  'falsa',
  'gabba',
  'gabbi',
  'gabbo',
  'gemei',
  'gemma',
  'gemme',
  'lacca',
  'lacci',
  'lacco',
  'mamba',
  'mambo',
  'mamma',
  'mamme',
  'nesto',
  'netta',
  'nette',
  'netti',
  'pacca',
  'pacco',
  'padre',
  'padri',
  'paese',
  'sabba',
  'sabea',
  'sabee',
  'sabei',
  'zoppa',
  'zoppe',
  'zoppi',
  'zoppo',
  'zorro',
];
const medium = [
  'aborro',
  'bacare',
  'cubato',
  'debora',
  'fibbia',
  'labbra',
  'scriba',
  'sbobba',
  'sbirro',
  'tabico',
  'abanese',
  'abarica',
  'ansando',
  'anselma',
  'bandone',
  'bangkok',
  'calamio',
  'calanca',
  'canguro',
  'canizie',
  'dairago',
  'dalmata',
  'eforato',
  'egemone',
  'guaisca',
  'guamano',
  'imbimbo',
  'imborga',
  'ipossia',
  'ipoteca',
  'jogging',
  'kampala',
  'lagnoso',
  'lagundo',
  'maizena',
  'malacca',
  'malanno',
  'malaria',
  'nefrone',
  'nefrosi',
  'negando',
  'negarit',
  'oliario',
  'olibano',
  'olimpia',
  'olimpio',
  'palilie',
  'palizzi',
  'pallade',
  'pallaio',
  'radazza',
  'radendo',
  'radenza',
  'rameico',
  'ramengo',
  'rameoso',
  'rametto',
  'samurai',
  'sanando',
  'sancire',
  'sanctus',
  'sandalo',
  'tallone',
  'talpone',
  'tamburo',
  'tampoco',
  'tampone',
  'tanagra',
  'tananai',
  'uremica',
  'uremico',
  'uretere',
  'urgente',
  'urgenza',
  'vacando',
  'vacanza',
  'vacatio',
  'vaccaio',
  'vaccaro',
  'vaccata',
  'vaccine',
  'vacinai',
  'zaffare',
  'zaffato',
  'zaffiro',
  'xantoma',
  'xerobio',
  'xilosio',
  'zannata',
  'zannuto',
  'zanzara',
  'zappare',
  'zappato',
];
const hard = [
  'abduttore',
  'abduzione',
  'abelmosco',
  'aberrando',
  'belzarini',
  'bendaggio',
  'bendatura',
  'capibarca',
  'capicarro',
  'capicollo',
  'dedicando',
  'dedizione',
  'deducendo',
  'edochiana',
  'edochiano',
  'educabile',
  'educativa',
  'faustismo',
  'favagello',
  'favaretto',
  'favellare',
  'gelazione',
  'gelicidio',
  'gelignite',
  'igienista',
  'ignifughe',
  'ignizione',
  'lanzafama',
  'laocoonte',
  'laodiceno',
  'lapidando',
  'lapidario',
  'kayakista',
  'kellerina',
  'Kurdistan',
  'manlevato',
  'manomesso',
  'manometro',
  'manomorta',
  'neogotico',
  'neoguelfo',
  'neolatino',
  'oceaniana',
  'oceaniano',
  'oceanside',
  'parafuoco',
  'paragocce',
  'paralalia',
  'quantomai',
  'quaresima',
  'quarteria',
  'quartetto',
  'referendi',
  'referendo',
  'referente',
  'saponiero',
  'saprofago',
  'saprofilo',
  'tahitiano',
  'taiwanese',
  'talabacco',
  'ubriacone',
  'uccellaia',
  'uccellaio',
  'uccellare',
  'venagione',
  'venatorio',
  'venceslao',
  'vendemmia',
  'wattmetro',
  'wehrmacht',
  'wisconsin',
  'wrestling',
  'xantopsia',
  'xenofilia',
  'xenofobia',
  'xenogamia',
  'yachtsman',
  'zafferano',
  'zampaccia',
  'zampirone',
  'abbandonare',
  'abbandonata',
  'balbettasti',
  'balbetterai',
  'balbetterei',
  'calamaretto',
  'calambucchi',
  'calamitammo',
  'debordavate',
  'deborderemo',
  'eccitazioni',
  'ecciteranno',
  'fagocitanti',
  'fagocitaria',
  'galoppatore',
  'icnografica',
  'icnografici',
  'jazzistiche',
  'judoistiche',
  'ladroncello',
  'ladronesche',
  'macerassimo',
  'maceratrice',
  'nasolabiali',
  'nastratrice',
  'obbediranno',
  'obbedirebbe',
  'pacatamente',
  'pacchianata',
  'quadernacci',
  'quadernaria',
  'raccattaste',
  'raccattasti',
  'saccentello',
  'saccenteria',
  'tagliassero',
  'tagliassimo',
  'uccidendovi',
  'uccideranno',
  'valicassero',
  'valicassimo',
  'workstation',
  'xantogenata',
  'zampillando',
  'zappettante',
];

let difficultySelect = easy; //serve per impostare l'array con le parole
let difficultyName = 'easy'; //serve per impostare la difficoltà nella classifica

//SELEZIONE DELLA DURATA
function timeSelected(selected) {
  switch (selected.value) {
    case '0':
      selectedTime = '60';
      timer = '60';
      break;
    case '1':
      selectedTime = '30';
      timer = '30';
      break;

    default:
      selectedTime;
      timer;
      break;
  }
}

//SELEZIONE DIFFICOLTA'
function difficultySelected(selectedDiff) {
  switch (selectedDiff.value) {
    case '0':
      difficultySelect = easy;
      difficultyName = 'easy';
      break;
    case '1':
      difficultySelect = medium;
      difficultyName = 'medium';
      break;
    case '2':
      difficultySelect = hard;
      difficultyName = 'hard';
      break;

    default:
      difficultySelect;
      difficultyName;
      break;
  }
}

//AL CLICK SUL PULSANTE START PARTE IL GIOCO
function playGame() {
  newScore.style.display = 'none';
  beforeStarting.style.display = 'none';
  gameStarted.style.display = 'block';
  timeInterval = setInterval(updateTime, 1000);
  shootWords(difficultySelect);
  inputText.focus();
  score.textContent = 0;
  difficulty.disabled = true;
  selectTime.disabled = true;
}

//TIMER
function updateTime() {
  +selectedTime--;

  time.innerHTML = selectedTime + 's';

  if (selectedTime === 0) {
    clearInterval(timeInterval);
    finalScore = initialScore;
    saveScoreAndTime(finalScore, timer, difficultyName);
    gameOver();
  }
}

//IMMETTE LE PAROLE CASUALI DA RICOPIARE
function shootWords(array) {
  for (let index = 0; index < array.length; index++) {
    const randomWord = array[Math.floor(Math.random() * array.length)];
    wordToPrint = randomWord;
  }

  wordToDisplay.textContent = wordToPrint;
}

// CONFRONTA CIO' CHE SCRIVIAMO CON CIO' CHE CI VIENE MOSTRATO
function compareWords() {
  const writtenWord = inputText.value;

  if (wordToPrint === writtenWord) {
    shootWords(difficultySelect);
    inputText.value = '';
    initialScore++;
    score.textContent = initialScore;
  }
}

//FINE GIOCO
function gameOver() {
  time.innerHTML = '';
  selectedTime = timer;
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

  if (
    totalScoreEasy30 === null ||
    (+score > +totalScoreEasy30 && +time === 30 && difficulty === 'easy')
  ) {
    localStorage.setItem('scoreEasy30', score);
  }
  //EASY 60 SECONDS
  var totalScoreEasy60 = localStorage.getItem('scoreEasy60');

  if (
    totalScoreEasy60 === null ||
    (+score > +totalScoreEasy60 && +time === 60 && difficulty === 'easy')
  ) {
    localStorage.setItem('scoreEasy60', score);
  }

  //MEDIUM 30 SECONDS
  var totalScoreMedium30 = localStorage.getItem('scoreMedium30');

  if (
    totalScoreMedium30 === null ||
    (+score > +totalScoreMedium30 && +time === 30 && difficulty === 'medium')
  ) {
    localStorage.setItem('scoreMedium30', score);
  }
  //MEDIUM 60 SECONDS
  var totalScoreMedium60 = localStorage.getItem('scoreMedium60');

  if (
    totalScoreMedium60 === null ||
    (+score > +totalScoreMedium60 && +time === 60 && difficulty === 'medium')
  ) {
    localStorage.setItem('scoreMedium60', score);
  }

  //HARD 30 SECONDS
  var totalScoreHard30 = localStorage.getItem('scoreHard30');

  if (
    totalScoreHard30 === null ||
    (+score > +totalScoreHard30 && +time === 30 && difficulty === 'hard')
  ) {
    localStorage.setItem('scoreHard30', score);
  }
  //HARD 60 SECONDS
  var totalScoreHard60 = localStorage.getItem('scoreHard60');

  if (
    totalScoreHard60 === null ||
    (+score > +totalScoreHard60 && +time === 60 && difficulty === 'hard')
  ) {
    localStorage.setItem('scoreHard60', score);
  }
}

function showScore() {
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
    let newScore = localStorage.getItem('score30');
    easy30.textContent = newScore;
    ranking.style.display = 'flex';
  } else {
    gameContainer.style.display = 'block';
    ranking.style.display = 'none';
  }
}

function deleteAll() {
  let text =
    'ARE YOU SURE YOU WANT TO DELETE ALL YOUR SCORES? \n you will not be able to recover them.';
  confirm(text) == true && (localStorage.clear(), location.reload());
}

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
