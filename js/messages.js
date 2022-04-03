import {ALERT_SHOW_TIME} from './constants.js';

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeErrorMessage = (evt) => {
  evt.target.closest('.error').remove();
};

const closeSuccessMessage = (evt) => {
  evt.target.closest('.success').remove();
};

const clickOnErrorContainer = (evt) => {
  if (evt.target.classList.contains('error')) {
    closeErrorMessage(evt);
  }
};

const clickOnSuccessContainer = (evt) => {
  if (evt.target.classList.contains('success')) {
    closeSuccessMessage(evt);
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('body > .error').remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('body > .success').remove();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const showErrorMessage = () => {
  const errorElement = errorTemplate.content.cloneNode(true);
  errorElement.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  errorElement.querySelector('.error').addEventListener('click', clickOnErrorContainer);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.body.appendChild(errorElement);
};

const showSuccessMessage = () => {
  const successElement = successTemplate.content.cloneNode(true);
  successElement.querySelector('.success').addEventListener('click', clickOnSuccessContainer);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.body.appendChild(successElement);
};

export {showAlert, showErrorMessage, showSuccessMessage};
