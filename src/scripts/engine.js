const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            handleHit(square);
        });

        square.addEventListener("touchstart", (event) => {
            event.preventDefault();
            handleHit(square);
        });
    });
}

function handleHit(square) {
    if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        playSound("hit");
    } else {
        state.values.lives--;

        if (state.values.lives <= -1) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            alert("Game Over! O seu resultado foi: " + state.values.result);
        } else {
            state.view.lives.textContent = state.values.lives;
        }
    }

    randomSquare();
}

function initialize() {
    addListenerHitBox();
}

initialize();
