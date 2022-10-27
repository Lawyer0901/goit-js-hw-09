import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDayTime = document.querySelector('#datetime-picker');

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.btnStart.addEventListener('click', stratToCountBackTime);

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const sartTime = Date.now();
    this.isActive = true;
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - sartTime;
      const time = convertMs(deltaTime);
      updateTimerClockFace(time);
      //   console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    if (!selectedDates) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
  },
};
function pad(value) {
  return String(value).padStart(2, 0);
}
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

flatpickr(inputDayTime, options);

function stratToCountBackTime(evt) {
  timer.start();
  console.log(evt.target);
}

function updateTimerClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
