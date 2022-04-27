import axios from 'axios';

export const server = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
    'Set-Cookie': 'a=1; Path=/'
	},
  withCredentials: true,
});

export const serverAuthen = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
	},
  withCredentials: true,
});
