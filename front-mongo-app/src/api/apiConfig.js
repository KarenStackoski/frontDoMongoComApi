import axios from 'axios';

const apiConfig = axios.create({
  baseURL: 'http://localhost:8080/',
});

export default apiConfig;