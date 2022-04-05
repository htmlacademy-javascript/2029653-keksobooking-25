const adForm = document.querySelector('.ad-form');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters #housing-features');

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

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const housingTypeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');

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

const initForm = () => {
  adFormValidator.addValidator(roomNumberElement, validateRoomNumber, 'выберите другое количество комнат');
  adFormValidator.addValidator(capacityElement, validateCapacity, 'или выберите другое количество мест');
  adFormValidator.addValidator(priceElement, validateMinPrice, 'цена должна быть выше');

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (adFormValidator.validate()) {
      return adFormElement.submit();
    }
  });
};

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

export {activateForm, deactivateForm, initForm};
