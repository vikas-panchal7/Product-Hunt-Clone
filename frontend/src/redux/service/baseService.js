import axios from "axios";
const baseService = axios.create({
  baseURL: "http://192.168.200.122:5000",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default baseService;
