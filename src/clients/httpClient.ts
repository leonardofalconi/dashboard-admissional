import axios from 'axios'

export const HTTP_CLIENT = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  timeoutErrorMessage: 'Request timeout.',
})
