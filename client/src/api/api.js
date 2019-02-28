import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5020/api'
});

axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem('jwt');

    return options;
  });

export default api;