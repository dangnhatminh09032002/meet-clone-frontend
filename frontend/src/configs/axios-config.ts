import axios from 'axios';

export const server = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  withCredentials: true,
});
