import {DEFAULT_COORDINATES} from './constants.js';
import {createCardElement} from './generator.js';

const addressElement = document.querySelector('#address');

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

const setCommonMarkers = (hotels) => {
  hotels.forEach((hotel) => {
    createMarker(hotel);
  });
};

const initMap = (callback) => {
  addMap();
  initMainMarker();
  setMainMarker();
  initMarkerGroup();
  callback();
};

export {initMap, setCommonMarkers, resetMainMarker};
