// var axios = require('axios');
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://covid-ng.herokuapp.com/',
});

//we can use an interceptor here to add header on every call
// axiosInstance.interceptors.request.use(
//     function(config) {
//       const token = configureLocalStorage.getToken();
//       if (token) config.headers['Authorization'] = `Bearer ${token}`;
//       return config;
//     },
//     function(error) {
//       return Promise.reject(error);
//     },
//   );

export default axiosInstance;
