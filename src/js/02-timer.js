import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// // 1. Надо в функции вывода модалки описать текущую дату (selectedDates < текущей), и что ранняя дата это не правильно. (DONE)
// // 2. Надо определить как в text.Content рефов присваивать разницу между выбраной датой и текущей (DONE)
// // 2.1 Нужна проверка: Если разница между текущей датой и выбранной меньше 0, то в textContent рефов присваивается 00 (DONE)
// // 3. Надо определить как отсчет таймера запустить в обратную сторону.
// // 4. Когда text.Content рефов = 00 то надо таймер остановить clearInterval(this.intervalId)

const inputDayTime = document.querySelector('#datetime-picker');

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const timer = {
  isActive: false,
  intervalId: null,
  start() {
    if (this.isActive) {
      return;
    }
    const sartTime = Date.now();
    // console.log(sartTime);
    this.isActive = true;
    this.intervalId = setInterval(() => {
      let currentTime = Date.now();
      // console.log(currentTime);
      let deltaTime = currentTime - sartTime;
      // console.log(deltaTime);

      const func = convertMs(deltaTime);
      // console.log(deltaTime);
      let timeData = func;
      console.log(timeData);

      refs.days.textContent = timeData.days;
      refs.hours.textContent = timeData.hours;
      refs.minutes.textContent = timeData.minutes;
      refs.seconds.textContent = timeData.seconds;
      currentTime -= 1;
    }, 1000);
  },
};

// Переменная для опции в плагин

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  //   Функция вызывающая модалку ошибки выбра даты

  onClose(selectedDates) {
    const currentTime = Date.now();
    const inputTime = selectedDates[0].getTime() - Date.now();
    let countTimerBack = inputTime;
    console.log(countTimerBack);
    const func = convertMs(inputTime);

    if (selectedDates[0] < currentTime) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }

    // Проверка если разница между текущей датой и выбранной меньше 0, то в textContent рефов присваивается 00
    if (inputTime < 0) {
      return;
    } else {
      const { days, hours, minutes, seconds } = func;
      refs.days.textContent = `${days}`;
      refs.hours.textContent = `${hours}`;
      refs.minutes.textContent = `${minutes}`;
      refs.seconds.textContent = `${seconds}`;
    }
    if (inputTime) {
      refs.btnStart.disabled = false;
    } else {
      refs.btnStart.disabled = true;
    }
  },
};

// Eventlistener on button start

refs.btnStart.addEventListener('click', stratToCountBackTime);

// Плагин выбора дня и времени
flatpickr(inputDayTime, options);

// Добавляет ноль перед цифрой, если его нет
function pad(value) {
  return String(value).padStart(2, '0');
}

// Возвращает объек из дней часов минут и секунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// При нажатии кнопки старт начинаеться отсчет таймера
function stratToCountBackTime() {
  // console.log(evt.target.textContent);
  timer.start();
  // if (00) {
  //   clearInterval(intervalId);
  // }
}
