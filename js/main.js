const HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const PHOTOS_LENGTH = PHOTOS.length;

const MIN_PRICE = 1000;
const MAX_PRICE = 5000;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 6;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 6;

const OBJECT_COUNT = 10;

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
    number = `0${number}`;
  }
  return `img/avatars/user${number}.png`;
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
  const title = `Welcome to our ${type}!`;
  const description = `${title}! Best ${type} on ${getRandomPositiveInteger(10, 100)} miles`;
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

const createdObjects = Array.from({length: OBJECT_COUNT}, (v, i) => createObject(i));

// eslint-disable-next-line no-console
console.log(createdObjects);
