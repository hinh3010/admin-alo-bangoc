// import urlcat from 'urlcat';
import axios from "axios";
import * as urlConfig from './urlConfig';
import { getToken } from "../services/storages/userStorage";

export async function getListGroup(offset,limit) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_GROUPS_LIST+'?offset='+offset+'&limit='+limit,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}


export async function handelGroup(data) {
  const token = getToken();
  console.log(`object token`, token)
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.GROUPS_HANDLE,
    data,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}
