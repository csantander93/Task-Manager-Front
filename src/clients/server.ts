// server.ts
import axios from 'axios';

export const httpServer = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const httpServerMultipart = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-type': 'multipart/form-data',
  },
});