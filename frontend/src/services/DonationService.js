// src/services/DonationService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/donate';

const donate = (donorAddress, amount, token) => {
  return axios.post(API_URL, { donorAddress, amount }, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export default {
  donate,
};
