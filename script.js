const figures = document.querySelectorAll("figure");
const computerImg = document.getElementById("computer-img");
const computerLabel = document.getElementById("computer-label");
const outcomeText = document.getElementById("outcome-text");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const tiesEl = document.getElementById("ties");
const resetBtn = document.getElementById("reset-btn");

let wins = 0, losses = 0, ties = 0;
let playerChoice = null;

const choices = [
    { name: "Rock", img: "images/rock.png" },
    { name: "Paper", img: "images/paper.png" },
    { name: "Scissors", img: "images/scissors.png" }
];

figures.forEach(fig => {
    fig.addEventListener("click", () => {
        figures.forEach(f => f.classList.remove("selected"));
        fig.classList.add("selected");
        playerChoice = fig.dataset.choice;

        // Computer is thinking
        startComputerTurn();
    });
});

function startComputerTurn() {
    let shuffleIndex = 0;
    let shuffleInterval = setInterval(() => {
        const choice = choices[shuffleIndex % 3];
        computerImg.src = choice.img;
        computerLabel.textContent = "...";
        shuffleIndex++;
    }, 500);

    // Thinking for 3 seconds
    setTimeout(() => {
        clearInterval(shuffleInterval);
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        computerImg.src = computerChoice.img;
        computerLabel.textContent = computerChoice.name;

        determineWinner(playerChoice, computerChoice.name);
    }, 3000);
}

function determineWinner(player, computer) {
    if (player === computer) {
        outcomeText.textContent = "Tie!";
        ties++;
    } else if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")
     ) {
        outcomeText.textContent = "You Win!";
        wins++;
    } else {
        outcomeText.textContent = "Computer Wins!";
        losses++;
    }
    updateScoreboard();
}

function updateScoreboard() {
    winsEl.textContent = wins;
    lossesEl.textContent = losses;
    tiesEl.textContent = ties;
}

resetBtn.addEventListener("click", () => {
    wins = losses = ties = 0;
    updateScoreboard();
    outcomeText.textContent = "Make your choice!";
    computerImg.src = "images/question-mark.png";
    computerLabel.textContent = "?";
    figures.forEach(f => f.classList.remove("selected"));
});

