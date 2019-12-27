<template>
    <div class="container">
        <span class="badge badge-dark float-right mt-2">Device {{connection}}</span>
        <h3 class="mx-sm-3 mt-2">Producer</h3>
        <h4 class="mx-sm-3 mt-2">{{msg}}</h4>
        <template v-if="authenticated">
            <form-packaging-unit></form-packaging-unit>
        </template>
        <template v-else>
            <button type="submit" class="btn btn-primary mx-3 mt-3" v-on:click="authenticate">Authenticate device</button> 
            <div v-if="response_request_token" class="alert alert-dark mx-3 mt-3" role="alert">
            {{response_request_token}}
            </div>      
            <div v-if="response_verify" class="alert alert-dark mx-3 mt-3" role="alert">
            {{response_verify}}
            </div>  
        </template>
    </div>
</template>
<script>
import UnitForm from '../components/UnitForm.vue'
import { client,establishConnection } from "../remoteit"
//import {checkIdentity} from "../helpers/verifyClaim"
let axios = require('axios')

export default {
  name: 'producer',
  components: {
      'form-packaging-unit': UnitForm
  },
  data() {
      return {
        msg: 'Hi, authenticate this device in order to register a packaging unit.',
        authenticated: false,
        proxy: null,
        response_request_token: null,
        response_verify: null,
        connection: 'NOT connected'
      }
  },
  methods: {
      authenticate() {
          if(this.proxy){
              let that = this
              axios.get(`${this.proxy}/authenticate/`)
                .then(function (response) {
                    that.response_request_token = 'Received Authentication Token... '
                    //verify token
                    //that.response_verify = 'Device identity is valid"
                    //authenticated = true
                    //connection = 'authenticated'
                    return response.jwt
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    that.response_request_token = `${error.message}: Device could not be authenticated.`
                })
          } else {
              this.response_request_token = 'Connection to device could not be established.'
          }
      }
  },
  mounted() {
    establishConnection(client)
    .then(proxy => {
        if(proxy){
            this.proxy=proxy
            this.connection = 'CONNECTED'
        }
     })
     // eslint-disable-next-line no-console
     .catch(err => console.log(err))
  }
}
</script>
<style scoped>
.wrapper {
    width: 300px;
    padding-left: 20px;
    padding-top: 10px;
    display: block;
}
</style>