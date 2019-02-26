import '@babel/polyfill';

import { HOST_URL } from 'utils/constants';

import axios from 'axios';

function getUsers() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${HOST_URL}/administracion/datos/usuariosxroles/2?token=${localStorage.getItem('token')}`,
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

export async function getComerciales() {
  return await getUsers(); // eslint-disable-line no-return-await
}

function addUser(data) {
  Object.assign({}, data, { idrol: 2 }); // comercial
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${HOST_URL}/administracion/datos/usuario?token=${localStorage.getItem('token')}`,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json;charset=UTF-8'
      }),
      data,
      responseType: 'json'
    }).then(response => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
}

export async function createComercial(data = {}) {
  return await addUser(data); // eslint-disable-line no-return-await
}

function updateUserWithId(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `${HOST_URL}/administracion/datos/usuario/update/${data.id}?token=${localStorage.getItem('token')}`,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json;charset=UTF-8'
      }),
      data,
      responseType: 'json'
    }).then(response => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
}

export async function updateComercial(id = null) {
  return await updateUserWithId(id); // eslint-disable-line no-return-await
}

function deleteUserWithId(id) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `${HOST_URL}/administracion/datos/usuario/${id}/delete?token=${localStorage.getItem('token')}`,
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'content-type': 'application/json;charset=UTF-8'
      })
    }).then(response => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
}

export async function deleteComercial(data = {}) {
  return await deleteUserWithId(data); // eslint-disable-line no-return-await
}
