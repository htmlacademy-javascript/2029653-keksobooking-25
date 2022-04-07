import {activateForm, deactivateForm, initForm} from './form.js';
import {initMap, initCommonMarkers, deactivateMapFilters} from './map.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';
import './slider.js';

deactivateForm();
deactivateMapFilters();
initForm();
initMap(activateForm);
getData(initCommonMarkers, showAlert);
