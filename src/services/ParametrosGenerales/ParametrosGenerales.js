import '@babel/polyfill';

import { HOST_URL } from 'utils/constants';

import axios from 'axios';

function parametros() {
  return new Promise((resolve, reject) => {
    axios({
      url: `${HOST_URL}/datosUtils/datos/parametrosGenerales?token=${localStorage.getItem('token')}`,
      method: 'get',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json'
      })
    }).then(response =>
      resolve(response.data))
    .catch((error) => {
      reject(error);
    });
  });
}

export default async function parametrosCall() {
  return await parametros(); // eslint-disable-line no-return-await
};

/* http://es.ingenia.anaxi:8080/sgrepostaje/services/datosUtils/datos/parametrosGenerales?token=2792a0b23073871c70fd50be70028770b1d1742f87d9e2679112885bf27325ee
axios.get(`${HOST_URL}/login?token=`, {
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    }).then(response => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
*/
