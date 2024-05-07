const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;
const colors = [
    'linear-gradient(to right, #11998e, #38ef7d)',
    'linear-gradient(to right, #00c6ff, #0072ff)',
    'linear-gradient(to right, #c9d6ff, #e2e2e2)',
    'linear-gradient(to right, #4568dc, #b06ab3)',
    'linear-gradient(to right, #a8c0ff, #3f2b96)',
];

const setTime = (value) => {
    timeEl.innerHTML = `00:${value}`;
}

const getRandomNumber = (min, max) => {
     return Math.round(Math.random() * (max - min) + min);
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10)
            currentTime = `0${currentTime}`;
        setTime(currentTime);
    }
}

const startGame = () => {
    setTime(time);
    setInterval(decreaseTime, 1000);
    createRandomCircle();
}

const createRandomCircle = () => {
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 70);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const randomColor = colors[getRandomNumber(0, colors.length - 1)];

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = randomColor;

    board.append(circle);

}

const finishGame = () => {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class='primary'>${score}</span></h1>`;
}

startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = Number(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});