const formEl = document.querySelector('.form');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();

  const formElements = e.target.elements;
  const formAmount = Number(formElements.amount.value);
  let formDelay = Number(formElements.delay.value);
  const formStep = Number(formElements.step.value);

  for (let i = 1; i <= formAmount; i += 1) {
    createPromise(i, formDelay)
      .then(value => {
        Notify.success(value);
      })
      .catch(err => {
        Notify.failure(err);
      });

    formDelay += formStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfill(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  return promise;
}


// }