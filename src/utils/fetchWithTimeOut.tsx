import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpStatus } from '../constants/httpStatus'

const THE_MOVIE_DB_API = 'https://api.themoviedb.org/3/'
// const API_KEY = "ca6836e856aeef031f2cd0392f38db46";

const axiosInstance: any = axios.create({
  baseURL: THE_MOVIE_DB_API,
  timeout: 20000,
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTY4MzZlODU2YWVlZjAzMWYyY2QwMzkyZjM4ZGI0NiIsInN1YiI6IjYzOWMzYjI2ODFhN2ZjMDBkMWM3YWNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nlb1WpTIziqEOkqvPdmAQ5F9q4AhOvp2FRV-bJk_d3Q',
  }
  return config
})

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const successStatuses = [HttpStatus.SUCCESS, HttpStatus.CREATED_SUCCESS].includes(res?.status)

    if (successStatuses) {
      return res
    }
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
