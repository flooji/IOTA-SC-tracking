<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'app',
   components: {    
   },
  data() {
    return {
      map: null
    }
   },
   mounted() {
     this.map
   }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.box {
    margin: 20px;
    max-width: 300px;
    text-align: left;
}
</style>
