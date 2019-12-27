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



export { RemoteitClient}



