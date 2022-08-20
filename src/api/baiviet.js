// import urlcat from 'urlcat';
import axios from "axios";
import * as urlConfig from './urlConfig';
import { getToken } from "../services/storages/userStorage";

export async function get(offset,limit) {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_BAIVIET+'?offset='+offset+'&limit='+limit,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });

  return resp.data.data;
}
