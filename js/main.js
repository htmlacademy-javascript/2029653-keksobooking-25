import { createdObjects } from './data.js';
import {activateForm, deactivateForm, initForm} from './form.js';
import {initMap, setCommonMarkers} from './map.js';
import './slider.js';

const hotelsLocations = createdObjects.map((value) => value.location);

deactivateForm();
initForm();
initMap(activateForm);

setCommonMarkers(hotelsLocations);
