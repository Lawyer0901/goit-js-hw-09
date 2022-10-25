// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;
startBtn.addEventListener('click', startChangeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);

function startChangeBodyColor() {
  if (intervalId) {
    return;
  }
  intervalId = setInterval(() => {
    const rndCol = getRandomHexColor();
    body.style.backgroundColor = rndCol;
  }, 1000);
}

function stopChangeBodyColor() {
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
