import axios from "axios";

export const server = () =>
  axios.create({
    baseURL: process.env.BASE_URL || "http://128.199.112.76:8080",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("id_token")}`,
    },
    withCredentials: true,
  });
