import axios from 'axios';

export const fetchApi = async (url, method = 'get', body, headers) => {
  const token = localStorage.getItem('token');

  try {
    let opts = {
      method,
      url: `${process.env.REACT_APP_API_URL.trim()}${url}`,
      timeout: 1 * 1000 * 60, // 1phut
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Bearer: token,
      },
    };
    if (headers) {
      opts = {
        ...opts,
        headers: {
          ...headers,
          [headers.key]: headers.value,
        },
      };
    }
    if (method === 'get') {
      opts.params = body;
    } else {
      opts.data = body;
    }
    const fetchdata = await axios(opts);
    if (fetchdata.data.code !== 200) {
      return fetchdata.data;
    }
    return fetchdata.data;
  } catch (error) {
    const { response } = error;
    if (response) {
      return response.data;
    }
    return error;
  }
};

export const fetchApiUpload = async (url, method = 'get', body) => {
  const token = localStorage.getItem('sky-cms-token');

  try {
    const opts = {
      method,
      url: `${process.env.REACT_APP_API_URL.trim()}${url}`,
      timeout: 1 * 1000 * 60, // 1phut
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'token-key': token,
      },
    };
    if (method === 'get') {
      opts.params = body;
    } else {
      opts.data = body;
    }
    const fetchdata = await axios(opts);
    if (fetchdata.data.code !== 200) {
      return fetchdata.data;
    }
    return fetchdata.data;
  } catch (error) {
    const { response } = error;
    if (response) {
      return response.data;
    }
    return error;
  }
};
