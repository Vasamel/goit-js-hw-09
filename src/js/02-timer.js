import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const inputCalendar = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

btnStart.setAttribute('disabled', 'true');

const options = {
  cssAnimationStyle: 'zoom',
  position: 'center-center',
  closeButton: true,
   timeout: 4000,
  fontSize: '25px',
  width: '500px',
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
    if (selectedDates[0] <= date) {
      Notify.failure('Please choose a date in the future', options);
    } else {
      btnStart.removeAttribute('disabled');
      selectedDate = selectedDates;
    }
    },
};

const fp = flatpickr(inputCalendar, options);

btnStart.addEventListener('click', onStart)
function onStart () {
    console.log(selectedDate);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
// Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};


function onStart() {
  timerId = setInterval(updateInterface, 1000);
  btnStart.setAttribute('disabled', 'true');
  inputCalendar.setAttribute('disabled', 'true');
    
};
function updateInterface() {
  const date = new Date();
  const dataTimer = selectedDate[0] - date;
  if (dataTimer < 1000) {
    endTime();
  }
  const { days, hours, minutes, seconds } = convertMs(dataTimer);
  daysEl.textContent = days;
  hoursEl.textContent = `:${hours}`;
  minutesEl.textContent = `:${minutes}`;
  secondsEl.textContent = `:${seconds}`;
};
function endTime() {
  clearInterval(timerId);
  Notify.success('Time is over!');
}
