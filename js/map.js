import {DEFAULT_COORDINATES} from './constants.js';
import {createCardElement} from './generator.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';
import {debounce} from './util.js';

const HOTELS_COUNT = 10;

const addressElement = document.querySelector('#address');
const filterTypeElement = document.querySelector('#housing-type');
const filterPriceElement = document.querySelector('#housing-price');
const filterRoomsElement = document.querySelector('#housing-rooms');
const filterGuestsElement = document.querySelector('#housing-guests');
const filterFeaturesElement = document.querySelector('#housing-features');

const map = L.map('map-canvas')
  .setView(DEFAULT_COORDINATES, 11);

const addMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  DEFAULT_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const filterByType = (data) => {
  const selectedHousingType = filterTypeElement.options[filterTypeElement.selectedIndex].value;
  if (selectedHousingType === 'any') {
    return true;
  }
  return data.offer.type === selectedHousingType;
};

const filterByPrice = (data) => {
  const selectedPrice = filterPriceElement.options[filterPriceElement.selectedIndex].value;
  switch (selectedPrice) {
    case 'any':
      return true;
    case 'middle':
      return data.offer.price >= 10000 && data.offer.price <= 50000;
    case 'low':
      return data.offer.price >= 10000;
    case 'high':
      return data.offer.price <= 50000;
  }
};

const filterByRooms = (data) => {
  const selectedRooms = filterRoomsElement.options[filterRoomsElement.selectedIndex].value;
  if (selectedRooms === 'any') {
    return true;
  }
  return data.offer.rooms === Number(selectedRooms);
};

const filterByGuests = (data) => {
  const selectedRooms = filterGuestsElement.options[filterGuestsElement.selectedIndex].value;
  if (selectedRooms === 'any') {
    return true;
  }
  return data.offer.guests === Number(selectedRooms);
};

const filterByFeatures = (data) => {
  const selectedFeaturesElements = filterFeaturesElement.querySelectorAll('.map__checkbox:checked');
  const selectedFeaturesValues = Array.from(selectedFeaturesElements).map((element) => element.value);
  const hotelFeatures = data.offer.features;
  if (selectedFeaturesValues.length === 0) {
    return true;
  }
  if (!hotelFeatures) {
    return false;
  }
  return selectedFeaturesValues.every((feature) => hotelFeatures.includes(feature));
};

const markerGroup = L.layerGroup();
const initMarkerGroup = () => markerGroup.addTo(map);

const createMarker = (data) => {
  const {lat, lng} = data.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      commonPinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCardElement(data));
};

const setAddress = (coordinates) => {
  addressElement.value = `${coordinates.lat.toFixed(5)} ${coordinates.lng.toFixed(5)}`;
};

const initMainMarker = () => {
  mainPinMarker.addTo(map);
  setAddress(DEFAULT_COORDINATES);
};

const resetMainMarker = () => {
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
  setAddress(DEFAULT_COORDINATES);
};

const setMainMarker = () => {
  mainPinMarker.on('dragend', (event) => {
    const coordinates = event.target.getLatLng();
    setAddress(coordinates);
  });
};

const getFiltered = (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (result.length === HOTELS_COUNT) {
      break;
    }
    if (filterByType(data[i]) && filterByPrice(data[i]) && filterByRooms(data[i]) && filterByGuests(data[i]) && filterByFeatures(data[i])) {
      result.push(data[i]);
    }
  }
  return result;
};

const setCommonMarkers = (hotels) => {
  getFiltered(hotels)
    .forEach((hotel) => {
      createMarker(hotel);
    });
};

const updateCommonMarkers = (hotels) => {
  markerGroup.clearLayers();
  setCommonMarkers(hotels);
};

const initMap = (callback) => {
  addMap();
  initMainMarker();
  setMainMarker();
  initMarkerGroup();
  callback();
};

filterTypeElement.addEventListener('change', debounce(() => getData(updateCommonMarkers, showAlert)));

filterPriceElement.addEventListener('change', debounce(() => getData(updateCommonMarkers, showAlert)));

filterRoomsElement.addEventListener('change', debounce(() => getData(updateCommonMarkers, showAlert)));

filterGuestsElement.addEventListener('change', debounce(() => getData(updateCommonMarkers, showAlert)));

filterFeaturesElement.addEventListener('click', debounce((evt) => {
  if (evt.target.classList.contains('map__checkbox')) {
    getData(updateCommonMarkers, showAlert);
  }
}));


export {initMap, setCommonMarkers, resetMainMarker};
