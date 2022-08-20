import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getListGift(offset = 0, limit = 10) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    params: {
      offset,
      limit
    },
    url: urlConfig.GET_GIFT,
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
    url: urlConfig.CREATE_GIFT,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}