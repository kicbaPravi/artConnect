import axios, { AxiosError } from 'axios';
import { logOut } from '../store/slice/authSlice';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import store from '../store';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
  // withCredentials: true
});

api.defaults.withCredentials = true;

const token = Cookies.get('access_token');

api.interceptors.request.use(
  (config) => {
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`
      });

      // Logout the user, navigate to login page and show unauthorized message
      store.dispatch(logOut());
    }
    // return Promise.reject(error);
  }
);

export default api;
