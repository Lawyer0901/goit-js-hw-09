// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const PROMPT_DELAY = 1000;

let intervalId = null;

startBtn.addEventListener('click', startChangeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);

function startChangeBodyColor() {
  intervalId = setInterval(() => {
    const rndCol = getRandomHexColor();
    body.style.backgroundColor = rndCol;
  }, PROMPT_DELAY);

  if (intervalId) {
    startBtn.disabled = true;
  }
}

function stopChangeBodyColor() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
