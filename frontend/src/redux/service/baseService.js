import axios from "axios";
const URL = process.env.REACT_APP_URL;
const baseService = axios.create({
  baseURL: URL,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default baseService;
