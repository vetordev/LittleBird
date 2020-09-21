import axios from 'axios';

const api = axios.create({
   baseURL: 'https://little-bird-api.herokuapp.com/',
});

export default api;