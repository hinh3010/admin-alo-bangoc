// import urlcat from 'urlcat';
import axios from "axios";
import * as urlConfig from './urlConfig';
import { getToken } from "../services/storages/userStorage";

export async function getListCensor(offset, limit) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_KIEMDUYET + '?offset=' + offset + '&limit=' + limit,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  return resp.data.data;
}


export async function handelCensor(data) {
  const token = getToken();
  console.log(`object token`, token)
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.PUT_KIEMDUYET,
    data,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  return resp.data.data;
}

// danh sach gift cho duyet
export async function getlistGiftCenrsor(page) {
  const token = getToken();
  console.log(`object token`, token)
  const resp = await axios({
    method: 'GET',
    url: urlConfig.CENSOR_GIFT + '?type=GIFT&status=pending&page=' + page,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  return resp.data;
}

export async function handleGift(data, status) {
  const token = getToken();
  console.log(`object token`, token)
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.CENSOR_GIFT + '/' + data.giffId,
    data: status.status == 'reject' ? { status: 'reject', reason: data.note } : status,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  return resp.data;
}


// xu ly thong bao
export async function getlistNotiCenrsor(page) {
  const token = getToken();

  const resp = await axios({
    method: 'GET',
    url: urlConfig.CENSOR_NOTIFICATION + '?type=NEWS&status=pending&page=' + page,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });
  return resp.data;
}

export async function handleNoti(data, status) {
  const token = getToken();
  console.log()
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.CENSOR_NOTIFICATION + '/' + data.notiId,
    data: status.status == 'reject' ? { status: 'reject', reason: data.note } : status,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  return resp.data;
}
