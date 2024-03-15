import axios from "axios";

const BASE_URL = "https://backend-motorbike.up.railway.app/api"

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // para poder leer las cookies
})

export {axiosClient}