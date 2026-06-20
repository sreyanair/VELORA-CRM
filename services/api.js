import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.29.141:3000",
});

export default API;