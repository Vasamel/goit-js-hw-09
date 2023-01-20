import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';
// import 'flatpickr/dist/flatpickr.css';
// import '../css/02-timer.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedCalendarDates = calendar.selectedDates[0];
    const pastOrFuture = selectedCalendarDates - new Date();

    if (pastOrFuture <= 0) {
      startBtn.disabled = true;
      Report.failure(
        'Wrong date',
        'Please choose a date in the future',
        'Okay'
      );
    } else {
      startBtn.disabled = false;
    }
  },
};

const calendar = flatpickr(inputEl, options);
let intervalId = null;
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  inputEl.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    const selectedCalendarDates = calendar.selectedDates[0];
    let pastOrFuture = selectedCalendarDates - new Date();

    const getDatesFromMs = convertMs(pastOrFuture);

    if (pastOrFuture < 0) {
      clearInterval(intervalId);
      return;
    }
    daysEl.textContent = getDatesFromMs.days.toString().padStart(2, '0');
    hoursEl.textContent = getDatesFromMs.hours.toString().padStart(2, '0');
    minutesEl.textContent = getDatesFromMs.minutes.toString().padStart(2, '0');
    secondsEl.textContent = getDatesFromMs.seconds.toString().padStart(2, '0');
  }, 1000);
});

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const selectedCalendarDates = calendar.selectedDates[0];
    const pastOrFuture = selectedCalendarDates - new Date();
    if (pastOrFuture < 0) {
      inputEl.disabled = false;
      startBtn.disabled = false;
      stopBtn.disabled = true;
      Report.success('Time is over', 'Choose a new timer date', 'Okay');
      clearInterval(timerId);
    }
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  clearInterval(timerId);
  inputEl.disabled = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}