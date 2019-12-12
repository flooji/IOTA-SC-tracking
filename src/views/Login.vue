<template>
    <div class="background">
        <form action="#" method="post"  target="_self" @submit.prevent="checkForm"> 
            <div class="radios">
                <h4>Please choose who you are</h4>
                <div class="form-check mx-sm-3 mb-2">
                <input class="form-check-input" type="radio" name="exampleRadios" id="producer" v-model="selected" value="producer" checked>
                <label class="form-check-label" for="producer">
                Producer
                </label>
                </div>
                <div class="form-check mx-sm-3 mb-2">
                <input class="form-check-input" type="radio" name="exampleRadios" id="logistics" v-model="selected" value="logistics">
                <label class="form-check-label" for="logistics">
                Logistics
                </label>
                </div>
                <div class="form-check mx-sm-3 mb-2">
                <input class="form-check-input" type="radio" name="exampleRadios" id="authorities" v-model="selected" value="authorities">
                <label class="form-check-label" for="authorities">
                Authorities
                </label>
                </div>
                <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
            </div>
            <div class="form-row mx-sm-3 ">
                <div class="form-group mx-sm-3 mb-2 ml-3">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary mb-2">Confirm</button>
            </div>
      </form>
    <div class="output">{{msg}}</div>
    <img alt="parcel" src="../assets/logo.png">
    </div>
</template>
<script>
import router from '../router.js'
export default {
  name: 'login',
  data () {
      return {
          selected: '',
          password: '',
          msg: ''
      }
  },
  methods: {
      checkForm () {
          if(this.password=='123' && this.selected=='producer') {
              router.push({ path: 'producer' })
          }
          else if(this.password=='456' && this.selected=='logistics') {
              router.push({ path: 'logistics' })
          }
          else if(this.password=='789' && this.selected=='authorities') {
              router.push({ path: 'authorities' })
          }
          else {
              this.msg = 'Wrong password, please try again.'
          }
      }
  }
}
</script>
<style scoped>
.background {
    background: rgb(81, 221, 165);
    text-align: center;
    margin: auto;
}
.radios {
    display: block;
    margin: 10 10 10 10;
}
</style>
