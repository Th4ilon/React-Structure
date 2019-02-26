import '@babel/polyfill';

import { HOST_URL } from 'utils/constants';
import { sha256 } from 'js-sha256';
import axios from 'axios';

function login(params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(`${HOST_URL}/login?login=${params.login}&password=${sha256(params.password)}`, {
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
}

export default async function loginUser(username = '', password = '') {
  return await login({ login: username, password }); // eslint-disable-line no-return-await
}
