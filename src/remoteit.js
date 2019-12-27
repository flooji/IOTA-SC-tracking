/* eslint-disable no-console */
import { RemoteitClient } from "./remoteit_class"

const developerkey = process.env.VUE_APP_REMOTEIT_DEVELOPER_KEY
const username = process.env.VUE_APP_REMOTEIT_USERNAME
const password = process.env.VUE_APP_REMOTEIT_PASSWORD
const deviceaddress = process.env.VUE_APP_REMOTEIT_DEVICE_ADDRESS

function establishConnection(client) {
    return client.login()
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
      return response.data['connection']['proxy']
    })
    .catch(err => {
      console.log(err)
      return null
    })
}

var client = new RemoteitClient(developerkey,username,password,deviceaddress)

export {client,establishConnection}