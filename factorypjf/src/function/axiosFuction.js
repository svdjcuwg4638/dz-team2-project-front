import axios from "axios";

const DEV_URL = "http://localhost:9091/";
const OP_URL = "https://backapp-7bb14242f8f4.herokuapp.com/";


export function getAxios(url, param, successFunction, failFunction) {
  axios
    .get(`${OP_URL + url}`, {
      params: param,
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      successFunction(data);
    })
    .catch((error) => failFunction(error));
}

export function postAxios(url, param, successFunction, failFunction) {
  axios
    .post(`${OP_URL + url}`, param)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      successFunction(data);
    })
    .catch((error) => failFunction(error));
}

export function putAxios(url, param, successFunction, failFunction) {
  axios
    .put(`${OP_URL + url}`, param)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      successFunction(data);
    })
    .catch((error) => failFunction(error));
}
