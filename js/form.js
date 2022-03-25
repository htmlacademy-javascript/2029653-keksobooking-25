const adForm = document.querySelector('.ad-form');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters #housing-features');

const ROOM_NUMBER_RULES = {
  1 : [1],
  2 : [1, 2],
  3 : [1, 2, 3],
  100 : [0]
};

const CAPACITY_RULES = {
  0: [100],
  1: [1, 2, 3],
  2: [2, 3],
  3: [3]
};

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

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

adFormValidator.addValidator(roomNumberElement, validateRoomNumber, 'выберите другое количество комнат');
adFormValidator.addValidator(capacityElement, validateCapacity, 'или выберите другое количество мест');

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (adFormValidator.validate()) {
    return adFormElement.submit();
  }
});

export {activateForm, deactivateForm};
