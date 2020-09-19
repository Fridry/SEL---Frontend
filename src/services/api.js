import axios from "axios";

import { getToken } from "../utils/Autentication";

const token = getToken();

const api = axios.create({
  baseURL: "http://localhost:3333",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

export default api;
