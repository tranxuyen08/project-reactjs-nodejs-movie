import axios from "axios"
import BaseAxios from "./axiosClient"

export class MovieAPI {
  static getAllMovie() {
    const url = 'http://localhost:8000/api/v1/movie'
    return axios.get(url)
  }
  static getMovieShowSlide() {
    const url = 'http://localhost:8000/api/v1/movie/popular'
    return axios.get(url)
  }
  static getMovieRate() {
    const url = 'http://localhost:8000/api/v1/movie/rate'
    return axios.get(url)
  }
  static getMovieSearch(params) {
    const url = `http://localhost:8000/api/v1/movie/search?searchTerm=${params}`
    console.log(params);
    return axios.get(url)
  }
}