import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getList(limit, current) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.STICKER + '?limit=' + limit + '&page=' + current,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function detail(id) {

  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.STICKER + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function changeStatus(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.STICKER + '/status',
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
    url: `${urlConfig.STICKER}`,
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
    url: urlConfig.STICKER + `/${id}`,
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
    url: urlConfig.STICKER + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}