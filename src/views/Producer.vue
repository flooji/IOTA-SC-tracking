<template>
    <div class="container">
        <span class="badge badge-dark float-right mt-2">Device {{connection}}</span>
        <h3 class="mx-sm-3 mt-2">Producer</h3>
        <h4 class="mx-sm-3 mt-2">{{msg}}</h4>

        <section v-if="status==='authenticated'">
            <div class="wrapper">
                <template>
                    <h5 class="mx-sm-3 mt-4"><b>Step 2: Register packaging unit</b></h5>
                    <form-packaging-unit @create-order="createClaim">
                    </form-packaging-unit>
                </template>
            </div>
        </section>

        <section v-else-if="status==='made-order'">
            <div class="alert alert-secondary order" role="alert">
                <h5>Order</h5>
                <p><b>Subject:</b> {{order.claim.subject}}</p>
                <p><b>Commmodity Group:</b> {{order.claim.data['commodityGroup']}}</p>
                <p><b>Series Number:</b> {{order.claim.data['seriesNumber']}}</p>
                <p><b>Number of Items:</b> {{order.claim.data['numberOfItems']}}</p>
                <p><b>Price of Item:</b> {{order.claim.data['valueOfItem']}} {{order.claim.data['currencyOfPrice']}}</p>
                <p><b>Owner:</b> {{order.claim.data['owner']}}</p>
                <p><b>Tracking Root:</b> {{order.claim.trackingRoot}}</p>
                <p><b>-----------------------------------------------</b></p>
                <p><b>Root Credential Packaging Unit:</b> {{order.root}}</p>
                <p><b>Check on tangle:</b> {{link}}</p>
            </div>
        </section>

        <section v-else>
            <h5 class="mx-sm-3 mt-4"><b>Step 1: Authenticate</b></h5>
            <button type="submit" class="btn btn-primary mx-3 mt-3" v-on:click="authenticate">Authenticate device</button> 
            <div v-if="response_request_token" class="alert alert-dark mx-3 mt-3" role="alert">
                {{response_request_token}}
            </div>      
            <div v-if="response_verify" class="alert alert-dark mx-3 mt-3" role="alert">
                {{response_verify}}
            </div>  
            <div v-if="claim" class="alert alert-dark mx-3 mt-3" role="alert">
                <h5>Device Identity credential</h5>
                <p><b>Subject:</b> {{claim.subject}}</p>
                <p><b>Device Model:</b> {{claim.data.deviceModel}}</p>
                <p><b>Issuer:</b> {{claim.issuer}}</p>
                <p><b>Device Owner:</b> {{claim.data.deviceOwner}}</p>
                <p><b>Expiration Date:</b> {{claim.expirationDate}}</p>
                <button type="submit" class="btn btn-primary mx-3 mt-3" v-on:click="status='authenticated'">Register packaging unit</button>
            </div>  
        </section>
        <button type="submit" class="btn btn-primary mx-3 mt-3" v-on:click="deleteTrackingChannel">Stop tracking</button>
    </div>
</template>
<script>
import UnitForm from '../components/UnitForm.vue'
import { client,establishConnection } from "../remoteit"
import {checkIdentity} from "../helpers/verifyClaim"
let axios = require('axios')
let {createPackagingUnit} = require('../helpers/createPackagingUnit')

export default {
  name: 'producer',
  components: {
      'form-packaging-unit': UnitForm
  },
  data() {
      return {
        msg: 'Hi, authenticate this device in order to register a packaging unit.',
        status: null,
        proxy: null,
        connection: 'NOT connected',
        response_request_token: null,
        response_verify: null,
        response_create_channel: null,
        claim: null,
        order: null,
        link: null
      }
  },
  methods: {
    authenticate() {
          if(this.proxy){
              let that = this
              axios.get(`${this.proxy}/authenticate/`)
                .then(async function (response) {
                    that.response_request_token = 'Received Authentication Token... '

                    await checkIdentity(response['data']['jwt'])
                    .then(result => {
                    if(result) {
                        that.response_verify = 'Device identity is valid: '
                        that.claim = result
                    } else {
                        that.response_verify = 'Device identity is not valid.'
                    }
                    // eslint-disable-next-line no-console
                    }).catch(err => console.log(err))
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    that.response_request_token = `${error.message}: Device could not be authenticated.`
                })
          } else {
              this.response_request_token = 'Connection to device could not be established.'
          }
      },
    createTrackingChannel() {
        try {
            return axios.get(`${this.proxy}/create-tracking/`)
        } catch(err) {
            this.response_create_channel = `${err}: Tracking channel for packaging unit could not be created.`
            // eslint-disable-next-line no-console
            console.log(err)
        }
    },
    deleteTrackingChannel() {
        try {
            return axios.get(`${this.proxy}/stop-tracking/`)
        } catch(err) {
            this.response_create_channel = `${err}: Tracking channel for packaging unit could not be stopped.`
            // eslint-disable-next-line no-console
            console.log(err)
        }
    },
    createClaim(formData){
        this.createTrackingChannel().then(response => {
            let trackingRoot = response['data'].root
            let link = response['data'].link
            // eslint-disable-next-line no-console
           console.log(link)
            createPackagingUnit(formData, trackingRoot)
            .then(result => {
                // eslint-disable-next-line no-console
                console.log(result)
                this.order = result
                //this.link = link
                this.status = 'made-order'
                this.msg = `Congrats you made an order!`
            // eslint-disable-next-line no-console
            }).catch(err => console.log('Error',err))
        })
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
.order {
    overflow-x: scroll
}
</style>