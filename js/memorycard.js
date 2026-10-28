const board = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

const symbols = ['🍉', '🍋', '🍇', '🍒', '🍍', '🍊', '🥝', '🍓'];
const deck = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}
function updateStatus(message) {
  statusText.textContent = message;
}
function flipCard(card) {
  if (lockBoard || card === firstCard || card.dataset.matched === 'true') {
    return;
  }
  card.textContent = card.dataset.symbol;
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  lockBoard = true;
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.dataset.matched = 'true';
    secondCard.dataset.matched = 'true';
    matchedPairs += 1;
    updateStatus('Match found!');
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    if (matchedPairs === symbols.length) {
      updateStatus('You matched all pairs! Great job!');
    }
    return;
  }
  updateStatus('No match. Try again!');
  setTimeout(() => {
    firstCard.textContent = '?';
    secondCard.textContent = '?';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    updateStatus('Pick two cards to continue.');
  }, 1000);
}
function buildBoard() {
  const shuffledDeck = shuffle(deck);
  board.innerHTML = '';
  shuffledDeck.forEach((symbol) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.textContent = '?';
    card.dataset.symbol = symbol;
    card.dataset.matched = 'false';
    card.style.margin = '5px';
    card.style.width = '60px';
    card.style.height = '60px';
    card.style.fontSize = '28px';
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      flipCard(card);
    });
    board.appendChild(card);
  });
}
function resetGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  buildBoard();
  updateStatus('Pick two cards to begin.');
}
resetBtn.addEventListener('click', resetGame);
resetGame();
