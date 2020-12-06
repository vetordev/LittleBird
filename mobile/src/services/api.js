import axios from 'axios';

const api = axios.create({
   // baseURL: 'http://26.57.205.136:3333/',
   baseURL: 'https://little-bird-api.herokuapp.com',
});

export default api;

