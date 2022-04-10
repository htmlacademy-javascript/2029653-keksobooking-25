import {sendData} from './api.js';
import {showAlert, showSuccessMessage} from './messages.js';
import {resetMainMarker} from './map.js';
import {resetPriceSlider} from './slider.js';

const adForm = document.querySelector('.ad-form');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters #housing-features');
const resetButton = adForm.querySelector('.ad-form__reset');

const ROOM_NUMBER_RULES = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const CAPACITY_RULES = {
  0: [100],
  1: [1, 2, 3],
  2: [2, 3],
  3: [3]
};

const MIN_PRICE_RULES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const DEFAULT_AVATAR_IMAGE_SCR = 'img/muffin-grey.svg';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const housingTypeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const submitButton = document.querySelector('.ad-form__submit');
const avatarChooserElement = document.querySelector('#avatar');
const previewAvatarElement = document.querySelector('.ad-form-header__preview > img');
const photoChooserElement = document.querySelector('#images');
const previewPhotoElement = document.querySelector('.ad-form__photo');

const adFormValidator = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, false);

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  activeElements.forEach((element) => {
    element.classList.add('disabled');
  });

};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  activeElements.forEach((element) => {
    element.classList.remove('disabled');
  });
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const activateSubmitButton = () => {
  submitButton.disabled = false;
};

const validateRoomNumber = (roomsCount) => {
  const capacityValue = Number(capacityElement.options[capacityElement.selectedIndex].value);
  return ROOM_NUMBER_RULES[roomsCount].includes(capacityValue);
};

const validateCapacity = (capacity) => {
  const roomNumberValue = Number(roomNumberElement.options[roomNumberElement.selectedIndex].value);
  return CAPACITY_RULES[capacity].includes(roomNumberValue);
};

const validateMinPrice = (price) => {
  const selectedHousingType = housingTypeElement.options[housingTypeElement.selectedIndex].value;
  return price >= MIN_PRICE_RULES[selectedHousingType];
};

const resetAvatarPreview = () => {
  previewAvatarElement.src = DEFAULT_AVATAR_IMAGE_SCR;
};

const resetPhotoPreview = () => {
  previewPhotoElement.style.removeProperty('background-image');
};

const resetAdForm = () => {
  adFormElement.reset();
  resetAvatarPreview();
  resetPhotoPreview();
  resetMainMarker();
  resetPriceSlider();
};

const onSuccess = () => {
  resetAdForm();
  showSuccessMessage();
};

const initForm = () => {
  adFormValidator.addValidator(roomNumberElement, validateRoomNumber, 'выберите другое количество комнат');
  adFormValidator.addValidator(capacityElement, validateCapacity, 'или выберите другое количество мест');
  adFormValidator.addValidator(priceElement, validateMinPrice, 'цена должна быть выше');

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (adFormValidator.validate()) {
      sendData(onSuccess, showAlert, new FormData(adFormElement), disableSubmitButton, activateSubmitButton);
    }
  });
};

resetButton.addEventListener('click', resetAdForm);

const changePricePlaceholder = () => {
  const selectedHousingType = housingTypeElement.options[housingTypeElement.selectedIndex].value;
  priceElement.placeholder = MIN_PRICE_RULES[selectedHousingType];
};

housingTypeElement.addEventListener('change', changePricePlaceholder);

timeinElement.addEventListener('change', () => {
  timeoutElement.selectedIndex = timeinElement.selectedIndex;
});

timeoutElement.addEventListener('change', () => {
  timeinElement.selectedIndex = timeoutElement.selectedIndex;
});

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatarElement.src = URL.createObjectURL(file);
  }
});

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhotoElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});

export {activateForm, deactivateForm, initForm};
