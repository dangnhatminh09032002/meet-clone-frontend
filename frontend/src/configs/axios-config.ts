import axios from 'axios';

export const server = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
  withCredentials: true,
});

const token = sessionStorage.getItem('token');

export const serverAuthen = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
	},
  withCredentials: true,
});
