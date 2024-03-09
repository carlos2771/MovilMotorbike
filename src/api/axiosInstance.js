import axios from "axios";

const BASE_URL = "http://192.168.1.15:3000/api"

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // para poder leer las cookies
})

export {axiosClient}