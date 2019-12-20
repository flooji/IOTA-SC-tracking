/* eslint-disable no-console */
const axios = require("axios")

class RemoteitClient {
  constructor(developerkey, username, password, deviceaddress) {
    this.developerkey = developerkey,
    this.username = username,
    this.password = password,
    this.deviceaddress = deviceaddress
    this.wait = true
    this.hostip = null
  }
  login(){
    let that = this
    try {
      return axios.post(
        "https://api.remot3.it/apv/v27/user/login",
        { username: that.username, password: that.password },
        { headers: { developerkey: that.developerkey } }
      )} catch(err) {
      console.log(err)
    } 
  }
  connect(token){
    let that = this
    try { 
      return axios.post(
            "https://api.remot3.it/apv/v27/device/connect",
            { 
              deviceaddress: that.deviceaddress,
              wait: that.wait,
              hostip: that.hostip
            },
            { 
              headers: {
                developerkey: that.developerkey,
                token }
            })
    } catch(err) {
      console.log(err)
    }
  }
}

//let myClient = new RemoteitClient(developerkey,username,password,deviceaddress)

function establishConnection(client) {
    client.login()
    .then(response => {
      client.token = response.data.token
      client.tokenExpiration = response.data.auth_expiration
      return response.data.token
    })
    .then(token => {
      return client.connect(token)
    })
    .then(response => {
      client.proxy = response.data['connection']['proxy']
      //console.log(client.proxy)
      return response.data['connection']['proxy']
    })
    .catch(err => {
      console.log(err)
    })
}

export {establishConnection, RemoteitClient}
