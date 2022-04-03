import {HOTELS_DATA_URL, DATA_URL} from './constants.js';

const getData = (onSuccess, onFail) => {
  fetch(HOTELS_DATA_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => onSuccess(data));
      } else {
        throw new Error('Не получилось получить отели, попробуйте обновить страницу');
      }
    })
    .catch((err) => {
      onFail(err.message);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch((err) => {
      onFail(err.message);
    });
};

export {getData, sendData};
