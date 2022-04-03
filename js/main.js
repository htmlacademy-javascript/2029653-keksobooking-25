import {activateForm, deactivateForm, initForm} from './form.js';
import {initMap, setCommonMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';
import './slider.js';

const hotelLocations = (data) => setCommonMarkers(data.map((value) => value.location));

deactivateForm();
initForm();
initMap(activateForm);
getData(hotelLocations, showAlert);
