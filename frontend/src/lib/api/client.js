import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : process.env.REACT_APP_API_URL,
});

export default client;

/*
  host: "localhost:3000"
  hostname: "localhost"
  href: "http://localhost:3000/"
  port: "3000"
  protocol: "http:"
*/