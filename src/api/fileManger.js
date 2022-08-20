// import urlcat from 'urlcat';
import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function uploadImage(data) {
  const formData = new FormData();
  formData.append('files', data);
  // const token = getToken();
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWIyM2FmYWNhNTBhNTBkOWQ2ZWM1YSIsImlhdCI6MTYzOTczMzQxNCwiZXhwIjoxNjM5OTQ5NDE0fQ.qz34rgMo8tM-3tEaRHnn_a3LYqQvW_ID47qY6DegRv4';
  const resp = await axios({
    method: 'POST',
    data: formData,
    url: urlConfig.UPLOAD_IMAGE,
    // headers: {
    //   Authorization: 'Bearer ' + token,
    // },
  });

  return resp.data;
}

export async function getImage(data) {
  // const token = getToken();
  const resp = await axios({
    method: 'GET',
    data,
    url: urlConfig.GET_IMAGE + data,
    // headers: {
    //   Authorization: 'Bearer ' + token,
    // },
  });

  return resp.data;
}
