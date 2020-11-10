import axios from 'axios';
import dotenv from 'dotenv';
// import { useSelector } from 'react-redux';

dotenv.config();
const requestURL = process.env.REACT_APP_API_URL;
const apiURL = 'api/v1/';
const client = axios.create({
  baseURL: requestURL + apiURL,
});

// JWT 헤더
const token = localStorage.getItem('token') // 없으면 null
if (token) {
  console.log("token헤더에 설정합니다", token)
  client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
export default client;

/*
  host: "localhost:3000"
  hostname: "localhost"
  href: "http://localhost:3000/"
  port: "3000"
  protocol: "http:"
*/
