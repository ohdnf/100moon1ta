import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const requestURL = process.env.REACT_APP_API_URL;
const apiURL = 'api/v1/';
const client = axios.create({
  baseURL: requestURL + apiURL,
});

const token = localStorage.getItem('token');
if (token) {
  console.log("token헤더에 설정합니다")
  client.defaults.headers.common['Authorization'] = 'JWT ' + token;
} else {
  console.log("token헤더 삭제합니다")
  delete client.defaults.headers.common["Authorization"];
}

export default client;
