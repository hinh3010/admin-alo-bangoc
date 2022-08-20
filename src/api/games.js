// import urlcat from 'urlcat';
import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getList(page = 1, limit = 10) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GAMES + '?page=' + page + '&limit=' + limit,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.results;
}

export async function add(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    url: urlConfig.GAMES,
    data,
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
    url: urlConfig.GAMES + `/${id}`,
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
    url: urlConfig.GAMES + `/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function active(id) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    url: urlConfig.GAMES + `/${id}/active`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function inactive(id) {
  const token = getToken();
  const resp = await axios({
    method: 'DELETE',
    url: urlConfig.GAMES + `/${id}/active`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function getWheels(id) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GAMES + `/${id}/whell`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function deleteWheel(gameId, id) {
  const token = getToken();
  const resp = await axios({
    method: 'DELETE',
    url: urlConfig.GAMES + `/${gameId}/whell/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function addWheel(gameId, data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.GAMES + `/${gameId}/whell`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function updateWheel(gameId, id, data) {
  const token = getToken();
  const resp = await axios({
    method: 'PUT',
    data,
    url: urlConfig.GAMES + `/${gameId}/whell/${id}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}


export async function getVouchers(gameId, wheelId) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GAMES + `/${gameId}/whell/${wheelId}/vouchers`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function updateVouchers(gameId, wheelId, data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.GAMES + `/${gameId}/whell/${wheelId}/vouchers`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}