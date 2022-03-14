import {createdObjects} from './data.js';
import {APARTMENT_TYPES} from './constants.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardsFragment = document.createDocumentFragment();
const mapContainer = document.querySelector('#map-canvas');
let firstObject = null;

createdObjects.forEach((element, i) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = element.offer.title;
  card.querySelector('.popup__text--address').textContent = element.offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${element.offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = APARTMENT_TYPES[element.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
  card.querySelector('.popup__text--time').innerHTML = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const features = element.offer.features;
  const featuresList = card.querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const isNecessary = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  card.querySelector('.popup__description').textContent = element.offer.description;

  const photos = card.querySelector('.popup__photos');
  const photoElement = photos.querySelector('.popup__photo');
  const photoSources = element.offer.photos;

  photoSources.forEach((image) => {
    const newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.src = image;
    photos.append(newPhotoElement);
  });

  card.querySelector('.popup__avatar').src = element.author;

  if (i === 0) {
    //условие для вывода первого элемента на карту
    //не понял почему не работает вариант
    //mapContainer.appendChild(card)
    //пришлось создавать отдельную переменную и её вставлять после даннго цикла forEach
    firstObject = card;
  }

  cardsFragment.append(card);
});

mapContainer.appendChild(firstObject);

export {cardsFragment};
