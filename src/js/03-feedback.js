// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.

import throttle from 'lodash.throttle';

const mainForm = document.querySelector('.feedback-form');

const feedbackForm = 'feedback-form-state';

const formData = {};

mainForm.addEventListener('input', throttle(onInputData, 250));

mainForm.addEventListener('submit', onSubmitData);

loadSavedData();

function onInputData(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
  localStorage.setItem(feedbackForm, JSON.stringify(formData));
}

function onSubmitData(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(feedbackForm);
}

function loadSavedData() {
  const data = localStorage.getItem(feedbackForm);
  const savedData = JSON.parse(data);

  if (data) {
    mainForm.elements.email.value = savedData.email;
    mainForm.elements.message.value = savedData.message;
  }
}

console.log('E-mail:', mainForm.elements.email.value);
console.log('Message:', mainForm.elements.message.value);
