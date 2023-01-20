import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('.form');
const options = {
  cssAnimationStyle: 'from-top',
  useIcon: false,
  timeout: 10000,
};

inputEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) { 
  evt.preventDefault();
  const { delay, step, amount } = inputEl.elements;
  let numDelay = Number(delay.value);
  const numStep = Number(step.value);
  const numAmount = Number(amount.value);
  for (let i = 1; i <= numAmount; i += 1) { 
    createPromise(i, numDelay)
      .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, options))
      .catch(({ position, delay }) => Notify.failure(`❌ Rejected  promise ${position} in ${delay}ms`, options));
    numDelay += numStep;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}