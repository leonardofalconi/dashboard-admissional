import axios from 'axios'

export const HTTP_CLIENT = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  timeoutErrorMessage: 'Request timeout.',
})
