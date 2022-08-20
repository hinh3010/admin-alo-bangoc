// import urlcat from 'urlcat';
import axios from "axios";
import * as urlConfig from './urlConfig';
import { getToken } from "../services/storages/userStorage";

export async function getListPost(offset,limit) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_POST_LIST+'?offset='+offset+'&limit='+limit,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}
export async function getListPostCategory(offset,limit) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_POST_CAT_LIST+'?offset='+offset+'&limit='+limit,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}

export async function getListPostreport(offset,limit) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_POST_LIST_REPORT+'?offset='+offset+'&limit='+limit,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}


export async function handelPostReport(data) {
  const token = getToken();
  console.log(`object token`, token)
  const resp = await axios({
    method: 'POST',
    url: urlConfig.POST_HANDLE_REPORT,
    data,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}
