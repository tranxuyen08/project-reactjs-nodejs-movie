import axios from "axios"
import BaseAxios from "./axiosClient"

export class UserAPI {
  static login(params) {
    const url = 'http://localhost:8000/api/v1/users/login'
    return axios.post(url,params)
  }
  static register(params){
    const url = '/api/v1/users/register'
    return BaseAxios.post(url,params)
  }
  static update(params){
    const url ='/api/v1/users/update'
    return BaseAxios.patch(url,params)
  }
  static favorite(params) {
    const url = '/api/v1/favorite'
    return axios.post(url,params)
  }
}