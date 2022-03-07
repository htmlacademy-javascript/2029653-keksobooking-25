import {
  HOTEL_TYPES,
  CHECKIN_TIMES,
  CHECKOUT_TIMES,
  FEATURES,
  PHOTOS,
  PHOTOS_LENGTH,
  MIN_PRICE,
  MAX_PRICE,
  MIN_ROOMS_COUNT,
  MAX_ROOMS_COUNT,
  MIN_GUESTS_COUNT,
  MAX_GUESTS_COUNT,
}
  from './constants.js';

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getAvatarImg = (number) => {
  if (number < 10) {
    number = `0${ number }`;
  }
  return `img/avatars/user${ number }.png`;
};

const getPhotosArr = () => {
  const count = getRandomPositiveInteger(1, PHOTOS_LENGTH.length);
  return PHOTOS.slice(-count);
};

const getFeatures = () => {
  const count = getRandomPositiveInteger(1, FEATURES.length);
  return FEATURES.slice(-count);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createObject = (number) => {
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  const type = HOTEL_TYPES[getRandomPositiveInteger(0, HOTEL_TYPES.length - 1)];
  const title = `Welcome to our ${ type }!`;
  const description = `${ title }! Best ${ type } on ${ getRandomPositiveInteger(10, 100) } miles`;
  return {
    'author': getAvatarImg(number),
    'offer': {
      'title': title,
      'address': [lat, lng],
      'price': getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      'type': type,
      'rooms': getRandomPositiveInteger(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
      'guests': getRandomPositiveInteger(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
      'checkin': getRandomArrayElement(CHECKIN_TIMES),
      'checkout': getRandomArrayElement(CHECKOUT_TIMES),
      'features': getFeatures(),
      'description': description,
      'photos': getPhotosArr(),
    },
    'location': {
      'lat': lat,
      'lng': lng
    }
  };
};

export { createObject };
