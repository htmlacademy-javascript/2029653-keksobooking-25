const adForm = document.querySelector('.ad-form');
const adFieldsElements = adForm.querySelectorAll('fieldset');

const mapForm = document.querySelector('.map__filters');
const mapSelects = mapForm.querySelectorAll('select');
const mapFeatures = mapForm.querySelector('#housing-features');

const setUnactive = () => {
  adForm.classList.add('ad-form--disabled');
  adFieldsElements.forEach((element) => {
    element.classList.add('disabled');
  });
  mapSelects.forEach((element) => {
    element.classList.add('disabled');
  });
  mapFeatures.classList.add('disable');
};

const setActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFieldsElements.forEach((element) => {
    element.classList.remove('disabled');
  });
  mapSelects.forEach((element) => {
    element.classList.remove('disabled');
  });
  mapFeatures.classList.remove('disable');
};

export {setActive, setUnactive};
