const adForm = document.querySelector('.ad-form');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters #housing-features');

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

export {activateForm, deactivateForm};
