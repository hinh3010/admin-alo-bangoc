import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getList(offset = 1, limit = 10, keyword = '') {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    params: {
        offset,
        limit,
        keyword
    },
    url: urlConfig.USERS + '/getall',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function detail(id) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.USERS + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function changeStatus(data) {
  const token = getToken();
  const resp = await axios({
    method: 'PUT',
    data,
    url: urlConfig.USERS + '/status',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function update(data) {
  const token = getToken();
  const resp = await axios({
    method: 'PUT',
    data,
    url: urlConfig.USERS,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function resetPW(data) {
  const token = getToken();
  const resp = await axios({
    method: 'PUT',
    data,
    url: `${urlConfig.USERS}/reset-pass`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function chanePassForUser(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: `${urlConfig.USERS}/change-pass-user`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}



/**
 * identifier
 */

 export async function getIdentifier(data) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    data,
    url: urlConfig.GET_IDENTIFIER_USERS+`/?offset=0&limit=1000`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

 export async function handleIdentifier(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.HANDLE_IDENTIFIER_USERS,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}


