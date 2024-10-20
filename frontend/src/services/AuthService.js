// src/services/AuthService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth/';

const register = (username, password) => {
  return axios.post(API_URL + 'register', {
    username,
    password,
  });
};

const login = (username, password) => {
  return axios.post(API_URL + 'login', {
    username,
    password,
  });
};

export default {
  register,
  login,
};
