import axios from 'axios';

const server = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  withCredentials: true,
});

export default server;
