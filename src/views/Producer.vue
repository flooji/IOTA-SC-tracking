<template>
    <div class="container">
        <div class="wrapper">
            <h3>{{msg}}</h3>
            <form-packaging-unit></form-packaging-unit>
        </div>
    </div>
</template>
<script>
import UnitForm from '../components/UnitForm.vue'

export default {
  name: 'producer',
  components: {
      'form-packaging-unit': UnitForm
  },
  data() {
      return {
        msg: 'Hi, register a packaging unit.'
      }
  }
}
</script>
<style scoped>
.wrapper {
    width: 300px;
    padding-left: 20px;
    padding-top: 40px;
    display: block;
}
</style>