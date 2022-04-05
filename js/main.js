import {activateForm, deactivateForm, initForm} from './form.js';
import {initMap, setCommonMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';
import './slider.js';

deactivateForm();
initForm();
initMap(activateForm);
getData(setCommonMarkers, showAlert);
