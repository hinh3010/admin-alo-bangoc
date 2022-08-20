import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getList(offset = 0, limit = 10, keyword = '') {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    params: {
        offset,
        limit,
        keyword
    },
    url: urlConfig.MEDIA_SYSTEM,
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
    url: urlConfig.MEDIA_SYSTEM + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function changeStatus(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.MEDIA_SYSTEM + '/status',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function create(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: `${urlConfig.MEDIA_SYSTEM}/create`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function update(id, data) {
  const token = getToken();
  const resp = await axios({
    method: 'PUT',
    data,
    url: urlConfig.MEDIA_SYSTEM + `/update/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function remove(id) {
  const token = getToken();
  const resp = await axios({
    method: 'DELETE',
    url: urlConfig.MEDIA_SYSTEM + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}