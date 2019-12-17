/* eslint-disable */
const axios = require("axios");

const developerkey = process.env.REMOTEIT_DEVELOPER_KEY;
const username = process.env.REMOTEIT_USERNAME;
const password = process.env.REMOTEIT_PASSWORD;

axios
  .post(
    "https://api.remot3.it/apv/v27/user/login",
    { username, password },
    { headers: { developerkey } }
  )
  .then(response => {
    console.log("Status Code:", response.status);
    console.log("Body:", response.data);
  })
  .catch(error => {
    console.log(error);
  });