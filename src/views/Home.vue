<template>
    <div class="background">
        <div class="wrapper">
            <custom-nav></custom-nav>
            <img alt="parcel" src="../assets/logo.png">
        </div>
    </div>
</template>
<script>
import Nav from '../components/Nav.vue'
export default {
  name: 'home',
  components: {
      'custom-nav': Nav
  }
}
</script>
<style scoped>
.background {
    background: rgb(81, 221, 165);
}
.wrapper {
    width: 30%;
    margin-left: 30px;
    padding-top: 50px;
    display: block;
}
</style>
