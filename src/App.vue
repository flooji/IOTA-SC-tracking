<template>
  <router-view></router-view>
</template>
<script>
import { RemoteitClient,establishConnection } from "./remoteit_class"
export default {
  name: 'app',
  data() {
    return {
      remoteit: {
        connection: false,
        client: null
      }
    }
  },
  mounted() {
    const developerkey = process.env.VUE_APP_REMOTEIT_DEVELOPER_KEY
    const username = process.env.VUE_APP_REMOTEIT_USERNAME
    const password = process.env.VUE_APP_REMOTEIT_PASSWORD
    const device = process.env.VUE_APP_REMOTEIT_DEVICE_ADDRESS

    let client = new RemoteitClient(developerkey,username,password,device)¨
    //geht evtl nicht, da return Promise 
    if(establishConnection(client)){
      this.remoteit.connection = true
      this.remoteit.client = client
    } 
  }
}
</script>