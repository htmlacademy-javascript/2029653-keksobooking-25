import {createObject} from './util.js';
import {OBJECT_COUNT} from './constants.js';

const createdObjects = Array.from({length: OBJECT_COUNT}, (v, i) => createObject(i));

export {createdObjects};
