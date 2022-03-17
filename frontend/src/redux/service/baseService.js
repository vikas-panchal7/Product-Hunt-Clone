import axios from "axios";

export const baseUrl = "http://localhost:4000";

const baseService = axios.create({
  baseURL: baseUrl,
});
export default baseService;
