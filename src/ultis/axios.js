/* eslint-disable func-names */
import axios from 'axios';
import $ from 'jquery';
import history from './history';
import { REFRESH_TOKEN_URL } from '../urlConfig';
const instance = axios.create({});

instance.interceptors.request.use(
  async config => {
    // eslint-disable-next-line no-param-reassign
    // config.withCredentials = true;
    if (localStorage.getItem('token')) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const errorResponse = error.response;
    if (errorResponse && errorResponse.status === 401) {
      if (localStorage.getItem('refreshToken') && errorResponse.status && Number(errorResponse.status) === 401) {
        if (localStorage.getItem('refreshTokenWait') && localStorage.getItem('refreshTokenWait') === 'wait') {
          setTimeout(() => Promise.resolve(instance(errorResponse.config)), 2000);
        } else {
          try {
            // console.log('gọi refresh khi hết token');
            // console.log(new Date());
            await getToken();
          } catch (e) {
            // nếu refresh hết hạn thì đẩy vể login
            // console.log('hết hạn token gọi refresh lỗi');
            // console.log(new Date());
            localStorage.clear();
            sessionStorage.clear();
            // window.location.href = '/auth/login';
            history.push('/login');
            return Promise.reject(e);
          }
          return Promise.resolve(instance(errorResponse.config));
        }
      }
    }

    // if (errorResponse && errorResponse.status === 400) {
    //   $.toast({
    //     heading: 'Lỗi',
    //     text: 'Oops! Something went wrong!',
    //     showHideTransition: 'fade',
    //     icon: 'error',
    //     hideAfter: 2500,
    //     loaderBg: '#fa6342',
    //     position: 'bottom-right',
    //   });
    // }
    // if (errorResponse && errorResponse.status === 403) {
    //   alert('Bạn không có quyền truy cập!');
    // }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error.response);
  },
);

const getToken = async () => {
  localStorage.setItem('refreshTokenWait', 'wait');
  await axios({
    url: REFRESH_TOKEN_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { refreshToken: localStorage.getItem('refreshToken') },
  })
    .then(function(response) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('token', response.data.token);
      localStorage.removeItem('refreshTokenWait');
    })
    .catch(function(error) {
      localStorage.removeItem('refreshTokenWait');
      localStorage.clear();
      sessionStorage.clear();
      // window.location.href = '/auth/login';
      history.push('/login');
      return Promise.reject(error);
    });
};

export default instance;
