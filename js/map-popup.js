import {APARTMENT_TYPES} from './constants.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCardElement = (hotel) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = hotel.author.avatar;
  cardElement.querySelector('.popup__title').textContent = hotel.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = hotel.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${hotel.offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = APARTMENT_TYPES[hotel.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${hotel.offer.rooms} комнаты для ${hotel.offer.guests}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;

  const features = hotel.offer.features;
  const featuresList = cardElement.querySelectorAll('.popup__feature');

  if (features) {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {
    cardElement.querySelector('ul.popup__features').remove();
  }
  if (hotel.offer.description) {
    cardElement.querySelector('.popup__description').textContent = hotel.offer.description;
  } else {
    cardElement.querySelector('.popup__description').remove();
  }

  const photos = cardElement.querySelector('.popup__photos');
  const photoElement = photos.querySelector('.popup__photo');
  const photoSources = hotel.offer.photos;
  if (photoSources) {
    photoSources.forEach((image) => {
      const newPhotoElement = photoElement.cloneNode(true);
      newPhotoElement.src = image;
      photos.append(newPhotoElement);
    });
  }
  photoElement.remove();
  return cardElement;
};

export {createCardElement};
