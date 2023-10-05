import axios from "axios";

const DEV_URL='http://localhost:9093/';

export function getAxios(url, param, successFunction, failFunction) {
  axios
    .get(`${DEV_URL + url}`, {
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
    .post(`${DEV_URL + url}`, param)
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
    .put(`${DEV_URL + url}`, param)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      successFunction(data);
    })
    .catch((error) => failFunction(error));
}
