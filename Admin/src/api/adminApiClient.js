import axios from "axios"
import BaseAxios from "./axiosInstance"

export class Admin {
  static getUser(){
    const url ='/api/v1/users'
    return BaseAxios.get(url)
  }
  static getMovie(){
    const url ='/api/v1/movie'
    return BaseAxios.get(url)
  }
  static deleteMovie(params){
    const url =`/api/v1/movie/${params.id}`
    return BaseAxios.delete(url,params)
  }
  static login(params) {
    const url = 'http://localhost:8000/api/v1/users/login'
    return axios.post(url,params)
  }
}