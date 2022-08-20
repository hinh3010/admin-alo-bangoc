import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getList(offset = 0, limit = 10) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    params: {
      offset,
      limit
    },
    url: urlConfig.GET_NOTIFICATION,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}
export async function getListNoti(offset = 0, limit = 10) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    params: {
      offset,
      limit
    },
    url: urlConfig.GET_LIST_NOTI,
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
    url: urlConfig.SEND_NOTIFICATION,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function getProvince() {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_PROVINCE_LIST,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function getDistrict(provinceId) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: `${urlConfig.GET_DISTRICT}/${provinceId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}

export async function getWard(provinceId, districtId) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: `${urlConfig.GET_WARD}/${provinceId}/${districtId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data.data;
}
