import axios from "axios";

export const server = () =>
  axios.create({
    baseURL: "https://glomeet.glotechvn.com",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("id_token")}`,
    },
    withCredentials: true,
  });
