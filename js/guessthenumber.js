const maxGuesses = 7;
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let won = false;
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
function showMessage(text) {
    message.textContent = text;
}
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    won = false;
    guessBtn.disabled = false;
    guessInput.value = "";
    guessInput.focus();
}
function checkGuess() {
    if (won) {
        showMessage("Game over. Press Reset to play again.");
        return;
    }
    const input = guessInput.value.trim();
    const guess = Number(input);
    if(input === "" || Number.isNaN(guess) || guess < 1 || guess > 100){
        showMessage("Please enter a valid number between 1 and 100.");
        guessInput.focus();
        return;
    }
    attempts += 1;
    if(guess === secretNumber){
        won = true;
        showMessage(`Correct! You guessed the number in ${attempts} attempt(s).`);
        guessBtn.disabled = true;
        return;
    }
    const remaining = maxGuesses - attempts;
    if(guess < secretNumber){
        showMessage(`Too low! ${remaining} guess left.`);
    }else{
        showMessage(`Too high! ${remaining} guess left.`);
    }
    if(attempts >= maxGuesses){
        won = true;
        guessBtn.disabled = true;
        showMessage(`Game over! The number was ${secretNumber}.`);
    }
    guessInput.value = "";
    guessInput.focus();
}
guessBtn.addEventListener("click", checkGuess);
resetBtn.addEventListener("click", resetGame);