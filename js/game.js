const number = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let score = 0;
let time = 0;
let timer;

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("stop").addEventListener("click", stopGame);
document.getElementById("reset").addEventListener("click", resetGame);

function startGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("start").style.display = "none";
    document.getElementById("end").style.display = "none";
    document.getElementById("buttons").style.display = "block";

    attempts = 0;
    score = 0;
    time = 0;

    document.getElementById("attempts").innerHTML = "Attempts: " + attempts;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("time").innerHTML = "Time: " + time;

    timer = setInterval(function () {
        time++;
        document.getElementById("timer").innerHTML = "Timer: " + time;
    }, 1000);

    document
        .getElementById("guess")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                submitGuess();
            }
        });
}

function stopGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("start").style.display = "block";
    document.getElementById("end").style.display = "block";
    document.getElementById("buttons").style.display = "block";

    clearInterval(timer);

    document.getElementById("attempts").innerHTML = "Attempts: " + attempts;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("time").innerHTML = "Time: " + time;

    document.getElementById("guess").value = "";
    document.getElementById("guess").disabled = true;
    document.getElementById("submit").disabled = true;

    if (score > 0) {
        document.getElementById("message").innerHTML = "You won!";
    } else {
        document.getElementById("message").innerHTML = "You lost!";
    }
}

function resetGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("end").style.display = "none";
    document.getElementById("buttons").style.display = "block";

    document.getElementById("guess").value = "";
    document.getElementById("guess").disabled = false;
    document.getElementById("submit").disabled = false;

    attempts = 0;
    score = 0;
    time = 0;

    document.getElementById("attempts").innerHTML = "Attempts: " + attempts;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("time").innerHTML = "Time: " + time;

    document.getElementById("message").innerHTML = "";
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("range").innerHTML = "";
    document.getElementById("hint").innerHTML = "";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("timer").innerHTML = "";

    document.getElementById("guess").focus();

    clearInterval(timer);

    timer = setInterval(function () {
        time++;
        document.getElementById("timer").innerHTML = "Timer: " + time;
    }, 1000);

    startGame();
}

function submitGuess() {
    const guess = parseInt(document.getElementById("guess").value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("guess").value = "";
        document.getElementById("guess").focus();
        return;
    } else {
        attempts++;
        document.getElementById("attempts").innerHTML =
            "Attempts: " + attempts;
        document.getElementById("guess").value = "";

        if (guess < number) {
            document.getElementById("guesses").innerHTML += guess + " ";
            document.getElementById("hint").innerHTML = "Too low!";
        } else if (guess > number) {
            document.getElementById("guesses").innerHTML += guess + " ";
            document.getElementById("hint").innerHTML = "Too high!";
        } else {
            document.getElementById("guesses").innerHTML += guess + " ";
            document.getElementById("hint").innerHTML = "Correct!";
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
            document.getElementById("feedback").innerHTML = "Correct!";
            document.getElementById("message").innerHTML = "You won!";

            clearInterval(timer);

            document.getElementById("guess").disabled = true;
            document.getElementById("submit").disabled = true;
        }
    }
}

document.getElementById("submit").addEventListener("click", submitGuess);