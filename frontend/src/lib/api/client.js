import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const requestURL = process.env.REACT_APP_API_URL
const apiURL = 'api/v1/'
const client = axios.create({
  baseURL: requestURL + apiURL
});

export default client;

/*
  host: "localhost:3000"
  hostname: "localhost"
  href: "http://localhost:3000/"
  port: "3000"
  protocol: "http:"
*/