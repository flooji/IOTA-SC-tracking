/* eslint-disable */
const axios = require("axios");
const developerkey = process.env.REMOTEIT_DEVELOPER_KEY;
const token = process.env.REMOTEIT_TOKEN;
const deviceaddress = process.env.REMOTEIT_DEVICE_ADDRESS;
const hostip = process.env.MY_PUBLIC_IP;
const wait = "true";

axios
  .post(
    "https://api.remot3.it/apv/v27/device/connect",
    { 
      deviceaddress,
      wait,
      hostip
    },
    {
      headers: {
        developerkey,
        token
      }
    }
  )
  .then(response => {
    console.log("Status Code:", response.status);
    console.log("Body:", response.data);
  })
  .catch(error => {
    console.log(error);
  });