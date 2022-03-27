const priceSliderElement = document.querySelector('.ad-form__slider');
const priceSliderValueElement = document.querySelector('#price');

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseInt(value, 10);
    },
    from: function (value) {
      return parseInt(value, 10);
    },
  },
});

priceSliderElement.noUiSlider.on('update', () => {
  priceSliderValueElement.value = priceSliderElement.noUiSlider.get();
});
