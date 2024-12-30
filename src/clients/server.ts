import axios from 'axios';

const baseURL ='https://task-manager-back-production-27ea.up.railway.app/api';

export const httpServer = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const httpServerMultipart = axios.create({
  baseURL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});
