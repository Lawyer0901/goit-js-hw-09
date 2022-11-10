import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// // 1. Надо в функции вывода модалки описать текущую дату (selectedDates < текущей), и что ранняя дата это не правильно. (DONE)
// // 2. Надо определить как в text.Content рефов присваивать разницу между выбраной датой и текущей (DONE)
// // 2.1 Нужна проверка: Если разница между текущей датой и выбранной меньше 0, то в textContent рефов присваивается 00 (DONE)
// // 3. Надо определить как отсчет таймера запустить в обратную сторону. (DONE)
// // 4. Когда text.Content рефов = 00 то надо таймер остановить clearInterval(this.intervalId)

const inputDayTime = document.querySelector('#datetime-picker');

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// refs.btnStart.addEventListener('click', stratToCountBackTime);

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
  },
};

// // Переменная для опции в плагин

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  //   Функция вызывающая модалку ошибки выбра даты

  onClose(selectedDates) {
    let intervalId = null;
    const currentTime = Date.now();

    // Modal window failure

    if (selectedDates[0] < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }

    // interval for timer

    intervalId = setInterval(() => {
      const inputTime = selectedDates[0].getTime() - Date.now();

      const time = convertMs(inputTime);

      // Проверка если разница между текущей датой и выбранной меньше 0, то в textContent рефов присваивается 00
      if (inputTime <= 0) {
        refs.btnStart.disabled = true;
        return;
      } else {
        refs.btnStart.disabled = false;
        const { days, hours, minutes, seconds } = time;
        refs.days.textContent = `${days}`;
        refs.hours.textContent = `${hours}`;
        refs.minutes.textContent = `${minutes}`;
        refs.seconds.textContent = `${seconds}`;
      }

      if (time === 0) {
        clearInterval(intervalId);
        return;
      }
    }, 1000);
  },
};

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
function stratToCountBackTime() {}

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// const btnStartRef = document.querySelector('[data-start]');
// btnStartRef.setAttribute('disabled', false);

// const days = document.querySelector('[data-days]');
// const hours = document.querySelector('[data-hours]');
// const minutes = document.querySelector('[data-minutes]');
// const seconds = document.querySelector('[data-seconds]');
// // console.log(days);
// let timerDeadline = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     timerDeadline = selectedDates[0].getTime();
//     console.log(timerDeadline);
//     if (timerDeadline < Date.now()) {
//       alert('Please choose a date in the future');
//       btnStartRef.setAttribute('disabled', true);
//     } else {
//       btnStartRef.toggleAttribute('disabled');
//     }
//     btnStartRef.addEventListener('click', onBtnStart);
//   },
// };

// flatpickr('#datetime-picker', options);

// function onBtnStart() {
//   // event.preventDefault();
//   btnStartRef.setAttribute('disabled', false);
//   let intervalId = setInterval(() => {
//     const delta = timerDeadline - Date.now();

//     console.log('🚀 ~ delta', delta);

//     if (delta < 1000) {
//       clearInterval(intervalId);
//     }

//     const data = convertMs(delta);
//     // console.log(data);
//     days.textContent = addLeadinZero(data.days);
//     hours.textContent = addLeadinZero(data.hours);
//     minutes.textContent = addLeadinZero(data.minutes);
//     seconds.textContent = addLeadinZero(data.seconds);
//   }, 1000);
// }

// function convertMs(delta) {
//   const days = Math.floor(delta / 1000 / 60 / 60 / 24);
//   const hours = Math.floor(delta / 1000 / 60 / 60) % 24;
//   const minutes = Math.floor(delta / 1000 / 60) % 60;
//   const seconds = Math.floor(delta / 1000) % 60;
//   return { days, hours, minutes, seconds };
// }

// function addLeadinZero(value) {
//   return String(value).padStart(2, '0');
// }
