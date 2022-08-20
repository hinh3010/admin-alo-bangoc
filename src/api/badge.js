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
    url: urlConfig.BADGE,
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
    url: urlConfig.BADGE + `/${id}`,
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
    url: urlConfig.BADGE + '/status',
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
    url: `${urlConfig.BADGE}/create`,
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
    url: urlConfig.BADGE + `/update/${id}`,
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
    url: urlConfig.BADGE + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}