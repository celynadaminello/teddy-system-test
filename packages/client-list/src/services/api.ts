import axios from 'axios';

const API_BASE_URL = 'https://boasorte.teddybackoffice.com.br';

export const api = axios.create({
  baseURL: API_BASE_URL,
});